import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { evaluateBuildBudget } from '../../scripts/lib/build-budget.mjs';
import { mapConcurrent, resolveConcurrency } from '../../scripts/lib/concurrency.mjs';
import { isMegaReviewRouteFile, isSubjectMarkerFile } from '../../scripts/lib/estimate-counting.mjs';
import { finalizeSecurityHtml, validateSecurityHeaders } from '../../scripts/lib/finalize-security.mjs';
import { buildOfflineManifest, isInventoryAsset, resourceHash } from '../../scripts/lib/offline-inventory-builder.mjs';
import { appendBuildStamp, resolveBuildId, stampServiceWorker } from '../../scripts/lib/build-stamp.mjs';
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

  const layout = readFileSync(new URL('../../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
  const theme = layout.match(/<script is:inline>([\s\S]*?)<\/script>/)![1];
  const html = `<script>${theme}</script><script type="module" src="/_astro/app.js"></script>`;
  const headers = readFileSync(new URL('../../public/_headers', import.meta.url), 'utf8');

  it('validates the fixed HTTP policy and the exact approved theme', () => {
    expect(validateSecurityHeaders(headers)).toContain("script-src 'self'");
    const result = finalizeSecurityHtml(html, 'dist/index.html');
    expect(result.themeHashVerified).toBe(true);
    expect(result.html).toBe(html);
  });

  it('rejects relaxed script policies rather than generating more hashes', () => {
    for (const extra of ["'unsafe-eval'", "'unsafe-inline'", 'data:', 'blob:', 'https://example.com']) {
      expect(() => validateSecurityHeaders(headers.replace("script-src 'self'", `script-src 'self' ${extra}`))).toThrow();
    }
  });

  it('rejects inline modules, unknown scripts, external sources and CSP metas', () => {
    for (const script of [
      '<script type="module">console.log(1)</script>',
      '<script>console.log(1)</script>',
      '<script src="data:application/javascript,"></script>',
      '<script src="//example.com/a.js"></script>',
      '<meta http-equiv="content-security-policy" content="default-src *">',
    ]) {
      expect(() => finalizeSecurityHtml(html + script, 'dist/index.html')).toThrow();
    }
    expect(() => finalizeSecurityHtml(html + '<script type="application/json">{"a":1}</script>', 'dist/index.html')).not.toThrow();
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

  it('fails closed when HTML references a missing local script', async () => {
    const html = '<link rel="stylesheet" href="/_astro/app.js">';
    const readResource = async (resource: string) => {
      if (resource === '/') return { contents: Buffer.from(html), size: html.length };
      throw new Error('ENOENT');
    };
    await expect(
      buildOfflineManifest({ routes: ['/'], assets: [] }, { readResource, concurrency: 2 }),
    ).rejects.toThrow(/Recurso offline ausente: \/_astro\/app\.js/);
  });

  it('ignores missing paths discovered only inside JavaScript strings', async () => {
    const html = '<script src="/_astro/app.js"></script>';
    const script = 'const x = "/node_modules/vscode-jsonrpc/browser.js";';
    const readResource = async (resource: string) => {
      if (resource === '/') return { contents: Buffer.from(html), size: html.length };
      if (resource === '/_astro/app.js') return { contents: Buffer.from(script), size: script.length };
      throw new Error('ENOENT');
    };
    const manifest = await buildOfflineManifest({ routes: ['/'], assets: [] }, { readResource, concurrency: 2 });
    expect(manifest.sharedAssets).toContain('/_astro/app.js');
    expect(JSON.stringify(manifest)).not.toContain('node_modules');
  });

  it('classifies mega review links as review routes, not subjects', () => {
    expect(isSubjectMarkerFile('src/content/assuntos/c/g/a/questoes.json')).toBe(true);
    expect(isSubjectMarkerFile('src/content/assuntos/c/g/a/vinculo.json')).toBe(true);
    expect(isSubjectMarkerFile('src/content/assuntos/c/g/mega-revisao/vinculo.json')).toBe(false);
    expect(isSubjectMarkerFile('src/content/assuntos/c/g/mega-revisao/index.md')).toBe(false);
    expect(isMegaReviewRouteFile('src/content/assuntos/c/g/mega-revisao/index.md')).toBe(true);
    expect(isMegaReviewRouteFile('src/content/assuntos/c/g/mega-revisao/vinculo.json')).toBe(true);
    expect(isMegaReviewRouteFile('src/content/assuntos/c/g/a/vinculo.json')).toBe(false);
  });
});

describe('service worker build stamp', () => {
  it('prefers CI commit ids and falls back to a timestamp', () => {
    expect(resolveBuildId({ CF_PAGES_COMMIT_SHA: 'abc123' })).toBe('abc123');
    expect(resolveBuildId({ GITHUB_SHA: 'def456' })).toBe('def456');
    expect(resolveBuildId({ BUILD_ID: 'ghi789' })).toBe('ghi789');
    expect(typeof resolveBuildId({})).toBe('string');
  });

  it('appends a trailing build marker without touching the body', () => {
    const stamped = stampServiceWorker('self.a = 1;\n', 'abc123');
    expect(stamped).toBe('self.a = 1;\n// build:abc123\n');
    expect(stampServiceWorker('self.a = 1;\n', 'def456')).not.toBe(stamped);
  });

  it('appends the marker to the destination file', async () => {
    const { mkdtemp, readFile, writeFile } = await import('node:fs/promises');
    const { tmpdir } = await import('node:os');
    const { join } = await import('node:path');
    const directory = await mkdtemp(join(tmpdir(), 'sw-stamp-'));
    const filePath = join(directory, 'service-worker.js');
    await writeFile(filePath, 'self.a = 1;\n', 'utf8');

    const previousSize = await appendBuildStamp(filePath, 'zzz');
    expect(previousSize).toBe('self.a = 1;\n'.length);
    await expect(readFile(filePath, 'utf8')).resolves.toBe('self.a = 1;\n// build:zzz\n');
  });
});

describe('Cloudflare beacon stripping (builder)', () => {
  it('matches the client-side stripping on the real snippet', async () => {
    const { stripCloudflareBeacon } = await import('../../scripts/lib/offline-inventory-builder.mjs');
    const beacon = `<!-- Cloudflare Pages Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "f31644b332dd4f4e9b89a5431b9a0502"}'></script><!-- Cloudflare Pages Analytics -->`;
    expect(stripCloudflareBeacon(`<html>${beacon}</html>`)).toBe('<html></html>');
    expect(stripCloudflareBeacon('<html></html>')).toBe('<html></html>');
  });
});
