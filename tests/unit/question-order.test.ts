import { describe, expect, it } from 'vitest';
import type { Question } from '../../src/lib/content-schema';
import {
  buildQuestionSeed,
  deterministicQuestionOrder,
  randomQuestionOrder,
} from '../../src/lib/question-order';

const questions = Array.from({ length: 12 }, (_, index): Question => ({
  id: `q${index + 1}`,
  revision: 1,
  prompt: `Questão ${index + 1}`,
  options: [
    { id: 'a', text: 'A' },
    { id: 'b', text: 'B' },
  ],
  correctOptionId: 'a',
  explanation: 'Explicação',
}));

describe('deterministic question order', () => {
  it('keeps the same order for the same identity and revision', () => {
    const seed = buildQuestionSeed('perfil', 'concurso', 'assunto', 2);
    expect(deterministicQuestionOrder(questions, seed).map(({ id }) => id)).toEqual(
      deterministicQuestionOrder(questions, seed).map(({ id }) => id),
    );
  });

  it('changes the order when identity or revision changes without mutating input', () => {
    const original = questions.map(({ id }) => id);
    const first = deterministicQuestionOrder(questions, buildQuestionSeed('perfil-a', 'c', 'a', 1));
    const second = deterministicQuestionOrder(questions, buildQuestionSeed('perfil-b', 'c', 'a', 2));
    expect(first.map(({ id }) => id)).not.toEqual(second.map(({ id }) => id));
    expect(questions.map(({ id }) => id)).toEqual(original);
  });
});

describe('random question order', () => {
  it('uses Fisher-Yates with an injectable random source without mutating input', () => {
    const original = questions.map(({ id }) => id);
    const subset = questions.slice(0, 3);
    const ordered = randomQuestionOrder(subset, subset, () => 0);

    expect(ordered.map(({ id }) => id)).toEqual(['q2', 'q3', 'q1']);
    expect(questions.map(({ id }) => id)).toEqual(original);
    expect(ordered).not.toBe(subset);
  });

  it('guarantees a different consecutive order when random attempts repeat', () => {
    const pair = questions.slice(0, 2);
    let randomCalls = 0;
    const first = randomQuestionOrder(pair, pair, () => {
      randomCalls += 1;
      return 0.999;
    });
    const second = randomQuestionOrder(pair, first, () => 0.999);

    expect(first.map(({ id }) => id)).toEqual(['q2', 'q1']);
    expect(second.map(({ id }) => id)).toEqual(['q1', 'q2']);
    expect(second.map(({ id }) => id)).not.toEqual(first.map(({ id }) => id));
    expect(randomCalls).toBe(5);
  });

  it('returns new arrays for empty and singleton lists without consuming randomness', () => {
    let randomCalls = 0;
    const random = () => {
      randomCalls += 1;
      return 0.5;
    };
    const empty: Question[] = [];
    const singleton = questions.slice(0, 1);

    expect(randomQuestionOrder(empty, empty, random)).toEqual([]);
    expect(randomQuestionOrder(empty, empty, random)).not.toBe(empty);
    expect(randomQuestionOrder(singleton, singleton, random)).toEqual(singleton);
    expect(randomQuestionOrder(singleton, singleton, random)).not.toBe(singleton);
    expect(randomCalls).toBe(0);
  });

  it('keeps a filtered subset complete and isolated', () => {
    const subset = [questions[1]!, questions[4]!, questions[8]!];
    const ordered = randomQuestionOrder(subset, subset, () => 0);

    expect(ordered.map(({ id }) => id).sort()).toEqual(subset.map(({ id }) => id).sort());
    expect(ordered).toHaveLength(subset.length);
  });
});
