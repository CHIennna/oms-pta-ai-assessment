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
  const admin = account.querySelector('.admin-button');
  const preferences = document.createElement('button'); preferences.type = 'button'; preferences.className = 'account-menu-item'; preferences.textContent = '设置'; preferences.addEventListener('click', () => admin.click());
  const theme = document.createElement('button'); theme.type = 'button'; theme.className = 'account-menu-item';
  const setTheme = light => { app.classList.toggle('light-mode', light); theme.textContent = light ? '切换深色模式' : '切换浅色模式'; localStorage.setItem('oms-pta-theme', light ? 'light' : 'dark'); };
  setTheme(localStorage.getItem('oms-pta-theme') === 'light'); theme.addEventListener('click', () => setTheme(!app.classList.contains('light-mode')));
  menu.append(admin, preferences, theme);
  account.prepend(menu);
  const avatar = account.querySelector('.avatar');
  avatar.setAttribute('role', 'button'); avatar.tabIndex = 0; avatar.setAttribute('aria-expanded', 'false');
  const toggleAccountMenu = () => { const open = account.classList.toggle('menu-open'); avatar.setAttribute('aria-expanded', String(open)); };
  avatar.addEventListener('click', toggleAccountMenu);
  avatar.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleAccountMenu(); } });
  document.addEventListener('click', event => { if (!account.contains(event.target)) { account.classList.remove('menu-open'); avatar.setAttribute('aria-expanded', 'false'); } });
})();
