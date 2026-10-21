#!/usr/bin/env node
/**
 * Publica a mídia dos assuntos no bucket R2 e atualiza o catálogo versionado
 * que o site consome.
 *
 * Fluxo editorial:
 *   1. o arquivo de mídia é colocado na pasta `midia/` do assunto (física ou
 *      canônica), com nome `^[a-z0-9]+(?:-[a-z0-9]+)*\.<ext>`;
 *   2. `npm run midia:publicar` envia o arquivo ao R2 sob a chave
 *      `media/<sha256>.<ext>` e reescreve `midia/catalogo.json`;
 *   3. o `catalogo.json` é versionado; o binário não entra no Git.
 *
 * O script é idempotente: reexecutar não reenvia o que já está no bucket com o
 * mesmo conteúdo.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, stat, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const CONTENT_ROOTS = ['src/content/assuntos', 'src/content/biblioteca'];
const MEDIA_FOLDER = 'midia';
const CATALOG_FILE = 'catalogo.json';
const BUCKET = process.env.MEDIA_BUCKET ?? 'concursos-midia';
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID ?? '792cdd8dd982975da04155cf8b4d9403';

const EXTENSIONS = new Map([
  ['mp3', 'audio/mpeg'],
  ['m4a', 'audio/mp4'],
  ['ogg', 'audio/ogg'],
  ['opus', 'audio/ogg'],
  ['mp4', 'video/mp4'],
  ['webm', 'video/webm'],
]);

const FILE_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:mp3|m4a|ogg|opus|mp4|webm)$/;

function parseArgs(argv) {
  const args = { dryRun: false, force: false };
  for (const value of argv) {
    if (value === '--dry-run') args.dryRun = true;
    else if (value === '--force') args.force = true;
    else if (value === '--help' || value === '-h') args.help = true;
    else throw new Error(`Argumento desconhecido: ${value}`);
  }
  return args;
}

async function findMediaDirectories(directory) {
  const found = [];
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const full = path.join(directory, entry.name);
    if (entry.name === MEDIA_FOLDER) {
      found.push(full);
      continue;
    }
    found.push(...(await findMediaDirectories(full)));
  }
  return found;
}

async function sha256Of(file) {
  const hash = createHash('sha256');
  hash.update(await readFile(file));
  return hash.digest('hex');
}

async function publishedItems(catalogPath) {
  if (!existsSync(catalogPath)) return [];
  try {
    const parsed = JSON.parse(await readFile(catalogPath, 'utf8'));
    if (!Array.isArray(parsed?.items)) return [];
    return parsed.items.filter(
      (item) => typeof item?.file === 'string' && typeof item?.sha256 === 'string',
    );
  } catch {
    console.warn(`catálogo ilegível, será reescrito: ${path.relative(ROOT, catalogPath)}`);
    return [];
  }
}

async function runWrangler(args) {
  const { spawn } = await import('node:child_process');
  return new Promise((resolve, reject) => {
    const child = spawn('npx', ['wrangler', ...args], {
      stdio: 'inherit',
      env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: ACCOUNT_ID },
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`wrangler ${args.join(' ')} terminou com código ${code}`));
    });
  });
}

async function publish() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log('Uso: node scripts/publish-media.mjs [--dry-run] [--force]');
    console.log('  --dry-run  mostra o que seria enviado, sem alterar nada');
    console.log('  --force    remove do catálogo as entradas cujo arquivo não está na pasta');
    return;
  }

  const directories = [];
  for (const root of CONTENT_ROOTS) {
    directories.push(...(await findMediaDirectories(path.join(ROOT, root))));
  }
  directories.sort();

  let uploaded = 0;
  let reused = 0;
  let skipped = 0;
  let removed = 0;

  for (const directory of directories) {
    const catalogPath = path.join(directory, CATALOG_FILE);
    const previousItems = await publishedItems(catalogPath);
    const publishedDigests = new Set(previousItems.map((item) => item.sha256));
    const files = (await readdir(directory, { withFileTypes: true }))
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => name !== CATALOG_FILE)
      .sort();

    const missing = previousItems.filter((item) => !files.includes(item.file));
    if (missing.length > 0 && !args.force) {
      throw new Error(
        `O catálogo de ${path.relative(ROOT, directory)} referencia arquivo(s) ausente(s): ${missing
          .map((item) => item.file)
          .join(', ')}. Restaure o binário ou use --force para remover a(s) entrada(s).`,
      );
    }

    if (files.length === 0) {
      // Sem mídia na pasta, o catálogo versionado sai: ele descreve a mídia
      // existente e deixá-lo aponta para objetos ausentes gera 404 no site.
      if (existsSync(catalogPath)) {
        if (args.dryRun) {
          console.log(`[dry-run] removeria ${path.relative(ROOT, catalogPath)}`);
        } else {
          await rm(catalogPath);
          console.log(`removido ${path.relative(ROOT, catalogPath)}`);
        }
        removed += 1;
      }
      continue;
    }

    const items = [];
    for (const name of files) {
      const extension = name.slice(name.lastIndexOf('.') + 1);
      const mime = EXTENSIONS.get(extension);
      if (!mime || !FILE_NAME_PATTERN.test(name)) {
        throw new Error(`Nome de mídia inválido em ${path.relative(ROOT, directory)}: "${name}"`);
      }
      const file = path.join(directory, name);
      const digest = await sha256Of(file);
      const { size } = await stat(file);
      const key = `media/${digest}.${extension}`;

      if (publishedDigests.has(digest)) {
        // O objeto já está no bucket sob a mesma chave de conteúdo.
        reused += 1;
      } else if (args.dryRun) {
        console.log(`[dry-run] enviaria ${path.relative(ROOT, file)} -> ${BUCKET}/${key}`);
      } else {
        await runWrangler([
          'r2',
          'object',
          'put',
          `${BUCKET}/${key}`,
          '--file',
          file,
          '--content-type',
          mime,
          '--cache-control',
          'public, max-age=31536000, immutable',
          '--remote',
        ]);
        uploaded += 1;
      }
      items.push({ file: name, sha256: digest, bytes: size });
      skipped += 1;
    }

    const catalog = { schemaVersion: 1, items };
    if (args.dryRun) {
      console.log(`[dry-run] escreveria ${path.relative(ROOT, catalogPath)}`);
      continue;
    }
    const previous = existsSync(catalogPath) ? await readFile(catalogPath, 'utf8') : null;
    const next = `${JSON.stringify(catalog, null, 2)}\n`;
    if (previous === next) {
      reused += 1;
    } else {
      await mkdir(directory, { recursive: true });
      await writeFile(catalogPath, next, 'utf8');
      console.log(`atualizado ${path.relative(ROOT, catalogPath)}`);
    }
  }

  console.log(
    args.dryRun
      ? `dry-run concluído: ${skipped} arquivo(s) em ${directories.length} pasta(s), ${removed} catálogo(s) a remover.`
      : `publicação concluída: ${uploaded} enviado(s), ${reused} reaproveitado(s), ${removed} catálogo(s) removido(s).`,
  );
}

publish().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
