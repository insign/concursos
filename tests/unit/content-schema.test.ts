import { describe, expect, it } from 'vitest';
import { contestSchema, groupSchema, questionSetSchema, subjectSchema } from '../../src/lib/content-schema';

const validQuestionSet = {
  schemaVersion: 1 as const,
  questionSetRevision: 1,
  questions: [
    {
      id: 'q001',
      revision: 1,
      prompt: 'Pergunta?',
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
      ],
      correctOptionId: 'b',
      explanation: 'Explicação.',
    },
  ],
};

describe('content schemas', () => {
  it('accepts known versions and valid storage IDs', () => {
    expect(
      contestSchema.parse({
        schemaVersion: 1,
        title: 'Concurso',
        description: 'Descrição',
        order: 0,
        storageId: 'tse',
      }),
    ).toBeTruthy();
    expect(groupSchema.parse({ schemaVersion: 1, title: 'Grupo', order: 0 })).toEqual({
      schemaVersion: 1,
      title: 'Grupo',
      order: 0,
    });
    expect(
      groupSchema.parse({ schemaVersion: 1, title: 'Grupo', order: 1, description: 'Descrição' }),
    ).toBeTruthy();
    expect(
      subjectSchema.parse({
        schemaVersion: 1,
        title: 'Assunto',
        description: 'Descrição',
        order: 0,
        storageId: 'portugues',
      }),
    ).toBeTruthy();
  });

  it('keeps group descriptors strict and free of persisted identity', () => {
    expect(() => groupSchema.parse({ schemaVersion: 2, title: 'Grupo', order: 0 })).toThrow();
    expect(() => groupSchema.parse({ schemaVersion: 1, title: 'Grupo', order: -1 })).toThrow();
    expect(() => groupSchema.parse({ schemaVersion: 1, title: ' ', order: 0 })).toThrow();
    expect(() =>
      groupSchema.parse({ schemaVersion: 1, title: 'Grupo', order: 0, storageId: 'grupo' }),
    ).toThrow();
  });

  it('rejects unknown properties, versions and storage limits', () => {
    expect(() => contestSchema.parse({ schemaVersion: 2 })).toThrow();
    expect(() =>
      contestSchema.parse({
        schemaVersion: 1,
        title: 'Concurso',
        description: 'Descrição',
        order: 0,
        storageId: 'a'.repeat(21),
      }),
    ).toThrow();
    expect(() =>
      subjectSchema.parse({
        schemaVersion: 1,
        title: 'Assunto',
        description: 'Descrição',
        order: 0,
        storageId: 'assunto',
        duplicatedMetadata: true,
      }),
    ).toThrow();
  });

  it('validates question IDs, revisions and answer keys', () => {
    expect(questionSetSchema.parse(validQuestionSet)).toEqual(validQuestionSet);

    const invalidRevision = structuredClone(validQuestionSet);
    invalidRevision.questions[0]!.revision = 0;
    expect(() => questionSetSchema.parse(invalidRevision)).toThrow();

    const invalidKey = structuredClone(validQuestionSet);
    invalidKey.questions[0]!.correctOptionId = 'missing';
    expect(() => questionSetSchema.parse(invalidKey)).toThrow('opção existente');
  });

  it('rejects duplicate question and option IDs', () => {
    const duplicateQuestion = structuredClone(validQuestionSet);
    duplicateQuestion.questions.push(structuredClone(duplicateQuestion.questions[0]!));
    expect(() => questionSetSchema.parse(duplicateQuestion)).toThrow('questão duplicado');

    const duplicateOption = structuredClone(validQuestionSet);
    duplicateOption.questions[0]!.options[1]!.id = 'a';
    expect(() => questionSetSchema.parse(duplicateOption)).toThrow('opção duplicado');
  });
});
