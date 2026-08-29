import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { evaluateBuildBudget } from '../../scripts/lib/build-budget.mjs';
import { mapConcurrent, resolveConcurrency } from '../../scripts/lib/concurrency.mjs';
import { finalizeSecurityHtml } from '../../scripts/lib/finalize-security.mjs';
import { isInventoryAsset, resourceHash } from '../../scripts/lib/offline-inventory-builder.mjs';
import { scriptReferences } from '../../scripts/lib/precache-dependencies.mjs';

describe('build scripts', () => {
  it('preserves input order under bounded concurrency', async () => {
    const result = await mapConcurrent([3, 2, 1], 2, async (value: number) => {
      await new Promise((resolve) => setTimeout(resolve, value));
      return value * 2;
    });
    expect(result).toEqual([6, 4, 2]);
    expect(resolveConcurrency('500')).toBe(64);
  });

  it('finalizes style-src without weakening script-src', () => {
    const script = "localStorage.getItem('concursos:theme')";
    const hash = createHash('sha256').update(script).digest('base64');
    const source = `<meta http-equiv="content-security-policy" content="script-src 'self' 'sha256-${hash}'; style-src 'self';"><script>${script}</script>`;
    const result = finalizeSecurityHtml(source, 'dist/index.html');
    expect(result.themeHashVerified).toBe(true);
    expect(result.html).toContain("style-src 'self' 'unsafe-inline';");
    expect(result.html).not.toContain("script-src 'self' 'unsafe-inline'");
  });

  it('fails closed for unsafe script policies', () => {
    const source = `<meta http-equiv="content-security-policy" content="script-src 'self' 'sha256-x' 'unsafe-eval'; style-src 'self';">`;
    expect(() => finalizeSecurityHtml(source, 'dist/index.html')).toThrow('execução insegura');
  });

  it('hashes resources deterministically and enforces budgets', () => {
    expect(resourceHash('/asset.js', Buffer.from('body'))).toBe(resourceHash('/asset.js', Buffer.from('body')));
    expect(isInventoryAsset('/service-worker.js')).toBe(false);
    expect(isInventoryAsset('/_astro/page.hash.js')).toBe(true);
    expect(evaluateBuildBudget(
      { totalMs: 20, phases: { astro: { durationMs: 10 } }, output: { files: 5, bytes: 100 } },
      { totalMs: 10, astroMs: 20, files: 10, bytes: 200 },
    )).toEqual(['total build duration: 20ms exceeds 10ms']);
    expect(evaluateBuildBudget(
      { totalMs: Number.NaN, phases: { astro: { durationMs: 10 } }, output: { files: 5, bytes: 100 } },
      { totalMs: 10, astroMs: 20, files: 10, bytes: 200 },
    )).toEqual(['total build duration: missing or invalid numeric value']);
  });

  it('discovers transitive shell script imports', () => {
    expect(scriptReferences(
      `import{a}from"./identity.hash.js";const x=import('./lazy.hash.js');import('/_astro/root.hash.js')`,
    )).toEqual(['identity.hash.js', 'lazy.hash.js', 'root.hash.js']);
  });
});
