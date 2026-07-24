import { describe, expect, it } from 'vitest';
import {
  buildSimuladoDocumentId,
  buildSimuladosIndexDocumentId,
  IdentityValidationError,
  validateSimuladoId,
} from '../../src/lib/identity';
import {
  availableQuestions,
  buildSimuladoSummary,
  computeSimuladoResult,
  createSimuladoDocument,
  drawSimuladoQuestions,
  SimuladoDrawError,
  simuladoDocumentSchema,
  simuladoQuestionKey,
  simuladosIndexSchema,
  upsertSimuladoSummary,
  type SimuladoConfig,
  type SimuladoPool,
  type SimuladosIndex,
} from '../../src/lib/simulados';

// PRNG determinístico simples para tornar o sorteio reproduzível nos testes.
function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function poolSubject(subjectStorageId: string, count: number, origin: 'authorial' | 'previous_exam') {
  return {
    subjectStorageId,
    questions: Array.from({ length: count }, (_, i) => ({
      questionId: `${subjectStorageId}-q${i + 1}`,
      questionRevision: 1,
      origin,
      prompt: `Prompt ${subjectStorageId} ${i + 1}`,
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
      ],
      correctOptionId: 'a',
      explanation: 'Porque sim.',
    })),
  };
}

const pool: SimuladoPool = {
  contestStorageId: 'tcema-2026-adm',
  subjects: [
    poolSubject('portugues', 10, 'previous_exam'),
    poolSubject('rlm', 6, 'authorial'),
    poolSubject('direito', 4, 'previous_exam'),
  ],
};

const at = (iso: string) => `2026-07-${iso}T12:00:00.000Z`;

describe('simulados — sorteio', () => {
  it('conta a disponibilidade por assunto e origem', () => {
    expect(availableQuestions(pool, ['portugues', 'rlm', 'direito'], 'all')).toBe(20);
    expect(availableQuestions(pool, ['portugues', 'rlm', 'direito'], 'previous_exam')).toBe(14);
    expect(availableQuestions(pool, ['rlm'], 'authorial')).toBe(6);
    expect(availableQuestions(pool, ['rlm'], 'previous_exam')).toBe(0);
  });

  it('sorteia exatamente a quantidade pedida, sem repetição, congelando a ordem', () => {
    const config: SimuladoConfig = {
      contestStorageId: 'tcema-2026-adm',
      subjectStorageIds: ['portugues', 'rlm', 'direito'],
      origin: 'all',
      questionCount: 12,
    };
    const drawn = drawSimuladoQuestions(pool, config, seeded(42));
    expect(drawn).toHaveLength(12);
    const keys = drawn.map(simuladoQuestionKey);
    expect(new Set(keys).size).toBe(12); // sem repetição
  });

  it('distribui entre os assuntos de forma equilibrada conforme a disponibilidade', () => {
    const config: SimuladoConfig = {
      contestStorageId: 'tcema-2026-adm',
      subjectStorageIds: ['portugues', 'rlm', 'direito'],
      origin: 'all',
      questionCount: 9,
    };
    const drawn = drawSimuladoQuestions(pool, config, seeded(7));
    const counts = new Map<string, number>();
    for (const q of drawn) counts.set(q.subjectStorageId, (counts.get(q.subjectStorageId) ?? 0) + 1);
    // 9 vagas entre 3 assuntos com folga -> 3/3/3.
    expect(counts.get('portugues')).toBe(3);
    expect(counts.get('rlm')).toBe(3);
    expect(counts.get('direito')).toBe(3);
  });

  it('respeita a capacidade limitada de um assunto ao distribuir', () => {
    const config: SimuladoConfig = {
      contestStorageId: 'tcema-2026-adm',
      subjectStorageIds: ['portugues', 'direito'],
      origin: 'previous_exam',
      questionCount: 12, // portugues=10, direito=4 -> total 14
    };
    const drawn = drawSimuladoQuestions(pool, config, seeded(3));
    const counts = new Map<string, number>();
    for (const q of drawn) counts.set(q.subjectStorageId, (counts.get(q.subjectStorageId) ?? 0) + 1);
    // direito só tem 4; portugues cobre o resto.
    expect(counts.get('direito')).toBe(4);
    expect(counts.get('portugues')).toBe(8);
  });

  it('rejeita quantidade acima da disponibilidade ou não-positiva', () => {
    const base: SimuladoConfig = {
      contestStorageId: 'tcema-2026-adm',
      subjectStorageIds: ['direito'],
      origin: 'previous_exam',
      questionCount: 5, // só há 4
    };
    expect(() => drawSimuladoQuestions(pool, base, seeded(1))).toThrow(SimuladoDrawError);
    expect(() => drawSimuladoQuestions(pool, { ...base, questionCount: 0 }, seeded(1))).toThrow(
      SimuladoDrawError,
    );
  });
});

describe('simulados — documento e resultado', () => {
  const config: SimuladoConfig = {
    contestStorageId: 'tcema-2026-adm',
    subjectStorageIds: ['portugues', 'rlm'],
    origin: 'all',
    questionCount: 4,
  };
  const questions = drawSimuladoQuestions(pool, config, seeded(99)).slice(0, 4);
  const doc = createSimuladoDocument({
    simulationId: '123e4567-e89b-12d3-a456-426614174000',
    configuration: config,
    questions,
    now: at('24'),
  });

  it('cria um documento válido conforme o schema', () => {
    expect(simuladoDocumentSchema.safeParse(doc).success).toBe(true);
    expect(doc.status).toBe('in_progress');
    expect(doc.result).toBeNull();
  });

  it('calcula resultado geral e por assunto sobre os snapshots', () => {
    const answered = { ...doc };
    const first = questions[0];
    const second = questions[1];
    answered.answers = {
      [simuladoQuestionKey(first)]: { optionId: first.correctOptionId, questionRevision: first.questionRevision },
      [simuladoQuestionKey(second)]: { optionId: 'b', questionRevision: second.questionRevision },
    };
    const result = computeSimuladoResult(answered);
    expect(result.total).toBe(4);
    expect(result.answered).toBe(2);
    expect(result.correct).toBe(1);
    expect(result.incorrect).toBe(1);
    expect(result.unanswered).toBe(2);
    expect(result.percent).toBe(25);
    expect(result.bySubject.reduce((s, b) => s + b.total, 0)).toBe(4);
  });

  it('ignora respostas cuja revisão diverge do snapshot congelado', () => {
    const stale = { ...doc };
    const first = questions[0];
    stale.answers = {
      [simuladoQuestionKey(first)]: { optionId: first.correctOptionId, questionRevision: 999 },
    };
    expect(computeSimuladoResult(stale).answered).toBe(0);
  });
});

describe('simulados — índice', () => {
  const baseDoc = createSimuladoDocument({
    simulationId: '123e4567-e89b-12d3-a456-426614174000',
    configuration: {
      contestStorageId: 'tcema-2026-adm',
      subjectStorageIds: ['portugues'],
      origin: 'all',
      questionCount: 1,
    },
    questions: drawSimuladoQuestions(pool, {
      contestStorageId: 'tcema-2026-adm',
      subjectStorageIds: ['portugues'],
      origin: 'all',
      questionCount: 1,
    }, seeded(5)),
    now: at('24'),
  });

  it('resumo tem correctCount null em progresso e preenchido ao concluir', () => {
    expect(buildSimuladoSummary(baseDoc).correctCount).toBeNull();
    const completed = {
      ...baseDoc,
      status: 'completed' as const,
      completedAt: at('25'),
      result: computeSimuladoResult(baseDoc),
    };
    expect(buildSimuladoSummary(completed).correctCount).toBe(0);
    expect(buildSimuladoSummary(completed).status).toBe('completed');
  });

  it('deduplica por id, ordena por updatedAt e retém 20', () => {
    // updatedAt válido variando os minutos (00..24), para o schema .datetime() aceitar.
    const ts = (minute: number) => `2026-07-24T12:${String(minute).padStart(2, '0')}:00.000Z`;
    let index: SimuladosIndex = { schemaVersion: 1, simulados: [] };
    for (let i = 0; i < 25; i += 1) {
      index = upsertSimuladoSummary(index, {
        id: `00000000-0000-4000-8000-${String(i).padStart(12, '0')}`,
        status: 'in_progress',
        contestStorageId: 'tcema-2026-adm',
        subjectStorageIds: ['portugues'],
        origin: 'all',
        questionCount: 10,
        answeredCount: 0,
        correctCount: null,
        createdAt: at('24'),
        updatedAt: ts(i),
        completedAt: null,
      });
    }
    expect(index.simulados).toHaveLength(20);
    expect(simuladosIndexSchema.safeParse(index).success).toBe(true);
    // Mais recente primeiro.
    expect(index.simulados[0].updatedAt > index.simulados[1].updatedAt).toBe(true);

    // Atualizar um id existente não duplica.
    const target = index.simulados[3];
    const updated = upsertSimuladoSummary(index, { ...target, answeredCount: 7, updatedAt: ts(59) });
    expect(updated.simulados.filter((s) => s.id === target.id)).toHaveLength(1);
    expect(updated.simulados[0].id).toBe(target.id);
  });
});

describe('simulados — identidade de documentos', () => {
  const uuid = '123e4567-e89b-12d3-a456-426614174000';

  it('valida UUID de simulado', () => {
    expect(validateSimuladoId(uuid)).toBe(uuid);
    expect(() => validateSimuladoId('nope')).toThrow(IdentityValidationError);
    expect(() => validateSimuladoId('123E4567-E89B-12D3-A456-426614174000')).toThrow(
      IdentityValidationError,
    ); // maiúsculas não são UUID v4 canônico minúsculo
  });

  it('monta IDs remotos dentro do limite de 100 caracteres', () => {
    const detailed = buildSimuladoDocumentId('estudo-2026-teste', uuid);
    expect(detailed).toBe(`concursos--estudo-2026-teste--simulado--${uuid}`);
    expect(detailed.length).toBeLessThanOrEqual(100);
    expect(buildSimuladosIndexDocumentId('estudo-2026-teste')).toBe(
      'concursos--estudo-2026-teste--simulados',
    );
  });
});
