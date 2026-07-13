import { expect, test } from './fixtures';

const alias = 'sync-7f3k';
const documentId = 'concursos--sync-7f3k--exemplo--fundamentos';
const questionnaireUrl = '/concursos/concurso-exemplo/assunto-exemplo/questoes/';

function remoteDocument(optionId: string) {
  return {
    schemaVersion: 1,
    questionSetRevision: 1,
    answers: {
      q001: { optionId, questionRevision: 1 },
    },
    submission: null,
  };
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript((value) => localStorage.setItem('concursos:active-alias', value), alias);
});

test('pulls a valid remote document into an empty local profile', async ({ page, kvStore }) => {
  kvStore.set(documentId, {
    version: 3,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: remoteDocument('b'),
  });

  await page.goto(questionnaireUrl);
  await expect(page.getByLabel('Eficiência')).toBeChecked();
  await expect(page.getByText('Respostas locais e remotas reconciliadas.')).toBeVisible();
});

test('pushes a complete local snapshot without Authorization', async ({ page, kvStore }) => {
  const requests: Record<string, string>[] = [];
  page.on('request', (request) => {
    if (request.url().startsWith('https://kv.helio.me/')) requests.push(request.headers());
  });

  await page.goto(questionnaireUrl);
  await page.getByLabel('Eficiência').check();

  await expect.poll(() => {
    const json = kvStore.get(documentId)?.json as ReturnType<typeof remoteDocument> | undefined;
    return json?.answers.q001?.optionId;
  }).toBe('b');
  expect(requests.every((headers) => headers.authorization === undefined)).toBe(true);
});

test('uses the last observed remote answer for a same-question conflict', async ({ page, kvStore }) => {
  kvStore.set(documentId, {
    version: 3,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: remoteDocument('a'),
  });
  await page.goto(questionnaireUrl);
  await expect(page.getByLabel('Efetividade')).toBeChecked();

  kvStore.set(documentId, {
    version: 4,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: remoteDocument('c'),
  });
  await page.getByLabel('Eficiência').check();

  await expect(page.getByLabel('Legalidade')).toBeChecked();
  await expect.poll(() => {
    const json = kvStore.get(documentId)?.json as ReturnType<typeof remoteDocument> | undefined;
    return json?.answers.q001?.optionId;
  }).toBe('c');
});
