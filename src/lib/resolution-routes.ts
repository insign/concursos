export interface ResolutionDescriptor {
  questionId: string;
  questionRevision: number;
}

export interface ResolutionSubject {
  subjectStorageId: string;
  resolutions: ResolutionDescriptor[];
}

export interface ResolutionCatalog {
  schemaVersion: 1;
  contestStorageId: string;
  subjects: ResolutionSubject[];
}

export interface ResolutionArticleRequest {
  contestStorageId: string;
  subjectStorageId: string;
  questionId: string;
  questionRevision: number;
}

export function resolutionRoute(contestStorageId: string, subjectStorageId: string): string {
  return `/resolucoes/${encodeURIComponent(contestStorageId)}/${encodeURIComponent(subjectStorageId)}/`;
}

export function resolutionCatalogRoute(contestStorageId: string): string {
  return `/resolucoes/${encodeURIComponent(contestStorageId)}/index.json`;
}
