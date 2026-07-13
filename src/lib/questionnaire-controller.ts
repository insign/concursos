import type { Question, QuestionSet } from './content-schema';
import { buildAnswerDocumentId, getActiveAlias } from './identity';
import { getLocalAnswerRecord, saveAnswerDocumentSnapshot } from './offline-db';
import { buildQuestionSeed, deterministicQuestionOrder } from './question-order';
import { loadPreferences, savePreferences, withPreference, type Preferences } from './preferences';
import { materializeSubjectProgress, progressSubjectId, updateSubjectProgress } from './progress';
import {
  createEmptyAnswerDocument,
  isSubmissionValid,
  reconcileAnswerDocument,
  scoreAnswers,
  submitAnswers,
  type AnswerDocument,
  type CorrectionMode,
  type QuestionLayout,
} from './questionnaire';
import { requestProfileSync, synchronizeAnswerDocument } from './sync';

export interface QuestionnaireConfig {
  questionSet: QuestionSet;
  contestStorageId: string;
  subjectStorageId: string;
  userId?: string;
}

function requiredElement<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector);
  if (!element) throw new Error(`Elemento obrigatório ausente: ${selector}`);
  return element;
}

export async function mountQuestionnaire(root: HTMLElement, config: QuestionnaireConfig): Promise<void> {
  if (root.dataset.mounted === 'true') return;
  root.dataset.mounted = 'true';

  const form = requiredElement<HTMLFormElement>(root, '[data-question-form]');
  const questionList = requiredElement<HTMLElement>(root, '[data-question-list]');
  const status = requiredElement<HTMLElement>(root, '[data-question-status]');
  const previousButton = requiredElement<HTMLButtonElement>(root, '[data-previous-questions]');
  const nextButton = requiredElement<HTMLButtonElement>(root, '[data-next-questions]');
  const loadMoreButton = requiredElement<HTMLButtonElement>(root, '[data-load-more]');
  const pagination = requiredElement<HTMLElement>(root, '[data-question-pagination]');
  const pageStatus = requiredElement<HTMLElement>(root, '[data-page-status]');
  const layoutInputs = Array.from(root.querySelectorAll<HTMLInputElement>('input[name="question-layout"]'));
  const correctionInputs = Array.from(
    root.querySelectorAll<HTMLInputElement>('input[name="correction-mode"]'),
  );
  const shuffleInput = requiredElement<HTMLInputElement>(root, '[data-shuffle-questions]');

  const profileId = getActiveAlias();
  if (!profileId) {
    const message = document.createElement('p');
    message.className = 'empty-state';
    message.textContent = 'Defina um alias público em Configurações para responder e salvar seu progresso.';
    questionList.replaceChildren(message);
    status.textContent = 'Questionário aguardando a definição de um alias.';
    root.querySelectorAll<HTMLInputElement | HTMLButtonElement>('input, button').forEach((control) => {
      control.disabled = true;
    });
    return;
  }

  root.dataset.profileId = profileId;
  const documentId = buildAnswerDocumentId(profileId, config.contestStorageId, config.subjectStorageId);
  let documentState: AnswerDocument = createEmptyAnswerDocument(config.questionSet.questionSetRevision);
  let writeQueue: Promise<void> = Promise.resolve();
  let preferences: Preferences = await loadPreferences(profileId);
  let layout: QuestionLayout = preferences.questionLayout;
  let correctionMode: CorrectionMode = preferences.correctionMode;
  let shuffle = preferences.shuffleQuestions;
  let pageStart = 0;
  let visibleAll = 10;

  const questionOrder = (): Question[] => {
    if (!shuffle) return config.questionSet.questions;
    const seed = buildQuestionSeed(
      config.userId ?? profileId,
      config.contestStorageId,
      config.subjectStorageId,
      config.questionSet.questionSetRevision,
    );
    return deterministicQuestionOrder(config.questionSet.questions, seed);
  };

  const shouldReveal = () =>
    correctionMode === 'immediate' || isSubmissionValid(documentState, config.questionSet);

  const createFeedback = (question: Question): HTMLElement | null => {
    const answer = documentState.answers[question.id];
    if (!answer || !shouldReveal()) return null;

    const correct = answer.optionId === question.correctOptionId;
    const wrapper = document.createElement('div');
    const result = document.createElement('p');
    const explanation = document.createElement('p');
    wrapper.className = `question-feedback ${correct ? 'is-correct' : 'is-incorrect'}`;
    result.className = 'question-result';
    result.textContent = correct ? 'Resposta correta.' : 'Resposta incorreta.';
    explanation.textContent = question.explanation;
    wrapper.append(result, explanation);
    return wrapper;
  };

  const queueSnapshot = (document: AnswerDocument, dirtyQuestionIds: string[] = []) => {
    const queued = writeQueue.then(async () => {
      await saveAnswerDocumentSnapshot({ profileId, documentId, document, dirtyQuestionIds });
    });
    writeQueue = queued.catch(() => undefined);
    return queued;
  };

  const refreshProgress = async () => {
    const record = await getLocalAnswerRecord(documentId);
    if (!record) return;
    await updateSubjectProgress(
      profileId,
      progressSubjectId(config.contestStorageId, config.subjectStorageId),
      materializeSubjectProgress(
        config.questionSet,
        record.current,
        correctionMode,
        record.remoteVersion ?? 0,
      ),
    );
  };

  const persistPreference = async (
    field: 'questionLayout' | 'correctionMode' | 'shuffleQuestions',
    value: QuestionLayout | CorrectionMode | boolean,
  ) => {
    preferences = withPreference(preferences, field, value);
    try {
      await savePreferences(profileId, preferences, [field]);
      if (field === 'correctionMode') await refreshProgress();
      void requestProfileSync(profileId);
    } catch {
      status.textContent = 'Não foi possível salvar a preferência localmente.';
    }
  };

  const selectAnswer = async (question: Question, optionId: string) => {
    const submissionWasValid = isSubmissionValid(documentState, config.questionSet);
    documentState = {
      ...documentState,
      answers: {
        ...documentState.answers,
        [question.id]: { optionId, questionRevision: question.revision },
      },
      submission: null,
    };
    status.textContent = 'Salvando resposta neste dispositivo...';

    if (correctionMode === 'on-submit') {
      questionList.querySelectorAll('.question-feedback').forEach((feedback) => feedback.remove());
    } else {
      const questionCard = Array.from(questionList.querySelectorAll<HTMLElement>('[data-question-id]')).find(
        (card) => card.dataset.questionId === question.id,
      );
      questionCard?.querySelector('.question-feedback')?.remove();
      const feedback = createFeedback(question);
      if (questionCard && feedback) questionCard.append(feedback);
    }

    try {
      await queueSnapshot(documentState, [question.id]);
      if (documentState.answers[question.id]?.optionId === optionId) {
        status.textContent = submissionWasValid
          ? 'Resposta salva localmente. A finalização anterior foi invalidada.'
          : 'Resposta salva localmente e adicionada à fila de sincronização.';
      }
      void refreshProgress().catch(() => undefined);
      void requestProfileSync(profileId);
    } catch {
      status.textContent = 'Não foi possível salvar a resposta localmente. Tente novamente.';
    }
  };

  const createQuestion = (question: Question, position: number): HTMLFieldSetElement => {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    const prompt = document.createElement('span');
    fieldset.className = 'question-card';
    fieldset.dataset.questionId = question.id;
    fieldset.tabIndex = -1;
    legend.className = 'question-legend';
    prompt.className = 'question-prompt';
    legend.textContent = `Questão ${position + 1} de ${config.questionSet.questions.length}`;
    prompt.textContent = question.prompt;
    fieldset.append(legend, prompt);

    const options = document.createElement('div');
    options.className = 'question-options';

    for (const option of question.options) {
      const row = document.createElement('div');
      const input = document.createElement('input');
      const label = document.createElement('label');
      const inputId = `${root.id}-${question.id}-${option.id}`;
      row.className = 'question-option';
      input.type = 'radio';
      input.name = `answer-${question.id}`;
      input.id = inputId;
      input.value = option.id;
      input.required = true;
      input.checked = documentState.answers[question.id]?.optionId === option.id;
      input.addEventListener('change', () => void selectAnswer(question, option.id));
      label.htmlFor = inputId;
      label.textContent = option.text;
      row.append(input, label);
      options.append(row);
    }

    fieldset.append(options);
    const feedback = createFeedback(question);
    if (feedback) fieldset.append(feedback);
    return fieldset;
  };

  function render(): void {
    const ordered = questionOrder();
    const blockSize = layout === 'single' ? 1 : 10;
    const visible = layout === 'all' ? ordered.slice(0, visibleAll) : ordered.slice(pageStart, pageStart + blockSize);
    questionList.replaceChildren(
      ...visible.map((question) => createQuestion(question, ordered.indexOf(question))),
    );

    const pages = Math.max(1, Math.ceil(ordered.length / blockSize));
    const currentPage = Math.floor(pageStart / blockSize) + 1;
    pagination.hidden = layout === 'all';
    previousButton.disabled = pageStart === 0;
    nextButton.disabled = pageStart + blockSize >= ordered.length;
    pageStatus.textContent = `Página ${currentPage} de ${pages}`;
    loadMoreButton.hidden = layout !== 'all' || visibleAll >= ordered.length;
  }

  for (const input of layoutInputs) {
    input.checked = input.value === layout;
    input.addEventListener('change', () => {
      layout = input.value as QuestionLayout;
      pageStart = 0;
      visibleAll = 10;
      render();
      void persistPreference('questionLayout', layout);
    });
  }

  for (const input of correctionInputs) {
    input.checked = input.value === correctionMode;
    input.addEventListener('change', () => {
      correctionMode = input.value as CorrectionMode;
      render();
      void persistPreference('correctionMode', correctionMode);
    });
  }

  shuffleInput.checked = shuffle;
  shuffleInput.addEventListener('change', () => {
    shuffle = shuffleInput.checked;
    pageStart = 0;
    visibleAll = 10;
    render();
    void persistPreference('shuffleQuestions', shuffle);
  });

  previousButton.addEventListener('click', () => {
    const blockSize = layout === 'single' ? 1 : 10;
    pageStart = Math.max(0, pageStart - blockSize);
    render();
    questionList.querySelector<HTMLElement>('fieldset')?.focus();
  });

  nextButton.addEventListener('click', () => {
    const blockSize = layout === 'single' ? 1 : 10;
    pageStart = Math.min(config.questionSet.questions.length - 1, pageStart + blockSize);
    render();
    questionList.querySelector<HTMLElement>('fieldset')?.focus();
  });

  loadMoreButton.addEventListener('click', () => {
    visibleAll = Math.min(config.questionSet.questions.length, visibleAll + 10);
    render();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const score = scoreAnswers(config.questionSet, documentState.answers);

    if (score.answered !== score.total) {
      status.textContent = `Responda todas as questões antes de finalizar. Faltam ${score.total - score.answered}.`;
      return;
    }

    const previousState = documentState;
    documentState = submitAnswers(documentState, config.questionSet);
    status.textContent = 'Salvando finalização neste dispositivo...';

    try {
      await queueSnapshot(documentState);
      render();
      status.textContent = `Finalizado: ${score.correct} de ${score.total} respostas corretas.`;
      void refreshProgress().catch(() => undefined);
      void requestProfileSync(profileId);
    } catch {
      documentState = previousState;
      status.textContent = 'Não foi possível salvar a finalização localmente. Tente novamente.';
    }
  });

  const storedRecord = await getLocalAnswerRecord(documentId);
  if (storedRecord) {
    const reconciled = reconcileAnswerDocument(storedRecord.current, config.questionSet);
    const changed = JSON.stringify(reconciled) !== JSON.stringify(storedRecord.current);
    documentState = reconciled;

    if (changed) {
      const affectedIds = [...new Set([...Object.keys(storedRecord.current.answers), ...Object.keys(reconciled.answers)])];
      await queueSnapshot(reconciled, affectedIds);
    }

    status.textContent = storedRecord.conflictWarning ?? 'Respostas restauradas deste dispositivo.';
    void refreshProgress().catch(() => undefined);
  }

  render();

  window.addEventListener('concursos:answer-synced', (event) => {
    const syncedDocumentId = (event as CustomEvent<{ documentId: string }>).detail.documentId;
    if (syncedDocumentId !== documentId) return;

    void getLocalAnswerRecord(documentId).then((record) => {
      if (!record) return;
      documentState = reconcileAnswerDocument(record.current, config.questionSet);
      render();
      const score = scoreAnswers(config.questionSet, documentState.answers);
      status.textContent =
        record.conflictWarning ??
        (isSubmissionValid(documentState, config.questionSet)
          ? `Finalizado: ${score.correct} de ${score.total} respostas corretas. Respostas reconciliadas.`
          : 'Respostas locais e remotas reconciliadas.');
      void refreshProgress()
        .then(() => requestProfileSync(profileId))
        .catch(() => undefined);
    });
  });

  if (navigator.onLine) {
    void synchronizeAnswerDocument(profileId, documentId, config.questionSet).catch(() => undefined);
  }
}
