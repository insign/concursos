import { readFile } from 'node:fs/promises';
import { expect, test } from './fixtures';

const subjectRoute = '/concursos/concurso-exemplo/assunto-exemplo/';
const runtimeSource = await readFile(
  new URL('../../src/scripts/abbreviation-popover.js', import.meta.url),
  'utf8',
);

async function installFixture(
  page: import('@playwright/test').Page,
  includeSecond = false,
  title = 'Tribunal de Contas do Estado',
): Promise<void> {
  await page.route('**/__tests__/abbreviation-popover.js', (route) =>
    route.fulfill({ body: runtimeSource, contentType: 'application/javascript' }),
  );
  await page.locator('.reading-surface article p').first().evaluate((paragraph, options) => {
    const abbreviation = document.createElement('abbr');
    abbreviation.title = options.title;
    abbreviation.textContent = 'TCE';
    paragraph.prepend(abbreviation, ' — ');
    if (options.includeSecond) {
      const second = document.createElement('abbr');
      second.title = 'Lei de Responsabilidade Fiscal';
      second.textContent = 'LRF';
      paragraph.prepend(second, ' — ');
    }
  }, { includeSecond, title });
  await expect(page.locator('abbr').last()).toHaveAttribute('title', title);
  await page.addScriptTag({ type: 'module', url: '/__tests__/abbreviation-popover.js' });
  await expect(page.locator('abbr')).toHaveCount(includeSecond ? 2 : 1);
  await expect(page.locator('abbr').first()).toHaveAttribute('data-abbreviation-popover-trigger', '');
  await expect(page.locator('abbr').last()).toHaveAttribute('data-abbreviation-popover-trigger', '');
  // A expansão é preservada para o impresso/PDF antes da remoção do title.
  await expect(page.locator('abbr').last()).toHaveAttribute('data-abbreviation-title', title);
  if (includeSecond) {
    await expect(page.locator('abbr').first()).toHaveAttribute(
      'data-abbreviation-title',
      'Lei de Responsabilidade Fiscal',
    );
  }
}

test('keeps the runtime conditional and exposes the meaning by hover, focus, and touch', async ({ page, request }) => {
  const response = await request.get(subjectRoute);
  expect(await response.text()).not.toContain('abbreviation-popover');

  await page.goto(subjectRoute);
  await installFixture(page);

  const abbreviation = page.locator('abbr');
  const tooltipId = await abbreviation.getAttribute('aria-describedby');
  expect(tooltipId).toBeTruthy();
  expect(await abbreviation.getAttribute('title')).toBeNull();
  await expect(abbreviation).toHaveAttribute('tabindex', '0');

  const tooltip = page.locator(`#${tooltipId}`);
  await expect(tooltip).toHaveAttribute('role', 'tooltip');
  await expect(tooltip).toHaveText('Tribunal de Contas do Estado');

  await abbreviation.hover();
  await expect(tooltip).toBeVisible();
  const tooltipBounds = await tooltip.boundingBox();
  expect(tooltipBounds).not.toBeNull();
  await page.mouse.move(
    tooltipBounds!.x + tooltipBounds!.width / 2,
    tooltipBounds!.y + tooltipBounds!.height / 2,
  );
  await expect(tooltip).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(tooltip).toBeHidden();
  await expect(abbreviation).not.toBeFocused();

  await abbreviation.hover();
  await expect(tooltip).toBeVisible();
  await page.mouse.move(0, 0);
  await expect(tooltip).toBeHidden();

  await abbreviation.focus();
  await expect(tooltip).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(tooltip).toBeHidden();
  await expect(abbreviation).toBeFocused();

  await abbreviation.evaluate((element) => {
    element.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerType: 'touch' }));
  });
  await expect(tooltip).toBeVisible();
  await page.locator('h1').dispatchEvent('pointerdown');
  await expect(tooltip).toBeHidden();
});

test('restores the popover of an abbreviation that remains focused after transient hover', async ({ page }) => {
  await page.goto(subjectRoute);
  await installFixture(page, true);

  const focused = page.locator('abbr').last();
  const hovered = page.locator('abbr').first();
  const focusedTooltip = page.locator(`#${await focused.getAttribute('aria-describedby')}`);
  const hoveredTooltip = page.locator(`#${await hovered.getAttribute('aria-describedby')}`);

  await focused.focus();
  await expect(focusedTooltip).toBeVisible();
  await hovered.hover();
  await expect(hoveredTooltip).toBeVisible();
  await expect(focusedTooltip).toBeHidden();
  await page.mouse.move(0, 0);
  await expect(hoveredTooltip).toBeHidden();
  await expect(focusedTooltip).toBeVisible();
  await expect(focused).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(focusedTooltip).toBeHidden();
  await hovered.hover();
  await expect(hoveredTooltip).toBeVisible();
  await page.mouse.move(0, 0);
  await expect(hoveredTooltip).toBeHidden();
  await expect(focusedTooltip).toBeHidden();
  await focused.hover();
  await expect(focusedTooltip).toBeVisible();
});

test('repositions an open popover when an inner container scrolls', async ({ page }) => {
  await page.goto(subjectRoute);
  await installFixture(page);

  const abbreviation = page.locator('abbr');
  const tooltip = page.locator(`#${await abbreviation.getAttribute('aria-describedby')}`);
  await abbreviation.evaluate((element) => {
    const viewport = document.createElement('div');
    viewport.dataset.abbreviationScrollFixture = '';
    viewport.style.cssText = 'width: 160px; overflow-x: auto;';
    const track = document.createElement('div');
    track.style.cssText = 'width: 400px; height: 2rem;';
    element.replaceWith(viewport);
    viewport.append(track);
    (element as HTMLElement).style.marginLeft = '80px';
    track.append(element);
  });

  await abbreviation.hover();
  await expect(tooltip).toBeVisible();
  await page.locator('[data-abbreviation-scroll-fixture]').evaluate((element) => {
    element.scrollLeft = 60;
  });
  await expect
    .poll(async () => {
      const tooltipBounds = await tooltip.boundingBox();
      const triggerBounds = await abbreviation.boundingBox();
      if (!tooltipBounds || !triggerBounds) return Number.POSITIVE_INFINITY;
      const viewportWidth = page.viewportSize()?.width ?? 0;
      const expectedLeft = Math.min(
        viewportWidth - tooltipBounds.width - 8,
        Math.max(8, triggerBounds.x + triggerBounds.width / 2 - tooltipBounds.width / 2),
      );
      return Math.abs(tooltipBounds.x - expectedLeft);
    })
    .toBeLessThanOrEqual(1);
});

test('works in focus mode and stays out of print', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 240 });
  await page.goto(`${subjectRoute}#focus`);
  await expect(page.getByRole('dialog', { name: 'Modo de leitura sem distrações' })).toBeFocused();
  await installFixture(
    page,
    false,
    'Tribunal de Contas do Estado com uma denominação institucional extensa para testar viewports baixos',
  );

  const abbreviation = page.locator('abbr');
  const tooltip = page.locator(`#${await abbreviation.getAttribute('aria-describedby')}`);
  await abbreviation.focus();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).not.toHaveAttribute('aria-hidden', 'true');
  expect(await tooltip.evaluate((element) => (element as HTMLElement).inert)).toBe(false);

  const bounds = await tooltip.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(await page.evaluate(() => innerWidth));
  expect(bounds!.y).toBeGreaterThanOrEqual(0);
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(await page.evaluate(() => innerHeight));

  await page.keyboard.press('Escape');
  await expect(tooltip).toBeHidden();
  await expect(page).toHaveURL(/#focus$/);
  await page.keyboard.press('Escape');
  await expect(page).toHaveURL(new RegExp(`${subjectRoute}$`));

  await abbreviation.focus();
  await expect(tooltip).toBeVisible();

  await page.emulateMedia({ media: 'print' });
  await expect(tooltip).toBeHidden();
  await expect(abbreviation).toHaveCSS('text-decoration-line', 'none');
  // Etiqueta Kindle-like: unidade empilhada com a expansão abaixo do termo.
  await expect(abbreviation).toHaveCSS('display', 'inline-flex');
  await expect(abbreviation).toHaveAttribute(
    'data-abbreviation-title',
    'Tribunal de Contas do Estado com uma denominação institucional extensa para testar viewports baixos',
  );
  const printLabel = await abbreviation.evaluate((element) =>
    window.getComputedStyle(element, '::after').content,
  );
  expect(printLabel).toContain('denominação institucional extensa');
  expect(printLabel).not.toContain('(');
});
