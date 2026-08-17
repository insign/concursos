const ROUTE_SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const STABLE_ID = /^[A-Za-z0-9_-]{1,64}$/;

function normalizeEntry(entry: string): string {
  return entry.replaceAll('\\', '/').replace(/^\.\//, '');
}

function assertRouteSegment(value: string, label: string): void {
  if (!ROUTE_SEGMENT.test(value)) {
    throw new Error(`${label} inválido: "${value}"`);
  }
}

export function contestIdFromEntry(entry: string): string {
  const normalized = normalizeEntry(entry);
  const id = normalized.replace(/\.json$/, '');

  if (id === normalized || id.includes('/')) {
    throw new Error(`Concurso deve ser um arquivo JSON na raiz da collection: "${entry}"`);
  }

  assertRouteSegment(id, 'Slug de concurso');
  return id;
}

export function subjectIdFromEntry(entry: string, fileName: string): string {
  const normalized = normalizeEntry(entry);
  const suffix = `/${fileName}`;

  if (!normalized.endsWith(suffix)) {
    throw new Error(`Arquivo de assunto deve terminar em "${suffix}": "${entry}"`);
  }

  const id = normalized.slice(0, -suffix.length);
  parseSubjectId(id);
  return id;
}

export function groupIdFromEntry(entry: string, fileName = 'grupo.json'): string {
  const normalized = normalizeEntry(entry);
  const suffix = `/${fileName}`;

  if (!normalized.endsWith(suffix)) {
    throw new Error(`Arquivo de grupo deve terminar em "${suffix}": "${entry}"`);
  }

  const id = normalized.slice(0, -suffix.length);
  parseGroupId(id);
  return id;
}

export function parseGroupId(id: string): { contestSlug: string; groupSlugs: string[] } {
  const parts = id.split('/');

  if (parts.length < 2) {
    throw new Error(`ID de grupo deve usar <concurso>/<grupo>[/<grupo>...]: "${id}"`);
  }

  const [contestSlug, ...groupSlugs] = parts;
  assertRouteSegment(contestSlug, 'Slug de concurso');
  for (const groupSlug of groupSlugs) {
    assertRouteSegment(groupSlug, 'Slug de grupo');
  }
  return { contestSlug, groupSlugs };
}

export function parseSubjectId(id: string): {
  contestSlug: string;
  groupSlugs: string[];
  subjectSlug: string;
} {
  const parts = id.split('/');

  if (parts.length < 3) {
    throw new Error(`ID de assunto deve usar <concurso>/<grupo>[/<grupo>...]/<assunto>: "${id}"`);
  }

  const contestSlug = parts[0]!;
  const groupSlugs = parts.slice(1, -1);
  const subjectSlug = parts.at(-1)!;
  assertRouteSegment(contestSlug, 'Slug de concurso');
  for (const groupSlug of groupSlugs) {
    assertRouteSegment(groupSlug, 'Slug de grupo');
  }
  assertRouteSegment(subjectSlug, 'Slug de assunto');
  return { contestSlug, groupSlugs, subjectSlug };
}

export function resolutionIdFromEntry(entry: string): string {
  const normalized = normalizeEntry(entry);
  const match = /^(.*)\/resolucoes\/([^/]+)\.md$/.exec(normalized);
  if (!match) {
    throw new Error(`Arquivo de resolução deve terminar em "<assunto>/resolucoes/<questão>.md": "${entry}"`);
  }

  parseSubjectId(match[1]!);
  if (!STABLE_ID.test(match[2]!)) {
    throw new Error(`ID de questão de resolução inválido: "${match[2]}"`);
  }
  return `${match[1]}/resolucoes/${match[2]}`;
}

export function parseResolutionId(id: string): { subjectId: string; questionId: string } {
  const marker = '/resolucoes/';
  const markerIndex = id.lastIndexOf(marker);
  const subjectId = markerIndex > 0 ? id.slice(0, markerIndex) : '';
  const questionId = markerIndex > 0 ? id.slice(markerIndex + marker.length) : '';

  if (!subjectId || !questionId || questionId.includes('/')) {
    throw new Error(`ID de resolução inválido: "${id}"`);
  }
  parseSubjectId(subjectId);
  if (!STABLE_ID.test(questionId)) {
    throw new Error(`ID de questão de resolução inválido: "${questionId}"`);
  }
  return { subjectId, questionId };
}
