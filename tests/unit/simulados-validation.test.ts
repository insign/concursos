import { describe, expect, it } from 'vitest';
import {
  buildSimuladoSummary,
  finalizeSimuladoDocument,
  setSimuladoAnswer,
  simuladoQuestionKey,
  type SimuladoDocument,
} from '../../src/lib/simulados';
import {
  parseValidatedSimuladoDocument,
  parseValidatedSimuladosIndex,
} from '../../src/lib/simulados-validation';

const simulationId = '123e4567-e89b-42d3-a456-426614174000';
const timestamp = '2026-07-25T12:00:00.000Z';

function makeDocument(): SimuladoDocument {
  return {
    schemaVersion: 1,
    simulationId,
    status: 'in_progress',
    createdAt: timestamp,
    updatedAt: timestamp,
    completedAt: null,
    configuration: {
      contestStorageId: 'tcema-2026-adm',
      subjectStorageIds: ['portugues'],
      origin: 'previous_exam',
      questionCount: 1,
    },
    questions: [
      {
        contestStorageId: 'tcema-2026-adm',
        subjectStorageId: 'portugues',
        questionId: 'q1',
        questionRevision: 1,
        origin: 'previous_exam',
        prompt: 'Enunciado',
        options: [
          { id: 'a', text: 'Alternativa A' },
          { id: 'b', text: 'Alternativa B' },
        ],
        correctOptionId: 'a',
        explanation: 'Explicação.',
      },
    ],
    answers: {},
    result: null,
  };
}

describe('validação semântica de simulados', () => {
  it('aceita um documento coerente em andamento e um resultado final calculado', () => {
    const document = makeDocument();
    expect(parseValidatedSimuladoDocument(document)).toEqual(document);

    const question = document.questions[0];
    const answered = setSimuladoAnswer(
      document,
      simuladoQuestionKey(question),
      { optionId: question.correctOptionId, questionRevision: question.questionRevision },
      timestamp,
    );
    const completed = finalizeSimuladoDocument(answered, timestamp);
    expect(parseValidatedSimuladoDocument(completed)).toEqual(completed);
  });

  it('rejeita quantidade, gabarito, respostas e resultados incompatíveis', () => {
    const wrongCount = structuredClone(makeDocument());
    wrongCount.configuration.questionCount = 2;
    expect(() => parseValidatedSimuladoDocument(wrongCount)).toThrow(/questionCount/);

    const missingCorrectOption = structuredClone(makeDocument());
    missingCorrectOption.questions[0].correctOptionId = 'c';
    expect(() => parseValidatedSimuladoDocument(missingCorrectOption)).toThrow(/Gabarito/);

    const unknownAnswer = structuredClone(makeDocument());
    unknownAnswer.answers['portugues--desconhecida'] = { optionId: 'a', questionRevision: 1 };
    expect(() => parseValidatedSimuladoDocument(unknownAnswer)).toThrow(/questão inexistente/);

    const question = makeDocument().questions[0];
    const completed = finalizeSimuladoDocument(
      setSimuladoAnswer(
        makeDocument(),
        simuladoQuestionKey(question),
        { optionId: 'a', questionRevision: 1 },
        timestamp,
      ),
      timestamp,
    );
    if (!completed.result) throw new Error('Resultado esperado');
    completed.result.correct = 0;
    expect(() => parseValidatedSimuladoDocument(completed)).toThrow(/correct/);
  });

  it('rejeita resumos incoerentes ou fora da ordem do índice', () => {
    const summary = buildSimuladoSummary(makeDocument());
    const inconsistent = structuredClone(summary);
    inconsistent.correctCount = 0;
    expect(() =>
      parseValidatedSimuladosIndex({ schemaVersion: 1, simulados: [inconsistent] }),
    ).toThrow(/correctCount/);

    const older = { ...summary, id: '223e4567-e89b-42d3-a456-426614174000' };
    const newer = {
      ...summary,
      id: '323e4567-e89b-42d3-a456-426614174000',
      updatedAt: '2026-07-25T13:00:00.000Z',
    };
    expect(() =>
      parseValidatedSimuladosIndex({ schemaVersion: 1, simulados: [older, newer] }),
    ).toThrow(/ordenado/);
  });
});
