import localFont from "next/font/local";
import type { ReactNode } from "react";

import { PageEffects } from "@/components/PageEffects";
import { PostHogScript } from "@/components/PostHogScript";
import { ThemeScript } from "@/components/ThemeScript";
import "@/app/globals.css";
import { SITE } from "@/lib/site";

const geistSans = localFont({
  src: [
    {
      path: "../../public/fonts/GeistSans-Regular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/fonts/GeistSans-Bold.otf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-sans",
});

export const metadata = {
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.title}`,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistSans.variable}>
        <ThemeScript />
        <PostHogScript />
        <PageEffects />
        {children}
      </body>
    </html>
  );
}
