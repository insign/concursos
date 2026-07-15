import { expect, test } from './fixtures';

const contestPath = '/concursos/tce-ma-2026-analista-administracao/';
const readingPath = `${contestPath}leitura-interpretacao-tipos-generos/`;
const readingTitle = 'Leitura, compreensão e interpretação de textos';
const typesPath = `${contestPath}tipos-generos-textuais/`;
const typesTitle = 'Tipos e gêneros textuais';

test('renders grouped catalogs while preserving short public routes', async ({ page, request }) => {
  const response = await page.goto(contestPath);
  expect(response?.status()).toBe(200);

  const generalSection = page
    .getByRole('heading', { name: 'Conhecimentos gerais', level: 2 })
    .locator('..');
  const portugueseSection = generalSection
    .getByRole('heading', { name: 'Língua Portuguesa', level: 3 })
    .locator('..');
  await expect(portugueseSection.getByRole('link', { name: readingTitle })).toHaveAttribute(
    'href',
    readingPath,
  );
  await expect(portugueseSection.getByRole('link', { name: typesTitle })).toHaveAttribute(
    'href',
    typesPath,
  );

  for (const route of [
    readingPath,
    `${readingPath}cheat-sheet/`,
    `${readingPath}questoes/`,
    typesPath,
    `${typesPath}cheat-sheet/`,
    `${typesPath}questoes/`,
  ]) {
    expect((await request.get(route)).status()).toBe(200);
  }

  await page.goto(readingPath);
  const breadcrumbs = page.locator('.breadcrumbs');
  const labels = await breadcrumbs.locator('a, span:not([aria-hidden])').allTextContents();
  expect(labels.map((label) => label.trim())).toEqual([
    'Concursos',
    'TCE/MA 2026 - Analista de Administração',
    'Conhecimentos gerais',
    'Língua Portuguesa',
    readingTitle,
  ]);
  await expect(breadcrumbs.getByRole('link', { name: 'Conhecimentos gerais' })).toHaveCount(0);
  await expect(breadcrumbs.getByRole('link', { name: 'Língua Portuguesa' })).toHaveCount(0);

  await page.goto('/concursos/concurso-exemplo/');
  const exampleSection = page
    .getByRole('heading', { name: 'Administração pública', level: 2 })
    .locator('..');
  await expect(exampleSection.getByRole('link', { name: 'Fundamentos de administração pública' })).toHaveAttribute(
    'href',
    '/concursos/concurso-exemplo/assunto-exemplo/',
  );
  expect((await request.get('/concursos/concurso-exemplo/assunto-exemplo/')).status()).toBe(200);
});

test('keeps catalog hierarchy available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'http://127.0.0.1:4321',
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto(contestPath);

  await expect(page.getByRole('heading', { name: 'Conhecimentos gerais', level: 2 })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Língua Portuguesa', level: 3 })).toBeVisible();
  await expect(page.getByRole('link', { name: readingTitle })).toHaveAttribute('href', readingPath);
  await expect(page.getByRole('link', { name: typesTitle })).toHaveAttribute('href', typesPath);
  await context.close();
});

test('does not expose editorial groups through sync or offline contracts', async ({ request }) => {
  const syncResponse = await request.get('/sync-catalog.json');
  expect(syncResponse.status()).toBe(200);
  const syncCatalog = await syncResponse.json() as {
    schemaVersion: number;
    subjects: Array<Record<string, unknown> & {
      contestStorageId: string;
      subjectStorageId: string;
      questionSet: { questionSetRevision: number };
    }>;
  };
  const readingSubject = syncCatalog.subjects.find(
    (entry) =>
      entry.contestStorageId === 'tcema-2026-adm' &&
      entry.subjectStorageId === 'leitura-tipos-generos',
  );
  const typesSubject = syncCatalog.subjects.find(
    (entry) =>
      entry.contestStorageId === 'tcema-2026-adm' &&
      entry.subjectStorageId === 'tipos-generos-textuais',
  );
  expect(syncCatalog.schemaVersion).toBe(1);
  expect(readingSubject).toMatchObject({
    contestStorageId: 'tcema-2026-adm',
    subjectStorageId: 'leitura-tipos-generos',
    questionSet: { questionSetRevision: 2 },
  });
  expect(typesSubject).toMatchObject({
    contestStorageId: 'tcema-2026-adm',
    subjectStorageId: 'tipos-generos-textuais',
    questionSet: { questionSetRevision: 1 },
  });
  expect(Object.keys(readingSubject ?? {}).sort()).toEqual([
    'contestStorageId',
    'questionSet',
    'subjectStorageId',
  ]);
  expect(Object.keys(typesSubject ?? {}).sort()).toEqual([
    'contestStorageId',
    'questionSet',
    'subjectStorageId',
  ]);

  const inventoryResponse = await request.get('/offline-inventories/tcema-2026-adm.json');
  expect(inventoryResponse.status()).toBe(200);
  const inventory = await inventoryResponse.json() as { routes: string[] };
  expect(inventory.routes).toEqual(expect.arrayContaining([
    readingPath,
    `${readingPath}cheat-sheet/`,
    `${readingPath}questoes/`,
    typesPath,
    `${typesPath}cheat-sheet/`,
    `${typesPath}questoes/`,
  ]));
  expect(inventory.routes.join('\n')).not.toMatch(/conhecimentos-gerais|lingua-portuguesa/);
});
