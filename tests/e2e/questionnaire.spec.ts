import { expect, test } from './fixtures';
import type { Page } from '@playwright/test';

const questionnaireUrl = '/concursos/concurso-exemplo/assunto-exemplo/questoes/';
const mixedQuestionnaireUrl =
  '/concursos/tce-ma-2026-analista-administracao/ortografia-oficial/questoes/';

type QuestionSummary = {
  id: string;
  origin: 'authorial' | 'previous_exam';
};

async function questionSummaries(page: Page): Promise<QuestionSummary[]> {
  return page.locator('[data-questionnaire-config]').evaluate((element) => {
    const config = JSON.parse(element.textContent ?? '{}') as {
      questionSet: { questions: QuestionSummary[] };
    };
    return config.questionSet.questions.map(({ id, origin }) => ({ id, origin }));
  });
}

async function loadAllQuestions(page: Page): Promise<void> {
  const loadMore = page.getByRole('button', { name: 'Carregar mais questões' });
  while (await loadMore.isVisible()) await loadMore.click();
}

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

  await page.getByLabel('Todas', { exact: true }).check();
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
  await page.getByLabel('Todas', { exact: true }).check();
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
  await page.getByLabel('Todas', { exact: true }).check();
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

test('filters origins with native controls while preserving the filtered subset and answers', async ({ page }) => {
  await page.goto(mixedQuestionnaireUrl);
  const questions = await questionSummaries(page);
  const authorialQuestions = questions.filter((question) => question.origin === 'authorial');
  const previousExamQuestions = questions.filter((question) => question.origin === 'previous_exam');
  const cards = page.locator('.question-card');

  expect(authorialQuestions.length).toBeGreaterThan(1);
  expect(previousExamQuestions.length).toBeGreaterThan(0);

  await page.getByLabel('Autorais').check();
  await page.reload();
  await expect(page.getByLabel('Todas as origens')).toBeChecked();
  await expect(page.locator('[data-question-count]')).toHaveText(
    `${questions.length} questões no conjunto editorial atual.`,
  );

  await page.getByLabel('Autorais').focus();
  await page.keyboard.press('Space');
  await expect(page.getByLabel('Autorais')).toBeChecked();
  await expect(page.locator('[data-question-count]')).toContainText(`Exibindo ${authorialQuestions.length}`);
  await expect(page.locator('[data-question-count]')).toContainText(`de ${questions.length}`);

  await page.getByLabel('Blocos de dez').check();
  await expect(cards).toHaveCount(Math.min(10, authorialQuestions.length));
  await expect(page.locator('[data-page-status]')).toHaveText(
    `Página 1 de ${Math.ceil(authorialQuestions.length / 10)}`,
  );
  expect(await cards.evaluateAll((elements) => elements.every((card) => card.dataset.questionOrigin === 'authorial'))).toBe(
    true,
  );

  if (authorialQuestions.length > 10) {
    await page.getByRole('button', { name: 'Próxima' }).click();
    await expect(page.locator('[data-page-status]')).toHaveText(
      `Página 2 de ${Math.ceil(authorialQuestions.length / 10)}`,
    );
  }

  await page.getByLabel('Todas', { exact: true }).check();
  await loadAllQuestions(page);
  await expect(cards).toHaveCount(authorialQuestions.length);
  expect(await cards.evaluateAll((elements) => elements.every((card) => card.dataset.questionOrigin === 'authorial'))).toBe(
    true,
  );

  const answeredId = await cards.first().getAttribute('data-question-id');
  const selectedOption = cards.first().locator('input[type="radio"]').first();
  const selectedValue = await selectedOption.getAttribute('value');
  if (!answeredId || !selectedValue) throw new Error('A questão filtrada não possui uma opção identificável.');
  await selectedOption.check();
  await expect(page.getByText('Resposta salva localmente')).toBeVisible();

  await page.getByLabel('Concursos anteriores').check();
  await loadAllQuestions(page);
  await expect(cards).toHaveCount(previousExamQuestions.length);
  expect(await cards.evaluateAll((elements) => elements.every((card) => card.dataset.questionOrigin === 'previous_exam'))).toBe(
    true,
  );

  await page.getByLabel('Autorais').check();
  await page.getByLabel('Todas', { exact: true }).check();
  await loadAllQuestions(page);
  await expect(page.locator(`[data-question-id="${answeredId}"] input[value="${selectedValue}"]`)).toBeChecked();

  await page.getByLabel('Embaralhar questões').check();
  await loadAllQuestions(page);
  const questionIds = () =>
    cards.evaluateAll((elements) => elements.map((card) => card.getAttribute('data-question-id')));
  const firstOrder = await questionIds();
  await page.getByRole('button', { name: 'Gerar nova ordem' }).click();
  const secondOrder = await questionIds();
  expect(secondOrder).not.toEqual(firstOrder);
  expect([...secondOrder].sort()).toEqual([...firstOrder].sort());
});

test('keeps finalization scoped to the full subject when an origin is empty', async ({ page }) => {
  await page.goto(questionnaireUrl);

  await page.getByLabel('Concursos anteriores').check();
  await expect(page.locator('[data-question-empty-state]')).toHaveText(
    'Não há questões de concursos anteriores neste assunto.',
  );
  await expect(page.locator('[data-question-pagination]')).toBeHidden();
  await expect(page.locator('[data-question-count]')).toHaveText(
    'Exibindo 0 questões de 12 questões do conjunto editorial atual.',
  );

  await page.getByRole('button', { name: 'Finalizar assunto' }).click();
  await expect(page.getByText('Faltam 12.')).toBeVisible();

  await page.getByLabel('Autorais').check();
  await page.locator('.question-card').first().locator('input[type="radio"]').first().check();
  await expect(page.getByText('Resposta salva localmente')).toBeVisible();

  await page.getByLabel('Concursos anteriores').check();
  await page.getByRole('button', { name: 'Finalizar assunto' }).click();
  await expect(page.getByText('Faltam 11.')).toBeVisible();
});
