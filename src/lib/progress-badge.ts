import type { ProgressSubject } from './progress';

/** Subconjunto do progresso do assunto de que o indicador depende. */
export type ProgressBadgeInput = Pick<
  ProgressSubject,
  'answered' | 'total' | 'correct' | 'submitted' | 'questionSetRevision'
>;

export interface ProgressBadge {
  hidden: boolean;
  text: string;
  state: 'in-progress' | 'submitted' | 'stale' | null;
  label: string | null;
}

/**
 * Deriva a apresentação compacta do indicador de progresso de um assunto na
 * listagem (#99): texto visível curto, um estado para estilização e o rótulo
 * acessível completo. Retorna `hidden` quando não há progresso (não iniciado);
 * usa o estado "stale" quando a revisão do conjunto diverge da vigente.
 *
 * Função pura para permitir cobertura unitária exaustiva dos quatro estados; o
 * componente apenas aplica o resultado ao DOM.
 */
export function formatProgressBadge(
  subject: ProgressBadgeInput | undefined,
  expectedRevision: number,
): ProgressBadge {
  if (!subject) {
    return { hidden: true, text: '', state: null, label: null };
  }

  if (subject.questionSetRevision !== expectedRevision) {
    return {
      hidden: false,
      text: 'atualizar',
      state: 'stale',
      label: 'Conteúdo atualizado; recalcule o progresso.',
    };
  }

  const score = subject.correct === undefined ? '' : `, ${subject.correct} corretas`;
  return {
    hidden: false,
    text: `${subject.answered}/${subject.total}${subject.submitted ? ' ✓' : ''}`,
    state: subject.submitted ? 'submitted' : 'in-progress',
    label: `${subject.answered}/${subject.total} respondidas${score}${subject.submitted ? ', finalizado' : ''}.`,
  };
}
