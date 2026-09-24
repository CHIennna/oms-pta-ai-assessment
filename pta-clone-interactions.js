(() => {
  const tester = document.querySelector('#tester');
  const testerToggle = document.querySelector('#tester-toggle');
  const run = document.querySelector('#run-test');
  const collapse = document.querySelector('#overview-toggle');
  const app = document.querySelector('#pta-app');
  const account = document.querySelector('.account');

  const setTesterToggle = () => {
    const collapsed = tester.classList.contains('collapsed');
    testerToggle.title = collapsed ? '展开测试用例' : '收起测试用例';
    testerToggle.setAttribute('aria-label', testerToggle.title);
  };
  testerToggle.onclick = () => { tester.classList.toggle('collapsed'); setTesterToggle(); };
  run.addEventListener('click', () => { tester.classList.remove('collapsed'); tester.classList.add('expanded'); setTesterToggle(); });
  setTesterToggle();

  const setOverviewToggle = () => {
    const collapsed = app.classList.contains('overview-collapsed');
    collapse.classList.toggle('is-collapsed', collapsed);
    collapse.title = collapsed ? '展开题目总览' : '收起题目总览';
    collapse.setAttribute('aria-label', collapse.title);
  };
  collapse.onclick = () => { app.classList.toggle('overview-collapsed'); setOverviewToggle(); };
  setOverviewToggle();

  const menu = document.createElement('div');
  menu.className = 'account-menu';
  [...account.querySelectorAll('.round'), account.querySelector('.admin-button')].forEach(control => menu.append(control));
  account.prepend(menu);
})();
