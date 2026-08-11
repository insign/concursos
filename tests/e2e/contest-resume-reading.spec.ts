import { expect, test } from './fixtures';

const alias = 'retomar-concurso-teste';
const contestRoute = '/concursos/concurso-exemplo/';
const contentRoute = '/concursos/concurso-exemplo/assunto-exemplo/';
const navigationDocumentId = `concursos--${alias}--navegacao`;
const timestamp = '2026-07-25T00:00:00.000Z';

function readingDocument(progress = 0.65) {
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

async function seedLocalNavigation(
  page: import('@playwright/test').Page,
  document: ReturnType<typeof readingDocument>,
): Promise<void> {
  await page.evaluate(
    ({ profileId, current, updatedAt }) =>
      new Promise<void>((resolve, reject) => {
        const request = indexedDB.open('concursos-navigation', 1);
        request.onupgradeneeded = () => {
          if (!request.result.objectStoreNames.contains('navigation')) {
            request.result.createObjectStore('navigation', { keyPath: 'profileId' });
          }
        };
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          const transaction = database.transaction('navigation', 'readwrite');
          transaction.objectStore('navigation').put({
            profileId,
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
    { profileId: alias, current: document, updatedAt: timestamp },
  );
}

test('keeps resume reading hidden without an active alias', async ({ page }) => {
  await page.goto(contestRoute);

  await expect(page.locator('[data-contest-resume-reading]')).toBeHidden();
  await expect(page.locator('[data-resume-reading]')).toBeDisabled();
});

test('refreshes from IndexedDB when an alias changes without reloading', async ({ page }) => {
  await page.goto(contestRoute);
  await seedLocalNavigation(page, readingDocument());
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

test('waits for remote bootstrap before exposing a stale local candidate', async ({
  page,
  kvStore,
}) => {
  await page.goto(contestRoute);
  await seedLocalNavigation(page, readingDocument(0.15));
  await page.evaluate((profileId) => {
    localStorage.setItem('concursos:active-alias', profileId);
  }, alias);
  kvStore.set(navigationDocumentId, {
    version: 2,
    createdAt: timestamp,
    json: readingDocument(0.75),
  });

  let releaseRemote!: () => void;
  const remoteGate = new Promise<void>((resolve) => {
    releaseRemote = resolve;
  });
  await page.route('https://kv.helio.me/**', async (route) => {
    if (
      route.request().method() === 'GET' &&
      route.request().url().endsWith(navigationDocumentId)
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
  await expect.poll(() =>
    page.evaluate(
      (profileId) =>
        new Promise<number | null>((resolve, reject) => {
          const request = indexedDB.open('concursos-navigation', 1);
          request.onerror = () => reject(request.error);
          request.onsuccess = () => {
            const database = request.result;
            const get = database.transaction('navigation').objectStore('navigation').get(profileId);
            get.onerror = () => reject(get.error);
            get.onsuccess = () => {
              resolve(get.result?.current?.readingPosition?.progress ?? null);
              database.close();
            };
          };
        }),
      alias,
    ),
  ).toBe(0.75);
});

test('resumes the remote reading position in focus mode from the contest page', async ({
  page,
  kvStore,
}) => {
  kvStore.set(navigationDocumentId, {
    version: 4,
    createdAt: timestamp,
    json: readingDocument(),
  });
  await page.addInitScript((profileId) => {
    localStorage.setItem('concursos:active-alias', profileId);
  }, alias);

  await page.goto(contestRoute);
  const resume = page.getByRole('button', { name: 'Resumir leitura' });
  await expect(resume).toBeVisible({ timeout: 30_000 });
  await expect(resume).toBeEnabled();
  await expect.poll(() =>
    page.evaluate(
      (profileId) =>
        new Promise<string | null>((resolve, reject) => {
          const request = indexedDB.open('concursos-navigation', 1);
          request.onerror = () => reject(request.error);
          request.onsuccess = () => {
            const database = request.result;
            const get = database.transaction('navigation').objectStore('navigation').get(profileId);
            get.onerror = () => reject(get.error);
            get.onsuccess = () => {
              resolve(get.result?.current?.route ?? null);
              database.close();
            };
          };
        }),
      alias,
    ),
  ).toBe(contentRoute);

  await resume.click();
  await expect(page).toHaveURL(new RegExp(`${contentRoute.replaceAll('/', '\\/')}#focus$`));
  await expect(page.getByRole('dialog', { name: 'Modo de leitura sem distrações' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
  expect(
    await page.evaluate((profileId) =>
      sessionStorage.getItem(`concursos:navigation-restored:${profileId}:pending-route`), alias),
  ).toBeNull();
});
