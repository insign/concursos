import { buildNavigationContestDocumentId } from './identity';
import { readKv, readKvVersion, writeKv } from './kv-client';
import {
  adoptNavigationShard,
  getNavigationContestRecord,
  listNavigationContestRecords,
  listPendingNavigationContestRecords,
  markNavigationShardRemoteRejected,
  markNavigationShardSynced,
  markNavigationShardSyncError,
  saveNavigationShard,
  shouldDeferNavigationShardSync,
  whenNavigationWritesSettled,
  type LocalNavigationContestRecord,
} from './navigation-db';
import { isStudied, loadStudied, studiedSubjectId } from './studied';
import {
  clearContestPoint,
  contestDocumentsEqual,
  mergeContestDocuments,
  navigationContestDocumentSchema,
  normalizeContestDocument,
  resolveNavigationVersionAction,
  type NavigationContestDocument,
} from './navigation';
import { quarantineRemoteDocument } from './offline-db';

export interface NavigationSyncHooks {
  ensureLease: () => Promise<void>;
  beforeRequest: () => Promise<void>;
}

export interface RemoteNavigationContestDocument {
  contestStorageId: string;
  document: NavigationContestDocument;
  version: number;
  createdAt: string | null;
}

export interface NavigationPreflight {
  remotes: Map<string, RemoteNavigationContestDocument | null>;
  failed: string[];
}

export interface NavigationSyncResult {
  failures: number;
  remoteVersion: number | null;
  adoptedRemote: boolean;
}

const rejectedRemoteByContest = new Map<string, string>();

function remoteRejectionKey(version: number, createdAt: string | null): string {
  return `${createdAt ?? 'sem-data'}:${version}`;
}

function rejectionKey(profileId: string, contestStorageId: string): string {
  return `${profileId}--${contestStorageId}`;
}

function recreationWarning(
  record: LocalNavigationContestRecord,
  remoteVersion: number | null,
  remoteCreatedAt: string | null,
): string | null {
  if (record.remoteVersion === null && record.outboxState === 'pending' && remoteVersion !== null) {
    return 'Havia um documento remoto sem linhagem local conhecida; a pendência deste dispositivo prevaleceu.';
  }
  if (record.remoteVersion !== null && (remoteVersion === null || remoteVersion < record.remoteVersion)) {
    return 'A versão remota de navegação regrediu; o documento foi tratado como uma nova criação.';
  }
  if (record.remoteCreatedAt && remoteCreatedAt && record.remoteCreatedAt !== remoteCreatedAt) {
    return 'A data de criação remota da navegação mudou; o documento foi tratado como uma nova criação.';
  }
  return null;
}

async function parseRemoteContestNavigation(
  profileId: string,
  contestStorageId: string,
  documentId: string,
  envelope: Awaited<ReturnType<typeof readKv>>,
): Promise<RemoteNavigationContestDocument | null> {
  if (!envelope) return null;
  const key = rejectionKey(profileId, contestStorageId);
  const parsed = navigationContestDocumentSchema.safeParse(envelope.json);
  if (!parsed.success || parsed.data.contestStorageId !== contestStorageId) {
    const reason = 'Documento remoto de navegação inválido';
    const rejectionKeyValue = remoteRejectionKey(envelope.version, envelope.created_at);
    const repeatedInSession = rejectedRemoteByContest.get(key) === rejectionKeyValue;
    const firstLocalRejection = await markNavigationShardRemoteRejected(
      profileId,
      contestStorageId,
      envelope.version,
      envelope.created_at,
    );
    if (!repeatedInSession && firstLocalRejection) {
      await quarantineRemoteDocument({
        profileId,
        documentId,
        reason: `${reason} (versão ${envelope.version}, criação ${envelope.created_at ?? 'desconhecida'})`,
        value: envelope.json,
      });
    }
    rejectedRemoteByContest.set(key, rejectionKeyValue);
    throw new Error(reason);
  }

  rejectedRemoteByContest.delete(key);
  return {
    contestStorageId,
    document: normalizeContestDocument(parsed.data),
    version: envelope.version,
    createdAt: envelope.created_at,
  };
}

/** Concursos conhecidos: shards locais + catálogo estático (aparelho novo). */
let cachedCatalogContests: string[] | null = null;

async function catalogContestIds(): Promise<string[]> {
  if (cachedCatalogContests) return cachedCatalogContests;
  const contests: string[] = [];
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5_000);
    try {
      const response = await fetch('/navigation-catalog.json', {
        cache: 'no-store',
        signal: controller.signal,
      });
      if (response.ok) {
        const catalog = (await response.json()) as {
          routes?: Array<{ contestStorageId?: unknown }>;
        };
        for (const route of catalog.routes ?? []) {
          if (typeof route.contestStorageId === 'string' && route.contestStorageId) {
            contests.push(route.contestStorageId);
          }
        }
      }
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    // Sem catálogo: sincroniza apenas os concursos já conhecidos localmente.
  }
  const found = [...new Set(contests)].sort();
  // Só memoriza descoberta com conteúdo: catálogo vazio/falho tenta de novo.
  if (found.length > 0) cachedCatalogContests = found;
  return found;
}

async function discoverContestIds(profileId: string, currentContestStorageId?: string | null): Promise<string[]> {
  const known = new Set<string>();
  for (const record of await listNavigationContestRecords(profileId)) {
    known.add(record.contestStorageId);
  }
  // O concurso da página atual nunca depende do catálogo: é o mais relevante
  // para adoção e retomada imediata.
  if (currentContestStorageId) known.add(currentContestStorageId);
  for (const contestStorageId of await catalogContestIds()) known.add(contestStorageId);
  return [...known].sort();
}

/** Remove pontos de assuntos estudados; converte em invalidação publicável. */
async function filterStudiedSubjects(
  profileId: string,
  document: NavigationContestDocument,
): Promise<{ document: NavigationContestDocument; changed: boolean }> {
  const studied = await loadStudied(profileId);
  let result = document;
  let changed = false;
  for (const subjectStorageId of Object.keys(document.points)) {
    if (isStudied(studied, studiedSubjectId(document.contestStorageId, subjectStorageId))) {
      result = clearContestPoint(result, document.contestStorageId, subjectStorageId);
      changed = true;
    }
  }
  // Cursor de assunto estudado também é invalidado, mas só quando ainda há
  // posição a remover ou a lápide ainda não existe (idempotente: sem churn).
  const cursorSubject = result.cursor?.context.subjectStorageId ?? null;
  if (
    cursorSubject &&
    isStudied(studied, studiedSubjectId(document.contestStorageId, cursorSubject)) &&
    (result.cursor?.readingPosition !== null ||
      result.cleared[cursorSubject] === undefined ||
      result.cursor!.updatedAt > (result.cleared[cursorSubject] ?? ''))
  ) {
    result = clearContestPoint(result, document.contestStorageId, cursorSubject);
    changed = true;
  }
  return { document: result, changed };
}

async function synchronizeContest(
  profileId: string,
  contestStorageId: string,
  remote: RemoteNavigationContestDocument | null,
  hooks: NavigationSyncHooks,
): Promise<{ failures: number; remoteVersion: number | null; adoptedRemote: boolean }> {
  const documentId = buildNavigationContestDocumentId(profileId, contestStorageId);
  const record = await getNavigationContestRecord(profileId, contestStorageId);
  const action = resolveNavigationVersionAction(
    record ?? null,
    remote?.version ?? null,
    remote?.createdAt ?? null,
  );

  if (action === 'noop') {
    return {
      failures: 0,
      remoteVersion: remote?.version ?? record?.remoteVersion ?? null,
      adoptedRemote: false,
    };
  }

  if (action === 'adopt-remote' && remote) {
    const localPrev = record?.current ?? null;
    // Recriação remota com registro local limpo: adota o remoto sem reintroduzir
    // dados antigos (a recriação foi deliberada). Pendência local prevalece.
    const incarnationChanged =
      record !== undefined &&
      ((record.remoteCreatedAt !== null &&
        remote.createdAt !== null &&
        record.remoteCreatedAt !== remote.createdAt) ||
        (record.remoteVersion !== null && remote.version < record.remoteVersion));
    const deliberateRecreation = incarnationChanged && record?.outboxState === 'clean';
    const base = localPrev && !deliberateRecreation
      ? mergeContestDocuments(localPrev, remote.document)
      : remote.document;
    const { document: filtered, changed: studiedChanged } = await filterStudiedSubjects(profileId, base);
    const needsRepair =
      studiedChanged || !contestDocumentsEqual(filtered, remote.document);
    if (!needsRepair) {
      await markNavigationShardSynced({
        profileId,
        contestStorageId,
        expectedLocalRevision: record?.localRevision ?? 0,
        expectedRemoteVersion: record?.remoteVersion ?? null,
        expectedRemoteCreatedAt: record?.remoteCreatedAt ?? null,
        synchronizedDocument: remote.document,
        remoteVersion: remote.version,
        remoteCreatedAt: remote.createdAt,
        conflictWarning: record ? recreationWarning(record, remote.version, remote.createdAt) : null,
      });
      return { failures: 0, remoteVersion: remote.version, adoptedRemote: true };
    }
    // Reparo com publicação limitada na mesma passada (sem recursão): a união
    // é publicada uma vez; a próxima rodada converge por versão. Numa recriação
    // deliberada, substitui o shard sem mesclar a linhagem antiga.
    let latest: LocalNavigationContestRecord | undefined;
    if (deliberateRecreation) {
      latest = await adoptNavigationShard(profileId, contestStorageId, filtered, {
        localRevision: record?.localRevision ?? 0,
        remoteVersion: record?.remoteVersion ?? null,
        remoteCreatedAt: record?.remoteCreatedAt ?? null,
      });
      if (!latest) {
        // Captura concorrente: preserva o local e deixa o reparo para a próxima rodada.
        return { failures: 1, remoteVersion: record?.remoteVersion ?? null, adoptedRemote: false };
      }
    } else {
      // saveNavigationShard retorna undefined quando não há mudança local a gravar
      // (não é conflito): publica o estado vigente normalmente.
      await saveNavigationShard(profileId, contestStorageId, filtered);
      latest = await getNavigationContestRecord(profileId, contestStorageId);
      if (!latest) {
        return { failures: 1, remoteVersion: record?.remoteVersion ?? null, adoptedRemote: false };
      }
    }
    const toPublish = normalizeContestDocument(latest.current);
    await hooks.beforeRequest();
    await hooks.ensureLease();
    const repaired = await writeKv(documentId, toPublish, {
      beforeRetry: async () => {
        await hooks.ensureLease();
        const current = await getNavigationContestRecord(profileId, contestStorageId);
        return (
          current?.localRevision === latest.localRevision &&
          current?.remoteVersion === latest.remoteVersion &&
          current?.remoteCreatedAt === latest.remoteCreatedAt
        );
      },
    });
    await hooks.ensureLease();
    await markNavigationShardSynced({
      profileId,
      contestStorageId,
      expectedLocalRevision: latest.localRevision,
      expectedRemoteVersion: latest.remoteVersion,
      expectedRemoteCreatedAt: latest.remoteCreatedAt,
      synchronizedDocument: toPublish,
      remoteVersion: repaired.version,
      remoteCreatedAt: repaired.created_at,
      conflictWarning: record ? recreationWarning(record, remote.version, remote.createdAt) : null,
    });
    return { failures: 0, remoteVersion: repaired.version, adoptedRemote: true };
  }

  if (!record) {
    return { failures: 0, remoteVersion: remote?.version ?? null, adoptedRemote: false };
  }

  const mergedWithRemote = remote
    ? mergeContestDocuments(record.current, remote.document)
    : record.current;
  const { document: filtered } = await filterStudiedSubjects(profileId, mergedWithRemote);
  const local = normalizeContestDocument(filtered);
  await hooks.beforeRequest();
  await hooks.ensureLease();
  const written = await writeKv(documentId, local, {
    beforeRetry: async () => {
      await hooks.ensureLease();
      const latest = await getNavigationContestRecord(profileId, contestStorageId);
      return (
        latest?.localRevision === record.localRevision &&
        latest.remoteVersion === record.remoteVersion &&
        latest.remoteCreatedAt === record.remoteCreatedAt
      );
    },
  });
  await hooks.ensureLease();
  const expectedVersion = remote?.version ?? record.remoteVersion ?? 0;
  const warnings = [
    recreationWarning(record, remote?.version ?? null, remote?.createdAt ?? null),
    written.version > expectedVersion + 1
      ? 'Outra escrita de navegação ocorreu entre a leitura e a gravação; prevaleceu a última versão do KV.'
      : null,
  ].filter((warning): warning is string => Boolean(warning));

  await markNavigationShardSynced({
    profileId,
    contestStorageId,
    expectedLocalRevision: record.localRevision,
    expectedRemoteVersion: record.remoteVersion,
    expectedRemoteCreatedAt: record.remoteCreatedAt,
    synchronizedDocument: local,
    remoteVersion: written.version,
    remoteCreatedAt: written.created_at,
    conflictWarning: warnings.length > 0 ? warnings.join(' ') : null,
  });
  return { failures: 0, remoteVersion: written.version, adoptedRemote: false };
}

// O bootstrap só lê documentos remotos e, quando necessário, os adota no
// IndexedDB. Não publica a outbox e não ocupa o lease compartilhado além do
// necessário, evitando atrasar progresso, importação e simulados no primeiro paint.
export async function bootstrapNavigation(
  profileId: string,
  currentContestStorageId?: string | null,
): Promise<NavigationSyncResult> {
  await whenNavigationWritesSettled();
  let failures = 0;
  let remoteVersion: number | null = null;
  let adoptedRemote = false;
  // Leituras independentes em paralelo; adoção é por concurso.
  const results = await Promise.all(
    (await discoverContestIds(profileId, currentContestStorageId)).map(async (contestStorageId) => {
      const documentId = buildNavigationContestDocumentId(profileId, contestStorageId);
      try {
        // Respeita backoff por shard também no bootstrap.
        if (await shouldDeferNavigationShardSync(profileId, contestStorageId)) return null;
        const remote = await parseRemoteContestNavigation(
          profileId,
          contestStorageId,
          documentId,
          await readKv(documentId, { timeoutMs: 3_000, retries: 0 }),
        );
        const record = await getNavigationContestRecord(profileId, contestStorageId);
        const action = resolveNavigationVersionAction(
          record ?? null,
          remote?.version ?? null,
          remote?.createdAt ?? null,
        );
        // O bootstrap nunca publica: pendência local aguarda a sincronização coordenada.
        if (!remote || action !== 'adopt-remote') return null;
        const incarnationChanged =
          record !== undefined &&
          ((record.remoteCreatedAt !== null &&
            remote.createdAt !== null &&
            record.remoteCreatedAt !== remote.createdAt) ||
            (record.remoteVersion !== null && remote.version < record.remoteVersion));
        const deliberateRecreation = incarnationChanged && record?.outboxState === 'clean';
        const base = record && !deliberateRecreation
          ? mergeContestDocuments(record.current, remote.document)
          : remote.document;
        const { document: filtered, changed: studiedChanged } = await filterStudiedSubjects(
          profileId,
          base,
        );
        if (!studiedChanged && contestDocumentsEqual(filtered, remote.document)) {
          await markNavigationShardSynced({
            profileId,
            contestStorageId,
            expectedLocalRevision: record?.localRevision ?? 0,
            expectedRemoteVersion: record?.remoteVersion ?? null,
            expectedRemoteCreatedAt: record?.remoteCreatedAt ?? null,
            synchronizedDocument: filtered,
            remoteVersion: remote.version,
            remoteCreatedAt: remote.createdAt,
            conflictWarning: record ? recreationWarning(record, remote.version, remote.createdAt) : null,
          });
        } else if (deliberateRecreation) {
          await adoptNavigationShard(profileId, contestStorageId, filtered, {
            localRevision: record?.localRevision ?? 0,
            remoteVersion: record?.remoteVersion ?? null,
            remoteCreatedAt: record?.remoteCreatedAt ?? null,
          });
        } else {
          await saveNavigationShard(profileId, contestStorageId, filtered);
        }
        return remote.version;
      } catch {
        return 'failure' as const;
      }
    }),
  );
  for (const result of results) {
    if (result === 'failure') failures += 1;
    else if (result !== null) {
      remoteVersion = Math.max(remoteVersion ?? 0, result);
      adoptedRemote = true;
    }
  }
  return { failures, remoteVersion, adoptedRemote };
}

export async function readNavigationPreflight(
  profileId: string,
  hooks: NavigationSyncHooks,
  currentContestStorageId?: string | null,
): Promise<NavigationPreflight> {
  await hooks.ensureLease();
  await hooks.beforeRequest();
  await hooks.ensureLease();
  const remotes = new Map<string, RemoteNavigationContestDocument | null>();
  const failed: string[] = [];
  const contests = await discoverContestIds(profileId, currentContestStorageId);
  // Sondas de versão em paralelo (leituras independentes); escritas continuam seriais.
  // Falha isolada por concurso: um shard ilegível não bloqueia os demais.
  // O concurso atual sempre lê o envelope completo (recriação remota com mesma
  // versão só é detectável pelo created_at).
  await Promise.all(
    contests.map(async (contestStorageId) => {
      const documentId = buildNavigationContestDocumentId(profileId, contestStorageId);
      try {
        const record = await getNavigationContestRecord(profileId, contestStorageId);
        // Backoff por shard: não relê um concurso adiado (o apply o mantém pendente).
        if (record && (record.nextAttemptAt ?? 0) > Date.now()) return;
        await hooks.ensureLease();
        const fullRead =
          contestStorageId === currentContestStorageId ||
          !record ||
          record.outboxState !== 'clean' ||
          record.remoteVersion === null;
        if (!fullRead) {
          try {
            const version = await readKvVersion(documentId);
            if (version !== null && version.version === record.remoteVersion) {
              remotes.set(contestStorageId, null);
              return;
            }
          } catch {
            // Falha na sonda: faz a leitura completa abaixo.
          }
        }
        const envelope = await readKv(documentId, {
          beforeRetry: async () => {
            await hooks.ensureLease();
            return true;
          },
        });
        await hooks.ensureLease();
        remotes.set(
          contestStorageId,
          await parseRemoteContestNavigation(profileId, contestStorageId, documentId, envelope),
        );
      } catch {
        failed.push(contestStorageId);
      }
    }),
  );
  await hooks.ensureLease();
  return { remotes, failed };
}

export async function applyNavigationPreflight(
  profileId: string,
  preflight: NavigationPreflight,
  hooks: NavigationSyncHooks,
): Promise<NavigationSyncResult> {
  await whenNavigationWritesSettled();
  let failures = 0;
  let remoteVersion: number | null = null;
  let adoptedRemote = false;
  const pending = await listPendingNavigationContestRecords(profileId);
  const contests = new Set([
    ...preflight.remotes.keys(),
    ...preflight.failed,
    ...pending.map((record) => record.contestStorageId),
  ]);
  for (const contestStorageId of [...contests].sort()) {
    // Backoff por shard tem precedência: não re-marca erro nem republica antes da hora.
    if (await shouldDeferNavigationShardSync(profileId, contestStorageId)) {
      const record = await getNavigationContestRecord(profileId, contestStorageId);
      if (record?.outboxState === 'pending' || preflight.failed.includes(contestStorageId)) {
        failures += 1;
      }
      continue;
    }
    if (preflight.failed.includes(contestStorageId)) {
      await markNavigationShardSyncError(
        profileId,
        contestStorageId,
        'Falha ao ler o documento remoto do concurso',
      ).catch(() => undefined);
      failures += 1;
      continue;
    }
    try {
      const result = await synchronizeContest(
        profileId,
        contestStorageId,
        preflight.remotes.get(contestStorageId) ?? null,
        hooks,
      );
      failures += result.failures;
      if (result.remoteVersion !== null) {
        remoteVersion = Math.max(remoteVersion ?? 0, result.remoteVersion);
      }
      adoptedRemote = adoptedRemote || result.adoptedRemote;
    } catch (error) {
      await markNavigationShardSyncError(
        profileId,
        contestStorageId,
        error instanceof Error ? error.message : 'Falha ao sincronizar navegação',
      );
      failures += 1;
    }
  }
  return { failures, remoteVersion, adoptedRemote };
}

export async function synchronizeNavigation(
  profileId: string,
  hooks: NavigationSyncHooks,
  currentContestStorageId?: string | null,
): Promise<NavigationSyncResult> {
  try {
    const preflight = await readNavigationPreflight(profileId, hooks, currentContestStorageId);
    return await applyNavigationPreflight(profileId, preflight, hooks);
  } catch (error) {
    const pending = await listPendingNavigationContestRecords(profileId).catch(() => []);
    if (pending.length > 0) {
      await markNavigationShardSyncError(
        profileId,
        pending[0].contestStorageId,
        error instanceof Error ? error.message : 'Falha ao sincronizar navegação',
      ).catch(() => undefined);
    }
    throw error;
  }
}
