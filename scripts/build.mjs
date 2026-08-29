import { readdir, stat, writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mapConcurrent, resolveConcurrency } from './lib/concurrency.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
const metricsPath = path.join(root, process.env.BUILD_METRICS_PATH || '.build-metrics.json');
const sequential = process.env.BUILD_SEQUENTIAL === '1';
const startedAt = new Date().toISOString();
const started = performance.now();
const phases = {};

async function runPhase(name, command, args) {
  const phaseStarted = performance.now();
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, env: process.env, stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${name} failed (${signal ?? `exit ${code}`})`));
    });
  });
  phases[name] = { durationMs: Math.round(performance.now() - phaseStarted) };
}

async function collectOutputFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectOutputFiles(entryPath));
    else files.push(entryPath);
  }
  return files;
}

async function outputMetrics(directory) {
  const files = await collectOutputFiles(directory);
  const items = await mapConcurrent(files, resolveConcurrency(), async (file) => {
    const metadata = await stat(file);
    return { files: 1, htmlFiles: file.endsWith('.html') ? 1 : 0, bytes: metadata.size };
  });
  return items.reduce((total, item) => ({
    files: total.files + item.files,
    htmlFiles: total.htmlFiles + item.htmlFiles,
    bytes: total.bytes + item.bytes,
  }), { files: 0, htmlFiles: 0, bytes: 0 });
}

await runPhase('astro', path.join(root, 'node_modules', '.bin', 'astro'), ['build']);
await runPhase('security', process.execPath, ['scripts/finalize-security.mjs']);
if (sequential) {
  await runPhase('inventories', process.execPath, ['scripts/generate-offline-inventories.mjs']);
  await runPhase('serviceWorker', process.execPath, ['scripts/build-service-worker.mjs']);
} else {
  await Promise.all([
    runPhase('inventories', process.execPath, ['scripts/generate-offline-inventories.mjs']),
    runPhase('serviceWorker', process.execPath, ['scripts/build-service-worker.mjs']),
  ]);
}

const outputSummary = await outputMetrics(output);
const metrics = {
  schemaVersion: 1,
  startedAt,
  totalMs: Math.round(performance.now() - started),
  mode: sequential ? 'sequential' : 'parallel',
  concurrency: resolveConcurrency(),
  phases,
  output: outputSummary,
};
await writeFile(metricsPath, `${JSON.stringify(metrics, null, 2)}\n`);
console.log(`Build metrics: ${JSON.stringify(metrics)}`);
