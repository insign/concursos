import { describe, expect, it } from 'vitest';
import {
  displaySubjectTitle,
  formatSubjectNumber,
  subjectNumberInGroup,
} from '../../src/lib/subject-numbering';

interface FakeSubject {
  id: string;
  title: string;
  groupPath: { id: string }[];
}

function contestWith(...subjects: FakeSubject[]) {
  return { subjects };
}

const groupA = [{ id: 'c/a' }];
const groupB = [{ id: 'c/b' }];
const nested = [{ id: 'c/a' }, { id: 'c/a/sub' }];

describe('subjectNumberInGroup', () => {
  it('numbers siblings 1..N in contest.subjects order', () => {
    const contest = contestWith(
      { id: 's1', title: 'Primeiro', groupPath: groupA },
      { id: 's2', title: 'Segundo', groupPath: groupA },
      { id: 's9', title: 'Nono', groupPath: groupA },
    );
    expect(subjectNumberInGroup(contest, contest.subjects[0])).toEqual({ index: 1, total: 3 });
    expect(subjectNumberInGroup(contest, contest.subjects[2])).toEqual({ index: 3, total: 3 });
  });

  it('restarts at 1 in each immediate group, including nested subgroups', () => {
    const contest = contestWith(
      { id: 'a1', title: 'A1', groupPath: groupA },
      { id: 'b1', title: 'B1', groupPath: groupB },
      { id: 'n1', title: 'N1', groupPath: nested },
      { id: 'a2', title: 'A2', groupPath: groupA },
    );
    expect(subjectNumberInGroup(contest, contest.subjects[0])).toEqual({ index: 1, total: 2 });
    expect(subjectNumberInGroup(contest, contest.subjects[1])).toEqual({ index: 1, total: 1 });
    expect(subjectNumberInGroup(contest, contest.subjects[2])).toEqual({ index: 1, total: 1 });
    expect(subjectNumberInGroup(contest, contest.subjects[3])).toEqual({ index: 2, total: 2 });
  });

  it('returns null for unknown subjects or groupless subjects', () => {
    const contest = contestWith({ id: 's1', title: 'Único', groupPath: groupA });
    expect(
      subjectNumberInGroup(contest, { id: 'missing', groupPath: groupA }),
    ).toBeNull();
    expect(subjectNumberInGroup(contest, { id: 's1', groupPath: [] })).toBeNull();
  });
});

describe('formatSubjectNumber', () => {
  it('formats as "N. Title"', () => {
    expect(formatSubjectNumber(1, 'Título')).toBe('1. Título');
    expect(formatSubjectNumber(9, 'Título')).toBe('9. Título');
  });
});

describe('displaySubjectTitle', () => {
  it('prefixes the number without mutating the stored title', () => {
    const contest = contestWith({ id: 's1', title: 'Original', groupPath: groupA });
    expect(displaySubjectTitle(contest, contest.subjects[0])).toBe('1. Original');
    expect(contest.subjects[0].title).toBe('Original');
  });

  it('falls back to the raw title when numbering is unavailable', () => {
    const contest = contestWith({ id: 's1', title: 'Original', groupPath: groupA });
    expect(
      displaySubjectTitle(contest, { id: 'missing', title: 'Outro', groupPath: groupA }),
    ).toBe('Outro');
  });
});
