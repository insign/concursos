import { studiedSubjectId } from './studied';

interface SubjectSuggestionSourceSubject {
  kind: 'subject';
  slug: string;
  storageId: string;
  title: string;
}

interface SubjectSuggestionSourceGroup {
  kind: 'group';
  id: string;
  children: SubjectSuggestionSourceNode[];
}

type SubjectSuggestionSourceNode = SubjectSuggestionSourceGroup | SubjectSuggestionSourceSubject;

export interface SubjectSuggestionSourceContest {
  slug: string;
  storageId: string;
  children: SubjectSuggestionSourceGroup[];
}

export interface SubjectSuggestionCandidate {
  studiedSubjectId: string;
  title: string;
  href: string;
}

export interface SubjectSuggestionGroup {
  id: string;
  subjects: SubjectSuggestionCandidate[];
}

export interface SubjectSuggestionModel {
  groups: SubjectSuggestionGroup[];
}

export function buildSubjectSuggestionModel(
  contest: SubjectSuggestionSourceContest,
): SubjectSuggestionModel {
  const groups: SubjectSuggestionGroup[] = [];

  const visit = (group: SubjectSuggestionSourceGroup): void => {
    const subjects = group.children
      .filter((child): child is SubjectSuggestionSourceSubject => child.kind === 'subject')
      .map((subject) => ({
        studiedSubjectId: studiedSubjectId(contest.storageId, subject.storageId),
        title: subject.title,
        href: `/concursos/${contest.slug}/${subject.slug}/`,
      }));

    if (subjects.length > 0) groups.push({ id: group.id, subjects });

    for (const child of group.children) {
      if (child.kind === 'group') visit(child);
    }
  };

  for (const group of contest.children) visit(group);
  return { groups };
}

export function suggestNextSubject(
  model: SubjectSuggestionModel,
  studiedSubjectIds: Iterable<string>,
): SubjectSuggestionCandidate | null {
  const studied = new Set(studiedSubjectIds);
  let selected: { group: SubjectSuggestionGroup; studiedCount: number } | null = null;

  for (const group of model.groups) {
    const studiedCount = group.subjects.reduce(
      (count, subject) => count + Number(studied.has(subject.studiedSubjectId)),
      0,
    );
    if (studiedCount === group.subjects.length) continue;

    if (
      selected === null ||
      studiedCount * selected.group.subjects.length <
        selected.studiedCount * group.subjects.length
    ) {
      selected = { group, studiedCount };
    }
  }

  return selected?.group.subjects.find(
    (subject) => !studied.has(subject.studiedSubjectId),
  ) ?? null;
}
