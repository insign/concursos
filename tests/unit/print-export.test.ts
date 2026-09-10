import { describe, expect, it } from 'vitest';
import {
  activeToSection,
  defaultScope,
  emptyMessageForOrigin,
  parseOriginFilter,
  parseScopeParam,
  scopeLabel,
  selectPrintQuestions,
  serializeScope,
} from '../../src/lib/print-export';

describe('print-export scope', () => {
  it('maps the active tab to its print section', () => {
    expect(activeToSection('content')).toBe('conteudo');
    expect(activeToSection('cheat-sheet')).toBe('cheat-sheet');
    expect(activeToSection('questions')).toBe('questoes');
  });

  it('defaults to only the current tab', () => {
    expect(defaultScope('content')).toEqual(['conteudo']);
    expect(defaultScope('cheat-sheet')).toEqual(['cheat-sheet']);
    expect(defaultScope('questions')).toEqual(['questoes']);
  });

  it('parses combined scopes in canonical order without duplicates', () => {
    expect(parseScopeParam('questoes,conteudo,conteudo')).toEqual(['conteudo', 'questoes']);
    expect(parseScopeParam('cheat-sheet questoes')).toEqual(['cheat-sheet', 'questoes']);
    expect(parseScopeParam(null)).toBeNull();
    expect(parseScopeParam('')).toEqual([]);
    expect(parseScopeParam('invalid')).toEqual([]);
  });

  it('serializes scopes canonically', () => {
    expect(serializeScope(['questoes', 'conteudo'])).toBe('conteudo,questoes');
    expect(serializeScope([])).toBe('');
  });

  it('labels scopes for the print header', () => {
    expect(scopeLabel(['conteudo', 'cheat-sheet'])).toBe('Conteúdo + Cheat sheet');
  });
});

describe('print-export question origin', () => {
  const questions = [
    { id: 'q1', origin: 'authorial' },
    { id: 'q2', origin: 'previous_exam' },
    { id: 'q3', origin: 'authorial' },
  ];

  it('parses the origin filter with an all fallback', () => {
    expect(parseOriginFilter('authorial')).toBe('authorial');
    expect(parseOriginFilter('previous_exam')).toBe('previous_exam');
    expect(parseOriginFilter('all')).toBe('all');
    expect(parseOriginFilter(null)).toBe('all');
    expect(parseOriginFilter(undefined)).toBe('all');
    expect(parseOriginFilter('')).toBe('all');
    expect(parseOriginFilter('official')).toBe('all');
  });

  it('selects all questions without reordering by default', () => {
    expect(selectPrintQuestions(questions, 'all')).toEqual(questions);
    expect(selectPrintQuestions(questions, 'all')).not.toBe(questions);
  });

  it('filters by origin in editorial order', () => {
    expect(selectPrintQuestions(questions, 'authorial').map((question) => question.id)).toEqual(['q1', 'q3']);
    expect(selectPrintQuestions(questions, 'previous_exam').map((question) => question.id)).toEqual(['q2']);
  });

  it('preserves a valid published order', () => {
    expect(
      selectPrintQuestions(questions, 'authorial', ['q3', 'q1']).map((question) => question.id),
    ).toEqual(['q3', 'q1']);
  });

  it('falls back to filtered editorial order on stale order state', () => {
    expect(selectPrintQuestions(questions, 'authorial', ['q1']).map((question) => question.id)).toEqual([
      'q1',
      'q3',
    ]);
    expect(
      selectPrintQuestions(questions, 'authorial', ['q1', 'q1']).map((question) => question.id),
    ).toEqual(['q1', 'q3']);
    expect(
      selectPrintQuestions(questions, 'authorial', ['q1', 'q2']).map((question) => question.id),
    ).toEqual(['q1', 'q3']);
    expect(
      selectPrintQuestions(questions, 'authorial', ['q9', 'q1']).map((question) => question.id),
    ).toEqual(['q1', 'q3']);
  });

  it('returns an empty list for an empty filtered set', () => {
    expect(selectPrintQuestions([], 'authorial', [])).toEqual([]);
    expect(selectPrintQuestions([{ id: 'q1', origin: 'authorial' }], 'previous_exam')).toEqual([]);
  });

  it('returns origin-specific empty messages', () => {
    expect(emptyMessageForOrigin('authorial')).toBe('Não há questões autorais neste assunto.');
    expect(emptyMessageForOrigin('previous_exam')).toBe(
      'Não há questões de concursos anteriores neste assunto.',
    );
    expect(emptyMessageForOrigin('all')).toBe('Não há questões neste assunto.');
  });
});
