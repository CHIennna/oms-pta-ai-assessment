const CONFIG_KEY = 'oms-pta-admin-config-v1';
const makeDefaultConfig = () => ({
  title: '程序设计基础上机考试',
  startAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
  duration: 120,
  seat: 'PC-08', candidateName: '陈小雅', studentId: '202401050128',
  registered: 48, passed: 26,
  questions: [
    { id: '1001', name: '打印沙漏', score: 20, tests: 3 }, { id: '1002', name: '写出这个数', score: 20, tests: 3 }, { id: '1003', name: '个位数统计', score: 20, tests: 3 }, { id: '1004', name: '成绩转换', score: 15, tests: 2 }, { id: '1005', name: '继续(3n+1)猜想', score: 20, tests: 4 }
  ]
});
const clone = value => JSON.parse(JSON.stringify(value));
let adminConfig;
try { adminConfig = { ...makeDefaultConfig(), ...JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}') }; } catch { adminConfig = makeDefaultConfig(); }
if (!Array.isArray(adminConfig.questions) || !adminConfig.questions.length) adminConfig.questions = makeDefaultConfig().questions;
const adminForm = document.querySelector('#admin-form');
const settingArea = document.querySelector('#question-settings');
const dialog = document.querySelector('#manage-dialog');
const escapeHtml = text => String(text).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
const localDateValue = iso => { const date = new Date(iso); const offset = date.getTimezoneOffset() * 60000; return new Date(date - offset).toISOString().slice(0, 16); };
const readableTime = iso => new Date(iso).toLocaleString('zh-CN', { hour12: false, year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' });
const totalScore = () => adminConfig.questions.reduce((sum, item) => sum + Number(item.score || 0), 0);
function renderQuestionSettings(){ settingArea.innerHTML = adminConfig.questions.map((item, index) => `<div class="question-setting-row"><span>${escapeHtml(item.id)}</span><input data-question="name" data-index="${index}" value="${escapeHtml(item.name)}" aria-label="题目名称"><input data-question="score" data-index="${index}" value="${Number(item.score)}" type="number" min="1" max="100" aria-label="题目分数"><input data-question="tests" data-index="${index}" value="${Number(item.tests)}" type="number" min="1" max="100" aria-label="测试点数量"></div>`).join(''); }
function fillForm(){ Object.entries({ title:adminConfig.title, startAt:localDateValue(adminConfig.startAt), duration:adminConfig.duration, seat:adminConfig.seat, candidateName:adminConfig.candidateName, studentId:adminConfig.studentId, registered:adminConfig.registered, passed:adminConfig.passed }).forEach(([name,value]) => { adminForm.elements[name].value = value; }); renderQuestionSettings(); document.querySelector('#import-state').textContent = ''; }
function syncProblemArray(){
  if (typeof problems === 'undefined') return;
  const activeId = problems[currentIndex] ? problems[currentIndex].id : adminConfig.questions[0].id;
  problems.splice(0, problems.length, ...adminConfig.questions.map((question, index) => ({ id: question.id, name: question.name, score: Number(question.score), state: index < 2 ? 'done' : question.id === activeId ? 'active' : '' })));
  currentIndex = Math.max(0, problems.findIndex(question => question.id === activeId));
  if (typeof renderMatrix === 'function') renderMatrix();
  if (typeof selectProblem === 'function') selectProblem(currentIndex);
}
function renderStudents(){
  const rate = adminConfig.registered ? Math.round(adminConfig.passed / adminConfig.registered * 1000) / 10 : 0;
  document.querySelector('#student-stats').innerHTML = `<div class="student-stat"><span>参加考试</span><b>${adminConfig.registered}</b></div><div class="student-stat"><span>已提交</span><b>${Math.min(adminConfig.registered, Math.max(adminConfig.passed, adminConfig.passed + 8))}</b></div><div class="student-stat"><span>通过人数</span><b class="good">${adminConfig.passed}</b></div>`;
  document.querySelector('#student-table').innerHTML = `<div class="record-row student-row"><span>${escapeHtml(adminConfig.candidateName)}</span><span>${escapeHtml(adminConfig.studentId)}</span><span>— / ${totalScore()}</span><span><i class="status-tag ${adminConfig.passed ? 'accepted' : 'wrong'}">${adminConfig.passed ? '已通过' : '未通过'}</i></span></div><div class="record-row student-row muted-row"><span>其他考生汇总</span><span>共 ${Math.max(0, adminConfig.registered - 1)} 人</span><span>—</span><span>通过率 ${rate}%</span></div>`;
}
function syncPage(){
  const score = totalScore();
  document.title = `${adminConfig.title} · OMS`;
  document.querySelector('#exam-title-display').textContent = adminConfig.title;
  document.querySelector('#seat-display').textContent = adminConfig.seat;
  document.querySelector('#candidate-name-display').textContent = adminConfig.candidateName;
  document.querySelector('#student-id-display').textContent = adminConfig.studentId;
  document.querySelector('#home-title').textContent = adminConfig.title;
  document.querySelector('#home-time').textContent = `${readableTime(adminConfig.startAt)} 开始`;
  document.querySelector('#home-time-detail').textContent = readableTime(adminConfig.startAt);
  document.querySelector('#home-duration').textContent = `${adminConfig.duration} 分钟`;
  document.querySelector('#home-candidate').textContent = `${adminConfig.candidateName} · ${adminConfig.studentId}`;
  document.querySelector('#home-total-score').textContent = score;
  document.querySelector('#sidebar-total-score').textContent = `${score} 分`;
  document.querySelector('#home-question-count').textContent = `共 ${adminConfig.questions.length} 道编程题`;
  document.querySelector('#question-count-badge').textContent = adminConfig.questions.length;
  document.querySelector('#home-pass-count').textContent = adminConfig.passed;
  const rate = adminConfig.registered ? Math.round(adminConfig.passed / adminConfig.registered * 1000) / 10 : 0;
  document.querySelector('#home-pass-rate').textContent = `通过率 ${rate}% · 共 ${adminConfig.registered} 名考生`;
  document.querySelector('#home-questions').innerHTML = adminConfig.questions.map((question, index) => `<div class="home-question"><i>${String(index + 1).padStart(2,'0')}</i><strong>${escapeHtml(question.name)}</strong><span>${question.score} 分 · ${question.tests} 个测试点</span></div>`).join('');
  syncProblemArray(); renderStudents();
}
function tickCountdown(){
  const start = new Date(adminConfig.startAt).getTime();
  const end = start + Number(adminConfig.duration) * 60000;
  let remain = Math.max(0, Math.floor((end - Date.now()) / 1000));
  if (Date.now() < start) remain = Number(adminConfig.duration) * 60;
  const h = String(Math.floor(remain / 3600)).padStart(2,'0'); const m = String(Math.floor(remain % 3600 / 60)).padStart(2,'0'); const s = String(remain % 60).padStart(2,'0');
  document.querySelector('#countdown').textContent = `${h}:${m}:${s}`;
  document.querySelector('#remaining-box').classList.toggle('critical', remain > 0 && remain <= 300);
}
function readQuestionSettings(){ return [...settingArea.querySelectorAll('.question-setting-row')].map((row,index) => ({ id: adminConfig.questions[index].id || String(1001 + index), name: row.querySelector('[data-question="name"]').value.trim() || `未命名题目 ${index + 1}`, score: Math.max(1, Number(row.querySelector('[data-question="score"]').value) || 1), tests: Math.max(1, Number(row.querySelector('[data-question="tests"]').value) || 1) })); }
adminForm.addEventListener('submit', event => { event.preventDefault(); const data = new FormData(adminForm); adminConfig = { ...adminConfig, title:data.get('title').trim(), startAt:new Date(data.get('startAt')).toISOString(), duration:Math.max(5, Number(data.get('duration')) || 120), seat:data.get('seat').trim(), candidateName:data.get('candidateName').trim(), studentId:data.get('studentId').trim(), registered:Math.max(1, Number(data.get('registered')) || 1), passed:Math.max(0, Number(data.get('passed')) || 0), questions:readQuestionSettings() }; adminConfig.passed = Math.min(adminConfig.passed, adminConfig.registered); localStorage.setItem(CONFIG_KEY, JSON.stringify(adminConfig)); syncPage(); dialog.close(); });
document.querySelector('#manage-button').onclick = () => { fillForm(); dialog.showModal(); };
dialog.querySelector('.close').onclick = () => dialog.close();
document.querySelector('#reset-config').onclick = () => { adminConfig = makeDefaultConfig(); fillForm(); };
document.querySelector('#question-file').addEventListener('change', async event => { const file = event.target.files[0]; if (!file) return; const state = document.querySelector('#import-state'); try { const text = await file.text(); const imported = parseImportedQuestions(text, file.name); if (!imported.length) throw new Error('未读取到有效题目'); adminConfig.questions = imported; renderQuestionSettings(); state.textContent = `已导入 ${imported.length} 道题，请保存并应用`; } catch (error) { state.textContent = `导入失败：${error.message}`; state.style.color = '#ff9c9c'; } finally { event.target.value = ''; } });
function parseImportedQuestions(text, fileName){
  let rows;
  if (fileName.toLowerCase().endsWith('.json')) { const data = JSON.parse(text); rows = Array.isArray(data) ? data : data.questions; if (!Array.isArray(rows)) throw new Error('JSON 顶层应为题目数组或 questions 字段'); return rows.map((item,index) => ({ id:String(item.id || item.编号 || 1001 + index), name:String(item.name || item.title || item.题目名称 || `未命名题目 ${index+1}`), score:Math.max(1,Number(item.score || item.分数 || 20)), tests:Math.max(1,Number(item.tests || item.testPoints || item.测试点数量 || 1)) })); }
  const lines = text.replace(/^\uFEFF/,'').trim().split(/\r?\n/); if (lines.length < 2) throw new Error('CSV 至少应包含表头和一行题目'); const header = splitCsv(lines.shift()).map(value => value.trim().toLowerCase()); const pick = (names, fallback) => { const index = header.findIndex(key => names.includes(key)); return index < 0 ? fallback : index; }; const idAt=pick(['id','编号','题目编号'],0), nameAt=pick(['name','title','题目名称','题目'],1), scoreAt=pick(['score','分数'],2), testsAt=pick(['tests','testpoints','测试点数量','测试点'],3); return lines.filter(Boolean).map((line,index) => { const item=splitCsv(line); return { id:String(item[idAt] || 1001+index), name:String(item[nameAt] || `未命名题目 ${index+1}`), score:Math.max(1,Number(item[scoreAt]) || 20), tests:Math.max(1,Number(item[testsAt]) || 1) }; });
}
function splitCsv(line){ const cells=[]; let cell='', quote=false; for(const char of line){ if(char==='"') quote=!quote; else if(char===','&&!quote){cells.push(cell.trim());cell='';} else cell+=char; } cells.push(cell.trim()); return cells; }
document.querySelectorAll('[data-go-exam]').forEach(button => button.onclick = () => document.querySelector('[data-view="exam"]').click()); document.querySelectorAll('[data-go-students]').forEach(button => button.onclick = () => document.querySelector('[data-view="students"]').click());
syncPage(); tickCountdown(); setInterval(tickCountdown, 250);
