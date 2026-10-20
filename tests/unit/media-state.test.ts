import { describe, expect, it } from 'vitest';
import {
  completionRatioReached,
  createEmptyMediaDocument,
  mediaDocumentSchema,
  MEDIA_MAX_POSITIONS,
  MEDIA_SHORT_COMPLETION_RATIO,
  selectMedia,
  shouldMarkSubjectStudied,
  upsertMediaPosition,
  type MediaDocument,
} from '../../src/lib/media-state';
import { resolveMediaVersionAction } from '../../src/lib/media-sync';

const sha256 = 'd'.repeat(64);
const otherSha = 'e'.repeat(64);

function documentWith(positions: Record<string, { positionSeconds: number; durationSeconds: number; completed: boolean }>): MediaDocument {
  const base = createEmptyMediaDocument('concurso-exemplo', 'assunto-exemplo');
  return mediaDocumentSchema.parse({
    ...base,
    positions: Object.fromEntries(
      Object.entries(positions).map(([id, position], index) => [
        id,
        { ...position, updatedAt: `2026-01-0${index + 1}T00:00:00.000Z` },
      ]),
    ),
  });
}

describe('media completion ratio', () => {
  it('conclui a partir de 90% em mídia longa', () => {
    expect(completionRatioReached(890, 1000)).toBe(false);
    expect(completionRatioReached(900, 1000)).toBe(true);
    expect(completionRatioReached(1000, 1000)).toBe(true);
  });

  it('exige 95% em mídia curta', () => {
    expect(completionRatioReached(93, 100)).toBe(false);
    expect(completionRatioReached(95, 100)).toBe(true);
    expect(MEDIA_SHORT_COMPLETION_RATIO).toBe(0.95);
  });

  it('ignora duração inválida ou posição inválida', () => {
    expect(completionRatioReached(10, Number.NaN)).toBe(false);
    expect(completionRatioReached(10, 0)).toBe(false);
    expect(completionRatioReached(Number.NaN, 100)).toBe(false);
    expect(completionRatioReached(-5, 100)).toBe(false);
  });
});

describe('subject studied decision', () => {
  it('marca quando a única mídia foi concluída', () => {
    expect(
      shouldMarkSubjectStudied({ itemCount: 1, completedCount: 1, alreadyStudied: false }),
    ).toBe(true);
  });

  it('marca quando todas as mídias foram concluídas', () => {
    expect(
      shouldMarkSubjectStudied({ itemCount: 3, completedCount: 3, alreadyStudied: false }),
    ).toBe(true);
    expect(
      shouldMarkSubjectStudied({ itemCount: 3, completedCount: 2, alreadyStudied: false }),
    ).toBe(false);
  });

  it('não marca assunto já estudado nem assunto sem mídia', () => {
    expect(
      shouldMarkSubjectStudied({ itemCount: 1, completedCount: 1, alreadyStudied: true }),
    ).toBe(false);
    expect(
      shouldMarkSubjectStudied({ itemCount: 0, completedCount: 0, alreadyStudied: false }),
    ).toBe(false);
  });
});

describe('media position upsert', () => {
  it('preserva as posições das demais mídias', () => {
    const current = documentWith({
      [sha256]: { positionSeconds: 10, durationSeconds: 100, completed: false },
    });
    const next = upsertMediaPosition(
      current,
      otherSha,
      { positionSeconds: 30, durationSeconds: 100, completed: false },
      '2026-02-01T00:00:00.000Z',
    );
    expect(Object.keys(next.positions)).toHaveLength(2);
    expect(next.positions[sha256]?.positionSeconds).toBe(10);
    expect(next.positions[otherSha]?.positionSeconds).toBe(30);
  });

  it('poda a posição mais antiga ao atingir o limite', () => {
    let current = createEmptyMediaDocument('concurso-exemplo', 'assunto-exemplo');
    for (let index = 0; index < MEDIA_MAX_POSITIONS + 2; index += 1) {
      const id = `${index}`.repeat(64);
      current = upsertMediaPosition(
        current,
        id,
        { positionSeconds: index, durationSeconds: 100, completed: false },
        `2026-03-${String(index + 1).padStart(2, '0')}T00:00:00.000Z`,
      );
    }
    expect(Object.keys(current.positions)).toHaveLength(MEDIA_MAX_POSITIONS);
    expect(current.positions['0'.repeat(64)]).toBeUndefined();
  });
});

describe('media selection', () => {
  it('registra a mídia selecionada', () => {
    const selected = selectMedia(createEmptyMediaDocument('concurso-exemplo', 'assunto-exemplo'), sha256);
    expect(selected.selectedMediaId).toBe(sha256);
  });
});

describe('media version arbitration', () => {
  it('adota o remoto quando a versão remota é maior', () => {
    expect(resolveMediaVersionAction({ remoteVersion: 1, outboxState: 'clean' }, 2)).toBe(
      'adopt-remote',
    );
  });

  it('publica o local quando a pendência não tem linhagem remota', () => {
    expect(resolveMediaVersionAction({ remoteVersion: null, outboxState: 'pending' }, 3)).toBe(
      'publish-local',
    );
  });

  it('publica o local em empate pendente e não faz nada em empate limpo', () => {
    expect(resolveMediaVersionAction({ remoteVersion: 2, outboxState: 'pending' }, 2)).toBe(
      'publish-local',
    );
    expect(resolveMediaVersionAction({ remoteVersion: 2, outboxState: 'clean' }, 2)).toBe('noop');
  });

  it('não faz nada sem registro local e sem documento remoto', () => {
    expect(resolveMediaVersionAction(null, null)).toBe('noop');
    expect(resolveMediaVersionAction(null, 1)).toBe('adopt-remote');
  });
});
