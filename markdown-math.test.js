'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const clientSource = fs.readFileSync('./src/client/core/pta-clone.js', 'utf8');
const rendererSource = clientSource.match(/function renderTexFragment\(value\)\{[^\n]+\}/)?.[0];

if (!rendererSource) throw new Error('Unable to locate renderTexFragment');

const context = {};
vm.runInNewContext(`${rendererSource}; this.renderTexFragment = renderTexFragment;`, context);

const statementRendererSource = clientSource.slice(
  clientSource.indexOf('const $='),
  clientSource.indexOf('function cleanStatementDecoration')
);
const statementContext = { document: { querySelector: () => null } };
vm.runInNewContext(
  `${statementRendererSource}; this.enhanceStatementSamples = enhanceStatementSamples;`,
  statementContext
);

test('renders standard LaTeX ellipsis commands', () => {
  assert.equal(context.renderTexFragment('1,2,\\ldots,N'), '1,2,…,N');
  assert.equal(context.renderTexFragment('1,2,\\dots,N'), '1,2,…,N');
  assert.equal(context.renderTexFragment('1,2,\\cdots,N'), '1,2,⋯,N');
});

test('renders commands followed directly by numbers and set braces', () => {
  assert.equal(context.renderTexFragment('N\\le10'), 'N≤10');
  assert.equal(context.renderTexFragment('2\\times10^9'), '2×10<sup>9</sup>');
  assert.equal(context.renderTexFragment('3\\to7'), '3→7');
  assert.equal(context.renderTexFragment('c_i\\in\\{0,1\\}'), 'c<sub>i</sub>∈{0,1}');
});

test('enhances numbered input and output sample headings', () => {
  const html = statementContext.enhanceStatementSamples(
    '### 输入样例 1\n\n```text\n1 < 2\n```\n\n### 输出样例 1\n\n```text\nYES\n```',
    {}
  );
  assert.equal((html.match(/class="sample-block"/g) || []).length, 2);
  assert.match(html, /\[ in \]/);
  assert.match(html, /\[ out \]/);
  assert.match(html, /1 &lt; 2/);
});
