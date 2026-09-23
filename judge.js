const localJudge = location.protocol === 'file:' || ['127.0.0.1', 'localhost'].includes(location.hostname);
const apiBase = location.protocol === 'file:' ? 'http://127.0.0.1:4173' : localJudge ? '' : null;
let lastSubmission = null;
const verdictLabels = { Accepted: '答案正确', WrongAnswer: '答案错误', CompilationError: '编译错误', RuntimeError: '运行时错误', TimeLimitExceeded: '运行超时', UnsupportedLanguage: '暂不支持该语言', NotConfigured: '本题待配置', ServerError: '评测服务不可用' };
const verdictClasses = { Accepted: 'accepted', WrongAnswer: 'wrong', CompilationError: 'compile', RuntimeError: 'runtime', TimeLimitExceeded: 'timeout', UnsupportedLanguage: 'compile', NotConfigured: 'compile', ServerError: 'compile' };
function currentProblemId(){ return document.querySelector('#bar-title').textContent.split(' ')[0]; }
function setCompiler(result){
  const detail = result.compilerOutput || result.stderr || result.stdout || '评测完成。';
  document.querySelector('#compiler-body').textContent = detail;
  document.querySelector('#test-panel').classList.add('compiler-mode');
  document.querySelectorAll('[data-result-tab]').forEach(tab => tab.classList.toggle('active', tab.dataset.resultTab === 'compiler'));
}
function setInlineVerdict(result){
  const box = document.querySelector('#ai-feedback');
  const cls = verdictClasses[result.verdict] || 'compile';
  box.className = 'verdict-line ' + cls;
  box.innerHTML = `<span class="verdict-dot">${result.verdict === 'Accepted' ? '✓' : '×'}</span><span><b>${verdictLabels[result.verdict] || '评测完成'}</b><br>${result.message || '请查看编译器输出。'}</span>`;
}
async function judge(mode){
  if (!apiBase) throw new Error('当前为 GitHub Pages 在线演示，无法运行 Dev-C++。请使用本机评测服务进行真实判题。');
  const input = document.querySelector('#sample-input').value;
  const payload = { code: document.querySelector('#code').value, language: document.querySelector('#language').value, problemId: currentProblemId(), input, mode };
  const response = await fetch(apiBase + '/api/judge', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
  if(!response.ok) throw new Error('无法连接本机评测服务。请双击 start-local.cmd 后重试。');
  return response.json();
}
document.querySelector('#run-sample').onclick = async () => {
  const state = document.querySelector('#run-state'); state.className = ''; state.textContent = '正在运行…';
  try { const result = await judge('sample'); lastSubmission = result; setCompiler(result); setInlineVerdict(result); state.className = result.verdict === 'Accepted' ? 'pass' : ''; state.textContent = result.verdict === 'Accepted' ? '样例通过' : verdictLabels[result.verdict]; }
  catch (error) { state.textContent = '运行失败'; setCompiler({compilerOutput:error.message}); setInlineVerdict({verdict:'ServerError',message:error.message}); }
};
document.querySelector('#submit-btn').onclick = async () => {
  const button = document.querySelector('#submit-btn'); button.disabled = true; button.textContent = '正在评测…';
  try { const result = await judge('submit'); lastSubmission = result; setCompiler(result); setInlineVerdict(result); document.querySelector('#submit-state').textContent = '刚刚提交 · ' + (verdictLabels[result.verdict] || '评测完成'); showJudge(result); updateSubmissionList(result); }
  catch (error) { const result = {verdict:'ServerError',message:error.message,compilerOutput:error.message}; lastSubmission = result; setCompiler(result); setInlineVerdict(result); showJudge(result); }
  finally { button.disabled = false; button.textContent = '提交本题作答'; }
};
function showJudge(result){ const accepted = result.verdict === 'Accepted'; document.querySelector('#judge-summary').innerHTML = `<div class="judge-result ${accepted ? 'accepted' : 'rejected'}"><span class="result-mark">${accepted ? '✓' : '×'}</span><div><h2>${verdictLabels[result.verdict] || '评测完成'}</h2><p>${result.message || '已完成本次评测。'}</p></div></div>`; document.querySelector('#judge-points').innerHTML = `<div>语言：<strong>${document.querySelector('#language').value}</strong></div><div>测试点：<strong>${result.passedTests ?? 0} / ${result.totalTests ?? 1}</strong></div><div>用时：<strong>${result.timeMs ?? 0} ms</strong>　内存：<strong>${result.memory ?? '—'}</strong></div>`; document.querySelector('#judge-dialog').showModal(); }
function updateSubmissionList(result){ const table = document.querySelector('.record-card'); const label = verdictLabels[result.verdict] || '评测完成'; const cls = verdictClasses[result.verdict] || 'compile'; table.innerHTML = `<div class="record-row"><span>题目</span><span>语言</span><span>状态</span><span>提交时间</span></div><div class="record-row"><span>${currentProblemId()} ${document.querySelector('#problem-title').textContent.replace(currentProblemId(),'').trim()}</span><span>${document.querySelector('#language').value}</span><span><i class="status-tag ${cls}">${label}</i></span><span>刚刚</span></div>`; }
document.querySelector('#close-judge').onclick = () => document.querySelector('#judge-dialog').close(); document.querySelector('#judge-confirm').onclick = () => document.querySelector('#judge-dialog').close(); document.querySelector('#view-submissions').onclick = () => { document.querySelector('#judge-dialog').close(); document.querySelector('[data-view="submissions"]').click(); };
