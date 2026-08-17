import { describe, expect, it } from 'vitest';
import { megaReviewRoute } from '../../src/lib/mega-review-routes';

describe('mega review routes', () => {
  it('builds an encoded stable document route', () => {
    expect(megaReviewRoute('concurso-exemplo', 'revisao-integrada')).toBe(
      '/revisoes/concurso-exemplo/revisao-integrada/',
    );
  });
});
