export const CATALOG_GROUPS_STORAGE_KEY = 'concursos:catalog-groups';

const STATE_VERSION = 1;

/**
 * Lê o estado persistido dos grupos do catálogo e retorna o conjunto de IDs de
 * grupo recolhidos. Um documento válido pode conter um conjunto vazio.
 *
 * Ausência de dado, JSON inválido e versões desconhecidas retornam `null`, sem
 * lançar, para que a interface aplique com segurança o padrão de primeira visita.
 * Apenas documentos da versão conhecida têm seus IDs restaurados.
 */
export function parseCollapsedGroups(raw: string | null | undefined): Set<string> | null {
  if (!raw) return null;

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }

  if (typeof data !== 'object' || data === null) return null;

  const record = data as { version?: unknown; collapsed?: unknown };
  if (record.version !== STATE_VERSION) return null;
  if (!Array.isArray(record.collapsed)) return null;

  return new Set(record.collapsed.filter((id): id is string => typeof id === 'string' && id.length > 0));
}

/**
 * Serializa o conjunto de grupos recolhidos em um documento versionado e
 * determinístico (IDs ordenados), pronto para gravação no localStorage.
 */
export function serializeCollapsedGroups(collapsed: ReadonlySet<string>): string {
  return JSON.stringify({ version: STATE_VERSION, collapsed: [...collapsed].sort() });
}
