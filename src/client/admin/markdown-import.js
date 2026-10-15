(() => {
  const fileInput = document.querySelector('#question-file');
  const importState = document.querySelector('#import-state');
  const importHint = document.querySelector('.import-strip span');
  const importedStatements = new Map();
  fileInput.accept = '.json,.csv,.md,application/json,text/csv,text/markdown';
  importHint.textContent = '支持 Markdown、JSON 或 CSV；Markdown 将智能识别题号、题名、分数和测试点';

  const escapeHtml = text => String(text).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
  const asHtml = text => `<p>${escapeHtml(text.trim()).replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
  function parseMarkdown(text) {
    const source = text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
    const score = Number((source.match(/每题\s*(\d+)\s*分/) || [])[1]) || 20;
    const headings = [...source.matchAll(/^#{2,4}\s*(?:题目\s*)?(\d+)\s*[\.、．\s]+(.+?)\s*$/gm)];
    if (!headings.length) throw new Error('未发现“### 1. 题目名称”格式的题目标题');
    return headings.map((match, index) => {
      const start = match.index + match[0].length;
      const end = headings[index + 1] ? headings[index + 1].index : source.length;
      const statement = source.slice(start, end).trim();
      const localScore = Number((statement.match(/(?:分值|分数|本题)\s*[：:]?\s*(\d+)\s*分/) || [])[1]) || score;
      const tests = Number((statement.match(/(\d+)\s*(?:个)?测试点/) || [])[1]) || 1;
      return { id: `Q${String(index + 1).padStart(2, '0')}`, name: match[2].replace(/^[-：:]+/, '').trim(), score: localScore, tests, statement };
    });
  }

  const baseSyncProblemArray = syncProblemArray;
  syncProblemArray = function () {
    baseSyncProblemArray();
    problems.forEach((problem, index) => { problem.statement = adminConfig.questions[index] && adminConfig.questions[index].statement || ''; });
    selectProblem(currentIndex);
  };
  const baseSelectProblem = selectProblem;
  selectProblem = function (index) {
    baseSelectProblem(index);
    const statement = problems[index] && problems[index].statement;
    if (statement) document.querySelector('#problem-content').innerHTML = asHtml(statement);
  };

  document.addEventListener('change', async event => {
    if (event.target !== fileInput) return;
    const file = fileInput.files[0];
    if (!file || !/\.md$/i.test(file.name)) return;
    event.stopImmediatePropagation();
    try {
      const questions = parseMarkdown(await file.text());
      importedStatements.clear();
      questions.forEach(question => importedStatements.set(question.id, question.statement));
      adminConfig.questions = questions;
      renderQuestionSettings();
      importState.style.color = '';
      importState.textContent = `智能识别 ${questions.length} 道题；请核对分数和测试点后保存`;
    } catch (error) {
      importState.style.color = '#ff9c9c';
      importState.textContent = `Markdown 识别失败：${error.message}`;
    } finally {
      fileInput.value = '';
    }
  }, true);

  adminForm.addEventListener('submit', () => {
    if (!importedStatements.size) return;
    queueMicrotask(() => {
      adminConfig.questions = adminConfig.questions.map(question => ({ ...question, statement: importedStatements.get(question.id) || question.statement || '' }));
      localStorage.setItem(CONFIG_KEY, JSON.stringify(adminConfig));
      syncPage();
    });
  }, true);
  syncPage();
})();
