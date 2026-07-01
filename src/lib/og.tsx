import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type Assets = {
  regular: Buffer;
  bold: Buffer;
  pixelSquare: Buffer;
  pixelGrid: Buffer;
  portrait: string;
};

let assetsPromise: Promise<Assets> | null = null;
async function loadAssets() {
  if (!assetsPromise) {
    assetsPromise = (async () => {
      const p = (rel: string) => join(process.cwd(), rel);
      const [regular, bold, pixelSquare, pixelGrid, portraitBuf] =
        await Promise.all([
          readFile(p("public/fonts/GeistSans-Regular.ttf")),
          readFile(p("public/fonts/GeistSans-Bold.ttf")),
          readFile(p("public/fonts/geist-pixel/GeistPixel-Square.ttf")),
          readFile(p("public/fonts/geist-pixel/GeistPixel-Grid.ttf")),
          readFile(p("public/images/me-dither-light.png")),
        ]);
      return {
        regular,
        bold,
        pixelSquare,
        pixelGrid,
        portrait: `data:image/png;base64,${portraitBuf.toString("base64")}`,
      };
    })();
  }
  return assetsPromise;
}

function truncate(text: string, max: number) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

// Monochrome eink/dither social card: off-white paper, ink border, a halftone
// dot band, the dithered self-portrait, and pixel-font wordmark + title.
export async function renderOG({
  title,
  description,
  eyebrow = "CTO · Builder · Writer",
}: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  const { regular, bold, pixelSquare, pixelGrid, portrait } =
    await loadAssets();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#f6f4ef",
          color: "#14130f",
          fontFamily: "Geist",
          padding: 64,
          border: "2px solid #14130f",
        }}
      >
        {/* Header: pixel wordmark + url */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "GeistPixelGrid",
              fontSize: 34,
              letterSpacing: 2,
            }}
          >
            DANIEL PAIVA
          </div>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#5c574c" }}>
            dcsp.dev
          </div>
        </div>

        {/* Halftone dither band (dots — satori has no radial-gradient) */}
        <div style={{ display: "flex", gap: 7, marginTop: 26, height: 4, overflow: "hidden" }}>
          {Array.from({ length: 112 }).map((_, i) => (
            <div
              key={i}
              style={{ width: 3, height: 3, borderRadius: 3, background: "#14130f" }}
            />
          ))}
        </div>

        {/* Body: title/description + dithered portrait */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            gap: 56,
            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "GeistPixelSquare",
                fontSize: 52,
                lineHeight: 1.15,
              }}
            >
              {truncate(title, 80)}
            </div>
            {description ? (
              <div
                style={{
                  display: "flex",
                  fontSize: 27,
                  marginTop: 26,
                  color: "#443f37",
                  lineHeight: 1.35,
                }}
              >
                {truncate(description, 150)}
              </div>
            ) : null}
          </div>

          <img
            src={portrait}
            width={300}
            height={300}
            style={{ imageRendering: "pixelated" }}
            alt=""
          />
        </div>

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5c574c",
          }}
        >
          {eyebrow}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
        { name: "GeistPixelSquare", data: pixelSquare, weight: 400, style: "normal" },
        { name: "GeistPixelGrid", data: pixelGrid, weight: 400, style: "normal" },
      ],
    },
  );
}
