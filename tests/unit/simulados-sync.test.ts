import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import 'fake-indexeddb/auto';

vi.mock('../../src/lib/kv-client', () => ({
  readKv: vi.fn(),
  writeKv: vi.fn(),
}));

import {
  deleteOfflineDatabase,
  getSharedDocumentRecord,
} from '../../src/lib/offline-db';
import {
  buildSimuladoDocumentId,
  buildSimuladosIndexDocumentId,
} from '../../src/lib/identity';
import { readKv, writeKv, type KvEnvelope } from '../../src/lib/kv-client';
import {
  buildSimuladoSummary,
  loadSimuladosIndex,
  persistSimuladoDocument,
  saveSimuladoSummary,
  type SimuladoDocument,
  type SimuladosIndex,
} from '../../src/lib/simulados';
import {
  synchronizePendingSimulados,
  type SimuladosSyncHooks,
} from '../../src/lib/simulados-sync';

const profileId = 'simulados-sync-2026';
const simulationId = '123e4567-e89b-42d3-a456-426614174000';
const detailDocumentId = buildSimuladoDocumentId(profileId, simulationId);
const indexDocumentId = buildSimuladosIndexDocumentId(profileId);
const timestamp = '2026-07-25T12:00:00.000Z';
const hooks: SimuladosSyncHooks = {
  ensureLease: async () => undefined,
  beforeRequest: async () => undefined,
};

function makeDocument(): SimuladoDocument {
  return {
    schemaVersion: 1,
    simulationId,
    status: 'in_progress',
    createdAt: timestamp,
    updatedAt: timestamp,
    completedAt: null,
    configuration: {
      contestStorageId: 'tcema-2026-adm',
      subjectStorageIds: ['portugues'],
      origin: 'all',
      questionCount: 1,
    },
    questions: [
      {
        contestStorageId: 'tcema-2026-adm',
        subjectStorageId: 'portugues',
        questionId: 'q1',
        questionRevision: 1,
        origin: 'previous_exam',
        prompt: 'Enunciado',
        options: [
          { id: 'a', text: 'A' },
          { id: 'b', text: 'B' },
        ],
        correctOptionId: 'a',
        explanation: 'Explicação.',
      },
    ],
    answers: {},
    result: null,
  };
}

function envelope<T>(id: string, version: number, json: T): KvEnvelope<T> {
  return {
    id,
    version,
    created_at: timestamp,
    updated_at: timestamp,
    json,
  };
}

beforeEach(async () => {
  vi.resetAllMocks();
  vi.mocked(readKv).mockResolvedValue(null);
  await deleteOfflineDatabase();
});

afterEach(async () => {
  await deleteOfflineDatabase();
});

describe('sincronização de simulados — ordem detalhe → índice', () => {
  it('não publica o índice quando o PUT do documento detalhado falha', async () => {
    const document = await persistSimuladoDocument(profileId, detailDocumentId, () => makeDocument());
    await saveSimuladoSummary(profileId, buildSimuladoSummary(document));

    vi.mocked(writeKv).mockImplementation(async (documentId, value) => {
      if (documentId === detailDocumentId) throw new Error('Falha simulada no detalhe');
      return envelope(documentId, 1, value);
    });

    const result = await synchronizePendingSimulados(profileId, hooks);
    const writtenIds = vi.mocked(writeKv).mock.calls.map(([documentId]) => documentId);
    expect(writtenIds).toEqual([detailDocumentId]);
    expect(writtenIds).not.toContain(indexDocumentId);
    expect(result.failures).toBeGreaterThan(0);
    expect((await getSharedDocumentRecord('simuladosIndex', profileId))?.outboxState).toBe(
      'pending',
    );
  });

  it('remove com segurança uma referência remota cujo detalhe não existe', async () => {
    const remoteIndex: SimuladosIndex = {
      schemaVersion: 1,
      simulados: [buildSimuladoSummary(makeDocument())],
    };
    vi.mocked(readKv).mockImplementation(async (documentId) =>
      documentId === indexDocumentId ? envelope(indexDocumentId, 3, remoteIndex) : null,
    );
    vi.mocked(writeKv).mockImplementation(async (documentId, value) =>
      envelope(documentId, 4, value),
    );

    const result = await synchronizePendingSimulados(profileId, hooks);
    expect(result.failures).toBe(0);
    expect(vi.mocked(writeKv)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(writeKv)).toHaveBeenCalledWith(
      indexDocumentId,
      { schemaVersion: 1, simulados: [] },
      expect.any(Object),
    );
    expect((await loadSimuladosIndex(profileId)).simulados).toEqual([]);
  });
});
