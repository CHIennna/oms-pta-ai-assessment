(() => {
  const screen = document.querySelector('#exam-view');
  const sidebar = screen.querySelector('.problem-sidebar');
  const toolbar = screen.querySelector('.problem-bar');
  const toggle = sidebar.querySelector('.sidebar-collapse');
  if (toggle) {
    toolbar.prepend(toggle);
    const update = () => {
      const collapsed = screen.classList.contains('questions-collapsed');
      toggle.textContent = collapsed ? '▯' : '▮';
      toggle.title = collapsed ? '展开题目总览' : '收起题目总览';
      toggle.setAttribute('aria-label', toggle.title);
    };
    toggle.onclick = () => { screen.classList.toggle('questions-collapsed'); update(); };
    update();
  }

  const testPanel = document.querySelector('#test-panel');
  const runButton = document.querySelector('#run-sample');
  const foldButton = document.querySelector('#fold-test');
  runButton.addEventListener('click', () => setTimeout(() => testPanel.classList.add('test-expanded'), 0));
  foldButton.addEventListener('click', () => testPanel.classList.remove('test-expanded'));
})();
