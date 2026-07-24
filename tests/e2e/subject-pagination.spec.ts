import { expect, test } from './fixtures';

const contest = 'tce-ma-2026-analista-administracao';
const base = `/concursos/${contest}`;
const firstSlug = 'leitura-interpretacao-tipos-generos'; // order 1 (sem anterior)
const secondSlug = 'tipos-generos-textuais'; // order 2
const lastSlug = 'competencias-tendencias-setor-publico'; // order 153 (sem seguinte)
const crossFrom = 'reescrita-generos-formalidade'; // order 18 (grupo lingua-portuguesa)
const crossTo = 'competencias-digitais-publicas'; // order 19 (outro grupo)

const pagination = (page: import('@playwright/test').Page) =>
  page.locator('nav[aria-label="Assuntos adjacentes"]');

test('the first subject has no previous control and links to the next in order', async ({ page }) => {
  await page.goto(`${base}/${firstSlug}/`);
  const nav = pagination(page);
  await expect(nav.locator('a[rel="prev"]')).toHaveCount(0);
  await expect(nav.locator('a[rel="next"]')).toHaveAttribute('href', `${base}/${secondSlug}/`);
});

test('the last subject has no next control but keeps the previous one', async ({ page }) => {
  await page.goto(`${base}/${lastSlug}/`);
  const nav = pagination(page);
  await expect(nav.locator('a[rel="next"]')).toHaveCount(0);
  await expect(nav.locator('a[rel="prev"]')).toBeVisible();
});

test('navigates forward opening at the top, links back, and honors browser history', async ({ page }) => {
  await page.goto(`${base}/${firstSlug}/`);
  await page.evaluate(() => window.scrollTo(0, 400));
  await pagination(page).locator('a[rel="next"]').click();
  await expect(page).toHaveURL(new RegExp(`/${secondSlug}/$`));

  // O novo assunto abre no topo.
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  // O anterior aponta de volta ao primeiro assunto.
  await expect(pagination(page).locator('a[rel="prev"]')).toHaveAttribute(
    'href',
    `${base}/${firstSlug}/`,
  );
  // Voltar do navegador retorna ao primeiro assunto.
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`/${firstSlug}/$`));
});

test('navigation crosses group boundaries following the global order', async ({ page }) => {
  await page.goto(`${base}/${crossFrom}/`);
  await expect(pagination(page).locator('a[rel="next"]')).toHaveAttribute(
    'href',
    `${base}/${crossTo}/`,
  );
  await pagination(page).locator('a[rel="next"]').click();
  await expect(page).toHaveURL(new RegExp(`/${crossTo}/$`));
});

test('keeps previous/next inside reading mode, pointing to adjacent reading routes', async ({ page }) => {
  await page.goto(`${base}/${secondSlug}/leitura/`);
  const nav = pagination(page);

  // O anterior aponta para a rota /leitura/ do vizinho (preserva o modo de leitura).
  await expect(nav.locator('a[rel="prev"]')).toHaveAttribute(
    'href',
    `${base}/${firstSlug}/leitura/`,
  );
  // Distinto do controle de sair, que também está presente.
  await expect(page.getByRole('link', { name: 'Sair da leitura' })).toBeVisible();

  // Seguir "próximo" permanece no modo de leitura.
  await nav.locator('a[rel="next"]').click();
  await expect(page).toHaveURL(/\/leitura\/$/);
});

test('exposes clear accessible names for the pagination controls', async ({ page }) => {
  await page.goto(`${base}/${secondSlug}/`);
  const nav = pagination(page);
  await expect(nav.getByRole('link', { name: /^Assunto anterior: / })).toBeVisible();
  await expect(nav.getByRole('link', { name: /^Próximo assunto: / })).toBeVisible();
});
