"use client";

import { useEffect, useRef } from "react";

/**
 * A slow, living 1-bit texture: a drifting tone field (domain-warped sines)
 * rendered through an 8×8 Bayer matrix onto a low-resolution canvas, so the
 * whole thing is made of the same 2px dots as the static dither tiles.
 *
 * It paints with the element's computed `color` and scales its density by the
 * `--field-density` custom property, so it follows the theme with no props.
 * Pauses when off-screen; draws a single still frame under reduced motion.
 *
 * Content laid over the field does not sit on top of it — it bends it. Two
 * data attributes on elements inside the same positioned parent:
 *
 *   data-dither-portrait  `portraitSrc` modulates the field inside the
 *                         element's box: the photo's backdrop *is* the field,
 *                         and only what differs from it (lit skin, hair) takes
 *                         dots away or adds them
 *   data-dither-text      the element's (single-line) text is printed in its
 *                         own font as denser letterforms, with the field
 *                         thinned in a soft halo around them; the DOM text
 *                         stays for assistive tech and selection but turns
 *                         transparent once the print is up
 */

const CELL = 2; // CSS px per dot — matches scripts/dither-tiles.mjs
const FPS = 12; // deliberately low: dither reads best when it steps

// prettier-ignore
const BAYER8 = new Float32Array([
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
].map((v) => (v + 0.5) / 64));

type Props = {
  className?: string;
  /** "down": dense at the top, dissolving downward. "up": the reverse. */
  direction?: "down" | "up";
  /** Falloff exponent — higher keeps the dense end tighter. */
  falloff?: number;
  /** Saturate the dense edge to solid, so it can butt against an ink block. */
  anchor?: boolean;
  /** Greyscale tone map printed into the `data-dither-portrait` element. */
  portraitSrc?: string;
};

/** Box of an anchor element, in dither cells, relative to the canvas. */
type CellBox = { x: number; y: number; w: number; h: number };

type Portrait = {
  box: CellBox;
  /** Luminance 0–1, resampled to one value per cell. */
  lum: Float32Array;
  /** Feathered head-shaped mask 0–1: where the photo may bend the field. */
  mask: Float32Array;
  /** Separable Gaussian around the head, per row / per column of the canvas:
   *  a soft, edgeless region where the field is steadied behind the face. */
  rowGlow: Float32Array;
  colGlow: Float32Array;
};

/** Canvas-sized layers for printed text. */
type TextPrint = {
  /** Letterform coverage 0–1 per cell. */
  mask: Float32Array;
  /** Position down the capital height, 0 (top) – 1 (baseline), per cell. */
  depth: Float32Array;
  /** Blurred coverage 0–1: how far the field is thinned around the letters. */
  halo: Float32Array;
};

/** Separable box blur, two passes (≈ a tent kernel), in place. */
function blur(src: Float32Array, w: number, h: number, radius: number) {
  const tmp = new Float32Array(src.length);
  const norm = 1 / (radius * 2 + 1);
  for (let pass = 0; pass < 2; pass++) {
    for (let y = 0; y < h; y++) {
      let acc = 0;
      for (let x = -radius; x <= radius; x++) {
        acc += src[y * w + Math.min(w - 1, Math.max(0, x))];
      }
      for (let x = 0; x < w; x++) {
        tmp[y * w + x] = acc * norm;
        acc +=
          src[y * w + Math.min(w - 1, x + radius + 1)] -
          src[y * w + Math.max(0, x - radius)];
      }
    }
    for (let x = 0; x < w; x++) {
      let acc = 0;
      for (let y = -radius; y <= radius; y++) {
        acc += tmp[Math.min(h - 1, Math.max(0, y)) * w + x];
      }
      for (let y = 0; y < h; y++) {
        src[y * w + x] = acc * norm;
        acc +=
          tmp[Math.min(h - 1, y + radius + 1) * w + x] -
          tmp[Math.max(0, y - radius) * w + x];
      }
    }
  }
  return src;
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Decode an image into a square luminance array. */
async function loadTones(src: string) {
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  await img.decode();
  const size = Math.min(img.naturalWidth, img.naturalHeight);
  const scratch = document.createElement("canvas");
  scratch.width = scratch.height = size;
  const ctx = scratch.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2d canvas unavailable");
  ctx.drawImage(img, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);
  const lum = new Float32Array(size * size);
  for (let i = 0; i < lum.length; i++) lum[i] = data[i * 4] / 255;

  // The backdrop's own tone, sampled from the two top corners: the level at
  // which the photo neither adds nor removes dots.
  const patch = Math.max(1, Math.round(size * 0.14));
  let sum = 0;
  for (let y = 0; y < patch; y++) {
    for (let x = 0; x < patch; x++) {
      sum += lum[y * size + x] + lum[y * size + (size - 1 - x)];
    }
  }
  return { size, lum, backdrop: sum / (patch * patch * 2) };
}

export function DitherField({
  className,
  direction = "down",
  falloff = 1.5,
  anchor = false,
  portraitSrc,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    let w = 0;
    let h = 0;
    let image: ImageData | null = null;
    let pixels: Uint32Array | null = null;
    let rowWarp = new Float32Array(0);
    let colWarp = new Float32Array(0);
    let tones: Awaited<ReturnType<typeof loadTones>> | null = null;
    let portrait: Portrait | null = null;
    let text: TextPrint | null = null;
    let raf = 0;
    let last = 0;
    let onScreen = true;
    let disposed = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // A fixed offset so the still frame (and first paint) isn't the t=0 state.
    const epoch = performance.now() - 40_000;

    const cellBox = (selector: string): CellBox | null => {
      const el = host.querySelector<HTMLElement>(selector);
      if (!el) return null;
      const a = el.getBoundingClientRect();
      const b = canvas.getBoundingClientRect();
      return {
        x: Math.round((a.left - b.left) / CELL),
        y: Math.round((a.top - b.top) / CELL),
        w: Math.round(a.width / CELL),
        h: Math.round(a.height / CELL),
      };
    };

    /** Rasterise every `data-dither-text` element at one texel per cell. */
    const layoutText = () => {
      text = null;
      delete host.dataset.ditherPrinted;
      const els = host.querySelectorAll<HTMLElement>("[data-dither-text]");
      if (!els.length || !w || !h) return;

      const scratch = document.createElement("canvas");
      scratch.width = w;
      scratch.height = h;
      const sctx = scratch.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;

      const depth = new Float32Array(w * h);
      const origin = canvas.getBoundingClientRect();

      for (const el of els) {
        const style = getComputedStyle(el);
        const size = parseFloat(style.fontSize);
        const family = style.fontFamily;
        // Until the web font is in, leave the real text showing instead.
        // (Check the primary face only: fallback faces never report loaded.)
        const primary = family.split(",")[0];
        if (!document.fonts.check(`${style.fontWeight} ${size}px ${primary}`)) {
          return;
        }
        const rect = el.getBoundingClientRect();
        const left = (rect.left - origin.left) / CELL;
        const top = (rect.top - origin.top) / CELL;
        const content =
          style.textTransform === "uppercase"
            ? (el.textContent ?? "").toUpperCase()
            : (el.textContent ?? "");

        sctx.font = `${style.fontStyle} ${style.fontWeight} ${size / CELL}px ${family}`;
        sctx.letterSpacing = `${(parseFloat(style.letterSpacing) || 0) / CELL}px`;
        sctx.textBaseline = "alphabetic";
        const line = sctx.measureText(content);
        const ascent = line.fontBoundingBoxAscent;
        const descent = line.fontBoundingBoxDescent;
        // Single line: the font box is centred in the element's line box.
        const baseline =
          top + (rect.height / CELL - (ascent + descent)) / 2 + ascent;
        const cap = sctx.measureText("H").actualBoundingBoxAscent;
        sctx.fillText(content, left, baseline);

        const y0 = Math.max(0, Math.floor(top));
        const y1 = Math.min(h, Math.ceil(top + rect.height / CELL));
        const x0 = Math.max(0, Math.floor(left));
        const x1 = Math.min(w, Math.ceil(left + rect.width / CELL));
        // Small type has few cells to spare: flatten the fade so thin strokes
        // stay close to solid.
        const strength = Math.min(1, cap / 30);
        for (let y = y0; y < y1; y++) {
          const d =
            strength *
            Math.min(1, Math.max(0, (y + 0.5 - (baseline - cap)) / cap));
          for (let x = x0; x < x1; x++) depth[y * w + x] = d;
        }
      }

      const { data } = sctx.getImageData(0, 0, w, h);
      const mask = new Float32Array(w * h);
      // Tighten the antialiased edge so the letter outlines stay crisp.
      for (let i = 0; i < mask.length; i++) {
        mask[i] = smoothstep(0.3, 0.62, data[i * 4 + 3] / 255);
      }
      // The halo is the letter shapes blurred outwards by ~10px.
      const halo = blur(Float32Array.from(mask), w, h, 5);
      for (let i = 0; i < halo.length; i++) {
        halo[i] = smoothstep(0.02, 0.42, halo[i]);
      }
      text = { mask, depth, halo };
      host.dataset.ditherPrinted = "";
    };

    /** (Re)measure the anchors and resample the portrait to the cell grid. */
    const layout = () => {
      layoutText();

      const box = tones ? cellBox("[data-dither-portrait]") : null;
      if (!tones || !box || !box.w || !box.h) {
        portrait = null;
        return;
      }
      const { size, lum: src } = tones;
      const lum = new Float32Array(box.w * box.h);
      const mask = new Float32Array(box.w * box.h);
      for (let y = 0; y < box.h; y++) {
        const v = (y + 0.5) / box.h;
        const sy = Math.min(size - 1.001, Math.max(0, v * size - 0.5));
        const y0 = Math.floor(sy);
        const fy = sy - y0;
        for (let x = 0; x < box.w; x++) {
          const u = (x + 0.5) / box.w;
          const sx = Math.min(size - 1.001, Math.max(0, u * size - 0.5));
          const x0 = Math.floor(sx);
          const fx = sx - x0;
          const i = y0 * size + x0;
          lum[y * box.w + x] =
            (src[i] * (1 - fx) + src[i + 1] * fx) * (1 - fy) +
            (src[i + size] * (1 - fx) + src[i + size + 1] * fx) * fy;

          // Head-shaped feather: an ellipse that fully holds the face and
          // lets the shoulders fall away.
          const dx = (u - 0.5) / 0.47;
          const dy = (v - 0.47) / 0.53;
          mask[y * box.w + x] = 1 - smoothstep(0.3, 1, dx * dx + dy * dy);
        }
      }

      const rowGlow = new Float32Array(h);
      const colGlow = new Float32Array(w);
      const gy = box.y + box.h * 0.45;
      const gx = box.x + box.w * 0.5;
      for (let y = 0; y < h; y++) {
        const d = (y - gy) / (box.h * 0.5);
        rowGlow[y] = Math.exp(-d * d);
      }
      for (let x = 0; x < w; x++) {
        const d = (x - gx) / (box.w * 0.56);
        colGlow[x] = Math.exp(-d * d);
      }
      portrait = { box, lum, mask, rowGlow, colGlow };
    };

    const draw = (now: number) => {
      if (!image || !pixels) return;
      const t = (now - epoch) / 1000;

      const style = getComputedStyle(canvas);
      const [r, g, b] = (style.color.match(/[\d.]+/g) ?? ["0", "0", "0"]).map(
        Number,
      );
      const on = (255 << 24) | (b << 16) | (g << 8) | r; // little-endian RGBA
      const peak = Number(style.getPropertyValue("--field-density")) || 0.8;
      // Light dots on a dark page print luminance; dark dots print its inverse.
      const lightDots = r + g + b > 384;

      for (let y = 0; y < h; y++)
        rowWarp[y] = Math.sin(y * CELL * 0.0083 - t * 0.21);
      for (let x = 0; x < w; x++)
        colWarp[x] = Math.sin(x * CELL * 0.0029 + t * 0.13);

      const p = portrait;
      const tx = text;
      // The backdrop's tone in each printing sense (see the portrait step).
      const backdrop = tones?.backdrop ?? 0;
      const backdropInk = Math.pow(1 - backdrop, 0.86);
      const backdropGlow = Math.pow(backdrop, 1.1);

      for (let y = 0; y < h; y++) {
        const v = (y + 0.5) / h;
        const linear = direction === "down" ? 1 - v : v;
        const fall = Math.pow(linear, falloff);
        const floor = anchor ? Math.pow(linear, 7) * 1.4 : 0;
        const Y = y * CELL;
        const bayerRow = (y & 7) << 3;
        const offset = y * w;
        const py = p ? y - p.box.y : -1;
        const inPortraitRow = p !== null && py >= 0 && py < p.box.h;

        for (let x = 0; x < w; x++) {
          const X = x * CELL;
          const a = Math.sin(X * 0.0061 + t * 0.31 + 1.9 * rowWarp[y]);
          const c = Math.sin(
            X * 0.0037 - Y * 0.0069 - t * 0.17 + 1.3 * colWarp[x],
          );
          const wave = 0.5 + 0.28 * a + 0.22 * c; // 0–1
          let tone = fall * (0.34 + 0.92 * wave) * peak + floor;

          if (p) {
            // Steady the field behind the head — no edge, just a Gaussian —
            // so there is always enough tone for the face to read against:
            // ink on paper wants a mid-dark ground, light on dark a dim one.
            const glow = p.rowGlow[y] * p.colGlow[x];
            if (glow > 0.004) {
              if (lightDots) {
                tone *= 1 - 0.66 * glow;
              } else {
                const ground = 0.52 + 0.3 * wave;
                if (ground > tone) tone += (ground - tone) * glow * 0.92;
              }
            }

            // Then let the photo bend it: only its difference from its own
            // backdrop counts, so the backdrop is simply the field carrying on.
            if (inPortraitRow) {
              const px = x - p.box.x;
              if (px >= 0 && px < p.box.w) {
                const i = py * p.box.w + px;
                const k = p.mask[i];
                if (k > 0) {
                  const lum = p.lum[i];
                  let bend = lightDots
                    ? Math.pow(lum, 1.1) - backdropGlow
                    : (Math.pow(1 - lum, 0.86) - backdropInk) * 0.84;
                  // Taking dots away from an already dim ground cuts a hard
                  // silhouette; ease it so hair and shadow sink in softly.
                  if (lightDots && bend < 0) bend *= 0.5;
                  tone += bend * k;
                }
              }
            }
          }

          if (tx) {
            // The field runs right up to the letters, thinned in a soft halo
            // so their edges hold…
            const halo = tx.halo[offset + x];
            if (halo > 0) tone *= 1 - 0.9 * halo;
            // …and the letters are the same dots, packed tighter: solid at
            // the cap line, easing to a drifting mid-tone at the baseline.
            const m = tx.mask[offset + x];
            if (m > 0) {
              const fill = 1.04 - tx.depth[offset + x] * (0.3 + 0.22 * wave);
              tone += (fill - tone) * m;
            }
          }

          pixels[offset + x] = tone > BAYER8[bayerRow | (x & 7)] ? on : 0;
        }
      }

      ctx.putImageData(image, 0, 0);
      canvas.dataset.ready = "";
    };

    const resize = () => {
      const nextW = Math.ceil(host.clientWidth / CELL);
      const nextH = Math.ceil(host.clientHeight / CELL);
      if (!nextW || !nextH) return;
      if (nextW !== w || nextH !== h) {
        w = nextW;
        h = nextH;
        canvas.width = w;
        canvas.height = h;
        // Whole-cell CSS size so every dot is exactly CELL px (no resampling).
        canvas.style.width = `${w * CELL}px`;
        canvas.style.height = `${h * CELL}px`;
        image = ctx.createImageData(w, h);
        pixels = new Uint32Array(image.data.buffer);
        rowWarp = new Float32Array(h);
        colWarp = new Float32Array(w);
      }
      layout();
      draw(performance.now());
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 1000 / FPS) return;
      last = now;
      draw(now);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      if (onScreen && !reduced.matches) raf = requestAnimationFrame(tick);
      else draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    intersectionObserver.observe(canvas);

    // Repaint on theme flips (matters when the loop is paused).
    const themeObserver = new MutationObserver(() => draw(performance.now()));
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    reduced.addEventListener("change", sync);
    resize();
    sync();
    // Web fonts settle after first paint and move the anchors.
    document.fonts?.ready.then(() => !disposed && resize());

    if (portraitSrc) {
      loadTones(portraitSrc)
        .then((loaded) => {
          if (disposed) return;
          tones = loaded;
          layout();
          draw(performance.now());
        })
        .catch(() => {
          /* the field simply renders without the portrait */
        });
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      reduced.removeEventListener("change", sync);
    };
  }, [direction, falloff, anchor, portraitSrc]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`dither-field${className ? ` ${className}` : ""}`}
    />
  );
}
