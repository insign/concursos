export const THEME_STORAGE_KEY = 'concursos:theme';

export type ThemePreference = 'light' | 'dark' | 'auto';
export type ResolvedTheme = 'light' | 'dark';

export const DEFAULT_THEME_PREFERENCE: ThemePreference = 'auto';

/** Cores de `theme-color` (chrome do navegador) por tema resolvido. */
export const THEME_COLORS: Record<ResolvedTheme, string> = {
  light: '#275d55',
  dark: '#101614',
};

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'auto';
}

/**
 * Normaliza a preferência lida do localStorage. Qualquer valor ausente ou
 * inválido volta ao padrão automático, sem lançar.
 */
export function readThemePreference(raw: string | null | undefined): ThemePreference {
  return isThemePreference(raw) ? raw : DEFAULT_THEME_PREFERENCE;
}

/**
 * Resolve a preferência para um tema concreto. No modo automático usa a
 * preferência do sistema; caso contrário, a escolha explícita do usuário.
 */
export function resolveTheme(
  preference: ThemePreference,
  systemPrefersDark: boolean,
): ResolvedTheme {
  if (preference === 'auto') return systemPrefersDark ? 'dark' : 'light';
  return preference;
}
