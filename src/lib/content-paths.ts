const ROUTE_SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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

export function parseSubjectId(id: string): { contestSlug: string; subjectSlug: string } {
  const parts = id.split('/');

  if (parts.length !== 2) {
    throw new Error(`ID de assunto deve usar <concurso>/<assunto>: "${id}"`);
  }

  const [contestSlug, subjectSlug] = parts;
  assertRouteSegment(contestSlug, 'Slug de concurso');
  assertRouteSegment(subjectSlug, 'Slug de assunto');
  return { contestSlug, subjectSlug };
}
