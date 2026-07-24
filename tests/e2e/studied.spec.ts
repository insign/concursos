import { expect, test } from './fixtures';

const alias = 'estudo-2026-teste';
const contest = 'tce-ma-2026-analista-administracao';
const subjectSlug = 'leitura-interpretacao-tipos-generos';
const contentUrl = `/concursos/${contest}/${subjectSlug}/`;
const readingUrl = `/concursos/${contest}/${subjectSlug}/leitura/`;
const contestUrl = `/concursos/${contest}/`;
const subjectId = 'tcema-2026-adm--leitura-tipos-generos';
const estudadosDocId = `concursos--${alias}--estudados`;

test.beforeEach(async ({ page }) => {
  await page.addInitScript((value) => localStorage.setItem('concursos:active-alias', value), alias);
});

test('marks a subject as studied and persists it across reloads', async ({ page }) => {
  await page.goto(contentUrl);
  const mark = page.getByRole('button', { name: 'Marcar como estudado' });
  await expect(mark).toBeEnabled();

  await mark.click();
  await expect(page.getByRole('button', { name: 'Marcar como não estudado' })).toBeVisible();

  await page.reload();
  await expect(page.getByRole('button', { name: 'Marcar como não estudado' })).toBeVisible();
});

test('shows and removes the studied indicator in the catalog listing', async ({ page }) => {
  await page.goto(contentUrl);
  await page.getByRole('button', { name: 'Marcar como estudado' }).click();
  await expect(page.getByRole('button', { name: 'Marcar como não estudado' })).toBeVisible();

  await page.goto(contestUrl);
  const indicator = page.locator(`[data-subject-studied][data-subject-id="${subjectId}"]`);
  await expect(indicator).toBeVisible();

  // Desmarca e o indicador some.
  await page.goto(contentUrl);
  await page.getByRole('button', { name: 'Marcar como não estudado' }).click();
  await expect(page.getByRole('button', { name: 'Marcar como estudado' })).toBeVisible();
  await page.goto(contestUrl);
  await expect(page.locator(`[data-subject-studied][data-subject-id="${subjectId}"]`)).toBeHidden();
});

test('adopts the studied document from the KV (cross-device restore)', async ({ page, kvStore }) => {
  // Documento remoto já marcado (como se viesse de outro dispositivo).
  kvStore.set(estudadosDocId, {
    version: 4,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: {
      schemaVersion: 1,
      studiedSubjectIds: [subjectId],
      updatedAt: '2026-07-13T12:00:00.000Z',
    },
  });

  await page.goto(contentUrl);
  // O coordenador adota o remoto no load e a UI reflete o estado estudado.
  await expect(page.getByRole('button', { name: 'Marcar como não estudado' })).toBeVisible();
  await page.goto(contestUrl);
  await expect(page.locator(`[data-subject-studied][data-subject-id="${subjectId}"]`)).toBeVisible();
});

test('restores the studied state in reading mode without the header coordinator', async ({ page, kvStore }) => {
  kvStore.set(estudadosDocId, {
    version: 4,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: {
      schemaVersion: 1,
      studiedSubjectIds: [subjectId],
      updatedAt: '2026-07-13T12:00:00.000Z',
    },
  });

  await page.goto(readingUrl);
  await expect(page.getByRole('button', { name: 'Marcar como não estudado' })).toBeVisible();
});

test('publishes the studied document to the KV without Authorization', async ({ page, kvStore }) => {
  const authHeaders: string[] = [];
  await page.route('https://kv.helio.me/**', async (route) => {
    const auth = route.request().headers()['authorization'];
    if (auth) authHeaders.push(auth);
    await route.fallback();
  });

  await page.goto(contentUrl);
  await page.getByRole('button', { name: 'Marcar como estudado' }).click();
  await expect(page.getByRole('button', { name: 'Marcar como não estudado' })).toBeVisible();

  await expect
    .poll(() => (kvStore.get(estudadosDocId)?.json as { studiedSubjectIds?: string[] })?.studiedSubjectIds, {
      timeout: 15_000,
    })
    .toContain(subjectId);
  expect(authHeaders).toEqual([]);
});

test('keeps the mark control available in reading mode', async ({ page }) => {
  await page.goto(readingUrl);
  const mark = page.getByRole('button', { name: 'Marcar como estudado' });
  await expect(mark).toBeEnabled();
  await mark.click();
  await expect(page.getByRole('button', { name: 'Marcar como não estudado' })).toBeVisible();
});
