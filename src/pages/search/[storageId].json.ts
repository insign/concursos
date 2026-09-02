import type { APIRoute, GetStaticPaths } from 'astro';
import { create, insertMultiple, save } from '@orama/orama';
import { language, stemmer } from '@orama/stemmers/portuguese';
import { getCatalog } from '../../lib/catalog';

export const getStaticPaths: GetStaticPaths = async () => {
  const { contests } = await getCatalog();
  return contests.map((contest) => ({
    params: { storageId: contest.storageId },
  }));
};

function stripForSearch(text: string, max = 5000): string {
  // Remove excesso, mantém texto cru; Orama tokenizer já normaliza.
  return text.slice(0, max);
}

export const GET: APIRoute = async ({ params }) => {
  const storageId = params.storageId as string;
  const { contests } = await getCatalog();
  const contest = contests.find((c) => c.storageId === storageId);
  if (!contest) {
    return new Response(JSON.stringify({ error: 'Contest not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  const db = await create({
    schema: {
      title: 'string',
      slug: 'string',
      excerpt: 'string',
      content: 'string',
      storageId: 'string',
      contestStorageId: 'string',
      contestSlug: 'string',
      type: 'string',
      groupPath: 'string',
    } as const,
    components: {
      tokenizer: {
        language,
        stemmer,
        stemming: true,
      },
    },
  });

  const docs: Array<Record<string, string>> = [];

  for (const subject of contest.subjects) {
    const body = subject.contentEntry.body ?? '';
    const excerpt = body.slice(0, 400);
    const sid = `${contest.storageId}--subject--${subject.storageId}`;
    docs.push({
      id: sid,
      title: subject.title,
      slug: `/concursos/${contest.slug}/${subject.slug}/`,
      excerpt,
      content: stripForSearch(body, 5000),
      storageId: sid,
      contestStorageId: contest.storageId,
      contestSlug: contest.slug,
      type: 'conteudo',
      groupPath: subject.groupPath.map((g) => g.slug).join('/'),
    });
  }

  // Mega revisões do concurso
  const walkGroups = (groups: typeof contest.children) => {
    for (const group of groups) {
      if (group.kind === 'group' && group.megaReviewEntry) {
        const body = group.megaReviewEntry.body ?? '';
        const sid = `${contest.storageId}--mega--${group.megaReview!.slug}`;
        docs.push({
          id: sid,
          title: group.megaReviewEntry.data.title ?? group.title,
          slug: `/revisoes/${contest.slug}/${group.megaReview!.slug}/`,
          excerpt: body.slice(0, 400),
          content: stripForSearch(body, 5000),
          storageId: sid,
          contestStorageId: contest.storageId,
          contestSlug: contest.slug,
          type: 'mega-revisao',
          groupPath: group.id,
        });
      }
      if (group.kind === 'group') walkGroups(group.children as typeof contest.children);
    }
  };
  walkGroups(contest.children);

  if (docs.length > 0) {
    await insertMultiple(db as unknown as Parameters<typeof insertMultiple>[0], docs as unknown as Parameters<typeof insertMultiple>[1]);
  }

  const raw = await save(db as unknown as Parameters<typeof save>[0]);

  return new Response(JSON.stringify(raw), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
};
