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
    section.innerHTML = `<h3>评测机测试点</h3><p>每个测试点通过 OneCompiler 云端隔离评测服务执行；提交时按点比对输出。空白测试点不会参与判题。</p>${config.questions.map((question, qIndex) => `<div class="judge-case"><strong>${question.id} ${question.name}</strong>${makeDefaultCases(question).map((test, tIndex) => `<div class="judge-case-grid"><label>测试点 ${tIndex + 1} 输入<textarea data-q="${qIndex}" data-t="${tIndex}" data-part="input">${escape(text(test.input))}</textarea></label><label>预期输出<textarea data-q="${qIndex}" data-t="${tIndex}" data-part="expected">${escape(text(test.expected))}</textarea></label></div>`).join('')}</div>`).join('')}<div id="judge-case-note" class="judge-status"></div>`;
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
    if (mode === 'submit') return aiAssess('submit');
    const state = $('#run-state'), question = config.questions[current];
    const sample = { input: $('#sample-input').value, expected: $('#expected').textContent.replace(/\\n/g, '\n') };
    const tests = mode === 'sample' ? [sample] : (question.testCases || []);
    state.textContent = '评测机正在运行…'; $('#tester').classList.remove('collapsed'); $('#tester').classList.add('expanded');
    try {
      if (mode === 'submit' && !tests.length) throw Error('管理员尚未为本题配置测试点。请在考试管理中填写输入和预期输出。');
      const endpoint = document.querySelector('meta[name="oms-judge-endpoint"]')?.content.trim() || '/api/judge';
      const response = await fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ code:code.value, language:$('#language').value, problemId:question.id, input:sample.input, mode, tests }) });
      if (!response.ok) throw Error('云端评测服务不可用。');
      const result = await response.json();
      $('#compiler-output').textContent = result.compilerOutput || result.message || '评测完成。'; setTab('compiler');
      const label = { Accepted:'答案正确', WrongAnswer:'答案错误', CompilationError:'编译错误', RuntimeError:'运行时错误', TimeLimitExceeded:'运行超时', NotConfigured:'未配置测试点' }[result.verdict] || '评测失败';
      state.textContent = `${label} · ${result.passedTests ?? 0}/${result.totalTests ?? tests.length}`;
      if (mode === 'submit') { results[current] = result.verdict === 'Accepted' ? 'accepted' : 'wrong'; $('#submit-state').textContent = `刚刚提交 · ${label}`; render(); }
    } catch (error) { $('#compiler-output').textContent = error.message; setTab('compiler'); state.textContent = '评测失败'; }
  };

  function renderAiReview(result) {
    const verdict = { LikelyAccepted: '大概率正确', LikelyWrongAnswer: '存在错误风险', NeedsReview: '需要人工核验' }[result.verdict] || '需要人工核验';
    const tests = (result.testCases || []).map((test, index) => `测试点 ${index + 1}${test.reason ? `（${test.reason}）` : ''}\n输入：\n${test.input || '(无)'}\n预期输出：\n${test.expected || '(AI 未可靠推导)'}`).join('\n\n');
    const findings = (result.findings || []).map(item => `- ${item}`).join('\n') || '- 未发现明确问题';
    const suggestions = (result.suggestions || []).map(item => `- ${item}`).join('\n') || '- 暂无额外建议';
    return `DeepSeek 智能评测（模型推理，未实际执行代码）\n结论：${verdict} · 置信度：${result.confidence || '低'}\n\n${result.summary || ''}\n\n生成测试点：\n${tests || '(未生成)'}\n\n风险分析：\n${findings}\n\n修改建议：\n${suggestions}`;
  }
  const escapeHtml = value => String(value || '').replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
  const displayTime = value => new Intl.DateTimeFormat('zh-CN', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false }).format(value).replaceAll('/', '/');
  function showSubmissionResult(result, question) {
    const dialog = document.querySelector('#submission-dialog');
    const accepted = result.verdict === 'LikelyAccepted';
    const maxScore = Number(String($('#score').textContent || '').match(/\d+/)?.[0]) || 20;
    const testCases = result.testCases || [];
    const perCaseScore = testCases.length ? (maxScore / testCases.length) : maxScore;
    const finalScore = accepted ? maxScore : 0;
    const verdict = accepted ? '大概率正确' : result.verdict === 'LikelyWrongAnswer' ? '存在错误风险' : '需要人工核验';
    $('#submission-problem').textContent = `${question.id} ${question.name}`;
    $('#submission-user').textContent = $('#candidate').textContent || '考生';
    $('#submission-time').textContent = displayTime(new Date());
    $('#submission-language').textContent = $('#language').value;
    $('#submission-reviewed-at').textContent = displayTime(new Date());
    $('#submission-verdict').textContent = verdict;
    $('#submission-verdict').className = accepted ? 'accepted' : 'review';
    $('#submission-score').textContent = `${finalScore} / ${maxScore}`;
    $('#submission-test-rows').innerHTML = (testCases.length ? testCases : [{ reason: result.summary }]).map((test, index) => `<tr><td>${index}</td><td>${escapeHtml(test.reason || 'AI 生成测试点')}</td><td>AI 评测 / --</td><td class="${accepted ? 'accepted' : 'review'}">${verdict}</td><td>${accepted ? `${perCaseScore % 1 ? perCaseScore.toFixed(1) : perCaseScore} / ${perCaseScore % 1 ? perCaseScore.toFixed(1) : perCaseScore}` : `0 / ${perCaseScore % 1 ? perCaseScore.toFixed(1) : perCaseScore}`}</td></tr>`).join('');
    $('#submission-code').textContent = code.value;
    if (!dialog.open) dialog.showModal();
  }
  document.querySelector('#close-submission-dialog')?.addEventListener('click', () => document.querySelector('#submission-dialog')?.close());
  document.querySelector('#submission-dialog')?.addEventListener('click', event => { if (event.target === event.currentTarget) event.currentTarget.close(); });
  async function aiAssess(mode) {
    const state = $('#run-state'), question = config.questions[current];
    state.textContent = mode === 'submit' ? 'DeepSeek 正在评测并提交…' : 'DeepSeek 正在生成测试点与分析…'; $('#tester').classList.remove('collapsed'); $('#tester').classList.add('expanded');
    try {
      const endpoint = document.querySelector('meta[name="oms-ai-assess-endpoint"]')?.content.trim() || '/api/ai-assess';
      const response = await fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ code:code.value, language:$('#language').value, problem:{ id:question.id, title:$('#problem-title').textContent, statement:$('#problem-text').innerText } }) });
      const result = await response.json();
      if (!response.ok) throw Error(result.detail || result.message || 'AI 辅助评测服务不可用。');
      $('#compiler-output').textContent = renderAiReview(result); setTab('compiler');
      state.textContent = `AI 辅助评测完成 · ${ { LikelyAccepted:'大概率正确', LikelyWrongAnswer:'存在风险', NeedsReview:'待核验' }[result.verdict] || '待核验' }`;
      if (mode === 'submit') {
        const accepted = result.verdict === 'LikelyAccepted';
        results[current] = accepted ? 'accepted' : 'wrong';
        $('#submit-state').textContent = `刚刚提交 · DeepSeek 评测：${accepted ? '大概率正确' : '待修改或人工核验'}`;
        render();
        showSubmissionResult(result, question);
      }
    } catch (error) { $('#compiler-output').textContent = error.message; setTab('compiler'); state.textContent = 'AI 辅助评测失败'; }
  }
})();
