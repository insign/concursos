import { expect, test } from './fixtures';

const alias = 'sugestao-assunto-2026';
const contest = 'tce-ma-2026-analista-administracao';
const subject = 'leitura-interpretacao-tipos-generos';
const base = `/concursos/${contest}/${subject}`;
const studiedDocumentId = `concursos--${alias}--estudados`;
const routes = [`${base}/`, `${base}/cheat-sheet/`, `${base}/questoes/`, `${base}/leitura/`];

const suggestion = (page: import('@playwright/test').Page) =>
  page.getByRole('link', { name: 'Próximo assunto sugerido' });

test('shows one real suggested-subject link on every subject route', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(suggestion(page)).toBeVisible();
    await expect(suggestion(page)).toHaveAttribute(
      'href',
      new RegExp(`^/concursos/${contest}/[^/]+/$`),
    );
  }
});

test('updates the suggestion after marking and unmarking the suggested subject', async ({ page }) => {
  await page.addInitScript((value) => localStorage.setItem('concursos:active-alias', value), alias);
  await page.goto(`${base}/`);
  const initialHref = await suggestion(page).getAttribute('href');
  expect(initialHref).toBeTruthy();

  await page.goto(initialHref!);
  await expect(suggestion(page)).toHaveAttribute('href', initialHref!);
  await page.getByRole('button', { name: 'Marcar como concluído' }).click();
  await expect(suggestion(page)).not.toHaveAttribute('href', initialHref!);

  await page.getByRole('button', { name: 'Desfazer conclusão' }).click();
  await expect(suggestion(page)).toHaveAttribute('href', initialHref!);
});

test('adopts remote studied state and announces a fully completed contest', async ({ page, kvStore }) => {
  await page.goto(`${base}/`);
  const serialized = await page.locator('[data-subject-suggestion-config]').textContent();
  expect(serialized).toBeTruthy();
  const model = JSON.parse(serialized!) as {
    groups: { subjects: { studiedSubjectId: string }[] }[];
  };
  const studiedSubjectIds = model.groups.flatMap(({ subjects }) =>
    subjects.map(({ studiedSubjectId }) => studiedSubjectId),
  );

  kvStore.set(studiedDocumentId, {
    version: 10,
    createdAt: '2026-07-30T12:00:00.000Z',
    json: {
      schemaVersion: 1,
      studiedSubjectIds,
      updatedAt: '2026-07-30T12:00:00.000Z',
    },
  });
  await page.evaluate((value) => localStorage.setItem('concursos:active-alias', value), alias);
  await page.reload();

  const root = page.locator('[data-subject-suggestion]');
  await expect(root.locator('[data-subject-suggestion-status]')).toHaveText(
    'Todos os assuntos deste concurso foram concluídos.',
  );
  await expect(suggestion(page)).toBeHidden();
});

test('keeps a deterministic static link without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'http://127.0.0.1:4321',
    javaScriptEnabled: false,
  });
  const page = await context.newPage();

  for (const route of [`${base}/cheat-sheet/`, `${base}/leitura/`]) {
    await page.goto(route);
    await expect(suggestion(page)).toBeVisible();
    await expect(suggestion(page)).toHaveAttribute(
      'href',
      new RegExp(`^/concursos/${contest}/[^/]+/$`),
    );
  }

  await context.close();
});
