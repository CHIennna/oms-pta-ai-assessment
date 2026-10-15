(() => {
  const sidebarTabs = document.querySelector('.sidebar-tabs');
  const counter = document.querySelector('.problem-counter');
  const matrixLabel = document.querySelector('.matrix-label');
  if (!sidebarTabs || !counter || !matrixLabel) return;
  sidebarTabs.innerHTML = '<div class="overview-title"><span>题目总览</span><span>作答 / 题数</span></div>';
  counter.innerHTML = '<span>⌁&nbsp; 编程题</span><span id="answer-count">— / —</span>';
  matrixLabel.innerHTML = '<span>编程题</span><span>ⓘ 图例</span>';
  const refreshOverview = () => {
    const count = problems.length;
    const answered = problems.filter(problem => problem.result).length;
    const active = document.querySelector('.problem-cell.active');
    document.querySelector('#answer-count').textContent = `${answered || Math.max(0, currentIndex)} / ${count}`;
    if (active) active.setAttribute('aria-current', 'true');
  };
  const baseSelectProblem = selectProblem;
  selectProblem = function (index) { baseSelectProblem(index); refreshOverview(); };
  const baseRenderMatrix = renderMatrix;
  renderMatrix = function () { baseRenderMatrix(); refreshOverview(); };
  const runButton = document.querySelector('#run-sample');
  const actionRow = document.createElement('div');
  actionRow.className = 'test-actions';
  actionRow.innerHTML = '<button id="reset-sample" type="button">重置测试用例</button>';
  runButton.closest('.test-body').append(actionRow);
  document.querySelector('#reset-sample').onclick = () => {
    document.querySelector('#sample-input').value = '100311';
    document.querySelector('#run-state').textContent = '等待运行';
  };
  runButton.textContent = '▷ 运行测试';
  refreshOverview();
})();
