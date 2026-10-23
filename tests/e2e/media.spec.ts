import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from './fixtures';

const alias = 'estudo-2026-teste';
const subjectUrl = '/concursos/concurso-exemplo/assunto-exemplo/';
const mediaFolder = path.join(
  process.cwd(),
  'src/content/assuntos/concurso-exemplo/administracao-publica/assunto-exemplo/midia',
);

const mediaFiles = {
  'exemplo-principal.mp3': '25ef018285ff8fb50167f38571893412b8015be8f783ed3e830c88457acf7304.mp3',
  'exemplo-revisao.mp3': '48c496329186047ca4ade8c61ad82b87dcc938c88e65e06d43ef5d294016139c.mp3',
};

/**
 * Serve a mídia localmente com suporte a Range, como a rota `/media/*` faz em
 * produção. Sem isso o navegador receberia 404 e o player não reproduziria.
 */
async function installMediaRoute(page: import('@playwright/test').Page): Promise<void> {
  const bodies = new Map<string, Buffer>();
  for (const [file, key] of Object.entries(mediaFiles)) {
    bodies.set(key, await readFile(path.join(mediaFolder, file)));
  }

  await page.route('**/media/**', async (route) => {
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

interface StoredMediaDocument {
  positions: Record<string, { positionSeconds: number; completed: boolean }>;
}

async function readLocalMediaDocument(
  page: import('@playwright/test').Page,
): Promise<StoredMediaDocument | null> {
  const result = await page.evaluate(
    (profileId) =>
      new Promise<StoredMediaDocument | null>((resolve, reject) => {
        const request = indexedDB.open('concursos-offline');
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          if (!database.objectStoreNames.contains('midia')) {
            database.close();
            resolve(null);
            return;
          }
          const store = database.transaction('midia', 'readonly').objectStore('midia');
          const keys = store.getAllKeys();
          keys.onsuccess = () => {
            const id = (keys.result as IDBValidKey[]).find(
              (key) => typeof key === 'string' && key.startsWith(`concursos--${profileId}--midia--`),
            );
            if (!id) {
              database.close();
              resolve(null);
              return;
            }
            const get = store.get(id);
            get.onerror = () => reject(get.error);
            get.onsuccess = () => {
              const record = get.result as { current?: StoredMediaDocument } | undefined;
              resolve(record?.current ?? null);
              database.close();
            };
          };
        };
      }),
    alias,
  );
  return result;
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript((value) => {
    localStorage.setItem('concursos:active-alias', value);
    localStorage.setItem('concursos:catalog-groups', '{"version":1,"collapsed":[]}');
  }, alias);
  await installMediaRoute(page);
});

test('embeds the media of a subject and offers a selector for multiple tracks', async ({ page }) => {
  await page.goto(subjectUrl);
  await page.locator('[data-subject-media-play]').click();

  const player = page.locator('[data-subject-media-element]');
  await expect(page.locator('#global-media-player')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Pausar', exact: true })).toBeVisible();
  expect(await player.evaluate((element: HTMLMediaElement) => element.paused)).toBe(false);

  const select = page.locator('[data-subject-media-select]');
  await expect(select).toBeVisible();
  await expect(select.locator('option')).toHaveCount(2);
  await expect(page.locator('[data-subject-media]')).toHaveAttribute(
    'data-subject-media-subject-id',
    'exemplo--fundamentos',
  );

  await page.getByRole('link', { name: 'Ler sem distrações' }).click();
  await expect(page.locator('[data-subject-media-play]')).toBeVisible();
  await expect(select).toBeVisible();
  await select.selectOption({ index: 1 });
  await expect(player).toHaveAttribute('data-media-id', await select.inputValue());
});

async function completeCurrentTrack(page: import('@playwright/test').Page): Promise<number> {
  if (await page.locator('#global-media-player').isHidden()) await page.locator('[data-subject-media-play]').click();
  return page.evaluate(async () => {
    const audio = document.querySelector<HTMLAudioElement>('[data-subject-media-element]');
    if (!audio) return 0;
    await new Promise<void>((resolve) => {
      if (audio.readyState >= 1) {
        resolve();
        return;
      }
      audio.addEventListener('loadedmetadata', () => resolve(), { once: true });
    });
    audio.currentTime = audio.duration * 0.98;
    audio.dispatchEvent(new Event('timeupdate'));
    return audio.duration;
  });
}

test('plays the media and marks the subject as studied when every track is completed', async ({
  page,
}) => {
  await page.goto(subjectUrl);

  const first = await completeCurrentTrack(page);
  expect(first).toBeGreaterThan(0);

  // Com duas faixas, o assunto só é concluído quando todas são concluídas.
  await expect(page.getByText('Assunto marcado como concluído.')).toHaveCount(0);

  await page.locator('[data-subject-media-select]').selectOption({ index: 1 });
  const second = await completeCurrentTrack(page);
  expect(second).toBeGreaterThan(0);

  await expect(page.getByText('Assunto marcado como concluído.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Desfazer conclusão' })).toBeVisible();

  const stored = await readLocalMediaDocument(page);
  expect(stored).not.toBeNull();
  const positions = Object.values(stored?.positions ?? {});
  expect(positions.length).toBe(2);
  expect(positions.every((position) => position.completed)).toBe(true);
});

test('undoes the automatic completion of the subject', async ({ page }) => {
  await page.goto(subjectUrl);

  await completeCurrentTrack(page);
  await page.locator('[data-subject-media-select]').selectOption({ index: 1 });
  await completeCurrentTrack(page);

  await expect(page.getByText('Assunto marcado como concluído.')).toBeVisible();
  await page.getByRole('button', { name: 'Desfazer', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Marcar como concluído' })).toBeVisible();
});

test('resumes a track from the position saved in this session when switching back', async ({
  page,
}) => {
  await page.clock.install({ time: new Date('2026-01-01T08:00:00Z') });
  await page.goto(subjectUrl);
  await page.clock.pauseAt(new Date('2026-01-01T10:00:00Z'));
  await page.locator('[data-subject-media-play]').click();

  const firstDuration = await page.evaluate(async () => {
    const audio = document.querySelector<HTMLAudioElement>('[data-subject-media-element]');
    if (!audio) return 0;
    await new Promise<void>((resolve) => {
      if (audio.readyState >= 1) {
        resolve();
        return;
      }
      audio.addEventListener('loadedmetadata', () => resolve(), { once: true });
    });
    audio.currentTime = audio.duration * 0.4;
    audio.dispatchEvent(new Event('timeupdate'));
    // A pausa forca a gravacao da posicao, como no uso real.
    audio.dispatchEvent(new Event('pause'));
    return audio.duration;
  });
  expect(firstDuration).toBeGreaterThan(0);

  // A troca de faixa não pode apagar o ponto da faixa anterior.
  await page.locator('[data-subject-media-select]').selectOption({ index: 1 });
  await completeCurrentTrack(page);
  await page.locator('[data-subject-media-select]').selectOption({ index: 0 });

  const resumed = await page.evaluate(async () => {
    const audio = document.querySelector<HTMLAudioElement>('[data-subject-media-element]');
    if (!audio) return 0;
    await new Promise<void>((resolve) => {
      if (audio.readyState >= 1) {
        resolve();
        return;
      }
      audio.addEventListener('loadedmetadata', () => resolve(), { once: true });
    });
    return audio.currentTime;
  });

  expect(resumed).toBeGreaterThan(0);
  expect(resumed).toBeGreaterThan(firstDuration * 0.3);

  const status = page.locator('#global-media-player [data-subject-media-status]');
  await expect(status).toHaveText(/^Retomando de /);
  await page.clock.runFor(9_999);
  await expect(status).toHaveText(/^Retomando de /);
  await page.clock.runFor(1);
  await expect(status).toBeEmpty();
});
