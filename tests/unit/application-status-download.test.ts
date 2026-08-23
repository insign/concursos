import { describe, expect, it } from 'vitest';
import {
  createApplicationStatusState,
  deriveApplicationStatus,
  reduceApplicationStatus,
} from '../../src/lib/application-status';

describe('application status — camada de download offline', () => {
  it('mostra busy com percentual durante o download', () => {
    let state = createApplicationStatusState(true, 'helio');
    state = reduceApplicationStatus(state, {
      type: 'download',
      detail: { state: 'downloading', percent: 37 },
    });
    const view = deriveApplicationStatus(state);
    expect(view).toMatchObject({
      tone: 'yellow',
      state: 'busy',
      source: 'download',
      label: 'Download offline',
      message: 'Baixando conteúdo offline… 37%',
    });
  });

  it('dá prioridade a erro de download sobre atividade de sync', () => {
    let state = createApplicationStatusState(true, 'helio');
    state = reduceApplicationStatus(state, {
      type: 'sync',
      detail: { state: 'syncing', source: 'sync', message: 'Sincronizando' },
    });
    state = reduceApplicationStatus(state, {
      type: 'download',
      detail: { state: 'failed', message: 'O navegador interrompeu o download offline.' },
    });
    expect(deriveApplicationStatus(state)).toMatchObject({
      tone: 'red',
      state: 'error',
      source: 'download',
      retry: null,
    });
  });

  it('sucesso vira flash e idle-timeout volta ao verde', () => {
    let state = createApplicationStatusState(true, 'helio');
    state = reduceApplicationStatus(state, {
      type: 'download',
      detail: { state: 'downloading', percent: 80 },
    });
    state = reduceApplicationStatus(state, { type: 'download', detail: { state: 'success' } });
    expect(deriveApplicationStatus(state)).toMatchObject({ state: 'busy', label: 'Download offline' });

    state = reduceApplicationStatus(state, { type: 'download', detail: { state: 'idle' } });
    expect(deriveApplicationStatus(state)).toMatchObject({ tone: 'green', state: 'idle' });
  });

  it('percentuais fora do intervalo são normalizados', () => {
    let state = createApplicationStatusState(true, 'helio');
    state = reduceApplicationStatus(state, {
      type: 'download',
      detail: { state: 'downloading', percent: 150 },
    });
    expect(deriveApplicationStatus(state).message).toContain('100%');
  });
});
