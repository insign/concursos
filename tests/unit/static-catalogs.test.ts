import { describe, expect, it } from 'vitest';
import { buildNavigationCatalogRoutes, buildSyncCatalogSubjects } from '../../src/lib/static-catalogs';
import type { QuestionSet } from '../../src/lib/content-schema';

const questionSet: QuestionSet = {
  schemaVersion: 1,
  questionSetRevision: 1,
  questions: [{
    id: 'q1',
    revision: 1,
    origin: 'authorial',
    prompt: 'Statement',
    options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }],
    correctOptionId: 'a',
    explanation: 'Fonte: questão autoral baseada em referências.',
  }],
};

const contests = [{
  slug: 'contest',
  storageId: 'contest-store',
  subjects: [{ slug: 'subject', storageId: 'subject-store', questionSetEntry: { data: questionSet } }],
}];

describe('static catalog shards', () => {
  it('keeps the legacy sync projection equal to the concatenated contest shards', () => {
    const global = buildSyncCatalogSubjects(contests);
    const shards = contests.flatMap((contest) => buildSyncCatalogSubjects([contest]));
    expect(shards).toEqual(global);
    expect(global[0]?.questionSet.questions[0]).not.toHaveProperty('origin');
  });

  it('keeps global routes equal to global entries plus contest shards', () => {
    const global = buildNavigationCatalogRoutes(contests);
    const globalEntries = global.filter((entry) => entry.contestStorageId === null);
    const shards = contests.flatMap((contest) => buildNavigationCatalogRoutes([contest], false));
    expect([...globalEntries, ...shards]).toEqual(global);
    expect(shards).toHaveLength(4);
  });
});
