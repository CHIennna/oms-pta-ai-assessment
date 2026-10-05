(() => {
  const form = document.querySelector('#admin-form');
  const settings = document.querySelector('#question-settings');
  const note = document.querySelector('#import-note');
  const baseRenderSettings = renderSettings;
  const text = value => String(value || '');
  const makeDefaultCases = question => Array.from({ length: Math.max(1, Number(question.tests) || 1) }, (_, index) => question.testCases && question.testCases[index] || { input:'', expected:'' });

  function renderJudgeCases() {
    document.querySelector('#judge-cases')?.remove();
    const section = document.createElement('section');
    section.id = 'judge-cases'; section.className = 'judge-cases';
    section.innerHTML = `<h3>评测机固定测试点</h3><p>提交后，考生代码将由自建评测机一次编译，并逐个运行这里配置的固定输入和预期输出。空白测试点不会参与判题。</p>${config.questions.map((question, qIndex) => `<div class="judge-case"><strong>${question.id} ${question.name}</strong>${makeDefaultCases(question).map((test, tIndex) => `<div class="judge-case-grid"><label>测试点 ${tIndex + 1} 输入<textarea data-q="${qIndex}" data-t="${tIndex}" data-part="input">${escape(text(test.input))}</textarea></label><label>预期输出<textarea data-q="${qIndex}" data-t="${tIndex}" data-part="expected">${escape(text(test.expected))}</textarea></label></div>`).join('')}</div>`).join('')}<div id="judge-case-note" class="judge-status"></div>`;
    settings.after(section);
  }
  renderSettings = function () { baseRenderSettings(); renderJudgeCases(); };

  const originalOpen = document.querySelector('#open-admin').onclick;
  document.querySelector('#open-admin').onclick = () => { originalOpen(); renderJudgeCases(); };
  form.addEventListener('submit', () => {
    queueMicrotask(() => {
      const byQuestion = config.questions.map(() => []);
      document.querySelectorAll('#judge-cases textarea').forEach(area => {
        const q = Number(area.dataset.q), t = Number(area.dataset.t);
        if (!byQuestion[q][t]) byQuestion[q][t] = { input:'', expected:'' };
        byQuestion[q][t][area.dataset.part] = area.value;
      });
      config.questions.forEach((question, index) => {
        question.testCases = (byQuestion[index] || []).filter(test => test && (test.input.trim() || test.expected.trim()));
      });
      localStorage.setItem(STORAGE, JSON.stringify(config));
    });
  });

  judge = async function (mode) {
    if (mode === 'submit') return aiJudgeSubmit();
    const state = $('#run-state'), question = config.questions[current];
    const sample = { input: $('#sample-input').value, expected: $('#expected').textContent.replace(/\\n/g, '\n') };
    const tests = mode === 'sample' ? [sample] : (question.testCases || []);
    state.textContent = '评测机正在运行…'; $('#tester').classList.remove('collapsed'); $('#tester').classList.add('expanded');
    try {
      if (mode === 'submit' && !tests.length) throw Error('管理员尚未为本题配置测试点。请在考试管理中填写输入和预期输出。');
      const endpoint = document.querySelector('meta[name="oms-judge-endpoint"]')?.content.trim() || '/api/judge';
      const response = await fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ code:code.value, language:$('#language').value, problemId:question.id, input:sample.input, mode, tests }) });
      if (!response.ok) throw Error('自建评测机暂不可用。');
      const result = await response.json();
      $('#compiler-output').textContent = result.compilerOutput || result.message || '评测完成。'; setTab('compiler');
      const label = { Accepted:'答案正确', WrongAnswer:'答案错误', CompilationError:'编译错误', RuntimeError:'运行时错误', TimeLimitExceeded:'运行超时', NotConfigured:'未配置测试点' }[result.verdict] || '评测失败';
      state.textContent = `${label} · ${result.passedTests ?? 0}/${result.totalTests ?? tests.length}`;
      if (mode === 'submit') { results[current] = result.verdict === 'Accepted' ? 'accepted' : 'wrong'; $('#submit-state').textContent = `刚刚提交 · ${label}`; render(); }
    } catch (error) { $('#compiler-output').textContent = error.message; setTab('compiler'); state.textContent = '评测失败'; }
  };

  const aiVerdict = verdict => ({
    Accepted: { label: '答案正确', tone: 'accepted' },
    WrongAnswer: { label: '答案错误', tone: 'wrong' },
    CompilationError: { label: '编译错误', tone: 'error' },
    RuntimeError: { label: '段错误', tone: 'error' },
    TimeLimitExceeded: { label: '运行超时', tone: 'timeout' },
    JudgeUnavailable: { label: '评测机不可用', tone: 'review' },
    NeedsReview: { label: '等待人工核验', tone: 'review' }
  }[verdict] || { label: '等待人工核验', tone: 'review' });
  const escapeHtml = value => String(value || '').replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
  const displayTime = value => new Intl.DateTimeFormat('zh-CN', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false }).format(value).replaceAll('/', '/');
  function showSubmissionResult(result, question) {
    const dialog = document.querySelector('#submission-dialog');
    const status = aiVerdict(result.verdict);
    const accepted = result.verdict === 'Accepted';
    const maxScore = Number(String($('#score').textContent || '').match(/\d+/)?.[0]) || 20;
    const testCases = result.testCases || [];
    const totalTests = Number(result.totalTests) || testCases.length;
    const passedTests = Number(result.passedTests) || 0;
    const configuredScores = testCases.map(test => Number(test.score) || 0);
    const configuredTotal = configuredScores.reduce((sum, score) => sum + score, 0);
    const useConfiguredScores = testCases.length > 0 && configuredScores.every(score => score > 0) && Math.abs(configuredTotal - maxScore) < 0.01;
    const scoreForCase = index => useConfiguredScores ? configuredScores[index] : (totalTests ? maxScore / totalTests : maxScore);
    const finalScore = testCases.reduce((sum, test, index) => sum + (test.verdict === 'Accepted' ? scoreForCase(index) : 0), 0);
    const verdict = status.label;
    const memoryValues = testCases.map(test => test.memoryKb).filter(value => value != null && Number.isFinite(Number(value))).map(Number);
    const timeValues = testCases.map(test => test.timeMs).filter(value => value != null && Number.isFinite(Number(value))).map(Number);
    $('#submission-problem').textContent = question.id;
    $('#submission-user').textContent = $('#candidate').textContent || '考生';
    $('#submission-time').textContent = displayTime(new Date());
    $('#submission-language').textContent = $('#language').value;
    $('#submission-reviewed-at').textContent = displayTime(new Date());
    $('#submission-memory').textContent = `${memoryValues.length ? Math.max(...memoryValues) : '--'} / ${Number(result.memoryLimitKb) || 262144} KB`;
    $('#submission-duration').textContent = `${timeValues.length ? Math.max(...timeValues) : '--'} / ${Number(result.timeLimitMs) || 2000} ms`;
    $('#submission-verdict').textContent = verdict;
    $('#submission-verdict').className = status.tone;
    $('#submission-score').textContent = `${Number.isInteger(finalScore) ? finalScore : finalScore.toFixed(1)} / ${maxScore}`;
    $('#submission-test-rows').innerHTML = (testCases.length ? testCases : [{ hint:result.summary, verdict:result.verdict }]).map((test, index) => {
      const caseStatus = aiVerdict(test.verdict || result.verdict);
      const casePassed = test.verdict === 'Accepted';
      const caseMaxScore = scoreForCase(index);
      const score = casePassed ? caseMaxScore : 0;
      const memory = test.memoryKb != null && Number.isFinite(Number(test.memoryKb)) ? Number(test.memoryKb) : '--';
      const duration = test.timeMs != null && Number.isFinite(Number(test.timeMs)) ? Number(test.timeMs) : '--';
      return `<tr><td>${test.index ?? index}</td><td>${escapeHtml(test.hint || '无提示')}</td><td>${memory}</td><td>${duration}</td><td class="${caseStatus.tone}">${caseStatus.label}</td><td>${score % 1 ? score.toFixed(1) : score} / ${caseMaxScore % 1 ? caseMaxScore.toFixed(1) : caseMaxScore}</td></tr>`;
    }).join('');
    const selectedLanguage = $('#language').value;
    const codeLanguage = selectedLanguage.startsWith('C++') ? 'C++' : selectedLanguage.startsWith('C ') ? 'C' : (selectedLanguage.startsWith('Python') || selectedLanguage === 'PyPy') ? 'Python' : selectedLanguage;
    $('#submission-code-language').textContent = `[ ${codeLanguage} ]`;
    $('#submission-code').innerHTML = editorCode().split('\n').map((line, index) => `<span class="submission-code-line"><i>${index + 1}</i><code>${escapeHtml(line) || ' '}</code></span>`).join('');
    if (!dialog.open) dialog.showModal();
  }
  document.querySelector('#close-submission-dialog')?.addEventListener('click', () => document.querySelector('#submission-dialog')?.close());
  document.querySelector('#submission-dialog')?.addEventListener('click', event => { if (event.target === event.currentTarget) event.currentTarget.close(); });
  async function aiJudgeSubmit() {
    const state = $('#run-state'), question = config.questions[current];
    const tests = question.testCases || [], source = editorCode();
    state.textContent = '正在本机编译并运行测试点…';
    try {
      if (!tests.length) throw Error('该题尚未配置固定测试点。');
      const endpoint = document.querySelector('meta[name="oms-judge-endpoint"]')?.content.trim() || '/api/judge';
      const response = await fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ code:source, language:$('#language').value, problemId:question.id, mode:'submit', tests, problem:{ id:question.id, title:$('#problem-title').textContent, statement:$('#problem-text').innerText } }) });
      const result = await response.json();
      if (!response.ok) throw Error(result.detail || result.message || '自建评测机暂不可用。');
      $('#compiler-output').textContent = `${result.message || ''}\n\n${result.compilerOutput || '评测完成。'}`.trim();
      const status = aiVerdict(result.verdict); state.textContent = `自建评测完成 · ${status.label} · ${result.passedTests || 0}/${result.totalTests || 0}`;
      results[current] = result.verdict === 'Accepted' ? 'accepted' : 'wrong';
      submissions.unshift({ problemId:question.id, language:$('#language').value, verdict:status.label, candidate:config.candidateName, time:'刚刚' });
      saveSubmittedCode(question.id, source); if (activeQuestionId === question.id) loadedCode = source;
      $('#submit-state').textContent = `刚刚提交 · ${status.label}`;
      render(); showSubmissionResult(result, question);
    } catch (error) { $('#compiler-output').textContent = error.message; state.textContent = '自建评测机失败'; }
  }
  document.querySelector('#copy-submission-code')?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(editorCode()); } catch {}
  });
  document.querySelector('#format-submission-code')?.addEventListener('click', () => document.querySelector('.submission-code')?.classList.toggle('wrapped'));
  document.querySelector('#fullscreen-submission-code')?.addEventListener('click', () => document.querySelector('.submission-code')?.classList.toggle('fullscreen'));
})();
