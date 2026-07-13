import { expect, installMockKvRoute, test } from './fixtures';

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

test('preserves independent answers written from two tabs', async ({ page, context, kvStore }) => {
  const secondPage = await context.newPage();
  await secondPage.addInitScript((value) => localStorage.setItem('concursos:active-alias', value), alias);
  await Promise.all([page.goto(questionnaireUrl), secondPage.goto(questionnaireUrl)]);

  await page.getByLabel('Eficiência').check();
  await expect(page.getByText(/Resposta salva localmente/)).toBeVisible();
  await secondPage.getByRole('button', { name: 'Próxima' }).click();
  await secondPage.getByLabel('Eficácia').check();
  await expect(secondPage.getByText(/Resposta salva localmente/)).toBeVisible();

  await expect.poll(() => {
    const json = kvStore.get(documentId)?.json as ReturnType<typeof remoteDocument> | undefined;
    return json?.answers;
  }).toMatchObject({
    q001: { optionId: 'b', questionRevision: 1 },
    q002: { optionId: 'a', questionRevision: 1 },
  });
});

test('reconciles an offline conflict between two simulated devices', async ({
  page,
  context,
  browser,
  kvStore,
}) => {
  await page.goto(questionnaireUrl);
  await context.setOffline(true);
  await page.getByLabel('Eficiência').check();
  await expect(page.getByText(/Resposta salva localmente/)).toBeVisible();

  const otherContext = await browser.newContext({ baseURL: 'http://127.0.0.1:4321' });
  await installMockKvRoute(otherContext, kvStore);
  const otherPage = await otherContext.newPage();
  await otherPage.addInitScript((value) => localStorage.setItem('concursos:active-alias', value), alias);
  await otherPage.goto(questionnaireUrl);
  await otherPage.getByLabel('Efetividade').check();
  await expect.poll(() => {
    const json = kvStore.get(documentId)?.json as ReturnType<typeof remoteDocument> | undefined;
    return json?.answers.q001?.optionId;
  }).toBe('a');

  await context.setOffline(false);
  await page.evaluate(() => window.dispatchEvent(new Event('online')));
  await expect(page.getByLabel('Efetividade')).toBeChecked();
  await expect.poll(() => {
    const json = kvStore.get(documentId)?.json as ReturnType<typeof remoteDocument> | undefined;
    return json?.answers.q001?.optionId;
  }).toBe('a');
  await otherContext.close();
});
