import { describe, expect, it } from 'vitest';
import type { Question } from '../../src/lib/content-schema';
import { buildQuestionSeed, deterministicQuestionOrder } from '../../src/lib/question-order';

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
