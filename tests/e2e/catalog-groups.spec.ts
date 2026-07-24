import { expect, test } from './fixtures';

const contestPath = '/concursos/tce-ma-2026-analista-administracao/';
const readingPath = `${contestPath}leitura-interpretacao-tipos-generos/`;
const readingTitle = 'Leitura, compreensão e interpretação de textos';
const typesPath = `${contestPath}tipos-generos-textuais/`;
const typesTitle = 'Tipos e gêneros textuais';

const CATALOG_GROUPS_STORAGE_KEY = 'concursos:catalog-groups';
const examplePath = '/concursos/concurso-exemplo/';
const exampleGroupHeading = 'Administração pública';
const exampleSubject = 'Fundamentos de administração pública';

const groupByHeading = (page: import('@playwright/test').Page, name: string, level: number) =>
  page.locator('details.subject-group-section', {
    has: page.getByRole('heading', { name, level }),
  });

test('renders grouped catalogs while preserving short public routes', async ({ page, request }) => {
  const response = await page.goto(contestPath);
  expect(response?.status()).toBe(200);

  const generalSection = groupByHeading(page, 'Conhecimentos gerais', 2);
  const portugueseSection = generalSection.locator('details.subject-group-section', {
    has: page.getByRole('heading', { name: 'Língua Portuguesa', level: 3 }),
  });
  await expect(portugueseSection.getByRole('link', { name: readingTitle, exact: true })).toHaveAttribute(
    'href',
    readingPath,
  );
  await expect(portugueseSection.getByRole('link', { name: typesTitle, exact: true })).toHaveAttribute(
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

  await page.goto(examplePath);
  const exampleSection = groupByHeading(page, exampleGroupHeading, 2);
  await expect(exampleSection.getByRole('link', { name: exampleSubject, exact: true })).toHaveAttribute(
    'href',
    '/concursos/concurso-exemplo/assunto-exemplo/',
  );
  expect((await request.get('/concursos/concurso-exemplo/assunto-exemplo/')).status()).toBe(200);
});

test('renders each subject as a compact item with only the title (issue #99)', async ({ page }) => {
  await page.goto(examplePath);
  const card = page.locator('.subject-card').first();
  await expect(card).toBeVisible();

  // O título é um link real para o assunto.
  await expect(card.getByRole('link', { name: exampleSubject, exact: true })).toHaveAttribute(
    'href',
    '/concursos/concurso-exemplo/assunto-exemplo/',
  );

  // Sem alias/progresso, o item exibe exclusivamente o título (badge oculto, sem descrição).
  await expect(card).toHaveText(exampleSubject);

  // Nenhuma descrição de assunto é renderizada em qualquer item da listagem...
  await expect(page.locator('.subject-card p')).toHaveCount(0);
  // ...nem existe controle para expandir/revelar descrição dentro do item.
  await expect(card.locator('details, summary')).toHaveCount(0);
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
  // Sem JavaScript os grupos permanecem abertos (atributo estático `open`) e navegáveis.
  await expect(groupByHeading(page, 'Conhecimentos gerais', 2)).toHaveJSProperty('open', true);
  await expect(page.getByRole('link', { name: readingTitle, exact: true })).toHaveAttribute('href', readingPath);
  await expect(page.getByRole('link', { name: typesTitle, exact: true })).toHaveAttribute('href', typesPath);
  await context.close();
});

test('collapses a group and persists the choice across reloads', async ({ page }) => {
  await page.goto(examplePath);
  const group = groupByHeading(page, exampleGroupHeading, 2);
  const subjectLink = group.getByRole('link', { name: exampleSubject, exact: true });

  await expect(group).toHaveJSProperty('open', true);
  await expect(subjectLink).toBeVisible();

  const groupId = await group.getAttribute('data-group-id');
  expect(groupId).toBeTruthy();

  await group.locator('> summary').click();
  await expect(group).toHaveJSProperty('open', false);
  await expect(subjectLink).toBeHidden();

  const stored = await page.evaluate((key) => localStorage.getItem(key), CATALOG_GROUPS_STORAGE_KEY);
  expect(stored).toContain(groupId!);

  await page.reload();
  const groupAfterReload = groupByHeading(page, exampleGroupHeading, 2);
  await expect(groupAfterReload).toHaveJSProperty('open', false);
  await expect(groupAfterReload.getByRole('link', { name: exampleSubject, exact: true })).toBeHidden();
});

test('recovers from invalid localStorage and rewrites a valid document', async ({ page }) => {
  await page.addInitScript((key) => {
    try {
      localStorage.setItem(key, '{ not valid json');
    } catch {
      // Ignora ambientes sem localStorage gravável.
    }
  }, CATALOG_GROUPS_STORAGE_KEY);

  await page.goto(examplePath);
  const group = groupByHeading(page, exampleGroupHeading, 2);

  // Não quebrou: default expandido apesar do payload corrompido.
  await expect(group).toHaveJSProperty('open', true);
  await expect(group.getByRole('link', { name: exampleSubject, exact: true })).toBeVisible();

  // Prova de recuperação: o script rodou e ligou os ouvintes; recolher funciona e
  // sobrescreve o valor corrompido por um documento JSON válido (não apenas o
  // `open` estático do <details>, que passaria mesmo se o script tivesse abortado).
  const groupId = await group.getAttribute('data-group-id');
  expect(groupId).toBeTruthy();
  await group.locator('> summary').click();
  await expect(group).toHaveJSProperty('open', false);

  const stored = await page.evaluate((key) => localStorage.getItem(key), CATALOG_GROUPS_STORAGE_KEY);
  expect(stored).not.toBe('{ not valid json');
  const parsed = JSON.parse(stored!) as { version: number; collapsed: string[] };
  expect(parsed.version).toBe(1);
  expect(parsed.collapsed).toContain(groupId!);
});

test('collapses one nested group without affecting its ancestor group', async ({ page }) => {
  await page.goto(contestPath);
  const general = groupByHeading(page, 'Conhecimentos gerais', 2);
  const portuguese = general.locator('details.subject-group-section', {
    has: page.getByRole('heading', { name: 'Língua Portuguesa', level: 3 }),
  });
  const portugueseLink = portuguese.getByRole('link', { name: readingTitle, exact: true });

  await expect(general).toHaveJSProperty('open', true);
  await expect(portuguese).toHaveJSProperty('open', true);
  await expect(portugueseLink).toBeVisible();

  const generalId = await general.getAttribute('data-group-id');
  const portugueseId = await portuguese.getAttribute('data-group-id');
  expect(portugueseId).toBeTruthy();
  expect(portugueseId).not.toBe(generalId);

  // Recolhe somente o grupo interno.
  await portuguese.locator('> summary').click();
  await expect(portuguese).toHaveJSProperty('open', false);
  await expect(portugueseLink).toBeHidden();
  // O grupo ancestral permanece aberto (sem cascata).
  await expect(general).toHaveJSProperty('open', true);

  // Apenas o id do grupo interno é persistido, por id estável e não por posição.
  const stored = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key) ?? '{}') as { collapsed?: string[] },
    CATALOG_GROUPS_STORAGE_KEY,
  );
  expect(stored.collapsed).toContain(portugueseId!);
  expect(stored.collapsed).not.toContain(generalId!);

  // Após reload, o interno segue recolhido e o ancestral aberto.
  await page.reload();
  const generalAfter = groupByHeading(page, 'Conhecimentos gerais', 2);
  const portugueseAfter = generalAfter.locator('details.subject-group-section', {
    has: page.getByRole('heading', { name: 'Língua Portuguesa', level: 3 }),
  });
  await expect(generalAfter).toHaveJSProperty('open', true);
  await expect(portugueseAfter).toHaveJSProperty('open', false);
});

test('toggles a group with the keyboard', async ({ page }) => {
  await page.goto(examplePath);
  const group = groupByHeading(page, exampleGroupHeading, 2);
  const summary = group.locator('> summary');

  await summary.focus();
  await expect(group).toHaveJSProperty('open', true);
  await page.keyboard.press('Enter');
  await expect(group).toHaveJSProperty('open', false);
  await page.keyboard.press('Enter');
  await expect(group).toHaveJSProperty('open', true);
});

test('does not expose editorial groups through sync or offline contracts', async ({ request }) => {
  const syncResponse = await request.get('/sync-catalog.json');
  expect(syncResponse.status()).toBe(200);
  const syncCatalog = await syncResponse.json() as {
    schemaVersion: number;
    subjects: Array<Record<string, unknown> & {
      contestStorageId: string;
      subjectStorageId: string;
      questionSet: { questionSetRevision: number; questions: Array<Record<string, unknown>> };
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
    questionSet: { questionSetRevision: 3 },
  });
  expect(typesSubject).toMatchObject({
    contestStorageId: 'tcema-2026-adm',
    subjectStorageId: 'tipos-generos-textuais',
    questionSet: { questionSetRevision: 2 },
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
  if (!readingSubject || !typesSubject) throw new Error('Assuntos esperados ausentes do catálogo de sincronização.');
  expect(readingSubject.questionSet.questions[0]).not.toHaveProperty('origin');
  expect(typesSubject.questionSet.questions[0]).not.toHaveProperty('origin');

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
