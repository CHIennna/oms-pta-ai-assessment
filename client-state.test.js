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

test('route hashes preserve pages and exam question context across refreshes', () => {
  const context = {};
  vm.createContext(context);
  vm.runInContext(extract('const APP_ROUTE_NAMES=', 'function resolveInitialRoute('), context);
  assert.equal(context.parseRouteHash('#problemset').name, 'problemset');
  assert.equal(context.parseRouteHash('#exam-1168').name, 'exam');
  assert.equal(context.parseRouteHash('#exam-1168').questionId, '1168');
  assert.equal(context.parseRouteHash('#info-1163').questionId, '1163');
  assert.equal(context.parseRouteHash('#not-a-page').name, 'home');
  assert.equal(context.formatRouteHash('practice', '1168'), '#practice');
  assert.equal(context.formatRouteHash('exam', '1168'), '#exam-1168');
  assert.equal(context.formatRouteHash('info', '题目 1'), '#info-%E9%A2%98%E7%9B%AE%201');
  assert.equal(context.parseRouteHash('#contest-info-pending-contest').name, 'contest-info');
  assert.equal(context.parseRouteHash('#contest-info-pending-contest').questionId, 'pending-contest');
  assert.equal(context.formatRouteHash('contest-info', 'pending-contest'), '#contest-info-pending-contest');
});

test('pending contest opens its own information page without changing the active question or drafts', () => {
  const pending={examVersion:'pending',title:'待补充赛事',pendingQuestions:true,questions:[],duration:240,participants:5,introduction:'比赛介绍'};
  const routes=[];
  const context={window:{OMS_EXAM_ARCHIVE:[pending]},primaryExamVersion:'primary',primaryConfig:{},config:{examVersion:'current'},
    current:2,activeQuestionId:'1221',route:name=>routes.push(name),escape:String,portalExamStatus:()=> '未开始',
    contestRuleLabel:String,contestRuleOf:()=> 'ACM/ICPC',examTimeLabel:()=> '2026-11-29 18:00',portalDuration:()=> '4小时',examParticipantCount:()=>5,
    persistActiveDraft(){throw Error('must not change editor context');}};
  vm.createContext(context);
  vm.runInContext(extract("let pendingContestVersion=",'const APP_ROUTE_NAMES='),context);
  assert.equal(context.activateExam('pending'),false);
  assert.deepEqual(routes,['contest-info']);
  assert.equal(context.config.examVersion,'current'); assert.equal(context.activeQuestionId,'1221'); assert.equal(context.current,2);
  const html=context.renderPendingContest('pending');
  assert.match(html,/题目待补充/);assert.match(html,/ACM\/ICPC/);assert.match(html,/5 人/);
  assert.doesNotMatch(html,/data-question-open|id="submit"/);
});

test('pending contest information survives refresh and missing contests return to the directory', () => {
  const context={window:{OMS_EXAM_ARCHIVE:[{examVersion:'pending',pendingQuestions:true,questions:[]}]},
    location:{hash:'#contest-info-pending'},pendingContestVersion:'',config:{questions:[{id:'1221'}]},current:0,
    history:{state:null,replaceState(){},pushState(){}},primaryConfig:{},primaryExamVersion:'primary'};
  vm.createContext(context);
  vm.runInContext(extract('const APP_ROUTE_NAMES=','function renderOmsClientChrome('),context);
  assert.equal(context.resolveInitialRoute(),'contest-info');assert.equal(context.pendingContestVersion,'pending');
  context.location.hash='#contest-info-missing';assert.equal(context.resolveInitialRoute(),'home-contests');
});

test('validator allows explicit pending contests while rejecting accidental empty exams', () => {
  const os=require('node:os'),path=require('node:path');
  const {loadAndValidateExamData}=require('./validate-exam-data');
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'oms-pending-test-')),file=path.join(temp,'fixture.js');
  const pending={examVersion:'pending',title:'待补充',category:'contest',pendingQuestions:true,totalScore:0,questions:[],duration:240,
    startAt:'2026-11-29T18:00:00+08:00',endAt:'2026-11-29T22:00:00+08:00'};
  const write=exam=>fs.writeFileSync(file,'window.OMS_EXAM_DATA='+JSON.stringify(exam)+';window.OMS_EXAM_ARCHIVE=[];');
  try{
    write(pending);const loaded=loadAndValidateExamData(file);assert.equal(loaded.report.judgeableProblems,0);assert.equal(loaded.report.testCases,0);
    write({...pending,pendingQuestions:false});assert.throws(()=>loadAndValidateExamData(file),/没有题目/);
    write({...pending,duration:120});assert.throws(()=>loadAndValidateExamData(file),/待补充考试配置无效/);
    write({...pending,questions:[{id:'1235'}]});assert.throws(()=>loadAndValidateExamData(file),/待补充考试配置无效/);
  }finally{fs.unlinkSync(file);fs.rmdirSync(temp);}
});

test('both home layouts show questions from the newest populated exam and retain their exam context', () => {
  const primary = { examVersion: 'old', title: '旧试卷', startAt: '2026-10-24', questions: [{ id: '1155', name: '旧题' }] };
  const latest = { examVersion: 'new', title: '第八次质检', startAt: '2026-11-28', questions: Array.from({ length: 8 }, (_, i) => ({ id: String(1219 + i), name: `新题${i}` })) };
  const activations = [], routes = [];
  const context = { window: { OMS_EXAM_ARCHIVE: [primary, latest, { examVersion: 'empty', title: '空试卷', startAt: '2026-12-01', questions: [] }] },
    primaryConfig: primary, primaryExamVersion: primary.examVersion, config: {},
    examListingTime: exam => Date.parse(exam.startAt), portalExamStatus: () => '未开始', escape: String,
    contestRuleOf: () => 'IOI', contestRuleLabel: String, portalIcon: () => '', examTimeLabel: exam => exam.startAt,
    portalDuration: String, examParticipantCount: () => 1,
    activateExam: (version, index) => { activations.push([version, index]); return version === 'new'; }, route: name => routes.push(name) };
  vm.createContext(context);
  vm.runInContext(extract('function openPortalQuestion(', 'function renderKnowledgeLanding('), context);
  for (const render of [context.renderPortalHome, context.renderFzuOjHome]) {
    const html = render();
    const buttons = [...html.matchAll(/data-portal-question="(\d+)" data-portal-question-exam="([^"]+)"/g)];
    assert.equal(buttons.length, 8);
    assert.deepEqual(buttons.map(match => match[2]), Array(8).fill('new'));
    assert.match(html, /1219/); assert.match(html, /1226/);
    context.openPortalQuestion(buttons[7][2], buttons[7][1]);
  }
  assert.deepEqual(activations, [['new', 7], ['new', 7]]);
  assert.deepEqual(routes, ['exam', 'exam']);
  context.openPortalQuestion('missing', 0);
  assert.equal(routes.length, 2);
});

test('home latest questions fall back to the primary exam when no archives exist', () => {
  const primary = { examVersion: 'only', title: '唯一试卷', startAt: '2026-10-24', questions: [{ id: '1155', name: '唯一题' }] };
  const context = { window: {}, primaryConfig: primary, config: {},
    portalExamStatus: () => '已结束', escape: String, contestRuleOf: () => 'IOI', contestRuleLabel: String,
    portalIcon: () => '', examTimeLabel: () => '', portalDuration: String, examParticipantCount: () => 1 };
  vm.createContext(context);
  vm.runInContext(extract('function renderPortalHome(', 'function renderFzuOjHome('), context);
  assert.match(context.renderPortalHome(), /data-portal-question="0" data-portal-question-exam="only"/);
});

test('contest directory offers a past-paper tab that excludes ended mock exams', () => {
  const context = {
    window: { OMS_EXAM_ARCHIVE: [
      { examVersion: 'past', title: '历年真题', category: 'past', questions: [], startAt: '2024-01-01' },
      { examVersion: 'mock', title: '已结束模拟卷', category: 'mock', questions: [], startAt: '2025-01-01' }
    ] },
    primaryConfig: { examVersion: 'current', title: '当前考试', category: 'mock', questions: [], startAt: '2026-01-01' },
    portalExamStatus: exam => exam.category === 'past' ? '已结束' : '未开始',
    examListingTime: exam => Date.parse(exam.startAt),
    contestRuleOf: () => 'IOI', escape: String, examParticipantCount: () => 1,
    contestRuleLabel: String, portalIcon: () => '', examTimeLabel: exam => String(exam.startAt), portalDuration: String
  };
  vm.createContext(context);
  vm.runInContext(extract('function renderPortalContests(', 'function renderHomeworkCards('), context);
  const html = context.renderPortalContests({ status: 'past', rule: '', keyword: '' });
  assert.match(html, /data-contest-status="past"[^>]*>真题</);
  assert.match(html, /历年真题/);
  assert.doesNotMatch(html, /已结束模拟卷/);
});

test('ended exams show one plain Chinese difficulty line in problem analysis', () => {
  const context = {
    PROBLEM_DIFFICULTY: new Map([['6', '普及']]),
    examHasEnded: () => true,
    difficultyTone: () => 'popular',
    escape: String
  };
  vm.createContext(context);
  vm.runInContext(extract('function problemDifficultyFor(', 'function renderProblemContent('), context);
  const html = context.renderProblemAnalysis({ id: '6' });
  assert.equal(html, '<p class="problem-analysis-line">题目难度：<span class="problem-analysis-difficulty difficulty-popular">普及</span></p>');
  assert.doesNotMatch(html, /solution-card|gradient/i);
  assert.doesNotMatch(html.replace(/<[^>]+>/g, ''), /[A-Za-z]/);
  context.examHasEnded = () => false;
  assert.match(context.renderProblemAnalysis({ id: '6' }), /无题解/);
});

test('problem directory reads submission status from each problem exam', () => {
  const context = {
    progressByExam: new Map([
      ['archive', { statuses: { '1191': 'accepted', '1192': 'wrong' }, submissions: [] }]
    ]),
    config: { examVersion: 'current', questions: [] },
    submissions: [], results: {}
  };
  vm.createContext(context);
  vm.runInContext(extract('function problemDirectoryStatus(', 'function renderProblemDirectory('), context);
  const archive = { examVersion: 'archive' };
  assert.equal(context.problemDirectoryStatus(archive, { id: '1191' }), '已通过');
  assert.equal(context.problemDirectoryStatus(archive, { id: '1192' }), '未通过');
  assert.equal(context.problemDirectoryStatus(archive, { id: '1193' }), '未提交');
});

test('legacy published scoreboard uses current per-problem progress for the signed-in user', () => {
  const context = {
    config: {
      examVersion: 'legacy', studentId: '102500000', candidateName: 'Bilibili',
      questions: [{ id: '1', score: 100 }, { id: '2', score: 100 }]
    },
    portalUser: { username: '102500000' },
    publishedScoreboards: new Map([['legacy', {
      rows: [{ userId: '102500000', userName: 'ciena', total: 400, scores: null }]
    }]]),
    scores: { 0: 50 }, results: { 0: 'partial' }, submissions: [{ problemId: '1' }],
    escape: String
  };
  vm.createContext(context);
  vm.runInContext(extract('function scoreForQuestionState(', 'function scoreForQuestion('), context);
  vm.runInContext(extract('function scoreboardUserCell(', 'function examDate('), context);
  const html = context.renderScoreboard();
  assert.match(html, /102500000（Bilibili）/);
  assert.match(html, /score-total"><b>50<\/b>/);
  assert.match(html, /score-partial"><b>50<\/b>/);
  assert.doesNotMatch(html, /未同步/);
});

test('imported historical scoreboard replaces the signed-in row with current progress', () => {
  const context = {
    config: {
      examVersion: 'imported', studentId: '102500000', candidateName: 'Bilibili',
      questions: [{ id: '1', score: 100 }, { id: '2', score: 100 }],
      scoreboard: {
        rule: 'IOI', problems: [{ letter: 'A' }, { letter: 'B' }],
        rows: [{ rank: '1', userId: 'B 102500000', userName: 'ciena', totalScore: 400, problems: ['100', '100'] }]
      }
    },
    portalUser: { username: '102500000' }, publishedScoreboards: new Map(),
    scores: { 0: 30 }, results: { 0: 'partial' }, submissions: [{ problemId: '1' }],
    escape: String
  };
  vm.createContext(context);
  vm.runInContext(extract('function scoreForQuestionState(', 'function scoreForQuestion('), context);
  vm.runInContext(extract('function scoreboardUserCell(', 'function examDate('), context);
  const html = context.renderScoreboard();
  assert.match(html, /102500000（Bilibili）/);
  assert.match(html, /score-total"><b>30<\/b>/);
  assert.match(html, /score-partial"><b>30<\/b>/);
  assert.doesNotMatch(html, /ciena|<b>400<\/b>/);
});

test('scoreboard source no longer contains the obsolete unsynced fallback', () => {
  assert.doesNotMatch(core, /userName:'ciena'|逐题成绩未同步|>未同步</);
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
    fetch: endpoint => endpoint === '/api/health' ? Promise.resolve({ ok: true }) : new Promise(resolve => requests.push(resolve)) };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('./src/client/judge/judge-machine.js', 'utf8'), context);
  return { context, node, requests, clipboard };
}
const judgeResponse = (data, options = {}) => ({ ok: options.ok !== false, status: options.status || 200, text: async () => JSON.stringify(data) });

test('only one sample runs at once; custom input renders actual stdout/stderr without stale expected output', async () => {
  const { context, node, requests } = judgeClient();
  node('#sample-input').value = 'custom'; node('#expected').textContent = 'STALE';
  const running = context.judge('sample');
  await Promise.resolve();
  assert.equal(context.samplePending, true);
  await context.judge('sample'); assert.equal(requests.length, 1);
  requests[0](judgeResponse({ verdict: 'Accepted', compared: false, message: '运行完成', testCases: [{ compared: false, actualOutput: 'actual', stderr: 'warning' }] }));
  await running;
  assert.equal(context.samplePending, false); assert.equal(context.tab, 'compiler');
  assert.match(node('#compiler-output').textContent, /actual/); assert.match(node('#compiler-output').textContent, /warning/);
  assert.doesNotMatch(node('#compiler-output').textContent, /STALE|预期输出|测试点|ms/);
  assert.match(node('#run-state').textContent, /运行完成/);
});

test('sample response after switching questions cannot paint the new question', async () => {
  const { context, node, requests } = judgeClient();
  const running = context.judge('sample'); context.config.questions = [{ id: 'other' }];
  await new Promise(setImmediate);
  requests[0](judgeResponse({ verdict: 'Accepted', message: 'old result' }));
  await running; assert.equal(node('#compiler-output').textContent, ''); assert.equal(context.samplePending, false);
});

test('submission preserves the last real run output and copies the submitted snapshot', async () => {
  const { context, node, requests, clipboard } = judgeClient();
  node('#compiler-output').textContent = 'last actual stdout';
  context.editorCode = () => 'submitted snapshot';
  const running = context.judge('submit'); context.editorCode = () => 'new unsent draft';
  await Promise.resolve();
  requests[0](judgeResponse({ verdict: 'Accepted', message: '所有测试均已通过。',
    compilerOutput: '自建评测机运行完成\n通过测试点：1/1', passedTests: 1, totalTests: 1,
    testCases: [{ verdict: 'Accepted', score: 100, timeMs: 42 }], scoring: { score: 100, status: 'accepted' } }));
  await running;
  await node('#copy-submission-code').handlers.click();
  assert.deepEqual(clipboard, ['submitted snapshot']); assert.equal(context.tab, undefined);
  assert.equal(node('#compiler-output').textContent, 'last actual stdout');
  assert.doesNotMatch(node('#run-state').textContent, /测试点|1\/1/);
  assert.equal(context.submissionPending, false);
});

test('compilation failure replaces compiler output with real diagnostics', async () => {
  const { context, node, requests } = judgeClient();
  node('#compiler-output').textContent = 'old stdout';
  const running = context.judge('submit');
  await Promise.resolve();
  requests[0](judgeResponse({ verdict: 'CompilationError', message: '编译失败。',
    compilerDiagnostics: 'main.cpp:1: error: expected ;', passedTests: 0, totalTests: 1,
    testCases: [{ verdict: 'CompilationError', hint: '编译失败' }], scoring: { score: 0, status: 'wrong' } }));
  await running;
  assert.equal(context.tab, 'compiler');
  assert.equal(node('#compiler-output').textContent, 'main.cpp:1: error: expected ;');
});

test('network failures show an actionable judge connection message', async () => {
  const { context, node } = judgeClient();
  context.fetch = async () => { throw new TypeError('Failed to fetch'); };
  await context.judge('sample');
  assert.match(node('#compiler-output').textContent, /无法连接评测服务/);
  assert.doesNotMatch(node('#compiler-output').textContent, /Failed to fetch/i);
});
