import { expect, test } from './fixtures';

const contestPath = '/concursos/concurso-exemplo/';
const reviewPath = '/revisoes/concurso-exemplo/administracao-publica/';
const subjectPath = '/concursos/concurso-exemplo/assunto-exemplo/';
const reviewTitle = 'Mega revisão de administração pública';

test('links and renders an optional mega review with rich Markdown', async ({ page, request }) => {
  await page.addInitScript(() => {
    localStorage.setItem('concursos:catalog-groups', JSON.stringify({ version: 1, collapsed: [] }));
  });
  await page.goto(contestPath);
  const reviewEntry = page.locator('[data-group-mega-review]');
  const group = reviewEntry.locator('xpath=ancestor::details[1]');
  await expect(reviewEntry.locator('a')).toHaveAttribute('href', reviewPath);

  const childOrder = await group.locator('> *').evaluateAll((children) =>
    children.map((child) => child.getAttribute('data-group-mega-review') !== null ? 'review' : child.tagName),
  );
  expect(childOrder.indexOf('review')).toBeGreaterThan(-1);
  expect(childOrder.indexOf('review')).toBeLessThan(childOrder.indexOf('OL'));

  const response = await page.goto(reviewPath);
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { name: reviewTitle, level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Fundamentos de administração pública', exact: true })).toHaveAttribute(
    'href',
    subjectPath,
  );
  await expect(page.getByRole('link', { name: 'cheat sheet', exact: true })).toHaveAttribute(
    'href',
    `${subjectPath}cheat-sheet/`,
  );
  await expect(page.locator('.katex')).toBeVisible();
  await expect(
    page.locator('abbr[data-abbreviation-popover-trigger]').filter({ hasText: /^ID$/ }),
  ).toHaveAttribute('aria-describedby', /abbreviation-popover-/);
  await expect(page.locator('pre.mermaid')).toHaveAttribute('data-render-status', 'success', { timeout: 20_000 });
  await expect(page.locator('[data-navigation-root]')).toHaveCount(0);
  await expect(page.locator('.subject-tabs')).toHaveCount(0);
  await expect(page.locator('meta[http-equiv="content-security-policy"]')).toHaveAttribute(
    'content',
    /script-src 'self' 'sha256-/,
  );
  expect((await request.get(reviewPath)).status()).toBe(200);

  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.mega-review-actions')).toBeHidden();
  // Conteúdo real hidratado: a expansão sai como etiqueta abaixo do termo.
  const megaAbbreviation = page.locator('abbr[data-abbreviation-popover-trigger]').filter({ hasText: /^ID$/ });
  await expect(megaAbbreviation).toHaveAttribute('data-abbreviation-title', 'Indicador de desempenho');
  const megaPrintLabel = await megaAbbreviation.evaluate((element) =>
    window.getComputedStyle(element, '::after').content,
  );
  expect(megaPrintLabel).toContain('Indicador de desempenho');
  await page.emulateMedia({ media: 'screen' });
});

test('keeps the mega review readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'http://127.0.0.1:4321',
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto(reviewPath);

  await expect(page.getByRole('heading', { name: reviewTitle, level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Fundamentos de administração pública', exact: true })).toHaveAttribute(
    'href',
    subjectPath,
  );
  await expect(
    page.locator('abbr[title]').filter({ hasText: /^ID$/ }),
  ).toHaveAttribute('title', 'Indicador de desempenho');
  await context.close();
});
