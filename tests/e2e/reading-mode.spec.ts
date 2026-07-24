import { expect, test } from './fixtures';

const contestPath = '/concursos/tce-ma-2026-analista-administracao/';
const subjectSlug = 'leitura-interpretacao-tipos-generos';
const base = `${contestPath}${subjectSlug}`;
const readingTitle = 'Leitura, compreensão e interpretação de textos';

test('renders the reading route with minimal, distraction-free chrome', async ({ page }) => {
  await page.goto(`${base}/leitura/`);

  // Sem cabeçalho, abas, breadcrumbs ou atalhos flutuantes.
  await expect(page.locator('.site-header')).toHaveCount(0);
  await expect(page.locator('nav[aria-label="Modos de estudo do assunto"]')).toHaveCount(0);
  await expect(page.locator('.breadcrumbs')).toHaveCount(0);
  await expect(page.locator('nav[aria-label="Atalhos do assunto"]')).toHaveCount(0);

  // Título e conteúdo presentes, mais o controle de saída.
  await expect(page.getByRole('heading', { level: 1, name: readingTitle })).toBeVisible();
  await expect(page.locator('.reading-surface article')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sair da leitura' })).toHaveAttribute(
    'href',
    `${base}/`,
  );
});

test('opens reading mode from the catalog listing', async ({ page }) => {
  await page.goto(contestPath);
  await page.getByRole('link', { name: `Ler ${readingTitle} sem distrações` }).click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/leitura/$`));
  await expect(page.getByRole('heading', { level: 1, name: readingTitle })).toBeVisible();
});

test('exits back to the subject with the button, preserving history', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.getByRole('link', { name: 'Ler sem distrações' }).click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/leitura/$`));

  await page.getByRole('link', { name: 'Sair da leitura' }).click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
});

test('exits reading mode with the Escape key', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.getByRole('link', { name: 'Ler sem distrações' }).click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/leitura/$`));
  // Garante que o módulo diferido (listener de Escape) já executou.
  await page.waitForLoadState('load');

  await page.keyboard.press('Escape');
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
});

test('keeps the reading route readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'http://127.0.0.1:4321',
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto(`${base}/leitura/`);

  await expect(page.getByRole('heading', { level: 1, name: readingTitle })).toBeVisible();
  await expect(page.locator('.reading-surface article')).toBeVisible();
  // Sem JS, sair continua sendo um link real para a página do assunto.
  await expect(page.getByRole('link', { name: 'Sair da leitura' })).toHaveAttribute(
    'href',
    `${base}/`,
  );
  await context.close();
});

test('applies the selected theme in reading mode', async ({ page }) => {
  await page.addInitScript(([key, value]) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignora ambientes sem localStorage.
    }
  }, ['concursos:theme', 'dark']);

  await page.goto(`${base}/leitura/`);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('injects the subject title as the sole h1 when the content has no leading h1', async ({ page }) => {
  // Assunto cujo conteúdo começa com h2 (showTitle=true): o layout injeta o título.
  const h2FirstSlug = 'assinaturas-certificacao-digital';
  const h2FirstTitle = 'Assinaturas eletrônicas, assinatura digital e certificação digital';
  await page.goto(`${contestPath}${h2FirstSlug}/leitura/`);

  const headings = page.getByRole('heading', { level: 1 });
  await expect(headings).toHaveCount(1);
  await expect(headings).toHaveText(h2FirstTitle);
});

test('exits with Escape via the direct-navigation fallback (no in-app history)', async ({ page }) => {
  // Aberto diretamente (referrer vazio, sem histórico do site) -> Esc usa
  // location.assign para a página do assunto, e não history.back().
  await page.goto(`${base}/leitura/`);
  await page.waitForLoadState('load');

  await page.keyboard.press('Escape');
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
});
