import { expect, test } from './fixtures';

const alias = 'navegacao-2026-teste';
const navigationDocumentId = `concursos--${alias}--navegacao`;
const readingRoute = '/concursos/concurso-exemplo/assunto-exemplo/leitura/';
const questionsRoute = '/concursos/concurso-exemplo/assunto-exemplo/questoes/';
const timestamp = '2026-07-25T00:00:00.000Z';

function remoteNavigation(route: string, overrides: Record<string, unknown> = {}) {
  return {
    schemaVersion: 1,
    updatedAt: timestamp,
    route,
    context: {
      contestStorageId: 'concurso-exemplo',
      groupId: 'grupo-exemplo',
      subjectStorageId: 'assunto-exemplo',
      questionId: null,
      activeTab: route.includes('/questoes/') ? 'questions' : 'reading',
      readingMode: route.includes('/leitura/'),
      questionOrigin: route.includes('/questoes/') ? 'previous_exam' : null,
      questionLayout: route.includes('/questoes/') ? 'ten' : null,
      shuffleQuestions: route.includes('/questoes/') ? false : null,
      ...overrides,
    },
    readingPosition: route.includes('/leitura/')
      ? {
          contentVersion: 'conteudos/concurso-exemplo/assunto-exemplo',
          sectionId: 'inicio',
          blockId: null,
          blockIndex: 2,
          relativeOffset: 0.4,
          textQuote: '',
          progress: 0.45,
        }
      : null,
  };
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript((value) => localStorage.setItem('concursos:active-alias', value), alias);
});

test('publishes a semantic reading position without Authorization', async ({ page, kvStore }) => {
  const authorizationHeaders: string[] = [];
  await page.route('https://kv.helio.me/**', async (route) => {
    if (route.request().method() === 'PUT' && route.request().url().endsWith(navigationDocumentId)) {
      const authorization = route.request().headers()['authorization'];
      if (authorization) authorizationHeaders.push(authorization);
    }
    await route.fallback();
  });

  await page.setViewportSize({ width: 390, height: 720 });
  await page.goto(readingRoute);
  await page.evaluate(() => window.scrollTo(0, Math.max(300, window.document.documentElement.scrollHeight * 0.45)));

  await expect.poll(() => kvStore.get(navigationDocumentId)?.json, { timeout: 30_000 }).toBeTruthy();
  const savedDocument = kvStore.get(navigationDocumentId)?.json as {
    route: string;
    readingPosition: { blockIndex: number; relativeOffset: number; textQuote: string; progress: number } | null;
  };
  expect(savedDocument.route).toBe(readingRoute);
  expect(savedDocument.readingPosition).not.toBeNull();
  expect(savedDocument.readingPosition?.blockIndex).toBeGreaterThanOrEqual(0);
  expect(savedDocument.readingPosition?.relativeOffset).toBeGreaterThanOrEqual(0);
  expect(savedDocument.readingPosition?.progress).toBeGreaterThanOrEqual(0);
  expect(authorizationHeaders).toEqual([]);
});

test('restores route and questionnaire context on another viewport', async ({ page, kvStore }) => {
  kvStore.set(navigationDocumentId, {
    version: 7,
    createdAt: timestamp,
    json: remoteNavigation(questionsRoute),
  });

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await expect(page).toHaveURL(new RegExp(`${questionsRoute.replaceAll('/', '\\/')}$`), { timeout: 30_000 });
  await expect(page.getByLabel('Blocos de dez')).toBeChecked();
  await expect(page.getByLabel('Concursos anteriores')).toBeChecked();
});

test('offers a newer remote point without forcing navigation during an active session', async ({ page, kvStore }) => {
  await page.goto(readingRoute);
  await expect.poll(() => kvStore.get(navigationDocumentId)?.version, { timeout: 30_000 }).toBeTruthy();
  const currentVersion = kvStore.get(navigationDocumentId)?.version ?? 0;

  kvStore.set(navigationDocumentId, {
    version: currentVersion + 1,
    createdAt: timestamp,
    json: remoteNavigation('/simulados/', {
      contestStorageId: null,
      groupId: null,
      subjectStorageId: null,
      activeTab: 'simulados',
      readingMode: false,
      questionOrigin: null,
      questionLayout: null,
      shuffleQuestions: null,
    }),
  });

  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  const resume = page.getByRole('button', { name: 'Retomar ponto mais recente' });
  await expect(resume).toBeVisible({ timeout: 30_000 });
  await expect(page).toHaveURL(new RegExp(`${readingRoute.replaceAll('/', '\\/')}$`));

  await resume.click();
  await expect(page).toHaveURL(/\/simulados\/$/);
});
