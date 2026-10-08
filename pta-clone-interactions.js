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
  const profileDialog = document.querySelector('#profile-dialog');
  const profileForm = document.querySelector('#profile-form');
  const profilePreview = document.querySelector('#profile-avatar-preview');
  const profileNote = document.querySelector('#profile-note');
  const profilePasswordState = document.querySelector('#profile-password-state');
  const accountName = account.querySelector(':scope > b');
  const defaults = { userId: '', username: '', nickname: '', avatar: '', email: '', phone: '' };
  let profile = { ...defaults, ...(window.omsAuth.user || {}) };
  let pendingAvatar = profile.avatar;
  const initials = () => String(profile.nickname || profile.username || 'U').trim().slice(0, 2).toUpperCase();
  const paintAvatar = (element, image, fallbackText) => {
    element.style.backgroundImage = image ? `url("${image}")` : '';
    element.classList.toggle('has-image', Boolean(image));
    element.textContent = image ? '' : fallbackText;
  };
  const applyProfile = () => {
    const displayName = profile.nickname || profile.username;
    if (accountName) accountName.textContent = displayName || '未登录';
    paintAvatar(account.querySelector('.avatar'), profile.avatar, initials());
    const portalButton = document.querySelector('[data-profile-open]');
    if (portalButton && window.omsAuth.user) {
      portalButton.querySelector('p b').textContent = profile.username;
      portalButton.querySelector('p small').textContent = profile.nickname || '本站账号';
      paintAvatar(portalButton.querySelector(':scope > span'), profile.avatar, initials());
    }
  };
  document.addEventListener('oms:auth-change', event => {
    profile = { ...defaults, ...(event.detail || {}) }; pendingAvatar = profile.avatar;
    if (profileDialog.open && !event.detail) profileDialog.close();
    applyProfile();
  });
  // Identity belongs to the server, not editable browser configuration.
  profileForm.elements.userId.readOnly = true;
  profileForm.elements.username.readOnly = true;
  profileForm.elements.password.minLength = 10;
  profileForm.elements.passwordConfirm.minLength = 10;
  const currentPasswordLabel = document.createElement('label');
  currentPasswordLabel.className = 'profile-password';
  currentPasswordLabel.innerHTML = '当前本站密码<input name="currentPassword" type="password" maxlength="128" autocomplete="current-password" placeholder="修改密码时填写">';
  profileForm.elements.password.closest('label').before(currentPasswordLabel);
  const fillProfileForm = () => {
    for (const key of ['userId', 'username', 'nickname', 'email', 'phone']) profileForm.elements[key].value = profile[key] || '';
    profileForm.elements.password.value = '';
    profileForm.elements.passwordConfirm.value = '';
    profileForm.elements.currentPassword.value = '';
    pendingAvatar = profile.avatar || '';
    paintAvatar(profilePreview, pendingAvatar, initials());
    profilePasswordState.textContent = '本站密码，至少 10 个字符；留空不修改';
    profileNote.textContent = '本站独立账号，尚未绑定学校身份。账号编号与用户名不可修改。';
  };
  const closeAccountMenu = () => { account.classList.remove('menu-open'); account.querySelector('.avatar').setAttribute('aria-expanded', 'false'); };
  const openProfile = async () => {
    closeAccountMenu();
    if (!await window.omsAuth.require('profile')) return;
    profile = { ...defaults, ...window.omsAuth.user };
    fillProfileForm(); if (!profileDialog.open) profileDialog.showModal();
  };
  const preferences = document.createElement('button'); preferences.type = 'button'; preferences.className = 'account-menu-item'; preferences.textContent = '个人中心'; preferences.addEventListener('click', openProfile);
  document.addEventListener('oms:open-profile', openProfile);
  const theme = document.createElement('button'); theme.type = 'button'; theme.className = 'account-menu-item';
  const setTheme = light => { app.classList.toggle('light-mode', light); profileDialog.classList.toggle('light-mode', light); theme.textContent = light ? '切换深色模式' : '切换浅色模式'; localStorage.setItem('oms-pta-theme', light ? 'light' : 'dark'); };
  setTheme(localStorage.getItem('oms-pta-theme') === 'light'); theme.addEventListener('click', () => setTheme(!app.classList.contains('light-mode')));
  const logout = document.createElement('button'); logout.type = 'button'; logout.className = 'account-menu-item'; logout.textContent = '退出登录'; logout.addEventListener('click', () => { closeAccountMenu(); window.omsAuth.logout(); });
  menu.append(admin, preferences, theme, logout);
  account.prepend(menu);
  const avatar = account.querySelector('.avatar');
  avatar.setAttribute('role', 'button'); avatar.tabIndex = 0; avatar.setAttribute('aria-expanded', 'false');
  const toggleAccountMenu = () => { if (!window.omsAuth.user) { window.omsAuth.require('profile').then(ok => { if (ok) openProfile(); }); return; } const open = account.classList.toggle('menu-open'); avatar.setAttribute('aria-expanded', String(open)); };
  avatar.addEventListener('click', toggleAccountMenu);
  avatar.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleAccountMenu(); } });
  document.addEventListener('click', event => { if (!account.contains(event.target)) { account.classList.remove('menu-open'); avatar.setAttribute('aria-expanded', 'false'); } });
  profileDialog.querySelector('.close').addEventListener('click', () => profileDialog.close());
  profileDialog.querySelector('.cancel').addEventListener('click', () => profileDialog.close());
  profileForm.elements.avatar.addEventListener('change', event => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { profileNote.textContent = '请选择图片文件。'; return; }
    if (file.size > 1024 * 1024) { profileNote.textContent = '头像文件不能超过 1 MB。'; event.target.value = ''; return; }
    const reader = new FileReader();
    reader.onload = () => { pendingAvatar = String(reader.result || ''); paintAvatar(profilePreview, pendingAvatar, initials()); profileNote.textContent = ''; };
    reader.onerror = () => { profileNote.textContent = '头像读取失败，请重新选择。'; };
    reader.readAsDataURL(file);
  });
  document.querySelector('#profile-avatar-remove').addEventListener('click', () => { pendingAvatar = ''; profileForm.elements.avatar.value = ''; paintAvatar(profilePreview, '', initials()); });
  profileForm.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(profileForm);
    const password = String(data.get('password') || '');
    const nickname = String(data.get('nickname') || '').trim();
    if (!nickname) { profileNote.textContent = '昵称不能为空。'; return; }
    if (password !== String(data.get('passwordConfirm') || '')) { profileNote.textContent = '两次输入的密码不一致。'; return; }
    if (password && password.length < 10) { profileNote.textContent = '新密码至少需要 10 个字符。'; return; }
    if (password && !data.get('currentPassword')) { profileNote.textContent = '修改密码需要输入当前本站密码。'; return; }
    const save = profileForm.querySelector('.save');
    save.disabled = true;
    profileNote.textContent = '正在保存…';
    try {
      const session = await window.omsAuth.request('/api/auth/profile', { nickname, avatar: pendingAvatar, email: String(data.get('email') || '').trim(), phone: String(data.get('phone') || '').trim(), password, passwordConfirm: String(data.get('passwordConfirm') || ''), currentPassword: String(data.get('currentPassword') || '') });
      window.omsAuth.update(session);
      for (const key of ['password', 'passwordConfirm', 'currentPassword']) profileForm.elements[key].value = '';
      profileDialog.close();
      if (document.querySelector('#pta-app').classList.contains('portal-mode')) route(activeRoute, true);
    } catch (error) { profileNote.textContent = error.message || '个人资料保存失败。'; if (error.status === 401) { profileDialog.close(); window.omsAuth.require('profile'); } }
    finally { save.disabled = false; }
  });
  applyProfile();
})();
