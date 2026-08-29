import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, join, posix } from 'node:path';
import { mapConcurrent, resolveConcurrency } from './concurrency.mjs';

const ASSET_EXTENSIONS = new Set([
  '.css', '.avif', '.gif', '.jpeg', '.jpg', '.js', '.png', '.svg', '.ttf', '.webmanifest', '.webp', '.woff', '.woff2',
]);
const CONTENT_IMAGE_EXTENSIONS = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);

function normalizeUrl(value, basePath = '/') {
  if (!value || value.startsWith('data:') || value.startsWith('#')) return null;
  const url = new URL(value, `https://concursos.helio.me${basePath}`);
  if (url.origin !== 'https://concursos.helio.me') return null;
  return decodeURI(url.pathname);
}

function outputPath(urlPath, distDirectory) {
  const relativePath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, '');
  return new URL(urlPath.endsWith('/') ? `${relativePath}index.html` : relativePath, distDirectory);
}

export function isInventoryAsset(urlPath) {
  if (urlPath === '/service-worker.js' || urlPath === '/service-worker-source.js') return false;
  return urlPath.startsWith('/_astro/') || ASSET_EXTENSIONS.has(extname(urlPath));
}

function referencesFromHtml(html, route) {
  const references = [];
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const url = normalizeUrl(match[1], route);
    if (url && isInventoryAsset(url)) references.push(url);
  }
  return references;
}

function referencesFromAsset(source, assetPath) {
  const references = [];
  const basePath = posix.dirname(assetPath) + '/';
  for (const match of source.matchAll(/["'(`]((?:\.\.\/|\.\/|\/)[^"'`)\s]+\.(?:avif|css|gif|jpe?g|js|png|svg|ttf|webp|woff2?)(?:\?[^"'`)\s]*)?)["'`)]/gi)) {
    const url = normalizeUrl(match[1], basePath);
    if (url && isInventoryAsset(url)) references.push(url);
  }
  return references;
}

function isSharedAsset(asset) {
  if (asset.startsWith('/_astro/') && CONTENT_IMAGE_EXTENSIONS.has(extname(asset))) return false;
  return asset.startsWith('/_astro/') || asset.startsWith('/icons/') || asset === '/favicon.png';
}

export function resourceHash(resource, contents) {
  return createHash('sha256').update(resource).update(contents).digest('hex').slice(0, 20);
}

function createResourceReader(distDirectory) {
  const cache = new Map();
  return (resource) => {
    let pending = cache.get(resource);
    if (!pending) {
      pending = readFile(outputPath(resource, distDirectory)).then((contents) => ({
        contents,
        size: contents.byteLength,
      }));
      cache.set(resource, pending);
      const extension = extname(resource);
      const retain =
        resource.startsWith('/icons/') ||
        resource === '/favicon.png' ||
        (resource.startsWith('/_astro/') && ['.css', '.js', '.ttf', '.woff', '.woff2'].includes(extension));
      if (!retain) {
        const release = () => {
          if (cache.get(resource) === pending) cache.delete(resource);
        };
        void pending.then(release, release);
      }
    }
    return pending;
  };
}

async function collectAssets(routes, readResource, concurrency) {
  const routeReferences = await mapConcurrent(routes, concurrency, async (route) =>
    referencesFromHtml((await readResource(route)).contents.toString('utf8'), route));
  const assets = new Set();
  let pending = routeReferences.flat();

  while (pending.length > 0) {
    const wave = [...new Set(pending.filter((asset) => asset && !assets.has(asset)))].sort();
    pending = [];
    const discovered = await mapConcurrent(wave, concurrency, async (asset) => {
      try {
        const source = await readResource(asset);
        assets.add(asset);
        if (!['.css', '.js'].includes(extname(asset))) return [];
        return referencesFromAsset(source.contents.toString('utf8'), asset);
      } catch {
        return [];
      }
    });
    pending.push(...discovered.flat());
  }

  return [...assets].sort();
}

export async function buildOfflineManifest(seed, { readResource, concurrency }) {
  const discoveredAssets = (await collectAssets(seed.routes, readResource, concurrency))
    .filter((asset) => asset !== '/manifest.webmanifest');
  const assets = [...new Set([...seed.assets, ...discoveredAssets.filter((asset) => !isSharedAsset(asset))])].sort();
  const sharedAssets = [...new Set(discoveredAssets.filter(isSharedAsset))].sort();
  const contentResources = [...seed.routes, ...assets];
  const sharedResourcesList = [...sharedAssets];
  const contentHash = createHash('sha256');
  const sharedHash = createHash('sha256');
  const resourceHashes = {};
  const sharedResourceHashes = {};
  let estimatedBytes = 0;

  async function hashInChunks(resources, aggregateHash, hashes) {
    let bytes = 0;
    for (let offset = 0; offset < resources.length; offset += concurrency) {
      const chunk = resources.slice(offset, offset + concurrency);
      const data = await mapConcurrent(chunk, concurrency, async (resource) => ({
        resource,
        ...(await readResource(resource)),
      }));
      for (const { resource, contents, size } of data) {
        bytes += size;
        aggregateHash.update(resource).update(contents);
        hashes[resource] = resourceHash(resource, contents);
      }
    }
    return bytes;
  }
  estimatedBytes += await hashInChunks(contentResources, contentHash, resourceHashes);
  estimatedBytes += await hashInChunks(sharedResourcesList, sharedHash, sharedResourceHashes);

  return {
    ...seed,
    schemaVersion: 3,
    manifestHash: contentHash.digest('hex').slice(0, 20),
    sharedHash: sharedResourcesList.length
      ? sharedHash.digest('hex').slice(0, 20)
      : createHash('sha256').digest('hex').slice(0, 20),
    assets,
    sharedAssets,
    estimatedBytes,
    resources: resourceHashes,
    sharedResources: sharedResourceHashes,
  };
}

export async function runOfflineInventoryBuild({
  distDirectory,
  inventoryDirectory,
  concurrency = resolveConcurrency(),
}) {
  const readResource = createResourceReader(distDirectory);
  const entries = (await readdir(inventoryDirectory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .sort((left, right) => left.name.localeCompare(right.name));

  const inventoryConcurrency = Math.min(entries.length || 1, Math.max(1, Math.floor(Math.sqrt(concurrency))));
  const resourceConcurrency = Math.max(1, Math.floor(concurrency / inventoryConcurrency));
  const generated = await mapConcurrent(entries, inventoryConcurrency, async (entry) => {
    const inventoryUrl = new URL(entry.name, inventoryDirectory);
    const seed = JSON.parse(await readFile(inventoryUrl, 'utf8'));
    const manifest = await buildOfflineManifest(seed, { readResource, concurrency: resourceConcurrency });
    await writeFile(inventoryUrl, `${JSON.stringify(manifest, null, 2)}\n`);
    return join('offline-inventories', entry.name);
  });
  return { generated, concurrency, inventoryConcurrency, resourceConcurrency };
}
