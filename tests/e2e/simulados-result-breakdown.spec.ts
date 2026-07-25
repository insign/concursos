import { expect, test } from './fixtures';

const alias = 'simulados-resultado-2026';
const contestStorageId = 'tcema-2026-adm';

test.beforeEach(async ({ page }) => {
  await page.addInitScript((value) => {
    localStorage.setItem('concursos:active-alias', value);
  }, alias);
});

test('shows the completed result broken down by subject', async ({ page }) => {
  await page.goto(`/simulados/?concurso=${contestStorageId}`);

  const subjectLabel = page.locator('[data-subject-list] label').first();
  const subjectTitle = (await subjectLabel.locator('span').innerText()).replace(/\s+\(\d+\)$/, '');
  await subjectLabel.locator('input[data-subject]').check();
  await page.locator('[data-count]').fill('1');
  await page.getByRole('button', { name: 'Gerar simulado', exact: true }).click();
  await page.locator('[data-question-list] input[type="radio"]').first().check();
  await page.getByRole('button', { name: 'Finalizar e corrigir' }).click();

  await expect(page.getByRole('heading', { name: 'Resultado por assunto' })).toBeVisible();
  const subjectResult = page.locator('[data-result-by-subject-list] li');
  await expect(subjectResult).toHaveCount(1);
  await expect(subjectResult).toContainText(subjectTitle);
  await expect(subjectResult).toContainText(/\d+\/1 acertos/);
});
