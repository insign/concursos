import { describe, expect, it } from 'vitest';
import {
  bibliotecaMegaReferenceIdFromEntry,
  bibliotecaMegaReviewIdFromEntry,
  contestIdFromEntry,
  groupIdFromEntry,
  megaReviewIdFromEntry,
  megaReviewVinculoIdFromEntry,
  parseBibliotecaMegaGroupId,
  parseBibliotecaMegaReferenceId,
  parseBibliotecaReferenceId,
  parseReferenceId,
  parseResolutionId,
  parseGroupId,
  parseSubjectId,
  referenceIdFromEntry,
  resolutionIdFromEntry,
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
    expect(megaReviewIdFromEntry('concurso-exemplo\\administracao\\publica\\mega-revisao\\index.md')).toBe(
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
    expect(resolutionIdFromEntry(`${path}/resolucoes/q001.md`)).toBe(
      `${path}/resolucoes/q001`,
    );
    expect(parseResolutionId(`${path}/resolucoes/q001`)).toEqual({
      subjectId: path,
      questionId: 'q001',
    });
  });

  it('rejects nested contests, groups without a segment and direct subjects', () => {
    expect(() => contestIdFromEntry('grupo/concurso.json')).toThrow('raiz da collection');
    expect(() => groupIdFromEntry('concurso/grupo.json')).toThrow('<concurso>/<grupo>');
    expect(() => megaReviewIdFromEntry('concurso/mega-revisao/index.md')).toThrow('<concurso>/<grupo>');
    expect(() => subjectIdFromEntry('concurso/conteudo.md', 'conteudo.md')).toThrow(
      '<concurso>/<grupo>',
    );
    expect(() => parseSubjectId('concurso/assunto')).toThrow('<concurso>/<grupo>');
    expect(() => resolutionIdFromEntry('concurso/grupo/assunto/resolucoes/q001.txt')).toThrow(
      'deve terminar',
    );
    expect(() => parseResolutionId('concurso/grupo/assunto/q001')).toThrow('ID de resolução inválido');
  });

  it('rejects invalid segments at every depth', () => {
    expect(() => parseGroupId('Concurso/grupo')).toThrow('Slug de concurso inválido');
    expect(() => parseGroupId('concurso/Grupo')).toThrow('Slug de grupo inválido');
    expect(() => parseSubjectId('concurso/grupo inválido/assunto')).toThrow('Slug de grupo inválido');
    expect(() => parseSubjectId('concurso/grupo//assunto')).toThrow('Slug de grupo inválido');
    expect(() => parseSubjectId('concurso/grupo/Assunto')).toThrow('Slug de assunto inválido');
    expect(() => resolutionIdFromEntry('concurso/grupo/assunto/resolucoes/Q 1.md')).toThrow(
      'ID de questão de resolução inválido',
    );
  });

  it('classifies reference files by path shape', () => {
    const subjectPath = 'concurso-exemplo/administracao/publica/assunto-exemplo';
    const groupPath = 'concurso-exemplo/administracao/publica';

    expect(referenceIdFromEntry(`${subjectPath}/referencias.md`)).toBe(subjectPath);
    expect(referenceIdFromEntry(`${groupPath}/mega-revisao/referencias.md`)).toBe(
      `${groupPath}/mega-revisao`,
    );
    expect(referenceIdFromEntry(`${subjectPath}\\resolucoes\\referencias.md`)).toBe(
      `${subjectPath}/resolucoes`,
    );

    expect(parseReferenceId(subjectPath)).toEqual({ kind: 'subject', subjectId: subjectPath });
    expect(parseReferenceId(`${groupPath}/mega-revisao`)).toEqual({
      kind: 'mega-review',
      groupId: groupPath,
    });
    expect(parseReferenceId(`${subjectPath}/resolucoes`)).toEqual({
      kind: 'resolutions',
      subjectId: subjectPath,
    });
  });

  it('rejects misplaced or malformed reference files', () => {
    expect(() => referenceIdFromEntry('concurso/grupo/assunto/referencias.txt')).toThrow('deve terminar');
    expect(() => referenceIdFromEntry('concurso/referencias.md')).toThrow('<concurso>/<grupo>');
    expect(() => referenceIdFromEntry('concurso/mega-revisao/referencias.md')).toThrow('<concurso>/<grupo>');
    expect(() => referenceIdFromEntry('concurso/grupo/assunto/resolucoes/referencias.md')).not.toThrow();
    expect(() => referenceIdFromEntry('concurso/Grupo/referencias.md')).toThrow('ID de assunto deve usar');
    expect(() => parseReferenceId('concurso/outro')).toThrow('ID de assunto deve usar');
  });

  it('never treats the references companion as a question resolution', () => {
    expect(() =>
      resolutionIdFromEntry('concurso/grupo/assunto/resolucoes/referencias.md'),
    ).toThrow('collection de referências');
  });

  it('derives canonical mega review IDs from biblioteca paths', () => {
    expect(bibliotecaMegaReviewIdFromEntry('gestao-contratos/mega-revisao/index.md')).toBe(
      'gestao-contratos/mega-revisao',
    );
    expect(bibliotecaMegaReviewIdFromEntry('area\\sub-area\\mega-revisao\\index.md')).toBe(
      'area/sub-area/mega-revisao',
    );
    expect(bibliotecaMegaReferenceIdFromEntry('gestao-contratos/mega-revisao/referencias.md')).toBe(
      'gestao-contratos/mega-revisao',
    );
    expect(parseBibliotecaMegaReferenceId('gestao-contratos/mega-revisao')).toEqual({
      kind: 'mega-review',
      groupId: 'gestao-contratos',
    });
    expect(parseBibliotecaMegaGroupId('gestao-contratos')).toEqual({
      groupSlugs: ['gestao-contratos'],
    });
    expect(parseBibliotecaReferenceId('gestao-contratos/mega-revisao')).toEqual({
      kind: 'mega-review',
      groupId: 'gestao-contratos',
    });
    expect(() => bibliotecaMegaReviewIdFromEntry('/mega-revisao/index.md')).toThrow(
      'grupo de biblioteca',
    );
    expect(() => bibliotecaMegaReviewIdFromEntry('Grupo/mega-revisao/index.md')).toThrow(
      'Slug de grupo de biblioteca inválido',
    );
    expect(() => bibliotecaMegaReviewIdFromEntry('gestao-contratos/index.md')).toThrow(
      'deve terminar',
    );
    expect(() => parseBibliotecaMegaReferenceId('gestao-contratos')).toThrow('inválido');
  });

  it('derives local group IDs from mega review links', () => {
    expect(megaReviewVinculoIdFromEntry('concurso/grupo/mega-revisao/vinculo.json')).toBe(
      'concurso/grupo',
    );
    expect(megaReviewVinculoIdFromEntry('concurso\\grupo\\sub\\mega-revisao\\vinculo.json')).toBe(
      'concurso/grupo/sub',
    );
    expect(() => megaReviewVinculoIdFromEntry('concurso/grupo/assunto/vinculo.json')).toThrow(
      'deve terminar',
    );
    expect(() => megaReviewVinculoIdFromEntry('concurso/mega-revisao/vinculo.json')).toThrow(
      '<concurso>/<grupo>',
    );
    expect(() => megaReviewVinculoIdFromEntry('concurso/grupo/mega-revisao/index.md')).toThrow(
      'deve terminar',
    );
  });
});
