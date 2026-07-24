import { afterEach, describe, expect, it, vi } from 'vitest';
import type { QuestionSet } from '../../src/lib/content-schema';
import { parseRemoteAnswerDocument } from '../../src/lib/document-schema';
import { recreationWarning, requestProfileSync, resolveVersionAction } from '../../src/lib/sync';
import type { AnswerDocument } from '../../src/lib/questionnaire';

const questionSet: QuestionSet = {
  schemaVersion: 1,
  questionSetRevision: 1,
  questions: [
    {
      id: 'q1',
      revision: 1,
      origin: 'authorial',
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
      origin: 'previous_exam',
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

describe('document version resolution', () => {
  it.each([
    { local: null, remote: null, expected: 'noop' },
    { local: null, remote: 1, expected: 'adopt-remote' },
    { local: { remoteVersion: 1, outboxState: 'clean' as const }, remote: 2, expected: 'adopt-remote' },
    { local: { remoteVersion: 2, outboxState: 'clean' as const }, remote: 1, expected: 'publish-local' },
    { local: { remoteVersion: 2, outboxState: 'clean' as const }, remote: null, expected: 'publish-local' },
    { local: { remoteVersion: 2, outboxState: 'pending' as const }, remote: 2, expected: 'publish-local' },
    { local: { remoteVersion: 2, outboxState: 'clean' as const }, remote: 2, expected: 'noop' },
    { local: { remoteVersion: null, outboxState: 'pending' as const }, remote: null, expected: 'publish-local' },
    { local: { remoteVersion: null, outboxState: 'clean' as const }, remote: null, expected: 'noop' },
  ])('returns $expected for local $local and remote version $remote', ({ local, remote, expected }) => {
    expect(resolveVersionAction(local, remote)).toBe(expected);
  });

  it('warns when an equal-version remote document has a new creation date', () => {
    expect(
      recreationWarning(
        { remoteVersion: 2, remoteCreatedAt: '2026-07-01T00:00:00.000Z' },
        2,
        '2026-07-02T00:00:00.000Z',
      ),
    ).toContain('data de criação remota mudou');
  });

  it('warns when the observed remote version regresses or disappears', () => {
    const record = { remoteVersion: 3, remoteCreatedAt: '2026-07-01T00:00:00.000Z' };

    expect(recreationWarning(record, 2, record.remoteCreatedAt)).toContain('versão remota regrediu');
    expect(recreationWarning(record, null, null)).toContain('versão remota regrediu');
  });
});

describe('remote answer validation', () => {
  it('rejects remote options that do not exist in the current catalog', () => {
    expect(() =>
      parseRemoteAnswerDocument(
        document({ q1: { optionId: 'missing', questionRevision: 1 } }),
        questionSet,
      ),
    ).toThrow('Opção remota inexistente');
  });

  it('refuses a remote question set revision newer than the local catalog', () => {
    expect(() =>
      parseRemoteAnswerDocument(
        { ...document({ q1: { optionId: 'a', questionRevision: 1 } }), questionSetRevision: 2 },
        questionSet,
      ),
    ).toThrow('documento remoto usa a revisão editorial 2');
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
