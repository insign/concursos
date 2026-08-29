export function evaluateBuildBudget(metrics, budget) {
  const checks = [
    ['total build duration', metrics.totalMs, budget.totalMs, 'ms'],
    ['Astro duration', metrics.phases?.astro?.durationMs, budget.astroMs, 'ms'],
    ['published files', metrics.output?.files, budget.files, 'files'],
    ['published bytes', metrics.output?.bytes, budget.bytes, 'bytes'],
  ];
  return checks.flatMap(([label, actual, maximum, unit]) => {
    if (!Number.isFinite(actual) || !Number.isFinite(maximum)) {
      return [`${label}: missing or invalid numeric value`];
    }
    return actual > maximum ? [`${label}: ${actual}${unit} exceeds ${maximum}${unit}`] : [];
  });
}
