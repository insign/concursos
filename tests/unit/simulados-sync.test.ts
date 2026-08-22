import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import 'fake-indexeddb/auto';

vi.mock('../../src/lib/kv-client', () => ({
  readKv: vi.fn(),
  writeKv: vi.fn(),
}));

import {
  deleteOfflineDatabase,
  getSharedDocumentRecord,
  saveSharedDocument,
} from '../../src/lib/offline-db';
import {
  buildSimuladoDocumentId,
  buildSimuladosIndexDocumentId,
} from '../../src/lib/identity';
import { readKv, writeKv, type KvEnvelope } from '../../src/lib/kv-client';
import { profileDocumentId } from '../../src/lib/profile-document';
import {
  buildSimuladoSummary,
  loadSimuladosIndex,
  persistSimuladoDocument,
  saveSimuladoSummary,
  type SimuladoDocument,
  type SimuladosIndex,
} from '../../src/lib/simulados';
import {
  resolveSimuladosVersionAction,
  synchronizePendingSimulados,
  type SimuladosSyncHooks,
} from '../../src/lib/simulados-sync';

const profileId = 'simulados-sync-2026';
const simulationId = '123e4567-e89b-42d3-a456-426614174000';
const detailDocumentId = buildSimuladoDocumentId(profileId, simulationId);
const indexDocumentId = buildSimuladosIndexDocumentId(profileId);
const timestamp = '2026-07-25T12:00:00.000Z';
const profileDocId = profileDocumentId(profileId);

function profileEnvelope(
  version: number,
  sections: Record<string, unknown>,
): KvEnvelope<Record<string, unknown>> {
  return {
    id: profileDocId,
    version,
    created_at: timestamp,
    updated_at: timestamp,
    json: { schemaVersion: 1, answers: {}, ...sections },
  };
}

function isDetailPublish(value: unknown): boolean {
  const doc = value as { simuladosDetalhes?: Record<string, unknown> } | null;
  return Boolean(doc?.simuladosDetalhes && simulationId in doc.simuladosDetalhes);
}

function isIndexPublish(value: unknown): boolean {
  return (value as { simuladosIndice?: unknown } | null)?.simuladosIndice !== undefined;
}
const hooks: SimuladosSyncHooks = {
  ensureLease: async () => undefined,
  beforeRequest: async () => undefined,
};

describe('arbitragem de versão dos simulados', () => {
  it('adota remoto maior com linhagem e preserva pendência sem linhagem', () => {
    expect(
      resolveSimuladosVersionAction({ remoteVersion: 1, outboxState: 'pending' }, 2),
    ).toBe('adopt-remote');
    expect(
      resolveSimuladosVersionAction({ remoteVersion: null, outboxState: 'pending' }, 1),
    ).toBe('publish-local');
  });
});

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

describe('sincronização de simulados — ordem detalhe → índice (perfil consolidado)', () => {
  it('não publica o índice quando o PUT do documento detalhado falha', async () => {
    const document = await persistSimuladoDocument(profileId, detailDocumentId, () => makeDocument());
    await saveSimuladoSummary(profileId, buildSimuladoSummary(document));

    vi.mocked(writeKv).mockImplementation(async (_documentId, value) => {
      if (isDetailPublish(value)) throw new Error('Falha simulada no detalhe');
      return envelope(profileDocId, 1, value);
    });

    const result = await synchronizePendingSimulados(profileId, hooks);
    // O PUT consolidado carrega o perfil inteiro; a garantia é que a única
    // tentativa foi a do detalhe e que o índice permanece pendente.
    const writes = vi.mocked(writeKv).mock.calls.map(([, value]) => value);
    expect(writes.length).toBe(1);
    expect(isDetailPublish(writes[0])).toBe(true);
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
    // Stub com estado: o KV devolve sempre o último conteúdo gravado,
    // como o serviço real (versões monotônicas por PUT).
    let stored: { version: number; json: unknown } = {
      version: 3,
      json: profileEnvelope(3, { simuladosIndice: remoteIndex }).json,
    };
    vi.mocked(readKv).mockImplementation(async () =>
      stored ? envelope(profileDocId, stored.version, stored.json) : null,
    );
    vi.mocked(writeKv).mockImplementation(async (_documentId, value) => {
      stored = { version: stored.version + 1, json: value };
      return envelope(profileDocId, stored.version, value);
    });

    const result = await synchronizePendingSimulados(profileId, hooks);
    expect(result.failures).toBe(0);

    // No perfil consolidado a adoção do snapshot pode materializar a seção
    // índice localmente; a referência órfã é removida no passe seguinte,
    // quando o detalhe segue inexistente.
    await synchronizePendingSimulados(profileId, hooks);
    expect(vi.mocked(writeKv)).toHaveBeenCalled();
    const lastIndexWrite = vi.mocked(writeKv).mock.calls
      .map(([, value]) => value as { simuladosIndice?: SimuladosIndex })
      .filter(isIndexPublish)
      .at(-1);
    expect(lastIndexWrite?.simuladosIndice).toEqual({ schemaVersion: 1, simulados: [] });
    expect((await loadSimuladosIndex(profileId)).simulados).toEqual([]);
  });

  it('preserva o aviso sem linhagem ao reconciliar o índice em um segundo passe', async () => {
    await persistSimuladoDocument(profileId, detailDocumentId, () => makeDocument());
    await saveSharedDocument(
      'simuladosIndex',
      profileId,
      { schemaVersion: 1, simulados: [] },
      ['seed'],
    );

    let remoteIndexVersion = 5;
    let remoteIndex: SimuladosIndex = { schemaVersion: 1, simulados: [] };
    vi.mocked(readKv).mockImplementation(async () =>
      profileEnvelope(remoteIndexVersion, { simuladosIndice: remoteIndex }),
    );
    vi.mocked(writeKv).mockImplementation(async (_documentId, value) => {
      if (isIndexPublish(value)) {
        remoteIndexVersion += 1;
        remoteIndex = (value as { simuladosIndice: SimuladosIndex }).simuladosIndice;
        return envelope(profileDocId, remoteIndexVersion, value);
      }
      return envelope(profileDocId, 1, value);
    });

    await expect(synchronizePendingSimulados(profileId, hooks)).resolves.toMatchObject({
      failures: 0,
    });
    expect(vi.mocked(readKv).mock.calls.length).toBeGreaterThanOrEqual(2);
    expect(await getSharedDocumentRecord('simuladosIndex', profileId)).toMatchObject({
      outboxState: 'clean',
      // No perfil consolidado a versão é compartilhada entre seções; o aviso
      // de reconciliação permanece, mas reflete a arbitragem do perfil.
      conflictWarning: expect.any(String),
    });
  });
});
