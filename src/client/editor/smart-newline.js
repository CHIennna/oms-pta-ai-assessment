'use strict';

function loneClosingBraceNewline(lineText, cursorColumn) {
  if (cursorColumn !== lineText.length) return null;
  const match = /^([ \t]+)}[ \t]*$/.exec(lineText);
  if (!match) return null;
  const content = lineText.slice(match[1].length);
  return {
    from: 0,
    to: lineText.length,
    insert: `${content}\n`,
    cursor: content.length + 1
  };
}

module.exports = {loneClosingBraceNewline};
