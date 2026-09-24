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
    section.innerHTML = `<h3>评测机测试点</h3><p>每个测试点都在本机 Dev-C++ 中执行；提交时按点比对输出。空白测试点不会参与判题。</p>${config.questions.map((question, qIndex) => `<div class="judge-case"><strong>${question.id} ${question.name}</strong>${makeDefaultCases(question).map((test, tIndex) => `<div class="judge-case-grid"><label>测试点 ${tIndex + 1} 输入<textarea data-q="${qIndex}" data-t="${tIndex}" data-part="input">${escape(text(test.input))}</textarea></label><label>预期输出<textarea data-q="${qIndex}" data-t="${tIndex}" data-part="expected">${escape(text(test.expected))}</textarea></label></div>`).join('')}</div>`).join('')}<div id="judge-case-note" class="judge-status"></div>`;
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
    const state = $('#run-state'), question = config.questions[current];
    const sample = { input: $('#sample-input').value, expected: $('#expected').textContent.replace(/\\n/g, '\n') };
    const tests = mode === 'sample' ? [sample] : (question.testCases || []);
    state.textContent = '评测机正在运行…'; $('#tester').classList.remove('collapsed'); $('#tester').classList.add('expanded');
    try {
      if (!['127.0.0.1', 'localhost'].includes(location.hostname)) throw Error('在线预览不能运行本机 Dev-C++ 评测机。');
      if (mode === 'submit' && !tests.length) throw Error('管理员尚未为本题配置测试点。请在考试管理中填写输入和预期输出。');
      const response = await fetch('/api/judge', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ code:code.value, language:$('#language').value, problemId:question.id, input:sample.input, mode, tests }) });
      if (!response.ok) throw Error('本机评测机不可用。');
      const result = await response.json();
      $('#compiler-output').textContent = result.compilerOutput || result.message || '评测完成。'; setTab('compiler');
      const label = { Accepted:'答案正确', WrongAnswer:'答案错误', CompilationError:'编译错误', RuntimeError:'运行时错误', TimeLimitExceeded:'运行超时', NotConfigured:'未配置测试点' }[result.verdict] || '评测失败';
      state.textContent = `${label} · ${result.passedTests ?? 0}/${result.totalTests ?? tests.length}`;
      if (mode === 'submit') { results[current] = result.verdict === 'Accepted' ? 'accepted' : 'wrong'; $('#submit-state').textContent = `刚刚提交 · ${label}`; render(); }
    } catch (error) { $('#compiler-output').textContent = error.message; setTab('compiler'); state.textContent = '评测失败'; }
  };
})();
