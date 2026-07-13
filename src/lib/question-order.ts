import type { Question } from './content-schema';

function seedToUint32(seed: string): number {
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

export function buildQuestionSeed(
  userId: string,
  contestStorageId: string,
  subjectStorageId: string,
  questionSetRevision: number,
): string {
  return `${userId}--${contestStorageId}--${subjectStorageId}--${questionSetRevision}`;
}

export function deterministicQuestionOrder(questions: Question[], seed: string): Question[] {
  const ordered = [...questions];
  const random = mulberry32(seedToUint32(seed));

  for (let index = ordered.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [ordered[index], ordered[target]] = [ordered[target]!, ordered[index]!];
  }

  return ordered;
}
