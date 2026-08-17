import { expect, test } from './fixtures';

const questionnaireUrl = '/concursos/concurso-exemplo/assunto-exemplo/questoes/';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('concursos:active-alias', 'resolucoes-e2e-7f3k'));
});

test('opens a rich resolution only after immediate correction and restores focus', async ({ page }) => {
  await page.goto(questionnaireUrl);
  await page.getByLabel('Imediata').check();

  const trigger = page.getByRole('button', { name: 'Ver resolução passo a passo' });
  await expect(trigger).toHaveCount(0);

  await page.getByLabel('Eficiência').check();
  await expect(trigger).toBeVisible();
  await trigger.click();

  const dialog = page.getByRole('dialog', { name: 'Resolução passo a passo' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'Como identificar a eficiência' })).toBeVisible();
  await expect(dialog.locator('.katex')).toBeVisible();
  await expect(dialog.locator('pre.mermaid')).toHaveAttribute('data-render-status', 'success', {
    timeout: 20_000,
  });

  await dialog.getByRole('button', { name: 'Fechar' }).click();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('keeps the resolution hidden until on-submit finalization', async ({ page }) => {
  await page.goto(questionnaireUrl);
  await page.getByLabel('Todas', { exact: true }).check();
  await page.getByRole('button', { name: 'Carregar mais questões' }).click();

  const cards = page.locator('.question-card');
  await expect(cards).toHaveCount(12);
  await cards.first().locator('input[type="radio"]').first().check();
  await expect(page.getByRole('button', { name: 'Ver resolução passo a passo' })).toHaveCount(0);

  for (let index = 1; index < 12; index += 1) {
    await cards.nth(index).locator('input[type="radio"]').first().check();
  }
  await page.getByRole('button', { name: 'Finalizar assunto' }).click();
  await expect(page.getByText(/Finalizado: \d+ de 12 respostas corretas\./)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ver resolução passo a passo' })).toBeVisible();
});

test('keeps the article readable when the lazy Mermaid runtime is unavailable', async ({ page }) => {
  await page.route('**/ResolutionMermaidRuntime*.js', (route) => route.abort());
  await page.goto(questionnaireUrl);
  await page.getByLabel('Imediata').check();
  await page.getByLabel('Eficiência').check();

  const trigger = page.getByRole('button', { name: 'Ver resolução passo a passo' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Resolução passo a passo' });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('[data-resolution-status]')).toBeHidden();
  await expect(dialog.locator('pre.mermaid')).toHaveAttribute('data-render-status', 'error');
  await expect(dialog.locator('pre.mermaid')).toHaveAttribute('data-processed', 'true');
  await expect(dialog.locator('pre.mermaid')).toHaveCSS('animation-name', 'none');
});

test('offers the resolution when reviewing a completed simulated attempt', async ({ page }) => {
  await page.route('**/simulados/pool/exemplo.json', async (route) => {
    await route.fulfill({
      json: {
        schemaVersion: 1,
        contestStorageId: 'exemplo',
        contestSlug: 'concurso-exemplo',
        contestTitle: 'Concurso de exemplo',
        subjects: [
          {
            subjectStorageId: 'fundamentos',
            subjectSlug: 'assunto-exemplo',
            title: 'Fundamentos de administração pública',
            questions: [
              {
                questionId: 'q001',
                questionRevision: 1,
                origin: 'authorial',
                prompt: 'Qual conceito compara os recursos utilizados com as entregas produzidas?',
                options: [
                  { id: 'a', text: 'Efetividade' },
                  { id: 'b', text: 'Eficiência' },
                  { id: 'c', text: 'Legalidade' },
                ],
                correctOptionId: 'b',
                explanation: 'Eficiência relaciona meios empregados e produtos ou serviços entregues.',
              },
            ],
          },
        ],
      },
    });
  });

  await page.goto('/simulados/?concurso=exemplo');
  await page.locator('[data-subject-list] input[data-subject]').first().check();
  await page.locator('[data-count]').fill('1');
  await page.getByRole('button', { name: 'Gerar simulado', exact: true }).click();
  await expect(page.locator('[data-question-list] > li')).toHaveCount(1);

  await page.getByRole('button', { name: 'Finalizar e corrigir' }).click();
  await expect(page.locator('[data-result]')).toContainText(/acertos/);

  const trigger = page.getByRole('button', { name: 'Ver resolução passo a passo' });
  await expect(trigger).toBeVisible();
  await expect(trigger.locator('xpath=ancestor::fieldset')).toHaveCount(0);
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Resolução passo a passo' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'Como identificar a eficiência' })).toBeVisible();
});
