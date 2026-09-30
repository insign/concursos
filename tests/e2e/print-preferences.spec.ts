import { expect, test } from './fixtures';

const example = '/concursos/concurso-exemplo/assunto-exemplo/';
const anotherSubject = '/concursos/seap-ma-2026-inspetor-policia-penal/teclas-atalho/';
const storageKey = 'concursos:print-preferences:v1';

test('remembers sections and answer key between subjects, study tabs and reloads', async ({ page }) => {
  await page.goto(example);
  await page.locator('[data-print-open]').click();
  await page.locator('[data-print-section-checkbox="conteudo"]').uncheck();
  await page.locator('[data-print-section-checkbox="cheat-sheet"]').check();
  await page.locator('[data-print-section-checkbox="questoes"]').check();
  await page.locator('[data-print-gabarito]').uncheck();
  await page.locator('[data-print-section-checkbox="questoes"]').uncheck();
  await expect(page.locator('[data-print-gabarito-row]')).toBeHidden();
  await page.locator('[data-print-section-checkbox="questoes"]').check();
  await expect(page.locator('[data-print-gabarito]')).not.toBeChecked();
  await page.locator('[data-print-cancel]').click();

  await page.goto(anotherSubject);
  await page.locator('[data-print-open]').click();
  await expect(page.locator('[data-print-section-checkbox="conteudo"]')).not.toBeChecked();
  await expect(page.locator('[data-print-section-checkbox="cheat-sheet"]')).toBeChecked();
  await expect(page.locator('[data-print-section-checkbox="questoes"]')).toBeChecked();
  await expect(page.locator('[data-print-gabarito]')).not.toBeChecked();
  await page.locator('[data-print-cancel]').click();

  await page.goto(`${anotherSubject}questoes/`);
  await page.reload();
  await page.locator('[data-print-open]').click();
  await expect(page.locator('[data-print-section-checkbox="conteudo"]')).not.toBeChecked();
  await expect(page.locator('[data-print-section-checkbox="cheat-sheet"]')).toBeChecked();
  await expect(page.locator('[data-print-section-checkbox="questoes"]')).toBeChecked();
  await expect(page.locator('[data-print-gabarito]')).not.toBeChecked();
});

test('persists both quick actions and an empty selection without printing it', async ({ page }) => {
  await page.addInitScript(() => { window.print = () => { throw new Error('Unexpected print'); }; });
  await page.goto(`${example}cheat-sheet/`);
  await page.locator('[data-print-open]').click();
  await page.locator('[data-print-all]').click();
  await page.reload();
  await page.locator('[data-print-open]').click();
  for (const section of ['conteudo', 'cheat-sheet', 'questoes']) {
    await expect(page.locator(`[data-print-section-checkbox="${section}"]`)).toBeChecked();
  }
  await page.locator('[data-print-only-current]').click();
  await page.goto(example);
  await page.locator('[data-print-open]').click();
  await expect(page.locator('[data-print-section-checkbox="cheat-sheet"]')).toBeChecked();
  await expect(page.locator('[data-print-section-checkbox="conteudo"]')).not.toBeChecked();
  await page.locator('[data-print-section-checkbox="cheat-sheet"]').uncheck();
  await page.reload();
  await page.locator('[data-print-open]').click();
  await expect(page.locator('[data-print-section-checkbox]:checked')).toHaveCount(0);
  await page.locator('[data-print-confirm]').click();
  await expect(page.locator('[data-print-status]')).toHaveText('Selecione ao menos uma seção.');
  await expect(page.locator('[data-print-dialog]')).toBeVisible();
  await expect(page.locator('[data-print-bundle]')).toHaveCount(0);
});

test('adopts choices from another tab when reopening without replacing an open dialog', async ({ page, context }) => {
  await page.goto(example);
  await page.locator('[data-print-open]').click();
  const other = await context.newPage();
  await other.goto(`${example}cheat-sheet/`);
  await other.locator('[data-print-open]').click();
  await other.locator('[data-print-only-current]').click();
  await expect(page.locator('[data-print-section-checkbox="conteudo"]')).toBeChecked();
  await page.locator('[data-print-cancel]').click();
  await page.locator('[data-print-open]').click();
  await expect(page.locator('[data-print-section-checkbox="cheat-sheet"]')).toBeChecked();
  await expect(page.locator('[data-print-section-checkbox="conteudo"]')).not.toBeChecked();
  await other.close();
});

test('uses the current study tab for corrupt preferences and does not save on opening', async ({ page }) => {
  await page.goto(`${example}cheat-sheet/`);
  await page.evaluate((key) => localStorage.setItem(key, '{'), storageKey);
  await page.locator('[data-print-open]').click();
  await expect(page.locator('[data-print-section-checkbox="cheat-sheet"]')).toBeChecked();
  await expect(page.locator('[data-print-section-checkbox="conteudo"]')).not.toBeChecked();
  expect(await page.evaluate((key) => localStorage.getItem(key), storageKey)).toBe('{');
});

test('keeps choices and prints when preference writes fail', async ({ page }) => {
  await page.addInitScript((key) => {
    const setItem = Storage.prototype.setItem;
    setItem.call(localStorage, key, JSON.stringify({ schemaVersion: 1, sections: ['conteudo'], includeGabarito: true }));
    Storage.prototype.setItem = function (name, value) {
      if (name === key) throw new DOMException('Quota exceeded', 'QuotaExceededError');
      setItem.call(this, name, value);
    };
    window.print = () => { document.body.dataset.testPrinted = 'true'; };
  }, storageKey);
  await page.goto(`${example}questoes/`);
  await page.locator('[data-print-open]').click();
  await page.locator('[data-print-only-current]').click();
  await page.locator('[data-print-gabarito]').uncheck();
  await page.locator('[data-print-cancel]').click();
  await page.locator('[data-print-open]').click();
  await expect(page.locator('[data-print-section-checkbox="questoes"]')).toBeChecked();
  await expect(page.locator('[data-print-section-checkbox="conteudo"]')).not.toBeChecked();
  await expect(page.locator('[data-print-gabarito]')).not.toBeChecked();
  await page.locator('[data-print-confirm]').click();
  await expect(page.locator('body')).toHaveAttribute('data-test-printed', 'true');
  await expect(page.locator('[data-print-bundle-section]')).toHaveCount(1);
  await expect(page.locator('[data-print-bundle-section]')).toHaveAttribute('data-print-bundle-section', 'questoes');
  await expect(page.locator('.print-gabarito')).toHaveCount(0);
});
