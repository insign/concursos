import { expect, test } from './fixtures';

const contestPath = '/concursos/tce-ma-2026-analista-administracao/';
const subjectSlug = 'leitura-interpretacao-tipos-generos';
const base = `${contestPath}${subjectSlug}`;
const readingTitle = 'Leitura, compreensão e interpretação de textos';

test('opens reading mode from the catalog listing', async ({ page }) => {
  await page.goto(contestPath);
  await page.getByRole('button', { name: 'Expandir tudo' }).click();
  await page.getByRole('link', { name: `Ler ${readingTitle} sem distrações` }).click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/#focus$`));
  await expect(page.getByRole('heading', { level: 1, name: readingTitle })).toBeVisible();
});

test('opens the integrated reading mode with one content tree and closes through history', async ({ page }) => {
  await page.goto(`${base}/`);
  const open = page.getByRole('link', { name: 'Ler sem distrações' });
  await expect(page.locator('.reading-focus-bar')).toBeHidden();
  await open.click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/#focus$`));

  const focus = page.getByRole('dialog', { name: 'Modo de leitura sem distrações' });
  await expect(focus).toHaveAttribute('aria-modal', 'true');
  await expect(page.locator('.reading-surface article')).toHaveCount(1);
  await expect(page.locator('[data-navigation-content]')).toHaveCount(1);
  await expect(page.locator('[data-studied-toggle]')).toHaveCount(1);
  await expect(page.locator('.site-header')).toBeHidden();
  await expect(page.locator('.breadcrumbs')).toBeHidden();
  await expect(page.getByRole('navigation', { name: 'Modos de estudo do assunto' })).toBeHidden();
  const suggestions = page.locator('.subject-suggestion');
  await expect(suggestions).toHaveCount(2);
  await expect(suggestions.nth(0)).toBeHidden();
  await expect(suggestions.nth(1)).toBeHidden();
  await expect(page.locator('.subject-pagination')).toBeHidden();
  await expect(page.locator('[data-subject-action-normal]')).toBeHidden();
  await expect(page.getByRole('link', { name: 'Voltar para o concurso' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Voltar ao topo' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Abrir modo de leitura' })).toBeHidden();
  await expect(page.locator('[data-studied-toggle]')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Fechar leitura' })).toBeFocused();
  await page.locator('[data-navigation-offer]').evaluate((element: HTMLElement) => {
    element.hidden = false;
  });
  await expect(page.locator('[data-navigation-offer]')).toBeHidden();

  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
  await expect(open).toBeFocused();
});

test('supports Back, Forward and Escape in the integrated reading mode', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.getByRole('link', { name: 'Ler sem distrações' }).click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/#focus$`));

  const heading = page.locator('.reading-surface article h2').first();
  await heading.scrollIntoViewIfNeeded();
  const beforeBack = await heading.evaluate((element) => element.getBoundingClientRect().top);

  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
  await expect
    .poll(() => heading.evaluate((element) => element.getBoundingClientRect().top))
    .toBeCloseTo(beforeBack, 0);
  await page.goForward();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/#focus$`));

  await page.keyboard.press('Escape');
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
});

test('closes a direct #focus URL without leaving the subject', async ({ page }) => {
  await page.goto(`${base}/#focus`);
  await expect(page.getByRole('dialog', { name: 'Modo de leitura sem distrações' })).toBeVisible();

  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
  await expect(page.locator('.reading-surface article')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ler sem distrações' })).toBeFocused();
});

test('preserves the visible reading position and supports repeated open-close cycles', async ({ page }) => {
  await page.goto(contestPath);
  await page.goto(`${base}/`);
  await page.getByRole('link', { name: 'Ler sem distrações' }).click();

  const heading = page.locator('.reading-surface article h2').first();
  await heading.scrollIntoViewIfNeeded();
  const before = await heading.evaluate((element) => element.getBoundingClientRect().top);
  await page.locator('[data-reading-focus-close]').evaluate((element: HTMLAnchorElement) => element.click());
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
  await expect
    .poll(() => heading.evaluate((element) => element.getBoundingClientRect().top))
    .toBeCloseTo(before, 0);

  await page.locator('.reading-entry-link').evaluate((element: HTMLAnchorElement) => element.click());
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/#focus$`));
  await page.locator('[data-reading-focus-close]').evaluate((element: HTMLAnchorElement) => element.click());
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));

  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${contestPath}$`));
});

test('keeps integrated reading mode usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'http://127.0.0.1:4321',
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto(`${base}/#focus`);

  await expect(page.locator('.reading-surface article')).toBeVisible();
  await expect(page.locator('.site-header')).toBeHidden();
  await expect(page.locator('[data-studied-toggle]')).toBeVisible();
  await expect(page.locator('[data-subject-action-normal]')).toBeHidden();
  await expect(page.getByRole('link', { name: 'Fechar leitura' })).toHaveAttribute('href', `${base}/`);
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

  await page.goto(`${base}/#focus`);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('injects the subject title as the sole h1 when the content has no leading h1', async ({ page }) => {
  // Assunto cujo conteúdo começa com h2: a página canônica injeta o título.
  const h2FirstSlug = 'assinaturas-certificacao-digital';
  const h2FirstTitle = 'Assinaturas eletrônicas, assinatura digital e certificação digital';
  await page.goto(`${contestPath}${h2FirstSlug}/#focus`);

  const headings = page.getByRole('heading', { level: 1 });
  await expect(headings).toHaveCount(1);
  await expect(headings).toHaveText(h2FirstTitle);
});

test('redirects the legacy reading URL permanently to the canonical #focus destination', async ({ page, request }) => {
  const response = await request.get(`${base}/leitura/`, { maxRedirects: 0 });
  expect(response.status()).toBe(301);
  expect(response.headers()['location']).toMatch(new RegExp(`${subjectSlug}/#focus$`));

  await page.goto(`${base}/leitura/`);
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/#focus$`));
  await expect(page.getByRole('dialog', { name: 'Modo de leitura sem distrações' })).toBeVisible();
});
