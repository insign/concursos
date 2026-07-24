import { createHash } from 'node:crypto';
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

let themeHashesVerified = 0;

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

  // O script inline anti-flash de tema (BaseLayout) é <script is:inline>, que o Astro
  // renderiza verbatim mas NÃO hasheia. Seu hash é fixado manualmente em
  // astro.config.mjs (scriptDirective.resources). Como a meta CSP não governa scripts
  // que a precedem no <head>, um hash divergente não seria pego em runtime; aqui
  // recomputamos o hash do conteúdo real e falhamos o build se ele não estiver na CSP.
  const themeScript = html.match(/<script>((?:(?!<\/script>).)*concursos:theme(?:(?!<\/script>).)*)<\/script>/s);
  if (themeScript) {
    const themeHash = createHash('sha256').update(themeScript[1]).digest('base64');
    if (!policy.includes(`'sha256-${themeHash}'`)) {
      throw new Error(
        `CSP não contém o hash do script inline de tema em ${relativePath} ` +
          `(esperado 'sha256-${themeHash}'). Atualize scriptDirective.resources em astro.config.mjs.`,
      );
    }
    themeHashesVerified += 1;
  }

  const finalizedPolicy = policy.replace(styleDirective, "style-src 'self' 'unsafe-inline';");
  await writeFile(filePath, html.replace(cspMeta, `$1${finalizedPolicy}$3`));
}

// Falha fechada: se o script de tema não foi encontrado em nenhuma página, a regex
// acima deixou de casar (ex.: mudança no markup) e a verificação de hash virou no-op.
if (themeHashesVerified === 0) {
  throw new Error(
    'Script inline de tema não localizado em nenhum HTML; a verificação de hash não executou. ' +
      'Revise o padrão em finalize-security.mjs ou o <script is:inline> em BaseLayout.astro.',
  );
}

console.log(`Security policy finalized in ${htmlFiles.length} HTML files (${themeHashesVerified} com hash de tema verificado).`);
