import { readFile } from 'node:fs/promises';
import path from 'node:path';

export function scriptReferences(source) {
  const references = [];
  for (const match of source.matchAll(/\b(?:from\s*|import\()\s*["'](?:\.\/|\/_astro\/)([^"']+\.js)["']/g)) {
    references.push(match[1]);
  }
  return references;
}

export async function collectShellScriptDependencies(outputDirectory) {
  const htmlFiles = ['index.html', 'offline/index.html'];
  const pending = [];
  for (const relative of htmlFiles) {
    const html = await readFile(path.join(outputDirectory, relative), 'utf8');
    for (const match of html.matchAll(/\bsrc=["']\/_astro\/([^"']+\.js)["']/g)) {
      pending.push(match[1]);
    }
  }

  const scripts = new Set();
  while (pending.length > 0) {
    const fileName = pending.pop();
    if (!fileName || scripts.has(fileName) || fileName.includes('/') || fileName.includes('..')) continue;
    scripts.add(fileName);
    const source = await readFile(path.join(outputDirectory, '_astro', fileName), 'utf8');
    pending.push(...scriptReferences(source));
  }
  return [...scripts].sort().map((fileName) => `_astro/${fileName}`);
}
