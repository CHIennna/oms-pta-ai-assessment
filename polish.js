const testPanel = document.querySelector('#test-panel');
const compilerBody = document.querySelector('#compiler-body');
const tabButtons = document.querySelectorAll('[data-result-tab]');

tabButtons.forEach(button => button.addEventListener('click', () => {
  const isCompiler = button.dataset.resultTab === 'compiler';
  testPanel.classList.toggle('compiler-mode', isCompiler);
  tabButtons.forEach(tab => tab.classList.toggle('active', tab === button));
}));

document.querySelector('#fold-test').addEventListener('click', () => testPanel.classList.toggle('collapsed'));
