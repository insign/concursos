import type { PwaStatusDetail } from './pwa-update';

export type ApplicationStatusTone = 'green' | 'yellow' | 'orange' | 'red';
export type ApplicationStatusSource = 'none' | 'sync' | 'simulados' | 'navigation' | 'pwa' | 'download';

export interface DownloadStatusDetail {
  state: 'downloading' | 'success' | 'failed' | 'idle';
  percent?: number | null;
  message?: string | null;
}

export interface SyncStatusDetail {
  state: 'offline' | 'syncing' | 'synced' | 'error';
  message?: string;
  profileId?: string | null;
  source?: 'sync' | 'answers' | 'preferences' | 'progress' | 'studied' | 'reading' | 'simulados' | 'navigation';
}

interface StatusError {
  source: Exclude<ApplicationStatusSource, 'none'>;
  message: string;
  retryable: boolean;
  sequence: number;
}

interface StatusActivity {
  message: string;
  sequence: number;
}

type SyncTrackedSource = 'sync' | 'simulados' | 'navigation';

export interface ApplicationStatusState {
  online: boolean;
  profileId: string | null;
  sequence: number;
  syncActivities: Partial<Record<SyncTrackedSource, StatusActivity>>;
  syncErrors: Partial<Record<SyncTrackedSource, StatusError>>;
  pwaRevision: number;
  pwaActivity: string | null;
  pwaError: StatusError | null;
  downloadActivity: { message: string; percent: number | null; sequence: number } | null;
  downloadActive: boolean;
  downloadError: StatusError | null;
}

export type ApplicationStatusEvent =
  | { type: 'connectivity'; online: boolean }
  | { type: 'profile'; profileId: string | null }
  | { type: 'sync'; detail: SyncStatusDetail }
  | {
      type: 'profile-sync-result';
      source: 'simulados' | 'navigation';
      profileId: string;
      failures: number;
    }
  | { type: 'pwa'; detail: PwaStatusDetail }
  | { type: 'download'; detail: DownloadStatusDetail };

export interface ApplicationStatusView {
  tone: ApplicationStatusTone;
  state: 'idle' | 'busy' | 'offline' | 'error';
  source: ApplicationStatusSource;
  label: string;
  message: string | null;
  retry: 'sync' | 'profile' | 'navigation' | 'pwa' | null;
}

export function createApplicationStatusState(
  online = true,
  profileId: string | null = null,
): ApplicationStatusState {
  return {
    online,
    profileId,
    sequence: 0,
    syncActivities: {},
    syncErrors: {},
    pwaRevision: 0,
    pwaActivity: null,
    pwaError: null,
    downloadActivity: null,
    downloadActive: false,
    downloadError: null,
  };
}

function matchesProfile(state: ApplicationStatusState, profileId?: string | null): boolean {
  if (profileId === undefined || profileId === null) return true;
  return state.profileId !== null && profileId === state.profileId;
}

function pwaActivityMessage(detail: Exclude<PwaStatusDetail, { state: 'error' }>): string | null {
  if (detail.state === 'idle') return null;
  if (detail.state === 'update-found') return 'Atualização do aplicativo encontrada.';
  if (detail.state === 'waiting-for-durability') return 'Aguardando o salvamento dos dados locais.';
  if (detail.state === 'activating') return 'Atualizando o aplicativo.';
  return 'Recarregando o aplicativo.';
}

export function reduceApplicationStatus(
  state: ApplicationStatusState,
  event: ApplicationStatusEvent,
): ApplicationStatusState {
  if (event.type === 'connectivity') return { ...state, online: event.online };
  if (event.type === 'profile') {
    return {
      ...state,
      profileId: event.profileId,
      syncActivities: {},
      syncErrors: {},
    };
  }

  if (event.type === 'sync') {
    if (!matchesProfile(state, event.detail.profileId)) return state;
    const source = event.detail.source === 'simulados' || event.detail.source === 'navigation'
      ? event.detail.source
      : 'sync';
    if (event.detail.state === 'error') {
      const sequence = state.sequence + 1;
      const syncActivities = { ...state.syncActivities };
      delete syncActivities[source];
      return {
        ...state,
        sequence,
        syncActivities,
        syncErrors: {
          ...state.syncErrors,
          [source]: {
            source,
            message: event.detail.message ?? 'Falha de sincronização.',
            retryable: true,
            sequence,
          },
        },
      };
    }
    if (event.detail.state === 'syncing') {
      const sequence = state.sequence + 1;
      const syncErrors = { ...state.syncErrors };
      delete syncErrors[source];
      return {
        ...state,
        sequence,
        syncActivities: {
          ...state.syncActivities,
          [source]: {
            message: event.detail.message ?? 'Sincronizando alterações locais.',
            sequence,
          },
        },
        syncErrors,
      };
    }
    if (event.detail.state === 'offline') {
      const syncActivities = { ...state.syncActivities };
      delete syncActivities[source];
      return { ...state, syncActivities };
    }
    const syncActivities = { ...state.syncActivities };
    const syncErrors = { ...state.syncErrors };
    delete syncActivities[source];
    delete syncErrors[source];
    return {
      ...state,
      syncActivities,
      syncErrors,
    };
  }

  if (event.type === 'profile-sync-result') {
    if (!matchesProfile(state, event.profileId)) return state;
    if (event.failures <= 0) {
      const syncErrors = { ...state.syncErrors };
      delete syncErrors[event.source];
      return {
        ...state,
        syncErrors,
      };
    }
    const sequence = state.sequence + 1;
    return {
      ...state,
      sequence,
      syncErrors: {
        ...state.syncErrors,
        [event.source]: {
          source: event.source,
          message: `${event.failures} operação(ões) de ${event.source} continuam pendentes.`,
          retryable: true,
          sequence,
        },
      },
    };
  }

  if (event.type === 'download') {
    const detail = event.detail;
    if (detail.state === 'idle') {
      return { ...state, downloadActivity: null, downloadActive: false, downloadError: null };
    }
    const sequence = state.sequence + 1;
    if (detail.state === 'downloading') {
      const percent = typeof detail.percent === 'number' ? Math.max(0, Math.min(100, Math.round(detail.percent))) : null;
      return {
        ...state,
        sequence,
        downloadActive: true,
        downloadError: null,
        downloadActivity: {
          message: percent === null ? 'Baixando conteúdo offline…' : `Baixando conteúdo offline… ${percent}%`,
          percent,
          sequence,
        },
      };
    }
    if (detail.state === 'success') {
      return {
        ...state,
        sequence,
        downloadError: null,
        downloadActivity: { message: 'Conteúdo offline atualizado.', percent: null, sequence },
      };
    }
    return {
      ...state,
      sequence,
      downloadActivity: null,
      downloadError: {
        source: 'download',
        message: detail.message ?? 'Falha no download offline.',
        retryable: false,
        sequence,
      },
    };
  }

  const pwaRevision = event.detail.revision ?? state.pwaRevision + 1;
  if (pwaRevision < state.pwaRevision) return state;
  if (event.detail.state === 'error') {
    const sequence = state.sequence + 1;
    return {
      ...state,
      sequence,
      pwaRevision,
      pwaActivity: null,
      pwaError: {
        source: 'pwa',
        message: event.detail.message,
        retryable: event.detail.retryable,
        sequence,
      },
    };
  }

  return {
    ...state,
    pwaRevision,
    pwaActivity: pwaActivityMessage(event.detail),
    pwaError: null,
  };
}

export function deriveApplicationStatus(state: ApplicationStatusState): ApplicationStatusView {
  // Download em andamento é o estado mais imediato para o usuário: aparece
  // mesmo com erros antigos pendentes, que voltam a aparecer quando ele acaba.
  if (state.downloadActive && state.downloadActivity) {
    return {
      tone: 'yellow',
      state: 'busy',
      source: 'download',
      label: 'Download offline',
      message: state.downloadActivity.message,
      retry: null,
    };
  }
  const error = [...Object.values(state.syncErrors), state.downloadError, state.pwaError]
    .filter((candidate): candidate is StatusError => candidate != null)
    .sort((left, right) => right.sequence - left.sequence)[0];
  if (error) {
    const retry = !error.retryable
      ? null
      : error.source === 'pwa'
        ? 'pwa'
        : error.source === 'simulados'
          ? 'profile'
          : error.source === 'navigation'
            ? 'navigation'
            : 'sync';
    return {
      tone: 'red',
      state: 'error',
      source: error.source,
      label: error.source === 'pwa'
        ? 'Falha na atualização'
        : error.source === 'download'
          ? 'Falha no download offline'
          : 'Falha de sincronização',
      message: error.message,
      retry,
    };
  }
  if (!state.online) {
    return {
      tone: 'orange',
      state: 'offline',
      source: 'none',
      label: 'Offline',
      message: 'Os dados locais continuam disponíveis.',
      retry: null,
    };
  }
  if (state.downloadActivity) {
    return {
      tone: 'yellow',
      state: 'busy',
      source: 'download',
      label: 'Download offline',
      message: state.downloadActivity.message,
      retry: null,
    };
  }
  if (state.pwaActivity) {
    return {
      tone: 'yellow',
      state: 'busy',
      source: 'pwa',
      label: 'Atualizando aplicativo',
      message: state.pwaActivity,
      retry: null,
    };
  }
  const syncActivity = Object.entries(state.syncActivities)
    .filter((entry): entry is [SyncTrackedSource, StatusActivity] => entry[1] !== undefined)
    .sort((left, right) => right[1].sequence - left[1].sequence)[0];
  if (syncActivity) {
    return {
      tone: 'yellow',
      state: 'busy',
      source: syncActivity[0],
      label: 'Sincronizando',
      message: syncActivity[1].message,
      retry: null,
    };
  }
  return {
    tone: 'green',
    state: 'idle',
    source: 'none',
    label: 'Online',
    message: null,
    retry: null,
  };
}
