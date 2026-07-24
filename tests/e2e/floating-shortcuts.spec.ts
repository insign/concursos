import { expect, test } from './fixtures';

const base = '/concursos/tce-ma-2026-analista-administracao/leitura-interpretacao-tipos-generos';
const shortcuts = (page: import('@playwright/test').Page) =>
  page.locator('nav[aria-label="Atalhos do assunto"]');

test('shows the floating shortcuts on all three study routes', async ({ page }) => {
  for (const route of [`${base}/`, `${base}/cheat-sheet/`, `${base}/questoes/`]) {
    await page.goto(route);
    await expect(shortcuts(page)).toBeVisible();
  }
});

test('links cheat sheet and questions to the current subject on the content route', async ({ page }) => {
  await page.goto(`${base}/`);
  const nav = shortcuts(page);
  await expect(nav.getByRole('link', { name: 'Abrir cheat sheet' })).toHaveAttribute(
    'href',
    `${base}/cheat-sheet/`,
  );
  await expect(nav.getByRole('link', { name: 'Abrir questões' })).toHaveAttribute(
    'href',
    `${base}/questoes/`,
  );
  // No conteúdo, nenhum destino é a página atual.
  await expect(nav.locator('.floating-shortcut.is-current')).toHaveCount(0);
});

test('marks the active destination with aria-current and no navigation', async ({ page }) => {
  await page.goto(`${base}/cheat-sheet/`);
  const nav = shortcuts(page);
  const current = nav.locator('.floating-shortcut.is-current');
  await expect(current).toHaveAttribute('aria-current', 'page');
  await expect(current).toContainText('Cheat sheet');
  // O destino atual não é um link (não provoca navegação desnecessária).
  await expect(nav.getByRole('link', { name: 'Abrir cheat sheet' })).toHaveCount(0);
  // Questões continua um link real.
  await expect(nav.getByRole('link', { name: 'Abrir questões' })).toHaveAttribute(
    'href',
    `${base}/questoes/`,
  );

  await page.goto(`${base}/questoes/`);
  await expect(shortcuts(page).getByRole('link', { name: 'Abrir questões' })).toHaveCount(0);
  await expect(shortcuts(page).locator('.floating-shortcut.is-current')).toContainText('Questões');
});

test('reveals the back-to-top shortcut only after leaving the top of the page', async ({ page }) => {
  // Sob movimento reduzido, a volta ao topo é instantânea (scroll-behavior: auto),
  // o que também valida esse caminho e mantém o teste determinístico.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 800, height: 480 });
  await page.goto(`${base}/`);
  const top = page.locator('[data-shortcut-top]');

  // No topo, o atalho de topo fica escondido.
  await expect(top).toBeHidden();

  // Ao afastar do início, aparece.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(top).toBeVisible();

  // Ao clicar, volta ao topo e some novamente.
  await top.click();
  await expect(top).toBeHidden();
});

test('the shortcuts are operable by keyboard', async ({ page }) => {
  await page.goto(`${base}/`);
  const questions = shortcuts(page).getByRole('link', { name: 'Abrir questões' });
  await questions.focus();
  await expect(questions).toBeFocused();
});

test('moves focus to the top anchor instead of the body when the top shortcut hides while focused', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 800, height: 480 });
  await page.goto(`${base}/`);
  const top = page.locator('[data-shortcut-top]');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(top).toBeVisible();
  await top.focus();

  // Rola ao topo (por teclado) com o atalho ainda focado; ele se esconde.
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(top).toBeHidden();

  // O foco foi transferido ao alvo de topo, não perdido para o <body>.
  expect(await page.evaluate(() => document.activeElement?.id)).toBe('study-top');
});

test('the shortcuts are hidden when printing', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.emulateMedia({ media: 'print' });
  await expect(shortcuts(page)).toBeHidden();
});

test('keeps the shortcuts usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'http://127.0.0.1:4321',
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto(`${base}/`);
  const nav = page.locator('nav[aria-label="Atalhos do assunto"]');

  // Sem o comportamento progressivo de exibição, o atalho de topo permanece visível
  // e usável como link âncora, e os destinos continuam links reais.
  const top = nav.locator('[data-shortcut-top]');
  await expect(top).toBeVisible();
  await expect(top).toHaveAttribute('href', '#study-top');
  await expect(nav.getByRole('link', { name: 'Abrir cheat sheet' })).toHaveAttribute(
    'href',
    `${base}/cheat-sheet/`,
  );
  await expect(nav.getByRole('link', { name: 'Abrir questões' })).toHaveAttribute(
    'href',
    `${base}/questoes/`,
  );
  await context.close();
});

test('accessible names contain the visible labels (WCAG label in name)', async ({ page }) => {
  await page.goto(`${base}/`);
  const nav = shortcuts(page);

  const top = nav.locator('[data-shortcut-top]');
  await expect(top).toHaveAttribute('aria-label', 'Voltar ao topo');
  await expect(top.locator('.floating-shortcut-label')).toHaveText('Topo');

  // Nome acessível ("Abrir ...") contém o rótulo visível ("Cheat sheet"/"Questões").
  await expect(nav.getByRole('link', { name: 'Abrir cheat sheet' })).toContainText('Cheat sheet');
  await expect(nav.getByRole('link', { name: 'Abrir questões' })).toContainText('Questões');
});
