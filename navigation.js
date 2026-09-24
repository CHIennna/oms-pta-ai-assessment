(() => {
  const switchView = view => {
    const target = document.querySelector(`#${view}-view`);
    if (!target) return;
    document.querySelectorAll('.rail-item').forEach(button => {
      button.classList.toggle('selected', button.dataset.view === view);
    });
    document.querySelectorAll('.exam-app > .view').forEach(panel => {
      panel.classList.toggle('active', panel === target);
    });
  };

  document.querySelectorAll('.rail-item').forEach(button => {
    button.onclick = () => switchView(button.dataset.view);
  });
})();
