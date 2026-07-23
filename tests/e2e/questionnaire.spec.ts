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

test('generates consecutive orders without moving answers between question IDs', async ({ page }) => {
  await page.goto(questionnaireUrl);
  const reshuffle = page.getByRole('button', { name: 'Gerar nova ordem' });
  await expect(reshuffle).toBeDisabled();

  await page.getByLabel('Embaralhar questões').check();
  await expect(reshuffle).toBeEnabled();
  await page.getByLabel('Todas').check();
  await page.getByRole('button', { name: 'Carregar mais questões' }).click();

  const cards = page.locator('.question-card');
  const questionIds = () =>
    cards.evaluateAll((elements) => elements.map((element) => element.getAttribute('data-question-id')));
  const initialOrder = await questionIds();

  await reshuffle.click();
  await expect(cards).toHaveCount(12);
  const firstOrder = await questionIds();
  expect(firstOrder).not.toEqual(initialOrder);
  expect([...firstOrder].sort()).toEqual([...initialOrder].sort());

  const answeredId = firstOrder[0]!;
  const answeredCard = page.locator(`[data-question-id="${answeredId}"]`);
  const answer = answeredCard.locator('input[type="radio"]').first();
  const answerValue = await answer.getAttribute('value');
  if (!answerValue) throw new Error('A opção selecionada não possui value.');
  await answer.check();
  await expect(page.getByText('Resposta salva localmente')).toBeVisible();
  expect(await questionIds()).toEqual(firstOrder);

  await page.getByLabel('Imediata').check();
  expect(await questionIds()).toEqual(firstOrder);

  await reshuffle.click();
  const secondOrder = await questionIds();
  expect(secondOrder).not.toEqual(firstOrder);
  expect([...secondOrder].sort()).toEqual([...initialOrder].sort());
  await expect(
    page.locator(`[data-question-id="${answeredId}"] input[value="${answerValue}"]`),
  ).toBeChecked();

  await page.getByLabel('Embaralhar questões').uncheck();
  await expect(reshuffle).toBeDisabled();
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
