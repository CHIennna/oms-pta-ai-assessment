'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {indentationDeleteSize} = require('./src/client/editor/indentation-backspace');
const {lineCommentChanges} = require('./src/client/editor/line-comment');

function applyChanges(text, changes) {
  return [...changes]
    .sort((left, right) => right.from - left.from)
    .reduce((value, change) => value.slice(0, change.from) + change.insert + value.slice(change.to), text);
}

test('aligned indentation deletes one four-space level', () => {
  assert.equal(indentationDeleteSize(4), 4);
  assert.equal(indentationDeleteSize(8), 4);
});

test('unaligned indentation deletes one space until aligned', () => {
  assert.equal(indentationDeleteSize(7), 1);
  assert.equal(indentationDeleteSize(6), 1);
  assert.equal(indentationDeleteSize(5), 1);
});

test('short or empty indentation stays within the available spaces', () => {
  assert.equal(indentationDeleteSize(1), 1);
  assert.equal(indentationDeleteSize(0), 0);
});

test('line comment shortcut comments and uncomments selected C++ lines', () => {
  const source = 'int main() {\n    return 0;\n}';
  const commented = applyChanges(source, lineCommentChanges(source, [{from: 0, to: source.length}], '//'));
  assert.equal(commented, '// int main() {\n    // return 0;\n// }');
  assert.equal(
    applyChanges(commented, lineCommentChanges(commented, [{from: 0, to: commented.length}], '//')),
    source
  );
});

test('line comment shortcut uses Python comments and excludes a boundary-only next line', () => {
  const source = 'value = 1\nprint(value)';
  const secondLineStart = source.indexOf('\n') + 1;
  const result = applyChanges(source, lineCommentChanges(source, [{from: 0, to: secondLineStart}], '#'));
  assert.equal(result, '# value = 1\nprint(value)');
});

test('overlapping selections comment each line only once', () => {
  const source = 'first\nsecond';
  const changes = lineCommentChanges(source, [
    {from: 0, to: source.length},
    {from: 0, to: source.indexOf('\n')}
  ], '//');
  assert.equal(applyChanges(source, changes), '// first\n// second');
});
