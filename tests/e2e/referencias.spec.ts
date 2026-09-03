import { expect, test } from './fixtures';

const subjectPath = '/concursos/concurso-exemplo/assunto-exemplo/';
const reviewPath = '/revisoes/concurso-exemplo/administracao-publica/';
const resolutionsPath = '/resolucoes/exemplo/fundamentos/';

test('renders collapsed references at the end of the content page', async ({ page }) => {
  await page.goto(subjectPath);

  const details = page.locator('[data-document-references] details');
  await expect(details).toBeVisible();
  await expect(details).not.toHaveAttribute('open');
  await expect(page.locator('[data-document-references] summary')).toHaveText('Referências');

  const body = page.locator('.document-references-body');
  await expect(body).toBeHidden();
  await details.locator('summary').click();
  await expect(body).toBeVisible();
  await expect(body.getByRole('link', { name: 'Constituição Federal de 1988' })).toBeVisible();
});

test('keeps the abbreviation runtime conditional on a page whose references have none', async ({ request }) => {
  const response = await request.get(subjectPath);
  expect(await response.text()).not.toContain('abbreviation-popover');
});

test('keeps references readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(subjectPath);

  const body = page.locator('.document-references-body');
  // Sem JS o conteúdo existe no HTML e o <details> continua expansível nativamente.
  await expect(
    body.locator('a[href="https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm"]'),
  ).toBeAttached();
  await page.locator('[data-document-references] summary').click();
  await expect(
    body.locator('a[href="https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm"]'),
  ).toBeVisible();
  await context.close();
});

test('hides references from the distraction-free reading mode and excludes them from progress', async ({ page }) => {
  await page.goto(subjectPath);
  await page.locator('.reading-entry-link[data-reading-focus-open]').click();

  const focus = page.locator('#focus[data-reading-focus-active]');
  await expect(focus).toBeVisible();
  await expect(page.locator('[data-document-references]')).toBeHidden();

  const progress = page.locator('[data-reading-progress]');
  await expect(progress).toBeVisible();

  // Rola até o fim da página: o indicador chega a 100% no fim do conteúdo,
  // com o bloco de referências oculto no modo de leitura.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(progress).toHaveText('100%', { timeout: 5000 });
});

test('expands references for printing and restores state afterwards', async ({ page }) => {
  await page.goto(subjectPath);

  const details = page.locator('[data-document-references] details');
  await expect(details).not.toHaveAttribute('open');
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  await expect(details).toHaveAttribute('open');
  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
  await expect(details).not.toHaveAttribute('open');
});

test('hides references in print media (never printed nor in PDF)', async ({ page }) => {
  await page.goto(subjectPath);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('[data-document-references]')).toBeHidden();
  await page.emulateMedia({ media: 'screen' });
});

test('processes references through the Markdown pipeline on the mega review', async ({ page }) => {
  await page.goto(reviewPath);
  const reviewDetails = page.locator('article.mega-review-content [data-document-references] details');
  await expect(reviewDetails).toBeVisible();
  await expect(reviewDetails).not.toHaveAttribute('open');

  const lrf = reviewDetails.locator('abbr').filter({ hasText: /^LRF$/ });
  await expect(lrf).toBeAttached();
  await reviewDetails.locator('summary').click();
  await expect(lrf).toBeVisible();

  await lrf.hover();
  const tooltipId = await lrf.getAttribute('aria-describedby');
  expect(tooltipId).toBeTruthy();
  await expect(page.locator(`#${tooltipId}`)).toHaveText('Lei de Responsabilidade Fiscal');
});

test('renders collapsed references on the resolution document and inside its dialog', async ({ page }) => {
  await page.goto(resolutionsPath);
  const resolutionDetails = page.locator('[data-resolution-document] [data-document-references] details');
  await expect(resolutionDetails).toBeVisible();
  await expect(resolutionDetails).not.toHaveAttribute('open');
  await resolutionDetails.locator('summary').click();
  await expect(
    page
      .locator('[data-resolution-document] .document-references-body')
      .getByRole('link', { name: 'Constituição Federal de 1988' }),
  ).toBeVisible();

  // O diálogo de uma resolução recebe exatamente uma cópia do bloco agregado.
  await page.addInitScript(() => {
    localStorage.setItem('concursos:active-alias', 'referencias-e2e-9m2x');
  });
  await page.goto('/concursos/concurso-exemplo/assunto-exemplo/questoes/');
  await page.getByLabel('Imediata').check();
  await page.getByLabel('Eficiência').check();
  const trigger = page.getByRole('button', { name: 'Ver resolução passo a passo' });
  await expect(trigger).toBeVisible();
  await trigger.click();

  const dialog = page.getByRole('dialog', { name: 'Resolução passo a passo' });
  const dialogDetails = dialog.locator('[data-document-references] details');
  await expect(dialogDetails).toBeVisible();
  await expect(dialogDetails).not.toHaveAttribute('open');
  await dialogDetails.locator('summary').click();
  const dialogBody = dialog.locator('.document-references-body');
  await expect(dialogBody).toBeVisible();
  await expect(dialogBody.getByRole('link', { name: 'Constituição Federal de 1988' })).toHaveCount(1);
});
