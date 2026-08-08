import type { Page } from '@playwright/test';
import { expect, test } from './fixtures';

const contest = 'tce-ma-2026-analista-administracao';
const subject = 'leitura-interpretacao-tipos-generos';
const subjectTitle = 'Leitura, compreensão e interpretação de textos';
const contestUrl = `/concursos/${contest}/`;
const base = `${contestUrl}${subject}`;
const secondSubject = 'tipos-generos-textuais';
const lastSubjectInCategory = 'reescrita-generos-formalidade';
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

const tabs = (page: Page) => page.getByRole('navigation', { name: 'Navegação do assunto' });
const actions = (page: Page) => page.getByRole('group', { name: 'Ações do assunto' });

test('keeps the three study modes centered between category navigation controls', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route.path);
    const navigation = tabs(page);
    await expect(page.locator('.subject-heading .subject-title')).toHaveText(subjectTitle);
    await expect(page.locator('.subject-heading > p:last-child')).not.toBeEmpty();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

    await expect(navigation.locator('.subject-tab-link')).toHaveCount(3);
    for (const link of tabLinks) {
      await expect(navigation.getByRole('link', { name: link.name })).toHaveAttribute('href', link.href);
    }

    await expect(navigation.getByRole('button', { name: 'Não há assunto anterior nesta categoria' })).toBeDisabled();
    await expect(navigation.getByRole('link', { name: /^Próximo assunto na categoria:/ })).toHaveAttribute(
      'href',
      `${contestUrl}${secondSubject}/`,
    );
    await expect(navigation.locator('.subject-tabs-adjacent svg')).toHaveCount(2);
    for (const icon of await navigation.locator('.subject-tabs-adjacent svg').all()) {
      await expect(icon).toHaveAttribute('aria-hidden', 'true');
    }

    const current = navigation.locator('[aria-current="page"]');
    await expect(current).toHaveCount(1);
    await expect(current).toHaveText(route.active);

    const routeGeometry = await page.evaluate(() => {
      const shellRect = document.querySelector<HTMLElement>('.study-shell')!.getBoundingClientRect();
      const surfaceRect = document.querySelector<HTMLElement>('.reading-surface')!.getBoundingClientRect();
      return {
        leftDelta: Math.abs(surfaceRect.left - shellRect.left),
        rightDelta: Math.abs(surfaceRect.right - shellRect.right),
      };
    });
    expect(routeGeometry.leftDelta).toBeLessThan(1);
    expect(routeGeometry.rightDelta).toBeLessThan(1);

    const actionBar = actions(page);
    await expect(actionBar.getByRole('button')).toHaveCount(1);
    const actionLinkCount = route.active === 'Conteúdo' ? 3 : 2;
    await expect(actionBar.getByRole('link')).toHaveCount(actionLinkCount);
    await expect(actionBar.getByRole('link', { name: 'Voltar para o concurso' })).toHaveAttribute(
      'href',
      contestUrl,
    );
    await expect(actionBar.getByRole('link', { name: 'Voltar ao topo' })).toHaveAttribute(
      'href',
      '#study-top',
    );
    const focusAction = actionBar.getByRole('link', { name: 'Abrir modo de leitura' });
    if (route.active === 'Conteúdo') await expect(focusAction).toHaveAttribute('href', '#focus');
    else await expect(focusAction).toHaveCount(0);
    const visibleIcons = actionBar.locator('svg:visible');
    await expect(visibleIcons).toHaveCount(actionLinkCount + 1);
    for (const icon of await visibleIcons.all()) {
      await expect(icon).toHaveAttribute('aria-hidden', 'true');
    }
    await expect(page.getByRole('navigation', { name: 'Atalhos do assunto' })).toHaveCount(0);
  }
});

test('restricts previous and next controls to the immediate category', async ({ page }) => {
  await page.goto(`${contestUrl}${secondSubject}/`);
  let navigation = tabs(page);
  await expect(navigation.getByRole('link', { name: /^Assunto anterior na categoria:/ })).toHaveAttribute(
    'href',
    `${base}/`,
  );
  await expect(navigation.getByRole('link', { name: /^Próximo assunto na categoria:/ })).toBeVisible();

  await page.goto(`${contestUrl}${lastSubjectInCategory}/`);
  navigation = tabs(page);
  await expect(navigation.getByRole('link', { name: /^Assunto anterior na categoria:/ })).toBeVisible();
  await expect(navigation.getByRole('link', { name: /^Próximo assunto na categoria:/ })).toHaveCount(0);
  await expect(navigation.getByRole('button', { name: 'Não há próximo assunto nesta categoria' })).toBeDisabled();
});

test('keeps the tabs sticky and the action bar clear of content on desktop and mobile', async ({ page }) => {
  for (const viewport of [
    { width: 1280, height: 900 },
    { width: 844, height: 600 },
    { width: 390, height: 720 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(`${base}/`);
    if (viewport.width === 844) {
      await page.locator('[data-reading-focus]').evaluate((element: HTMLElement) => {
        element.style.setProperty('--reading', '92ch');
      });
    }

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
    await expect(actions(page)).toBeVisible();
    await expect(actions(page)).toHaveAttribute('data-subject-action-visibility', 'visible');
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
    await expect(actions(page)).toHaveAttribute('data-subject-action-visibility', 'hidden');
    await actions(page).getByRole('link', { name: 'Voltar para o concurso' }).focus();
    await expect(actions(page)).toHaveAttribute('data-subject-action-visibility', 'visible');
    await expect(actions(page)).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');

    const geometry = await page.evaluate(() => {
      const actionBar = document.querySelector<HTMLElement>('[data-subject-action-bar]')!;
      const heading = document.querySelector<HTMLElement>('.subject-heading')!;
      const tabs = document.querySelector<HTMLElement>('.subject-tabs')!;
      const tabLinks = tabs.querySelector<HTMLElement>('.subject-tabs-links')!;
      const surface = document.querySelector<HTMLElement>('.reading-surface')!;
      const article = surface.querySelector<HTMLElement>('article')!;
      const shell = document.querySelector<HTMLElement>('.study-shell')!;
      const actionRect = actionBar.getBoundingClientRect();
      const headingRect = heading.getBoundingClientRect();
      const tabsRect = tabs.getBoundingClientRect();
      const tabLinksRect = tabLinks.getBoundingClientRect();
      const surfaceRect = surface.getBoundingClientRect();
      const articleRect = article.getBoundingClientRect();
      const shellRect = shell.getBoundingClientRect();
      const surfaceStyle = getComputedStyle(surface);
      const shellStyle = getComputedStyle(shell);
      const adjacentControls = Array.from(tabs.querySelectorAll<HTMLElement>('.subject-tabs-adjacent'))
        .map((control) => control.getBoundingClientRect());
      const controls = Array.from(actionBar.querySelectorAll<HTMLElement>('button, a'))
        .filter((control) => control.getClientRects().length > 0)
        .map((control) => control.getBoundingClientRect());
      return {
        actionBottom: actionRect.bottom,
        actionRight: actionRect.right,
        actionTop: actionRect.top,
        inlinePaddingDelta: Math.abs(
          Number.parseFloat(surfaceStyle.paddingInlineStart) -
            Number.parseFloat(surfaceStyle.paddingInlineEnd),
        ),
        controlsAreVertical: controls.every(
          (control, index) => index === 0 || control.top >= controls[index - 1].bottom,
        ),
        controlsHaveTouchSize: controls.every(
          (control) => control.width >= 44 && control.height >= 44,
        ),
        adjacentControlsAreSquare: adjacentControls.every(
          (control) => Math.abs(control.width - control.height) < 1,
        ),
        adjacentControlsTouchEdges:
          Math.abs(adjacentControls[0].left - tabsRect.left) < 1 &&
          Math.abs(adjacentControls[1].right - tabsRect.right) < 1,
        tabsAreCentered:
          Math.abs(
            (tabLinksRect.left + tabLinksRect.right) / 2 -
              (tabsRect.left + tabsRect.right) / 2,
          ) < 1,
        headingMatchesShell:
          Math.abs(headingRect.left - shellRect.left) < 1 &&
          Math.abs(headingRect.right - shellRect.right) < 1,
        tabsMatchShell:
          Math.abs(tabsRect.left - shellRect.left) < 1 &&
          Math.abs(tabsRect.right - shellRect.right) < 1,
        surfaceMatchesShell:
          Math.abs(surfaceRect.left - shellRect.left) < 1 &&
          Math.abs(surfaceRect.right - shellRect.right) < 1,
        articleUsesSurfaceWidth:
          Math.abs(
            articleRect.width -
              (surface.clientWidth -
                Number.parseFloat(surfaceStyle.paddingInlineStart) -
                Number.parseFloat(surfaceStyle.paddingInlineEnd)),
          ) < 1,
        studyBottomPadding: Number.parseFloat(shellStyle.paddingBottom),
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });

    expect(geometry.actionBottom).toBeLessThanOrEqual(geometry.viewportHeight);
    expect(geometry.actionRight).toBeLessThanOrEqual(geometry.viewportWidth);
    expect(geometry.inlinePaddingDelta).toBeLessThan(1);
    expect(geometry.studyBottomPadding).toBeLessThan(64);
    expect(geometry.controlsAreVertical).toBe(true);
    expect(geometry.controlsHaveTouchSize).toBe(true);
    expect(geometry.adjacentControlsAreSquare).toBe(true);
    expect(geometry.adjacentControlsTouchEdges).toBe(true);
    expect(geometry.tabsAreCentered).toBe(true);
    expect(geometry.headingMatchesShell).toBe(true);
    expect(geometry.tabsMatchShell).toBe(true);
    expect(geometry.surfaceMatchesShell).toBe(true);
    expect(geometry.articleUsesSurfaceWidth).toBe(true);
    expect(geometry.hasHorizontalOverflow).toBe(false);
  }
});

test('hides on stable descent, ignores jitter and returns on ascent or focus', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });
  const actionBar = actions(page);
  const setScroll = (top: number) => page.evaluate((value) => new Promise<void>((resolve) => {
    window.scrollTo(0, value);
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  }), top);

  await expect(actionBar).toHaveAttribute('data-subject-action-visibility', 'visible');
  await setScroll(160);
  await expect(actionBar).toHaveAttribute('data-subject-action-visibility', 'hidden');

  for (const position of [152, 160, 153, 161]) await setScroll(position);
  await expect(actionBar).toHaveAttribute('data-subject-action-visibility', 'hidden');
  await setScroll(140);
  await expect(actionBar).toHaveAttribute('data-subject-action-visibility', 'visible');

  await setScroll(200);
  await expect(actionBar).toHaveAttribute('data-subject-action-visibility', 'hidden');
  await actionBar.getByRole('link', { name: 'Voltar ao topo' }).focus();
  await expect(actionBar).toHaveAttribute('data-subject-action-visibility', 'visible');
  await setScroll(260);
  await expect(actionBar).toHaveAttribute('data-subject-action-visibility', 'visible');

  await tabs(page).getByRole('link', { name: 'Conteúdo' }).focus();
  await setScroll(300);
  await expect(actionBar).toHaveAttribute('data-subject-action-visibility', 'hidden');
  await setScroll(0);
  await expect(actionBar).toHaveAttribute('data-subject-action-visibility', 'visible');
});

test('uses the same direction behavior on a touch viewport', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'http://127.0.0.1:4321',
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 720 },
  });
  const page = await context.newPage();
  await page.goto(`${base}/`);
  const actionBar = actions(page);

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 160);
  });
  await expect(actionBar).toHaveAttribute('data-subject-action-visibility', 'hidden');
  await page.evaluate(() => window.scrollTo(0, 130));
  await expect(actionBar).toHaveAttribute('data-subject-action-visibility', 'visible');
  await context.close();
});

test('removes action-bar transitions when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`${base}/`);
  await expect(actions(page)).toHaveCSS('transition-duration', '0s');
});

test('supports keyboard tooltips and native return links', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('concursos:active-alias', 'acoes-assunto-teste'));
  await page.goto(`${base}/questoes/`);

  const actionBar = actions(page);
  const toggle = actionBar.getByRole('button', { name: 'Marcar como concluído' });
  const back = actionBar.getByRole('link', { name: 'Voltar para o concurso' });
  const top = actionBar.getByRole('link', { name: 'Voltar ao topo' });
  await expect(toggle).toBeEnabled();
  await toggle.focus();
  await expect(toggle).toBeFocused();
  await expect(toggle.locator('.studied-toggle-label')).toHaveCSS('opacity', '1');
  await page.keyboard.press('Tab');
  await expect(back).toBeFocused();
  await expect(back.locator('.subject-action-label')).toHaveCSS('opacity', '1');
  await top.hover();
  await expect(top.locator('.subject-action-label')).toHaveCSS('opacity', '1');
  await top.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#study-top$/);
  await expect(page.locator('#study-top')).toBeFocused();
  await back.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(new RegExp(`${contestUrl}$`));
});

test('opens focus from the icon stack and restores focus to that opener', async ({ page }) => {
  await page.goto(`${base}/`);
  const focusAction = actions(page).getByRole('link', { name: 'Abrir modo de leitura' });

  await focusAction.click();
  await expect(page).toHaveURL(new RegExp(`${subject}/#focus$`));
  await expect(page.getByRole('dialog', { name: 'Modo de leitura sem distrações' })).toBeVisible();
  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await expect(page).toHaveURL(new RegExp(`${subject}/$`));
  await expect(focusAction).toBeFocused();

  await focusAction.click();
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${subject}/$`));
  await expect(focusAction).toBeFocused();
  await page.goForward();
  await expect(page).toHaveURL(new RegExp(`${subject}/#focus$`));
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${subject}/$`));
  await expect(focusAction).toBeFocused();
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
  await expect(actionBar).toBeVisible();
  await expect(actionBar).not.toHaveAttribute('data-subject-action-visibility');
  await expect(actionBar.getByRole('button', { name: 'Marcar como concluído' })).toBeDisabled();
  const back = actionBar.getByRole('link', { name: 'Voltar para o concurso' });
  await expect(actionBar.getByRole('link')).toHaveCount(2);
  await expect(actionBar.getByRole('link', { name: 'Voltar ao topo' })).toHaveAttribute(
    'href',
    '#study-top',
  );
  await page.mouse.wheel(0, 2_000);
  await expect(actionBar).toBeVisible();
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
