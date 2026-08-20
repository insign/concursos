import { expect, test } from './fixtures';

const alias = 'leitura-2026-teste';
const contest = 'tce-ma-2026-analista-administracao';
const subjectSlug = 'leitura-interpretacao-tipos-generos';
const readingUrl = `/concursos/${contest}/${subjectSlug}/#focus`;
const leituraDocId = `concursos--${alias}--leitura`;

test.beforeEach(async ({ page }) => {
  await page.addInitScript((value) => localStorage.setItem('concursos:active-alias', value), alias);
});

test('customizes the integrated reading mode without changing the normal page', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 360 });
  await page.goto(`/concursos/${contest}/${subjectSlug}/`);
  const focus = page.locator('[data-reading-focus]');
  await expect(focus).not.toHaveAttribute('style', /--reading-/);

  await page.getByRole('link', { name: 'Ler sem distrações' }).click();
  await expect(page.getByRole('button', { name: 'Ajustes de leitura' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ajustes de leitura' }).locator('svg')).toBeVisible();
  await page.getByRole('button', { name: 'Ajustes de leitura' }).click();
  const panelGeometry = await page.locator('.reading-customizer-panel').evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      top: rect.top,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
    };
  });
  expect(panelGeometry.left).toBeGreaterThanOrEqual(0);
  expect(panelGeometry.right).toBeLessThanOrEqual(panelGeometry.viewportWidth);
  expect(panelGeometry.top).toBeGreaterThanOrEqual(0);
  expect(panelGeometry.bottom).toBeLessThanOrEqual(panelGeometry.viewportHeight);
  await page.getByRole('button', { name: 'Inter (sem serifa)', exact: true }).click();
  await expect(focus).toHaveAttribute('style', /--reading-font:.*Inter/);

  await page.keyboard.press('Escape');
  await expect(page).toHaveURL(readingUrl);
  await expect(page.getByRole('button', { name: 'Ajustes de leitura' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page).toHaveURL(`/concursos/${contest}/${subjectSlug}/`);
  await expect(focus).not.toHaveAttribute('style', /--reading-/);
});

test('uses the study shell width normally and preserves the focus content width', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`/concursos/${contest}/${subjectSlug}/`);

  const normalGeometry = await page.evaluate(() => {
    const shellRect = document.querySelector<HTMLElement>('.study-shell')!.getBoundingClientRect();
    const surfaceRect = document.querySelector<HTMLElement>('.reading-surface')!.getBoundingClientRect();
    const articleRect = document.querySelector<HTMLElement>('.reading-surface > article')!.getBoundingClientRect();
    return {
      articleWidth: articleRect.width,
      surfaceLeftDelta: Math.abs(surfaceRect.left - shellRect.left),
      surfaceRightDelta: Math.abs(surfaceRect.right - shellRect.right),
      surfaceWidth: surfaceRect.width,
    };
  });
  expect(normalGeometry.surfaceLeftDelta).toBeLessThan(1);
  expect(normalGeometry.surfaceRightDelta).toBeLessThan(1);

  await page.getByRole('link', { name: 'Ler sem distrações' }).click();
  const article = page.locator('.reading-surface > article');
  const focusedArticleWidth = await article.evaluate((element) => element.getBoundingClientRect().width);
  const focusedSurfaceWidth = await page.locator('.reading-surface').evaluate(
    (element) => element.getBoundingClientRect().width,
  );
  expect(focusedArticleWidth).toBeLessThan(normalGeometry.articleWidth);
  expect(focusedSurfaceWidth).toBeLessThan(normalGeometry.surfaceWidth);

  await page.getByRole('button', { name: 'Ajustes de leitura' }).click();
  await page.locator('#reading-content-width').evaluate((element: HTMLInputElement) => {
    element.value = '52';
    element.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await expect
    .poll(() => page.locator('[data-reading-focus]').evaluate((element) =>
      getComputedStyle(element).getPropertyValue('--reading')))
    .toBe('52ch');
  await expect
    .poll(() => article.evaluate((element) => element.getBoundingClientRect().width))
    .toBeLessThan(focusedArticleWidth);
});

test('prints the integrated mode with a light palette after selecting a dark preset', async ({ page }) => {
  await page.goto(readingUrl);
  await page.getByRole('button', { name: 'Ajustes de leitura' }).click();
  await page.getByRole('button', { name: 'Escuro', exact: true }).click();
  await page.locator('#reading-content-width').evaluate((element: HTMLInputElement) => {
    element.value = '52';
    element.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await expect(page.locator('[data-reading-focus]')).toHaveAttribute('data-reading-scheme', 'escuro');
  await expect(page.locator('.reading-surface')).toHaveCSS('background-color', 'rgb(20, 24, 26)');
  await expect(page.locator('.reading-surface article')).toHaveCSS('color', 'rgb(231, 236, 232)');

  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('[data-reading-focus]')).toHaveCSS('color-scheme', 'light');
  await expect(page.locator('.reading-surface')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(page.locator('.reading-surface article')).toHaveCSS('color', 'rgb(0, 0, 0)');
  await expect(page.locator('.reading-surface article')).toHaveCSS('max-width', 'none');
  const printWidths = await page.evaluate(() => ({
    article: document.querySelector<HTMLElement>('.reading-surface > article')!.getBoundingClientRect().width,
    surface: document.querySelector<HTMLElement>('.reading-surface')!.getBoundingClientRect().width,
  }));
  expect(Math.abs(printWidths.article - printWidths.surface)).toBeLessThan(1);
});

test('personalizes typography and persists it across reloads', async ({ page, kvStore }) => {
  await page.goto(readingUrl);
  await page.waitForLoadState('load');

  const shell = page.locator('[data-reading-focus]');
  await page.getByRole('button', { name: 'Ajustes de leitura' }).click();
  await page.getByRole('button', { name: 'Inter (sem serifa)', exact: true }).click();

  // A fonte é aplicada imediatamente como custom property no shell.
  await expect
    .poll(() => shell.evaluate((el) => getComputedStyle(el).getPropertyValue('--reading-font')))
    .toContain('Inter');

  // Ajusta o tamanho via slider (dispara 'input').
  await page.locator('#reading-font-size').evaluate((el: HTMLInputElement) => {
    el.value = '24';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await expect
    .poll(() => shell.evaluate((el) => getComputedStyle(el).getPropertyValue('--reading-size')))
    .toBe('24px');

  // Aguarda a gravação durável (o PUT ao KV só ocorre após a transação IndexedDB).
  await expect
    .poll(() => (kvStore.get(leituraDocId)?.json as { fontSize?: number })?.fontSize, {
      timeout: 15_000,
    })
    .toBe(24);

  await page.reload();
  await page.waitForLoadState('load');
  await expect
    .poll(() => shell.evaluate((el) => getComputedStyle(el).getPropertyValue('--reading-font')))
    .toContain('Inter');
  await expect
    .poll(() => shell.evaluate((el) => getComputedStyle(el).getPropertyValue('--reading-size')))
    .toBe('24px');
});

test('flushes a pending customization before a PWA-controlled reload', async ({ page }) => {
  await page.goto(readingUrl);
  const status = page.locator('[data-application-status]');
  await expect(status).toHaveAttribute('data-source', 'pwa');

  await page.getByRole('button', { name: 'Ajustes de leitura' }).click();
  await page.locator('#reading-font-size').evaluate((element: HTMLInputElement) => {
    element.value = '25';
    element.dispatchEvent(new Event('input', { bubbles: true }));
  });

  await Promise.all([
    page.waitForEvent('load'),
    page.evaluate(() => window.dispatchEvent(new CustomEvent('concursos:pwa-retry'))),
  ]);
  await expect
    .poll(() => page.locator('[data-reading-focus]').evaluate((element) =>
      getComputedStyle(element).getPropertyValue('--reading-size')))
    .toBe('25px');
});

test('applies a color-scheme preset and keeps it after reload', async ({ page, kvStore }) => {
  await page.goto(readingUrl);
  await page.waitForLoadState('load');

  const shell = page.locator('[data-reading-focus]');
  await page.getByRole('button', { name: 'Ajustes de leitura' }).click();
  await page.getByRole('button', { name: 'Sépia', exact: true }).click();
  await expect(shell).toHaveAttribute('data-reading-scheme', 'sepia');

  // Aguarda a gravação durável antes de recarregar (persistência tem debounce).
  await expect
    .poll(() => (kvStore.get(leituraDocId)?.json as { colorScheme?: string })?.colorScheme, {
      timeout: 15_000,
    })
    .toBe('sepia');

  await page.reload();
  await page.waitForLoadState('load');
  await expect(shell).toHaveAttribute('data-reading-scheme', 'sepia');
});

test('keeps light reading table headers readable over a dark site theme', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('concursos:theme', 'dark'));
  await page.goto(`/concursos/${contest}/reescrita-generos-formalidade/#focus`);

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Ajustes de leitura' }).click();
  await page.getByRole('button', { name: 'Claro', exact: true }).click();

  const header = page.locator('.reading-surface table th').first();
  await expect(header).toHaveCSS('background-color', 'rgb(223, 234, 229)');
  await expect(header).toHaveCSS('color', 'rgb(27, 42, 38)');

  await page.getByRole('button', { name: 'Sépia', exact: true }).click();
  await expect(header).toHaveCSS('background-color', 'rgb(232, 218, 187)');
  await expect(header).toHaveCSS('color', 'rgb(67, 52, 31)');
});

test('adopts remote reading preferences through the page coordinator', async ({ page, kvStore }) => {
  // Documento remoto (como se personalizado em outro dispositivo).
  kvStore.set(leituraDocId, {
    version: 6,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: {
      schemaVersion: 1,
      fontFamily: 'atkinson',
      fontSize: 23,
      lineHeight: 1.9,
      contentWidth: 66,
      horizontalSpacing: 16,
      colorScheme: 'escuro',
    },
  });

  await page.goto(readingUrl);
  const shell = page.locator('[data-reading-focus]');
  // O Header fica visualmente oculto no foco, mas seu coordenador continua montado.
  await expect(shell).toHaveAttribute('data-reading-scheme', 'escuro');
  await expect
    .poll(() => shell.evaluate((el) => getComputedStyle(el).getPropertyValue('--reading-font')))
    .toContain('Atkinson');
  await expect
    .poll(() => shell.evaluate((el) => getComputedStyle(el).getPropertyValue('--reading-size')))
    .toBe('23px');
});

test('restores defaults with the reset control', async ({ page }) => {
  await page.goto(readingUrl);
  await page.waitForLoadState('load');

  const shell = page.locator('[data-reading-focus]');
  await page.getByRole('button', { name: 'Ajustes de leitura' }).click();
  await page.getByRole('button', { name: 'Cinza', exact: true }).click();
  await expect(shell).toHaveAttribute('data-reading-scheme', 'cinza');

  await page.getByRole('button', { name: 'Restaurar padrão' }).click();
  // 'auto' remove o atributo e volta a seguir o tema global.
  await expect(shell).not.toHaveAttribute('data-reading-scheme', /.+/);
  await expect
    .poll(() => shell.evaluate((el) => getComputedStyle(el).getPropertyValue('--reading-font')))
    .toContain('Lora');
});

test('does not revert an in-flight edit when a sync-status event fires', async ({ page, kvStore }) => {
  // Remoto "antigo" (fontSize 16) para o reload ter um valor diferente a adotar.
  kvStore.set(leituraDocId, {
    version: 2,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: {
      schemaVersion: 1,
      fontFamily: 'lora',
      fontSize: 16,
      lineHeight: 1.7,
      contentWidth: 72,
      horizontalSpacing: 0,
      colorScheme: 'auto',
    },
  });

  await page.goto(readingUrl);
  const shell = page.locator('[data-reading-focus]');
  // Adota o remoto no load.
  await expect
    .poll(() => shell.evaluate((el) => getComputedStyle(el).getPropertyValue('--reading-size')))
    .toBe('16px');

  await page.getByRole('button', { name: 'Ajustes de leitura' }).click();
  // Altera para 24 e, no MESMO tick, dispara sync-status: o guard de edição pendente deve
  // impedir que reloadFromStore reverta o ajuste para 16 (o defeito confirmado no review).
  await page.locator('#reading-font-size').evaluate((el: HTMLInputElement) => {
    el.value = '24';
    el.dispatchEvent(new Event('input', { bubbles: true }));
    window.dispatchEvent(new CustomEvent('concursos:sync-status', { detail: { state: 'synced' } }));
  });

  // Não reverteu para 16.
  await expect(shell).toHaveAttribute('style', /--reading-size:\s*24px/);
  // E o valor durável/publicado é 24, não 16.
  await expect
    .poll(() => (kvStore.get(leituraDocId)?.json as { fontSize?: number })?.fontSize, {
      timeout: 15_000,
    })
    .toBe(24);
});

test('publishes reading preferences to the KV without Authorization', async ({ page, kvStore }) => {
  const authHeaders: string[] = [];
  await page.route('https://kv.helio.me/**', async (route) => {
    const auth = route.request().headers()['authorization'];
    if (auth) authHeaders.push(auth);
    await route.fallback();
  });

  await page.goto(readingUrl);
  await page.waitForLoadState('load');
  await page.getByRole('button', { name: 'Ajustes de leitura' }).click();
  await page.getByRole('button', { name: 'Atkinson Hyperlegible (sem serifa)', exact: true }).click();

  await expect
    .poll(() => (kvStore.get(leituraDocId)?.json as { fontFamily?: string })?.fontFamily, {
      timeout: 15_000,
    })
    .toBe('atkinson');
  expect(authHeaders).toEqual([]);
});
