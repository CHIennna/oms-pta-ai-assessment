'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const core = fs.readFileSync('./src/client/core/pta-clone.js', 'utf8');
const extract = (start, end) => core.slice(core.indexOf(start), core.indexOf(end, core.indexOf(start)));

function drafts() {
  const elements = { '#language': { value: 'Python 3' }, '#submit-state': { textContent: 'ready' } };
  const context = { draftCodes: {}, draftMeta: {}, DRAFT_CODE_STORAGE: 'code', DRAFT_META_STORAGE: 'meta',
    $: selector => elements[selector], localStorage: { setItem() {} }, Date: { now: () => 100 },
    scheduleDraftSync() {}, loadingCode: false, persistActiveDraft: () => { throw Error('must not save during restore'); } };
  vm.createContext(context);
  vm.runInContext(extract('function saveDraftCode(', 'function persistActiveDraft('), context);
  vm.runInContext(core.match(/function updateDraftState\(\)\{[^\n]+?(?=window\.addEventListener)/)[0], context);
  return { context, elements };
}

test('changed drafts and language changes get monotonic revisions; unchanged drafts retain revision', () => {
  const { context, elements } = drafts();
  context.saveDraftCode('q', 'a'); assert.equal(context.draftMeta.q.updatedAt, 100);
  context.saveDraftCode('q', 'b'); assert.equal(context.draftMeta.q.updatedAt, 101);
  context.saveDraftCode('q', 'b'); assert.equal(context.draftMeta.q.updatedAt, 101);
  elements['#language'].value = 'C++ (g++)';
  context.saveDraftCode('q', 'b'); assert.equal(context.draftMeta.q.updatedAt, 102);
});

test('restoring editor contents does not report a failed save or overwrite a draft', () => {
  const { context, elements } = drafts();
  context.loadingCode = true; context.updateDraftState();
  assert.equal(elements['#submit-state'].textContent, 'ready');
});

test('same-question repaint preserves custom input; question and identity changes reset it', () => {
  const input = { value: '' }, expected = { textContent: '' };
  const context = { portalUser: { id: 'synthetic' }, config: { examVersion: 'exam' }, sampleContextKey: '',
    $: selector => selector === '#sample-input' ? input : expected, syncTestInputLines() {} };
  vm.createContext(context);
  vm.runInContext(extract('function syncQuestionSample(', 'function syncTestInputLines('), context);
  const q = { id: 'q', sampleInput: 'public', sampleOutput: 'answer', testCases: [{ input: 'private' }] };
  context.syncQuestionSample(q); assert.equal(input.value, 'public');
  input.value = 'custom'; context.syncQuestionSample(q); assert.equal(input.value, 'custom');
  context.syncQuestionSample({ ...q, id: 'q2' }); assert.equal(input.value, 'public');
  input.value = 'custom'; context.portalUser.id = 'another'; context.syncQuestionSample({ ...q, id: 'q2' });
  assert.equal(input.value, 'public');
});

test('an older cloud save with a later server timestamp does not replace unsynced local edits', () => {
  let restored = false;
  const pending = [];
  const context = { portalAuthenticated: true, portalUser: { id: 'synthetic' }, config: { examVersion: 'exam' },
    progressByExam: new Map([['exam', { drafts: { q: { code: 'old cloud', updatedAt: new Date(500).toISOString() } } }]]),
    draftCodes: { q: 'new local' }, draftMeta: { q: { updatedAt: 200, syncedLocalUpdatedAt: 100 } },
    DRAFT_CODE_STORAGE: 'code', DRAFT_META_STORAGE: 'meta', localStorage: { setItem() {} },
    scheduleDraftSync: (...args) => pending.push(args), restoreSavedCode: () => { restored = true; } };
  vm.createContext(context);
  vm.runInContext(extract('function mergePersistedDrafts(', 'function applyPersistedProgress('), context);
  context.mergePersistedDrafts();
  assert.equal(context.draftCodes.q, 'new local'); assert.equal(restored, false); assert.equal(pending.length, 1);
});

function judgeClient() {
  const nodes = new Map();
  function node(selector) {
    if (!nodes.has(selector)) nodes.set(selector, { value: '', textContent: '', content: '', dataset: {}, open: false,
      classList: { add() {}, remove() {}, toggle() {} }, handlers: {},
      addEventListener(name, fn) { this.handlers[name] = fn; }, showModal() { this.open = true; }, close() {}, onclick() {} });
    return nodes.get(selector);
  }
  const requests = [], clipboard = [];
  const context = { document: { querySelector: node }, $: node, config: { examVersion: 'e', questions: [{ id: 'q', score: 100 }] },
    renderSettings() {}, render() {}, escape: String, editorCode: () => 'current editor', current: 0,
    portalUser: { id: 'synthetic' }, portalIdentityRevision: 1, portalAuthenticated: true, activeRoute: 'exam',
    samplePending: false, submissionPending: false, updateCountdown() {}, syncTesterToggle() {}, setTab(tab) { context.tab = tab; },
    progressByExam: new Map(), submittedCodes: {}, localStorage: { setItem() {} }, applyPersistedProgress() {}, activeQuestionId: 'q',
    navigator: { clipboard: { async writeText(value) { clipboard.push(value); } } },
    window: { OMS_JUDGE_SCORE: require('./src/client/judge/judge-score') },
    fetch: () => new Promise(resolve => requests.push(resolve)) };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('./src/client/judge/judge-machine.js', 'utf8'), context);
  return { context, node, requests, clipboard };
}

test('only one sample runs at once; custom input renders actual stdout/stderr without stale expected output', async () => {
  const { context, node, requests } = judgeClient();
  node('#sample-input').value = 'custom'; node('#expected').textContent = 'STALE';
  const running = context.judge('sample');
  assert.equal(context.samplePending, true);
  await context.judge('sample'); assert.equal(requests.length, 1);
  requests[0]({ ok: true, json: async () => ({ verdict: 'Accepted', compared: false, message: '运行完成', testCases: [{ compared: false, actualOutput: 'actual', stderr: 'warning' }] }) });
  await running;
  assert.equal(context.samplePending, false); assert.equal(context.tab, 'compiler');
  assert.match(node('#compiler-output').textContent, /actual/); assert.match(node('#compiler-output').textContent, /warning/);
  assert.doesNotMatch(node('#compiler-output').textContent, /STALE|预期输出|测试点|ms/);
  assert.match(node('#run-state').textContent, /运行完成/);
});

test('sample response after switching questions cannot paint the new question', async () => {
  const { context, node, requests } = judgeClient();
  const running = context.judge('sample'); context.config.questions = [{ id: 'other' }];
  requests[0]({ ok: true, json: async () => ({ verdict: 'Accepted', message: 'old result' }) });
  await running; assert.equal(node('#compiler-output').textContent, ''); assert.equal(context.samplePending, false);
});

test('submission copy uses submitted snapshot rather than subsequently edited source', async () => {
  const { context, node, requests, clipboard } = judgeClient();
  context.editorCode = () => 'submitted snapshot';
  const running = context.judge('submit'); context.editorCode = () => 'new unsent draft';
  requests[0]({ ok: true, json: async () => ({ verdict: 'Accepted', message: '所有测试均已通过。',
    compilerOutput: '自建评测机运行完成\n通过测试点：1/1', passedTests: 1, totalTests: 1,
    testCases: [{ verdict: 'Accepted', score: 100, timeMs: 42 }], scoring: { score: 100, status: 'accepted' } }) });
  await running;
  await node('#copy-submission-code').handlers.click();
  assert.deepEqual(clipboard, ['submitted snapshot']); assert.equal(context.tab, 'compiler');
  assert.equal(node('#compiler-output').textContent, '所有测试均已通过。');
  assert.doesNotMatch(node('#compiler-output').textContent, /测试点|42 ms/);
  assert.equal(context.submissionPending, false);
});
