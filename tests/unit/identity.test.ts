import { beforeEach, describe, expect, it } from 'vitest';
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
import { deleteOfflineDatabase, saveAnswerDocumentSnapshot } from '../../src/lib/offline-db';
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

  it('requires explicit offline discard before switching a profile with pending data', async () => {
    values.set(ACTIVE_ALIAS_STORAGE_KEY, 'perfil-1a');
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-1a',
      documentId: buildAnswerDocumentId('perfil-1a', 'tse', 'portugues'),
      document: createEmptyAnswerDocument(1),
    });

    await expect(changeActiveAlias('perfil-2b', { online: false })).rejects.toMatchObject({
      reason: 'discard-required',
    });
    expect(values.get(ACTIVE_ALIAS_STORAGE_KEY)).toBe('perfil-1a');

    await changeActiveAlias('perfil-2b', { online: false, discardPending: true });
    expect(values.get(ACTIVE_ALIAS_STORAGE_KEY)).toBe('perfil-2b');
  });
});
