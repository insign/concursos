import { getSharedDocumentRecord, listPendingSimuladoRecords } from './offline-db';

export async function hasPendingSimulados(profileId: string): Promise<boolean> {
  const [pendingDetails, index] = await Promise.all([
    listPendingSimuladoRecords(profileId),
    getSharedDocumentRecord('simuladosIndex', profileId),
  ]);
  return pendingDetails.length > 0 || index?.outboxState === 'pending';
}
