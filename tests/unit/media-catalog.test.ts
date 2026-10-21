import { describe, expect, it } from 'vitest';
import { mediaCatalogSchema } from '../../src/lib/content-schema';
import {
  buildSubjectMediaItems,
  resolveSubjectMedia,
} from '../../src/lib/media-catalog';
import { mediaDocumentKey } from '../../src/lib/media-identity';
import { buildMediaDocumentId } from '../../src/lib/identity';

const sha256 = 'c'.repeat(64);

function catalog(files: Array<{ file: string; bytes?: number }>) {
  return mediaCatalogSchema.parse({
    schemaVersion: 1,
    items: files.map((entry, index) => ({
      file: entry.file,
      sha256: `${index}`.repeat(64),
      bytes: entry.bytes ?? 1024,
    })),
  });
}

describe('subject media items', () => {
  it('deriva MIME, tipo, rótulo e URL a partir do nome do arquivo', () => {
    const items = buildSubjectMediaItems(catalog([{ file: 'aula-principal.mp3' }]));
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      file: 'aula-principal.mp3',
      label: 'Aula principal',
      kind: 'audio',
      mime: 'audio/mpeg',
      bytes: 1024,
      url: `/media/${'0'.repeat(64)}.mp3`,
    });
  });

  it('aceita vídeo e devolve lista vazia sem catálogo', () => {
    const items = buildSubjectMediaItems(catalog([{ file: 'aula-completa.mp4' }]));
    expect(items[0]).toMatchObject({ kind: 'video', mime: 'video/mp4' });
    expect(buildSubjectMediaItems(null)).toEqual([]);
    expect(buildSubjectMediaItems(undefined)).toEqual([]);
  });
});

describe('subject media resolution', () => {
  it('usa a mídia própria do assunto físico', () => {
    const result = resolveSubjectMedia({
      subjectId: 'concurso/grupo/assunto',
      canonicalId: null,
      ownCatalog: catalog([{ file: 'aula.mp3' }]),
      canonicalCatalog: undefined,
    });
    expect(result.media).toHaveLength(1);
  });

  it('usa a mídia da origem canônica no consumidor vinculado', () => {
    const result = resolveSubjectMedia({
      subjectId: 'concurso/grupo/assunto',
      canonicalId: 'grupo/assunto',
      ownCatalog: undefined,
      canonicalCatalog: catalog([{ file: 'aula.mp3' }]),
    });
    expect(result.media).toHaveLength(1);
  });

  it('rejeita consumidor vinculado com catálogo de mídia próprio', () => {
    expect(() =>
      resolveSubjectMedia({
        subjectId: 'concurso/grupo/assunto',
        canonicalId: 'grupo/assunto',
        ownCatalog: catalog([{ file: 'aula.mp3' }]),
        canonicalCatalog: catalog([{ file: 'aula.mp3' }]),
      }),
    ).toThrow(/vínculo canônico e catálogo de mídia próprio/);
  });

  it('não inventa mídia quando o assunto não tem catálogo', () => {
    const result = resolveSubjectMedia({
      subjectId: 'concurso/grupo/assunto',
      canonicalId: null,
      ownCatalog: undefined,
      canonicalCatalog: undefined,
    });
    expect(result.media).toEqual([]);
  });
});

describe('media document identity', () => {
  it('deriva a mesma chave para o mesmo par de identidades', () => {
    const key = mediaDocumentKey('concurso-exemplo', 'assunto-exemplo');
    expect(key).toMatch(/^[a-f0-9]{16}$/);
    expect(mediaDocumentKey('concurso-exemplo', 'assunto-exemplo')).toBe(key);
    expect(mediaDocumentKey('concurso-exemplo', 'outro-assunto')).not.toBe(key);
  });

  it('gera um ID remoto dentro do limite de 100 caracteres', () => {
    const alias = 'a'.repeat(32);
    const key = mediaDocumentKey('c'.repeat(20), 's'.repeat(32));
    const documentId = buildMediaDocumentId(alias, key);
    expect(documentId.startsWith(`concursos--${alias}--midia--`)).toBe(true);
    expect(documentId.length).toBeLessThanOrEqual(100);
    expect(documentId).toMatch(/^[A-Za-z0-9_-]{1,100}$/);
  });

  it('rejeita chave de mídia fora do formato', () => {
    expect(() => buildMediaDocumentId('alias-valido', 'curta')).toThrow(/16 caracteres/);
    expect(() => buildMediaDocumentId('alias-valido', 'Z'.repeat(16))).toThrow(/16 caracteres/);
  });
});

describe('media catalog schema', () => {
  it('aceita até dezesseis itens e recusa mais', () => {
    const many = Array.from({ length: 16 }, (_, index) => ({
      file: `aula-${index}.mp3`,
      sha256: index.toString(16).padStart(2, '0').repeat(32),
      bytes: 10,
    }));
    expect(mediaCatalogSchema.safeParse({ schemaVersion: 1, items: many }).success).toBe(true);
    expect(
      mediaCatalogSchema.safeParse({
        schemaVersion: 1,
        items: [...many, { file: 'aula-16.mp3', sha256: 'f'.repeat(64), bytes: 10 }],
      }).success,
    ).toBe(false);
  });

  it('recusa o mesmo conteúdo em dois arquivos diferentes', () => {
    expect(
      mediaCatalogSchema.safeParse({
        schemaVersion: 1,
        items: [
          { file: 'aula.mp3', sha256, bytes: 10 },
          { file: 'aula-copia.mp3', sha256, bytes: 10 },
        ],
      }).success,
    ).toBe(false);
  });
});
