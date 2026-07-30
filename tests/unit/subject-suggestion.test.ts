import { describe, expect, it } from 'vitest';
import {
  buildSubjectSuggestionModel,
  suggestNextSubject,
  type SubjectSuggestionCandidate,
  type SubjectSuggestionModel,
  type SubjectSuggestionSourceContest,
} from '../../src/lib/subject-suggestion';

function candidate(id: string): SubjectSuggestionCandidate {
  return {
    studiedSubjectId: `contest--${id}`,
    title: id,
    href: `/concursos/contest/${id}/`,
  };
}

function model(groups: string[][]): SubjectSuggestionModel {
  return {
    groups: groups.map((subjects, index) => ({
      id: `group-${index + 1}`,
      subjects: subjects.map(candidate),
    })),
  };
}

describe('subject suggestion', () => {
  it('prioritizes the pending group with the lowest proportional completion', () => {
    const suggestion = suggestNextSubject(
      model([
        ['a1', 'a2'],
        ['b1', 'b2', 'b3'],
      ]),
      ['contest--a1', 'contest--b1'],
    );

    expect(suggestion?.studiedSubjectId).toBe('contest--b2');
  });

  it('ignores completed groups and returns the first pending subject in editorial order', () => {
    const suggestion = suggestNextSubject(
      model([
        ['a1', 'a2'],
        ['b1', 'b2', 'b3'],
      ]),
      ['contest--a1', 'contest--a2', 'contest--b1'],
    );

    expect(suggestion?.studiedSubjectId).toBe('contest--b2');
  });

  it('keeps the first editorial group when completion rates tie', () => {
    const suggestion = suggestNextSubject(
      model([
        ['a1', 'a2'],
        ['b1', 'b2', 'b3', 'b4'],
      ]),
      ['contest--a1', 'contest--b1', 'contest--b2'],
    );

    expect(suggestion?.studiedSubjectId).toBe('contest--a2');
  });

  it('ignores unknown studied IDs and reports a fully completed contest', () => {
    const fixture = model([['a1'], ['b1']]);

    expect(suggestNextSubject(fixture, ['contest--unknown'])?.studiedSubjectId).toBe(
      'contest--a1',
    );
    expect(suggestNextSubject(fixture, ['contest--a1', 'contest--b1', 'contest--unknown'])).toBeNull();
  });

  it('builds immediate-group buckets in deterministic tree preorder', () => {
    const contest: SubjectSuggestionSourceContest = {
      slug: 'contest',
      storageId: 'contest',
      children: [
        {
          kind: 'group',
          id: 'parent',
          children: [
            { kind: 'subject', slug: 'parent-subject', storageId: 'parent-subject', title: 'Parent subject' },
            {
              kind: 'group',
              id: 'nested',
              children: [
                { kind: 'subject', slug: 'nested-one', storageId: 'nested-one', title: 'Nested one' },
                { kind: 'subject', slug: 'nested-two', storageId: 'nested-two', title: 'Nested two' },
              ],
            },
          ],
        },
        {
          kind: 'group',
          id: 'sibling',
          children: [
            { kind: 'subject', slug: 'sibling-subject', storageId: 'sibling-subject', title: 'Sibling subject' },
          ],
        },
      ],
    };

    const result = buildSubjectSuggestionModel(contest);

    expect(result.groups.map(({ id }) => id)).toEqual(['parent', 'nested', 'sibling']);
    expect(result.groups.map(({ subjects }) => subjects.map(({ studiedSubjectId }) => studiedSubjectId))).toEqual([
      ['contest--parent-subject'],
      ['contest--nested-one', 'contest--nested-two'],
      ['contest--sibling-subject'],
    ]);
  });
});
