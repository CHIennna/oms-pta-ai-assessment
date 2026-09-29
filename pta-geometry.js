(() => {
  const tester = document.querySelector('#tester');
  const coding = document.querySelector('.coding');
  const toggle = document.querySelector('#tester-toggle');
  const run = document.querySelector('#run-test');
  const middle = document.querySelector('.workspace-middle');
  const statement = document.querySelector('.statement');
  const handle = document.querySelector('.resize-handle');
  const app = document.querySelector('#pta-app');
  const overviewToggle = document.querySelector('#overview-toggle');
  const overview = document.querySelector('#overview');
  if (!tester || !coding || !toggle) return;
  const compact = window.matchMedia('(max-width: 760px)');
  const syncOverview = () => {
    if (!app || !overviewToggle) return;
    const expanded = !app.classList.contains('overview-collapsed');
    overviewToggle.setAttribute('aria-expanded', String(expanded));
    overviewToggle.setAttribute('aria-label', expanded ? '收起题目总览' : '展开题目总览');
  };
  if (compact.matches && app) app.classList.add('overview-collapsed');
  compact.addEventListener('change', event => {
    if (!app) return;
    if (event.matches) app.classList.add('overview-collapsed');
    else app.classList.remove('overview-collapsed');
    syncOverview();
  });
  overviewToggle?.addEventListener('click', () => requestAnimationFrame(syncOverview));
  if (overview && app) {
    const closeOverview = document.createElement('button');
    closeOverview.type = 'button'; closeOverview.id = 'mobile-overview-close'; closeOverview.textContent = '×';
    closeOverview.setAttribute('aria-label', '收起题目总览');
    closeOverview.addEventListener('click', () => { app.classList.add('overview-collapsed'); syncOverview(); });
    overview.prepend(closeOverview);
    overview.addEventListener('click', event => {
      if (!compact.matches || !event.target.closest('.question-grid button')) return;
      app.classList.add('overview-collapsed'); syncOverview();
    });
  }
  coding.append(tester);
  const sync = () => {
    const collapsed = tester.classList.contains('collapsed');
    toggle.title = collapsed ? '展开测试用例' : '收起测试用例';
    toggle.setAttribute('aria-label', toggle.title);
  };
  toggle.onclick = () => { tester.classList.toggle('collapsed'); sync(); };
  run.addEventListener('click', () => { tester.classList.remove('collapsed'); tester.classList.add('expanded'); sync(); });
  if (middle && statement && handle) {
    let resizing = false;
    const resize = event => {
      if (!resizing) return;
      const bounds = middle.getBoundingClientRect();
      const minimum = 300;
      const maximum = Math.max(minimum, bounds.width - 400);
      const leftWidth = Math.max(minimum, Math.min(maximum, event.clientX - bounds.left));
      middle.style.gridTemplateColumns = `${Math.round(leftWidth)}px 9px minmax(400px, 1fr)`;
    };
    handle.addEventListener('pointerdown', event => {
      resizing = true;
      handle.setPointerCapture(event.pointerId);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      resize(event);
    });
    handle.addEventListener('pointermove', resize);
    handle.addEventListener('pointerup', () => {
      resizing = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    });
    handle.addEventListener('pointercancel', () => {
      resizing = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    });
  }
  sync();
  syncOverview();
})();
