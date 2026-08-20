import { expect, test } from './fixtures';

const alias = 'estudo-2026-teste';
const contest = 'tce-ma-2026-analista-administracao';
const subjectSlug = 'leitura-interpretacao-tipos-generos';
const contentUrl = `/concursos/${contest}/${subjectSlug}/`;
const readingUrl = `/concursos/${contest}/${subjectSlug}/#focus`;
const contestUrl = `/concursos/${contest}/`;
const subjectId = 'tcema-2026-adm--leitura-tipos-generos';
const estudadosDocId = `concursos--${alias}--estudados`;
const navigationDocId = `concursos--${alias}--navegacao`;

async function installFullscreenMock(page: import('@playwright/test').Page): Promise<void> {
  await page.addInitScript(() => {
    interface FullscreenTestState {
      requests: number;
      exits: number;
      active: boolean;
    }
    const testWindow = window as typeof window & { __studiedFullscreenTest?: FullscreenTestState };
    const state: FullscreenTestState = { requests: 0, exits: 0, active: false };
    let fullscreenElement: Element | null = null;
    testWindow.__studiedFullscreenTest = state;

    const leave = () => {
      fullscreenElement = null;
      state.active = false;
      document.dispatchEvent(new Event('fullscreenchange'));
    };
    Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, value: true });
    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      get: () => fullscreenElement,
    });
    Object.defineProperty(Element.prototype, 'requestFullscreen', {
      configurable: true,
      value(this: Element) {
        state.requests += 1;
        fullscreenElement = this;
        state.active = true;
        document.dispatchEvent(new Event('fullscreenchange'));
        return Promise.resolve();
      },
    });
    Object.defineProperty(document, 'exitFullscreen', {
      configurable: true,
      value: () => {
        state.exits += 1;
        leave();
        return Promise.resolve();
      },
    });
  });
}

const fullscreenState = (page: import('@playwright/test').Page) => page.evaluate(() => {
  const state = (window as typeof window & {
    __studiedFullscreenTest?: { requests: number; exits: number; active: boolean };
  }).__studiedFullscreenTest;
  return state
    ? { requests: state.requests, exits: state.exits, active: state.active }
    : { requests: 0, exits: 0, active: false };
});

async function revealSubjectActions(page: import('@playwright/test').Page): Promise<void> {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        window.scrollBy(0, -40);
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
  await expect(page.locator('[data-subject-action-bar]')).toHaveAttribute(
    'data-subject-action-visibility',
    'visible',
  );
}

async function readLocalReadingPosition(page: import('@playwright/test').Page): Promise<unknown> {
  return page.evaluate(
    (profileId) =>
      new Promise<unknown>((resolve, reject) => {
        const request = indexedDB.open('concursos-navigation', 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          const get = database.transaction('navigation').objectStore('navigation').get(profileId);
          get.onerror = () => reject(get.error);
          get.onsuccess = () => {
            resolve(get.result?.current?.readingPosition ?? null);
            database.close();
          };
        };
      }),
    alias,
  );
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript((value) => {
    localStorage.setItem('concursos:active-alias', value);
    localStorage.setItem('concursos:catalog-groups', '{"version":1,"collapsed":[]}');
  }, alias);
});

test('marks a subject as studied and persists it across reloads', async ({ page }) => {
  await page.goto(contentUrl);
  const mark = page.getByRole('button', { name: 'Marcar como concluído' });
  await expect(mark).toBeEnabled();

  await mark.click();
  await expect(page.getByRole('button', { name: 'Desfazer conclusão' })).toBeVisible();

  await page.reload();
  await expect(page.getByRole('button', { name: 'Desfazer conclusão' })).toBeVisible();
});

test('shows and removes the studied indicator in the catalog listing', async ({ page }) => {
  await page.goto(contentUrl);
  await page.getByRole('button', { name: 'Marcar como concluído' }).click();
  await expect(page.getByRole('button', { name: 'Desfazer conclusão' })).toBeVisible();

  await page.goto(contestUrl);
  const indicator = page.locator(`[data-subject-studied][data-subject-id="${subjectId}"]`);
  await expect(indicator).toBeVisible();

  // Desmarca e o indicador some.
  await page.goto(contentUrl);
  await page.getByRole('button', { name: 'Desfazer conclusão' }).click();
  await expect(page.getByRole('button', { name: 'Marcar como concluído' })).toBeVisible();
  await page.goto(contestUrl);
  await expect(page.locator(`[data-subject-studied][data-subject-id="${subjectId}"]`)).toBeHidden();
});

test('adopts the studied document from the KV (cross-device restore)', async ({ page, kvStore }) => {
  // Documento remoto já marcado (como se viesse de outro dispositivo).
  kvStore.set(estudadosDocId, {
    version: 4,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: {
      schemaVersion: 1,
      studiedSubjectIds: [subjectId],
      updatedAt: '2026-07-13T12:00:00.000Z',
    },
  });

  await page.goto(contentUrl);
  // O coordenador adota o remoto no load e a UI reflete o estado estudado.
  await expect(page.getByRole('button', { name: 'Desfazer conclusão' })).toBeVisible();
  await page.goto(contestUrl);
  await expect(page.locator(`[data-subject-studied][data-subject-id="${subjectId}"]`)).toBeVisible();
});

test('restores the studied state in reading mode without the header coordinator', async ({ page, kvStore }) => {
  kvStore.set(estudadosDocId, {
    version: 4,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: {
      schemaVersion: 1,
      studiedSubjectIds: [subjectId],
      updatedAt: '2026-07-13T12:00:00.000Z',
    },
  });

  await page.goto(readingUrl);
  await expect(page.getByRole('button', { name: 'Desfazer conclusão' })).toBeVisible();
});

test('publishes the studied document to the KV without Authorization', async ({ page, kvStore }) => {
  const authHeaders: string[] = [];
  await page.route('https://kv.helio.me/**', async (route) => {
    const auth = route.request().headers()['authorization'];
    if (auth) authHeaders.push(auth);
    await route.fallback();
  });

  await page.goto(contentUrl);
  await page.getByRole('button', { name: 'Marcar como concluído' }).click();
  await expect(page.getByRole('button', { name: 'Desfazer conclusão' })).toBeVisible();

  await expect
    .poll(() => (kvStore.get(estudadosDocId)?.json as { studiedSubjectIds?: string[] })?.studiedSubjectIds, {
      timeout: 15_000,
    })
    .toContain(subjectId);
  expect(authHeaders).toEqual([]);
});

test('clears the reading point while studied and allows a new point after undo', async ({
  page,
  context,
  kvStore,
}) => {
  await page.goto(contentUrl);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.45));
  await expect
    .poll(
      () =>
        (kvStore.get(navigationDocId)?.json as { readingPosition?: unknown } | undefined)
          ?.readingPosition ?? null,
      { timeout: 30_000 },
    )
    .not.toBeNull();

  await revealSubjectActions(page);
  await page.getByRole('button', { name: 'Marcar como concluído' }).click();
  await expect(page.getByRole('button', { name: 'Desfazer conclusão' })).toBeVisible();
  await expect
    .poll(
      () =>
        (kvStore.get(navigationDocId)?.json as { readingPosition?: unknown } | undefined)
          ?.readingPosition,
      { timeout: 30_000 },
    )
    .toBeNull();

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.7));
  await page.waitForTimeout(1_200);
  expect(await readLocalReadingPosition(page)).toBeNull();

  const catalogPage = await context.newPage();
  await catalogPage.goto(contestUrl);
  await expect(catalogPage.locator('[data-contest-resume-reading]')).toBeHidden();
  await catalogPage.close();

  await revealSubjectActions(page);
  await page.getByRole('button', { name: 'Desfazer conclusão' }).click();
  await expect(page.getByRole('button', { name: 'Marcar como concluído' })).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.8));
  await expect
    .poll(
      () =>
        (kvStore.get(navigationDocId)?.json as
          | { readingPosition?: { progress?: number } | null }
          | undefined)?.readingPosition?.progress ?? 0,
      { timeout: 30_000 },
    )
    .toBeGreaterThan(0);

  await page.evaluate(
    (detail) => {
      // O runtime possui outra instância do canal e deve receber esta entrega atrasada.
      const channel = new BroadcastChannel('concursos-studied');
      channel.postMessage(detail);
      window.setTimeout(() => channel.close(), 0);
    },
    {
      profileId: alias,
      contestStorageId: 'tcema-2026-adm',
      subjectStorageId: 'leitura-tipos-generos',
      studied: true,
    },
  );
  await page.waitForTimeout(1_200);
  expect(await readLocalReadingPosition(page)).not.toBeNull();
  expect(
    (kvStore.get(navigationDocId)?.json as
      | { readingPosition?: { progress?: number } | null }
      | undefined)?.readingPosition?.progress ?? 0,
  ).toBeGreaterThan(0);
});

test('keeps the reading point cleared across concurrent tabs', async ({ page, context, kvStore }) => {
  const otherPage = await context.newPage();
  await page.goto(contentUrl);
  await otherPage.goto(contentUrl);
  await otherPage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.5));
  await expect
    .poll(
      () =>
        (kvStore.get(navigationDocId)?.json as { readingPosition?: unknown } | undefined)
          ?.readingPosition ?? null,
      { timeout: 30_000 },
    )
    .not.toBeNull();

  await page.getByRole('button', { name: 'Marcar como concluído' }).click();
  await expect(page.getByRole('button', { name: 'Desfazer conclusão' })).toBeVisible();
  await otherPage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.75));
  await expect
    .poll(
      () =>
        (kvStore.get(navigationDocId)?.json as { readingPosition?: unknown } | undefined)
          ?.readingPosition,
      { timeout: 30_000 },
    )
    .toBeNull();
  await otherPage.waitForTimeout(1_200);
  expect(await readLocalReadingPosition(otherPage)).toBeNull();
  await otherPage.close();
});

test('keeps the mark control available in reading mode', async ({ page }) => {
  await page.goto(readingUrl);
  const mark = page.getByRole('button', { name: 'Marcar como concluído' });
  await expect(mark).toBeEnabled();
  await mark.click();
  await expect(page.getByRole('button', { name: 'Desfazer conclusão' })).toBeVisible();
});

test('exits fullscreen and returns to the top when a subject is marked unread', async ({ page }) => {
  await installFullscreenMock(page);
  await page.goto(contentUrl);
  await page.getByRole('link', { name: 'Ler sem distrações' }).click();
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 1, exits: 0, active: true });

  await page.getByRole('button', { name: 'Marcar como concluído' }).click();
  await expect(page.getByRole('button', { name: 'Desfazer conclusão' })).toBeVisible();
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, Math.max(300, document.documentElement.scrollHeight * 0.45));
  });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);

  await revealSubjectActions(page);
  await page.getByRole('button', { name: 'Desfazer conclusão' }).click();
  await expect(page.getByRole('button', { name: 'Marcar como concluído' })).toBeVisible();
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 1, exits: 1, active: false });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(100);
});

test('reuses the sole studied control in integrated reading mode', async ({ page }) => {
  await page.goto(`${contentUrl}#focus`);
  const mark = page.getByRole('button', { name: 'Marcar como concluído' });
  await expect(page.locator('[data-studied-toggle]')).toHaveCount(1);
  await expect(mark).toBeEnabled();

  await mark.click();
  await expect(page.getByRole('button', { name: 'Desfazer conclusão' })).toBeVisible();
  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await expect(page.getByRole('button', { name: 'Desfazer conclusão' })).toBeVisible();
});
