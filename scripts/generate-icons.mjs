import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const publicDirectory = fileURLToPath(new URL('../public/', import.meta.url));
const iconsDirectory = fileURLToPath(new URL('../public/icons/', import.meta.url));
const source = fileURLToPath(new URL('../symbol/c-light.png', import.meta.url));
const background = '#172033';

await mkdir(iconsDirectory, { recursive: true });

async function writeIcon(path, size, { maskable = false } = {}) {
  const symbolSize = Math.round(size * (maskable ? 0.6 : 0.72));
  const symbol = await sharp(source)
    .resize(symbolSize, symbolSize, { fit: 'contain' })
    .png()
    .toBuffer();
  const canvas = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: maskable ? background : { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });
  const layers = maskable
    ? [{ input: symbol, gravity: 'centre' }]
    : [
        {
          input: Buffer.from(
            `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${Math.round(size * 0.14)}" fill="${background}" /></svg>`,
          ),
        },
        { input: symbol, gravity: 'centre' },
      ];

  return canvas
    .composite(layers)
    .png()
    .toFile(path);
}

await Promise.all([
  writeIcon(`${publicDirectory}favicon.png`, 128),
  writeIcon(`${iconsDirectory}/pwa-192.png`, 192),
  writeIcon(`${iconsDirectory}/pwa-512.png`, 512),
  writeIcon(`${iconsDirectory}/apple-touch-icon.png`, 180),
  writeIcon(`${iconsDirectory}/pwa-maskable-512.png`, 512, { maskable: true }),
]);

console.log(`PWA icons generated in ${publicDirectory}icons`);
