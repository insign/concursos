import { expect, test } from './fixtures';

const catalog = {
  schemaVersion: 1,
  subjects: [
    {
      contestStorageId: 'tse',
      subjectStorageId: 'portugues',
      questionSet: {
        schemaVersion: 1,
        questionSetRevision: 1,
        questions: [
          {
            id: 'q1',
            revision: 1,
            prompt: 'Q1',
            options: [
              { id: 'a', text: 'A' },
              { id: 'b', text: 'B' },
            ],
            correctOptionId: 'a',
            explanation: 'A',
          },
        ],
      },
    },
  ],
};

test.beforeEach(async ({ page }) => {
  await page.route('**/sync-catalog.json', (route) => route.fulfill({ json: catalog }));
});

test('validates and stores a public alias without normalization', async ({ page }) => {
  await page.goto('/configuracoes/');
  await expect(page.getByText('não é conta, senha nem proteção de privacidade')).toBeVisible();

  const input = page.getByLabel('Novo alias');
  await input.fill('Alias Inválido');
  await expect(input).toHaveJSProperty('validity.valid', false);

  await input.fill('estudo-7f3k');
  await page.getByRole('button', { name: 'Usar este alias' }).click();
  await expect(page.getByText('Alias atual:')).toContainText('estudo-7f3k');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('concursos:active-alias'))).toBe('estudo-7f3k');
});

test('requires confirmation before linking an existing remote alias', async ({ page, kvStore }) => {
  const alias = 'existente-7f3k';
  kvStore.set(`concursos--${alias}--preferencias`, {
    version: 2,
    createdAt: '2026-07-23T12:00:00.000Z',
    json: {
      schemaVersion: 1,
      questionLayout: 'all',
      correctionMode: 'immediate',
      shuffleQuestions: false,
    },
  });
  await page.goto('/configuracoes/');
  await page.getByLabel('Novo alias').fill(alias);

  page.once('dialog', (dialog) => dialog.dismiss());
  await page.getByRole('button', { name: 'Usar este alias' }).click();
  await expect(page.getByText('Vinculação cancelada; nenhum alias foi ativado.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Usar este alias' })).toBeEnabled();
  await expect(page.evaluate(() => localStorage.getItem('concursos:active-alias'))).resolves.toBeNull();

  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Usar este alias' }).click();
  await expect(page.getByText('Alias atual:')).toContainText(alias);
  await expect(page.evaluate(() => localStorage.getItem('concursos:active-alias'))).resolves.toBe(alias);
});

test('keeps the active alias when linking is attempted offline', async ({ page, context }) => {
  const currentAlias = 'atual-7f3k';
  await page.addInitScript(
    ({ key, alias }) => localStorage.setItem(key, alias),
    { key: 'concursos:active-alias', alias: currentAlias },
  );
  await page.goto('/configuracoes/');
  await context.setOffline(true);

  await page.getByLabel('Novo alias').fill('outro-9x2m');
  await page.getByRole('button', { name: 'Usar este alias' }).click();
  await expect(page.getByText('Conecte-se à internet para buscar e vincular este alias')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Usar este alias' })).toBeEnabled();
  await expect(page.evaluate(() => localStorage.getItem('concursos:active-alias'))).resolves.toBe(
    currentAlias,
  );
});

test('keeps the active alias when the target preflight fails', async ({ page, kvFailures }) => {
  const currentAlias = 'atual-7f3k';
  const targetAlias = 'falha-9x2m';
  kvFailures.set(`GET concursos--${targetAlias}--preferencias`, 500);
  await page.addInitScript(
    ({ key, alias }) => localStorage.setItem(key, alias),
    { key: 'concursos:active-alias', alias: currentAlias },
  );
  await page.goto('/configuracoes/');

  await page.getByLabel('Novo alias').fill(targetAlias);
  await page.getByRole('button', { name: 'Usar este alias' }).click();
  await expect(page.getByText('Falha HTTP no KV: 500')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Usar este alias' })).toBeEnabled();
  await expect(page.evaluate(() => localStorage.getItem('concursos:active-alias'))).resolves.toBe(
    currentAlias,
  );
});

test('ignores duplicate submissions while an alias is being prepared', async ({ page, kvStore }) => {
  const alias = 'duplicado-7f3k';
  kvStore.set(`concursos--${alias}--preferencias`, {
    version: 1,
    createdAt: '2026-07-23T12:00:00.000Z',
    json: {
      schemaVersion: 1,
      questionLayout: 'single',
      correctionMode: 'immediate',
      shuffleQuestions: false,
    },
  });
  await page.goto('/configuracoes/');
  await page.getByLabel('Novo alias').fill(alias);
  let confirmationCount = 0;
  page.on('dialog', async (dialog) => {
    confirmationCount += 1;
    await dialog.accept();
  });

  await page.evaluate(() => {
    const form = document.querySelector<HTMLFormElement>('[data-identity-form]')!;
    form.requestSubmit();
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });

  await expect(page.getByText('Alias atual:')).toContainText(alias);
  expect(confirmationCount).toBe(1);
});
