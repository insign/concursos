import { createResolutionDialog } from './resolutions';
import type { QuestionnaireConfig } from './questionnaire-controller';

export function mountQuestionnaireResolutions(
  root: HTMLElement,
  config: QuestionnaireConfig,
): void {
  const questionList = root.querySelector<HTMLElement>('[data-question-list]');
  const resolutionDialog = createResolutionDialog(root);
  if (!questionList || !resolutionDialog || !config.resolutions?.length) return;

  const resolutionsByQuestionId = new Map(
    config.resolutions.map((resolution) => [resolution.questionId, resolution]),
  );
  const questionsById = new Map(config.questionSet.questions.map((question) => [question.id, question]));

  const appendTriggers = (): void => {
    questionList.querySelectorAll<HTMLElement>('.question-card').forEach((card) => {
      const feedback = card.querySelector<HTMLElement>('.question-feedback');
      const questionId = card.dataset.questionId;
      if (!feedback || !questionId || feedback.querySelector('[data-question-resolution-trigger]')) return;

      const question = questionsById.get(questionId);
      const resolution = resolutionsByQuestionId.get(questionId);
      if (!question || !resolution || resolution.questionRevision !== question.revision) return;

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'button button-secondary question-resolution-trigger';
      trigger.dataset.questionResolutionTrigger = '';
      trigger.textContent = 'Ver resolução passo a passo';
      trigger.addEventListener('click', () => {
        void resolutionDialog.open(
          {
            contestStorageId: config.contestStorageId,
            subjectStorageId: config.subjectStorageId,
            questionId: question.id,
            questionRevision: question.revision,
          },
          trigger,
        );
      });
      feedback.append(trigger);
    });
  };

  const observer = new MutationObserver(appendTriggers);
  observer.observe(questionList, { childList: true, subtree: true });
  appendTriggers();
}
