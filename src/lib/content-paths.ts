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

export function megaReviewIdFromEntry(entry: string): string {
  const normalized = normalizeEntry(entry);
  const suffix = '/mega-revisao/index.md';

  if (!normalized.endsWith(suffix)) {
    throw new Error(`Arquivo de mega revisão deve terminar em "${suffix}": "${entry}"`);
  }

  const id = normalized.slice(0, -suffix.length);
  parseGroupId(id);
  return id;
}

export function megaReviewVinculoIdFromEntry(entry: string): string {
  const normalized = normalizeEntry(entry);
  const suffix = '/mega-revisao/vinculo.json';

  if (!normalized.endsWith(suffix)) {
    throw new Error(`Arquivo de vínculo de mega revisão deve terminar em "${suffix}": "${entry}"`);
  }

  const id = normalized.slice(0, -suffix.length);
  parseGroupId(id);
  return id;
}

export function parseBibliotecaMegaGroupId(id: string): { groupSlugs: string[] } {
  const parts = id.split('/');

  if (parts.length < 1 || parts[0] === '') {
    throw new Error(`ID de grupo de biblioteca deve usar <grupo>[/<grupo>...]: "${id}"`);
  }

  for (const groupSlug of parts) {
    assertRouteSegment(groupSlug, 'Slug de grupo de biblioteca');
  }
  return { groupSlugs: parts };
}

export function bibliotecaMegaReviewIdFromEntry(entry: string): string {
  const normalized = normalizeEntry(entry);
  const suffix = '/mega-revisao/index.md';

  if (!normalized.endsWith(suffix)) {
    throw new Error(`Arquivo de mega revisão de biblioteca deve terminar em "${suffix}": "${entry}"`);
  }

  const id = normalized.slice(0, -suffix.length);
  parseBibliotecaMegaGroupId(id);
  return `${id}/mega-revisao`;
}

export function bibliotecaMegaReferenceIdFromEntry(entry: string): string {
  const normalized = normalizeEntry(entry);
  const suffix = '/mega-revisao/referencias.md';

  if (!normalized.endsWith(suffix)) {
    throw new Error(
      `Arquivo de referências de mega revisão de biblioteca deve terminar em "${suffix}": "${entry}"`,
    );
  }

  const id = normalized.slice(0, -'/referencias.md'.length);
  parseBibliotecaMegaReferenceId(id);
  return id;
}

export function parseBibliotecaMegaReferenceId(id: string): { kind: 'mega-review'; groupId: string } {
  if (!id.endsWith('/mega-revisao')) {
    throw new Error(`ID de referência de mega revisão de biblioteca inválido: "${id}"`);
  }

  const groupId = id.slice(0, -'/mega-revisao'.length);
  parseBibliotecaMegaGroupId(groupId);
  return { kind: 'mega-review', groupId };
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

  if (match[2] === 'referencias') {
    throw new Error(
      `"${entry}" pertence à collection de referências e não pode ser tratado como resolução de questão`,
    );
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

export type ReferenceKind = 'subject' | 'mega-review' | 'resolutions';

export interface ParsedReferenceId {
  kind: ReferenceKind;
  subjectId?: string;
  groupId?: string;
}

export function referenceIdFromEntry(entry: string): string {
  const normalized = normalizeEntry(entry);
  const suffix = '/referencias.md';

  if (!normalized.endsWith(suffix)) {
    throw new Error(`Arquivo de referências deve terminar em "${suffix}": "${entry}"`);
  }

  const id = normalized.slice(0, -suffix.length);
  parseReferenceId(id);
  return id;
}

export function parseReferenceId(id: string): ParsedReferenceId {
  if (id.endsWith('/mega-revisao')) {
    const groupId = id.slice(0, -'/mega-revisao'.length);
    parseGroupId(groupId);
    return { kind: 'mega-review', groupId };
  }

  if (id.endsWith('/resolucoes')) {
    const subjectId = id.slice(0, -'/resolucoes'.length);
    parseSubjectId(subjectId);
    return { kind: 'resolutions', subjectId };
  }

  parseSubjectId(id);
  return { kind: 'subject', subjectId: id };
}

export function parseBibliotecaId(id: string): { groupSlugs: string[]; subjectSlug: string } {
  const parts = id.split('/');

  if (parts.length < 2) {
    throw new Error(`ID de biblioteca deve usar <grupo>[/<grupo>...]/<assunto>: "${id}"`);
  }

  const groupSlugs = parts.slice(0, -1);
  const subjectSlug = parts.at(-1)!;
  for (const groupSlug of groupSlugs) {
    assertRouteSegment(groupSlug, 'Slug de grupo');
  }
  assertRouteSegment(subjectSlug, 'Slug de assunto');
  return { groupSlugs, subjectSlug };
}

export function bibliotecaIdFromEntry(entry: string, fileName: string): string {
  const normalized = normalizeEntry(entry);
  const suffix = `/${fileName}`;

  if (!normalized.endsWith(suffix)) {
    throw new Error(`Arquivo de biblioteca deve terminar em "${suffix}": "${entry}"`);
  }

  const id = normalized.slice(0, -suffix.length);
  parseBibliotecaId(id);
  return id;
}

export function bibliotecaResolutionIdFromEntry(entry: string): string {
  const normalized = normalizeEntry(entry);
  const match = /^(.*)\/resolucoes\/([^/]+)\.md$/.exec(normalized);
  if (!match) {
    throw new Error(`Arquivo de resolução de biblioteca deve terminar em "<assunto>/resolucoes/<questão>.md": "${entry}"`);
  }

  if (match[2] === 'referencias') {
    throw new Error(
      `"${entry}" pertence à collection de referências e não pode ser tratado como resolução de questão`,
    );
  }

  parseBibliotecaId(match[1]!);
  if (!STABLE_ID.test(match[2]!)) {
    throw new Error(`ID de questão de resolução inválido: "${match[2]}"`);
  }
  return `${match[1]}/resolucoes/${match[2]}`;
}

export function parseBibliotecaResolutionId(id: string): {
  bibliotecaId: string;
  questionId: string;
} {
  const marker = '/resolucoes/';
  const markerIndex = id.lastIndexOf(marker);
  const bibliotecaId = markerIndex > 0 ? id.slice(0, markerIndex) : '';
  const questionId = markerIndex > 0 ? id.slice(markerIndex + marker.length) : '';

  if (!bibliotecaId || !questionId || questionId.includes('/')) {
    throw new Error(`ID de resolução de biblioteca inválido: "${id}"`);
  }
  parseBibliotecaId(bibliotecaId);
  if (!STABLE_ID.test(questionId)) {
    throw new Error(`ID de questão de resolução inválido: "${questionId}"`);
  }
  return { bibliotecaId, questionId };
}

export function bibliotecaReferenceIdFromEntry(entry: string): string {
  const normalized = normalizeEntry(entry);
  const suffix = '/referencias.md';

  if (!normalized.endsWith(suffix)) {
    throw new Error(`Arquivo de referências de biblioteca deve terminar em "${suffix}": "${entry}"`);
  }

  const id = normalized.slice(0, -suffix.length);
  parseBibliotecaReferenceId(id);
  return id;
}

export function parseBibliotecaReferenceId(id: string): ParsedReferenceId {
  if (id.endsWith('/mega-revisao')) {
    const { groupId } = parseBibliotecaMegaReferenceId(id);
    return { kind: 'mega-review', groupId };
  }

  if (id.endsWith('/resolucoes')) {
    const bibliotecaId = id.slice(0, -'/resolucoes'.length);
    parseBibliotecaId(bibliotecaId);
    return { kind: 'resolutions', subjectId: bibliotecaId };
  }

  parseBibliotecaId(id);
  return { kind: 'subject', subjectId: id };
}

export function vinculoIdFromEntry(entry: string): string {
  const normalized = normalizeEntry(entry);
  const suffix = '/vinculo.json';

  if (!normalized.endsWith(suffix)) {
    throw new Error(`Arquivo de vínculo deve terminar em "${suffix}": "${entry}"`);
  }

  const id = normalized.slice(0, -suffix.length);
  parseSubjectId(id);
  return id;
}
