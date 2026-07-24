import { z } from 'zod';
import { questionOptionSchema, questionOriginSchema } from './content-schema';
import {
  getLocalSimuladoRecord,
  getSharedDocumentRecord,
  saveSimuladoDocument,
  updateSharedDocuments,
} from './offline-db';
import type { RandomSource } from './question-order';

// Identificadores estáveis (mesmo alfabeto do conteúdo editorial).
const stableId = z.string().regex(/^[A-Za-z0-9_-]{1,64}$/);
const storageSegment = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

// Filtro de origem da configuração: 'all' é um valor de seleção (não uma origem de questão).
export const simuladoOriginFilterSchema = z.enum(['all', 'authorial', 'previous_exam']);
export type SimuladoOriginFilter = z.infer<typeof simuladoOriginFilterSchema>;

export const simuladoConfigSchema = z
  .object({
    contestStorageId: storageSegment.max(20),
    subjectStorageIds: z.array(storageSegment.max(32)).min(1),
    origin: simuladoOriginFilterSchema,
    questionCount: z.number().int().positive(),
  })
  .strict();
export type SimuladoConfig = z.infer<typeof simuladoConfigSchema>;

// Snapshot congelado de cada questão sorteada: preserva enunciado, alternativas, gabarito,
// explicação e origem para que o resultado histórico não mude quando o catálogo for revisado.
export const simuladoQuestionSnapshotSchema = z
  .object({
    contestStorageId: storageSegment.max(20),
    subjectStorageId: storageSegment.max(32),
    questionId: stableId,
    questionRevision: z.number().int().positive(),
    origin: questionOriginSchema,
    prompt: z.string().trim().min(1),
    options: z.array(questionOptionSchema).min(2),
    correctOptionId: stableId,
    explanation: z.string().trim().min(1),
  })
  .strict();
export type SimuladoQuestionSnapshot = z.infer<typeof simuladoQuestionSnapshotSchema>;

export const simuladoStoredAnswerSchema = z
  .object({
    optionId: stableId,
    questionRevision: z.number().int().positive(),
  })
  .strict();
export type SimuladoStoredAnswer = z.infer<typeof simuladoStoredAnswerSchema>;

export const simuladoSubjectResultSchema = z
  .object({
    subjectStorageId: storageSegment.max(32),
    total: z.number().int().nonnegative(),
    answered: z.number().int().nonnegative(),
    correct: z.number().int().nonnegative(),
  })
  .strict();

export const simuladoResultSchema = z
  .object({
    total: z.number().int().nonnegative(),
    answered: z.number().int().nonnegative(),
    correct: z.number().int().nonnegative(),
    incorrect: z.number().int().nonnegative(),
    unanswered: z.number().int().nonnegative(),
    percent: z.number().min(0).max(100),
    bySubject: z.array(simuladoSubjectResultSchema),
  })
  .strict();
export type SimuladoResult = z.infer<typeof simuladoResultSchema>;

export const simuladoStatusSchema = z.enum(['in_progress', 'completed']);
export type SimuladoStatus = z.infer<typeof simuladoStatusSchema>;

// Documento detalhado, próprio de cada simulado (concursos--<alias>--simulado--<uuid>).
// Autossuficiente: carrega os snapshots, então a sincronização valida só por schema.
export const simuladoDocumentSchema = z
  .object({
    schemaVersion: z.literal(1),
    simulationId: z.string().uuid(),
    status: simuladoStatusSchema,
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    completedAt: z.string().datetime().nullable(),
    configuration: simuladoConfigSchema,
    questions: z.array(simuladoQuestionSnapshotSchema).min(1),
    answers: z.record(z.string(), simuladoStoredAnswerSchema),
    result: simuladoResultSchema.nullable(),
  })
  .strict();
export type SimuladoDocument = z.infer<typeof simuladoDocumentSchema>;

// Resumo no índice de perfil (concursos--<alias>--simulados).
export const simuladoSummarySchema = z
  .object({
    id: z.string().uuid(),
    status: simuladoStatusSchema,
    contestStorageId: storageSegment.max(20),
    subjectStorageIds: z.array(storageSegment.max(32)).min(1),
    origin: simuladoOriginFilterSchema,
    questionCount: z.number().int().positive(),
    answeredCount: z.number().int().nonnegative(),
    correctCount: z.number().int().nonnegative().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    completedAt: z.string().datetime().nullable(),
  })
  .strict();
export type SimuladoSummary = z.infer<typeof simuladoSummarySchema>;

export const SIMULADOS_INDEX_LIMIT = 20;

export const simuladosIndexSchema = z
  .object({
    schemaVersion: z.literal(1),
    simulados: z.array(simuladoSummarySchema),
  })
  .strict();
export type SimuladosIndex = z.infer<typeof simuladosIndexSchema>;

export const EMPTY_SIMULADOS_INDEX: SimuladosIndex = { schemaVersion: 1, simulados: [] };

// Pool de questões (dados de build por concurso) do qual o simulado é sorteado.
export interface SimuladoPoolQuestion {
  questionId: string;
  questionRevision: number;
  origin: SimuladoQuestionSnapshot['origin'];
  prompt: string;
  options: SimuladoQuestionSnapshot['options'];
  correctOptionId: string;
  explanation: string;
}
export interface SimuladoPoolSubject {
  subjectStorageId: string;
  questions: SimuladoPoolQuestion[];
}
export interface SimuladoPool {
  contestStorageId: string;
  subjects: SimuladoPoolSubject[];
}

/** Chave estável por questão dentro de um simulado (subjectStorageId único no concurso). */
export function simuladoQuestionKey(question: {
  subjectStorageId: string;
  questionId: string;
}): string {
  return `${question.subjectStorageId}--${question.questionId}`;
}

function matchesOrigin(origin: SimuladoQuestionSnapshot['origin'], filter: SimuladoOriginFilter): boolean {
  return filter === 'all' || origin === filter;
}

/** Questões disponíveis para uma seleção de assuntos e filtro de origem. */
export function availableQuestions(
  pool: SimuladoPool,
  subjectStorageIds: readonly string[],
  origin: SimuladoOriginFilter,
): number {
  const selected = new Set(subjectStorageIds);
  return pool.subjects
    .filter((subject) => selected.has(subject.subjectStorageId))
    .reduce(
      (sum, subject) => sum + subject.questions.filter((q) => matchesOrigin(q.origin, origin)).length,
      0,
    );
}

/** Fisher–Yates genérico, controlado por uma fonte de aleatoriedade injetável. */
function shuffle<T>(items: readonly T[], random: RandomSource): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

/**
 * Distribui `total` vagas entre assuntos com disponibilidade limitada, o mais equilibrado
 * possível: round-robin que só concede uma vaga a quem ainda tem questões disponíveis.
 */
function allocateAcrossSubjects(capacities: number[], total: number): number[] {
  const allocation = capacities.map(() => 0);
  let remaining = total;
  let progressed = true;
  while (remaining > 0 && progressed) {
    progressed = false;
    for (let index = 0; index < capacities.length && remaining > 0; index += 1) {
      if (allocation[index] < capacities[index]) {
        allocation[index] += 1;
        remaining -= 1;
        progressed = true;
      }
    }
  }
  return allocation;
}

export class SimuladoDrawError extends Error {}

/**
 * Sorteia sem repetição, distribuindo entre os assuntos selecionados tão equilibrado quanto a
 * disponibilidade permitir, e congela a ordem final (embaralhada entre assuntos).
 */
export function drawSimuladoQuestions(
  pool: SimuladoPool,
  config: SimuladoConfig,
  random: RandomSource = Math.random,
): SimuladoQuestionSnapshot[] {
  if (config.questionCount < 1) throw new SimuladoDrawError('A quantidade deve ser positiva');
  const bySubject = new Map(pool.subjects.map((subject) => [subject.subjectStorageId, subject]));
  const selectedSubjects = config.subjectStorageIds.filter((id) => bySubject.has(id));
  if (selectedSubjects.length === 0) throw new SimuladoDrawError('Nenhum assunto válido selecionado');

  // Pools embaralhados por assunto (só a origem escolhida).
  const shuffledPools = selectedSubjects.map((subjectStorageId) => {
    const subject = bySubject.get(subjectStorageId)!;
    const eligible = subject.questions.filter((q) => matchesOrigin(q.origin, config.origin));
    return { subjectStorageId, questions: shuffle(eligible, random) };
  });

  const available = shuffledPools.reduce((sum, entry) => sum + entry.questions.length, 0);
  if (config.questionCount > available) {
    throw new SimuladoDrawError('A quantidade solicitada excede as questões disponíveis');
  }

  const allocation = allocateAcrossSubjects(
    shuffledPools.map((entry) => entry.questions.length),
    config.questionCount,
  );

  const drawn: SimuladoQuestionSnapshot[] = [];
  shuffledPools.forEach((entry, index) => {
    for (const question of entry.questions.slice(0, allocation[index])) {
      drawn.push({
        contestStorageId: pool.contestStorageId,
        subjectStorageId: entry.subjectStorageId,
        questionId: question.questionId,
        questionRevision: question.questionRevision,
        origin: question.origin,
        prompt: question.prompt,
        options: question.options,
        correctOptionId: question.correctOptionId,
        explanation: question.explanation,
      });
    }
  });

  // Congela a ordem final embaralhando o conjunto combinado (mistura os assuntos).
  return shuffle(drawn, random);
}

/** Cria o documento inicial de um simulado a partir de questões já sorteadas e congeladas. */
export function createSimuladoDocument(input: {
  simulationId: string;
  configuration: SimuladoConfig;
  questions: SimuladoQuestionSnapshot[];
  now: string;
}): SimuladoDocument {
  return {
    schemaVersion: 1,
    simulationId: input.simulationId,
    status: 'in_progress',
    createdAt: input.now,
    updatedAt: input.now,
    completedAt: null,
    configuration: input.configuration,
    questions: input.questions,
    answers: {},
    result: null,
  };
}

/** Resultado geral e por assunto sobre os snapshots congelados (estável a revisões do catálogo). */
export function computeSimuladoResult(document: SimuladoDocument): SimuladoResult {
  const perSubject = new Map<string, { total: number; answered: number; correct: number }>();
  let answered = 0;
  let correct = 0;

  for (const question of document.questions) {
    const bucket = perSubject.get(question.subjectStorageId) ?? { total: 0, answered: 0, correct: 0 };
    bucket.total += 1;
    const answer = document.answers[simuladoQuestionKey(question)];
    // Só conta respostas cuja revisão corresponde ao snapshot congelado.
    if (answer && answer.questionRevision === question.questionRevision) {
      bucket.answered += 1;
      answered += 1;
      if (answer.optionId === question.correctOptionId) {
        bucket.correct += 1;
        correct += 1;
      }
    }
    perSubject.set(question.subjectStorageId, bucket);
  }

  const total = document.questions.length;
  return {
    total,
    answered,
    correct,
    incorrect: answered - correct,
    unanswered: total - answered,
    percent: total > 0 ? Math.round((correct / total) * 100) : 0,
    bySubject: [...perSubject.entries()].map(([subjectStorageId, bucket]) => ({
      subjectStorageId,
      ...bucket,
    })),
  };
}

/** Conta quantas questões têm resposta com revisão correspondente. */
export function countAnswered(document: SimuladoDocument): number {
  return document.questions.reduce((count, question) => {
    const answer = document.answers[simuladoQuestionKey(question)];
    return count + (answer && answer.questionRevision === question.questionRevision ? 1 : 0);
  }, 0);
}

/** Deriva o resumo de índice a partir do documento detalhado. */
export function buildSimuladoSummary(document: SimuladoDocument): SimuladoSummary {
  const completed = document.status === 'completed';
  return {
    id: document.simulationId,
    status: document.status,
    contestStorageId: document.configuration.contestStorageId,
    subjectStorageIds: document.configuration.subjectStorageIds,
    origin: document.configuration.origin,
    questionCount: document.configuration.questionCount,
    answeredCount: countAnswered(document),
    correctCount: completed && document.result ? document.result.correct : null,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
    completedAt: document.completedAt,
  };
}

/** Insere/atualiza um resumo no índice, sem duplicar IDs, mantendo os 20 mais recentes. */
export function upsertSimuladoSummary(index: SimuladosIndex, summary: SimuladoSummary): SimuladosIndex {
  const others = index.simulados.filter((item) => item.id !== summary.id);
  const merged = [summary, ...others].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return { schemaVersion: 1, simulados: merged.slice(0, SIMULADOS_INDEX_LIMIT) };
}

/** Registra uma resposta no documento; não altera um simulado já finalizado. */
export function setSimuladoAnswer(
  document: SimuladoDocument,
  key: string,
  answer: SimuladoStoredAnswer,
  now: string,
): SimuladoDocument {
  if (document.status === 'completed') return document;
  return { ...document, answers: { ...document.answers, [key]: answer }, updatedAt: now };
}

/** Finaliza de forma idempotente: recalcula o resultado só na primeira vez; congela status/result. */
export function finalizeSimuladoDocument(document: SimuladoDocument, now: string): SimuladoDocument {
  if (document.status === 'completed' && document.result) return document;
  return {
    ...document,
    status: 'completed',
    completedAt: document.completedAt ?? now,
    result: computeSimuladoResult(document),
    updatedAt: now,
  };
}

// ---- Persistência (índice singleton + documento detalhado) ----

/** Índice de simulados do perfil, validado; vazio quando ausente ou inválido. */
export async function loadSimuladosIndex(profileId: string): Promise<SimuladosIndex> {
  const record = await getSharedDocumentRecord('simuladosIndex', profileId);
  const parsed = simuladosIndexSchema.safeParse(record?.current);
  return parsed.success ? parsed.data : EMPTY_SIMULADOS_INDEX;
}

/** Insere/atualiza o resumo no índice durável (merge sobre o registro mais recente). */
export async function saveSimuladoSummary(profileId: string, summary: SimuladoSummary): Promise<void> {
  await updateSharedDocuments(profileId, [
    {
      storeName: 'simuladosIndex',
      dirtyFields: [summary.id],
      updateCurrent: (current) => {
        const parsed = simuladosIndexSchema.safeParse(current);
        return upsertSimuladoSummary(parsed.success ? parsed.data : EMPTY_SIMULADOS_INDEX, summary);
      },
    },
  ]);
}

/** Documento detalhado durável, validado; null quando ausente ou inválido. */
export async function loadSimuladoDocument(documentId: string): Promise<SimuladoDocument | null> {
  const record = await getLocalSimuladoRecord(documentId);
  const parsed = record ? simuladoDocumentSchema.safeParse(record.current) : undefined;
  return parsed?.success ? parsed.data : null;
}

/**
 * Persiste o documento detalhado transformando o registro durável mais recente (seguro entre abas)
 * e valida o resultado. Retorna o documento efetivamente gravado.
 */
export async function persistSimuladoDocument(
  profileId: string,
  documentId: string,
  transform: (current: SimuladoDocument | undefined) => SimuladoDocument,
): Promise<SimuladoDocument> {
  const record = await saveSimuladoDocument({
    profileId,
    documentId,
    updateCurrent: (current) => simuladoDocumentSchema.parse(transform(current)),
  });
  return record.current;
}
