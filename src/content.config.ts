import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  cheatSheetSchema,
  contestSchema,
  questionSetSchema,
  subjectSchema,
} from './lib/content-schema';
import { contestIdFromEntry, subjectIdFromEntry } from './lib/content-paths';

const concursos = defineCollection({
  loader: glob({
    base: './src/content/concursos',
    pattern: '**/*.json',
    generateId: ({ entry }) => contestIdFromEntry(entry),
  }),
  schema: contestSchema,
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

export const collections = { concursos, conteudos, cheatSheets, questoes };
