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

test('shows and repairs materialized progress without exposing on-submit score', async ({ page }) => {
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/questoes/');
  await page.getByLabel('Eficiência').check();
  await expect(page.getByText('Resposta salva localmente')).toBeVisible();

  await page.goto('/concursos/concurso-exemplo/');
  await expect(page.locator('[data-progress-summary]')).toHaveText('1/12 respondidas.');

  await page.goto('/configuracoes/');
  await page.getByRole('button', { name: 'Recalcular progresso' }).click();
  await expect(page.getByText('Progresso recalculado para 1 assunto(s).')).toBeVisible();
});
