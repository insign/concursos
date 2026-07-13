import { expect, test } from './fixtures';

const questionnaireUrl = '/concursos/concurso-exemplo/assunto-exemplo/questoes/';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('concursos:active-alias', 'teste-7f3k'));
});

test('renders the three layouts progressively with native controls', async ({ page }) => {
  await page.goto(questionnaireUrl);

  await expect(page.locator('.question-card')).toHaveCount(1);
  await expect(page.locator('.question-card legend')).toHaveText('Questão 1 de 12');
  await expect(page.getByLabel('Efetividade')).toBeVisible();

  await page.getByLabel('Blocos de dez').check();
  await expect(page.locator('.question-card')).toHaveCount(10);

  await page.getByLabel('Todas').check();
  await expect(page.locator('.question-card')).toHaveCount(10);
  await page.getByRole('button', { name: 'Carregar mais questões' }).click();
  await expect(page.locator('.question-card')).toHaveCount(12);
});

test('reveals immediate feedback and permits answer changes', async ({ page }) => {
  await page.goto(questionnaireUrl);
  await page.getByLabel('Imediata').check();

  await page.getByLabel('Efetividade').check();
  await expect(page.getByText('Resposta incorreta.')).toBeVisible();

  await page.getByLabel('Eficiência').check();
  await expect(page.getByText('Resposta correta.')).toBeVisible();
  await expect(page.getByLabel('Eficiência')).toBeFocused();
});

test('keeps answers private until a complete on-submit finalization', async ({ page }) => {
  await page.goto(questionnaireUrl);
  await page.getByLabel('Todas').check();
  await page.getByRole('button', { name: 'Carregar mais questões' }).click();

  const cards = page.locator('.question-card');
  await cards.first().locator('input[type="radio"]').first().check();
  await expect(page.locator('.question-feedback')).toHaveCount(0);
  await page.getByRole('button', { name: 'Finalizar assunto' }).click();
  await expect(page.getByText('Faltam 11.')).toBeVisible();

  for (let index = 1; index < 12; index += 1) {
    await cards.nth(index).locator('input[type="radio"]').first().check();
  }

  await page.getByRole('button', { name: 'Finalizar assunto' }).click();
  await expect(page.getByText(/Finalizado: \d+ de 12 respostas corretas\./)).toBeVisible();
  await expect(page.locator('.question-feedback')).toHaveCount(12);

  await cards.first().locator('input[type="radio"]').nth(1).check();
  await expect(page.getByText('A finalização anterior foi invalidada.')).toBeVisible();
  await expect(page.locator('.question-feedback')).toHaveCount(0);
});

test('restores a locally durable answer after reopening the page', async ({ page }) => {
  await page.goto(questionnaireUrl);
  await page.getByLabel('Imediata').check();
  await page.getByLabel('Eficiência').check();
  await expect(page.getByText('Resposta salva localmente')).toBeVisible();

  await page.reload();
  await expect(page.getByLabel('Eficiência')).toBeChecked();
  await expect(page.getByText('Respostas restauradas deste dispositivo.')).toBeVisible();
});
