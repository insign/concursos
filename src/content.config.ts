import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  cheatSheetSchema,
  contestSchema,
  groupSchema,
  megaReviewSchema,
  questionSetSchema,
  referenceSchema,
  resolutionSchema,
  subjectSchema,
  vinculoSchema,
} from './lib/content-schema';
import {
  bibliotecaIdFromEntry,
  bibliotecaReferenceIdFromEntry,
  bibliotecaResolutionIdFromEntry,
  contestIdFromEntry,
  groupIdFromEntry,
  megaReviewIdFromEntry,
  referenceIdFromEntry,
  resolutionIdFromEntry,
  subjectIdFromEntry,
  vinculoIdFromEntry,
} from './lib/content-paths';

const concursos = defineCollection({
  loader: glob({
    base: './src/content/concursos',
    pattern: '**/*.json',
    generateId: ({ entry }) => contestIdFromEntry(entry),
  }),
  schema: contestSchema,
});

const grupos = defineCollection({
  loader: glob({
    base: './src/content/assuntos',
    pattern: '**/grupo.json',
    generateId: ({ entry }) => groupIdFromEntry(entry),
  }),
  schema: groupSchema,
});

const megaRevisoes = defineCollection({
  loader: glob({
    base: './src/content/assuntos',
    pattern: '**/mega-revisao/index.md',
    generateId: ({ entry }) => megaReviewIdFromEntry(entry),
  }),
  schema: megaReviewSchema,
});

const conteudos = defineCollection({
  loader: glob({
    base: './src/content/assuntos',
    pattern: '**/conteudo.md',
    generateId: ({ entry }) => subjectIdFromEntry(entry, 'conteudo.md'),
  }),
  schema: subjectSchema,
});

const cheatSheets = defineCollection({
  loader: glob({
    base: './src/content/assuntos',
    pattern: '**/cheat-sheet.md',
    generateId: ({ entry }) => subjectIdFromEntry(entry, 'cheat-sheet.md'),
  }),
  schema: cheatSheetSchema,
});

const questoes = defineCollection({
  loader: glob({
    base: './src/content/assuntos',
    pattern: '**/questoes.json',
    generateId: ({ entry }) => subjectIdFromEntry(entry, 'questoes.json'),
  }),
  schema: questionSetSchema,
});

const resolucoes = defineCollection({
  loader: glob({
    base: './src/content/assuntos',
    // O companion agregado pertence à collection de referências.
    pattern: ['**/resolucoes/*.md', '!**/resolucoes/referencias.md'],
    generateId: ({ entry }) => resolutionIdFromEntry(entry),
  }),
  schema: resolutionSchema,
});

const referencias = defineCollection({
  loader: glob({
    base: './src/content/assuntos',
    pattern: '**/referencias.md',
    generateId: ({ entry }) => referenceIdFromEntry(entry),
  }),
  schema: referenceSchema,
});

const bibliotecaConteudos = defineCollection({
  loader: glob({
    base: './src/content/biblioteca',
    pattern: '**/conteudo.md',
    generateId: ({ entry }) => bibliotecaIdFromEntry(entry, 'conteudo.md'),
  }),
  schema: subjectSchema,
});

const bibliotecaCheatSheets = defineCollection({
  loader: glob({
    base: './src/content/biblioteca',
    pattern: '**/cheat-sheet.md',
    generateId: ({ entry }) => bibliotecaIdFromEntry(entry, 'cheat-sheet.md'),
  }),
  schema: cheatSheetSchema,
});

const bibliotecaQuestoes = defineCollection({
  loader: glob({
    base: './src/content/biblioteca',
    pattern: '**/questoes.json',
    generateId: ({ entry }) => bibliotecaIdFromEntry(entry, 'questoes.json'),
  }),
  schema: questionSetSchema,
});

const bibliotecaReferencias = defineCollection({
  loader: glob({
    base: './src/content/biblioteca',
    pattern: '**/referencias.md',
    generateId: ({ entry }) => bibliotecaReferenceIdFromEntry(entry),
  }),
  schema: referenceSchema,
});

const bibliotecaResolucoes = defineCollection({
  loader: glob({
    base: './src/content/biblioteca',
    pattern: ['**/resolucoes/*.md', '!**/resolucoes/referencias.md'],
    generateId: ({ entry }) => bibliotecaResolutionIdFromEntry(entry),
  }),
  schema: resolutionSchema,
});

const vinculos = defineCollection({
  loader: glob({
    base: './src/content/assuntos',
    pattern: '**/vinculo.json',
    generateId: ({ entry }) => vinculoIdFromEntry(entry),
  }),
  schema: vinculoSchema,
});

export const collections = {
  concursos,
  grupos,
  megaRevisoes,
  conteudos,
  cheatSheets,
  questoes,
  resolucoes,
  referencias,
  bibliotecaConteudos,
  bibliotecaCheatSheets,
  bibliotecaQuestoes,
  bibliotecaReferencias,
  bibliotecaResolucoes,
  vinculos,
};
