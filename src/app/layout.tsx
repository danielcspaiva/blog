import "@/styles/global.css";
import type { Metadata } from "next";
import { SITE } from "@/consts";
import { BASE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: SITE.TITLE,
  description: SITE.DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔬</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

// Passthrough root layout: the [locale] layout owns <html>/<body> so it can set
// `lang` per locale (next-intl `as-needed` pattern).
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
