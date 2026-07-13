import { createHash } from 'node:crypto';
import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { extname, join, posix } from 'node:path';

const DIST_DIRECTORY = new URL('../dist/', import.meta.url);
const INVENTORY_DIRECTORY = new URL('../dist/offline-inventories/', import.meta.url);
const ASSET_EXTENSIONS = new Set([
  '.css',
  '.avif',
  '.gif',
  '.jpeg',
  '.jpg',
  '.js',
  '.png',
  '.svg',
  '.ttf',
  '.webmanifest',
  '.webp',
  '.woff',
  '.woff2',
]);
const CONTENT_IMAGE_EXTENSIONS = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);

function normalizeUrl(value, basePath = '/') {
  if (!value || value.startsWith('data:') || value.startsWith('#')) return null;

  const url = new URL(value, `https://concursos.helio.me${basePath}`);
  if (url.origin !== 'https://concursos.helio.me') return null;
  return decodeURI(url.pathname);
}

function outputPath(urlPath) {
  const relativePath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, '');
  return new URL(urlPath.endsWith('/') ? `${relativePath}index.html` : relativePath, DIST_DIRECTORY);
}

function isAsset(urlPath) {
  return urlPath.startsWith('/_astro/') || ASSET_EXTENSIONS.has(extname(urlPath));
}

function referencesFromHtml(html, route) {
  const references = [];
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const url = normalizeUrl(match[1], route);
    if (url && isAsset(url)) references.push(url);
  }
  return references;
}

function referencesFromAsset(source, assetPath) {
  const references = [];
  const basePath = posix.dirname(assetPath) + '/';
  for (const match of source.matchAll(/["'(`]((?:\.\.\/|\.\/|\/)[^"'`)\s]+\.(?:avif|css|gif|jpe?g|js|png|svg|ttf|webp|woff2?)(?:\?[^"'`)\s]*)?)["'`)]/gi)) {
    const url = normalizeUrl(match[1], basePath);
    if (url && isAsset(url)) references.push(url);
  }
  return references;
}

async function collectAssets(routes) {
  const assets = new Set();
  const pending = [];

  for (const route of routes) {
    const html = await readFile(outputPath(route), 'utf8');
    pending.push(...referencesFromHtml(html, route));
  }

  while (pending.length > 0) {
    const asset = pending.pop();
    if (!asset || assets.has(asset)) continue;

    try {
      await stat(outputPath(asset));
    } catch {
      // Bundled sources can retain paths that do not identify published assets.
      continue;
    }

    assets.add(asset);

    if (!['.css', '.js'].includes(extname(asset))) continue;
    const source = await readFile(outputPath(asset), 'utf8');
    pending.push(...referencesFromAsset(source, asset));
  }

  return [...assets].sort();
}

function isSharedAsset(asset) {
  if (asset.startsWith('/_astro/') && CONTENT_IMAGE_EXTENSIONS.has(extname(asset))) return false;
  return asset.startsWith('/_astro/') || asset.startsWith('/icons/') || asset === '/favicon.svg';
}

async function buildManifest(seed) {
  const discoveredAssets = (await collectAssets(seed.routes)).filter((asset) => asset !== '/manifest.webmanifest');
  const assets = [...new Set([...seed.assets, ...discoveredAssets.filter((asset) => !isSharedAsset(asset))])].sort();
  const sharedAssets = discoveredAssets.filter(isSharedAsset);
  const resources = [...seed.routes, ...assets, ...sharedAssets];
  const hash = createHash('sha256');
  let estimatedBytes = 0;

  for (const resource of resources) {
    const file = outputPath(resource);
    const metadata = await stat(file);
    const contents = await readFile(file);
    estimatedBytes += metadata.size;
    hash.update(resource);
    hash.update(contents);
  }

  return {
    ...seed,
    manifestHash: hash.digest('hex').slice(0, 20),
    assets,
    sharedAssets,
    estimatedBytes,
  };
}

for (const entry of await readdir(INVENTORY_DIRECTORY, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
  const inventoryUrl = new URL(entry.name, INVENTORY_DIRECTORY);
  const seed = JSON.parse(await readFile(inventoryUrl, 'utf8'));
  const manifest = await buildManifest(seed);
  await writeFile(inventoryUrl, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Offline inventory generated: ${join('offline-inventories', entry.name)}`);
}
