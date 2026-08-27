import assert from 'node:assert/strict';
import test from 'node:test';

async function render() {
  const workerUrl = new URL('../dist/server/index.js', import.meta.url);
  workerUrl.searchParams.set('test', `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request('http://localhost/', { headers: { accept: 'text/html' } }),
    { ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test('visitor build renders the Coder portfolio content', async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>刘纯涛 · Coder<\/title>/i);
  assert.match(html, /把复杂系统/);
  assert.match(html, /做成自然体验/);
  assert.match(html, /portrait-coder\.png/);
  assert.match(html, /技术能力五维雷达图/);
  assert.match(html, /All in Agent/);
  assert.match(html, /保存为 PDF/);
});

test('visitor build excludes private contact data and controls', async () => {
  const response = await render();
  const html = await response.text();

  assert.doesNotMatch(html, /1786215856@qq\.com/);
  assert.doesNotMatch(html, />evils_you</);
  assert.doesNotMatch(html, /PRIVATE \/ CONTACT/);
  assert.doesNotMatch(html, /简历视图切换/);
});
