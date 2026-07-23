import type { Question } from './content-schema';

export type RandomSource = () => number;

const RANDOM_ORDER_ATTEMPTS = 5;

function seedToUint32(seed: string): number {
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function mulberry32(seed: number): RandomSource {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function fisherYatesOrder(questions: readonly Question[], random: RandomSource): Question[] {
  const ordered = [...questions];

  for (let index = ordered.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    const current = ordered[index]!;
    ordered[index] = ordered[target]!;
    ordered[target] = current;
  }

  return ordered;
}

function hasSameQuestionOrder(first: readonly Question[], second: readonly Question[]): boolean {
  return first.length === second.length && first.every((question, index) => question.id === second[index]?.id);
}

export function buildQuestionSeed(
  userId: string,
  contestStorageId: string,
  subjectStorageId: string,
  questionSetRevision: number,
): string {
  return `${userId}--${contestStorageId}--${subjectStorageId}--${questionSetRevision}`;
}

export function deterministicQuestionOrder(questions: readonly Question[], seed: string): Question[] {
  return fisherYatesOrder(questions, mulberry32(seedToUint32(seed)));
}

export function randomQuestionOrder(
  questions: readonly Question[],
  previousOrder: readonly Question[],
  random: RandomSource = Math.random,
): Question[] {
  if (questions.length < 2) return [...questions];

  let candidate = [...questions];
  for (let attempt = 0; attempt < RANDOM_ORDER_ATTEMPTS; attempt += 1) {
    candidate = fisherYatesOrder(questions, random);
    if (!hasSameQuestionOrder(candidate, previousOrder)) return candidate;
  }

  const first = candidate[0]!;
  candidate[0] = candidate[1]!;
  candidate[1] = first;
  return candidate;
}
