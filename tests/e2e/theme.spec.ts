import { expect, test } from './fixtures';

const THEME_KEY = 'concursos:theme';

const seedTheme = (page: import('@playwright/test').Page, value: string) =>
  page.addInitScript(([key, stored]) => {
    try {
      localStorage.setItem(key, stored);
    } catch {
      // Ambiente sem localStorage gravável: ignora.
    }
  }, [THEME_KEY, value]);

// Os três testes a seguir bloqueiam TODOS os módulos deferidos (/_astro/*.js). O
// <script is:inline> do <head> é inline no HTML (não em /_astro/), então roda mesmo
// assim. Isso prova o anti-flash (tema aplicado antes de qualquer módulo/paint) E
// cobre a lógica de resolução do próprio script inline, independente de theme.ts/controller.
test('inline script alone applies an explicit dark preference (anti-flash)', async ({ page }) => {
  await page.route('**/_astro/*.js', (route) => route.abort());
  await seedTheme(page, 'dark');
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('inline script alone follows a dark system preference in automatic mode', async ({ page }) => {
  await page.route('**/_astro/*.js', (route) => route.abort());
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('inline script alone honors an explicit light choice over a dark system', async ({ page }) => {
  await page.route('**/_astro/*.js', (route) => route.abort());
  await page.emulateMedia({ colorScheme: 'dark' });
  await seedTheme(page, 'light');
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('the inline script also sets the browser theme-color before paint (no chrome flash)', async ({ page }) => {
  await page.route('**/_astro/*.js', (route) => route.abort());
  await seedTheme(page, 'dark');
  await page.goto('/');
  // Sem os módulos, só o script inline pôde ter atualizado o theme-color.
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#101614');
});

test('offers the three theme options and persists a choice across reloads', async ({ page }) => {
  await page.goto('/');
  const select = page.getByLabel('Tema');
  await expect(select).toHaveValue('auto');
  await expect(select.locator('option')).toHaveCount(3);
  await expect(page.locator('html')).toHaveAttribute('data-theme', /^(light|dark)$/);

  await select.selectOption('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate((k) => localStorage.getItem(k), THEME_KEY)).toBe('dark');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByLabel('Tema')).toHaveValue('dark');
});

test('automatic mode follows the system preference and reacts to changes in real time', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await expect(page.getByLabel('Tema')).toHaveValue('auto');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('an explicit light choice overrides a dark system preference', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await seedTheme(page, 'light');
  await page.goto('/');
  await expect(page.getByLabel('Tema')).toHaveValue('light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('updates the browser theme-color to match the selected theme', async ({ page }) => {
  await page.goto('/');
  const themeColor = page.locator('meta[name="theme-color"]');
  await page.getByLabel('Tema').selectOption('dark');
  await expect(themeColor).toHaveAttribute('content', '#101614');
  await page.getByLabel('Tema').selectOption('light');
  await expect(themeColor).toHaveAttribute('content', '#275d55');
});

const rootToken = (page: import('@playwright/test').Page, name: string) =>
  page.evaluate(
    (token) => getComputedStyle(document.documentElement).getPropertyValue(token).trim(),
    name,
  );

test('printing forces a light palette even with the dark theme explicitly selected', async ({ page }) => {
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/cheat-sheet/');
  await page.getByLabel('Tema').selectOption('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.emulateMedia({ media: 'print' });
  // Os tokens de superfície voltam ao claro na impressão, vencendo :root[data-theme='dark'].
  expect(await rootToken(page, '--paper')).toBe('#fff');
  expect(await rootToken(page, '--ink')).toBe('#000');
  expect(await rootToken(page, '--code-bg')).toBe('#f0f0f0');
});

test('printing forces a light palette under a dark system preference without an explicit theme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/cheat-sheet/');
  // Caminho sem JS: remove o data-theme; em tela o sistema escuro aplicaria dark.
  await page.evaluate(() => document.documentElement.removeAttribute('data-theme'));

  await page.emulateMedia({ media: 'print' });
  // A impressão vence também :root:not([data-theme]) sob @media (prefers-color-scheme: dark).
  expect(await rootToken(page, '--paper')).toBe('#fff');
  expect(await rootToken(page, '--ink')).toBe('#000');
});
