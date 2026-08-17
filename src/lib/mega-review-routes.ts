export function megaReviewRoute(contestSlug: string, reviewSlug: string): string {
  return `/revisoes/${encodeURIComponent(contestSlug)}/${encodeURIComponent(reviewSlug)}/`;
}
