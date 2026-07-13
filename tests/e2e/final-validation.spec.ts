import { expect, test } from './fixtures';

const baseURL = 'http://127.0.0.1:4321';

test('keeps study content readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/');
  await expect(page.getByRole('heading', { name: 'Fundamentos de administração pública', level: 1 })).toBeVisible();
  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.locator('.katex').first()).toBeVisible();
  await expect(page.locator('pre code')).toBeVisible();

  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/cheat-sheet/');
  await expect(page.getByRole('heading', { name: 'Administração pública em uma página' })).toBeVisible();
  await expect(page.locator('.katex')).toBeVisible();
  await expect(page.locator('pre.mermaid')).toContainText('flowchart LR');
  await context.close();
});

test('waits for Mermaid before printing and applies the print layout', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'print', {
      configurable: true,
      value: () => {
        const state = window as Window & { __printCalls?: number };
        state.__printCalls = (state.__printCalls ?? 0) + 1;
      },
    });
  });
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/cheat-sheet/');
  await expect(page.locator('pre.mermaid')).toHaveAttribute('data-render-status', 'success', { timeout: 20_000 });
  await expect(page.locator('.katex')).toBeVisible();
  await page.evaluate(() => {
    const state = window as Window & { mermaidReady?: Promise<void>; __releasePrint?: () => void };
    state.mermaidReady = new Promise<void>((resolve) => {
      state.__releasePrint = resolve;
    });
  });

  const printButton = page.getByRole('button', { name: 'Imprimir cheat sheet' });
  await printButton.click();
  await expect(printButton).toHaveAttribute('aria-busy', 'true');
  expect(await page.evaluate(() => (window as Window & { __printCalls?: number }).__printCalls ?? 0)).toBe(0);
  await page.evaluate(() => (window as Window & { __releasePrint?: () => void }).__releasePrint?.());
  await expect.poll(() => page.evaluate(() => (window as Window & { __printCalls?: number }).__printCalls ?? 0)).toBe(1);

  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.site-header')).toBeHidden();
  await expect(printButton).toBeHidden();
  await expect(page.locator('.reading-surface article')).toBeVisible();
  await expect(page.getByRole('table')).toHaveCSS('display', 'table');
});

test('exposes an installable standalone manifest with reachable icons', async ({ request }) => {
  const response = await request.get('/manifest.webmanifest');
  expect(response.ok()).toBe(true);
  const manifest = await response.json() as {
    id: string;
    start_url: string;
    scope: string;
    display: string;
    icons: Array<{ src: string; sizes: string; purpose?: string }>;
  };
  expect(manifest).toMatchObject({ id: '/', start_url: '/', scope: '/', display: 'standalone' });
  expect(manifest.icons).toEqual(expect.arrayContaining([
    expect.objectContaining({ sizes: '192x192' }),
    expect.objectContaining({ sizes: '512x512' }),
    expect.objectContaining({ sizes: '512x512', purpose: 'maskable' }),
  ]));
  for (const icon of manifest.icons) {
    expect((await request.get(icon.src)).ok()).toBe(true);
  }
});
