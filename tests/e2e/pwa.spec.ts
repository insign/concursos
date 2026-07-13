import { expect, test } from './fixtures';

test.use({ serviceWorkers: 'allow' });

async function waitForServiceWorker(page: import('@playwright/test').Page): Promise<void> {
  await page.evaluate(() => navigator.serviceWorker.ready.then(() => undefined));
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
}

test('reopens visited pages offline and falls back for missing content', async ({ page, context }) => {
  await page.goto('/');
  await waitForServiceWorker(page);
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/');
  await expect(page.getByRole('heading', { name: 'Fundamentos de administração pública', level: 1 })).toBeVisible();

  await context.setOffline(true);
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/');
  await expect(page.getByRole('heading', { name: 'Fundamentos de administração pública', level: 1 })).toBeVisible();

  await page.goto('/pagina-nao-baixada/');
  await expect(page.getByRole('heading', { name: 'Este conteúdo não foi baixado' })).toBeVisible();
  await expect(page.getByText('Nenhum concurso foi baixado neste dispositivo.')).toBeVisible();
});

test('downloads and removes an atomic contest package without caching KV', async ({ page, context }) => {
  const mermaidErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error' && message.text().includes('[astro-mermaid]')) mermaidErrors.push(message.text());
  });

  await page.goto('/concursos/concurso-exemplo/');
  await waitForServiceWorker(page);
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo');
  await expect(page.getByRole('heading', { name: 'Fundamentos de administração pública', level: 1 })).toBeVisible();
  await page.goto('/concursos/concurso-exemplo/');
  await page.getByRole('button', { name: 'Baixar concurso' }).click();
  await expect(page.getByText('Disponível offline desde')).toBeVisible({ timeout: 30_000 });

  const cacheState = await page.evaluate(async () => {
    const manifest = await fetch('/offline-inventories/exemplo.json').then((response) => response.json()) as {
      sharedAssets: string[];
    };
    const sharedCache = await caches.open('shared-assets-v1');
    const missingSharedAssets: string[] = [];
    for (const path of manifest.sharedAssets) {
      if (!await sharedCache.match(path)) missingSharedAssets.push(path);
    }

    const cachedKvRequests: string[] = [];
    for (const name of await caches.keys()) {
      for (const request of await (await caches.open(name)).keys()) {
        if (request.url.startsWith('https://kv.helio.me/')) cachedKvRequests.push(request.url);
      }
    }
    const mermaidAsset = manifest.sharedAssets.find((path) => path.includes('/mermaid.core.'));
    return { cachedKvRequests, mermaidAsset, missingSharedAssets };
  });
  expect(cacheState.missingSharedAssets).toEqual([]);
  expect(cacheState.cachedKvRequests).toEqual([]);
  expect(cacheState.mermaidAsset).toBeTruthy();

  await context.setOffline(true);
  const offlineMermaidResponse = await page.evaluate(async (path) => {
    try {
      const response = await fetch(path, { cache: 'reload' });
      return {
        contentType: response.headers.get('content-type'),
        ok: response.ok,
        status: response.status,
      };
    } catch (error) {
      return { error: error instanceof Error ? error.message : String(error) };
    }
  }, cacheState.mermaidAsset!);
  expect(offlineMermaidResponse).toMatchObject({ ok: true, status: 200 });
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/');
  const offlineImage = page.getByRole('img', { name: 'Ciclo de planejamento, execução, avaliação e correção.' });
  await expect(offlineImage).toBeVisible();
  await expect.poll(() => offlineImage.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/index.html');
  await expect(page.getByRole('heading', { name: 'Fundamentos de administração pública', level: 1 })).toBeVisible();

  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/cheat-sheet/');
  await expect(page.getByRole('heading', { name: 'Administração pública em uma página' })).toBeVisible();
  const mermaidDiagram = page.locator('pre.mermaid');
  await expect(mermaidDiagram).toHaveAttribute('data-render-status', /^(?:success|error)$/, { timeout: 20_000 });
  expect({ errors: mermaidErrors, status: await mermaidDiagram.getAttribute('data-render-status') }).toEqual({
    errors: [],
    status: 'success',
  });

  await context.setOffline(false);
  await page.goto('/concursos/concurso-exemplo/');
  page.on('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Remover download' }).click();
  await expect(page.getByText('Este concurso ainda não foi baixado.')).toBeVisible();

  await context.setOffline(true);
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/cheat-sheet/');
  await expect(page.getByRole('heading', { name: 'Este conteúdo não foi baixado' })).toBeVisible();
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo');
  await expect(page.getByRole('heading', { name: 'Este conteúdo não foi baixado' })).toBeVisible();
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/index.html');
  await expect(page.getByRole('heading', { name: 'Este conteúdo não foi baixado' })).toBeVisible();
});
