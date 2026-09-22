import { expect, test } from './fixtures';
import type { Page } from '@playwright/test';

const alias = 'navegacao-2026-teste';
const contestStorageId = 'exemplo';
const subjectStorageId = 'fundamentos';
const navigationShardId = `concursos--${alias}--navegacao--${contestStorageId}`;
const readingRoute = '/concursos/concurso-exemplo/assunto-exemplo/';
const readingDestination = `${readingRoute}#focus`;
const legacyReadingRoute = `${readingRoute}leitura/`;
const questionsRoute = '/concursos/concurso-exemplo/assunto-exemplo/questoes/';
const timestamp = '2026-07-25T00:00:00.000Z';

function futureTimestamp(): string {
  return new Date(Date.now() + 3_600_000).toISOString();
}

async function revealReadingActions(page: Page): Promise<void> {
  await page.evaluate(() => new Promise<void>((resolve) => {
    window.scrollBy(0, -40);
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  }));
  await expect(page.locator('[data-subject-action-bar]')).toHaveAttribute(
    'data-subject-action-visibility',
    'visible',
  );
}

async function localReadingProgress(page: Page): Promise<number | null> {
  return page.evaluate(
    (options) =>
      new Promise<number | null>((resolve, reject) => {
        const request = indexedDB.open('concursos-navigation', 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          if (!database.objectStoreNames.contains('navigationContests')) {
            database.close();
            resolve(null);
            return;
          }
          const get = database
            .transaction('navigationContests')
            .objectStore('navigationContests')
            .get(`${options.profileId}::${options.contestStorageId}`);
          get.onerror = () => reject(get.error);
          get.onsuccess = () => {
            const points = get.result?.current?.points as
              | Record<string, { readingPosition?: { progress?: number } | null }>
              | undefined;
            resolve(points?.[options.subjectStorageId]?.readingPosition?.progress ?? null);
            database.close();
          };
        };
      }),
    { profileId: alias, contestStorageId, subjectStorageId },
  );
}

async function localNavigationState(page: Page): Promise<{
  outboxState: string | null;
  remoteVersion: number | null;
}> {
  return page.evaluate(
    (options) =>
      new Promise((resolve, reject) => {
        const request = indexedDB.open('concursos-navigation', 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          if (!database.objectStoreNames.contains('navigationContests')) {
            database.close();
            resolve({ outboxState: null, remoteVersion: null });
            return;
          }
          const get = database
            .transaction('navigationContests')
            .objectStore('navigationContests')
            .get(`${options.profileId}::${options.contestStorageId}`);
          get.onerror = () => reject(get.error);
          get.onsuccess = () => {
            resolve({
              outboxState: get.result?.outboxState ?? null,
              remoteVersion: get.result?.remoteVersion ?? null,
            });
            database.close();
          };
        };
      }),
    { profileId: alias, contestStorageId },
  );
}

function remotePoint(
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
      contestStorageId,
      groupId: 'grupo-exemplo',
      subjectStorageId,
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

function remoteShard(
  points: Record<string, ReturnType<typeof remotePoint>> = {},
  overrides: Record<string, unknown> = {},
) {
  return {
    schemaVersion: 2,
    contestStorageId,
    updatedAt: timestamp,
    cursor: null,
    points,
    cleared: {},
    ...overrides,
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
    if (route.request().method() === 'PUT' && route.request().url().endsWith(navigationShardId)) {
      const authorization = route.request().headers()['authorization'];
      if (authorization) authorizationHeaders.push(authorization);
    }
    await route.fallback();
  });

  await page.setViewportSize({ width: 390, height: 720 });
  await page.goto(readingDestination);
  await page.evaluate(() => window.scrollTo(0, Math.max(300, window.document.documentElement.scrollHeight * 0.45)));

  await expect
    .poll(
      () =>
        (
          kvStore.get(navigationShardId)?.json as
            | { points?: Record<string, { route?: string; context?: { activeTab?: string; readingMode?: boolean }; readingPosition?: { blockIndex?: number; relativeOffset?: number; progress?: number } | null }> }
            | undefined
        )?.points?.[subjectStorageId],
      { timeout: 30_000 },
    )
    .toBeTruthy();
  const savedPoint = (
    kvStore.get(navigationShardId)?.json as {
      points: Record<string, {
        route: string;
        context: { activeTab: string; readingMode: boolean };
        readingPosition: { blockIndex: number; relativeOffset: number; textQuote: string; progress: number } | null;
      }>;
    }
  ).points[subjectStorageId];
  expect(savedPoint.route).toBe(readingRoute);
  expect(savedPoint.context).toMatchObject({ activeTab: 'content', readingMode: true });
  expect(savedPoint.readingPosition).not.toBeNull();
  expect(savedPoint.readingPosition?.blockIndex).toBeGreaterThanOrEqual(0);
  expect(savedPoint.readingPosition?.relativeOffset).toBeGreaterThanOrEqual(0);
  expect(savedPoint.readingPosition?.progress).toBeGreaterThanOrEqual(0);
  expect(authorizationHeaders).toEqual([]);
});

test('preserves the reading point after going to the top and captures later scrolling', async ({
  page,
  kvStore,
}) => {
  await page.setViewportSize({ width: 390, height: 720 });
  await page.goto(readingRoute);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.45));
  await expect
    .poll(
      () =>
        (kvStore.get(navigationShardId)?.json as
          | { points?: Record<string, { readingPosition?: { progress?: number } | null }> }
          | undefined)?.points?.[subjectStorageId]?.readingPosition?.progress ?? 0,
      { timeout: 30_000 },
    )
    .toBeGreaterThan(0.1);

  await revealReadingActions(page);
  await expect
    .poll(() => localNavigationState(page), { timeout: 30_000 })
    .toMatchObject({ outboxState: 'clean' });
  const before = kvStore.get(navigationShardId)!;
  expect((await localNavigationState(page)).remoteVersion).toBe(before.version);
  const beforeProgress = (
    before.json as { points: Record<string, { readingPosition: { progress: number } }> }
  ).points[subjectStorageId].readingPosition.progress;
  expect(beforeProgress).toBeGreaterThan(0.1);

  await page.getByRole('link', { name: 'Voltar ao topo' }).click();
  await page.evaluate(() => window.dispatchEvent(new Event('pagehide')));
  await expect(page).toHaveURL(/#study-top$/);
  await expect(page.locator('#study-top')).toBeFocused();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(100);
  await page.waitForTimeout(1_200);

  expect(kvStore.get(navigationShardId)?.version).toBe(before.version);
  expect(await localReadingProgress(page)).toBeCloseTo(beforeProgress, 5);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.75));
  await expect
    .poll(() => kvStore.get(navigationShardId)?.version ?? 0, { timeout: 30_000 })
    .toBeGreaterThan(before.version);
  await expect
    .poll(
      () =>
        (kvStore.get(navigationShardId)?.json as
          | { points?: Record<string, { readingPosition?: { progress?: number } | null }> }
          | undefined)?.points?.[subjectStorageId]?.readingPosition?.progress ?? 0,
      { timeout: 30_000 },
    )
    .toBeGreaterThan(beforeProgress);
});

test('flushes pre-ready navigation before a PWA-controlled reload', async ({ page }) => {
  await page.addInitScript(() => {
    const loads = Number(sessionStorage.getItem('test:navigation-loads') ?? '0');
    sessionStorage.setItem('test:navigation-loads', String(loads + 1));
  });
  let releaseBootstrap: () => void = () => undefined;
  const bootstrapReleased = new Promise<void>((resolve) => {
    releaseBootstrap = resolve;
  });
  let markBootstrapStarted: () => void = () => undefined;
  const bootstrapStarted = new Promise<void>((resolve) => {
    markBootstrapStarted = resolve;
  });
  await page.route('https://kv.helio.me/**', async (route) => {
    if (
      route.request().method() === 'GET' &&
      route.request().url().replace(/\/version$/, '').endsWith(navigationShardId)
    ) {
      markBootstrapStarted();
      await bootstrapReleased;
    }
    await route.fallback();
  });

  await page.setViewportSize({ width: 390, height: 720 });
  await page.goto(readingDestination);
  await bootstrapStarted;
  await expect(page.locator('[data-application-status]')).toHaveAttribute('data-source', 'pwa');
  await page.evaluate(() => {
    window.scrollTo(0, Math.max(300, document.documentElement.scrollHeight * 0.55));
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new CustomEvent('concursos:pwa-retry'));
  });

  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
  await page.waitForTimeout(150);
  expect(await page.evaluate(() => sessionStorage.getItem('test:navigation-loads'))).toBe('1');
  const reload = page.waitForEvent('load');
  releaseBootstrap();
  await reload;
  await expect
    .poll(() => page.evaluate(() => Number(sessionStorage.getItem('test:navigation-loads'))), {
      timeout: 15_000,
    })
    .toBe(2);

  await expect.poll(() => localReadingProgress(page), { timeout: 15_000 }).toBeGreaterThan(0.1);
  const progress = await localReadingProgress(page);
  expect(progress).not.toBeNull();
  expect(progress ?? 0).toBeGreaterThan(0.1);
});

test('captures scrolling after a semantic focus change before navigation is ready', async ({
  page,
  kvStore,
}) => {
  kvStore.set(navigationShardId, {
    version: 11,
    createdAt: timestamp,
    json: remoteShard({ [subjectStorageId]: remotePoint(readingRoute, { readingMode: true }) }),
  });
  let releaseBootstrap: () => void = () => undefined;
  const bootstrapReleased = new Promise<void>((resolve) => {
    releaseBootstrap = resolve;
  });
  let markBootstrapStarted: () => void = () => undefined;
  const bootstrapStarted = new Promise<void>((resolve) => {
    markBootstrapStarted = resolve;
  });
  await page.route('https://kv.helio.me/**', async (route) => {
    if (
      route.request().method() === 'GET' &&
      route.request().url().replace(/\/version$/, '').endsWith(navigationShardId)
    ) {
      markBootstrapStarted();
      await bootstrapReleased;
    }
    await route.fallback();
  });

  await page.setViewportSize({ width: 390, height: 720 });
  await page.goto(readingDestination);
  await bootstrapStarted;
  await expect(page.locator('[data-application-status]')).toHaveAttribute('data-source', 'pwa');
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('concursos:reading-focus-change', { detail: { active: true } }));
    window.scrollTo(0, Math.max(500, document.documentElement.scrollHeight * 0.75));
    window.dispatchEvent(new Event('scroll'));
  });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);

  releaseBootstrap();
  await expect.poll(() => localReadingProgress(page), { timeout: 15_000 }).toBeGreaterThan(0.55);
});

test('keeps the root route and resumes a shard reading point explicitly', async ({ page, kvStore }) => {
  kvStore.set(navigationShardId, {
    version: 6,
    createdAt: timestamp,
    json: remoteShard({ [subjectStorageId]: remotePoint(readingRoute, { readingMode: true }) }),
  });

  await page.goto('/');
  await expect(page).toHaveURL(/127\.0\.0\.1:4321\/$/);
  const resume = page.getByRole('button', { name: 'Retomar ponto mais recente' });
  await expect(resume).toBeVisible({ timeout: 30_000 });
  await resume.click();
  await expect(page).toHaveURL(new RegExp('/concursos/concurso-exemplo/assunto-exemplo/#focus$'), {
    timeout: 30_000,
  });
  await expect(page.getByRole('dialog', { name: 'Modo de leitura sem distrações' })).toBeVisible();
});

test('keeps the entry route reachable until the user chooses how to resume', async ({ page, kvStore }) => {
  kvStore.set(navigationShardId, {
    version: 4,
    createdAt: timestamp,
    json: remoteShard({ [subjectStorageId]: remotePoint(readingRoute, { readingMode: true }) }),
  });

  await page.goto('/');
  await expect(page).toHaveURL(/127\.0\.0\.1:4321\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retomar ponto mais recente' })).toBeVisible({
    timeout: 30_000,
  });
  await page.getByRole('button', { name: 'Continuar aqui' }).click();
  await expect(page).toHaveURL(/127\.0\.0\.1:4321\/$/);
  await page.waitForTimeout(2_000);
  // Continuar aqui não publica a raiz por cima do ponto: o shard segue intacto.
  expect(
    (kvStore.get(navigationShardId)?.json as { points?: Record<string, { route?: string }> } | undefined)
      ?.points?.[subjectStorageId]?.route,
  ).toBe(readingRoute);
});

test('reoffers the initial resume after a reload before the user chooses', async ({ page, kvStore }) => {
  kvStore.set(navigationShardId, {
    version: 4,
    createdAt: timestamp,
    json: remoteShard({ [subjectStorageId]: remotePoint(readingRoute, { readingMode: true }) }),
  });

  await page.goto('/');
  const resume = page.getByRole('button', { name: 'Retomar ponto mais recente' });
  await expect(resume).toBeVisible({ timeout: 30_000 });
  expect(
    await page.evaluate(
      (profileId) => sessionStorage.getItem(`concursos:navigation-restored:${profileId}`),
      alias,
    ),
  ).toBeNull();
  await page.reload();
  await expect(page).toHaveURL(/127\.0\.0\.1:4321\/$/);
  expect(
    await page.evaluate(
      (profileId) => sessionStorage.getItem(`concursos:navigation-restored:${profileId}`),
      alias,
    ),
  ).toBeNull();
  await expect(resume).toBeVisible({ timeout: 30_000 });
  expect(
    (kvStore.get(navigationShardId)?.json as { points?: Record<string, { route?: string }> } | undefined)
      ?.points?.[subjectStorageId]?.route,
  ).toBe(readingRoute);
});

test('keeps the initial offer after clicking a same-route header link', async ({ page, kvStore }) => {
  kvStore.set(navigationShardId, {
    version: 4,
    createdAt: timestamp,
    json: remoteShard({ [subjectStorageId]: remotePoint(readingRoute, { readingMode: true }) }),
  });

  await page.goto('/');
  const resume = page.getByRole('button', { name: 'Retomar ponto mais recente' });
  await expect(resume).toBeVisible({ timeout: 30_000 });
  await page.getByRole('link', { name: 'Catálogo' }).click();
  await expect(page).toHaveURL(/127\.0\.0\.1:4321\/$/);
  await expect(resume).toBeVisible({ timeout: 30_000 });
  expect(
    await page.evaluate(
      (profileId) => sessionStorage.getItem(`concursos:navigation-restored:${profileId}`),
      alias,
    ),
  ).toBeNull();
  expect(
    (kvStore.get(navigationShardId)?.json as { points?: Record<string, { route?: string }> } | undefined)
      ?.points?.[subjectStorageId]?.route,
  ).toBe(readingRoute);
});

test('publishes a direct #focus deep link over an existing normal record', async ({ page, kvStore }) => {
  test.setTimeout(60_000);
  kvStore.set(navigationShardId, {
    version: 2,
    createdAt: timestamp,
    json: remoteShard({
      [subjectStorageId]: remotePoint(
        readingRoute,
        { activeTab: 'content', readingMode: false },
        {
          readingPosition: {
            contentVersion: 'conteudos/concurso-exemplo/assunto-exemplo',
            sectionId: 'inicio',
            blockId: null,
            blockIndex: 2,
            relativeOffset: 0.4,
            textQuote: '',
            progress: 0.45,
          },
        },
      ),
    }),
  });

  await page.goto(readingDestination);
  await expect
    .poll(
      () =>
        (kvStore.get(navigationShardId)?.json as { points?: Record<string, { context?: { readingMode?: boolean } }> } | undefined)
          ?.points?.[subjectStorageId]?.context?.readingMode,
      { timeout: 50_000 },
    )
    .toBe(true);
  expect(kvStore.get(navigationShardId)?.version ?? 0).toBeGreaterThan(2);
});

test('restores route and questionnaire context on another viewport', async ({ page, kvStore }) => {
  kvStore.set(navigationShardId, {
    version: 7,
    createdAt: timestamp,
    json: remoteShard({}, { cursor: remotePoint(questionsRoute) }),
  });

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await expect(page).toHaveURL(/127\.0\.0\.1:4321\/$/);
  await page.getByRole('button', { name: 'Retomar ponto mais recente' }).click();
  await expect(page).toHaveURL(new RegExp(`${questionsRoute.replaceAll('/', '\\/')}$`), { timeout: 30_000 });
  await expect(page.getByLabel('Blocos de dez')).toBeChecked();
  await expect(page.getByLabel('Concursos anteriores')).toBeChecked();
});

test('loads all questions until the saved question and keeps it in view', async ({ page, kvStore }) => {
  const questionId = await lastQuestionId(page);
  const cursor = remotePoint(
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
  );
  kvStore.set(navigationShardId, {
    version: 9,
    createdAt: timestamp,
    json: remoteShard({}, { cursor }),
  });

  await page.goto('/');
  await expect(page).toHaveURL(/127\.0\.0\.1:4321\/$/);
  await page.getByRole('button', { name: 'Retomar ponto mais recente' }).click();
  await expect(page).toHaveURL(new RegExp(`${questionsRoute.replaceAll('/', '\\/')}$`), { timeout: 30_000 });
  await expect(page.getByLabel('Todas', { exact: true })).toBeChecked();
  const target = page.locator(`[data-question-id="${questionId}"]`);
  await expect(target).toBeVisible();
  await expect(target).toBeInViewport();
  await expect(page.getByRole('button', { name: 'Carregar mais questões' })).toBeHidden();
});

test('offers a newer remote point without forcing navigation during an active session', async ({ page, kvStore }) => {
  test.setTimeout(60_000);
  await page.goto(readingDestination);
  await expect.poll(() => kvStore.get(navigationShardId)?.version, { timeout: 30_000 }).toBeTruthy();
  const currentVersion = kvStore.get(navigationShardId)?.version ?? 0;

  kvStore.set(navigationShardId, {
    version: currentVersion + 1,
    createdAt: timestamp,
    json: remoteShard(
      {},
      { cursor: { ...remotePoint(questionsRoute), updatedAt: futureTimestamp() } },
    ),
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
  await revealReadingActions(page);
  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await expect(resume).toBeVisible({ timeout: 30_000 });
  await expect(page).toHaveURL(new RegExp(`${readingRoute.replaceAll('/', '\\/')}$`));

  await resume.click();
  await expect(page).toHaveURL(/\/questoes\/$/);
});

test('publishes the local point when the user chooses to continue here', async ({ page, kvStore }) => {
  test.setTimeout(60_000);
  await page.goto(readingDestination);
  await page.evaluate(() =>
    window.scrollTo(0, Math.max(500, window.document.documentElement.scrollHeight * 0.7)),
  );
  await expect.poll(
    () => {
      const document = kvStore.get(navigationShardId)?.json as {
        points?: Record<string, { readingPosition?: { progress?: number } | null }>;
      } | undefined;
      return document?.points?.[subjectStorageId]?.readingPosition?.progress ?? 0;
    },
    { timeout: 30_000 },
  ).toBeGreaterThan(0.25);

  const remoteVersion = (kvStore.get(navigationShardId)?.version ?? 0) + 1;
  kvStore.set(navigationShardId, {
    version: remoteVersion,
    createdAt: timestamp,
    json: remoteShard(
      {},
      { cursor: { ...remotePoint(questionsRoute), updatedAt: futureTimestamp() } },
    ),
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
  await revealReadingActions(page);
  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await expect(stay).toBeVisible({ timeout: 30_000 });
  await stay.click();

  await expect.poll(
    () => (kvStore.get(navigationShardId)?.json as { points?: Record<string, { route?: string }> } | undefined)?.points?.[subjectStorageId]?.route,
    { timeout: 30_000 },
  ).toBe(readingRoute);
  expect(kvStore.get(navigationShardId)?.version ?? 0).toBeGreaterThan(remoteVersion);
});

test('resumes a second subject independently in the same contest', async ({ page, kvStore }) => {
  kvStore.set(navigationShardId, {
    version: 3,
    createdAt: timestamp,
    json: remoteShard({
      [subjectStorageId]: remotePoint(readingRoute, { readingMode: true }),
      'outro-assunto': remotePoint('/concursos/concurso-exemplo/outro-assunto/', {
        subjectStorageId: 'outro-assunto',
        readingMode: true,
      }),
    }),
  });

  await page.goto('/concursos/concurso-exemplo/');
  await expect(page.getByRole('button', { name: 'Resumir leitura' })).toBeVisible({ timeout: 30_000 });
  const others = page.locator('[data-resume-reading-list] a');
  await expect(others).toHaveCount(1);
});
