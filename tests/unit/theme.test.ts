import { describe, expect, it } from 'vitest';
import {
  DEFAULT_THEME_PREFERENCE,
  THEME_COLORS,
  THEME_STORAGE_KEY,
  isThemePreference,
  readThemePreference,
  resolveTheme,
} from '../../src/lib/theme';

describe('theme preferences', () => {
  it('uses a stable, namespaced storage key and an automatic default', () => {
    expect(THEME_STORAGE_KEY).toBe('concursos:theme');
    expect(DEFAULT_THEME_PREFERENCE).toBe('auto');
  });

  it('recognizes only the three valid preferences', () => {
    expect(isThemePreference('light')).toBe(true);
    expect(isThemePreference('dark')).toBe(true);
    expect(isThemePreference('auto')).toBe(true);
    expect(isThemePreference('sepia')).toBe(false);
    expect(isThemePreference(null)).toBe(false);
    expect(isThemePreference(undefined)).toBe(false);
  });

  it('falls back to automatic for missing or invalid stored values', () => {
    expect(readThemePreference(null)).toBe('auto');
    expect(readThemePreference(undefined)).toBe('auto');
    expect(readThemePreference('')).toBe('auto');
    expect(readThemePreference('nonsense')).toBe('auto');
    expect(readThemePreference('dark')).toBe('dark');
    expect(readThemePreference('light')).toBe('light');
    expect(readThemePreference('auto')).toBe('auto');
  });

  it('resolves automatic to the system preference and explicit choices as-is', () => {
    expect(resolveTheme('auto', true)).toBe('dark');
    expect(resolveTheme('auto', false)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
    expect(resolveTheme('dark', true)).toBe('dark');
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('light', false)).toBe('light');
  });

  it('exposes a browser theme-color for each resolved theme', () => {
    expect(THEME_COLORS.light).toBe('#275d55');
    expect(THEME_COLORS.dark).toBe('#101614');
  });
});
