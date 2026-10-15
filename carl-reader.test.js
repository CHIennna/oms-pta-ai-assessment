const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { Readable } = require('node:stream');

// Evaluate the reader helpers without starting the judge or touching user data.
const serverSource = fs.readFileSync(require.resolve('./server.js'), 'utf8');
const clientSource = fs.readFileSync(require.resolve('./src/client/core/pta-clone.js'), 'utf8');
function backend(fetch) {
  const context = vm.createContext({ URL, Buffer, AbortController, setTimeout, clearTimeout, fetch });
  vm.runInContext(serverSource.slice(serverSource.indexOf('const carlPages ='), serverSource.indexOf('const server = http.createServer')), context);
  return context;
}
function response(html, status = 200, location) {
  return { status, ok: status === 200, headers: new Headers({ 'content-type': 'text/html', ...(location ? { location } : {}) }), body: status === 200 ? Readable.from([Buffer.from(html)]) : { cancel: async () => {} } };
}
test('lesson URL allowlist rejects foreign hosts and credentials', () => {
  const context = backend();
  for (const value of ['https://evil.test/a.html', '//localhost/', 'http://programmercarl.com/', 'https://programmercarl.com.evil.test/', 'https://user:pass@programmercarl.com/', '/api/private', '/algo/?url=x']) {
    assert.throws(() => context.carlPageUrl(value));
  }
  assert.equal(context.carlPageUrl('/algo/#array').href, 'https://programmercarl.com/algo/');
});
test('every redirect is validated before another request', async () => {
  let requests = 0;
  const context = backend(async () => { requests++; return response('', 302, 'https://127.0.0.1/'); });
  await assert.rejects(context.fetchCarlPage('/algo/'));
  assert.equal(requests, 1);
});
test('public lesson is cached and requests do not forward credentials', async () => {
  let requests = 0;
  const context = backend(async (url, options) => {
    requests++;
    assert.equal(options.redirect, 'manual');
    assert.deepEqual(Object.keys(options.headers), ['Accept']);
    return response('<main>lesson</main>');
  });
  assert.equal((await context.fetchCarlPage('/algo/')).html, '<main>lesson</main>');
  await context.fetchCarlPage('/algo/#next');
  assert.equal(requests, 1);
});
test('oversized content is rejected', async () => {
  const context = backend(async () => response('x'.repeat(4 * 1024 * 1024 + 1)));
  await assert.rejects(context.fetchCarlPage('/algo/'), /too large/);
});
test('upstream failures release the concurrency slot', async () => {
  let requests = 0;
  const context = backend(async () => { requests++; throw new Error('offline'); });
  for (let i = 0; i < 6; i++) await assert.rejects(context.fetchCarlPage('/algo/'), /offline/);
  assert.equal(requests, 6);
});
test('link routing handles lessons, LeetCode problems and unrelated sites', () => {
  const context = vm.createContext({ URL });
  vm.runInContext(clientSource.slice(clientSource.indexOf('function carlLinkUrl('), clientSource.indexOf('function safeCarlContent(')), context);
  assert.equal(context.carlLinkKind(new URL('https://leetcode.com/problems/merge-intervals/')), 'leetcode');
  assert.equal(context.carlLinkKind(new URL('https://leetcode.cn/problems/merge-intervals/description/')), 'leetcode');
  assert.equal(context.carlLinkKind(new URL('https://leetcode.cn.evil.test/problems/test/')), 'external');
  assert.equal(context.carlLinkKind(new URL('https://programmercarl.com/algo/array/')), 'lesson');
  assert.equal(context.carlLinkUrl('javascript:alert(1)', 'https://programmercarl.com/'), null);
  assert.equal(context.carlLinkUrl(null, 'https://programmercarl.com/'), null);
});
