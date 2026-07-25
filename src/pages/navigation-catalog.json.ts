import type { APIRoute } from 'astro';
import { getCatalog } from '../lib/catalog';
import type { NavigationCatalog } from '../lib/navigation';

export const prerender = true;

export const GET: APIRoute = async () => {
  const { contests } = await getCatalog();
  const routes: NavigationCatalog['routes'] = [
    { route: '/', contestStorageId: null, subjectStorageId: null, activeTab: 'catalog', readingMode: false },
    { route: '/simulados/', contestStorageId: null, subjectStorageId: null, activeTab: 'simulados', readingMode: false },
    { route: '/configuracoes/', contestStorageId: null, subjectStorageId: null, activeTab: 'settings', readingMode: false },
  ];

  for (const contest of contests) {
    routes.push({
      route: `/concursos/${contest.slug}/`,
      contestStorageId: contest.storageId,
      subjectStorageId: null,
      activeTab: 'catalog',
      readingMode: false,
    });
    for (const subject of contest.subjects) {
      const base = `/concursos/${contest.slug}/${subject.slug}`;
      routes.push(
        { route: `${base}/`, contestStorageId: contest.storageId, subjectStorageId: subject.storageId, activeTab: 'content', readingMode: false },
        { route: `${base}/cheat-sheet/`, contestStorageId: contest.storageId, subjectStorageId: subject.storageId, activeTab: 'cheat-sheet', readingMode: false },
        { route: `${base}/questoes/`, contestStorageId: contest.storageId, subjectStorageId: subject.storageId, activeTab: 'questions', readingMode: false },
        { route: `${base}/leitura/`, contestStorageId: contest.storageId, subjectStorageId: subject.storageId, activeTab: 'reading', readingMode: true },
      );
    }
  }

  return new Response(JSON.stringify({ schemaVersion: 1, routes } satisfies NavigationCatalog), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
