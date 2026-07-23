import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import 'fake-indexeddb/auto';
import type { QuestionSet } from '../../src/lib/content-schema';
import {
  buildAnswerDocumentId,
  buildPreferencesDocumentId,
  buildProgressDocumentId,
} from '../../src/lib/identity';
import {
  deleteOfflineDatabase,
  getLocalAnswerRecord,
  getSharedDocumentRecord,
  openOfflineDb,
  saveAnswerDocumentSnapshot,
  saveSharedDocument,
} from '../../src/lib/offline-db';
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
const catalog = {
  schemaVersion: 1,
  subjects: [{ contestStorageId: 'tse', subjectStorageId: 'portugues', questionSet }],
};
const preferencesId = buildPreferencesDocumentId(profileId);
const answerId = buildAnswerDocumentId(profileId, 'tse', 'portugues');
const progressId = buildProgressDocumentId(profileId);

interface MockRemoteDocument {
  version: number;
  createdAt: string | null;
  json: unknown;
}

function installFetchMock(options: {
  remotes?: Map<string, MockRemoteDocument>;
  failPutOnce?: string;
} = {}) {
  const remotes = options.remotes ?? new Map<string, MockRemoteDocument>();
  const requests: Array<{ method: string; id: string; hasAuthorization: boolean }> = [];
  let failed = false;
  const fetchMock = vi.fn(async (input: string | URL | Request, init: RequestInit = {}) => {
    const url = String(input);
    if (url === '/sync-catalog.json') return Response.json(catalog);

    const method = init.method ?? 'GET';
    const id = decodeURIComponent(new URL(url).pathname.slice(1));
    requests.push({
      method,
      id,
      hasAuthorization: new Headers(init.headers).has('Authorization'),
    });
    const existing = remotes.get(id);
    if (method === 'GET') {
      if (!existing) return Response.json({ error: 'not found' }, { status: 404 });
      return Response.json({
        id,
        version: existing.version,
        created_at: existing.createdAt,
        updated_at: '2026-07-23T12:00:00.000Z',
        json: existing.json,
      });
    }
    if (method === 'PUT') {
      if (options.failPutOnce === id && !failed) {
        failed = true;
        return Response.json({ error: 'failure' }, { status: 500 });
      }
      const next = {
        version: (existing?.version ?? 0) + 1,
        createdAt: existing?.createdAt ?? '2026-07-23T12:00:00.000Z',
        json: JSON.parse(String(init.body)),
      };
      remotes.set(id, next);
      return Response.json({
        id,
        version: next.version,
        created_at: next.createdAt,
        updated_at: '2026-07-23T12:00:01.000Z',
        json: next.json,
      });
    }
    return Response.json({ error: 'method not allowed' }, { status: 405 });
  });
  vi.stubGlobal('fetch', fetchMock);
  return { remotes, requests };
}

async function seedPendingProfile(): Promise<void> {
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
    documentId: answerId,
    document: answer,
    dirtyQuestionIds: ['q1'],
  });
  await saveSharedDocument(
    'progress',
    profileId,
    {
      schemaVersion: 1,
      subjects: {
        'tse--portugues': {
          answered: 1,
          total: 1,
          submitted: false,
          questionSetRevision: 1,
          answerVersion: 0,
        },
      },
    },
    ['tse--portugues'],
  );
}

beforeEach(async () => {
  await deleteOfflineDatabase();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('alias profile preflight', () => {
  it('adopts a complete existing remote profile without rewriting equal progress', async () => {
    const remoteAnswer = createEmptyAnswerDocument(1);
    remoteAnswer.answers.q1 = { optionId: 'a', questionRevision: 1 };
    const remotes = new Map<string, MockRemoteDocument>([
      [
        preferencesId,
        {
          version: 4,
          createdAt: '2026-07-23T12:00:00.000Z',
          json: { ...DEFAULT_PREFERENCES, questionLayout: 'all' },
        },
      ],
      [
        answerId,
        {
          version: 3,
          createdAt: '2026-07-23T12:00:00.000Z',
          json: remoteAnswer,
        },
      ],
      [
        progressId,
        {
          version: 2,
          createdAt: '2026-07-23T12:00:00.000Z',
          json: {
            schemaVersion: 1,
            subjects: {
              'tse--portugues': {
                answered: 1,
                total: 1,
                submitted: false,
                questionSetRevision: 1,
                answerVersion: 3,
              },
            },
          },
        },
      ],
    ]);
    const { requests } = installFetchMock({ remotes });

    await expect(prepareProfileAlias(profileId)).resolves.toEqual({ remoteDocumentCount: 3 });
    expect(requests.map(({ method }) => method)).toEqual(['GET', 'GET', 'GET']);
    expect(await getSharedDocumentRecord('preferences', profileId)).toMatchObject({
      remoteVersion: 4,
      outboxState: 'clean',
    });
    expect(await getLocalAnswerRecord(answerId)).toMatchObject({
      current: remoteAnswer,
      remoteVersion: 3,
      outboxState: 'clean',
    });
    expect(await getSharedDocumentRecord('progress', profileId)).toMatchObject({
      remoteVersion: 2,
      outboxState: 'clean',
    });
  }, 10_000);

  it('leaves a completely new alias empty after the read-only preflight', async () => {
    const { requests } = installFetchMock();

    await expect(prepareProfileAlias(profileId)).resolves.toEqual({ remoteDocumentCount: 0 });
    expect(requests.map(({ method }) => method)).toEqual(['GET', 'GET', 'GET']);
    expect(await getSharedDocumentRecord('preferences', profileId)).toBeUndefined();
    expect(await getLocalAnswerRecord(answerId)).toBeUndefined();
    expect(await getSharedDocumentRecord('progress', profileId)).toBeUndefined();
  }, 10_000);

  it('finishes every remote read before publishing in dependency order', async () => {
    await seedPendingProfile();
    const { requests } = installFetchMock();

    await expect(
      prepareProfileAlias(profileId, {
        onPreflightComplete: (result) => {
          expect(result.remoteDocumentCount).toBe(0);
          expect(requests.map(({ method }) => method)).toEqual(['GET', 'GET', 'GET']);
        },
      }),
    ).resolves.toEqual({ remoteDocumentCount: 0 });

    expect(requests.map(({ method, id }) => `${method} ${id}`)).toEqual([
      `GET ${preferencesId}`,
      `GET ${answerId}`,
      `GET ${progressId}`,
      `PUT ${preferencesId}`,
      `PUT ${answerId}`,
      `PUT ${progressId}`,
    ]);
    expect(requests.every(({ hasAuthorization }) => !hasAuthorization)).toBe(true);
    expect(await getSharedDocumentRecord('preferences', profileId)).toMatchObject({
      remoteVersion: 1,
      outboxState: 'clean',
    });
    expect(await getLocalAnswerRecord(answerId)).toMatchObject({
      remoteVersion: 1,
      outboxState: 'clean',
    });
    expect(await getSharedDocumentRecord('progress', profileId)).toMatchObject({
      remoteVersion: 1,
      outboxState: 'clean',
    });
  }, 10_000);

  it('quarantines incompatible progress and performs no writes', async () => {
    const remotes = new Map<string, MockRemoteDocument>([
      [
        progressId,
        {
          version: 2,
          createdAt: '2026-07-23T12:00:00.000Z',
          json: {
            schemaVersion: 1,
            subjects: {
              'tse--portugues': {
                answered: 1,
                total: 1,
                submitted: false,
                questionSetRevision: 2,
                answerVersion: 1,
              },
            },
          },
        },
      ],
    ]);
    const { requests } = installFetchMock({ remotes });

    await expect(prepareProfileAlias(profileId)).rejects.toThrow(
      'documento de progresso remoto usa a revisão editorial 2',
    );
    expect(requests.map(({ method }) => method)).toEqual(['GET', 'GET', 'GET']);
    expect(requests.some(({ method }) => method === 'PUT')).toBe(false);
    const quarantined = await (await openOfflineDb()).getAll('quarantine');
    expect(quarantined).toHaveLength(1);
    expect(quarantined[0]).toMatchObject({ documentId: progressId });
  }, 10_000);

  it('keeps successful versions after a partial failure and converges on retry', async () => {
    await seedPendingProfile();
    const mock = installFetchMock({ failPutOnce: answerId });

    await expect(prepareProfileAlias(profileId)).rejects.toThrow('Falha HTTP no KV: 500');
    expect(await getSharedDocumentRecord('preferences', profileId)).toMatchObject({
      remoteVersion: 1,
      outboxState: 'clean',
    });
    expect(await getLocalAnswerRecord(answerId)).toMatchObject({
      remoteVersion: null,
      outboxState: 'pending',
    });
    expect(mock.requests.some(({ id, method }) => id === progressId && method === 'PUT')).toBe(false);

    await expect(prepareProfileAlias(profileId)).resolves.toEqual({ remoteDocumentCount: 1 });
    expect(await getLocalAnswerRecord(answerId)).toMatchObject({
      remoteVersion: 1,
      outboxState: 'clean',
    });
    expect(await getSharedDocumentRecord('progress', profileId)).toMatchObject({
      remoteVersion: 1,
      outboxState: 'clean',
    });
  }, 15_000);
});
