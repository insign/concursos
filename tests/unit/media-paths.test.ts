import { describe, expect, it } from 'vitest';
import {
  bibliotecaMediaCatalogIdFromEntry,
  mediaCatalogIdFromEntry,
} from '../../src/lib/content-paths';
import { mediaCatalogSchema } from '../../src/lib/content-schema';
import {
  MEDIA_FILE_NAME_PATTERN,
  mediaExtensionFromFile,
  mediaKindFromFile,
  mediaLabel,
  mediaMimeFromFile,
  mediaUrl,
} from '../../src/lib/media-paths';

describe('media paths', () => {
  it('classifica extensão, MIME e tipo de mídia', () => {
    expect(mediaExtensionFromFile('aula-principal.mp3')).toBe('mp3');
    expect(mediaExtensionFromFile('aula-principal.MP3')).toBeNull();
    expect(mediaExtensionFromFile('aula-principal.txt')).toBeNull();

    expect(mediaMimeFromFile('aula-principal.mp3')).toBe('audio/mpeg');
    expect(mediaMimeFromFile('aula-principal.m4a')).toBe('audio/mp4');
    expect(mediaMimeFromFile('aula-principal.ogg')).toBe('audio/ogg');
    expect(mediaMimeFromFile('aula-principal.opus')).toBe('audio/ogg');
    expect(mediaMimeFromFile('aula-principal.mp4')).toBe('video/mp4');
    expect(mediaMimeFromFile('aula-principal.webm')).toBe('video/webm');
    expect(mediaMimeFromFile('aula-principal.txt')).toBeNull();

    expect(mediaKindFromFile('aula-principal.mp3')).toBe('audio');
    expect(mediaKindFromFile('aula-principal.mp4')).toBe('video');
    expect(mediaKindFromFile('aula-principal.txt')).toBeNull();
  });

  it('deriva URL imutável a partir do SHA-256', () => {
    const sha256 = 'a'.repeat(64);
    expect(mediaUrl(sha256, 'aula-principal.mp3')).toBe(`/media/${sha256}.mp3`);
    expect(mediaUrl(sha256, 'aula-completa.mp4')).toBe(`/media/${sha256}.mp4`);
    expect(() => mediaUrl(sha256, 'aula-principal.txt')).toThrow(/não suportada/);
  });

  it('humaniza o rótulo a partir do nome do arquivo', () => {
    expect(mediaLabel('aula-principal.mp3')).toBe('Aula principal');
    expect(mediaLabel('01-introducao.mp4')).toBe('01 introducao');
    expect(mediaLabel('revisao.mp3')).toBe('Revisao');
  });

  it('aceita apenas nomes de arquivo em minúsculas com hífen simples', () => {
    expect(MEDIA_FILE_NAME_PATTERN.test('aula-principal.mp3')).toBe(true);
    expect(MEDIA_FILE_NAME_PATTERN.test('01-introducao.mp4')).toBe(true);
    expect(MEDIA_FILE_NAME_PATTERN.test('Aula-Principal.mp3')).toBe(false);
    expect(MEDIA_FILE_NAME_PATTERN.test('aula principal.mp3')).toBe(false);
    expect(MEDIA_FILE_NAME_PATTERN.test('aula_principal.mp3')).toBe(false);
    expect(MEDIA_FILE_NAME_PATTERN.test('aula.txt')).toBe(false);
  });
});

describe('media catalog ids', () => {
  it('deriva o ID do assunto a partir do caminho do catálogo', () => {
    expect(
      mediaCatalogIdFromEntry('concurso-exemplo/administracao/publica/assunto-exemplo/midia/catalogo.json'),
    ).toBe('concurso-exemplo/administracao/publica/assunto-exemplo');
    expect(
      bibliotecaMediaCatalogIdFromEntry('administracao/publica/assunto-exemplo/midia/catalogo.json'),
    ).toBe('administracao/publica/assunto-exemplo');
  });

  it('rejeita caminhos fora da pasta de mídia', () => {
    expect(() => mediaCatalogIdFromEntry('concurso-exemplo/grupo/assunto/catalogo.json')).toThrow(
      /midia\/catalogo\.json/,
    );
    expect(() =>
      bibliotecaMediaCatalogIdFromEntry('administracao/assunto/catalogo.json'),
    ).toThrow(/midia\/catalogo\.json/);
  });
});

describe('media catalog schema', () => {
  const sha256 = 'b'.repeat(64);

  it('aceita um catálogo versionado válido', () => {
    const parsed = mediaCatalogSchema.safeParse({
      schemaVersion: 1,
      items: [{ file: 'aula-principal.mp3', sha256, bytes: 1024 }],
    });
    expect(parsed.success).toBe(true);
  });

  it('rejeita versão desconhecida, campo extra e arquivo duplicado', () => {
    expect(
      mediaCatalogSchema.safeParse({ schemaVersion: 2, items: [] }).success,
    ).toBe(false);
    expect(
      mediaCatalogSchema.safeParse({
        schemaVersion: 1,
        items: [{ file: 'aula.mp3', sha256, bytes: 1024, url: '/media/x.mp3' }],
      }).success,
    ).toBe(false);
    expect(
      mediaCatalogSchema.safeParse({
        schemaVersion: 1,
        items: [
          { file: 'aula.mp3', sha256, bytes: 1024 },
          { file: 'aula.mp3', sha256, bytes: 2048 },
        ],
      }).success,
    ).toBe(false);
  });

  it('rejeita hash, tamanho e nome de arquivo inválidos', () => {
    expect(
      mediaCatalogSchema.safeParse({
        schemaVersion: 1,
        items: [{ file: 'aula.mp3', sha256: 'z'.repeat(64), bytes: 1024 }],
      }).success,
    ).toBe(false);
    expect(
      mediaCatalogSchema.safeParse({
        schemaVersion: 1,
        items: [{ file: 'aula.mp3', sha256, bytes: 0 }],
      }).success,
    ).toBe(false);
    expect(
      mediaCatalogSchema.safeParse({
        schemaVersion: 1,
        items: [{ file: 'Aula.mp3', sha256, bytes: 1024 }],
      }).success,
    ).toBe(false);
  });
});
