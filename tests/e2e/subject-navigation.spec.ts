import type { Page } from '@playwright/test';
import { expect, test } from './fixtures';

const contest = 'tce-ma-2026-analista-administracao';
const subject = 'leitura-interpretacao-tipos-generos';
const subjectTitle = 'Leitura, compreensão e interpretação de textos';
const contestUrl = `/concursos/${contest}/`;
const base = `${contestUrl}${subject}`;
const routes = [
  { path: `${base}/`, active: 'Conteúdo' },
  { path: `${base}/cheat-sheet/`, active: 'Cheat sheet' },
  { path: `${base}/questoes/`, active: 'Questões' },
] as const;
const tabLinks = [
  { name: 'Conteúdo', href: `${base}/` },
  { name: 'Cheat sheet', href: `${base}/cheat-sheet/` },
  { name: 'Questões', href: `${base}/questoes/` },
] as const;

const tabs = (page: Page) => page.getByRole('navigation', { name: 'Modos de estudo do assunto' });
const actions = (page: Page) => page.getByRole('group', { name: 'Ações do assunto' });

test('keeps the three content destinations exclusively in the horizontal tabs', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route.path);
    const navigation = tabs(page);
    await expect(page.locator('.subject-heading .subject-title')).toHaveText(subjectTitle);
    await expect(page.locator('.subject-heading > p:last-child')).not.toBeEmpty();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

    await expect(navigation.getByRole('link')).toHaveCount(3);
    for (const link of tabLinks) {
      await expect(navigation.getByRole('link', { name: link.name })).toHaveAttribute('href', link.href);
    }

    const current = navigation.locator('[aria-current="page"]');
    await expect(current).toHaveCount(1);
    await expect(current).toHaveText(route.active);

    const actionBar = actions(page);
    await expect(actionBar.getByRole('button')).toHaveCount(1);
    await expect(actionBar.getByRole('link')).toHaveCount(1);
    await expect(actionBar.getByRole('link', { name: 'Voltar para o concurso' })).toHaveAttribute(
      'href',
      contestUrl,
    );
    await expect(page.getByRole('navigation', { name: 'Atalhos do assunto' })).toHaveCount(0);
  }
});

test('keeps the tabs sticky and the action bar clear of content on desktop and mobile', async ({ page }) => {
  for (const viewport of [
    { width: 1280, height: 900 },
    { width: 390, height: 720 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(`${base}/`);

    const breadcrumbGeometry = await page.locator('.breadcrumbs').evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        flexWrap: style.flexWrap,
        hasHorizontalOverflow: element.scrollWidth > element.clientWidth,
      };
    });
    expect(breadcrumbGeometry).toEqual({ flexWrap: 'nowrap', hasHorizontalOverflow: false });

    await expect(tabs(page)).toHaveCSS('position', 'sticky');
    await expect(actions(page)).toHaveCSS('position', 'fixed');
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await expect
      .poll(() =>
        page.evaluate(
          () => Math.abs(window.scrollY - (document.documentElement.scrollHeight - window.innerHeight)) < 2,
        ),
      )
      .toBe(true);
    await expect.poll(() => tabs(page).evaluate((element) => Math.round(element.getBoundingClientRect().top))).toBe(0);

    const geometry = await page.evaluate(() => {
      const actionBar = document.querySelector<HTMLElement>('[data-subject-action-bar]')!;
      const pagination = document.querySelector<HTMLElement>('.subject-pagination')!;
      const actionRect = actionBar.getBoundingClientRect();
      const paginationRect = pagination.getBoundingClientRect();
      return {
        actionBottom: actionRect.bottom,
        actionTop: actionRect.top,
        paginationBottom: paginationRect.bottom,
        viewportHeight: window.innerHeight,
        hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });

    expect(geometry.actionBottom).toBeLessThanOrEqual(geometry.viewportHeight);
    expect(geometry.paginationBottom).toBeLessThanOrEqual(geometry.actionTop);
    expect(geometry.hasHorizontalOverflow).toBe(false);
  }
});

test('supports keyboard focus and native return to the current contest', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('concursos:active-alias', 'acoes-assunto-teste'));
  await page.goto(`${base}/questoes/`);

  const actionBar = actions(page);
  const toggle = actionBar.getByRole('button', { name: 'Marcar como concluído' });
  const back = actionBar.getByRole('link', { name: 'Voltar para o concurso' });
  await expect(toggle).toBeEnabled();
  await toggle.focus();
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(back).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(new RegExp(`${contestUrl}$`));
});

test('keeps tabs and return navigation usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'http://127.0.0.1:4321',
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto(`${base}/cheat-sheet/`);

  await expect(tabs(page).getByRole('link', { name: 'Cheat sheet' })).toHaveAttribute('aria-current', 'page');
  const actionBar = actions(page);
  await expect(actionBar.getByRole('button', { name: 'Marcar como concluído' })).toBeDisabled();
  const back = actionBar.getByRole('link', { name: 'Voltar para o concurso' });
  await expect(back).toHaveAttribute('href', contestUrl);
  await back.click();
  await expect(page).toHaveURL(new RegExp(`${contestUrl}$`));
  await context.close();
});

test('hides the tabs and subject action bar when printing', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.emulateMedia({ media: 'print' });
  await expect(tabs(page)).toBeHidden();
  await expect(actions(page)).toBeHidden();
  await expect(page.locator('.breadcrumbs')).toBeHidden();
  await expect(page.locator('.subject-heading')).toBeHidden();
});
