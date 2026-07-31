import { describe, expect, it } from 'vitest';
import {
  createApplicationStatusState,
  deriveApplicationStatus,
  reduceApplicationStatus,
} from '../../src/lib/application-status';

describe('application status', () => {
  it('keeps online without an alias green and clears persistent sync success text', () => {
    let state = createApplicationStatusState(true, null);
    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'offline', message: 'Sem conexão.' },
    });
    expect(deriveApplicationStatus(state)).toMatchObject({ tone: 'green', message: null });

    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'synced', message: 'Alterações sincronizadas.' },
    });
    expect(deriveApplicationStatus(state)).toEqual({
      tone: 'green',
      state: 'idle',
      source: 'none',
      label: 'Online',
      message: null,
      retry: null,
    });
  });

  it('applies error, offline, activity and idle priority in that order', () => {
    let state = createApplicationStatusState(true, 'perfil-atual');
    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'syncing', message: 'Sincronizando.' },
    });
    expect(deriveApplicationStatus(state).tone).toBe('yellow');

    state = reduceApplicationStatus(state, { type: 'connectivity', online: false });
    expect(deriveApplicationStatus(state).tone).toBe('orange');

    state = reduceApplicationStatus(state, {
      type: 'pwa',
      detail: {
        state: 'error',
        phase: 'activation',
        message: 'Falha ao atualizar.',
        retryable: true,
      },
    });
    expect(deriveApplicationStatus(state)).toMatchObject({ tone: 'red', retry: 'pwa' });
  });

  it('keeps a relevant synchronization error above subsequent offline signals', () => {
    let state = createApplicationStatusState(true, 'perfil-atual');
    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'error', message: 'Falha pendente.' },
    });
    state = reduceApplicationStatus(state, { type: 'connectivity', online: false });
    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'offline', message: 'Sem conexão.' },
    });
    expect(deriveApplicationStatus(state)).toMatchObject({ tone: 'red', source: 'sync' });
  });

  it('gives PWA activity precedence over ordinary synchronization activity', () => {
    let state = createApplicationStatusState(true, 'perfil-atual');
    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'syncing', message: 'Sincronizando.' },
    });
    state = reduceApplicationStatus(state, {
      type: 'pwa',
      detail: { state: 'waiting-for-durability' },
    });
    expect(deriveApplicationStatus(state)).toMatchObject({
      tone: 'yellow',
      source: 'pwa',
      message: 'Aguardando o salvamento dos dados locais.',
    });
  });

  it('filters explicit stale profiles but accepts legacy sync events', () => {
    let state = createApplicationStatusState(true, 'perfil-atual');
    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'error', message: 'Erro antigo.', profileId: 'perfil-antigo' },
    });
    expect(deriveApplicationStatus(state).tone).toBe('green');

    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'error', message: 'Erro legado.' },
    });
    expect(deriveApplicationStatus(state)).toMatchObject({
      tone: 'red',
      source: 'sync',
      message: 'Erro legado.',
      retry: 'sync',
    });
  });

  it('turns matching simulated and navigation failure counts into relevant errors', () => {
    let state = createApplicationStatusState(true, 'perfil-atual');
    state = reduceApplicationStatus(state, {
      type: 'profile-sync-result',
      source: 'simulados',
      profileId: 'perfil-atual',
      failures: 2,
    });
    expect(deriveApplicationStatus(state)).toMatchObject({
      tone: 'red',
      source: 'simulados',
      retry: 'profile',
    });

    state = reduceApplicationStatus(state, {
      type: 'profile-sync-result',
      source: 'simulados',
      profileId: 'perfil-atual',
      failures: 0,
    });
    expect(deriveApplicationStatus(state).tone).toBe('green');

    state = reduceApplicationStatus(state, {
      type: 'profile-sync-result',
      source: 'navigation',
      profileId: 'perfil-atual',
      failures: 1,
    });
    expect(deriveApplicationStatus(state)).toMatchObject({
      source: 'navigation',
      retry: 'navigation',
    });
  });

  it('tracks concurrent sync sources without clearing unrelated activity or errors', () => {
    let state = createApplicationStatusState(true, 'perfil-atual');
    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'error', source: 'sync', message: 'Falha base.' },
    });
    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'error', source: 'navigation', message: 'Falha de navegação.' },
    });
    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'synced', source: 'navigation', message: 'Navegação pronta.' },
    });
    expect(deriveApplicationStatus(state)).toMatchObject({
      tone: 'red',
      source: 'sync',
      message: 'Falha base.',
    });

    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'syncing', source: 'sync', message: 'Sync base.' },
    });
    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'syncing', source: 'navigation', message: 'Sync navegação.' },
    });
    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'synced', source: 'navigation' },
    });
    expect(deriveApplicationStatus(state)).toMatchObject({
      tone: 'yellow',
      source: 'sync',
      message: 'Sync base.',
    });
  });

  it('retains the latest relevant error and clears profile-scoped state on profile change', () => {
    let state = createApplicationStatusState(true, 'perfil-atual');
    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'error', message: 'Erro de sync.' },
    });
    state = reduceApplicationStatus(state, {
      type: 'pwa',
      detail: {
        state: 'error',
        phase: 'registration',
        message: 'Erro de PWA.',
        retryable: false,
      },
    });
    expect(deriveApplicationStatus(state)).toMatchObject({ source: 'pwa', retry: null });

    state = reduceApplicationStatus(state, { type: 'profile', profileId: 'outro-perfil' });
    expect(deriveApplicationStatus(state).source).toBe('pwa');
  });

  it('ignores stale PWA lifecycle events after a newer registration error', () => {
    let state = createApplicationStatusState(true, null);
    state = reduceApplicationStatus(state, {
      type: 'pwa',
      detail: {
        state: 'error',
        phase: 'registration',
        message: 'Falha de registro.',
        retryable: true,
        revision: 2,
      },
    });
    state = reduceApplicationStatus(state, {
      type: 'pwa',
      detail: { state: 'activating', revision: 1 },
    });
    expect(deriveApplicationStatus(state)).toMatchObject({
      tone: 'red',
      source: 'pwa',
      message: 'Falha de registro.',
    });
  });
});
