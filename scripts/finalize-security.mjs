import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(rootDirectory, 'dist');

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listHtmlFiles(entryPath) : entryPath.endsWith('.html') ? [entryPath] : [];
  }));
  return files.flat();
}

const htmlFiles = await listHtmlFiles(outputDirectory);
if (htmlFiles.length === 0) throw new Error('Nenhum HTML foi gerado para aplicar a política de segurança.');

for (const filePath of htmlFiles) {
  const html = await readFile(filePath, 'utf8');
  const relativePath = path.relative(rootDirectory, filePath);
  const cspMeta = /(<meta http-equiv="content-security-policy" content=")([^"]+)(">)/;
  const cspMatch = html.match(cspMeta);
  if (!cspMatch) throw new Error(`CSP ausente no arquivo ${relativePath}.`);

  const policy = cspMatch[2];
  const styleDirective = /style-src [^;]+;/;
  if (!styleDirective.test(policy)) throw new Error(`CSP sem style-src no arquivo ${relativePath}.`);
  if (!/script-src 'self' 'sha256-/.test(policy)) throw new Error(`CSP sem hashes de script no arquivo ${relativePath}.`);
  if (/script-src [^;]*(?:'unsafe-inline'|'unsafe-eval')/.test(policy)) {
    throw new Error(`CSP permite execução insegura de scripts no arquivo ${relativePath}.`);
  }

  const finalizedPolicy = policy.replace(styleDirective, "style-src 'self' 'unsafe-inline';");
  await writeFile(filePath, html.replace(cspMeta, `$1${finalizedPolicy}$3`));
}

console.log(`Security policy finalized in ${htmlFiles.length} HTML files.`);
