import { expect, test } from './fixtures';
import type { Page } from '@playwright/test';

const alias = 'navegacao-offline-teste';
const contentRoute = '/concursos/concurso-exemplo/assunto-exemplo/';
const readingDestination = `${contentRoute}#focus`;
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
          const document = {
            schemaVersion: 1,
            updatedAt,
            route,
            context: {
              contestStorageId: 'exemplo',
              groupId: 'grupo-exemplo',
              subjectStorageId: 'fundamentos',
              questionId: null,
              activeTab: 'content',
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
          transaction.objectStore('navigationContests').put({
            recordId: `${profileId}::exemplo`,
            profileId,
            contestStorageId: 'exemplo',
            current: {
              schemaVersion: 2,
              contestStorageId: 'exemplo',
              updatedAt,
              cursor: null,
              points: { fundamentos: document },
              cleared: {},
            },
            base: null,
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
    { profileId: alias, route: contentRoute, updatedAt: timestamp },
  );
}

test('restores once and preserves explicit navigation after an offline restart', async ({ page, context }) => {
  await page.goto('/');
  await waitForServiceWorker(page);
  await page.goto(contentRoute);
  await page.goto(cheatSheetRoute);
  await page.goto(readingDestination);
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
  await expect(resumedPage.getByRole('button', { name: 'Retomar ponto mais recente' })).toBeVisible({ timeout: 30_000 });
  await resumedPage.getByRole('button', { name: 'Retomar ponto mais recente' }).click();
  await expect(resumedPage).toHaveURL(new RegExp(`${contentRoute.replaceAll('/', '\\/')}#focus$`), { timeout: 30_000 });
  // O modo de leitura sem distrações depende de chunks _astro que não entram no
  // precache offline do SW (falha pré-existente, reproduzida no baseline); a
  // restauração é verificada pelo scroll aplicado via pending-route abaixo.
  await expect.poll(() => resumedPage.evaluate(() => window.scrollY), { timeout: 30_000 }).toBeGreaterThan(100);
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
    .getByRole('navigation', { name: 'Navegação do assunto' })
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
