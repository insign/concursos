import { PRINT_SECTIONS, isPrintSection, type PrintSection } from './print-export';

export const PRINT_PREFERENCES_STORAGE_KEY = 'concursos:print-preferences:v1';

export interface PrintPreferences {
  schemaVersion: 1;
  sections: PrintSection[];
  includeGabarito: boolean;
}

export function parsePrintPreferences(raw: string | null): PrintPreferences | null {
  if (raw === null) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;
    const record = value as Record<string, unknown>;
    const sections = record.sections;
    if (
      record.schemaVersion !== 1 ||
      !Array.isArray(sections) ||
      !sections.every(
        (section: unknown): section is PrintSection =>
          typeof section === 'string' && isPrintSection(section),
      ) ||
      typeof record.includeGabarito !== 'boolean'
    ) return null;
    return {
      schemaVersion: 1,
      sections: PRINT_SECTIONS.filter((section) => sections.includes(section)),
      includeGabarito: record.includeGabarito,
    };
  } catch {
    return null;
  }
}

let memoryPreferences: PrintPreferences | null = null;
let memoryOnly = false;

export function loadPrintPreferences(): PrintPreferences | null {
  // Uma escrita que falhou não pode ser substituída pela cópia antiga do storage.
  if (memoryOnly) return memoryPreferences;
  try {
    return parsePrintPreferences(localStorage.getItem(PRINT_PREFERENCES_STORAGE_KEY));
  } catch {
    return memoryPreferences;
  }
}

export function savePrintPreferences(preferences: PrintPreferences): void {
  memoryPreferences = {
    schemaVersion: 1,
    sections: PRINT_SECTIONS.filter((section) => preferences.sections.includes(section)),
    includeGabarito: preferences.includeGabarito,
  };
  try {
    localStorage.setItem(PRINT_PREFERENCES_STORAGE_KEY, JSON.stringify(memoryPreferences));
    memoryOnly = false;
  } catch {
    memoryOnly = true;
  }
}
