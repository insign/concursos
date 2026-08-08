import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

const projectFile = (path: string) => fileURLToPath(new URL(`../../${path}`, import.meta.url));
const background = [23, 32, 51, 255];

async function pixelAt(path: string, left: number, top: number) {
  return [...await sharp(path)
    .extract({ left, top, width: 1, height: 1 })
    .ensureAlpha()
    .raw()
    .toBuffer()];
}

async function maxForegroundDistance(path: string) {
  const { data, info } = await sharp(path)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const center = (info.width - 1) / 2;
  let maximum = 0;

  for (let offset = 0; offset < data.length; offset += info.channels) {
    const isBackground = background.every((value, channel) => data[offset + channel] === value);
    if (isBackground) continue;
    const pixel = offset / info.channels;
    const distance = Math.hypot(
      (pixel % info.width) - center,
      Math.floor(pixel / info.width) - center,
    );
    maximum = Math.max(maximum, distance);
  }

  return maximum;
}

describe('project icons', () => {
  it.each(['c-dark.png', 'c-light.png'])('copies %s unchanged to public assets', async (name) => {
    expect(await readFile(projectFile(`public/icons/${name}`)))
      .toEqual(await readFile(projectFile(`symbol/${name}`)));
  });

  it.each([
    ['public/favicon.png', 128],
    ['public/icons/apple-touch-icon.png', 180],
    ['public/icons/pwa-192.png', 192],
    ['public/icons/pwa-512.png', 512],
  ] as const)('renders %s with a rounded dark-blue background', async (name, size) => {
    const path = projectFile(name);
    const metadata = await sharp(path).metadata();
    expect([metadata.width, metadata.height]).toEqual([size, size]);
    expect((await pixelAt(path, 0, 0))[3]).toBe(0);
    expect(await pixelAt(path, Math.floor(size / 2), Math.floor(size / 2)))
      .toEqual(background);
    expect((await sharp(path).stats()).channels[0].max).toBeGreaterThanOrEqual(240);
  });

  it('keeps the maskable icon full bleed with the symbol inside its safe area', async () => {
    const path = projectFile('public/icons/pwa-maskable-512.png');
    expect(await pixelAt(path, 0, 0)).toEqual(background);
    expect(await pixelAt(path, 256, 256)).toEqual(background);
    expect((await sharp(path).stats()).channels[0].max).toBeGreaterThanOrEqual(240);
    expect(await maxForegroundDistance(path)).toBeLessThanOrEqual(512 * 0.4);
  });
});
