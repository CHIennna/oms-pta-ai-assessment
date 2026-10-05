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
  const PROFILE_STORAGE = 'oms-pta-user-profile-v1';
  const defaults = { userId: config.studentId || '', username: accountName?.textContent?.trim() || 'user', nickname: config.candidateName || '', avatar: '', email: '', phone: '', passwordHash: '', passwordSalt: '' };
  let profile = { ...defaults };
  try { profile = { ...defaults, ...(JSON.parse(localStorage.getItem(PROFILE_STORAGE) || '{}') || {}) }; } catch {}
  let pendingAvatar = profile.avatar;
  const initials = () => String(profile.nickname || profile.username || 'U').trim().slice(0, 2).toUpperCase();
  const paintAvatar = (element, image, fallbackText) => {
    element.style.backgroundImage = image ? `url("${image}")` : '';
    element.classList.toggle('has-image', Boolean(image));
    element.textContent = image ? '' : fallbackText;
  };
  const applyProfile = () => {
    const displayName = profile.nickname || profile.username;
    config.candidateName = displayName;
    config.studentId = profile.userId;
    primaryConfig.candidateName = displayName;
    primaryConfig.studentId = profile.userId;
    localStorage.setItem(STORAGE, JSON.stringify(primaryConfig));
    if (accountName) accountName.textContent = profile.username;
    paintAvatar(account.querySelector('.avatar'), profile.avatar, initials());
    render();
  };
  const bytesToBase64 = bytes => btoa(String.fromCharCode(...bytes));
  const hashPassword = async password => {
    if (!crypto?.subtle) throw new Error('当前浏览器不支持安全保存密码。');
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 120000, hash: 'SHA-256' }, key, 256);
    return { passwordHash: bytesToBase64(new Uint8Array(bits)), passwordSalt: bytesToBase64(salt) };
  };
  const fillProfileForm = () => {
    for (const key of ['userId', 'username', 'nickname', 'email', 'phone']) profileForm.elements[key].value = profile[key] || '';
    profileForm.elements.password.value = '';
    profileForm.elements.passwordConfirm.value = '';
    pendingAvatar = profile.avatar || '';
    paintAvatar(profilePreview, pendingAvatar, initials());
    profilePasswordState.textContent = profile.passwordHash ? '已设置；留空则保持不变' : '尚未设置';
    profileNote.textContent = '';
  };
  const closeAccountMenu = () => { account.classList.remove('menu-open'); account.querySelector('.avatar').setAttribute('aria-expanded', 'false'); };
  const preferences = document.createElement('button'); preferences.type = 'button'; preferences.className = 'account-menu-item'; preferences.textContent = '个人中心'; preferences.addEventListener('click', () => { closeAccountMenu(); fillProfileForm(); profileDialog.showModal(); });
  const theme = document.createElement('button'); theme.type = 'button'; theme.className = 'account-menu-item';
  const setTheme = light => { app.classList.toggle('light-mode', light); profileDialog.classList.toggle('light-mode', light); theme.textContent = light ? '切换深色模式' : '切换浅色模式'; localStorage.setItem('oms-pta-theme', light ? 'light' : 'dark'); };
  setTheme(localStorage.getItem('oms-pta-theme') === 'light'); theme.addEventListener('click', () => setTheme(!app.classList.contains('light-mode')));
  menu.append(admin, preferences, theme);
  account.prepend(menu);
  const avatar = account.querySelector('.avatar');
  avatar.setAttribute('role', 'button'); avatar.tabIndex = 0; avatar.setAttribute('aria-expanded', 'false');
  const toggleAccountMenu = () => { const open = account.classList.toggle('menu-open'); avatar.setAttribute('aria-expanded', String(open)); };
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
    const identity = { userId: String(data.get('userId') || '').trim(), username: String(data.get('username') || '').trim(), nickname: String(data.get('nickname') || '').trim() };
    if (!identity.userId || !identity.username || !identity.nickname) { profileNote.textContent = '用户编号、用户名和昵称不能为空。'; return; }
    if (password !== String(data.get('passwordConfirm') || '')) { profileNote.textContent = '两次输入的密码不一致。'; return; }
    if (password && password.length < 8) { profileNote.textContent = '新密码至少需要 8 个字符。'; return; }
    const save = profileForm.querySelector('.save');
    save.disabled = true;
    profileNote.textContent = '正在保存…';
    try {
      const passwordRecord = password ? await hashPassword(password) : { passwordHash: profile.passwordHash, passwordSalt: profile.passwordSalt };
      profile = { ...identity, avatar: pendingAvatar, email: String(data.get('email')).trim(), phone: String(data.get('phone')).trim(), ...passwordRecord };
      localStorage.setItem(PROFILE_STORAGE, JSON.stringify(profile));
      applyProfile();
      profileDialog.close();
    } catch (error) { profileNote.textContent = error.message || '个人资料保存失败。'; }
    finally { save.disabled = false; }
  });
  applyProfile();
})();
