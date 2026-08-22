import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import 'fake-indexeddb/auto';
import type { QuestionSet, SyncQuestionSet } from '../../src/lib/content-schema';
import {
  getLocalAnswerRecord,
  getSharedDocumentRecord,
  openOfflineDb,
} from '../../src/lib/offline-db';
import {
  buildPreferencesDocumentId,
  buildProgressDocumentId,
} from '../../src/lib/identity';
import { profileDocumentId } from '../../src/lib/profile-document';
import { DEFAULT_PREFERENCES } from '../../src/lib/preferences';
import { createEmptyAnswerDocument } from '../../src/lib/questionnaire';
import { prepareProfileAlias } from '../../src/lib/sync';

const profileId = 'perfil-preflight';
const questionSet: QuestionSet = {
  schemaVersion: 1,
  questionSetRevision: 1,
  questions: [
    {
      id: 'q1',
      revision: 1,
      origin: 'authorial',
      prompt: 'Q1',
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
      ],
      correctOptionId: 'a',
      explanation: 'A',
    },
  ],
};
const syncQuestionSet: SyncQuestionSet = {
  ...questionSet,
  questions: questionSet.questions.map(({ origin: _origin, ...question }) => question),
};
const catalog = {
  schemaVersion: 1,
  subjects: [{ contestStorageId: 'tse', subjectStorageId: 'portugues', questionSet: syncQuestionSet }],
};
const profileDocId = profileDocumentId(profileId);
const answerKey = 'tse--portugues';
const preferencesId = buildPreferencesDocumentId(profileId);
const progressId = buildProgressDocumentId(profileId);

function installFetchMock(options: { profile?: { version: number; createdAt: string | null; json: unknown }; failPutOnce?: boolean } = {}) {
  let state = options.profile ? { ...options.profile } : null;
  let failed = false;
  const requests: Array<{ method: string; id: string; hasAuthorization: boolean }> = [];
  const fetchMock = vi.fn(async (input: string | URL | Request, init: RequestInit = {}) => {
    const url = String(input);
    if (url === '/sync-catalog.json') return Response.json(catalog);

    const method = init.method ?? 'GET';
    const id = decodeURIComponent(new URL(url).pathname.slice(1));
    expect(id).toBe(profileDocId);
    requests.push({
      method,
      id,
      hasAuthorization: new Headers(init.headers).has('Authorization'),
    });

    if (method === 'GET') {
      if (!state) return Response.json({ error: 'not found' }, { status: 404 });
      return Response.json({
        id,
        version: state.version,
        created_at: state.createdAt,
        updated_at: '2026-07-23T12:00:01.000Z',
        json: state.json,
      });
    }
    if (method === 'PUT') {
      if (options.failPutOnce && !failed) {
        failed = true;
        return Response.json({ error: 'failure' }, { status: 500 });
      }
      const nextVersion = (state?.version ?? 0) + 1;
      state = {
        version: nextVersion,
        createdAt: state?.createdAt ?? '2026-07-23T12:00:00.000Z',
        json: JSON.parse(String(init.body)),
      };
      return Response.json({
        id,
        version: nextVersion,
        created_at: state.createdAt,
        updated_at: '2026-07-23T12:00:01.000Z',
        json: state.json,
      });
    }
    return Response.json({ error: 'method not allowed' }, { status: 405 });
  });
  vi.stubGlobal('fetch', fetchMock);
  return { requests };
}

async function seedPendingProfile(): Promise<void> {
  const { saveSharedDocument, saveAnswerDocumentSnapshot } = await import('../../src/lib/offline-db');
  await saveSharedDocument(
    'preferences',
    profileId,
    { ...DEFAULT_PREFERENCES, questionLayout: 'ten' },
    ['questionLayout'],
  );
  const answer = createEmptyAnswerDocument(1);
  answer.answers.q1 = { optionId: 'a', questionRevision: 1 };
  await saveAnswerDocumentSnapshot({
    profileId,
    documentId: `concursos--${profileId}--tse--portugues`,
    document: answer,
    dirtyQuestionIds: ['q1'],
  });
  await saveSharedDocument(
    'progress',
    profileId,
    {
      schemaVersion: 1,
      subjects: {
        [answerKey]: { answered: 1, total: 1, submitted: false, questionSetRevision: 1, answerVersion: 0 },
      },
    },
    [answerKey],
  );
}

beforeEach(async () => {
  const { deleteOfflineDatabase: del, } = await import('../../src/lib/offline-db');
  const { invalidateRemoteProfileCache } = await import('../../src/lib/sync');
  invalidateRemoteProfileCache();
  await del();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('alias profile preflight (perfil consolidado)', () => {
  it('adopts the consolidated remote profile in a single GET and resolves ties', async () => {
    const remoteAnswer = createEmptyAnswerDocument(1);
    remoteAnswer.answers.q1 = { optionId: 'a', questionRevision: 1 };
    const { requests } = installFetchMock({
      profile: {
        version: 9,
        createdAt: '2026-07-23T12:00:00.000Z',
        json: {
          schemaVersion: 1,
          answers: { [answerKey]: remoteAnswer },
          preferences: { ...DEFAULT_PREFERENCES, questionLayout: 'all' },
          progresso: {
            schemaVersion: 1,
            subjects: {
              [answerKey]: { answered: 1, total: 1, submitted: false, questionSetRevision: 1, answerVersion: 3 },
            },
          },
        },
      },
    });

    await expect(prepareProfileAlias(profileId)).resolves.toEqual({ remoteDocumentCount: 3 });
    // Uma única leitura remota alimenta a adoção; a rematerialização do
    // progresso publica uma vez e a confirmação consolidada alinha TODAS as
    // seções na versão final do perfil.
    expect(requests.filter(({ method }) => method === 'GET')).toHaveLength(1);
    expect(requests.filter(({ method }) => method === 'PUT')).toHaveLength(1);
    expect(await getSharedDocumentRecord('preferences', profileId)).toMatchObject({
      remoteVersion: 10,
      outboxState: 'clean',
    });
    expect(await getLocalAnswerRecord(`concursos--${profileId}--tse--portugues`)).toMatchObject({
      current: remoteAnswer,
      remoteVersion: 10,
      outboxState: 'clean',
    });
    expect(await getSharedDocumentRecord('progress', profileId)).toMatchObject({
      remoteVersion: 10,
      outboxState: 'clean',
    });

    // Empate limpo com estado já normalizado: nova execução não escreve nada.
    requests.length = 0;
    await expect(prepareProfileAlias(profileId)).resolves.toEqual({ remoteDocumentCount: 3 });
    expect(requests.map(({ method }) => method)).toEqual(['GET']);
  }, 15_000);

  it('publishes pending sections as ordered full-document PUTs', async () => {
    const { requests } = installFetchMock({
      profile: {
        version: 9,
        createdAt: '2026-07-23T12:00:00.000Z',
        json: {
          schemaVersion: 1,
          answers: {},
          preferences: { ...DEFAULT_PREFERENCES, questionLayout: 'all' },
        },
      },
    });
    await prepareProfileAlias(profileId);

    const { saveSharedDocument, saveAnswerDocumentSnapshot } = await import('../../src/lib/offline-db');
    await saveSharedDocument(
      'preferences',
      profileId,
      { ...DEFAULT_PREFERENCES, questionLayout: 'ten' },
      ['questionLayout'],
    );
    const pendingAnswer = createEmptyAnswerDocument(1);
    pendingAnswer.answers.q1 = { optionId: 'b', questionRevision: 1 };
    await saveAnswerDocumentSnapshot({
      profileId,
      documentId: `concursos--${profileId}--tse--portugues`,
      document: pendingAnswer,
      dirtyQuestionIds: ['q1'],
    });
    await saveSharedDocument('progress', profileId, { schemaVersion: 1, subjects: {} }, [answerKey]);

    requests.length = 0;
    await expect(prepareProfileAlias(profileId)).resolves.toEqual({ remoteDocumentCount: 1 });
    expect(requests.map(({ method, id }) => `${method} ${id}`)).toEqual([
      `GET ${profileDocId}`,
      `PUT ${profileDocId}`,
      `PUT ${profileDocId}`,
      `PUT ${profileDocId}`,
    ]);
    expect(await getSharedDocumentRecord('preferences', profileId)).toMatchObject({
      current: { questionLayout: 'ten' },
      remoteVersion: 12,
      outboxState: 'clean',
    });
    expect(await getLocalAnswerRecord(`concursos--${profileId}--tse--portugues`)).toMatchObject({
      current: pendingAnswer,
      remoteVersion: 12,
      outboxState: 'clean',
    });
    expect(await getSharedDocumentRecord('progress', profileId)).toMatchObject({
      remoteVersion: 12,
      outboxState: 'clean',
    });
  }, 15_000);

  it('adopts a remote studied section without writing', async () => {
    const { requests } = installFetchMock({
      profile: {
        version: 5,
        createdAt: '2026-07-23T12:00:00.000Z',
        json: {
          schemaVersion: 1,
          answers: {},
          estudados: {
            schemaVersion: 1,
            studiedSubjectIds: [answerKey],
            updatedAt: '2026-07-23T12:00:00.000Z',
          },
        },
      },
    });

    await expect(prepareProfileAlias(profileId)).resolves.toEqual({ remoteDocumentCount: 1 });
    expect(requests.map(({ method }) => method)).toEqual(['GET']);
    expect(await getSharedDocumentRecord('estudados', profileId)).toMatchObject({
      remoteVersion: 5,
      outboxState: 'clean',
      current: { studiedSubjectIds: [answerKey] },
    });
  }, 10_000);

  it('adopts remote reading-preferences without writing', async () => {
    const { requests } = installFetchMock({
      profile: {
        version: 7,
        createdAt: '2026-07-23T12:00:00.000Z',
        json: {
          schemaVersion: 1,
          answers: {},
          leitura: {
            schemaVersion: 1,
            fontFamily: 'atkinson',
            fontSize: 22,
            lineHeight: 1.8,
            contentWidth: 68,
            horizontalSpacing: 12,
            colorScheme: 'sepia',
          },
        },
      },
    });

    await expect(prepareProfileAlias(profileId)).resolves.toEqual({ remoteDocumentCount: 1 });
    expect(requests.every(({ hasAuthorization }) => !hasAuthorization)).toBe(true);
    expect(await getSharedDocumentRecord('leitura', profileId)).toMatchObject({
      remoteVersion: 7,
      outboxState: 'clean',
      current: { fontFamily: 'atkinson', colorScheme: 'sepia' },
    });
  }, 10_000);

  it('leaves a completely new alias empty after the read-only preflight', async () => {
    const { requests } = installFetchMock();

    await expect(prepareProfileAlias(profileId)).resolves.toEqual({ remoteDocumentCount: 0 });
    expect(requests.map(({ method }) => method)).toEqual(['GET']);
    expect(await getSharedDocumentRecord('preferences', profileId)).toBeUndefined();
  }, 10_000);

  it('waits for transient lease contention before the single GET', async () => {
    const { acquireSyncLease, releaseSyncLease } = await import('../../src/lib/offline-db');
    const owner = 'other-tab';
    const { requests } = installFetchMock();
    await expect(acquireSyncLease('answer-sync', owner, 30_000)).resolves.toBe(true);

    const preparation = prepareProfileAlias(profileId);
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(requests).toEqual([]);
    await releaseSyncLease('answer-sync', owner);

    await expect(preparation).resolves.toEqual({ remoteDocumentCount: 0 });
    expect(requests.map(({ method }) => method)).toEqual(['GET']);
  }, 10_000);

  it('adopts a newer comparable remote over a pending local section', async () => {
    // Linhagem limpa primeiro (v1 'single'); só então a edição local pendente
    // compete com um remoto comparável mais novo — que deve prevalecer.
    const { requests } = installFetchMock({
      profile: {
        version: 1,
        createdAt: '2026-07-23T12:00:00.000Z',
        json: {
          schemaVersion: 1,
          answers: {},
          preferences: { ...DEFAULT_PREFERENCES, questionLayout: 'single' },
        },
      },
    });
    await prepareProfileAlias(profileId);
    const { saveSharedDocument } = await import('../../src/lib/offline-db');
    await saveSharedDocument(
      'preferences',
      profileId,
      { ...DEFAULT_PREFERENCES, questionLayout: 'ten' },
      ['questionLayout'],
    );

    // Atualiza o perfil remoto para uma versão mais nova com preferências distintas.
    vi.stubGlobal('fetch', vi.fn(async (input: string | URL | Request, init: RequestInit = {}) => {
      const url = String(input);
      if (url === '/sync-catalog.json') return Response.json(catalog);
      const method = init.method ?? 'GET';
      if (method === 'GET') {
        return Response.json({
          id: profileDocId,
          version: 2,
          created_at: '2026-07-23T12:00:00.000Z',
          updated_at: '2026-07-23T12:00:01.000Z',
          json: {
            schemaVersion: 1,
            answers: {},
            preferences: { ...DEFAULT_PREFERENCES, questionLayout: 'all' },
          },
        });
      }
      return Response.json({ error: 'unexpected' }, { status: 405 });
    }));

    requests.length = 0;
    await prepareProfileAlias(profileId);
    expect(requests.some(({ method }) => method === 'PUT')).toBe(false);
    expect(await getSharedDocumentRecord('preferences', profileId)).toMatchObject({
      current: { questionLayout: 'all' },
      remoteVersion: 2,
      outboxState: 'clean',
    });
  }, 15_000);

  it('publishes a valid pending section without known remote lineage', async () => {
    await seedPendingProfile();
    const { requests } = installFetchMock({
      profile: {
        version: 5,
        createdAt: '2026-07-23T12:00:00.000Z',
        json: {
          schemaVersion: 1,
          answers: {},
          preferences: { ...DEFAULT_PREFERENCES, questionLayout: 'all' },
        },
      },
    });

    await prepareProfileAlias(profileId);
    expect(requests.some(({ method }) => method === 'PUT')).toBe(true);
    expect(await getSharedDocumentRecord('preferences', profileId)).toMatchObject({
      current: { questionLayout: 'ten' },
      outboxState: 'clean',
      conflictWarning: expect.stringContaining('sem linhagem local conhecida'),
    });
  }, 15_000);

  it('applies nothing when the lease expires during the preflight callback', async () => {
    const now = Date.now();
    const { requests } = installFetchMock({
      profile: {
        version: 2,
        createdAt: '2026-07-23T12:00:00.000Z',
        json: {
          schemaVersion: 1,
          answers: {},
          preferences: { ...DEFAULT_PREFERENCES, questionLayout: 'all' },
        },
      },
    });

    await expect(
      prepareProfileAlias(profileId, {
        onPreflightComplete: () => {
          vi.spyOn(Date, 'now').mockReturnValue(now + 60_000);
        },
      }),
    ).rejects.toThrow('Outra aba assumiu a coordenação da sincronização');
    expect(requests.map(({ method }) => method)).toEqual(['GET']);
    expect(await getSharedDocumentRecord('preferences', profileId)).toBeUndefined();
  }, 10_000);

  it('finishes the remote read before publishing in dependency order', async () => {
    await seedPendingProfile();
    const { requests } = installFetchMock();

    await expect(
      prepareProfileAlias(profileId, {
        onPreflightComplete: (result) => {
          expect(result.remoteDocumentCount).toBe(0);
          expect(requests.map(({ method }) => method)).toEqual(['GET']);
        },
      }),
    ).resolves.toEqual({ remoteDocumentCount: 0 });

    expect(requests.map(({ method, id }) => `${method} ${id}`)).toEqual([
      `GET ${profileDocId}`,
      `PUT ${profileDocId}`,
      `PUT ${profileDocId}`,
      `PUT ${profileDocId}`,
    ]);
    expect(requests.every(({ hasAuthorization }) => !hasAuthorization)).toBe(true);
    expect(await getSharedDocumentRecord('preferences', profileId)).toMatchObject({
      remoteVersion: 3,
      outboxState: 'clean',
    });
    expect(await getLocalAnswerRecord(`concursos--${profileId}--tse--portugues`)).toMatchObject({
      remoteVersion: 3,
      outboxState: 'clean',
    });
    expect(await getSharedDocumentRecord('progress', profileId)).toMatchObject({
      remoteVersion: 3,
      outboxState: 'clean',
    });
  }, 10_000);

  it('quarantines incompatible remote progress and performs no writes', async () => {
    const { requests } = installFetchMock({
      profile: {
        version: 2,
        createdAt: '2026-07-23T12:00:00.000Z',
        json: {
          schemaVersion: 1,
          answers: {},
          progresso: {
            schemaVersion: 1,
            subjects: {
              [answerKey]: { answered: 1, total: 1, submitted: false, questionSetRevision: 2, answerVersion: 1 },
            },
          },
        },
      },
    });

    await expect(prepareProfileAlias(profileId)).rejects.toThrow(
      'documento de progresso remoto usa a revisão editorial 2',
    );
    expect(requests.map(({ method }) => method)).toEqual(['GET']);
    const quarantined = await (await openOfflineDb()).getAll('quarantine');
    expect(quarantined).toHaveLength(1);
    expect(quarantined[0]).toMatchObject({ documentId: progressId });
  }, 10_000);

  it('keeps successful versions after a partial failure and converges on retry', async () => {
    await seedPendingProfile();
    const { requests } = installFetchMock({ failPutOnce: true });

    await expect(prepareProfileAlias(profileId)).rejects.toThrow('Falha HTTP no KV: 500');
    // A primeira publicação (preferências) falhou: nada foi marcado como limpo.
    expect(await getSharedDocumentRecord('preferences', profileId)).toMatchObject({
      outboxState: 'pending',
    });
    expect(requests.filter(({ method }) => method === 'PUT')).toHaveLength(1);

    // Nada foi publicado no run que falhou, então o preflight seguinte não
    // encontra seções remotas — e publica todas as pendências com sucesso.
    await expect(prepareProfileAlias(profileId)).resolves.toEqual({ remoteDocumentCount: 0 });
    expect(await getLocalAnswerRecord(`concursos--${profileId}--tse--portugues`)).toMatchObject({
      remoteVersion: expect.any(Number),
      outboxState: 'clean',
    });
    expect(await getSharedDocumentRecord('preferences', profileId)).toMatchObject({
      outboxState: 'clean',
    });
    expect(await getSharedDocumentRecord('progress', profileId)).toMatchObject({
      outboxState: 'clean',
    });
  }, 15_000);
});
