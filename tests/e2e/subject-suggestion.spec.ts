import { expect, test } from './fixtures';

const alias = 'sugestao-assunto-2026';
const contest = 'tce-ma-2026-analista-administracao';
const subject = 'leitura-interpretacao-tipos-generos';
const base = `/concursos/${contest}/${subject}`;
const studiedDocumentId = `concursos--${alias}--estudados`;
const routes = [`${base}/`, `${base}/cheat-sheet/`, `${base}/questoes/`];

const suggestions = (page: import('@playwright/test').Page) =>
  page.locator('[data-subject-suggestion]');
const suggestionLinks = (page: import('@playwright/test').Page) =>
  suggestions(page).getByRole('link', { name: 'Próximo assunto sugerido' });

test('shows synchronized top and bottom suggestions with unique ARIA ids on every subject route', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const roots = suggestions(page);
    const links = suggestionLinks(page);
    await expect(roots).toHaveCount(2);
    await expect(links).toHaveCount(2);
    const hrefs = await links.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute('href')),
    );
    expect(new Set(hrefs).size).toBe(1);
    expect(hrefs[0]).toMatch(new RegExp(`^/concursos/${contest}/[^/]+/$`));
    expect(hrefs[0]).not.toBe(`${base}/`);

    const ids = await roots.evaluateAll((elements) => elements.map((element) => element.id));
    expect(new Set(ids).size).toBe(2);
    const describedBy = await links.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute('aria-describedby')),
    );
    expect(new Set(describedBy).size).toBe(2);
    expect(
      await page.evaluate(() => {
        const top = document.querySelector('[data-subject-suggestion-instance="study-top"]');
        const tabs = document.querySelector('.subject-tabs');
        const content = document.querySelector('[data-navigation-content]');
        const bottom = document.querySelector('[data-subject-suggestion-instance="study-bottom"]');
        return top !== null &&
          tabs !== null &&
          content !== null &&
          bottom !== null &&
          Boolean(top.compareDocumentPosition(tabs) & Node.DOCUMENT_POSITION_FOLLOWING) &&
          Boolean(content.compareDocumentPosition(bottom) & Node.DOCUMENT_POSITION_FOLLOWING);
      }),
    ).toBe(true);
  }
});

test('updates both suggestions after marking and unmarking the current subject', async ({ page }) => {
  await page.addInitScript((value) => localStorage.setItem('concursos:active-alias', value), alias);
  await page.goto(`${base}/`);
  const links = suggestionLinks(page);
  const initialHref = await links.first().getAttribute('href');
  expect(initialHref).toBeTruthy();

  await page.getByRole('button', { name: 'Marcar como concluído' }).click();
  await expect(links.first()).not.toHaveAttribute('href', initialHref!);
  const updatedHrefs = await links.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute('href')),
  );
  expect(new Set(updatedHrefs).size).toBe(1);

  await page.getByRole('button', { name: 'Desfazer conclusão' }).click();
  await expect(links.first()).toHaveAttribute('href', initialHref!);
  expect(await links.evaluateAll((elements) => elements.map((element) => element.getAttribute('href'))))
    .toEqual([initialHref, initialHref]);
});

test('adopts remote studied state and announces a fully completed contest', async ({ page, kvStore }) => {
  await page.goto(`${base}/`);
  const serialized = await page.locator('[data-subject-suggestion-config]').first().textContent();
  expect(serialized).toBeTruthy();
  const config = JSON.parse(serialized!) as {
    model: { groups: { subjects: { studiedSubjectId: string }[] }[] };
  };
  const studiedSubjectIds = config.model.groups.flatMap(({ subjects }) =>
    subjects.map(({ studiedSubjectId }) => studiedSubjectId),
  );

  kvStore.set(studiedDocumentId, {
    version: 10,
    createdAt: '2026-07-30T12:00:00.000Z',
    json: {
      schemaVersion: 1,
      studiedSubjectIds,
      updatedAt: '2026-07-30T12:00:00.000Z',
    },
  });
  await page.evaluate((value) => localStorage.setItem('concursos:active-alias', value), alias);
  await page.reload();

  const roots = suggestions(page);
  await expect(roots.locator('[data-subject-suggestion-status]')).toHaveText([
    'Todos os assuntos deste concurso foram concluídos.',
    'Todos os assuntos deste concurso foram concluídos.',
  ]);
  await expect(suggestionLinks(page)).toBeHidden();
});

test('shows one suggestion before the contest tree without contextual exclusion', async ({ page }) => {
  await page.goto(`/concursos/${contest}/`);
  const root = suggestions(page);
  await expect(root).toHaveCount(1);
  await expect(root).toHaveAttribute('data-subject-suggestion-instance', 'contest-top');
  await expect(suggestionLinks(page)).toHaveAttribute(
    'href',
    new RegExp(`^/concursos/${contest}/[^/]+/$`),
  );
  expect(
    await root.evaluate((element) => {
      const tree = document.querySelector('.subject-tree');
      return tree !== null &&
        Boolean(element.compareDocumentPosition(tree) & Node.DOCUMENT_POSITION_FOLLOWING);
    }),
  ).toBe(true);
});

test('keeps a deterministic static link without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'http://127.0.0.1:4321',
    javaScriptEnabled: false,
  });
  const page = await context.newPage();

  for (const route of [`${base}/`, `${base}/cheat-sheet/`]) {
    await page.goto(route);
    await expect(suggestions(page)).toHaveCount(2);
    const hrefs = await suggestionLinks(page).evaluateAll((elements) =>
      elements.map((element) => element.getAttribute('href')),
    );
    expect(new Set(hrefs).size).toBe(1);
    expect(hrefs[0]).toMatch(new RegExp(`^/concursos/${contest}/[^/]+/$`));
    expect(hrefs[0]).not.toBe(`${base}/`);
  }

  await context.close();
});
