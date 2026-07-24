import { expect, installMockKvRoute, test } from './fixtures';
import type { Page, Route } from '@playwright/test';

const alias = 'sync-7f3k';
const documentId = 'concursos--sync-7f3k--exemplo--fundamentos';
const questionnaireUrl = '/concursos/concurso-exemplo/assunto-exemplo/questoes/';
const kvRoute = 'https://kv.helio.me/**';

const blockKv = (route: Route) => route.abort('internetdisconnected');

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

async function storedAnswerDocument(page: Page): Promise<ReturnType<typeof remoteDocument> | undefined> {
  return page.evaluate(
    (id) =>
      new Promise((resolve, reject) => {
        const request = indexedDB.open('concursos-offline');
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const transaction = request.result.transaction('responses', 'readonly');
          const read = transaction.objectStore('responses').get(id);
          read.onerror = () => reject(read.error);
          read.onsuccess = () => resolve(read.result?.current);
        };
      }),
    documentId,
  );
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

test('disables an older questionnaire when the remote revision is newer', async ({ page, kvStore }) => {
  kvStore.set(documentId, {
    version: 3,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: { ...remoteDocument('b'), questionSetRevision: 2 },
  });

  await page.goto(questionnaireUrl);
  await expect(page.getByText(/revisão editorial mais nova/i)).toBeVisible();
  await expect(page.getByLabel('Eficiência')).toBeDisabled();
  expect((kvStore.get(documentId)?.json as { questionSetRevision: number }).questionSetRevision).toBe(2);
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

test('finalizes the latest durable answers when another tab is stale', async ({ page, context, kvStore }) => {
  await context.route(kvRoute, blockKv);
  const stalePage = await context.newPage();
  await stalePage.addInitScript((value) => localStorage.setItem('concursos:active-alias', value), alias);
  await Promise.all([page.goto(questionnaireUrl), stalePage.goto(questionnaireUrl)]);

  await stalePage.getByLabel('Todas', { exact: true }).check();
  await stalePage.getByLabel('Eficiência').check();
  await expect(stalePage.getByText(/Resposta salva localmente/)).toBeVisible();
  for (let question = 2; question <= 10; question += 1) {
    await stalePage.locator(`[data-question-id="q${String(question).padStart(3, '0')}"] input`).first().check();
    await expect(stalePage.getByText(/Resposta salva localmente/)).toBeVisible();
  }
  await stalePage.getByRole('button', { name: 'Carregar mais questões' }).click();
  for (let question = 11; question <= 12; question += 1) {
    await stalePage.locator(`[data-question-id="q${String(question).padStart(3, '0')}"] input`).first().check();
    await expect(stalePage.getByText(/Resposta salva localmente/)).toBeVisible();
  }

  await page.getByLabel('Efetividade').check();
  await expect(page.getByText(/Resposta salva localmente/)).toBeVisible();
  await stalePage.getByRole('button', { name: 'Finalizar assunto' }).click();
  await expect.poll(() => storedAnswerDocument(stalePage)).toMatchObject({
    answers: {
      q001: { optionId: 'a', questionRevision: 1 },
      q002: { optionId: 'a', questionRevision: 1 },
    },
    submission: { questionSetRevision: 1 },
  });

  await context.unroute(kvRoute, blockKv);
  await stalePage.evaluate(() => window.dispatchEvent(new Event('online')));
  await expect.poll(() => {
    const json = kvStore.get(documentId)?.json as
      | (ReturnType<typeof remoteDocument> & { submission: unknown })
      | undefined;
    return { answers: json?.answers, submitted: Boolean(json?.submission) };
  }).toMatchObject({
    answers: {
      q001: { optionId: 'a', questionRevision: 1 },
      q002: { optionId: 'a', questionRevision: 1 },
    },
    submitted: true,
  });
});

test('reconciles an offline conflict between two simulated devices', async ({
  page,
  context,
  browser,
  kvStore,
}) => {
  await context.route(kvRoute, blockKv);
  await page.goto(questionnaireUrl);
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

  await context.unroute(kvRoute, blockKv);
  await page.evaluate(() => window.dispatchEvent(new Event('online')));
  await expect(page.getByLabel('Efetividade')).toBeChecked();
  await expect.poll(() => {
    const json = kvStore.get(documentId)?.json as ReturnType<typeof remoteDocument> | undefined;
    return json?.answers.q001?.optionId;
  }).toBe('a');
  await otherContext.close();
});
