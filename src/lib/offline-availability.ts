export interface OfflineAvailabilityInput {
  hasRecord: boolean;
  recordManifestHash?: string;
  currentManifestHash?: string | null;
  cachePresent: boolean;
  recentFailureMessage?: string | null;
  orphanJobWithoutTransfer?: boolean;
}

export type OfflineAvailability =
  | { status: 'downloaded' }
  | { status: 'update-available' }
  | { status: 'ghost-package' }
  | { status: 'retry-advice'; message: string }
  | { status: 'not-downloaded' };

const ORPHAN_MESSAGE = 'Um download em segundo plano não foi concluído. Toque em Baixar novamente.';

export function evaluateOfflineAvailability(input: OfflineAvailabilityInput): OfflineAvailability {
  if (!input.hasRecord) {
    if (input.orphanJobWithoutTransfer) {
      return { status: 'retry-advice', message: input.recentFailureMessage ?? ORPHAN_MESSAGE };
    }
    if (input.recentFailureMessage) {
      return { status: 'retry-advice', message: input.recentFailureMessage };
    }
    return { status: 'not-downloaded' };
  }

  if (!input.cachePresent) {
    return { status: 'ghost-package' };
  }

  if (
    input.currentManifestHash !== null &&
    input.currentManifestHash !== undefined &&
    input.recordManifestHash !== undefined &&
    input.currentManifestHash !== input.recordManifestHash
  ) {
    return { status: 'update-available' };
  }

  return { status: 'downloaded' };
}
