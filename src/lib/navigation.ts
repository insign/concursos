import { z } from 'zod';

const STORAGE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;
const NAVIGATION_SESSION_PREFIX = 'concursos:navigation-restored:';

export const navigationTabSchema = z.enum([
  'catalog',
  'content',
  'cheat-sheet',
  'questions',
  'reading',
  'simulados',
  'settings',
  'other',
]);

export type NavigationTab = z.infer<typeof navigationTabSchema>;

function hasUnsafePathSegment(route: string): boolean {
  const queryIndex = route.search(/[?#]/);
  const rawPath = queryIndex === -1 ? route : route.slice(0, queryIndex);

  return rawPath.split('/').some((rawSegment) => {
    let segment = rawSegment;
    for (let pass = 0; pass < 2; pass += 1) {
      try {
        segment = decodeURIComponent(segment);
      } catch {
        return true;
      }
      if (segment === '.' || segment === '..' || segment.includes('/') || segment.includes('\\')) {
        return true;
      }
    }
    return false;
  });
}

export function isSafeNavigationRoute(route: string): boolean {
  if (
    !route.startsWith('/') ||
    route.startsWith('//') ||
    route.includes('\\') ||
    route.includes('#') ||
    route.length > 512 ||
    hasUnsafePathSegment(route)
  ) {
    return false;
  }

  try {
    const parsed = new URL(route, 'https://concursos.invalid');
    const canonical = `${parsed.pathname}${parsed.search}`;
    return (
      parsed.origin === 'https://concursos.invalid' &&
      parsed.username === '' &&
      parsed.password === '' &&
      parsed.hash === '' &&
      canonical === route
    );
  } catch {
    return false;
  }
}

export const navigationRouteSchema = z.string().min(1).max(512).refine(isSafeNavigationRoute, {
  message: 'Rota interna inválida',
});

const nullableStorageId = z.string().regex(STORAGE_ID_PATTERN).max(64).nullable();

export const navigationContextSchema = z
  .object({
    contestStorageId: nullableStorageId,
    groupId: nullableStorageId,
    subjectStorageId: nullableStorageId,
    questionId: z.string().min(1).max(128).nullable(),
    activeTab: navigationTabSchema,
    readingMode: z.boolean(),
    questionOrigin: z.enum(['all', 'authorial', 'previous_exam']).nullable(),
    questionLayout: z.enum(['single', 'ten', 'all']).nullable(),
    shuffleQuestions: z.boolean().nullable(),
  })
  .strict();

export type NavigationContext = z.infer<typeof navigationContextSchema>;

export const readingPositionSchema = z
  .object({
    contentVersion: z.string().min(1).max(128).nullable(),
    sectionId: z.string().min(1).max(180).nullable(),
    blockId: z.string().min(1).max(180).nullable(),
    blockIndex: z.number().int().nonnegative(),
    relativeOffset: z.number().min(0).max(1),
    textQuote: z.string().max(240),
    progress: z.number().min(0).max(1),
  })
  .strict();

export type ReadingPosition = z.infer<typeof readingPositionSchema>;

export const navigationDocumentSchema = z
  .object({
    schemaVersion: z.literal(1),
    updatedAt: z.string().regex(ISO_DATE_PATTERN),
    route: navigationRouteSchema,
    context: navigationContextSchema,
    readingPosition: readingPositionSchema.nullable(),
  })
  .strict();

export type NavigationDocument = z.infer<typeof navigationDocumentSchema>;

const LEGACY_READING_ROUTE = /^(\/concursos\/[^/]+\/[^/]+)\/leitura\/$/;
const CANONICAL_SUBJECT_ROUTE = /^\/concursos\/[^/]+\/[^/]+\/$/;

export function normalizeNavigationDocument(document: NavigationDocument): NavigationDocument {
  const normalizedPosition =
    document.readingPosition && document.readingPosition.progress < 0.02
      ? null
      : document.readingPosition;
  const withNormalizedPosition =
    normalizedPosition === document.readingPosition
      ? document
      : { ...document, readingPosition: normalizedPosition };
  const parsed = new URL(withNormalizedPosition.route, 'https://concursos.invalid');
  const legacyMatch = parsed.pathname.match(LEGACY_READING_ROUTE);
  const hasLegacyContext =
    withNormalizedPosition.context.activeTab === 'reading' &&
    withNormalizedPosition.context.readingMode &&
    CANONICAL_SUBJECT_ROUTE.test(parsed.pathname);
  const isLegacyReading = Boolean(legacyMatch) || hasLegacyContext;
  const incompatibleReadingMode =
    withNormalizedPosition.context.readingMode &&
    withNormalizedPosition.context.activeTab !== 'content' &&
    !isLegacyReading;
  if (!isLegacyReading && !incompatibleReadingMode) {
    return normalizedPosition === document.readingPosition
      ? withNormalizedPosition
      : navigationDocumentSchema.parse(withNormalizedPosition);
  }

  const route = legacyMatch ? `${legacyMatch[1]}/${parsed.search}` : withNormalizedPosition.route;
  return navigationDocumentSchema.parse({
    ...withNormalizedPosition,
    route,
    context: {
      ...withNormalizedPosition.context,
      activeTab: isLegacyReading ? 'content' : withNormalizedPosition.context.activeTab,
      readingMode: isLegacyReading,
    },
  });
}

export function navigationDestination(document: NavigationDocument): string {
  return `${document.route}${document.context.readingMode && document.context.activeTab === 'content' ? '#focus' : ''}`;
}

export function resumeReadingDestination(document: NavigationDocument): string {
  return `${document.route}#focus`;
}

export function navigationSessionKey(profileId: string): string {
  return `${NAVIGATION_SESSION_PREFIX}${profileId}`;
}

export function navigationPendingRouteKey(profileId: string): string {
  return `${navigationSessionKey(profileId)}:pending-route`;
}

export const navigationCatalogEntrySchema = z
  .object({
    route: navigationRouteSchema,
    contestStorageId: nullableStorageId,
    subjectStorageId: nullableStorageId,
    activeTab: navigationTabSchema,
    readingMode: z.boolean(),
  })
  .strict();

export type NavigationCatalogEntry = z.infer<typeof navigationCatalogEntrySchema>;

function hasResumeReadingPosition(document: NavigationDocument): boolean {
  return (
    document.context.activeTab === 'content' &&
    document.context.contestStorageId !== null &&
    document.context.subjectStorageId !== null &&
    document.readingPosition !== null &&
    document.readingPosition.progress >= 0.02
  );
}

export function isResumablePoint(document: NavigationDocument): boolean {
  return hasResumeReadingPosition(document);
}

export const READING_PROGRESS_EPSILON = 1e-6;
export const MIN_RESUME_PROGRESS = 0.02;

export function normalizeReadingPositionForResume(
  position: ReadingPosition | null,
): ReadingPosition | null {
  if (!position) return null;
  if (position.progress < MIN_RESUME_PROGRESS) return null;
  return position;
}

export function maxReadingPosition(
  existing: ReadingPosition | null,
  candidate: ReadingPosition | null,
): ReadingPosition | null {
  if (!existing) return normalizeReadingPositionForResume(candidate);
  if (!candidate) return existing;
  const normalized = normalizeReadingPositionForResume(candidate);
  if (!normalized) return existing;
  if (normalized.progress > existing.progress + READING_PROGRESS_EPSILON) return normalized;
  if (
    Math.abs(normalized.progress - existing.progress) <= READING_PROGRESS_EPSILON &&
    (normalized.blockIndex > existing.blockIndex ||
      normalized.relativeOffset > existing.relativeOffset + READING_PROGRESS_EPSILON)
  )
    return normalized;
  return existing;
}

export const navigationCatalogSchema = z
  .object({
    schemaVersion: z.literal(1),
    routes: z.array(navigationCatalogEntrySchema),
  })
  .strict();

export type NavigationCatalog = z.infer<typeof navigationCatalogSchema>;

export function normalizeTextQuote(value: string, maximum = 180): string {
  return value.replace(/\s+/g, ' ').trim().slice(0, maximum);
}

export function navigationFingerprint(document: NavigationDocument): string {
  return JSON.stringify({
    route: document.route,
    context: document.context,
    readingPosition: document.readingPosition,
  });
}

export type NavigationVersionAction = 'adopt-remote' | 'publish-local' | 'noop';

export interface NavigationVersionState {
  remoteVersion: number | null;
  remoteCreatedAt: string | null;
  outboxState: 'clean' | 'pending';
}

export function resolveNavigationVersionAction(
  local: NavigationVersionState | null,
  remoteVersion: number | null,
  remoteCreatedAt: string | null = null,
): NavigationVersionAction {
  if (!local) return remoteVersion === null ? 'noop' : 'adopt-remote';
  if (local.outboxState === 'pending' && local.remoteVersion === null) return 'publish-local';
  if (remoteVersion === null) return local.outboxState === 'pending' ? 'publish-local' : 'noop';

  const recreated =
    (local.remoteCreatedAt !== null &&
      remoteCreatedAt !== null &&
      local.remoteCreatedAt !== remoteCreatedAt) ||
    (local.remoteVersion !== null && remoteVersion < local.remoteVersion);

  if (recreated) {
    return local.outboxState === 'pending' ? 'publish-local' : 'adopt-remote';
  }

  const observed = local.remoteVersion ?? 0;
  if (remoteVersion > observed) return 'adopt-remote';
  if (remoteVersion < observed) {
    return local.outboxState === 'pending' ? 'publish-local' : 'adopt-remote';
  }
  return local.outboxState === 'pending' ? 'publish-local' : 'noop';
}

export function createNavigationDocument(
  route: string,
  context: NavigationContext,
  readingPosition: ReadingPosition | null,
  now = new Date(),
): NavigationDocument {
  return navigationDocumentSchema.parse({
    schemaVersion: 1,
    updatedAt: now.toISOString(),
    route,
    context,
    readingPosition,
  });
}

// ---------------------------------------------------------------------------
// Histórico de leitura por concurso (issue 782)
//
// Um documento por (perfil, concurso) guarda um ponto retomável por assunto,
// sem limite de quantidade e sem poda. `points` usa o mesmo formato do
// documento de navegação para reaproveitar normalização, comparação e
// restauração. `cleared` registra invalidações explícitas (assunto estudado)
// para que um aparelho desatualizado não ressuscite o ponto.
// ---------------------------------------------------------------------------

const contestStorageIdSchema = z.string().regex(STORAGE_ID_PATTERN).max(20);
const subjectMapKeySchema = z.string().regex(STORAGE_ID_PATTERN).max(32);

export const navigationContestDocumentSchema = z
  .object({
    schemaVersion: z.literal(2),
    contestStorageId: contestStorageIdSchema,
    updatedAt: z.string().regex(ISO_DATE_PATTERN),
    cursor: navigationDocumentSchema.nullable(),
    points: z.record(subjectMapKeySchema, navigationDocumentSchema),
    cleared: z.record(subjectMapKeySchema, z.string().regex(ISO_DATE_PATTERN)),
  })
  .strict()
  .superRefine((document, context) => {
    for (const [subjectStorageId, point] of Object.entries(document.points)) {
      if (
        point.context.contestStorageId !== document.contestStorageId ||
        point.context.subjectStorageId !== subjectStorageId ||
        !hasResumeReadingPosition(point)
      ) {
        context.addIssue({ code: 'custom', message: 'Ponto de leitura inconsistente com o concurso' });
        return;
      }
      if (document.cleared[subjectStorageId] !== undefined) {
        context.addIssue({ code: 'custom', message: 'Assunto presente em pontos e invalidações' });
        return;
      }
    }
    if (document.cursor !== null && document.cursor.context.contestStorageId !== null) {
      if (document.cursor.context.contestStorageId !== document.contestStorageId) {
        context.addIssue({ code: 'custom', message: 'Cursor de outro concurso' });
      }
    }
  });

export type NavigationContestDocument = z.infer<typeof navigationContestDocumentSchema>;

export function contestShardRecordId(profileId: string, contestStorageId: string): string {
  return `${profileId}::${contestStorageId}`;
}

function maxIsoDate(a: string, b: string): string {
  return a >= b ? a : b;
}

function contestDocumentUpdatedAt(document: NavigationContestDocument): string {
  let latest = document.cursor?.updatedAt ?? '1970-01-01T00:00:00.000Z';
  for (const point of Object.values(document.points)) latest = maxIsoDate(latest, point.updatedAt);
  for (const clearedAt of Object.values(document.cleared)) latest = maxIsoDate(latest, clearedAt);
  return latest;
}

export function normalizeContestDocument(document: NavigationContestDocument): NavigationContestDocument {
  const points: Record<string, NavigationDocument> = {};
  for (const [subjectStorageId, point] of Object.entries(document.points)) {
    const normalized = normalizeNavigationDocument(point);
    if (!hasResumeReadingPosition(normalized)) continue;
    if (normalized.context.subjectStorageId !== subjectStorageId) continue;
    points[subjectStorageId] = normalized;
  }
  const cursor = document.cursor ? normalizeNavigationDocument(document.cursor) : null;
  return navigationContestDocumentSchema.parse({
    ...document,
    cursor,
    points,
    updatedAt: contestDocumentUpdatedAt({ ...document, cursor, points }),
  });
}

export function createContestDocument(
  contestStorageId: string,
  now = new Date(),
): NavigationContestDocument {
  return navigationContestDocumentSchema.parse({
    schemaVersion: 2,
    contestStorageId,
    updatedAt: now.toISOString(),
    cursor: null,
    points: {},
    cleared: {},
  });
}

/** Insere ou avança o ponto de um assunto; posição não retomável só atualiza o cursor. */
export function upsertContestPoint(
  shard: NavigationContestDocument | null,
  point: NavigationDocument,
  now = new Date(),
): NavigationContestDocument {
  const contestStorageId =
    shard?.contestStorageId ?? point.context.contestStorageId ?? 'desconhecido';
  const base = shard ?? createContestDocument(contestStorageId, now);
  const subjectStorageId = point.context.subjectStorageId;
  const normalized = normalizeNavigationDocument(point);
  const resumable = hasResumeReadingPosition(normalized) && subjectStorageId !== null;
  const points = { ...base.points };
  const cleared = { ...base.cleared };
  if (resumable && subjectStorageId) {
    const existing = points[subjectStorageId] ?? null;
    const merged = normalizeNavigationDocument({
      ...normalized,
      readingPosition: maxReadingPosition(existing?.readingPosition ?? null, normalized.readingPosition),
    });
    points[subjectStorageId] = merged;
    delete cleared[subjectStorageId];
  }
  const cursor =
    !base.cursor || normalized.updatedAt >= base.cursor.updatedAt ? normalized : base.cursor;
  return normalizeContestDocument({ ...base, cursor, points, cleared });
}

/** Invalida o ponto de um assunto (estudado); mantém o registro como lápide publicável. */
export function clearContestPoint(
  shard: NavigationContestDocument | null,
  contestStorageId: string,
  subjectStorageId: string,
  now = new Date(),
): NavigationContestDocument {
  const base = shard ?? createContestDocument(contestStorageId, now);
  const points = { ...base.points };
  delete points[subjectStorageId];
  // Lápide monotônica: nunca regride carimbo existente, updatedAt do ponto
  // nem updatedAt do cursor do próprio assunto (que também é invalidado).
  const cursorStamp =
    base.cursor?.context.subjectStorageId === subjectStorageId ? base.cursor.updatedAt : '';
  const clearedAt = maxIsoDate(
    maxIsoDate(maxIsoDate(now.toISOString(), base.points[subjectStorageId]?.updatedAt ?? ''), cursorStamp),
    base.cleared[subjectStorageId] ?? '',
  );
  const cleared = { ...base.cleared, [subjectStorageId]: clearedAt };
  const cursor =
    base.cursor?.context.subjectStorageId === subjectStorageId
      ? normalizeNavigationDocument({ ...base.cursor, readingPosition: null })
      : base.cursor;
  return normalizeContestDocument({ ...base, cursor, points, cleared });
}

/**
 * Une dois documentos do mesmo concurso: pontos distintos coexistem, o mesmo
 * assunto usa avanço máximo e invalidação mais recente vence ponto antigo.
 */
export function mergeContestDocuments(
  local: NavigationContestDocument,
  remote: NavigationContestDocument,
): NavigationContestDocument {
  if (local.contestStorageId !== remote.contestStorageId) {
    throw new Error('Documentos de concursos distintos não podem ser mesclados');
  }
  const points: Record<string, NavigationDocument> = {};
  const cleared: Record<string, string> = {};
  const subjects = new Set([...Object.keys(local.points), ...Object.keys(remote.points)]);
  for (const subject of subjects) {
    const left = local.points[subject] ?? null;
    const right = remote.points[subject] ?? null;
    const leftCleared = local.cleared[subject] ?? null;
    const rightCleared = remote.cleared[subject] ?? null;
    const newestCleared = leftCleared && rightCleared ? maxIsoDate(leftCleared, rightCleared) : (leftCleared ?? rightCleared);
    const winner = left && right
      ? (() => {
        const baseDoc = left.updatedAt >= right.updatedAt ? left : right;
        return normalizeNavigationDocument({
          ...baseDoc,
          readingPosition: maxReadingPosition(left.readingPosition, right.readingPosition),
          updatedAt: maxIsoDate(left.updatedAt, right.updatedAt),
        });
      })()
      : (left ?? right)!;
    if (newestCleared && newestCleared >= winner.updatedAt) {
      cleared[subject] = newestCleared;
    } else {
      points[subject] = winner;
    }
  }
  for (const subject of new Set([...Object.keys(local.cleared), ...Object.keys(remote.cleared)])) {
    if (points[subject] === undefined && cleared[subject] === undefined) {
      cleared[subject] = maxIsoDate(local.cleared[subject] ?? '', remote.cleared[subject] ?? '');
    }
  }
  let cursor =
    !local.cursor ? remote.cursor : !remote.cursor ? local.cursor
      : local.cursor.updatedAt >= remote.cursor.updatedAt ? local.cursor : remote.cursor;
  // Cursor de assunto invalidado não carrega posição retomável.
  const cursorSubject = cursor?.context.subjectStorageId ?? null;
  const cursorCleared = cursorSubject ? (cleared[cursorSubject] ?? null) : null;
  if (cursor && cursorSubject && cursorCleared && cursorCleared >= cursor.updatedAt) {
    cursor = normalizeNavigationDocument({ ...cursor, readingPosition: null });
  }
  return normalizeContestDocument({
    schemaVersion: 2,
    contestStorageId: local.contestStorageId,
    updatedAt: maxIsoDate(local.updatedAt, remote.updatedAt),
    cursor,
    points,
    cleared,
  });
}

/** Ponto de assunto mais recente do concurso; nulo sem ponto retomável. */
export function newestContestPoint(
  shard: NavigationContestDocument | null | undefined,
): NavigationDocument | null {
  if (!shard) return null;
  let newest: NavigationDocument | null = null;
  for (const point of Object.values(shard.points)) {
    if (!newest || point.updatedAt > newest.updatedAt) newest = point;
  }
  return newest;
}

/** Retomada do concurso (ponto de assunto, com cursor não invalidado como fallback). */
export function newestContestResume(
  shard: NavigationContestDocument | null | undefined,
): NavigationDocument | null {
  if (!shard) return null;
  const point = newestContestPoint(shard);
  if (point) return point;
  const cursor = shard.cursor;
  // Cursor precisa pertencer a este concurso (rotas sem concurso são locais).
  if (!cursor || cursor.context.contestStorageId !== shard.contestStorageId) return null;
  const cursorSubject = cursor.context.subjectStorageId;
  if (cursorSubject && shard.cleared[cursorSubject] && shard.cleared[cursorSubject] >= cursor.updatedAt) {
    return null;
  }
  return cursor;
}

/** Igualdade canônica (ordem de chaves irrelevante, cursor incluído). */
export function contestDocumentsEqual(
  a: NavigationContestDocument,
  b: NavigationContestDocument,
): boolean {
  return contestShardFingerprint(a) === contestShardFingerprint(b);
}

/** Continue global: documento mais recente entre concursos. */
export function newestGlobalResume(
  shards: NavigationContestDocument[],
): { contestStorageId: string; document: NavigationDocument } | null {
  let winner: { contestStorageId: string; document: NavigationDocument } | null = null;
  for (const shard of shards) {
    const candidate = newestContestResume(shard);
    if (!candidate) continue;
    if (!winner || candidate.updatedAt > winner.document.updatedAt) {
      winner = { contestStorageId: shard.contestStorageId, document: candidate };
    }
  }
  return winner;
}

export function contestShardFingerprint(shard: NavigationContestDocument): string {
  return JSON.stringify({
    cursor: shard.cursor
      ? { route: shard.cursor.route, context: shard.cursor.context, readingPosition: shard.cursor.readingPosition }
      : null,
    points: Object.fromEntries(
      Object.entries(shard.points)
        .sort(([a], [b]) => (a < b ? -1 : 1))
        .map(([subject, point]) => [
          subject,
          { route: point.route, context: point.context, readingPosition: point.readingPosition },
        ]),
    ),
    cleared: Object.fromEntries(
      Object.entries(shard.cleared).sort(([a], [b]) => (a < b ? -1 : 1)),
    ),
  });
}
