'use strict';

function documentLines(text) {
  const lines = [];
  let from = 0;
  for (let index = 0; index <= text.length; index++) {
    if (index !== text.length && text[index] !== '\n') continue;
    const to = index > from && text[index - 1] === '\r' ? index - 1 : index;
    lines.push({from, to, text: text.slice(from, to)});
    from = index + 1;
  }
  return lines;
}

function lineIndexAt(lines, position) {
  let low = 0;
  let high = lines.length;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (lines[middle].from <= position) low = middle + 1;
    else high = middle;
  }
  return Math.max(0, low - 1);
}

function lineCommentChanges(text, ranges, token) {
  if (typeof text !== 'string' || !Array.isArray(ranges) || !ranges.length || !token) return [];
  const lines = documentLines(text);
  const lineStarts = new Set(lines.map(line => line.from));
  const selected = new Set();

  for (const range of ranges) {
    const from = Math.max(0, Math.min(text.length, Number(range.from) || 0));
    const to = Math.max(from, Math.min(text.length, Number(range.to) || 0));
    const adjustedTo = to > from && lineStarts.has(to) ? to - 1 : to;
    const first = lineIndexAt(lines, from);
    const last = lineIndexAt(lines, adjustedTo);
    for (let index = first; index <= last; index++) selected.add(index);
  }

  const selectedLines = [...selected].sort((left, right) => left - right).map(index => lines[index]);
  const allCommented = selectedLines.every(line => {
    const indentation = (line.text.match(/^\s*/) || [''])[0].length;
    return line.text.slice(indentation).startsWith(token);
  });

  return selectedLines.map(line => {
    const indentation = (line.text.match(/^\s*/) || [''])[0].length;
    const from = line.from + indentation;
    if (!allCommented) return {from, to: from, insert: `${token} `};
    const afterToken = line.text.slice(indentation + token.length);
    const trailingSpace = afterToken.startsWith(' ') ? 1 : 0;
    return {from, to: from + token.length + trailingSpace, insert: ''};
  });
}

module.exports = {lineCommentChanges};
