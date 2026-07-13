import { describe, expect, it } from 'vitest';
import { contestSchema, questionSetSchema, subjectSchema } from '../../src/lib/content-schema';

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
