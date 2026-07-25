import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import 'fake-indexeddb/auto';
import {
  deleteOfflineDatabase,
  getLocalSimuladoRecord,
  getSharedDocumentRecord,
  markSharedDocumentSynced,
  markSimuladoSynced,
} from '../../src/lib/offline-db';
import { buildSimuladoDocumentId } from '../../src/lib/identity';
import {
  buildSimuladoSummary,
  persistSimuladoDocument,
  saveSimuladoSummary,
  type SimuladoDocument,
} from '../../src/lib/simulados';
import { hasPendingSimulados } from '../../src/lib/simulados-runtime';

const profileId = 'simulados-runtime-2026';
const simulationId = '123e4567-e89b-42d3-a456-426614174000';
const documentId = buildSimuladoDocumentId(profileId, simulationId);
const timestamp = '2026-07-25T12:00:00.000Z';

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

beforeEach(async () => {
  await deleteOfflineDatabase();
});

afterEach(async () => {
  await deleteOfflineDatabase();
});

describe('runtime global de simulados', () => {
  it('acorda apenas enquanto detalhe ou índice estiverem pendentes', async () => {
    expect(await hasPendingSimulados(profileId)).toBe(false);

    const document = await persistSimuladoDocument(profileId, documentId, () => makeDocument());
    await saveSimuladoSummary(profileId, buildSimuladoSummary(document));
    expect(await hasPendingSimulados(profileId)).toBe(true);

    const detailRecord = await getLocalSimuladoRecord(documentId);
    await markSimuladoSynced({
      documentId,
      expectedLocalRevision: detailRecord!.localRevision,
      synchronizedDocument: document,
      remoteVersion: 1,
      remoteCreatedAt: timestamp,
      conflictWarning: null,
    });
    expect(await hasPendingSimulados(profileId)).toBe(true);

    const indexRecord = await getSharedDocumentRecord('simuladosIndex', profileId);
    await markSharedDocumentSynced({
      storeName: 'simuladosIndex',
      profileId,
      expectedLocalRevision: indexRecord!.localRevision,
      synchronizedDocument: indexRecord!.current,
      remoteVersion: 1,
      remoteCreatedAt: timestamp,
      conflictWarning: null,
    });
    expect(await hasPendingSimulados(profileId)).toBe(false);
  });
});
