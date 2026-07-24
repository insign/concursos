import { describe, expect, it } from 'vitest';
import { formatProgressBadge } from '../../src/lib/progress-badge';

describe('progress badge formatting', () => {
  it('hides the badge for a subject without progress (not started)', () => {
    expect(formatProgressBadge(undefined, 1)).toEqual({
      hidden: true,
      text: '',
      state: null,
      label: null,
    });
  });

  it('marks a subject as stale when the revision diverges from the current one', () => {
    expect(
      formatProgressBadge(
        { answered: 5, total: 12, submitted: false, questionSetRevision: 1 },
        2,
      ),
    ).toEqual({
      hidden: false,
      text: 'atualizar',
      state: 'stale',
      label: 'Conteúdo atualizado; recalcule o progresso.',
    });
  });

  it('shows a compact in-progress count without the score when correct is absent', () => {
    expect(
      formatProgressBadge(
        { answered: 1, total: 12, submitted: false, questionSetRevision: 3 },
        3,
      ),
    ).toEqual({
      hidden: false,
      text: '1/12',
      state: 'in-progress',
      label: '1/12 respondidas.',
    });
  });

  it('includes the correct count in the accessible label when present', () => {
    expect(
      formatProgressBadge(
        { answered: 8, total: 12, correct: 6, submitted: false, questionSetRevision: 3 },
        3,
      ),
    ).toEqual({
      hidden: false,
      text: '8/12',
      state: 'in-progress',
      label: '8/12 respondidas, 6 corretas.',
    });
  });

  it('marks a finalized subject with a check and the finalized label', () => {
    expect(
      formatProgressBadge(
        { answered: 12, total: 12, correct: 9, submitted: true, questionSetRevision: 3 },
        3,
      ),
    ).toEqual({
      hidden: false,
      text: '12/12 ✓',
      state: 'submitted',
      label: '12/12 respondidas, 9 corretas, finalizado.',
    });
  });

  it('finalizes without a score when correct is withheld (on-submit before reveal)', () => {
    expect(
      formatProgressBadge(
        { answered: 12, total: 12, submitted: true, questionSetRevision: 3 },
        3,
      ),
    ).toEqual({
      hidden: false,
      text: '12/12 ✓',
      state: 'submitted',
      label: '12/12 respondidas, finalizado.',
    });
  });
});
