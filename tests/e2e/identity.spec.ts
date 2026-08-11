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

test('shows an accessible activity indicator while an alias is being prepared', async ({ page }) => {
  const alias = 'progresso-7f3k';
  let releaseRequest: () => void = () => undefined;
  const requestReleased = new Promise<void>((resolve) => {
    releaseRequest = resolve;
  });
  let markRequestStarted: () => void = () => undefined;
  const requestStarted = new Promise<void>((resolve) => {
    markRequestStarted = resolve;
  });
  await page.route('https://kv.helio.me/**', async (route) => {
    if (
      route.request().method() === 'GET' &&
      new RegExp(`concursos--${alias}--preferencias(?:/version)?$`).test(
        new URL(route.request().url()).pathname,
      )
    ) {
      markRequestStarted();
      await requestReleased;
    }
    await route.fallback();
  });

  await page.goto('/configuracoes/');
  await page.getByLabel('Novo alias').fill(alias);
  await page.getByRole('button', { name: 'Usar este alias' }).click();
  await requestStarted;

  const submit = page.locator('[data-identity-submit]');
  await Promise.all([
    expect(submit).toHaveAttribute('aria-busy', 'true', { timeout: 2_000 }),
    expect(page.locator('[data-identity-progress]')).toBeVisible({ timeout: 2_000 }),
    expect(page.getByRole('button', { name: 'Usar este alias' })).toBeDisabled({ timeout: 2_000 }),
  ]);

  releaseRequest();
  await expect(page.getByText('Alias atual:')).toContainText(alias);
});

test('links an existing remote alias directly after preflight', async ({ page, kvStore }) => {
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
  await page.evaluate(() => {
    const status = document.querySelector<HTMLElement>('[data-identity-status]')!;
    const messages: string[] = [];
    new MutationObserver(() => {
      messages.push(status.textContent ?? '');
      sessionStorage.setItem('test:identity-statuses', JSON.stringify(messages));
    }).observe(status, { childList: true, characterData: true, subtree: true });
  });
  const dialogs: string[] = [];
  page.once('dialog', (dialog) => {
    dialogs.push(dialog.message());
    return dialog.dismiss();
  });
  await page.getByRole('button', { name: 'Usar este alias' }).click();
  await expect(page.getByText('Alias atual:')).toContainText(alias);
  await expect(page.evaluate(() => localStorage.getItem('concursos:active-alias'))).resolves.toBe(alias);
  await expect(page.getByLabel('Todas', { exact: true })).toBeChecked();
  expect(kvStore.get(`concursos--${alias}--preferencias`)?.version).toBe(2);
  expect(dialogs).toEqual([]);
  expect(
    await page.evaluate(() =>
      JSON.parse(sessionStorage.getItem('test:identity-statuses') ?? '[]') as string[],
    ),
  ).toContain('Sincronizando 1 documento do perfil encontrado...');
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
  await expect(page.locator('[data-identity-submit]')).not.toHaveAttribute('aria-busy');
  await expect(page.locator('[data-identity-progress]')).toBeHidden();
  await expect(page.evaluate(() => localStorage.getItem('concursos:active-alias'))).resolves.toBe(
    currentAlias,
  );
});

test('ignores duplicate submissions while an alias is being prepared', async ({ page, kvStore }) => {
  test.setTimeout(60_000);
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
  await page.evaluate(() => {
    const status = document.querySelector<HTMLElement>('[data-identity-status]')!;
    let starts = 0;
    new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.textContent === 'Buscando e validando os dados deste alias...') starts += 1;
        }
      }
      sessionStorage.setItem('test:identity-prepare-starts', String(starts));
    }).observe(status, { childList: true, characterData: true, subtree: true });
  });
  const dialogs: string[] = [];
  page.on('dialog', async (dialog) => {
    dialogs.push(dialog.message());
    await dialog.dismiss();
  });

  await page.evaluate(() => {
    const form = document.querySelector<HTMLFormElement>('[data-identity-form]')!;
    form.requestSubmit();
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });

  await expect(page.getByText('Alias atual:')).toContainText(alias, { timeout: 45_000 });
  expect(await page.evaluate(() => sessionStorage.getItem('test:identity-prepare-starts'))).toBe('1');
  expect(dialogs).toEqual([]);
});
