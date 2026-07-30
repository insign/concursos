import { expect, test } from './fixtures';
import type { Page } from '@playwright/test';

const alias = 'navegacao-offline-teste';
const readingRoute = '/concursos/concurso-exemplo/assunto-exemplo/leitura/';
const contentRoute = '/concursos/concurso-exemplo/assunto-exemplo/';
const cheatSheetRoute = '/concursos/concurso-exemplo/assunto-exemplo/cheat-sheet/';
const timestamp = '2026-07-25T00:00:00.000Z';

test.use({ serviceWorkers: 'allow' });

async function waitForServiceWorker(page: Page): Promise<void> {
  await page.evaluate(() => navigator.serviceWorker.ready.then(() => undefined));
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
}

async function seedNavigationRecord(page: Page): Promise<void> {
  await page.evaluate(
    ({ profileId, route, updatedAt }) =>
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
          const document = {
            schemaVersion: 1,
            updatedAt,
            route,
            context: {
              contestStorageId: 'exemplo',
              groupId: 'grupo-exemplo',
              subjectStorageId: 'fundamentos',
              questionId: null,
              activeTab: 'reading',
              readingMode: true,
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
              progress: 0.65,
            },
          };
          transaction.objectStore('navigation').put({
            profileId,
            current: document,
            base: document,
            remoteVersion: 7,
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
    { profileId: alias, route: readingRoute, updatedAt: timestamp },
  );
}

test('restores once and preserves explicit navigation after an offline restart', async ({ page, context }) => {
  await page.goto('/');
  await waitForServiceWorker(page);
  await page.goto(contentRoute);
  await page.goto(cheatSheetRoute);
  await page.goto(readingRoute);
  await seedNavigationRecord(page);
  await page.evaluate((profileId) => localStorage.setItem('concursos:active-alias', profileId), alias);

  await context.addInitScript(() => {
    const trackedWindow = window as typeof window & { __navigationScrollCalls: number };
    const originalScrollTo = window.scrollTo;
    trackedWindow.__navigationScrollCalls = 0;
    window.scrollTo = ((...args: unknown[]) => {
      trackedWindow.__navigationScrollCalls += 1;
      Reflect.apply(originalScrollTo, window, args);
    }) as typeof window.scrollTo;
  });
  await page.close();
  await context.setOffline(true);

  const resumedPage = await context.newPage();
  const resumedResponse = await resumedPage.goto('/');
  await expect(resumedPage).toHaveURL(new RegExp(`${readingRoute.replaceAll('/', '\\/')}$`));
  await expect.poll(() => resumedPage.evaluate(() => window.scrollY)).toBeGreaterThan(100);
  await expect.poll(() =>
    resumedPage.evaluate(
      () => (window as typeof window & { __navigationScrollCalls: number }).__navigationScrollCalls,
    ),
  ).toBeGreaterThan(0);
  expect(resumedResponse?.headers()['x-robots-tag']).toBe('noindex, nofollow');
  expect(await resumedPage.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);

  await resumedPage.reload();
  await resumedPage.waitForTimeout(2_000);
  expect(
    await resumedPage.evaluate(
      () => (window as typeof window & { __navigationScrollCalls: number }).__navigationScrollCalls,
    ),
  ).toBe(0);
  await resumedPage.close();

  const explicitPage = await context.newPage();
  await explicitPage.goto(contentRoute);
  await expect(explicitPage).toHaveURL(new RegExp(`${contentRoute.replaceAll('/', '\\/')}$`));
  await expect(explicitPage.getByRole('heading', { name: 'Fundamentos de administração pública', level: 1 })).toBeVisible();

  await explicitPage
    .getByRole('navigation', { name: 'Modos de estudo do assunto' })
    .getByRole('link', { name: 'Cheat sheet' })
    .click();
  await expect(explicitPage).toHaveURL(new RegExp(`${cheatSheetRoute.replaceAll('/', '\\/')}$`));
  await explicitPage.reload();
  await expect(explicitPage).toHaveURL(new RegExp(`${cheatSheetRoute.replaceAll('/', '\\/')}$`));

  await explicitPage.goBack();
  await expect(explicitPage).toHaveURL(new RegExp(`${contentRoute.replaceAll('/', '\\/')}$`));
  await explicitPage.goForward();
  await expect(explicitPage).toHaveURL(new RegExp(`${cheatSheetRoute.replaceAll('/', '\\/')}$`));

  await context.setOffline(false);
  await explicitPage.evaluate(() => {
    window.dispatchEvent(new Event('online'));
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(explicitPage).toHaveURL(new RegExp(`${cheatSheetRoute.replaceAll('/', '\\/')}$`));
});
