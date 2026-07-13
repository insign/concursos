import { describe, expect, it } from 'vitest';
import { contestIdFromEntry, parseSubjectId, subjectIdFromEntry } from '../../src/lib/content-paths';

describe('content paths', () => {
  it('derives stable IDs from canonical paths', () => {
    expect(contestIdFromEntry('concurso-exemplo.json')).toBe('concurso-exemplo');
    expect(subjectIdFromEntry('concurso-exemplo/assunto-exemplo/conteudo.md', 'conteudo.md')).toBe(
      'concurso-exemplo/assunto-exemplo',
    );
    expect(parseSubjectId('concurso-exemplo/assunto-exemplo')).toEqual({
      contestSlug: 'concurso-exemplo',
      subjectSlug: 'assunto-exemplo',
    });
  });

  it('rejects nested contests and malformed subject paths', () => {
    expect(() => contestIdFromEntry('grupo/concurso.json')).toThrow('raiz da collection');
    expect(() => subjectIdFromEntry('concurso/conteudo.md', 'conteudo.md')).toThrow(
      '<concurso>/<assunto>',
    );
    expect(() => parseSubjectId('Concurso/assunto')).toThrow('Slug de concurso inválido');
  });
});
