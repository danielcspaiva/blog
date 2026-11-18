import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";

// CSS variables consumed by global.css:
//   --font-geist-sans         -> --font-sans
//   --font-geist-mono         -> --font-mono
//   --font-geist-pixel-square -> --font-pixel (headings, .font-pixel)
export const fontVariables = [
  GeistSans.variable,
  GeistMono.variable,
  GeistPixelSquare.variable,
].join(" ");
