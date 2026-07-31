import { expect, test } from './fixtures';

test('offers compact accessible header controls without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 288, height: 720 });
  await page.goto('/');

  const settings = page.getByRole('link', { name: 'Configurações' });
  const theme = page.locator('[data-theme-toggle]');
  const status = page.locator('[data-application-status]');
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('concursos:pwa-status', {
      detail: { state: 'idle', revision: 100 },
    }));
  });
  await expect(settings).toHaveAttribute('href', '/configuracoes/');
  await expect(theme).toHaveAccessibleName(/Tema automático/);
  await expect(status).toHaveAttribute('data-state', 'idle');
  await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();

  for (const control of [settings, theme, status]) {
    const box = await control.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.evaluate(() => {
    const installEvent = new Event('beforeinstallprompt', { cancelable: true });
    Object.defineProperties(installEvent, {
      prompt: { value: async () => undefined },
      userChoice: { value: Promise.resolve({ outcome: 'dismissed' }) },
    });
    window.dispatchEvent(installEvent);
    window.dispatchEvent(new CustomEvent('concursos:sync-status', {
      detail: {
        state: 'error',
        source: 'sync',
        message: 'Falha controlada com uma mensagem extensa de sincronização para a largura mínima.',
      },
    }));
  });
  await expect(page.getByRole('button', { name: 'Instalar aplicativo' })).toBeVisible();
  await expect(status.getByRole('button', { name: 'Tentar novamente' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('aggregates connectivity, synchronization, and PWA status by priority', async ({ page }) => {
  await page.goto('/');
  const status = page.locator('[data-application-status]');
  const message = status.locator('[data-status-message]');

  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('concursos:pwa-status', {
      detail: { state: 'idle', revision: 100 },
    }));
    window.dispatchEvent(new Event('offline'));
  });
  await expect(status).toHaveAttribute('data-tone', 'orange');
  await expect(status).toHaveAttribute('data-state', 'offline');
  await expect(message).toBeHidden();

  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('concursos:sync-status', {
      detail: { state: 'error', source: 'sync', message: 'Falha controlada.' },
    }));
  });
  await expect(status).toHaveAttribute('data-tone', 'red');
  await expect(status).toHaveAttribute('data-source', 'sync');
  await expect(message).toHaveText('Falha controlada.');
  await expect(status.getByRole('button', { name: 'Tentar novamente' })).toBeVisible();

  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('concursos:sync-status', {
      detail: { state: 'synced', source: 'sync' },
    }));
    window.dispatchEvent(new Event('online'));
    window.dispatchEvent(new CustomEvent('concursos:pwa-status', {
      detail: { state: 'activating', revision: 101 },
    }));
  });
  await expect(status).toHaveAttribute('data-tone', 'yellow');
  await expect(status).toHaveAttribute('data-source', 'pwa');
  await expect(message).toHaveText('Atualizando o aplicativo.');

  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('concursos:pwa-status', {
      detail: { state: 'idle', revision: 102 },
    }));
  });
  await expect(status).toHaveAttribute('data-tone', 'green');
  await expect(status).toHaveAttribute('data-state', 'idle');
  await expect(message).toBeHidden();
});

test('routes a PWA status retry back to the PWA controller', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('test:pwa-retries', '0');
    window.addEventListener('concursos:pwa-retry', () => {
      const count = Number(localStorage.getItem('test:pwa-retries') ?? '0');
      localStorage.setItem('test:pwa-retries', String(count + 1));
    });
    window.dispatchEvent(new CustomEvent('concursos:pwa-status', {
      detail: {
        state: 'error',
        phase: 'activation',
        message: 'Falha ao atualizar.',
        retryable: true,
        revision: 10,
      },
    }));
  });

  const status = page.locator('[data-application-status]');
  await expect(status).toHaveAttribute('data-source', 'pwa');
  await status.getByRole('button', { name: 'Tentar novamente' }).click();
  await expect.poll(() => page.evaluate(() =>
    Number(localStorage.getItem('test:pwa-retries')))).toBe(1);
});

test('preserves the deferred install prompt behavior in the icon control', async ({ page }) => {
  await page.goto('/');
  const install = page.getByRole('button', { name: 'Instalar aplicativo' });
  await expect(install).toBeHidden();

  await page.evaluate(() => {
    (window as typeof window & { installPrompts: number }).installPrompts = 0;
    const event = new Event('beforeinstallprompt', { cancelable: true });
    Object.defineProperties(event, {
      prompt: {
        value: async () => {
          (window as typeof window & { installPrompts: number }).installPrompts += 1;
        },
      },
      userChoice: { value: Promise.resolve({ outcome: 'accepted' }) },
    });
    window.dispatchEvent(event);
  });

  await expect(install).toBeVisible();
  await install.click();
  await expect.poll(() => page.evaluate(() =>
    (window as typeof window & { installPrompts: number }).installPrompts)).toBe(1);
  await expect(install).toBeHidden();
});
