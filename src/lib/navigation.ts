import { z } from 'zod';

const STORAGE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;

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

export function isSafeNavigationRoute(route: string): boolean {
  if (!route.startsWith('/') || route.startsWith('//') || route.includes('\\') || route.length > 512) return false;
  try {
    const parsed = new URL(route, 'https://concursos.invalid');
    return (
      parsed.origin === 'https://concursos.invalid' &&
      parsed.username === '' &&
      parsed.password === '' &&
      !parsed.pathname.includes('/../') &&
      !parsed.pathname.endsWith('/..')
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

export function resolveNavigationVersionAction(
  local: { remoteVersion: number | null; outboxState: 'clean' | 'pending' } | null,
  remoteVersion: number | null,
): NavigationVersionAction {
  if (!local) return remoteVersion === null ? 'noop' : 'adopt-remote';
  const observed = local.remoteVersion ?? 0;
  const current = remoteVersion ?? 0;
  if (current > observed) return 'adopt-remote';
  if (current < observed) return 'publish-local';
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
