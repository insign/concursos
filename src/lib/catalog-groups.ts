export const CATALOG_GROUPS_STORAGE_KEY = 'concursos:catalog-groups';

const STATE_VERSION = 1;

/**
 * Lê o estado persistido dos grupos do catálogo e retorna o conjunto de IDs de
 * grupo recolhidos. Grupos ausentes do conjunto permanecem expandidos por padrão.
 *
 * Tolera ausência de dado, JSON inválido e documentos de versão ausente ou
 * desconhecida: em qualquer um desses casos o conjunto retorna vazio, sem lançar,
 * para que a interface nunca quebre nem interprete mal um formato futuro. Apenas
 * documentos da versão conhecida (`STATE_VERSION`) têm seus IDs restaurados.
 */
export function parseCollapsedGroups(raw: string | null | undefined): Set<string> {
  if (!raw) return new Set();

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return new Set();
  }

  if (typeof data !== 'object' || data === null) return new Set();

  const record = data as { version?: unknown; collapsed?: unknown };
  if (record.version !== STATE_VERSION) return new Set();
  if (!Array.isArray(record.collapsed)) return new Set();

  return new Set(record.collapsed.filter((id): id is string => typeof id === 'string' && id.length > 0));
}

/**
 * Serializa o conjunto de grupos recolhidos em um documento versionado e
 * determinístico (IDs ordenados), pronto para gravação no localStorage.
 */
export function serializeCollapsedGroups(collapsed: ReadonlySet<string>): string {
  return JSON.stringify({ version: STATE_VERSION, collapsed: [...collapsed].sort() });
}
