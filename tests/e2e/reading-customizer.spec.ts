import { expect, test } from './fixtures';

const alias = 'leitura-2026-teste';
const contest = 'tce-ma-2026-analista-administracao';
const subjectSlug = 'leitura-interpretacao-tipos-generos';
const readingUrl = `/concursos/${contest}/${subjectSlug}/leitura/`;
const leituraDocId = `concursos--${alias}--leitura`;

test.beforeEach(async ({ page }) => {
  await page.addInitScript((value) => localStorage.setItem('concursos:active-alias', value), alias);
});

test('personalizes typography and persists it across reloads', async ({ page, kvStore }) => {
  await page.goto(readingUrl);
  await page.waitForLoadState('load');

  const shell = page.locator('.reading-shell');
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

test('applies a color-scheme preset and keeps it after reload', async ({ page, kvStore }) => {
  await page.goto(readingUrl);
  await page.waitForLoadState('load');

  const shell = page.locator('.reading-shell');
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

test('adopts remote reading preferences without the header coordinator', async ({ page, kvStore }) => {
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
  const shell = page.locator('.reading-shell');
  // O modo de leitura oculta o Header; o customizador chama requestProfileSync no load.
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

  const shell = page.locator('.reading-shell');
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
  const shell = page.locator('.reading-shell');
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
