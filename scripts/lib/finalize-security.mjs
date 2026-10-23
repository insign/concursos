import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { mapConcurrent, resolveConcurrency } from './concurrency.mjs';

export const THEME_SCRIPT_HASH = "'sha256-qa3TD4AFh7EcKG3WZ9Lk74qsmjRyiQVM3662eOB1ifQ='";

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

export function validateSecurityHeaders(headers) {
  const policy = headers.match(/^\s*Content-Security-Policy:\s*(.+)$/mi)?.[1];
  if (!policy) throw new Error('CSP HTTP ausente.');
  const directives = new Map();
  for (const part of policy.split(';').map((value) => value.trim()).filter(Boolean)) {
    const [name, ...values] = part.split(/\s+/);
    if (directives.has(name)) throw new Error(`Diretiva CSP duplicada: ${name}`);
    directives.set(name, values.join(' '));
  }
  const expected = {
    'default-src': "'self'",
    'base-uri': "'self'",
    'script-src': `'self' https://static.cloudflareinsights.com ${THEME_SCRIPT_HASH}`,
    'script-src-attr': "'none'",
    'connect-src': "'self' https://kv.helio.me https://cloudflareinsights.com",
    'font-src': "'self' data:",
    'form-action': "'self'",
    'frame-ancestors': "'none'",
    'frame-src': "'none'",
    'img-src': "'self'",
    'manifest-src': "'self'",
    'media-src': "'self'",
    'object-src': "'none'",
    'style-src': "'self' 'unsafe-inline'",
    'style-src-attr': "'unsafe-inline'",
    'style-src-elem': "'self' 'unsafe-inline'",
    'worker-src': "'self'",
  };
  if (directives.size !== Object.keys(expected).length) throw new Error('Diretivas CSP inesperadas.');
  for (const [name, value] of Object.entries(expected)) {
    if (directives.get(name) !== value) throw new Error(`CSP HTTP inválida: ${name}`);
  }
  return policy;
}

function attributes(source) {
  const result = new Map();
  for (const match of source.matchAll(/([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    const name = match[1].toLowerCase();
    if (result.has(name)) throw new Error(`Atributo de script duplicado: ${name}`);
    result.set(name, match[2] ?? match[3] ?? match[4] ?? '');
  }
  return result;
}

export function finalizeSecurityHtml(html, relativePath) {
  if (/<meta\b[^>]*http-equiv\s*=\s*["']?content-security-policy/i.test(html)) {
    throw new Error(`Meta CSP incompatível com navegação persistente: ${relativePath}`);
  }
  let themeHashVerified = false;
  for (const [, rawAttributes, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    const attrs = attributes(rawAttributes);
    const type = (attrs.get('type') ?? '').toLowerCase();
    if (type === 'application/json' || type === 'application/ld+json') {
      if (attrs.has('src')) throw new Error(`Script de dados externo inesperado: ${relativePath}`);
      continue;
    }
    const src = attrs.get('src');
    if (src !== undefined) {
      if (!/^\/(?!\/)[^\\\s&<>"']+\.m?js(?:\?[^\\\s&<>"']*)?$/.test(src)) {
        throw new Error(`Origem de script inválida em ${relativePath}: ${src}`);
      }
      continue;
    }
    const hash = `'sha256-${createHash('sha256').update(body).digest('base64')}'`;
    if (type !== '' || hash !== THEME_SCRIPT_HASH || themeHashVerified) {
      throw new Error(`Script inline não autorizado em ${relativePath}.`);
    }
    themeHashVerified = true;
  }
  if (!themeHashVerified) throw new Error(`Script de tema ausente em ${relativePath}.`);
  return { html, themeHashVerified };
}

export async function runFinalizeSecurity({ rootDirectory, outputDirectory, concurrency = resolveConcurrency() }) {
  const headers = await readFile(path.join(outputDirectory, '_headers'), 'utf8');
  validateSecurityHeaders(headers);
  const htmlFiles = await listHtmlFiles(outputDirectory);
  if (htmlFiles.length === 0) throw new Error('Nenhum HTML foi gerado para validar a política de segurança.');
  const results = await mapConcurrent(htmlFiles, concurrency, async (filePath) => {
    const html = await readFile(filePath, 'utf8');
    return finalizeSecurityHtml(html, path.relative(rootDirectory, filePath)).themeHashVerified;
  });
  return { htmlFiles: htmlFiles.length, themeHashesVerified: results.filter(Boolean).length, concurrency };
}
