import { readFile } from 'node:fs/promises';
import { expect, test } from './fixtures';

test('keeps the subject session, controls and floating offset across routes and focus mode', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('concursos:active-alias', 'persistent-media-test'));
  const media = await readFile('src/content/assuntos/concurso-exemplo/administracao-publica/assunto-exemplo/midia/exemplo-principal.mp3');
  await page.route('**/media/**', (route) => route.fulfill({ body: media, contentType: 'audio/mpeg' }));
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/');
  await page.locator('[data-subject-media-play]').click();
  await expect(page.getByRole('button', { name: 'Pausar', exact: true })).toBeVisible();
  await page.locator('[data-global-media-audio]').evaluate((element: HTMLAudioElement) => { element.dataset.identity = 'subject-session'; });
  await expect.poll(() => page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--media-dock-height')))).toBeGreaterThan(60);
  const time = await page.locator('[data-global-media-audio]').evaluate((element: HTMLAudioElement) => element.currentTime);
  await page.locator('a[href="/"]').first().click();
  await expect(page).toHaveURL('/');
  await expect(page.locator('[data-global-media-audio]')).toHaveAttribute('data-identity', 'subject-session');
  await expect.poll(() => page.locator('[data-global-media-audio]').evaluate((element: HTMLAudioElement) => element.currentTime)).toBeGreaterThan(time);
  await page.goBack();
  await expect(page.locator('[data-subject-media-play]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Pausar', exact: true })).toBeVisible();
  await page.locator('[data-reading-focus-open]').first().click();
  await expect(page.locator('#app-shell')).toHaveAttribute('aria-modal', 'true');
  await expect(page.locator('#global-media-player')).not.toHaveAttribute('inert');
  await expect(page.getByRole('button', { name: 'Pausar', exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(() => {
    const player = document.getElementById('global-media-player')!.getBoundingClientRect();
    const actions = document.querySelector('[data-subject-action-bar]')!.getBoundingClientRect();
    return actions.bottom <= player.top;
  })).toBe(true);
});

test('keeps the paused dock for five minutes then releases its space', async ({ page }) => {
  const media = await readFile('src/content/assuntos/concurso-exemplo/administracao-publica/assunto-exemplo/midia/exemplo-principal.mp3');
  await page.route('**/media/**', (route) => route.fulfill({ body: media, contentType: 'audio/mpeg' }));
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/');
  await page.locator('[data-subject-media-play]').click();
  await page.clock.install();
  await page.getByRole('button', { name: 'Pausar', exact: true }).click();
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.clock.fastForward(299_000);
  await expect(page.locator('#global-media-player')).toBeVisible();
  await page.clock.fastForward(2_000);
  await expect(page.locator('#global-media-player')).toBeHidden();
  await expect.poll(() => page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--media-dock-height')))).toBe(0);
});

test('autohides only the dock and restores it on upward scroll, keyboard focus and empty taps', async ({ page }) => {
  const media = await readFile('src/content/assuntos/concurso-exemplo/administracao-publica/assunto-exemplo/midia/exemplo-principal.mp3');
  await page.route('**/media/**', (route) => route.fulfill({ body: media, contentType: 'audio/mpeg' }));
  await page.setViewportSize({ width: 390, height: 720 });
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/');
  await page.locator('[data-subject-media-play]').click();
  await expect(page.locator('#global-media-player')).toBeVisible();
  await page.evaluate(() => window.scrollBy(0, 300));
  await expect(page.locator('#global-media-player')).toBeHidden();
  expect(await page.locator('[data-global-media-audio]').evaluate((element: HTMLAudioElement) => element.paused)).toBe(false);
  await page.evaluate(() => window.scrollBy(0, -120));
  await expect(page.locator('#global-media-player')).toBeVisible();
  await page.locator('[data-media-toggle]').focus();
  await page.evaluate(() => window.scrollBy(0, 120));
  await expect(page.locator('#global-media-player')).toBeVisible();
  await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollBy(0, 120); });
  await expect(page.locator('#global-media-player')).toBeHidden();
  await page.locator('body').dispatchEvent('click');
  await expect(page.locator('#global-media-player')).toBeVisible();
});

test('keeps the same playing element across client navigation under HTTP CSP', async ({ page }) => {
  const media = await readFile('src/content/assuntos/concurso-exemplo/administracao-publica/assunto-exemplo/midia/exemplo-principal.mp3');
  await page.route('**/media/spike.mp3', (route) => route.fulfill({ body: media, contentType: 'audio/mpeg' }));
  const violations: string[] = [];
  page.on('console', (entry) => {
    if (entry.type() === 'error' && /Content Security Policy|security policy/i.test(entry.text())) violations.push(entry.text());
  });
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/');
  await page.evaluate(async () => {
    const audio = document.querySelector<HTMLAudioElement>('[data-global-media-audio]')!;
    audio.dataset.identity = 'same-engine';
    audio.src = '/media/spike.mp3';
    await audio.play();
  });
  await expect.poll(() => page.locator('[data-global-media-audio]').evaluate((element: HTMLAudioElement) => element.currentTime)).toBeGreaterThan(0);
  const time = await page.locator('[data-global-media-audio]').evaluate((element: HTMLAudioElement) => element.currentTime);
  await page.locator('a[href="/"]').first().click();
  await expect(page).toHaveURL('/');
  await expect(page.locator('[data-global-media-audio]')).toHaveAttribute('data-identity', 'same-engine');
  await expect.poll(() => page.locator('[data-global-media-audio]').evaluate((element: HTMLAudioElement) => element.currentTime)).toBeGreaterThan(time);
  expect(await page.locator('[data-global-media-audio]').evaluate((element: HTMLAudioElement) => element.paused)).toBe(false);
  expect(violations).toEqual([]);
});

test('blocks unapproved inline and data scripts with the router installed', async ({ page }) => {
  await page.goto('/');
  const result = await page.evaluate(async () => {
    const inline = document.createElement('script');
    inline.textContent = 'document.documentElement.dataset.unapproved = "yes"';
    document.body.append(inline);
    const data = document.createElement('script');
    data.src = 'data:text/javascript,document.documentElement.dataset.unapproved="yes"';
    const rejected = new Promise<boolean>((resolve) => {
      data.onerror = () => resolve(true);
      data.onload = () => resolve(false);
    });
    document.body.append(data);
    return { rejected: await rejected, ran: document.documentElement.dataset.unapproved };
  });
  expect(result).toEqual({ rejected: true, ran: undefined });
});
