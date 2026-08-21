import { describe, expect, it } from 'vitest';
import { readingProgressFraction } from '../../src/lib/reading-progress';

const base = {
  articleTop: 1000,
  articleBottom: 5000,
  excludedTop: null,
  scrollY: 0,
  viewportHeight: 1000,
};

describe('reading progress fraction', () => {
  it('keeps the original article-fraction behavior without exclusions', () => {
    expect(readingProgressFraction(base)).toBe(0);
    expect(readingProgressFraction({ ...base, scrollY: 2000 })).toBeCloseTo(1 / 3);
    expect(readingProgressFraction({ ...base, scrollY: 4000 })).toBe(1);
  });

  it('reaches 100% at the top of the excluded block', () => {
    const measurements = { ...base, excludedTop: 4000 };
    expect(readingProgressFraction(measurements)).toBe(0);
    // Fim legível = 4000; viewport 1000 → 100% ao chegar em scrollY 3000.
    expect(readingProgressFraction({ ...measurements, scrollY: 3000 })).toBe(1);
    // Rolar pelas referências mantém 100%.
    expect(readingProgressFraction({ ...measurements, scrollY: 3900 })).toBe(1);
  });

  it('ignores an exclusion that occupies no space', () => {
    const hidden = readingProgressFraction({ ...base, excludedTop: 5000 });
    expect(hidden).toBe(readingProgressFraction(base));
  });

  it('clamps to the unit interval and handles a fully visible article', () => {
    expect(readingProgressFraction({ ...base, scrollY: -500 })).toBe(0);
    expect(readingProgressFraction({ ...base, scrollY: 9999 })).toBe(1);
    const short = { ...base, articleBottom: 800 };
    expect(readingProgressFraction(short)).toBe(1);
    expect(
      readingProgressFraction({ ...short, excludedTop: 400 }),
    ).toBe(1);
  });
});
