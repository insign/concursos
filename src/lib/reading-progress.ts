export interface ReadingProgressMeasurements {
  articleTop: number;
  articleBottom: number;
  excludedTop: number | null;
  scrollY: number;
  viewportHeight: number;
}

export function readingProgressFraction({
  articleTop,
  articleBottom,
  excludedTop,
  scrollY,
  viewportHeight,
}: ReadingProgressMeasurements): number {
  const endY = excludedTop !== null ? Math.min(excludedTop, articleBottom) : articleBottom;
  const readableHeight = Math.max(0, endY - articleTop);
  const scrollable = Math.max(0, readableHeight - viewportHeight);

  if (scrollable === 0) return 1;

  return Math.min(1, Math.max(0, (scrollY - articleTop) / scrollable));
}
