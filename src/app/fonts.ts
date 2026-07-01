import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare, GeistPixelGrid } from "geist/font/pixel";

// CSS variables consumed by global.css:
//   --font-geist-sans        -> --font-sans
//   --font-geist-mono        -> --font-mono
//   --font-geist-pixel-square -> --font-pixel (headings, .font-pixel)
//   --font-geist-pixel-grid   -> .wordmark (hero)
export const fontVariables = [
  GeistSans.variable,
  GeistMono.variable,
  GeistPixelSquare.variable,
  GeistPixelGrid.variable,
].join(" ");
