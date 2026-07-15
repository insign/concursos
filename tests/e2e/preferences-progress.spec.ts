import { expect, test } from './fixtures';

const alias = 'prefs-7f3k';

test.beforeEach(async ({ page }) => {
  await page.addInitScript((value) => localStorage.setItem('concursos:active-alias', value), alias);
});

test('persists global questionnaire preferences in IndexedDB', async ({ page }) => {
  await page.goto('/configuracoes/');
  await page.getByLabel('Blocos de dez').check();
  await page.getByLabel('Imediata').check();
  await page.getByLabel('Embaralhar questões').check();
  await page.getByRole('button', { name: 'Salvar preferências' }).click();
  await expect(page.getByText('Preferências salvas localmente.')).toBeVisible();

  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/questoes/');
  await expect(page.locator('.question-card')).toHaveCount(10);
  await expect(page.getByLabel('Imediata')).toBeChecked();
  await expect(page.getByLabel('Embaralhar questões')).toBeChecked();
});

test('merges preference fields changed concurrently in two tabs', async ({ page, context }) => {
  await context.route('https://kv.helio.me/**', (route) => route.abort('internetdisconnected'));
  const secondPage = await context.newPage();
  await secondPage.addInitScript((value) => localStorage.setItem('concursos:active-alias', value), alias);
  await Promise.all([page.goto('/configuracoes/'), secondPage.goto('/configuracoes/')]);

  await page.getByLabel('Blocos de dez').check();
  await page.getByRole('button', { name: 'Salvar preferências' }).click();
  await expect(page.getByText('Preferências salvas localmente.')).toBeVisible();

  await secondPage.getByLabel('Embaralhar questões').check();
  await secondPage.getByRole('button', { name: 'Salvar preferências' }).click();
  await expect(secondPage.getByText('Preferências salvas localmente.')).toBeVisible();
  await expect(secondPage.getByLabel('Blocos de dez')).toBeChecked();
  await expect(secondPage.getByLabel('Embaralhar questões')).toBeChecked();
});

test('shows and repairs materialized progress without exposing on-submit score', async ({ page, request }) => {
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/questoes/');
  await page.getByLabel('Eficiência').check();
  await expect(page.getByText('Resposta salva localmente')).toBeVisible();

  await page.goto('/concursos/concurso-exemplo/');
  await expect(page.locator('[data-progress-summary]')).toHaveText('1/12 respondidas.');

  const catalogResponse = await request.get('/sync-catalog.json');
  expect(catalogResponse.ok()).toBe(true);
  const syncCatalog = await catalogResponse.json() as { subjects: unknown[] };

  await page.goto('/configuracoes/');
  await page.getByRole('button', { name: 'Recalcular progresso' }).click();
  await expect(page.getByText(`Progresso recalculado para ${syncCatalog.subjects.length} assunto(s).`)).toBeVisible();
});
