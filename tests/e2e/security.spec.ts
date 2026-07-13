import { expect, test } from './fixtures';

test('serves security headers and noindex on every static response', async ({ page, request }) => {
  const response = await page.goto('/');
  expect(response).not.toBeNull();

  const headers = response!.headers();
  expect(headers['content-security-policy']).toContain("connect-src 'self' https://kv.helio.me");
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(headers['content-security-policy']).not.toContain('unsafe-eval');
  expect(headers['permissions-policy']).toBe('camera=(), geolocation=(), microphone=()');
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['x-frame-options']).toBe('DENY');
  expect(headers['x-robots-tag']).toBe('noindex, nofollow');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');

  const stylesheetUrl = await page.locator('link[rel="stylesheet"]').first().getAttribute('href');
  expect(stylesheetUrl).toBeTruthy();
  const stylesheet = await request.get(stylesheetUrl!);
  expect(stylesheet.headers()['cache-control']).toBe('public, max-age=31536000, immutable');

  const manifest = await request.get('/manifest.webmanifest');
  expect(manifest.headers()['cache-control']).toBe('public, max-age=0, must-revalidate');
  expect(manifest.headers()['x-robots-tag']).toBe('noindex, nofollow');

  const serviceWorker = await request.get('/service-worker.js');
  expect(serviceWorker.headers()['cache-control']).toBe('public, max-age=0, must-revalidate');
  expect(serviceWorker.headers()['content-security-policy']).toContain("worker-src 'self'");
});

test('enforces the generated CSP without blocking application features', async ({ page }) => {
  const violations: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error' && message.text().includes('Content Security Policy')) {
      violations.push(message.text());
    }
  });

  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/cheat-sheet/');
  const policy = page.locator('meta[http-equiv="content-security-policy"]');
  await expect(policy).toHaveAttribute('content', /script-src 'self' 'sha256-/);
  await expect(policy).toHaveAttribute('content', /style-src 'self' 'unsafe-inline'/);
  await expect(policy).not.toHaveAttribute('content', /unsafe-eval/);

  const diagram = page.locator('pre.mermaid');
  await expect(diagram).toHaveAttribute('data-render-status', 'success', { timeout: 20_000 });
  expect(violations).toEqual([]);
});

test('serves the custom noindex 404 while allowing crawlers to observe it', async ({ page, request }) => {
  const response = await page.goto('/pagina-que-nao-existe/');
  expect(response?.status()).toBe(404);
  expect(response?.headers()['x-robots-tag']).toBe('noindex, nofollow');
  expect(response?.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
  await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('meta[http-equiv="content-security-policy"]')).toHaveAttribute(
    'content',
    /script-src 'self' 'sha256-/,
  );

  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toBe('User-agent: *\nAllow: /\n');
});
