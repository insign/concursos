import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from './fixtures';

test.use({ serviceWorkers: 'allow' });

const contestUrl = '/concursos/concurso-exemplo/';
const mediaFolder = path.join(
  process.cwd(),
  'src/content/assuntos/concurso-exemplo/administracao-publica/assunto-exemplo/midia',
);

const mediaFiles = {
  'exemplo-principal.mp3': '25ef018285ff8fb50167f38571893412b8015be8f783ed3e830c88457acf7304.mp3',
  'exemplo-revisao.mp3': '48c496329186047ca4ade8c61ad82b87dcc938c88e65e06d43ef5d294016139c.mp3',
};

async function waitForServiceWorker(page: import('@playwright/test').Page): Promise<void> {
  await page.evaluate(() => navigator.serviceWorker.ready.then(() => undefined));
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
}

/**
 * Serve a mídia localmente com suporte a Range, como a rota `/media/*` faz em
 * produção. O mock é do contexto, e não da página: com o service worker
 * ativo, quem fala com a rede é ele.
 */
async function installMediaRoute(context: import('@playwright/test').BrowserContext): Promise<void> {
  const bodies = new Map<string, Buffer>();
  for (const [file, key] of Object.entries(mediaFiles)) {
    bodies.set(key, await readFile(path.join(mediaFolder, file)));
  }

  await context.route('**/media/**', async (route) => {
    const url = new URL(route.request().url());
    const key = url.pathname.split('/').pop() ?? '';
    const body = bodies.get(key);
    if (!body) {
      await route.fulfill({ status: 404, body: 'not found' });
      return;
    }
    const range = route.request().headers().range;
    const match = range ? /^bytes=(\d*)-(\d*)$/.exec(range) : null;
    if (match) {
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Math.min(Number(match[2]), body.length - 1) : body.length - 1;
      await route.fulfill({
        status: 206,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Range': `bytes ${start}-${end}/${body.length}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': String(end - start + 1),
        },
        body: body.subarray(start, end + 1),
      });
      return;
    }
    await route.fulfill({
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Accept-Ranges': 'bytes',
        'Content-Length': String(body.length),
      },
      body,
    });
  });
}

async function cachedMediaPaths(page: import('@playwright/test').Page): Promise<string[]> {
  return page.evaluate(async () => {
    const cache = await caches.open('offline-media-v1');
    const keys = await cache.keys();
    return keys.map((request) => new URL(request.url).pathname).sort();
  });
}

test('downloads the media with the contest when the user chooses it', async ({ page, context }) => {
  await installMediaRoute(context);
  await page.goto(contestUrl);
  await waitForServiceWorker(page);
  await page.goto(contestUrl);

  const select = page.locator('[data-offline-media-select]');
  await expect(select).toBeVisible();
  await expect(select.locator('option[data-offline-media-option]')).toContainText('2 arquivos');
  await select.selectOption('all');

  await page.getByRole('button', { name: 'Baixar concurso' }).click();
  await expect(page.getByText('Disponível offline com mídias desde')).toBeVisible({ timeout: 60_000 });

  expect(await cachedMediaPaths(page)).toEqual(Object.values(mediaFiles).map((key) => `/media/${key}`).sort());
});

test('finishes a media download across internal navigation without BroadcastChannel', async ({ page, context }) => {
  await context.addInitScript(() => { Reflect.deleteProperty(window, 'BroadcastChannel'); });
  await installMediaRoute(context);
  let requested = false;
  let release = () => {};
  const held = new Promise<void>((resolve) => { release = resolve; });
  await context.route(`**/media/${mediaFiles['exemplo-principal.mp3']}`, async (route) => {
    requested = true;
    await held;
    await route.fallback();
  });
  try {
    await page.goto(contestUrl);
    await waitForServiceWorker(page);
    await page.locator('[data-offline-media-select]').selectOption('all');
    await page.getByRole('button', { name: 'Baixar concurso' }).click();
    await expect.poll(() => requested, { timeout: 30_000 }).toBe(true);
    await page.locator('a[href="/"]').first().click();
    await expect(page).toHaveURL('/');
    release();
    await page.getByRole('link', { name: 'Concurso Exemplo', exact: true }).click();
    await expect(page.getByText('Disponível offline com mídias desde')).toBeVisible({ timeout: 30_000 });
    expect(await cachedMediaPaths(page)).toHaveLength(2);
  } finally {
    release();
  }
});

test('keeps the media out of the download when the option is not chosen', async ({ page, context }) => {
  await installMediaRoute(context);
  await page.goto(contestUrl);
  await waitForServiceWorker(page);
  await page.goto(contestUrl);

  await page.getByRole('button', { name: 'Baixar concurso' }).click();
  await expect(page.getByText('Disponível offline desde')).toBeVisible({ timeout: 60_000 });

  expect(await cachedMediaPaths(page)).toEqual([]);
});

test('serves the downloaded media offline with a partial content response', async ({
  page,
  context,
}) => {
  await installMediaRoute(context);
  await page.goto(contestUrl);
  await waitForServiceWorker(page);
  await page.goto(contestUrl);

  await page.locator('[data-offline-media-select]').selectOption('all');
  await page.getByRole('button', { name: 'Baixar concurso' }).click();
  await expect(page.getByText('Disponível offline com mídias desde')).toBeVisible({ timeout: 60_000 });

  await context.setOffline(true);
  const response = await page.evaluate(async () => {
    const result = await fetch(
      '/media/25ef018285ff8fb50167f38571893412b8015be8f783ed3e830c88457acf7304.mp3',
      { headers: { Range: 'bytes=0-1' } },
    );
    return {
      status: result.status,
      contentRange: result.headers.get('content-range'),
      length: (await result.arrayBuffer()).byteLength,
    };
  });

  expect(response.status).toBe(206);
  expect(response.contentRange).toMatch(/^bytes 0-1\/\d+$/);
  expect(response.length).toBe(2);
});
