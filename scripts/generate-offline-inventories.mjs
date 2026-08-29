import { runOfflineInventoryBuild } from './lib/offline-inventory-builder.mjs';

const DIST_DIRECTORY = new URL('../dist/', import.meta.url);
const INVENTORY_DIRECTORY = new URL('../dist/offline-inventories/', import.meta.url);
const result = await runOfflineInventoryBuild({
  distDirectory: DIST_DIRECTORY,
  inventoryDirectory: INVENTORY_DIRECTORY,
});
for (const generated of result.generated) console.log(`Offline inventory generated: ${generated}`);
console.log(
  `Offline inventories finalized with concurrency ${result.concurrency} ` +
    `(${result.inventoryConcurrency} inventories x ${result.resourceConcurrency} resources).`,
);
