import { readFile } from 'node:fs/promises';
import type { Page } from '@playwright/test';
import { expect, test } from './fixtures';

const sourceAlias = 'backup-7f3k';
const targetAlias = 'restore-9x2m';
const exampleQuestionSetPath = new URL(
  '../../src/content/assuntos/concurso-exemplo/administracao-publica/assunto-exemplo/questoes.json',
  import.meta.url,
);

function backupPayload() {
  return {
    schemaVersion: 1,
    exportedAt: '2026-07-13T12:00:00.000Z',
    sourceAlias,
    answers: [
      {
        contestStorageId: 'exemplo',
        subjectStorageId: 'fundamentos',
        document: {
          schemaVersion: 1,
          questionSetRevision: 1,
          answers: { q001: { optionId: 'b', questionRevision: 1 } },
          submission: null,
        },
      },
    ],
    preferences: {
      schemaVersion: 1,
      questionLayout: 'single',
      correctionMode: 'immediate',
      shuffleQuestions: false,
    },
  };
}

function seedObservedRemoteAnswer(page: Page, profileId: string, documentId: string) {
  return page.evaluate(
    ({ alias, id }) =>
      new Promise<void>((resolve, reject) => {
        const request = indexedDB.open('concursos-offline', 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const transaction = request.result.transaction('responses', 'readwrite');
          const document = {
            schemaVersion: 1,
            questionSetRevision: 1,
            answers: { q001: { optionId: 'a', questionRevision: 1 } },
            submission: null,
          };
          transaction.objectStore('responses').put({
            documentId: id,
            profileId: alias,
            current: document,
            base: document,
            remoteVersion: 8,
            remoteCreatedAt: '2026-07-13T12:00:00.000Z',
            dirtyQuestionIds: [],
            outboxState: 'clean',
            attempts: 0,
            nextAttemptAt: null,
            lastError: null,
            conflictWarning: null,
            localRevision: 0,
            updatedAt: Date.now(),
          });
          transaction.oncomplete = () => resolve();
          transaction.onerror = () => reject(transaction.error);
        };
      }),
    { alias: profileId, id: documentId },
  );
}

function seedObservedRemoteProgress(
  page: Page,
  profileId: string,
  document: unknown,
) {
  return page.evaluate(
    ({ alias, progress }) =>
      new Promise<void>((resolve, reject) => {
        const request = indexedDB.open('concursos-offline', 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const transaction = request.result.transaction('progress', 'readwrite');
          transaction.objectStore('progress').put({
            profileId: alias,
            current: progress,
            base: progress,
            remoteVersion: 4,
            remoteCreatedAt: '2026-07-13T12:00:00.000Z',
            dirtyFields: [],
            outboxState: 'clean',
            attempts: 0,
            lastError: null,
            conflictWarning: null,
            localRevision: 0,
            updatedAt: Date.now(),
          });
          transaction.oncomplete = () => resolve();
          transaction.onerror = () => reject(transaction.error);
        };
      }),
    { alias: profileId, progress: document },
  );
}

test.beforeEach(async ({ page }) => {
  const questionSet = JSON.parse(await readFile(exampleQuestionSetPath, 'utf8'));
  await page.route('**/sync-catalog.json', (route) =>
    route.fulfill({
      json: {
        schemaVersion: 1,
        subjects: [
          {
            contestStorageId: 'exemplo',
            subjectStorageId: 'fundamentos',
            questionSet,
          },
        ],
      },
    }),
  );
  await page.goto('/');
  await page.evaluate((alias) => localStorage.setItem('concursos:active-alias', alias), sourceAlias);
});

test('exports and imports a profile without changing the active alias', async ({ page }) => {
  await page.goto('/configuracoes/');
  await page.getByLabel('Blocos de dez').check();
  await page.getByLabel('Imediata').check();
  await page.getByRole('button', { name: 'Salvar preferências' }).click();
  await expect(page.getByText('Preferências salvas localmente.')).toBeVisible();

  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/questoes/');
  await page.getByLabel('Eficiência').check();
  await expect(page.getByText(/Resposta salva localmente/)).toBeVisible();

  await page.goto('/configuracoes/');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar backup JSON' }).click();
  const download = await downloadPromise;
  const downloadPath = await download.path();
  expect(downloadPath).not.toBeNull();
  const backup = JSON.parse(await readFile(downloadPath!, 'utf8'));
  expect(backup).toMatchObject({
    schemaVersion: 1,
    sourceAlias,
    answers: [{ contestStorageId: 'exemplo', subjectStorageId: 'fundamentos' }],
    preferences: { questionLayout: 'ten', correctionMode: 'immediate' },
  });
  expect(JSON.stringify(backup)).not.toMatch(/base|remoteVersion|dirtyQuestionIds|outboxState/);

  await page.evaluate((alias) => localStorage.setItem('concursos:active-alias', alias), targetAlias);
  await page.reload();
  await page.getByLabel('Arquivo de backup').setInputFiles({
    name: 'perfil.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(backup)),
  });
  await expect(page.getByText(`Backup de ${sourceAlias} com 1 assunto(s). Confirme para importar em ${targetAlias}.`)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Importar no alias ativo' })).toBeDisabled();
  await page.getByLabel(/Confirmo a importação/).check();
  await page.getByRole('button', { name: 'Importar no alias ativo' }).click();
  await expect(page.getByText(`Importação concluída: 1 assunto(s) de ${sourceAlias} foram gravados em ${targetAlias}.`)).toBeVisible();
  await expect(page.evaluate(() => localStorage.getItem('concursos:active-alias'))).resolves.toBe(targetAlias);
  await expect(page.getByLabel('Blocos de dez')).toBeChecked();
  await expect(page.getByLabel('Imediata')).toBeChecked();

  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/questoes/');
  await expect(page.getByLabel('Eficiência')).toBeChecked();
});

test('rejects an invalid backup before enabling import', async ({ page }) => {
  await page.goto('/configuracoes/');
  await page.getByLabel('Arquivo de backup').setInputFiles({
    name: 'invalido.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{"schemaVersion":2}'),
  });

  await expect(page.getByText('Arquivo de backup inválido ou incompatível.')).toBeVisible();
  await expect(page.getByLabel(/Confirmo a importação/)).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Importar no alias ativo' })).toBeDisabled();
});

test('rematerializes progress with the synchronized answer version', async ({ page, kvStore }) => {
  await page.evaluate((alias) => localStorage.setItem('concursos:active-alias', alias), targetAlias);
  const answerId = `concursos--${targetAlias}--exemplo--fundamentos`;
  const progressId = `concursos--${targetAlias}--progresso`;
  kvStore.set(answerId, {
    version: 8,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: {
      schemaVersion: 1,
      questionSetRevision: 1,
      answers: { q001: { optionId: 'a', questionRevision: 1 } },
      submission: null,
    },
  });
  const remoteProgress = {
    schemaVersion: 1,
    subjects: {
      'exemplo--fundamentos': {
        answered: 1,
        total: 12,
        correct: 0,
        submitted: false,
        questionSetRevision: 1,
        answerVersion: 8,
      },
      'legado--removido': {
        answered: 4,
        total: 4,
        correct: 4,
        submitted: true,
        questionSetRevision: 1,
        answerVersion: 2,
      },
    },
  };
  kvStore.set(progressId, {
    version: 4,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: remoteProgress,
  });

  await page.goto('/configuracoes/');
  await seedObservedRemoteAnswer(page, targetAlias, answerId);
  await seedObservedRemoteProgress(page, targetAlias, remoteProgress);
  await page.evaluate(
    ({ alias }) =>
      new Promise<void>((resolve, reject) => {
        const request = indexedDB.open('concursos-offline', 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const transaction = request.result.transaction('responses', 'readwrite');
          transaction.objectStore('responses').put({
            documentId: `concursos--${alias}--legado--removido`,
            profileId: alias,
            current: {
              schemaVersion: 1,
              questionSetRevision: 1,
              answers: {},
              submission: null,
            },
            base: null,
            remoteVersion: null,
            remoteCreatedAt: null,
            dirtyQuestionIds: [],
            outboxState: 'pending',
            attempts: 0,
            nextAttemptAt: null,
            lastError: null,
            conflictWarning: null,
            localRevision: 1,
            updatedAt: Date.now(),
          });
          transaction.oncomplete = () => resolve();
          transaction.onerror = () => reject(transaction.error);
        };
      }),
    { alias: targetAlias },
  );
  await page.getByLabel('Arquivo de backup').setInputFiles({
    name: 'perfil.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(backupPayload())),
  });
  await page.getByLabel(/Confirmo a importação/).check();
  await page.getByRole('button', { name: 'Importar no alias ativo' }).click();
  await expect(page.getByText(/Importação concluída/)).toBeVisible();

  await expect
    .poll(() => {
      const progress = kvStore.get(progressId)?.json as
        | { subjects?: Record<string, { answerVersion?: number; correct?: number }> }
        | undefined;
      return progress?.subjects?.['exemplo--fundamentos'];
    }, { timeout: 15_000 })
    .toMatchObject({ answerVersion: 9, correct: 1 });
  expect(
    (kvStore.get(progressId)?.json as { subjects: Record<string, unknown> }).subjects['legado--removido'],
  ).toBeUndefined();
});

test('does not publish predicted progress when answer synchronization fails', async ({ page, kvStore }) => {
  await page.evaluate((alias) => localStorage.setItem('concursos:active-alias', alias), targetAlias);
  const answerId = `concursos--${targetAlias}--exemplo--fundamentos`;
  const progressId = `concursos--${targetAlias}--progresso`;
  kvStore.set(answerId, {
    version: 8,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: {
      schemaVersion: 1,
      questionSetRevision: 1,
      answers: { q001: { optionId: 'a', questionRevision: 1 } },
      submission: null,
    },
  });
  const remoteProgress = { schemaVersion: 1, subjects: {} };
  kvStore.set(progressId, {
    version: 4,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: remoteProgress,
  });
  await page.goto('/configuracoes/');
  await seedObservedRemoteAnswer(page, targetAlias, answerId);
  await seedObservedRemoteProgress(page, targetAlias, remoteProgress);

  let answerPutAttempted = false;
  let progressPutAttempts = 0;
  await page.route('https://kv.helio.me/**', async (route) => {
    const request = route.request();
    const id = decodeURIComponent(new URL(request.url()).pathname.slice(1));
    if (request.method() === 'PUT' && id === answerId) {
      answerPutAttempted = true;
      return route.fulfill({ status: 500, json: { error: 'temporary failure' } });
    }
    if (request.method() === 'PUT' && id === progressId) progressPutAttempts += 1;
    await route.fallback();
  });

  await page.getByLabel('Arquivo de backup').setInputFiles({
    name: 'perfil.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(backupPayload())),
  });
  await page.getByLabel(/Confirmo a importação/).check();
  await page.getByRole('button', { name: 'Importar no alias ativo' }).click();
  await expect(page.getByText(/Importação concluída/)).toBeVisible();
  await expect.poll(() => answerPutAttempted).toBe(true);
  await page.waitForTimeout(750);

  expect(progressPutAttempts).toBe(0);
  expect(kvStore.get(progressId)?.version).toBe(4);
});

test('does not publish progress while imported preferences remain pending', async ({ page, kvStore }) => {
  await page.evaluate((alias) => localStorage.setItem('concursos:active-alias', alias), targetAlias);
  const preferencesId = `concursos--${targetAlias}--preferencias`;
  const progressId = `concursos--${targetAlias}--progresso`;
  kvStore.set(progressId, {
    version: 4,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: { schemaVersion: 1, subjects: {} },
  });
  let preferencesPutAttempted = false;
  let progressPutAttempts = 0;
  await page.route('https://kv.helio.me/**', async (route) => {
    const request = route.request();
    const id = decodeURIComponent(new URL(request.url()).pathname.slice(1));
    if (request.method() === 'PUT' && id === preferencesId) {
      preferencesPutAttempted = true;
      return route.fulfill({ status: 500, json: { error: 'temporary failure' } });
    }
    if (request.method() === 'PUT' && id === progressId) progressPutAttempts += 1;
    await route.fallback();
  });

  await page.goto('/configuracoes/');
  await page.getByLabel('Arquivo de backup').setInputFiles({
    name: 'perfil.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(backupPayload())),
  });
  await page.getByLabel(/Confirmo a importação/).check();
  await page.getByRole('button', { name: 'Importar no alias ativo' }).click();
  await expect(page.getByText(/Importação concluída/)).toBeVisible();
  await expect.poll(() => preferencesPutAttempted).toBe(true);
  await page.waitForTimeout(750);

  expect(progressPutAttempts).toBe(0);
  expect(kvStore.get(progressId)?.version).toBe(4);
});

test('revalidates preferences immediately before publishing progress', async ({ page, kvStore }) => {
  await page.evaluate((alias) => localStorage.setItem('concursos:active-alias', alias), targetAlias);
  const preferencesId = `concursos--${targetAlias}--preferencias`;
  const progressId = `concursos--${targetAlias}--progresso`;
  const initialProgressRead = page.waitForResponse(
    (response) =>
      response.request().method() === 'GET' &&
      decodeURIComponent(new URL(response.url()).pathname.slice(1)) === progressId,
  );
  await page.goto('/configuracoes/');
  await initialProgressRead;

  let releaseProgressRead!: () => void;
  const progressReadGate = new Promise<void>((resolve) => {
    releaseProgressRead = resolve;
  });
  let progressReadPaused = false;
  const progressPuts: Array<{ subjects: Record<string, Record<string, unknown>> }> = [];
  await page.route('https://kv.helio.me/**', async (route) => {
    const request = route.request();
    const id = decodeURIComponent(new URL(request.url()).pathname.slice(1));
    if (request.method() === 'GET' && id === progressId && !progressReadPaused) {
      progressReadPaused = true;
      await progressReadGate;
    }
    if (request.method() === 'PUT' && id === progressId) {
      progressPuts.push(request.postDataJSON());
    }
    await route.fallback();
  });

  await page.getByLabel('Arquivo de backup').setInputFiles({
    name: 'perfil.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(backupPayload())),
  });
  await page.getByLabel(/Confirmo a importação/).check();
  await page.getByRole('button', { name: 'Importar no alias ativo' }).click();
  await expect(page.getByText(/Importação concluída/)).toBeVisible();
  await expect.poll(() => progressReadPaused).toBe(true);

  await page.getByLabel('Ao finalizar').check();
  await page.getByRole('button', { name: 'Salvar preferências' }).click();
  await expect(page.getByText('Preferências salvas localmente.')).toBeVisible();
  releaseProgressRead();

  await expect
    .poll(() => (kvStore.get(preferencesId)?.json as { correctionMode?: string } | undefined)?.correctionMode)
    .toBe('on-submit');
  await expect.poll(() => progressPuts.length).toBeGreaterThan(0);
  expect(
    progressPuts.every((progress) => {
      const subject = progress.subjects['exemplo--fundamentos'];
      return subject !== undefined && !('correct' in subject);
    }),
  ).toBe(true);
});

test('rechecks pending answers immediately before publishing progress', async ({ page }) => {
  await page.evaluate((alias) => localStorage.setItem('concursos:active-alias', alias), targetAlias);
  const answerId = `concursos--${targetAlias}--exemplo--fundamentos`;
  const progressId = `concursos--${targetAlias}--progresso`;
  const initialProgressRead = page.waitForResponse(
    (response) =>
      response.request().method() === 'GET' &&
      decodeURIComponent(new URL(response.url()).pathname.slice(1)) === progressId,
  );
  await page.goto('/configuracoes/');
  await initialProgressRead;

  let releaseProgressRead!: () => void;
  const progressReadGate = new Promise<void>((resolve) => {
    releaseProgressRead = resolve;
  });
  let progressReadPaused = false;
  let progressPutAttempts = 0;
  await page.route('https://kv.helio.me/**', async (route) => {
    const request = route.request();
    const id = decodeURIComponent(new URL(request.url()).pathname.slice(1));
    if (request.method() === 'GET' && id === progressId && !progressReadPaused) {
      progressReadPaused = true;
      await progressReadGate;
    }
    if (request.method() === 'PUT' && id === progressId) progressPutAttempts += 1;
    await route.fallback();
  });

  await page.getByLabel('Arquivo de backup').setInputFiles({
    name: 'perfil.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(backupPayload())),
  });
  await page.getByLabel(/Confirmo a importação/).check();
  await page.getByRole('button', { name: 'Importar no alias ativo' }).click();
  await expect(page.getByText(/Importação concluída/)).toBeVisible();
  await expect.poll(() => progressReadPaused).toBe(true);

  await page.evaluate(
    ({ documentId }) =>
      new Promise<void>((resolve, reject) => {
        const request = indexedDB.open('concursos-offline', 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const transaction = request.result.transaction('responses', 'readwrite');
          const store = transaction.objectStore('responses');
          const read = store.get(documentId);
          read.onerror = () => reject(read.error);
          read.onsuccess = () => {
            const record = read.result;
            store.put({
              ...record,
              current: {
                ...record.current,
                answers: { q001: { optionId: 'a', questionRevision: 1 } },
                submission: null,
              },
              dirtyQuestionIds: ['q001'],
              outboxState: 'pending',
              localRevision: record.localRevision + 1,
              updatedAt: Date.now(),
            });
          };
          transaction.oncomplete = () => resolve();
          transaction.onerror = () => reject(transaction.error);
        };
      }),
    { documentId: answerId },
  );
  releaseProgressRead();
  await page.waitForTimeout(750);

  expect(progressPutAttempts).toBe(0);
});

test('sanitizes unsubmitted remote progress for on-submit profiles', async ({ page, kvStore }) => {
  await page.evaluate((alias) => localStorage.setItem('concursos:active-alias', alias), targetAlias);
  const progressId = `concursos--${targetAlias}--progresso`;
  kvStore.set(progressId, {
    version: 4,
    createdAt: '2026-07-13T12:00:00.000Z',
    json: {
      schemaVersion: 1,
      subjects: {
        'exemplo--fundamentos': {
          answered: 1,
          total: 12,
          correct: 1,
          submitted: false,
          questionSetRevision: 1,
          answerVersion: 1,
        },
      },
    },
  });

  await page.goto('/configuracoes/');
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await expect
    .poll(() => {
      const progress = kvStore.get(progressId)?.json as
        | { subjects?: Record<string, { correct?: number }> }
        | undefined;
      return progress?.subjects?.['exemplo--fundamentos']?.correct;
    })
    .toBeUndefined();
  await expect.poll(() => kvStore.get(progressId)?.version).toBeGreaterThan(4);
});
