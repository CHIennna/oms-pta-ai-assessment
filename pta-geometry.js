(() => {
  const tester = document.querySelector('#tester');
  const coding = document.querySelector('.coding');
  const toggle = document.querySelector('#tester-toggle');
  const run = document.querySelector('#run-test');
  if (!tester || !coding || !toggle) return;
  coding.append(tester);
  const sync = () => {
    const collapsed = tester.classList.contains('collapsed');
    toggle.title = collapsed ? '展开测试用例' : '收起测试用例';
    toggle.setAttribute('aria-label', toggle.title);
  };
  toggle.onclick = () => { tester.classList.toggle('collapsed'); sync(); };
  run.addEventListener('click', () => { tester.classList.remove('collapsed'); tester.classList.add('expanded'); sync(); });
  sync();
})();
