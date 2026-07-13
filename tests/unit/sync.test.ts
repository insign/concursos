import { afterEach, describe, expect, it, vi } from 'vitest';
import type { QuestionSet } from '../../src/lib/content-schema';
import { parseRemoteAnswerDocument } from '../../src/lib/document-schema';
import { mergeAnswerDocuments, requestProfileSync } from '../../src/lib/sync';
import { submitAnswers, type AnswerDocument } from '../../src/lib/questionnaire';

const questionSet: QuestionSet = {
  schemaVersion: 1,
  questionSetRevision: 1,
  questions: [
    {
      id: 'q1',
      revision: 1,
      prompt: 'Q1',
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
        { id: 'c', text: 'C' },
      ],
      correctOptionId: 'a',
      explanation: 'A',
    },
    {
      id: 'q2',
      revision: 1,
      prompt: 'Q2',
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
      ],
      correctOptionId: 'b',
      explanation: 'B',
    },
  ],
};

function document(answers: AnswerDocument['answers']): AnswerDocument {
  return { schemaVersion: 1, questionSetRevision: 1, answers, submission: null };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('answer synchronization merge', () => {
  it('uses local-only and remote-only changes by question', () => {
    const base = document({ q1: { optionId: 'a', questionRevision: 1 } });
    const local = document({
      q1: { optionId: 'a', questionRevision: 1 },
      q2: { optionId: 'b', questionRevision: 1 },
    });
    const remote = document({ q1: { optionId: 'b', questionRevision: 1 } });

    expect(mergeAnswerDocuments(local, base, remote, questionSet)).toEqual({
      document: document({
        q1: { optionId: 'b', questionRevision: 1 },
        q2: { optionId: 'b', questionRevision: 1 },
      }),
      conflictingQuestionIds: [],
    });
  });

  it('uses the last observed remote value for a same-question conflict', () => {
    const base = document({ q1: { optionId: 'a', questionRevision: 1 } });
    const local = document({ q1: { optionId: 'b', questionRevision: 1 } });
    const remote = document({ q1: { optionId: 'c', questionRevision: 1 } });
    const merged = mergeAnswerDocuments(local, base, remote, questionSet);

    expect(merged.document.answers.q1?.optionId).toBe('c');
    expect(merged.conflictingQuestionIds).toEqual(['q1']);
  });

  it('keeps a submission only when its signature still matches merged answers', () => {
    const completed = document({
      q1: { optionId: 'a', questionRevision: 1 },
      q2: { optionId: 'b', questionRevision: 1 },
    });
    const submitted = submitAnswers(completed, questionSet);
    expect(mergeAnswerDocuments(submitted, completed, submitted, questionSet).document.submission).not.toBeNull();

    const remote = document({
      q1: { optionId: 'c', questionRevision: 1 },
      q2: { optionId: 'b', questionRevision: 1 },
    });
    expect(mergeAnswerDocuments(submitted, completed, remote, questionSet).document.submission).toBeNull();
  });

  it('rejects remote options that do not exist in the current catalog', () => {
    expect(() =>
      parseRemoteAnswerDocument(
        document({ q1: { optionId: 'missing', questionRevision: 1 } }),
        questionSet,
      ),
    ).toThrow('Opção remota inexistente');
  });
});

describe('background synchronization fallback', () => {
  it('registers a background wake-up when synchronization is requested offline', async () => {
    const register = vi.fn(async () => undefined);
    vi.stubGlobal('navigator', {
      onLine: false,
      serviceWorker: { ready: Promise.resolve({ sync: { register } }) },
    });

    await expect(requestProfileSync('perfil-7f3k')).resolves.toBe(false);
    await vi.waitFor(() => expect(register).toHaveBeenCalledWith('concursos-sync'));
  });

  it('keeps the local fallback working when Background Sync is unavailable', async () => {
    vi.stubGlobal('navigator', {
      onLine: false,
      serviceWorker: { ready: Promise.resolve({}) },
    });

    await expect(requestProfileSync('perfil-7f3k')).resolves.toBe(false);
  });
});
