import type { APIRoute } from 'astro';
import { create, insertMultiple, save } from '@orama/orama';
import { language, stemmer } from '@orama/stemmers/portuguese';
import { getCatalog } from '../lib/catalog';

function stripForSearch(text: string, max = 5000): string {
  return text.slice(0, max);
}

export const GET: APIRoute = async () => {
  const { contests } = await getCatalog();

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

  for (const contest of contests) {
    for (const subject of contest.subjects) {
      const body = subject.contentEntry.body ?? '';
      const sid = `${contest.storageId}--subject--${subject.storageId}`;
      docs.push({
        id: sid,
        title: subject.title,
        slug: `/concursos/${contest.slug}/${subject.slug}/`,
        excerpt: body.slice(0, 400),
        content: stripForSearch(body, 5000),
        storageId: sid,
        contestStorageId: contest.storageId,
        contestSlug: contest.slug,
        type: 'conteudo',
        groupPath: subject.groupPath.map((g) => g.slug).join('/'),
      });
    }
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
  }

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
