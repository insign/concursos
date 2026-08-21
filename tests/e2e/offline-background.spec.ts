import { expect, test } from './fixtures';

const contestPath = '/concursos/concurso-exemplo/';

test('surfaces service-worker update progress on the package control', async ({ page }) => {
  await page.goto(contestPath);
  const section = page.locator('[data-offline-package][data-contest-storage-id="exemplo"]');
  const message = section.locator('[data-offline-message]');
  await expect(message).toBeVisible();

  // Progresso publicado pelo Service Worker (fase update) é espelhado no controle.
  await section.evaluate((element) => {
    const storageId = element.getAttribute('data-contest-storage-id');
    const bus = new BroadcastChannel('concursos-offline-downloads');
    bus.postMessage({
      type: 'progress',
      contestStorageId: storageId,
      phase: 'update',
      completed: 3,
      total: 12,
      downloadedBytes: 2048,
    });
    bus.close();
  });
  await expect(message).toHaveText('Atualizando 3 de 12 recursos...');
  await expect(section.locator('[data-offline-progress]')).toBeVisible();

  // A conclusão renova a disponibilidade e libera o controle.
  await section.evaluate((element) => {
    const storageId = element.getAttribute('data-contest-storage-id');
    const bus = new BroadcastChannel('concursos-offline-downloads');
    bus.postMessage({ type: 'completed', contestStorageId: storageId, phase: 'update' });
    bus.close();
  });
  await expect(message).not.toHaveText(/Atualizando \d+ de \d+ recursos/);
});
