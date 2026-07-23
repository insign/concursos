import { beforeEach, describe, expect, it, vi } from 'vitest';
import 'fake-indexeddb/auto';
import {
  ACTIVE_ALIAS_STORAGE_KEY,
  buildAnswerDocumentId,
  buildPreferencesDocumentId,
  buildProgressDocumentId,
  changeActiveAlias,
  IdentityValidationError,
  validateUserAlias,
} from '../../src/lib/identity';
import {
  deleteOfflineDatabase,
  hasPendingOutbox,
  saveAnswerDocumentSnapshot,
} from '../../src/lib/offline-db';
import { createEmptyAnswerDocument } from '../../src/lib/questionnaire';

const values = new Map<string, string>();

beforeEach(async () => {
  values.clear();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => values.delete(key),
    },
  });
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { dispatchEvent: () => true },
  });
  await deleteOfflineDatabase();
});

describe('identity and remote IDs', () => {
  it('accepts the restricted grammar without normalizing input', () => {
    expect(validateUserAlias('marcos-7f3k')).toBe('marcos-7f3k');
    expect(() => validateUserAlias(' Marcos-7f3k ')).toThrow(IdentityValidationError);
    expect(() => validateUserAlias('a'.repeat(33))).toThrow(IdentityValidationError);
  });

  it('builds answer and global document IDs within the API budget', () => {
    expect(buildAnswerDocumentId('marcos-7f3k', 'tse', 'portugues')).toBe(
      'concursos--marcos-7f3k--tse--portugues',
    );
    expect(buildPreferencesDocumentId('marcos-7f3k')).toBe('concursos--marcos-7f3k--preferencias');
    expect(buildProgressDocumentId('marcos-7f3k')).toBe('concursos--marcos-7f3k--progresso');
    expect(() => buildAnswerDocumentId('alias', 'a'.repeat(21), 'assunto')).toThrow(IdentityValidationError);
  });

  it('prepares a first alias before committing it', async () => {
    const prepare = vi.fn(async (profileId: string) => {
      expect(profileId).toBe('perfil-2b');
      expect(values.get(ACTIVE_ALIAS_STORAGE_KEY)).toBeUndefined();
    });

    await expect(changeActiveAlias('perfil-2b', { online: true, prepare })).resolves.toBe(true);
    expect(prepare).toHaveBeenCalledOnce();
    expect(values.get(ACTIVE_ALIAS_STORAGE_KEY)).toBe('perfil-2b');
  });

  it('does not activate a new alias without an explicit preparation flow', async () => {
    await expect(changeActiveAlias('perfil-2b', { online: true })).rejects.toThrow(
      'A preparação segura do alias não foi configurada',
    );
    expect(values.get(ACTIVE_ALIAS_STORAGE_KEY)).toBeUndefined();
  });

  it('preserves an empty identity when first-alias preparation fails', async () => {
    await expect(
      changeActiveAlias('perfil-2b', {
        online: true,
        prepare: async () => {
          throw new Error('falha no preflight');
        },
      }),
    ).rejects.toThrow('falha no preflight');
    expect(values.get(ACTIVE_ALIAS_STORAGE_KEY)).toBeUndefined();
  });

  it('keeps an already active alias as a no-op', async () => {
    values.set(ACTIVE_ALIAS_STORAGE_KEY, 'perfil-2b');
    const prepare = vi.fn();

    await expect(changeActiveAlias('perfil-2b', { online: false, prepare })).resolves.toBe(false);
    expect(prepare).not.toHaveBeenCalled();
  });

  it('refuses offline linking without discarding pending data', async () => {
    values.set(ACTIVE_ALIAS_STORAGE_KEY, 'perfil-1a');
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-1a',
      documentId: buildAnswerDocumentId('perfil-1a', 'tse', 'portugues'),
      document: createEmptyAnswerDocument(1),
    });

    const prepare = vi.fn();
    await expect(
      changeActiveAlias('perfil-2b', { online: false, discardPending: true, prepare }),
    ).rejects.toMatchObject({
      reason: 'offline',
    });
    expect(values.get(ACTIVE_ALIAS_STORAGE_KEY)).toBe('perfil-1a');
    expect(await hasPendingOutbox('perfil-1a')).toBe(true);
    expect(prepare).not.toHaveBeenCalled();
  });

  it('defers an authorized discard until the target is prepared', async () => {
    values.set(ACTIVE_ALIAS_STORAGE_KEY, 'perfil-1a');
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-1a',
      documentId: buildAnswerDocumentId('perfil-1a', 'tse', 'portugues'),
      document: createEmptyAnswerDocument(1),
    });
    const prepare = vi.fn(async () => {
      expect(values.get(ACTIVE_ALIAS_STORAGE_KEY)).toBe('perfil-1a');
      expect(await hasPendingOutbox('perfil-1a')).toBe(true);
    });

    await changeActiveAlias('perfil-2b', {
      online: true,
      discardPending: true,
      prepare,
    });
    expect(values.get(ACTIVE_ALIAS_STORAGE_KEY)).toBe('perfil-2b');
    expect(await hasPendingOutbox('perfil-1a')).toBe(false);
  });

  it('requires synchronization or explicit discard for online pending data', async () => {
    values.set(ACTIVE_ALIAS_STORAGE_KEY, 'perfil-1a');
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-1a',
      documentId: buildAnswerDocumentId('perfil-1a', 'tse', 'portugues'),
      document: createEmptyAnswerDocument(1),
    });
    const synchronize = vi.fn(async () => undefined);
    const prepare = vi.fn();

    await expect(
      changeActiveAlias('perfil-2b', { online: true, synchronize, prepare }),
    ).rejects.toMatchObject({ reason: 'sync-required' });
    expect(synchronize).toHaveBeenCalledWith('perfil-1a');
    expect(prepare).not.toHaveBeenCalled();
    expect(values.get(ACTIVE_ALIAS_STORAGE_KEY)).toBe('perfil-1a');
  });

  it('preserves the active profile and pending data when preparation fails', async () => {
    values.set(ACTIVE_ALIAS_STORAGE_KEY, 'perfil-1a');
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-1a',
      documentId: buildAnswerDocumentId('perfil-1a', 'tse', 'portugues'),
      document: createEmptyAnswerDocument(1),
    });

    await expect(
      changeActiveAlias('perfil-2b', {
        online: true,
        discardPending: true,
        prepare: async () => {
          throw new Error('falha no preflight');
        },
      }),
    ).rejects.toThrow('falha no preflight');
    expect(values.get(ACTIVE_ALIAS_STORAGE_KEY)).toBe('perfil-1a');
    expect(await hasPendingOutbox('perfil-1a')).toBe(true);
  });

  it('does not overwrite an alias changed by another tab during preparation', async () => {
    values.set(ACTIVE_ALIAS_STORAGE_KEY, 'perfil-1a');

    await expect(
      changeActiveAlias('perfil-2b', {
        online: true,
        prepare: async () => {
          values.set(ACTIVE_ALIAS_STORAGE_KEY, 'perfil-3c');
        },
      }),
    ).rejects.toMatchObject({ reason: 'active-alias-changed' });
    expect(values.get(ACTIVE_ALIAS_STORAGE_KEY)).toBe('perfil-3c');
  });

  it('does not overwrite an alias changed while the authorized discard completes', async () => {
    values.set(ACTIVE_ALIAS_STORAGE_KEY, 'perfil-1a');
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-1a',
      documentId: buildAnswerDocumentId('perfil-1a', 'tse', 'portugues'),
      document: createEmptyAnswerDocument(1),
    });
    const prepare = async () => {
      const getItem = localStorage.getItem.bind(localStorage);
      let readsAfterPreparation = 0;
      localStorage.getItem = (key: string) => {
        readsAfterPreparation += 1;
        if (readsAfterPreparation === 3) values.set(ACTIVE_ALIAS_STORAGE_KEY, 'perfil-3c');
        return getItem(key);
      };
    };

    await expect(
      changeActiveAlias('perfil-2b', {
        online: true,
        discardPending: true,
        prepare,
      }),
    ).rejects.toMatchObject({ reason: 'active-alias-changed' });
    expect(values.get(ACTIVE_ALIAS_STORAGE_KEY)).toBe('perfil-3c');
    expect(await hasPendingOutbox('perfil-1a')).toBe(false);
  });
});
