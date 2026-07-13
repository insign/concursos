import type { Question, QuestionSet } from './content-schema';
import { buildQuestionSeed, deterministicQuestionOrder } from './question-order';
import {
  createEmptyAnswerDocument,
  isSubmissionValid,
  scoreAnswers,
  submitAnswers,
  type AnswerDocument,
  type CorrectionMode,
  type QuestionLayout,
} from './questionnaire';

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

export function mountQuestionnaire(root: HTMLElement, config: QuestionnaireConfig): void {
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

  let documentState: AnswerDocument = createEmptyAnswerDocument(config.questionSet.questionSetRevision);
  let layout: QuestionLayout = 'single';
  let correctionMode: CorrectionMode = 'on-submit';
  let shuffle = false;
  let pageStart = 0;
  let visibleAll = 10;

  const questionOrder = (): Question[] => {
    if (!shuffle) return config.questionSet.questions;
    const seed = buildQuestionSeed(
      config.userId ?? 'visitante',
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

  const selectAnswer = (question: Question, optionId: string) => {
    const submissionWasValid = isSubmissionValid(documentState, config.questionSet);
    documentState = {
      ...documentState,
      answers: {
        ...documentState.answers,
        [question.id]: { optionId, questionRevision: question.revision },
      },
      submission: null,
    };
    status.textContent = submissionWasValid
      ? 'Resposta alterada. A finalização anterior foi invalidada.'
      : 'Resposta registrada nesta sessão.';

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
      input.addEventListener('change', () => selectAnswer(question, option.id));
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
    input.addEventListener('change', () => {
      layout = input.value as QuestionLayout;
      pageStart = 0;
      visibleAll = 10;
      render();
    });
  }

  for (const input of correctionInputs) {
    input.addEventListener('change', () => {
      correctionMode = input.value as CorrectionMode;
      render();
    });
  }

  shuffleInput.addEventListener('change', () => {
    shuffle = shuffleInput.checked;
    pageStart = 0;
    visibleAll = 10;
    render();
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

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const score = scoreAnswers(config.questionSet, documentState.answers);

    if (score.answered !== score.total) {
      status.textContent = `Responda todas as questões antes de finalizar. Faltam ${score.total - score.answered}.`;
      return;
    }

    documentState = submitAnswers(documentState, config.questionSet);
    render();
    status.textContent = `Finalizado: ${score.correct} de ${score.total} respostas corretas.`;
  });

  render();
}
