import { readFile, writeFile } from 'node:fs/promises';

export function resolveBuildId(env = process.env) {
  return env.CF_PAGES_COMMIT_SHA ?? env.GITHUB_SHA ?? env.BUILD_ID ?? String(Date.now());
}

export function stampServiceWorker(source, buildId) {
  return `${source.replace(/\s+$/, '')}\n// build:${buildId}\n`;
}

export async function appendBuildStamp(filePath, buildId) {
  const source = await readFile(filePath, 'utf8');
  await writeFile(filePath, stampServiceWorker(source, buildId), 'utf8');
  return source.length;
}
