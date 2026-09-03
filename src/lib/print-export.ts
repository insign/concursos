export const PRINT_SECTIONS = ['conteudo', 'cheat-sheet', 'questoes'] as const;

export type PrintSection = (typeof PRINT_SECTIONS)[number];

export type PrintTab = 'content' | 'cheat-sheet' | 'questions';

export const SECTION_LABELS: Record<PrintSection, string> = {
  conteudo: 'Conteúdo',
  'cheat-sheet': 'Cheat sheet',
  questoes: 'Questões',
};

export function activeToSection(active: PrintTab): PrintSection {
  if (active === 'content') return 'conteudo';
  if (active === 'cheat-sheet') return 'cheat-sheet';
  return 'questoes';
}

export function defaultScope(active: PrintTab): PrintSection[] {
  return [activeToSection(active)];
}

export function isPrintSection(value: string): value is PrintSection {
  return (PRINT_SECTIONS as readonly string[]).includes(value);
}

export function parseScopeParam(value: string | null | undefined): PrintSection[] | null {
  if (value == null) return null;
  const seen = new Set<PrintSection>();
  for (const part of value.split(/[,\s]+/)) {
    const normalized = part.trim().toLowerCase();
    if (normalized && isPrintSection(normalized) && !seen.has(normalized)) {
      seen.add(normalized);
    }
  }
  // Preserva a ordem canônica conteudo -> cheat-sheet -> questoes.
  return PRINT_SECTIONS.filter((section) => seen.has(section));
}

export function serializeScope(sections: readonly PrintSection[]): string {
  const seen = new Set<PrintSection>();
  for (const section of sections) {
    if (isPrintSection(section)) seen.add(section);
  }
  return PRINT_SECTIONS.filter((section) => seen.has(section)).join(',');
}

export function scopeLabel(sections: readonly PrintSection[]): string {
  const ordered = PRINT_SECTIONS.filter((section) => sections.includes(section));
  return ordered.map((section) => SECTION_LABELS[section]).join(' + ');
}
