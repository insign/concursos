import { describe, expect, it } from 'vitest';
import {
  activeToSection,
  defaultScope,
  parseScopeParam,
  scopeLabel,
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
