// Bakes the hero portrait from the source photo (scripts/assets/portrait.jpg):
//
//   public/images/portrait-tone.jpg          greyscale tone map
//   public/images/portrait-dither-{light,dark}.png   static 1-bit prints
//
// The site never shows the photo itself: components/DitherField.tsx samples
// the tone map and prints it through the same Bayer matrix as the animated
// field, so the face is made of the same dots as everything else.
//
//   pnpm portrait
//
import sharp from "sharp";

const SRC = new URL("./assets/portrait.jpg", import.meta.url).pathname;
const OUT = new URL("../public/images/portrait-tone.jpg", import.meta.url)
  .pathname;

const SIZE = 256; // plenty: it is resampled to ~1 texel per 2px dither cell

// Square crop around the head, as fractions of the source frame.
const CROP = { left: 0.11, top: 0.035, size: 0.78 };

const meta = await sharp(SRC).metadata();
const side = Math.round(meta.width * CROP.size);

const tone = sharp(SRC)
  .extract({
    left: Math.round(meta.width * CROP.left),
    top: Math.round(meta.height * CROP.top),
    width: side,
    height: side,
  })
  .greyscale()
  .resize(SIZE, SIZE, { kernel: "lanczos3" })
  // Ordered dither only has 64 levels and eats fine detail, so pre-shape the
  // tones: stretch the range, lift local contrast, then sharpen the features.
  .normalise({ lower: 1, upper: 99.5 })
  .clahe({ width: 64, height: 64, maxSlope: 2 })
  .sharpen({ sigma: 1.1, m1: 1.2, m2: 2.2 });

const info = await tone
  .clone()
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(OUT);
console.log(`portrait-tone.jpg ${info.width}×${info.height} ${info.size}b`);

// ── Static prints ────────────────────────────────────────────────────────
// The same portrait, pre-dithered, for places with no canvas: the social card
// (src/lib/og.tsx) and the <noscript> fallback. Mirrors the maths in
// DitherField.tsx (mask + tone curves) with the field's drift frozen mid-swing.

const CELL = 2;
const CELLS = 170; // 340px
// prettier-ignore
const BAYER8 = [
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
].map((v) => (v + 0.5) / 64);

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const lum = await tone
  .clone()
  .resize(CELLS, CELLS, { kernel: "cubic" })
  .raw()
  .toBuffer();

async function print(name, [r, g, b], inkOf) {
  const px = CELLS * CELL;
  const out = Buffer.alloc(px * px * 4);
  for (let y = 0; y < CELLS; y++) {
    for (let x = 0; x < CELLS; x++) {
      const dx = ((x + 0.5) / CELLS - 0.5) / 0.47;
      const dy = ((y + 0.5) / CELLS - 0.47) / 0.53;
      const mask = 1 - smoothstep(0.32, 1, dx * dx + dy * dy);
      const ink = inkOf(lum[y * CELLS + x] / 255) * mask;
      if (ink <= BAYER8[((y & 7) << 3) | (x & 7)]) continue;
      for (let sy = 0; sy < CELL; sy++) {
        for (let sx = 0; sx < CELL; sx++) {
          const i = ((y * CELL + sy) * px + x * CELL + sx) * 4;
          out[i] = r;
          out[i + 1] = g;
          out[i + 2] = b;
          out[i + 3] = 255;
        }
      }
    }
  }
  const file = new URL(`../public/images/${name}`, import.meta.url).pathname;
  const res = await sharp(out, { raw: { width: px, height: px, channels: 4 } })
    .png({ compressionLevel: 9, palette: true, colours: 2 })
    .toFile(file);
  console.log(`${name} ${res.width}×${res.height} ${res.size}b`);
}

// Ink on paper prints darkness; light on dark prints luminance.
await print(
  "portrait-dither-light.png",
  [0x14, 0x13, 0x0f],
  (l) => Math.pow(1 - l, 1.25) * 0.94,
);
await print(
  "portrait-dither-dark.png",
  [0xf6, 0xf4, 0xef],
  (l) => Math.pow(l, 1.1) * 1.02,
);
