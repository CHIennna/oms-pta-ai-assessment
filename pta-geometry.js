(() => {
  const tester = document.querySelector('#tester');
  const coding = document.querySelector('.coding');
  const toggle = document.querySelector('#tester-toggle');
  const run = document.querySelector('#run-test');
  const middle = document.querySelector('.workspace-middle');
  const statement = document.querySelector('.statement');
  const handle = document.querySelector('.resize-handle');
  if (!tester || !coding || !toggle) return;
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
})();
