import { readFile } from 'node:fs/promises';
import { evaluateBuildBudget } from './lib/build-budget.mjs';

const metricsPath = new URL(`../${process.env.BUILD_METRICS_PATH || '.build-metrics.json'}`, import.meta.url);
const budgetPath = new URL('./build-budget.json', import.meta.url);
const [metrics, budget] = await Promise.all([
  readFile(metricsPath, 'utf8').then(JSON.parse),
  readFile(budgetPath, 'utf8').then(JSON.parse),
]);
const failures = evaluateBuildBudget(metrics, budget);
if (failures.length > 0) throw new Error(`Build budget exceeded:\n- ${failures.join('\n- ')}`);
console.log(`Build budget OK: ${metrics.totalMs}ms, ${metrics.output.files} files, ${metrics.output.bytes} bytes.`);
