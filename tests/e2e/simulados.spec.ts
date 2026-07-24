import { expect, test } from './fixtures';

const alias = 'simulados-2026-teste';
const contestStorageId = 'tcema-2026-adm';
const indexDocumentId = `concursos--${alias}--simulados`;

test.beforeEach(async ({ page }) => {
  await page.addInitScript((value) => {
    localStorage.setItem('concursos:active-alias', value);
  }, alias);
});

test('creates, answers, reloads and finishes a persistent simulation', async ({ page }) => {
  await page.goto(`/simulados/?concurso=${contestStorageId}`);

  const subject = page.locator('[data-subject-list] input[data-subject]').first();
  await expect(subject).toBeVisible();
  await subject.check();
  await page.locator('[data-count]').fill('1');
  await page.getByRole('button', { name: 'Gerar simulado', exact: true }).click();

  await expect(page).toHaveURL(/\/simulados\/\?id=[0-9a-f-]{36}$/);
  await expect(page.locator('[data-question-list] > li')).toHaveCount(1);

  const answer = page.locator('[data-question-list] input[type="radio"]').first();
  await answer.check();
  await expect(page.getByText('Resposta salva localmente.')).toBeVisible();

  await page.reload();
  await expect(page.locator('[data-question-list] > li')).toHaveCount(1);
  await expect(page.locator('[data-question-list] input[type="radio"]:checked')).toHaveCount(1);

  await page.getByRole('button', { name: 'Finalizar e corrigir' }).click();
  await expect(page.locator('[data-result]')).toContainText(/acertos/);
  await expect(page.getByRole('link', { name: 'Revisar simulado' })).toBeVisible();
});

test('publishes the detailed document before the profile index and sends no Authorization', async ({ page, kvStore }) => {
  const authorizationHeaders: string[] = [];
  const writes: string[] = [];
  await page.route('https://kv.helio.me/**', async (route) => {
    if (route.request().method() === 'PUT') {
      writes.push(new URL(route.request().url()).pathname.slice(1));
      const authorization = route.request().headers()['authorization'];
      if (authorization) authorizationHeaders.push(authorization);
    }
    await route.fallback();
  });

  await page.goto(`/simulados/?concurso=${contestStorageId}`);
  await page.locator('[data-subject-list] input[data-subject]').first().check();
  await page.locator('[data-count]').fill('1');
  await page.getByRole('button', { name: 'Gerar simulado', exact: true }).click();

  await expect
    .poll(() => kvStore.get(indexDocumentId)?.json, { timeout: 30_000 })
    .toBeTruthy();

  const detailIndex = writes.findIndex((id) => id.includes('--simulado--'));
  const summaryIndex = writes.findIndex((id) => id === indexDocumentId);
  expect(detailIndex).toBeGreaterThanOrEqual(0);
  expect(summaryIndex).toBeGreaterThan(detailIndex);
  expect(authorizationHeaders).toEqual([]);
});
