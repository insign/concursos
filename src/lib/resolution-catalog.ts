import { z } from 'zod';
import {
  resolutionCatalogRoute,
  type ResolutionCatalog,
} from './resolution-routes';

const storageSegment = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const stableId = z.string().regex(/^[A-Za-z0-9_-]{1,64}$/);

export const resolutionDescriptorSchema = z
  .object({
    questionId: stableId,
    questionRevision: z.number().int().positive(),
  })
  .strict();

export const resolutionSubjectSchema = z
  .object({
    subjectStorageId: storageSegment.max(32),
    resolutions: z.array(resolutionDescriptorSchema),
  })
  .strict();

export const resolutionCatalogSchema = z
  .object({
    schemaVersion: z.literal(1),
    contestStorageId: storageSegment.max(20),
    subjects: z.array(resolutionSubjectSchema),
  })
  .strict();

export type { ResolutionCatalog } from './resolution-routes';
export type ResolutionDescriptor = z.infer<typeof resolutionDescriptorSchema>;
export type ResolutionSubject = z.infer<typeof resolutionSubjectSchema>;

const catalogCache = new Map<string, Promise<ResolutionCatalog>>();

export async function loadResolutionCatalog(contestStorageId: string): Promise<ResolutionCatalog> {
  const cached = catalogCache.get(contestStorageId);
  if (cached) return cached;

  const pending = (async () => {
    const response = await fetch(resolutionCatalogRoute(contestStorageId), { cache: 'no-store' });
    if (!response.ok) throw new Error(`Não foi possível carregar o catálogo de resoluções (${response.status}).`);
    return resolutionCatalogSchema.parse(await response.json());
  })().catch((error) => {
    catalogCache.delete(contestStorageId);
    throw error;
  });
  catalogCache.set(contestStorageId, pending);
  return pending;
}
