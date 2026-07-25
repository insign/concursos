import {
  computeSimuladoResult,
  simuladoDocumentSchema,
  simuladoQuestionKey,
  simuladosIndexSchema,
  type SimuladoDocument,
  type SimuladoResult,
  type SimuladosIndex,
} from './simulados';

export class SimuladoSemanticValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SimuladoSemanticValidationError';
  }
}

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new SimuladoSemanticValidationError(message);
}

function ensureUnique(values: readonly string[], label: string): void {
  invariant(new Set(values).size === values.length, `${label} contém valores duplicados`);
}

function validateTemporalOrder(input: {
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  label: string;
}): void {
  const createdAt = Date.parse(input.createdAt);
  const updatedAt = Date.parse(input.updatedAt);
  invariant(updatedAt >= createdAt, `${input.label}: updatedAt não pode anteceder createdAt`);
  if (input.completedAt === null) return;

  const completedAt = Date.parse(input.completedAt);
  invariant(completedAt >= createdAt, `${input.label}: completedAt não pode anteceder createdAt`);
  invariant(completedAt <= updatedAt, `${input.label}: completedAt não pode suceder updatedAt`);
}

function validateCompletedResult(document: SimuladoDocument, actual: SimuladoResult): void {
  const expected = computeSimuladoResult(document);
  for (const field of [
    'total',
    'answered',
    'correct',
    'incorrect',
    'unanswered',
    'percent',
  ] as const) {
    invariant(
      actual[field] === expected[field],
      `Resultado concluído incompatível no campo ${field}`,
    );
  }

  ensureUnique(
    actual.bySubject.map((item) => item.subjectStorageId),
    'Resultado por assunto',
  );
  invariant(
    actual.bySubject.length === expected.bySubject.length,
    'Resultado por assunto possui quantidade incompatível de assuntos',
  );
  const actualBySubject = new Map(actual.bySubject.map((item) => [item.subjectStorageId, item]));
  for (const expectedSubject of expected.bySubject) {
    const actualSubject = actualBySubject.get(expectedSubject.subjectStorageId);
    invariant(
      actualSubject !== undefined,
      `Resultado não contém o assunto ${expectedSubject.subjectStorageId}`,
    );
    for (const field of ['total', 'answered', 'correct'] as const) {
      invariant(
        actualSubject[field] === expectedSubject[field],
        `Resultado do assunto ${expectedSubject.subjectStorageId} é incompatível no campo ${field}`,
      );
    }
  }
}

export function parseValidatedSimuladoDocument(value: unknown): SimuladoDocument {
  const document = simuladoDocumentSchema.parse(value);
  const { configuration } = document;

  ensureUnique(configuration.subjectStorageIds, 'Configuração de assuntos');
  invariant(
    configuration.questionCount === document.questions.length,
    'questionCount não corresponde à quantidade de questões congeladas',
  );
  validateTemporalOrder({
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
    completedAt: document.completedAt,
    label: 'Simulado',
  });

  const configuredSubjects = new Set(configuration.subjectStorageIds);
  const questionsByKey = new Map<string, SimuladoDocument['questions'][number]>();
  for (const question of document.questions) {
    invariant(
      question.contestStorageId === configuration.contestStorageId,
      `Questão ${question.questionId} pertence a outro concurso`,
    );
    invariant(
      configuredSubjects.has(question.subjectStorageId),
      `Questão ${question.questionId} pertence a um assunto não configurado`,
    );
    if (configuration.origin !== 'all') {
      invariant(
        question.origin === configuration.origin,
        `Questão ${question.questionId} não respeita o filtro de origem`,
      );
    }

    const key = simuladoQuestionKey(question);
    invariant(!questionsByKey.has(key), `Questão duplicada no simulado: ${key}`);
    questionsByKey.set(key, question);

    const optionIds = question.options.map((option) => option.id);
    ensureUnique(optionIds, `Alternativas da questão ${key}`);
    invariant(
      optionIds.includes(question.correctOptionId),
      `Gabarito da questão ${key} não existe entre as alternativas`,
    );
  }

  for (const [key, answer] of Object.entries(document.answers)) {
    const question = questionsByKey.get(key);
    invariant(question !== undefined, `Resposta referencia uma questão inexistente: ${key}`);
    invariant(
      answer.questionRevision === question.questionRevision,
      `Resposta da questão ${key} usa uma revisão incompatível`,
    );
    invariant(
      question.options.some((option) => option.id === answer.optionId),
      `Resposta da questão ${key} referencia uma alternativa inexistente`,
    );
  }

  if (document.status === 'in_progress') {
    invariant(document.completedAt === null, 'Simulado em andamento não pode ter completedAt');
    invariant(document.result === null, 'Simulado em andamento não pode ter resultado final');
  } else {
    invariant(document.completedAt !== null, 'Simulado concluído precisa de completedAt');
    invariant(document.result !== null, 'Simulado concluído precisa de resultado final');
    validateCompletedResult(document, document.result);
  }

  return document;
}

export function parseValidatedSimuladosIndex(value: unknown): SimuladosIndex {
  const index = simuladosIndexSchema.parse(value);
  invariant(index.simulados.length <= 20, 'Índice de simulados excede o limite de 20 itens');
  ensureUnique(
    index.simulados.map((summary) => summary.id),
    'Índice de simulados',
  );

  for (const summary of index.simulados) {
    ensureUnique(summary.subjectStorageIds, `Assuntos do resumo ${summary.id}`);
    invariant(
      summary.answeredCount <= summary.questionCount,
      `Resumo ${summary.id} possui mais respostas que questões`,
    );
    if (summary.correctCount !== null) {
      invariant(
        summary.correctCount <= summary.answeredCount,
        `Resumo ${summary.id} possui mais acertos que respostas`,
      );
    }

    if (summary.status === 'in_progress') {
      invariant(summary.completedAt === null, `Resumo em andamento ${summary.id} possui completedAt`);
      invariant(summary.correctCount === null, `Resumo em andamento ${summary.id} possui correctCount`);
    } else {
      invariant(summary.completedAt !== null, `Resumo concluído ${summary.id} não possui completedAt`);
      invariant(summary.correctCount !== null, `Resumo concluído ${summary.id} não possui correctCount`);
    }

    validateTemporalOrder({
      createdAt: summary.createdAt,
      updatedAt: summary.updatedAt,
      completedAt: summary.completedAt,
      label: `Resumo ${summary.id}`,
    });
  }

  for (let indexPosition = 1; indexPosition < index.simulados.length; indexPosition += 1) {
    invariant(
      index.simulados[indexPosition - 1].updatedAt >= index.simulados[indexPosition].updatedAt,
      'Índice de simulados não está ordenado por updatedAt decrescente',
    );
  }

  return index;
}
