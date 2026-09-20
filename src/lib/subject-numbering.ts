interface GroupRef {
  id: string;
}

interface SubjectRef {
  id: string;
  groupPath: GroupRef[];
}

interface ContestRef<T extends SubjectRef> {
  subjects: T[];
}

export interface SubjectNumber {
  index: number;
  total: number;
}

/**
 * Numeração dinâmica do assunto dentro do grupo imediato (1..N), na ordem
 * editorial de `contest.subjects`. Não altera o título gravado; o número é
 * apenas prefixo de apresentação ("1. Título").
 */
export function subjectNumberInGroup<T extends SubjectRef>(
  contest: ContestRef<T>,
  subject: SubjectRef,
): SubjectNumber | null {
  const groupId = subject.groupPath.at(-1)?.id ?? null;
  if (groupId === null) return null;
  const siblings = contest.subjects.filter(
    (candidate) => candidate.groupPath.at(-1)?.id === groupId,
  );
  const position = siblings.findIndex((candidate) => candidate.id === subject.id);
  if (position < 0) return null;
  return { index: position + 1, total: siblings.length };
}

export function formatSubjectNumber(index: number, title: string): string {
  return `${index}. ${title}`;
}

export function displaySubjectTitle<T extends SubjectRef>(
  contest: ContestRef<T>,
  subject: T & { title: string },
): string {
  const numbering = subjectNumberInGroup(contest, subject);
  if (!numbering) return subject.title;
  return formatSubjectNumber(numbering.index, subject.title);
}
