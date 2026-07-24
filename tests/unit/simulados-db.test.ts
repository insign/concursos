import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import 'fake-indexeddb/auto';
import {
  deleteOfflineDatabase,
  getLocalSimuladoRecord,
  hasPendingOutbox,
  discardPendingProfile,
  listPendingSimuladoRecords,
  markSimuladoSynced,
  storeRemoteSimuladoDocument,
} from '../../src/lib/offline-db';
import { buildSimuladoDocumentId } from '../../src/lib/identity';
import {
  loadSimuladoDocument,
  loadSimuladosIndex,
  persistSimuladoDocument,
  saveSimuladoSummary,
  buildSimuladoSummary,
  type SimuladoDocument,
} from '../../src/lib/simulados';

const profileId = 'simulado-teste-2026';
const simulationId = '123e4567-e89b-12d3-a456-426614174000';
const documentId = buildSimuladoDocumentId(profileId, simulationId);

function makeDocument(): SimuladoDocument {
  return {
    schemaVersion: 1,
    simulationId,
    status: 'in_progress',
    createdAt: '2026-07-24T12:00:00.000Z',
    updatedAt: '2026-07-24T12:00:00.000Z',
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
        explanation: 'Porque sim.',
      },
    ],
    answers: {},
    result: null,
  };
}

beforeEach(async () => {
  await deleteOfflineDatabase();
});

afterEach(async () => {
  await deleteOfflineDatabase();
});

describe('persistência de simulados', () => {
  it('persiste e recarrega o documento detalhado como pendente', async () => {
    const saved = await persistSimuladoDocument(profileId, documentId, () => makeDocument());
    expect(saved.simulationId).toBe(simulationId);

    const loaded = await loadSimuladoDocument(documentId);
    expect(loaded?.simulationId).toBe(simulationId);

    const record = await getLocalSimuladoRecord(documentId);
    expect(record?.outboxState).toBe('pending');
    expect(record?.localRevision).toBe(1);
    expect(await hasPendingOutbox(profileId)).toBe(true);

    const pending = await listPendingSimuladoRecords(profileId);
    expect(pending).toHaveLength(1);
  });

  it('marca como sincronizado limpando a pendência', async () => {
    const saved = await persistSimuladoDocument(profileId, documentId, () => makeDocument());
    const record = await getLocalSimuladoRecord(documentId);
    await markSimuladoSynced({
      documentId,
      expectedLocalRevision: record!.localRevision,
      synchronizedDocument: saved,
      remoteVersion: 1,
      remoteCreatedAt: '2026-07-24T12:00:00.000Z',
      conflictWarning: null,
    });
    const after = await getLocalSimuladoRecord(documentId);
    expect(after?.outboxState).toBe('clean');
    expect(after?.remoteVersion).toBe(1);
    expect(await hasPendingOutbox(profileId)).toBe(false);
  });

  it('adota um documento remoto como limpo', async () => {
    const created = await storeRemoteSimuladoDocument({
      profileId,
      documentId,
      document: makeDocument(),
      remoteVersion: 3,
      remoteCreatedAt: '2026-07-24T12:00:00.000Z',
    });
    expect(created).toBe(true);
    const record = await getLocalSimuladoRecord(documentId);
    expect(record?.outboxState).toBe('clean');
    expect(record?.remoteVersion).toBe(3);
    expect(await hasPendingOutbox(profileId)).toBe(false);
  });

  it('guarda e recupera o índice do perfil', async () => {
    await persistSimuladoDocument(profileId, documentId, () => makeDocument());
    const doc = await loadSimuladoDocument(documentId);
    await saveSimuladoSummary(profileId, buildSimuladoSummary(doc!));

    const index = await loadSimuladosIndex(profileId);
    expect(index.simulados).toHaveLength(1);
    expect(index.simulados[0].id).toBe(simulationId);
    expect(index.simulados[0].correctCount).toBeNull();
  });

  it('descarta pendências do perfil (novo detalhado sem base + índice)', async () => {
    await persistSimuladoDocument(profileId, documentId, () => makeDocument());
    const doc = await loadSimuladoDocument(documentId);
    await saveSimuladoSummary(profileId, buildSimuladoSummary(doc!));
    expect(await hasPendingOutbox(profileId)).toBe(true);

    await discardPendingProfile(profileId);
    expect(await hasPendingOutbox(profileId)).toBe(false);
    // Documento novo (sem base) é removido; índice novo (sem base) é removido.
    expect(await loadSimuladoDocument(documentId)).toBeNull();
    expect((await loadSimuladosIndex(profileId)).simulados).toHaveLength(0);
  });
});
