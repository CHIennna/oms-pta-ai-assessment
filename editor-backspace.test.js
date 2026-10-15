'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {indentationDeleteSize} = require('./src/client/editor/indentation-backspace');

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
