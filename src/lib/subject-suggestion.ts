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

function groupForSubject(model: SubjectSuggestionModel, subjectId: string): SubjectSuggestionGroup | undefined {
  return model.groups.find((group) => group.subjects.some((s) => s.studiedSubjectId === subjectId));
}

function firstPendingInGroup(
  group: SubjectSuggestionGroup,
  studied: Set<string>,
  currentSubjectId: string | null,
): SubjectSuggestionCandidate | null {
  return group.subjects.find((s) => s.studiedSubjectId !== currentSubjectId && !studied.has(s.studiedSubjectId)) ?? null;
}

export function suggestNextSubject(
  model: SubjectSuggestionModel,
  studiedSubjectIds: Iterable<string>,
  currentSubjectId: string | null = null,
  lastStudiedSubjectId: string | null = null,
): SubjectSuggestionCandidate | null {
  const studied = new Set(studiedSubjectIds);

  if (currentSubjectId) {
    const g = groupForSubject(model, currentSubjectId);
    if (g) {
      const cand = firstPendingInGroup(g, studied, currentSubjectId);
      if (cand) return cand;
    }
  }

  if (lastStudiedSubjectId && studied.has(lastStudiedSubjectId)) {
    const g = groupForSubject(model, lastStudiedSubjectId);
    if (g) {
      const cand = firstPendingInGroup(g, studied, currentSubjectId);
      if (cand) return cand;
    }
  }

  let selected: {
    candidate: SubjectSuggestionCandidate;
    group: SubjectSuggestionGroup;
    studiedCount: number;
  } | null = null;

  for (const group of model.groups) {
    const studiedCount = group.subjects.reduce(
      (count, subject) => count + Number(studied.has(subject.studiedSubjectId)),
      0,
    );
    if (studiedCount === group.subjects.length) continue;
    const candidate = group.subjects.find(
      (subject) =>
        subject.studiedSubjectId !== currentSubjectId &&
        !studied.has(subject.studiedSubjectId),
    );
    if (!candidate) continue;

    if (
      selected === null ||
      studiedCount * selected.group.subjects.length <
        selected.studiedCount * group.subjects.length
    ) {
      selected = { candidate, group, studiedCount };
    }
  }

  return selected?.candidate ?? null;
}

export function areAllSubjectsStudied(
  model: SubjectSuggestionModel,
  studiedSubjectIds: Iterable<string>,
): boolean {
  const studied = new Set(studiedSubjectIds);
  return model.groups.every((group) =>
    group.subjects.every((subject) => studied.has(subject.studiedSubjectId)),
  );
}
