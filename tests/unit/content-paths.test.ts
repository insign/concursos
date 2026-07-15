import { describe, expect, it } from 'vitest';
import {
  contestIdFromEntry,
  groupIdFromEntry,
  parseGroupId,
  parseSubjectId,
  subjectIdFromEntry,
} from '../../src/lib/content-paths';

describe('content paths', () => {
  it('derives stable IDs from grouped canonical paths', () => {
    expect(contestIdFromEntry('concurso-exemplo.json')).toBe('concurso-exemplo');
    expect(groupIdFromEntry('concurso-exemplo/administracao/grupo.json')).toBe(
      'concurso-exemplo/administracao',
    );
    expect(groupIdFromEntry('concurso-exemplo\\administracao\\publica\\grupo.json')).toBe(
      'concurso-exemplo/administracao/publica',
    );
    expect(parseGroupId('concurso-exemplo/administracao/publica')).toEqual({
      contestSlug: 'concurso-exemplo',
      groupSlugs: ['administracao', 'publica'],
    });

    const path = 'concurso-exemplo/administracao/publica/assunto-exemplo';
    for (const fileName of ['conteudo.md', 'cheat-sheet.md', 'questoes.json']) {
      expect(subjectIdFromEntry(`${path}/${fileName}`, fileName)).toBe(path);
    }
    expect(subjectIdFromEntry('concurso-exemplo\\administracao\\assunto-exemplo\\conteudo.md', 'conteudo.md')).toBe(
      'concurso-exemplo/administracao/assunto-exemplo',
    );
    expect(parseSubjectId(path)).toEqual({
      contestSlug: 'concurso-exemplo',
      groupSlugs: ['administracao', 'publica'],
      subjectSlug: 'assunto-exemplo',
    });
  });

  it('rejects nested contests, groups without a segment and direct subjects', () => {
    expect(() => contestIdFromEntry('grupo/concurso.json')).toThrow('raiz da collection');
    expect(() => groupIdFromEntry('concurso/grupo.json')).toThrow('<concurso>/<grupo>');
    expect(() => subjectIdFromEntry('concurso/conteudo.md', 'conteudo.md')).toThrow(
      '<concurso>/<grupo>',
    );
    expect(() => parseSubjectId('concurso/assunto')).toThrow('<concurso>/<grupo>');
  });

  it('rejects invalid segments at every depth', () => {
    expect(() => parseGroupId('Concurso/grupo')).toThrow('Slug de concurso inválido');
    expect(() => parseGroupId('concurso/Grupo')).toThrow('Slug de grupo inválido');
    expect(() => parseSubjectId('concurso/grupo inválido/assunto')).toThrow('Slug de grupo inválido');
    expect(() => parseSubjectId('concurso/grupo//assunto')).toThrow('Slug de grupo inválido');
    expect(() => parseSubjectId('concurso/grupo/Assunto')).toThrow('Slug de assunto inválido');
  });
});
