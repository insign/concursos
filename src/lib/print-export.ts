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

export const QUESTION_ORIGIN_FILTERS = ['all', 'authorial', 'previous_exam'] as const;

export type QuestionOriginFilter = (typeof QUESTION_ORIGIN_FILTERS)[number];

export const QUESTION_ORIGIN_LABELS: Record<QuestionOriginFilter, string> = {
  all: 'Todas as origens',
  authorial: 'Autorais',
  previous_exam: 'Concursos anteriores',
};

export function isQuestionOriginFilter(value: string | null | undefined): value is QuestionOriginFilter {
  return value === 'all' || value === 'authorial' || value === 'previous_exam';
}

export function parseOriginFilter(value: string | null | undefined): QuestionOriginFilter {
  return isQuestionOriginFilter(value) ? value : 'all';
}

export function emptyMessageForOrigin(origin: QuestionOriginFilter): string {
  if (origin === 'authorial') return 'Não há questões autorais neste assunto.';
  if (origin === 'previous_exam') return 'Não há questões de concursos anteriores neste assunto.';
  return 'Não há questões neste assunto.';
}

export function selectPrintQuestions<T extends { id: string; origin: string }>(
  questions: readonly T[],
  origin: QuestionOriginFilter,
  orderedIds?: readonly string[] | null,
): T[] {
  const filtered = origin === 'all' ? [...questions] : questions.filter((question) => question.origin === origin);
  if (filtered.length === 0) return filtered;
  if (!orderedIds || orderedIds.length === 0) return filtered;
  if (orderedIds.length !== filtered.length) return filtered;
  const seen = new Set<string>();
  for (const id of orderedIds) {
    if (seen.has(id)) return filtered;
    seen.add(id);
  }
  const byId = new Map(filtered.map((question) => [question.id, question]));
  const ordered: T[] = [];
  for (const id of orderedIds) {
    const question = byId.get(id);
    if (!question) return filtered;
    ordered.push(question);
  }
  return ordered;
}
