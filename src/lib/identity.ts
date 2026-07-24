export const ACTIVE_ALIAS_STORAGE_KEY = 'concursos:active-alias';
export const ID_SEGMENT_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const USER_MAX_LENGTH = 32;
const CONTEST_MAX_LENGTH = 20;
const SUBJECT_MAX_LENGTH = 32;
const REMOTE_ID_MAX_LENGTH = 100;

export class IdentityValidationError extends Error {}

export type PendingProfileReason = 'sync-required';

export class PendingProfileChangeError extends Error {
  constructor(public readonly reason: PendingProfileReason) {
    super('Há alterações pendentes que precisam ser sincronizadas antes da troca');
  }
}

export type AliasConnectionReason = 'offline' | 'active-alias-changed';

export class AliasConnectionError extends Error {
  constructor(public readonly reason: AliasConnectionReason) {
    super(
      reason === 'offline'
        ? 'Conecte-se à internet para buscar e vincular este alias'
        : 'O alias ativo mudou em outra aba; revise o perfil atual e tente novamente',
    );
  }
}

function validateSegment(value: string, maximum: number, label: string): string {
  if (!value || value.length > maximum || !ID_SEGMENT_PATTERN.test(value)) {
    throw new IdentityValidationError(
      `${label} deve ter até ${maximum} caracteres e usar letras minúsculas, números e hífens simples`,
    );
  }
  return value;
}

function assertRemoteIdLength(id: string): string {
  if (id.length > REMOTE_ID_MAX_LENGTH) {
    throw new IdentityValidationError(`ID remoto excede ${REMOTE_ID_MAX_LENGTH} caracteres`);
  }
  return id;
}

export function validateUserAlias(alias: string): string {
  return validateSegment(alias, USER_MAX_LENGTH, 'Alias');
}

export function buildAnswerDocumentId(alias: string, contestStorageId: string, subjectStorageId: string): string {
  const user = validateUserAlias(alias);
  const contest = validateSegment(contestStorageId, CONTEST_MAX_LENGTH, 'ID de armazenamento do concurso');
  const subject = validateSegment(subjectStorageId, SUBJECT_MAX_LENGTH, 'ID de armazenamento do assunto');
  return assertRemoteIdLength(`concursos--${user}--${contest}--${subject}`);
}

export function buildPreferencesDocumentId(alias: string): string {
  return assertRemoteIdLength(`concursos--${validateUserAlias(alias)}--preferencias`);
}

export function buildProgressDocumentId(alias: string): string {
  return assertRemoteIdLength(`concursos--${validateUserAlias(alias)}--progresso`);
}

export function buildStudiedDocumentId(alias: string): string {
  return assertRemoteIdLength(`concursos--${validateUserAlias(alias)}--estudados`);
}

export function isAliasEasyToGuess(alias: string): boolean {
  return alias.length < 10 || !/\d/.test(alias) || !alias.includes('-');
}

export function getActiveAlias(): string | null {
  if (typeof localStorage === 'undefined') return null;
  const alias = localStorage.getItem(ACTIVE_ALIAS_STORAGE_KEY);
  if (!alias) return null;

  try {
    return validateUserAlias(alias);
  } catch {
    return null;
  }
}

export interface ChangeAliasOptions {
  discardPending?: boolean;
  online?: boolean;
  prepare?: (profileId: string) => Promise<unknown>;
  synchronize?: (profileId: string) => Promise<unknown>;
}

export async function changeActiveAlias(
  nextAlias: string,
  options: ChangeAliasOptions = {},
): Promise<boolean> {
  const validatedAlias = validateUserAlias(nextAlias);
  const currentAlias = getActiveAlias();
  if (currentAlias === validatedAlias) return false;

  const online = options.online ?? navigator.onLine;
  if (!online) throw new AliasConnectionError('offline');

  const assertActiveAliasUnchanged = () => {
    if (getActiveAlias() !== currentAlias) throw new AliasConnectionError('active-alias-changed');
  };

  const { discardPendingProfile, hasPendingOutbox } = await import('./offline-db');
  let hasPending = currentAlias ? await hasPendingOutbox(currentAlias) : false;
  assertActiveAliasUnchanged();

  if (currentAlias && hasPending && options.synchronize) {
    await options.synchronize(currentAlias);
    assertActiveAliasUnchanged();
    hasPending = await hasPendingOutbox(currentAlias);
    assertActiveAliasUnchanged();
  }

  if (hasPending && !options.discardPending) {
    throw new PendingProfileChangeError('sync-required');
  }

  if (!options.prepare) throw new Error('A preparação segura do alias não foi configurada');
  await options.prepare(validatedAlias);
  assertActiveAliasUnchanged();

  if (currentAlias) {
    hasPending = await hasPendingOutbox(currentAlias);
    assertActiveAliasUnchanged();
    if (hasPending && !options.discardPending) {
      throw new PendingProfileChangeError('sync-required');
    }
    if (hasPending) {
      await discardPendingProfile(currentAlias);
      assertActiveAliasUnchanged();
    }
  }

  assertActiveAliasUnchanged();
  localStorage.setItem(ACTIVE_ALIAS_STORAGE_KEY, validatedAlias);
  window.dispatchEvent(
    new CustomEvent('concursos:profile-changed', { detail: { previous: currentAlias, current: validatedAlias } }),
  );
  return true;
}
