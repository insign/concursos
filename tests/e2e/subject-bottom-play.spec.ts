import { readFile } from 'node:fs/promises';
import type { Page } from '@playwright/test';
import { expect, test } from './fixtures';

const subjectUrl = '/concursos/concurso-exemplo/assunto-exemplo/';
const cheatSheetUrl = '/concursos/concurso-exemplo/assunto-exemplo/cheat-sheet/';
const audioPath = 'src/content/assuntos/concurso-exemplo/administracao-publica/assunto-exemplo/midia/exemplo-principal.mp3';

async function serveAudio(page: Page): Promise<void> {
  const media = await readFile(audioPath);
  await page.route('**/media/**', (route) => route.fulfill({ body: media, contentType: 'audio/mpeg' }));
}

function bottomPlay(page: Page) {
  return page.locator('[data-subject-action-play]');
}

function audioPaused(page: Page): Promise<boolean> {
  return page.locator('[data-global-media-audio]').evaluate((element: HTMLAudioElement) => element.paused);
}

test('bottom audio button starts the subject audio and hides while the dock plays', async ({ page }) => {
  await serveAudio(page);
  await page.goto(subjectUrl);
  await expect(bottomPlay(page)).toHaveJSProperty('hidden', false);
  await bottomPlay(page).click();
  await expect(page.locator('#global-media-player')).toBeVisible();
  await expect.poll(() => audioPaused(page)).toBe(false);
  await expect(bottomPlay(page)).toHaveJSProperty('hidden', true);
  await page.getByRole('button', { name: 'Pausar', exact: true }).click();
  await expect(bottomPlay(page)).toHaveJSProperty('hidden', false);
  await bottomPlay(page).click();
  await expect.poll(() => audioPaused(page)).toBe(false);
});

test('bottom audio button starts the subject audio on the cheat-sheet tab', async ({ page }) => {
  await serveAudio(page);
  await page.goto(cheatSheetUrl);
  await expect(page.locator('[data-subject-media-play]')).toHaveCount(0);
  await bottomPlay(page).click();
  await expect(page.locator('#global-media-player')).toBeVisible();
  await expect.poll(() => audioPaused(page)).toBe(false);
});
