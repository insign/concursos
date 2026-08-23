import { expect, test } from './fixtures';

const contestPath = '/concursos/concurso-exemplo/';

// Escopo sintético: valida o espelhamento de eventos no controle da página.
// O caminho real (SW publicando após navegação) é coberto pelos testes
// unitários do motor e pela suíte SW-enabled de pwa.spec.ts.
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

test('reflects download progress on the global application-status button', async ({ page }) => {
  await page.goto('/concursos/concurso-exemplo/');
  const status = page.locator('[data-application-status]');

  await page.evaluate(() => {
    const bus = new BroadcastChannel('concursos-offline-downloads');
    bus.postMessage({
      type: 'progress',
      contestStorageId: 'exemplo',
      phase: 'download',
      completed: 6,
      total: 10,
      downloadedBytes: 4096,
    });
    bus.close();
  });

  await expect(status).toHaveAttribute('data-source', 'download');
  await expect(status).toHaveAttribute('data-state', 'busy');
  await expect(status.getByText('Baixando conteúdo offline… 60%')).toBeVisible();

  // Falha assíncrona aparece no botão com a mensagem do evento.
  await page.evaluate(() => {
    const bus = new BroadcastChannel('concursos-offline-downloads');
    bus.postMessage({
      type: 'failed',
      contestStorageId: 'exemplo',
      phase: 'download',
      message: 'O navegador interrompeu o download offline.',
    });
    bus.close();
  });
  await expect(status).toHaveAttribute('data-tone', 'red');
  await expect(status.getByText('Falha no download offline')).toBeVisible();

  // O flash de sucesso sai sozinho do estado de download (idle timeout).
  await page.evaluate(() => {
    const bus = new BroadcastChannel('concursos-offline-downloads');
    bus.postMessage({ type: 'started', contestStorageId: 'exemplo', phase: 'download' });
    bus.postMessage({ type: 'completed', contestStorageId: 'exemplo', phase: 'download' });
    bus.close();
  });
  await expect(status.getByText('Conteúdo offline atualizado.')).toBeVisible({ timeout: 5_000 });
  await expect(status.locator('[data-status-label]')).not.toHaveText('Download offline', {
    timeout: 6_000,
  });
});
