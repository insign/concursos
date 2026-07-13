import { expect, test } from '@playwright/test';

test('validates and stores a public alias without normalization', async ({ page }) => {
  await page.goto('/configuracoes/');
  await expect(page.getByText('não é conta, senha nem proteção de privacidade')).toBeVisible();

  const input = page.getByLabel('Novo alias');
  await input.fill('Alias Inválido');
  await expect(input).toHaveJSProperty('validity.valid', false);

  await input.fill('estudo-7f3k');
  await page.getByRole('button', { name: 'Usar este alias' }).click();
  await expect(page.getByText('Alias atual:')).toContainText('estudo-7f3k');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('concursos:active-alias'))).toBe('estudo-7f3k');
});
