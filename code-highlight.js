(() => {
  const editor = document.querySelector('.editor');
  const input = document.querySelector('#code');
  const output = document.createElement('pre');
  output.className = 'syntax-highlight';
  editor.insertBefore(output, input);
  const escape = text => text.replace(/[&<>]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' })[char]);
  const highlight = source => escape(source)
    .replace(/(\/\/.*)$/gm, '<span class="comment">$1</span>')
    .replace(/(&quot;[^&]*?&quot;|'[^']*?')/g, '<span class="str">$1</span>')
    .replace(/(^\s*#\s*include\b)/gm, '<span class="pp">$1</span>')
    .replace(/\b(using|namespace|return|for|while|if|else|switch|case|break|continue|struct|public|private|const|auto|typedef)\b/g, '<span class="key">$1</span>')
    .replace(/\b(int|long|double|float|char|bool|void|string|vector|map|unordered_map|pair)\b/g, '<span class="type">$1</span>')
    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="num">$1</span>')
    .replace(/\b(main|cout|cin|push_back|begin|end|max|min)\b(?=\s*\()/g, '<span class="fn">$1</span>');
  const draw = () => { output.innerHTML = highlight(input.value) + '\n'; };
  input.addEventListener('input', draw);
  input.addEventListener('scroll', () => { output.style.transform = `translate(${-input.scrollLeft}px, ${-input.scrollTop}px)`; });
  draw();
})();
