import type { Page } from '@playwright/test';
import { expect, test } from './fixtures';

const contestPath = '/concursos/tce-ma-2026-analista-administracao/';
const subjectSlug = 'leitura-interpretacao-tipos-generos';
const base = `${contestPath}${subjectSlug}`;
const readingTitle = 'Leitura, compreensão e interpretação de textos';

type FullscreenBehavior = 'resolve' | 'reject' | 'pending' | 'absent' | 'exit-pending';

const installFullscreenMock = (page: Page, behavior: FullscreenBehavior = 'resolve') =>
  page.addInitScript((mode) => {
    interface FullscreenTestState {
      requests: number;
      exits: number;
      active: boolean;
      resolve?: () => void;
      resolveExit?: () => void;
      nativeExit?: () => void;
    }
    const testWindow = window as typeof window & { __fullscreenTest?: FullscreenTestState };
    const state: FullscreenTestState = { requests: 0, exits: 0, active: false };
    let fullscreenElement: Element | null = null;
    testWindow.__fullscreenTest = state;

    const leave = () => {
      fullscreenElement = null;
      state.active = false;
      document.dispatchEvent(new Event('fullscreenchange'));
    };
    state.nativeExit = leave;
    Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, value: true });
    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      get: () => fullscreenElement,
    });
    if (mode === 'absent') {
      Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, value: false });
      Object.defineProperty(Element.prototype, 'requestFullscreen', {
        configurable: true,
        value: undefined,
      });
      return;
    }
    Object.defineProperty(Element.prototype, 'requestFullscreen', {
      configurable: true,
      value(this: Element) {
        state.requests += 1;
        const enter = () => {
          fullscreenElement = this;
          state.active = true;
          document.dispatchEvent(new Event('fullscreenchange'));
        };
        if (mode === 'reject') return Promise.reject(new DOMException('Fullscreen denied'));
        if (mode === 'pending') {
          return new Promise<void>((resolve) => {
            state.resolve = () => {
              enter();
              state.resolve = undefined;
              resolve();
            };
          });
        }
        enter();
        return Promise.resolve();
      },
    });
    Object.defineProperty(document, 'exitFullscreen', {
      configurable: true,
      value: () => {
        state.exits += 1;
        if (mode === 'exit-pending') {
          return new Promise<void>((resolve) => {
            state.resolveExit = () => {
              leave();
              state.resolveExit = undefined;
              resolve();
            };
          });
        }
        leave();
        return Promise.resolve();
      },
    });
  }, behavior);

const fullscreenState = (page: Page) => page.evaluate(() => {
  const state = (window as typeof window & {
    __fullscreenTest?: { requests: number; exits: number; active: boolean };
  }).__fullscreenTest;
  return state
    ? { requests: state.requests, exits: state.exits, active: state.active }
    : { requests: 0, exits: 0, active: false };
});

test('opens reading mode from the catalog listing', async ({ page }) => {
  await page.goto(contestPath);
  await page.getByRole('button', { name: 'Expandir tudo' }).click();
  await page.getByRole('link', { name: `Ler ${readingTitle} sem distrações` }).click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/#focus$`));
  await expect(page.getByRole('heading', { level: 1, name: readingTitle })).toBeVisible();
});

test('uses fullscreen only for explicit entry and exits with close or Escape', async ({ page }) => {
  await installFullscreenMock(page);
  await page.goto(`${base}/#focus`);
  expect(await fullscreenState(page)).toEqual({ requests: 0, exits: 0, active: false });

  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await page.getByRole('link', { name: 'Ler sem distrações' }).click();
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 1, exits: 0, active: true });
  await expect.poll(() => page.evaluate(() => document.fullscreenElement?.tagName ?? null)).toBe('HTML');
  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 1, exits: 1, active: false });
  await expect.poll(() => page.evaluate(() => document.fullscreenElement)).toBeNull();

  await page.goForward();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/#focus$`));
  expect(await fullscreenState(page)).toEqual({ requests: 1, exits: 1, active: false });
  await page.keyboard.press('Escape');
  await page.getByRole('link', { name: 'Ler sem distrações' }).click();
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 2, exits: 1, active: true });
  await page.keyboard.press('Escape');
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 2, exits: 2, active: false });
});

test('keeps focus mode usable when fullscreen is denied', async ({ page }) => {
  await installFullscreenMock(page, 'reject');
  await page.goto(`${base}/`);
  await page.getByRole('link', { name: 'Ler sem distrações' }).click();
  await expect(page.getByRole('dialog', { name: 'Modo de leitura sem distrações' })).toBeVisible();
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 1, exits: 0, active: false });
  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
});

test('keeps focus mode usable when the Fullscreen API is absent', async ({ page }) => {
  await installFullscreenMock(page, 'absent');
  await page.goto(`${base}/`);
  await page.getByRole('link', { name: 'Ler sem distrações' }).click();
  await expect(page.getByRole('dialog', { name: 'Modo de leitura sem distrações' })).toBeVisible();
  expect(await fullscreenState(page)).toEqual({ requests: 0, exits: 0, active: false });
  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
});

test('exits after a pending fullscreen request resolves during close', async ({ page }) => {
  await installFullscreenMock(page, 'pending');
  await page.goto(`${base}/`);
  await page.getByRole('link', { name: 'Ler sem distrações' }).click();
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 1, exits: 0, active: false });
  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await page.evaluate(() => {
    (window as typeof window & { __fullscreenTest?: { resolve?: () => void } })
      .__fullscreenTest?.resolve?.();
  });
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 1, exits: 1, active: false });
});

test('blocks re-entry until a pending fullscreen exit completes', async ({ page }) => {
  await installFullscreenMock(page, 'exit-pending');
  await page.goto(`${base}/`);
  const open = page.getByRole('link', { name: 'Ler sem distrações' });
  await open.click();
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 1, exits: 0, active: true });
  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 1, exits: 1, active: true });

  await open.click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
  expect(await fullscreenState(page)).toEqual({ requests: 1, exits: 1, active: true });
  await page.evaluate(() => {
    (window as typeof window & { __fullscreenTest?: { resolveExit?: () => void } })
      .__fullscreenTest?.resolveExit?.();
  });
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 1, exits: 1, active: false });

  await open.click();
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 2, exits: 1, active: true });
});

test('keeps focus mode active after a native fullscreen exit', async ({ page }) => {
  await installFullscreenMock(page);
  await page.goto(`${base}/`);
  await page.getByRole('link', { name: 'Ler sem distrações' }).click();
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 1, exits: 0, active: true });
  await page.evaluate(() => {
    (window as typeof window & { __fullscreenTest?: { nativeExit?: () => void } })
      .__fullscreenTest?.nativeExit?.();
  });
  await expect.poll(() => fullscreenState(page)).toEqual({ requests: 1, exits: 0, active: false });
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/#focus$`));
  await expect(page.getByRole('dialog', { name: 'Modo de leitura sem distrações' })).toBeVisible();
});

test('opens the integrated reading mode with one content tree and closes through history', async ({ page }) => {
  await page.goto(`${base}/`);
  const open = page.getByRole('link', { name: 'Ler sem distrações' });
  await expect(page.locator('[data-subject-action-reading]')).toBeHidden();
  await open.click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/#focus$`));

  const focus = page.getByRole('dialog', { name: 'Modo de leitura sem distrações' });
  await expect(focus).toHaveAttribute('aria-modal', 'true');
  await expect(page.locator('.reading-surface article')).toHaveCount(1);
  await expect(page.locator('[data-navigation-content]')).toHaveCount(1);
  await expect(page.locator('[data-studied-toggle]')).toHaveCount(1);
  await expect(page.locator('.site-header')).toBeHidden();
  await expect(page.locator('.breadcrumbs')).toBeHidden();
  await expect(page.getByRole('navigation', { name: 'Navegação do assunto' })).toBeHidden();
  const suggestions = page.locator('.subject-suggestion');
  await expect(suggestions).toHaveCount(2);
  await expect(suggestions.nth(0)).toBeHidden();
  await expect(suggestions.nth(1)).toBeHidden();
  await expect(page.locator('.subject-pagination')).toBeHidden();
  await expect(page.locator('[data-subject-action-normal]')).toBeHidden();
  await expect(page.getByRole('link', { name: 'Voltar para o concurso' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Voltar ao topo' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Abrir modo de leitura' })).toBeHidden();
  await expect(page.locator('[data-subject-action-reading]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ajustes de leitura' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Fechar leitura' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ajustes de leitura' }).locator('svg')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Fechar leitura' }).locator('svg')).toBeVisible();
  await expect(page.locator('[data-studied-toggle]')).toBeVisible();
  await expect(focus).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('link', { name: 'Fechar leitura' })).toBeFocused();
  await focus.focus();

  const focusGeometry = await page.evaluate(() => {
    const focusRoot = document.querySelector<HTMLElement>('[data-reading-focus]')!;
    const surface = document.querySelector<HTMLElement>('.reading-surface')!;
    const actionBar = document.querySelector<HTMLElement>('[data-subject-action-bar]')!;
    const surfaceStyle = getComputedStyle(surface);
    return {
      actionPosition: getComputedStyle(actionBar).position,
      focusBottomPadding: Number.parseFloat(getComputedStyle(focusRoot).paddingBottom),
      inlinePaddingDelta: Math.abs(
        Number.parseFloat(surfaceStyle.paddingInlineStart) -
          Number.parseFloat(surfaceStyle.paddingInlineEnd),
      ),
    };
  });
  expect(focusGeometry).toEqual({ actionPosition: 'fixed', focusBottomPadding: 16, inlinePaddingDelta: 0 });

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 240);
  });
  await expect(page.locator('[data-subject-action-bar]')).toHaveAttribute(
    'data-subject-action-visibility',
    'hidden',
  );
  await page.mouse.click(8, 300);
  await expect(page.locator('[data-subject-action-bar]')).toHaveAttribute(
    'data-subject-action-visibility',
    'visible',
  );
  await page.mouse.click(8, 300);
  await expect(page.locator('[data-subject-action-bar]')).toHaveAttribute(
    'data-subject-action-visibility',
    'hidden',
  );
  await page.evaluate(() => window.scrollTo(0, 200));
  await expect(page.locator('[data-subject-action-bar]')).toHaveAttribute(
    'data-subject-action-visibility',
    'visible',
  );
  await page.locator('[data-navigation-offer]').evaluate((element: HTMLElement) => {
    element.hidden = false;
  });
  await expect(page.locator('[data-navigation-offer]')).toBeHidden();

  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
  await expect(open).toBeFocused();
  await expect(page.locator('[data-subject-action-bar]')).toHaveAttribute(
    'data-subject-action-visibility',
    'visible',
  );
  await page.evaluate(() => window.scrollBy(0, 120));
  await expect(page.locator('[data-subject-action-bar]')).toHaveAttribute(
    'data-subject-action-visibility',
    'hidden',
  );
});

test('supports Back, Forward and Escape in the integrated reading mode', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.getByRole('link', { name: 'Ler sem distrações' }).click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/#focus$`));

  const heading = page.locator('.reading-surface article h2').first();
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });
  await heading.evaluate((element) => element.scrollIntoView({ behavior: 'auto', block: 'center' }));
  const beforeBack = await heading.evaluate((element) => element.getBoundingClientRect().top);

  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
  await expect
    .poll(() => heading.evaluate((element) => element.getBoundingClientRect().top))
    .toBeCloseTo(beforeBack, 0);
  await page.goForward();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/#focus$`));

  await page.keyboard.press('Escape');
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
});

test('closes a direct #focus URL without leaving the subject', async ({ page }) => {
  await page.goto(`${base}/#focus`);
  await expect(page.getByRole('dialog', { name: 'Modo de leitura sem distrações' })).toBeVisible();

  await page.getByRole('link', { name: 'Fechar leitura' }).click();
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
  await expect(page.locator('.reading-surface article')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ler sem distrações' })).toBeFocused();
});

test('preserves the visible reading position and supports repeated open-close cycles', async ({ page }) => {
  await page.goto(contestPath);
  await page.goto(`${base}/`);
  await page.getByRole('link', { name: 'Ler sem distrações' }).click();

  const heading = page.locator('.reading-surface article h2').first();
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });
  await heading.evaluate((element) => element.scrollIntoView({ behavior: 'auto', block: 'center' }));
  const before = await heading.evaluate((element) => element.getBoundingClientRect().top);
  await page.locator('[data-reading-focus-close]').evaluate((element: HTMLAnchorElement) => element.click());
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));
  await expect
    .poll(() => heading.evaluate((element) => element.getBoundingClientRect().top))
    .toBeCloseTo(before, 0);

  await page.locator('.reading-entry-link').evaluate((element: HTMLAnchorElement) => element.click());
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/#focus$`));
  await page.locator('[data-reading-focus-close]').evaluate((element: HTMLAnchorElement) => element.click());
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/$`));

  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${contestPath}$`));
});

test('keeps integrated reading mode usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'http://127.0.0.1:4321',
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto(`${base}/#focus`);

  await expect(page.locator('.reading-surface article')).toBeVisible();
  await expect(page.locator('.site-header')).toBeHidden();
  await expect(page.locator('[data-studied-toggle]')).toBeVisible();
  await expect(page.locator('[data-subject-action-normal]')).toBeHidden();
  await expect(page.locator('[data-subject-action-bar]')).not.toHaveAttribute(
    'data-subject-action-visibility',
  );
  await page.mouse.wheel(0, 2_000);
  await expect(page.locator('[data-subject-action-bar]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ajustes de leitura' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Fechar leitura' })).toHaveAttribute('href', `${base}/`);
  await context.close();
});

test('applies the selected theme in reading mode', async ({ page }) => {
  await page.addInitScript(([key, value]) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignora ambientes sem localStorage.
    }
  }, ['concursos:theme', 'dark']);

  await page.goto(`${base}/#focus`);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('injects the subject title as the sole h1 when the content has no leading h1', async ({ page }) => {
  // Assunto cujo conteúdo começa com h2: a página canônica injeta o título.
  const h2FirstSlug = 'assinaturas-certificacao-digital';
  const h2FirstTitle = 'Assinaturas eletrônicas, assinatura digital e certificação digital';
  await page.goto(`${contestPath}${h2FirstSlug}/#focus`);

  const headings = page.getByRole('heading', { level: 1 });
  await expect(headings).toHaveCount(1);
  await expect(headings).toHaveText(h2FirstTitle);
});

test('redirects the legacy reading URL permanently to the canonical #focus destination', async ({ page, request }) => {
  const response = await request.get(`${base}/leitura/`, { maxRedirects: 0 });
  expect(response.status()).toBe(301);
  expect(response.headers()['location']).toMatch(new RegExp(`${subjectSlug}/#focus$`));

  await page.goto(`${base}/leitura/`);
  await expect(page).toHaveURL(new RegExp(`${subjectSlug}/#focus$`));
  await expect(page.getByRole('dialog', { name: 'Modo de leitura sem distrações' })).toBeVisible();
});
