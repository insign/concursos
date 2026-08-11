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
  const parsed = new URL(document.route, 'https://concursos.invalid');
  const legacyMatch = parsed.pathname.match(LEGACY_READING_ROUTE);
  const hasLegacyContext =
    document.context.activeTab === 'reading' &&
    document.context.readingMode &&
    CANONICAL_SUBJECT_ROUTE.test(parsed.pathname);
  const isLegacyReading = Boolean(legacyMatch) || hasLegacyContext;
  const incompatibleReadingMode =
    document.context.readingMode && document.context.activeTab !== 'content' && !isLegacyReading;
  if (!isLegacyReading && !incompatibleReadingMode) return document;

  const route = legacyMatch ? `${legacyMatch[1]}/${parsed.search}` : document.route;
  return navigationDocumentSchema.parse({
    ...document,
    route,
    context: {
      ...document.context,
      activeTab: isLegacyReading ? 'content' : document.context.activeTab,
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
    document.readingPosition !== null
  );
}

export function canResumeReading(
  document: NavigationDocument,
  contestStorageId: string,
): boolean {
  return (
    hasResumeReadingPosition(document) &&
    document.context.contestStorageId === contestStorageId
  );
}

export function shouldPreserveReadingForContestCatalog(
  current: NavigationDocument,
  next: NavigationCatalogEntry,
): boolean {
  return (
    next.activeTab === 'catalog' &&
    next.contestStorageId !== null &&
    next.contestStorageId === current.context.contestStorageId &&
    hasResumeReadingPosition(current)
  );
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
