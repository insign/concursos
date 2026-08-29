import { createHash } from 'node:crypto';
import { readdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { mapConcurrent, resolveConcurrency } from './concurrency.mjs';

export async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listHtmlFiles(entryPath));
    else if (entryPath.endsWith('.html')) files.push(entryPath);
  }
  return files.sort();
}

export function finalizeSecurityHtml(html, relativePath) {
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

  const themeScript = html.match(/<script>((?:(?!<\/script>).)*concursos:theme(?:(?!<\/script>).)*)<\/script>/s);
  if (themeScript) {
    const themeHash = createHash('sha256').update(themeScript[1]).digest('base64');
    if (!policy.includes(`'sha256-${themeHash}'`)) {
      throw new Error(
        `CSP não contém o hash do script inline de tema em ${relativePath} ` +
          `(esperado 'sha256-${themeHash}'). Atualize scriptDirective.resources em astro.config.mjs.`,
      );
    }
  }

  const finalizedPolicy = policy.replace(styleDirective, "style-src 'self' 'unsafe-inline';");
  return {
    html: html.replace(cspMeta, `$1${finalizedPolicy}$3`),
    themeHashVerified: Boolean(themeScript),
  };
}

export async function runFinalizeSecurity({ rootDirectory, outputDirectory, concurrency = resolveConcurrency() }) {
  const htmlFiles = await listHtmlFiles(outputDirectory);
  if (htmlFiles.length === 0) throw new Error('Nenhum HTML foi gerado para aplicar a política de segurança.');

  const results = await mapConcurrent(htmlFiles, concurrency, async (filePath, index) => {
    const html = await readFile(filePath, 'utf8');
    const relativePath = path.relative(rootDirectory, filePath);
    const finalized = finalizeSecurityHtml(html, relativePath);
    if (finalized.html !== html) {
      const temporaryPath = `${filePath}.security-${process.pid}-${index}`;
      await writeFile(temporaryPath, finalized.html);
      await rename(temporaryPath, filePath);
    }
    return finalized.themeHashVerified;
  });

  const themeHashesVerified = results.filter(Boolean).length;
  if (themeHashesVerified === 0) {
    throw new Error(
      'Script inline de tema não localizado em nenhum HTML; a verificação de hash não executou. ' +
        'Revise o padrão em finalize-security.mjs ou o <script is:inline> em BaseLayout.astro.',
    );
  }

  return { htmlFiles: htmlFiles.length, themeHashesVerified, concurrency };
}
