import Link from "next/link";
import { fontVariables } from "@/app/fonts";

// Fallback 404 for routes outside the [locale] segment. Renders its own document
// because the root layout is a passthrough.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <main className="grid min-h-screen place-items-center">
          <div className="grid place-items-center gap-3 px-4 text-center">
            <h1 className="font-pixel text-2xl tracking-tight text-ink-950 dark:text-ink-50">
              404: Not Found
            </h1>
            <p>The page you were looking for doesn&apos;t exist.</p>
            <Link
              href="/"
              className="eyebrow rounded-[2px] border border-ink-950/22 px-3 py-1.5 text-[0.7rem] text-ink-600 transition-colors hover:border-ink-950 hover:text-ink-950 dark:border-ink-50/20 dark:text-ink-300 dark:hover:border-ink-50 dark:hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
