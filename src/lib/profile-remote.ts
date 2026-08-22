import { readKv, writeKv, type KvRequestOptions } from './kv-client';
import {
  confirmProfileDocumentsSynced,
  getSharedDocumentRecord,
  listProfileAnswerRecords,
  listProfileSimuladoRecords,
  whenLocalWritesSettled,
} from './offline-db';
import { confirmNavigationSynced, getNavigationRecord } from './navigation-db';
import { parseProfileDocument, profileDocumentId, type ProfileDocument } from './profile-document';

export interface RemoteProfileSnapshot {
  version: number;
  created_at: string | null;
  updated_at: string | null;
  sections: ProfileDocument | null;
}

let cachedMeta: { alias: string; version: number; created_at: string | null } | null = null;

/** Metadados da última interação remota conhecida para o alias (para avisos). */
export function remoteProfileMeta(alias: string): { version: number; created_at: string | null } | null {
  return cachedMeta?.alias === alias
    ? { version: cachedMeta.version, created_at: cachedMeta.created_at }
    : null;
}

export function resetRemoteProfileCache(): void {
  cachedMeta = null;
}

/**
 * Lê o perfil consolidado inteiro em uma única requisição.
 */
export async function loadRemoteProfile(
  alias: string,
  options: KvRequestOptions = {},
): Promise<RemoteProfileSnapshot> {
  const envelope = await readKv(profileDocumentId(alias), options);
  const snapshot: RemoteProfileSnapshot = {
    version: envelope?.version ?? 0,
    created_at: envelope?.created_at ?? null,
    updated_at: envelope?.updated_at ?? null,
    sections: envelope ? parseOrEmpty(envelope.json) : null,
  };
  cachedMeta = { alias, version: snapshot.version, created_at: snapshot.created_at };
  return snapshot;
}

function parseOrEmpty(json: unknown): ProfileDocument | null {
  // Documentos de outras eras (sem retrocompat) são tratados como ausentes:
  // a ativação segue como perfil novo em vez de falhar.
  return parseProfileDocument(json);
}

async function assembleSectionsFromLocal(alias: string): Promise<ProfileDocument> {
  const [answers, preferences, estudados, leitura, progresso, simuladosIndex, simuladoRecords, navegacao] =
    await Promise.all([
      listProfileAnswerRecords(alias),
      getSharedDocumentRecord('preferences', alias),
      getSharedDocumentRecord('estudados', alias),
      getSharedDocumentRecord('leitura', alias),
      getSharedDocumentRecord('progress', alias),
      getSharedDocumentRecord('simuladosIndex', alias),
      listProfileSimuladoRecords(alias),
      getNavigationRecord(alias),
    ]);

  const prefix = `concursos--${alias}--`;
  const answerMap: Record<string, unknown> = {};
  for (const record of answers) {
    if (!record.current) continue;
    answerMap[record.documentId.slice(prefix.length)] = record.current;
  }

  const detalhes: Record<string, unknown> = {};
  for (const record of simuladoRecords) {
    if (!record.current) continue;
    const uuid = record.documentId.slice(prefix.length + 'simulado--'.length);
    detalhes[uuid] = record.current;
  }

  return {
    schemaVersion: 1,
    answers: answerMap,
    preferences: preferences?.current,
    estudados: estudados?.current,
    leitura: leitura?.current,
    progresso: progresso?.current,
    navegacao: navegacao?.current,
    simuladosIndice: simuladosIndex?.current,
    simuladosDetalhes: detalhes,
  } satisfies ProfileDocument;
}

/**
 * Publica uma seção do perfil montando o documento completo a partir do
 * IndexedDB (verdade compartilhada entre abas) e sobrepondo o conteúdo novo.
 * A API é last-write-wins por documento inteiro — aqui, o documento É o perfil.
 */
export async function publishProfileSection(
  alias: string,
  section: 'navegacao' | 'preferences' | 'estudados' | 'leitura' | 'progresso' | 'simuladosIndice',
  content: unknown,
  options?: KvRequestOptions,
): Promise<{ version: number; created_at: string | null }>;
export async function publishProfileSection(
  alias: string,
  section: 'simuladosDetalhes' | 'answers',
  content: Record<string, unknown>,
  options?: KvRequestOptions,
): Promise<{ version: number; created_at: string | null }>;
export async function publishProfileSection(
  alias: string,
  section: keyof Omit<ProfileDocument, 'schemaVersion'>,
  content: unknown,
  options: KvRequestOptions = {},
): Promise<{ version: number; created_at: string | null }> {
  // Drena escritas locais enfileiradas para que o blob reflita o estado
  // final e a confirmação pós-PUT não seja invalidada por stragglers.
  await whenLocalWritesSettled();
  const document = await assembleSectionsFromLocal(alias);

  if (section === 'answers' || section === 'simuladosDetalhes') {
    document[section] = { ...document[section], ...(content as Record<string, unknown>) };
  } else {
    document[section] = content;
  }

  const written = await writeKv(profileDocumentId(alias), document, options);
  cachedMeta = { alias, version: written.version, created_at: written.created_at };
  // O blob publicado incluiu verbatim o conteúdo atual de TODAS as seções:
  // confirma-as em conjunto na nova versão para eliminar defasagem cruzada.
  await confirmProfileDocumentsSynced(alias, written.version, written.created_at);
  await confirmNavigationSynced(alias, written.version, written.created_at);
  return { version: written.version, created_at: written.created_at };
}
