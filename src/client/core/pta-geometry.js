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
  const statementFullscreen = document.querySelector('#statement-fullscreen');
  const layoutToggle = document.querySelector('#layout-toggle');
  if (statement && statementFullscreen) {
    const setStatementFullscreen = active => {
      statement.classList.toggle('statement-reading-fullscreen', active);
      document.body.classList.toggle('statement-reading-mode', active);
      statementFullscreen.textContent = active ? '退出全屏' : '全屏浏览';
      statementFullscreen.title = active ? '退出全屏浏览' : '全屏浏览题目';
      statementFullscreen.setAttribute('aria-pressed', String(active));
    };
    statementFullscreen.addEventListener('click', () => {
      const active = !statement.classList.contains('statement-reading-fullscreen');
      setStatementFullscreen(active);
      requestAnimationFrame(() => statementFullscreen.focus());
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || !statement.classList.contains('statement-reading-fullscreen')) return;
      setStatementFullscreen(false);
      statementFullscreen.focus();
    });
  }
  if (middle && layoutToggle && middle.querySelector('.coding')) {
    const workspace = middle.closest('.workspace');
    layoutToggle.addEventListener('click', () => {
      const codeFirst = !middle.classList.contains('code-first');
      middle.classList.toggle('code-first', codeFirst);
      workspace?.classList.toggle('code-first', codeFirst);
      layoutToggle.setAttribute('aria-pressed', String(codeFirst));
      layoutToggle.title = codeFirst ? '切换为题目区优先排列' : '切换为代码区优先排列';
    });
  }
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
    let activePointerId = null;
    let splitRatio = Number.NaN;
    try { splitRatio = Number(localStorage.getItem('oms-workspace-split-ratio-v2')); } catch {}
    handle.tabIndex = 0;
    handle.setAttribute('role', 'separator');
    handle.setAttribute('aria-orientation', 'vertical');
    handle.setAttribute('aria-label', '调整题目描述与代码区宽度');
    const applyLeftWidth = (requestedWidth, persist = false) => {
      if (compact.matches) return;
      const bounds = middle.getBoundingClientRect();
      const handleWidth = 9;
      const available = Math.max(0, bounds.width - handleWidth);
      if (!available) return;
      const minimumPane = Math.min(300, Math.max(220, available * .26));
      const maximum = Math.max(minimumPane, available - minimumPane);
      const leftWidth = Math.max(minimumPane, Math.min(maximum, requestedWidth));
      splitRatio = leftWidth / available;
      middle.style.gridTemplateColumns = `${Math.round(leftWidth)}px ${handleWidth}px minmax(0, 1fr)`;
      handle.setAttribute('aria-valuemin', String(Math.round(minimumPane)));
      handle.setAttribute('aria-valuemax', String(Math.round(maximum)));
      handle.setAttribute('aria-valuenow', String(Math.round(leftWidth)));
      if (persist) {
        try { localStorage.setItem('oms-workspace-split-ratio-v2', String(splitRatio)); } catch {}
      }
    };
    const restoreSplit = () => {
      if (compact.matches) return;
      const bounds = middle.getBoundingClientRect();
      const handleWidth = 9;
      const available = Math.max(0, bounds.width - handleWidth);
      applyLeftWidth(Number.isFinite(splitRatio) && splitRatio > 0 && splitRatio < 1 ? available * splitRatio : available * .43);
    };
    const resize = event => {
      if (!resizing) return;
      const bounds = middle.getBoundingClientRect();
      applyLeftWidth(event.clientX - bounds.left);
    };
    const stopResize = event => {
      if (!resizing) return;
      resizing = false;
      middle.classList.remove('is-resizing');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      if (activePointerId !== null && handle.hasPointerCapture?.(activePointerId)) handle.releasePointerCapture(activePointerId);
      activePointerId = null;
      if (Number.isFinite(splitRatio)) {
        try { localStorage.setItem('oms-workspace-split-ratio-v2', String(splitRatio)); } catch {}
      }
      event?.preventDefault?.();
    };
    handle.addEventListener('pointerdown', event => {
      if (compact.matches || event.button !== 0) return;
      event.preventDefault();
      resizing = true;
      activePointerId = event.pointerId;
      handle.setPointerCapture(event.pointerId);
      middle.classList.add('is-resizing');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      resize(event);
    });
    handle.addEventListener('pointermove', resize);
    handle.addEventListener('pointerup', stopResize);
    handle.addEventListener('pointercancel', stopResize);
    handle.addEventListener('keydown', event => {
      if (compact.matches || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const current = Number(handle.getAttribute('aria-valuenow')) || middle.getBoundingClientRect().width * .43;
      applyLeftWidth(current + (event.key === 'ArrowLeft' ? -1 : 1) * (event.shiftKey ? 40 : 16), true);
    });
    window.addEventListener('blur', stopResize);
    window.addEventListener('resize', () => requestAnimationFrame(restoreSplit));
    requestAnimationFrame(restoreSplit);
  }
  sync();
  syncOverview();
})();
