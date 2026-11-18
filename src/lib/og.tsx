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
          readFile(p("public/images/portrait-dither-light.png")),
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

// 8×8 Bayer matrix — the same one behind the site's dither field.
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
];

const INK = "#14130f";
const PAPER = "#f6f4ef";

// A band that rises from paper into solid ink, as an SVG of 4px dots (satori
// has no masks or repeating patterns, but it will rasterise an SVG <img>).
const BAND = { width: OG_SIZE.width, height: 96, cell: 4 };
const bandImage = (() => {
  const cols = BAND.width / BAND.cell;
  const rows = BAND.height / BAND.cell;
  const rects: string[] = [];
  for (let y = 0; y < rows; y++) {
    const tone = Math.pow((y + 0.5) / rows, 1.5) * 1.15;
    let run = -1;
    for (let x = 0; x <= cols; x++) {
      const on = x < cols && tone > (BAYER8[(y & 7) * 8 + (x & 7)] + 0.5) / 64;
      if (on && run < 0) run = x;
      if (!on && run >= 0) {
        rects.push(
          `<rect x="${run * BAND.cell}" y="${y * BAND.cell}" width="${(x - run) * BAND.cell}" height="${BAND.cell}"/>`,
        );
        run = -1;
      }
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${BAND.width}" height="${BAND.height}" fill="${INK}" shape-rendering="crispEdges">${rects.join("")}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
})();

// Social card in the site's 1-bit print style: paper, a pixel-font title, the
// Bayer-dithered portrait, and a dither band sinking into a solid ink footer.
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: PAPER,
        color: INK,
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "52px 64px 0",
        }}
      >
        {/* Header: plate logo + url */}
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
              fontFamily: "GeistPixelSquare",
              fontSize: 30,
              letterSpacing: 2,
              background: INK,
              color: PAPER,
              padding: "8px 16px",
            }}
          >
            DCSP
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#5c574c",
            }}
          >
            dcsp.dev
          </div>
        </div>

        {/* Body: title/description + dithered portrait */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            gap: 40,
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
                fontSize: 58,
                lineHeight: 1.12,
              }}
            >
              {truncate(title, 70)}
            </div>
            {description ? (
              <div
                style={{
                  display: "flex",
                  fontSize: 27,
                  marginTop: 24,
                  color: "#443f37",
                  lineHeight: 1.35,
                }}
              >
                {truncate(description, 130)}
              </div>
            ) : null}
          </div>

          <img src={portrait} width={340} height={340} alt="" />
        </div>
      </div>

      {/* Dither band sinking into the ink footer */}
      <img
        src={bandImage}
        width={BAND.width}
        height={BAND.height}
        alt=""
        style={{ marginTop: -44 }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: INK,
          color: PAPER,
          padding: "0 64px",
          height: 64,
          fontSize: 20,
          letterSpacing: 5,
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex" }}>{eyebrow}</div>
        <div
          style={{
            display: "flex",
            fontFamily: "GeistPixelGrid",
            fontSize: 24,
            letterSpacing: 2,
          }}
        >
          DANIEL PAIVA
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
        {
          name: "GeistPixelSquare",
          data: pixelSquare,
          weight: 400,
          style: "normal",
        },
        {
          name: "GeistPixelGrid",
          data: pixelGrid,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
