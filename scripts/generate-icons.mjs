import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const publicDirectory = fileURLToPath(new URL('../public/', import.meta.url));
const iconsDirectory = fileURLToPath(new URL('../public/icons/', import.meta.url));
const source = fileURLToPath(new URL('../public/favicon.svg', import.meta.url));

await mkdir(iconsDirectory, { recursive: true });

await Promise.all([
  sharp(source).resize(192, 192).png().toFile(`${iconsDirectory}/pwa-192.png`),
  sharp(source).resize(512, 512).png().toFile(`${iconsDirectory}/pwa-512.png`),
  sharp(source).resize(180, 180).png().toFile(`${iconsDirectory}/apple-touch-icon.png`),
  sharp({
    create: { width: 512, height: 512, channels: 4, background: '#275d55' },
  })
    .composite([{ input: source, gravity: 'centre' }])
    .png()
    .toFile(`${iconsDirectory}/pwa-maskable-512.png`),
]);

console.log(`PWA icons generated in ${publicDirectory}icons`);
