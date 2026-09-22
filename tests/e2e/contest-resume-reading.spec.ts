import { expect, test } from './fixtures';

const alias = 'retomar-concurso-teste';
const contestRoute = '/concursos/concurso-exemplo/';
const contentRoute = '/concursos/concurso-exemplo/assunto-exemplo/';
const contestStorageId = 'exemplo';
const navigationShardId = `concursos--${alias}--navegacao--${contestStorageId}`;
const timestamp = '2026-07-25T00:00:00.000Z';

function readingPoint(progress = 0.65) {
  return {
    schemaVersion: 1,
    updatedAt: timestamp,
    route: contentRoute,
    context: {
      contestStorageId: 'exemplo',
      groupId: 'grupo-exemplo',
      subjectStorageId: 'fundamentos',
      questionId: null,
      activeTab: 'content',
      readingMode: false,
      questionOrigin: null,
      questionLayout: null,
      shuffleQuestions: null,
    },
    readingPosition: {
      contentVersion: 'conteudos/concurso-exemplo/assunto-exemplo',
      sectionId: null,
      blockId: null,
      blockIndex: 10_000,
      relativeOffset: 0,
      textQuote: '',
      progress,
    },
  };
}

function readingShard(progress = 0.65) {
  return {
    schemaVersion: 2,
    contestStorageId: 'exemplo',
    updatedAt: timestamp,
    cursor: null,
    points: { fundamentos: readingPoint(progress) },
    cleared: {},
  };
}

async function seedLocalNavigation(
  page: import('@playwright/test').Page,
  shard: ReturnType<typeof readingShard>,
): Promise<void> {
  await page.evaluate(
    ({ profileId, contestStorageId, current, updatedAt }) =>
      new Promise<void>((resolve, reject) => {
        const request = indexedDB.open('concursos-navigation', 2);
        request.onupgradeneeded = () => {
          if (!request.result.objectStoreNames.contains('navigationContests')) {
            const store = request.result.createObjectStore('navigationContests', {
              keyPath: 'recordId',
            });
            store.createIndex('by-profile', 'profileId', { unique: false });
          }
        };
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          const transaction = database.transaction('navigationContests', 'readwrite');
          transaction.objectStore('navigationContests').put({
            recordId: `${profileId}::${contestStorageId}`,
            profileId,
            contestStorageId,
            current,
            base: current,
            remoteVersion: 1,
            remoteCreatedAt: updatedAt,
            outboxState: 'clean',
            attempts: 0,
            nextAttemptAt: null,
            lastError: null,
            conflictWarning: null,
            rejectedRemoteVersion: null,
            rejectedRemoteCreatedAt: null,
            localRevision: 0,
            updatedAt: Date.parse(updatedAt),
          });
          transaction.oncomplete = () => {
            database.close();
            resolve();
          };
          transaction.onerror = () => reject(transaction.error);
          transaction.onabort = () => reject(transaction.error);
        };
      }),
    { profileId: alias, contestStorageId, current: shard, updatedAt: timestamp },
  );
}

async function localShardProgress(
  page: import('@playwright/test').Page,
): Promise<number | null> {
  return page.evaluate(
    ({ profileId, contestStorageId }) =>
      new Promise<number | null>((resolve, reject) => {
        const request = indexedDB.open('concursos-navigation', 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          const get = database
            .transaction('navigationContests')
            .objectStore('navigationContests')
            .get(`${profileId}::${contestStorageId}`);
          get.onerror = () => reject(get.error);
          get.onsuccess = () => {
            resolve(
              get.result?.current?.points?.fundamentos?.readingPosition?.progress ?? null,
            );
            database.close();
          };
        };
      }),
    { profileId: alias, contestStorageId },
  );
}

async function localShardRoute(page: import('@playwright/test').Page): Promise<string | null> {
  return page.evaluate(
    ({ profileId, contestStorageId }) =>
      new Promise<string | null>((resolve, reject) => {
        const request = indexedDB.open('concursos-navigation', 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          const get = database
            .transaction('navigationContests')
            .objectStore('navigationContests')
            .get(`${profileId}::${contestStorageId}`);
          get.onerror = () => reject(get.error);
          get.onsuccess = () => {
            resolve(get.result?.current?.points?.fundamentos?.route ?? null);
            database.close();
          };
        };
      }),
    { profileId: alias, contestStorageId },
  );
}

test('keeps resume reading hidden without an active alias', async ({ page }) => {
  await page.goto(contestRoute);

  await expect(page.locator('[data-contest-resume-reading]')).toBeHidden();
  await expect(page.locator('[data-resume-reading]')).toBeDisabled();
});

test('refreshes from IndexedDB when an alias changes without reloading', async ({ page }) => {
  await page.goto(contestRoute);
  await seedLocalNavigation(page, readingShard());
  await page.evaluate((profileId) => {
    localStorage.setItem('concursos:active-alias', profileId);
    window.dispatchEvent(
      new CustomEvent('concursos:profile-changed', {
        detail: { previous: null, current: profileId },
      }),
    );
  }, alias);

  await expect(page.getByRole('button', { name: 'Resumir leitura' })).toBeVisible();
});

test('highlights the in-progress subject check in the catalog listing', async ({ page }) => {
  await page.addInitScript((profileId) => {
    localStorage.setItem('concursos:active-alias', profileId);
  }, alias);
  await page.goto(contestRoute);
  await seedLocalNavigation(page, readingShard());
  await page.evaluate((profileId) => {
    window.dispatchEvent(
      new CustomEvent('concursos:navigation-updated', { detail: { profileId } }),
    );
  }, alias);

  const inProgress = page.locator(
    '[data-subject-studied-toggle][data-subject-id="exemplo--fundamentos"]',
  );
  await expect(inProgress).toHaveAttribute('data-progress', 'true');
});

test('waits for remote bootstrap before exposing a stale local candidate', async ({
  page,
  kvStore,
}) => {
  await page.goto(contestRoute);
  await seedLocalNavigation(page, readingShard(0.15));
  await page.evaluate((profileId) => {
    localStorage.setItem('concursos:active-alias', profileId);
  }, alias);
  kvStore.set(navigationShardId, {
    version: 2,
    createdAt: timestamp,
    json: readingShard(0.75),
  });

  let releaseRemote!: () => void;
  const remoteGate = new Promise<void>((resolve) => {
    releaseRemote = resolve;
  });
  await page.route('https://kv.helio.me/**', async (route) => {
    if (
      route.request().method() === 'GET' &&
      route.request().url().endsWith(navigationShardId)
    ) {
      await remoteGate;
    }
    await route.fallback();
  });

  await page.reload();
  await expect(page.locator('[data-contest-resume-reading]')).toBeHidden();
  await expect(page.locator('[data-resume-reading]')).toBeDisabled();
  await page.waitForTimeout(500);
  await expect(page.locator('[data-contest-resume-reading]')).toBeHidden();

  releaseRemote();
  await expect(page.getByRole('button', { name: 'Resumir leitura' })).toBeVisible({
    timeout: 30_000,
  });
  await expect.poll(() => localShardProgress(page), { timeout: 30_000 }).toBe(0.75);
});

test('resumes the remote reading position in focus mode from the contest page', async ({
  page,
  kvStore,
}) => {
  kvStore.set(navigationShardId, {
    version: 4,
    createdAt: timestamp,
    json: readingShard(),
  });
  await page.addInitScript((profileId) => {
    localStorage.setItem('concursos:active-alias', profileId);
  }, alias);

  await page.goto(contestRoute);
  const resume = page.getByRole('button', { name: 'Resumir leitura' });
  await expect(resume).toBeVisible({ timeout: 30_000 });
  await expect(resume).toBeEnabled();
  await expect.poll(() => localShardRoute(page), { timeout: 30_000 }).toBe(contentRoute);

  await resume.click();
  await expect(page).toHaveURL(new RegExp(`${contentRoute.replaceAll('/', '\\/')}#focus$`));
  await expect(page.getByRole('dialog', { name: 'Modo de leitura sem distrações' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
  expect(
    await page.evaluate((profileId) =>
      sessionStorage.getItem(`concursos:navigation-restored:${profileId}:pending-route`), alias),
  ).toBeNull();
});
