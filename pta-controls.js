(() => {
  const screen = document.querySelector('#exam-view');
  const sidebar = screen.querySelector('.problem-sidebar');
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'sidebar-collapse';
  toggle.title = '收起题号列表';
  toggle.setAttribute('aria-label', '收起题号列表');
  toggle.textContent = '‹';
  sidebar.prepend(toggle);
  toggle.onclick = () => {
    const collapsed = screen.classList.toggle('questions-collapsed');
    toggle.textContent = collapsed ? '›' : '‹';
    toggle.title = collapsed ? '展开题号列表' : '收起题号列表';
    toggle.setAttribute('aria-label', toggle.title);
  };

  problems.forEach((problem, index) => {
    if (!problem.result && index === 0) problem.result = 'correct';
    if (!problem.result && index === 1) problem.result = 'wrong';
  });

  renderMatrix = function () {
    document.querySelector('#problem-matrix').innerHTML = problems.map((problem, index) => {
      if (!problem.result && index === 0) problem.result = 'correct';
      if (!problem.result && index === 1) problem.result = 'wrong';
      const state = problem.result || '';
      const isActive = index === currentIndex;
      const symbol = state === 'correct' ? '✓' : state === 'wrong' ? '×' : index + 1;
      return `<button class="problem-cell ${state} ${isActive ? 'active' : ''}" data-index="${index}" title="${problem.id} ${problem.name}">${symbol}</button>`;
    }).join('');
    document.querySelectorAll('.problem-cell').forEach(cell => {
      cell.onclick = () => selectProblem(Number(cell.dataset.index));
    });
  };

  selectProblem = function (index) {
    currentIndex = index;
    const problem = problems[index];
    document.querySelector('#bar-title').textContent = `${problem.id} ${problem.name}`;
    document.querySelector('#problem-title').textContent = `${problem.id} ${problem.name}`;
    document.querySelector('.score-label').textContent = `分数 ${problem.score}`;
    document.querySelector('#problem-content').innerHTML = index === 2 ? content : `<p>请根据题目要求完成 <b>${problem.name}</b>。提交后，AI 助教将对程序逻辑、边界条件和风格给出反馈。</p>`;
    document.querySelector('#submit-state').textContent = '无提交记录';
    renderMatrix();
  };

  const baseShowJudge = showJudge;
  showJudge = function (result) {
    const problem = problems[currentIndex];
    if (problem) problem.result = result.verdict === 'Accepted' ? 'correct' : 'wrong';
    renderMatrix();
    baseShowJudge(result);
  };

  document.querySelector('[data-view="exam"]').click();
  selectProblem(currentIndex);
})();
