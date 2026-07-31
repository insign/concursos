import { expect, test } from './fixtures';
import type { Page } from '@playwright/test';

const alias = 'navegacao-2026-teste';
const navigationDocumentId = `concursos--${alias}--navegacao`;
const readingRoute = '/concursos/concurso-exemplo/assunto-exemplo/';
const readingDestination = `${readingRoute}#focus`;
const legacyReadingRoute = `${readingRoute}leitura/`;
const questionsRoute = '/concursos/concurso-exemplo/assunto-exemplo/questoes/';
const timestamp = '2026-07-25T00:00:00.000Z';

function remoteNavigation(
  route: string,
  contextOverrides: Record<string, unknown> = {},
  documentOverrides: Record<string, unknown> = {},
) {
  const readingMode = contextOverrides.readingMode ?? route.includes('/leitura/');
  return {
    schemaVersion: 1,
    updatedAt: timestamp,
    route,
    context: {
      contestStorageId: 'concurso-exemplo',
      groupId: 'grupo-exemplo',
      subjectStorageId: 'assunto-exemplo',
      questionId: null,
      activeTab: route.includes('/questoes/') ? 'questions' : 'content',
      readingMode,
      questionOrigin: route.includes('/questoes/') ? 'previous_exam' : null,
      questionLayout: route.includes('/questoes/') ? 'ten' : null,
      shuffleQuestions: route.includes('/questoes/') ? false : null,
      ...contextOverrides,
    },
    readingPosition: readingMode
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
    ...documentOverrides,
  };
}

async function lastQuestionId(page: Page): Promise<string> {
  const response = await page.request.get(questionsRoute);
  const html = await response.text();
  const match = html.match(/<script[^>]*data-questionnaire-config[^>]*>([\s\S]*?)<\/script>/);
  if (!match) throw new Error('Configuração do questionário não encontrada.');
  const config = JSON.parse(match[1]) as {
    questionSet: { questions: Array<{ id: string }> };
  };
  const id = config.questionSet.questions.at(-1)?.id;
  if (!id) throw new Error('O questionário não possui uma última questão.');
  return id;
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
  await page.goto(readingDestination);
  await page.evaluate(() => window.scrollTo(0, Math.max(300, window.document.documentElement.scrollHeight * 0.45)));

  await expect.poll(() => kvStore.get(navigationDocumentId)?.json, { timeout: 30_000 }).toBeTruthy();
  const savedDocument = kvStore.get(navigationDocumentId)?.json as {
    route: string;
    context: { activeTab: string; readingMode: boolean };
    readingPosition: { blockIndex: number; relativeOffset: number; textQuote: string; progress: number } | null;
  };
  expect(savedDocument.route).toBe(readingRoute);
  expect(savedDocument.context).toMatchObject({ activeTab: 'content', readingMode: true });
  expect(savedDocument.readingPosition).not.toBeNull();
  expect(savedDocument.readingPosition?.blockIndex).toBeGreaterThanOrEqual(0);
  expect(savedDocument.readingPosition?.relativeOffset).toBeGreaterThanOrEqual(0);
  expect(savedDocument.readingPosition?.progress).toBeGreaterThanOrEqual(0);
  expect(authorizationHeaders).toEqual([]);
});

test('normalizes a legacy remote reading route and resumes through #focus', async ({ page, kvStore }) => {
  kvStore.set(navigationDocumentId, {
    version: 6,
    createdAt: timestamp,
    json: remoteNavigation(legacyReadingRoute, { activeTab: 'reading', readingMode: true }),
  });

  await page.goto('/');
  await expect(page).toHaveURL(new RegExp('/concursos/concurso-exemplo/assunto-exemplo/#focus$'), {
    timeout: 30_000,
  });
  await expect(page.getByRole('dialog', { name: 'Modo de leitura sem distrações' })).toBeVisible();
});

test('publishes a direct #focus deep link over an existing normal record', async ({ page, kvStore }) => {
  kvStore.set(navigationDocumentId, {
    version: 2,
    createdAt: timestamp,
    json: remoteNavigation(readingRoute, { activeTab: 'content', readingMode: false }),
  });

  await page.goto(readingDestination);
  await expect
    .poll(
      () =>
        (kvStore.get(navigationDocumentId)?.json as { context?: { readingMode?: boolean } } | undefined)
          ?.context?.readingMode,
      { timeout: 30_000 },
    )
    .toBe(true);
  expect(kvStore.get(navigationDocumentId)?.version ?? 0).toBeGreaterThan(2);
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

test('loads all questions until the saved question and keeps it in view', async ({ page, kvStore }) => {
  const questionId = await lastQuestionId(page);
  kvStore.set(navigationDocumentId, {
    version: 9,
    createdAt: timestamp,
    json: remoteNavigation(
      questionsRoute,
      {
        questionId,
        questionOrigin: 'all',
        questionLayout: 'all',
      },
      {
        readingPosition: {
          contentVersion: 'conteudos/concurso-exemplo/assunto-exemplo',
          sectionId: 'inicio',
          blockId: null,
          blockIndex: 0,
          relativeOffset: 0,
          textQuote: '',
          progress: 0,
        },
      },
    ),
  });

  await page.goto('/');
  await expect(page).toHaveURL(new RegExp(`${questionsRoute.replaceAll('/', '\\/')}$`), { timeout: 30_000 });
  await expect(page.getByLabel('Todas', { exact: true })).toBeChecked();
  const target = page.locator(`[data-question-id="${questionId}"]`);
  await expect(target).toBeVisible();
  await expect(target).toBeInViewport();
  await expect(page.getByRole('button', { name: 'Carregar mais questões' })).toBeHidden();
});

test('offers a newer remote point without forcing navigation during an active session', async ({ page, kvStore }) => {
  await page.goto(readingDestination);
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

  await page.waitForTimeout(13_000);
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  const resume = page.getByRole('button', { name: 'Retomar ponto mais recente' });
  await expect
    .poll(() => page.locator('[data-navigation-offer]').evaluate((element: HTMLElement) => !element.hidden), {
      timeout: 30_000,
    })
    .toBe(true);
  await expect(resume).toBeHidden();
  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await expect(resume).toBeVisible({ timeout: 30_000 });
  await expect(page).toHaveURL(new RegExp(`${readingRoute.replaceAll('/', '\\/')}$`));

  await resume.click();
  await expect(page).toHaveURL(/\/simulados\/$/);
});

test('publishes the local point when the user chooses to continue here', async ({ page, kvStore }) => {
  await page.goto(readingDestination);
  await page.evaluate(() =>
    window.scrollTo(0, Math.max(500, window.document.documentElement.scrollHeight * 0.7)),
  );
  await expect.poll(
    () => {
      const document = kvStore.get(navigationDocumentId)?.json as {
        readingPosition?: { progress?: number } | null;
      } | undefined;
      return document?.readingPosition?.progress ?? 0;
    },
    { timeout: 30_000 },
  ).toBeGreaterThan(0.25);

  const remoteVersion = (kvStore.get(navigationDocumentId)?.version ?? 0) + 1;
  kvStore.set(navigationDocumentId, {
    version: remoteVersion,
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

  await page.waitForTimeout(13_000);
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  const stay = page.getByRole('button', { name: 'Continuar aqui' });
  await expect
    .poll(() => page.locator('[data-navigation-offer]').evaluate((element: HTMLElement) => !element.hidden), {
      timeout: 30_000,
    })
    .toBe(true);
  await expect(stay).toBeHidden();
  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await expect(stay).toBeVisible({ timeout: 30_000 });
  await stay.click();

  await expect.poll(
    () => (kvStore.get(navigationDocumentId)?.json as { route?: string } | undefined)?.route,
    { timeout: 30_000 },
  ).toBe(readingRoute);
  expect(kvStore.get(navigationDocumentId)?.version ?? 0).toBeGreaterThan(remoteVersion);
});
