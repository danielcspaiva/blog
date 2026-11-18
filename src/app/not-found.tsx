import Link from "next/link";
import { fontVariables } from "@/app/fonts";

// Fallback 404 for routes outside the [locale] segment. Renders its own document
// because the root layout is a passthrough.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <main className="grid min-h-screen place-items-center">
          <div className="grid place-items-center gap-5 px-4 text-center">
            <p
              aria-hidden="true"
              className="wordmark text-ink text-8xl leading-none tracking-tight sm:text-9xl"
            >
              404
            </p>
            <h1 className="plate">404: Not Found</h1>
            <p className="text-ink-muted">
              The page you were looking for doesn&apos;t exist.
            </p>
            <Link href="/" className="btn">
              <span aria-hidden="true">←</span>
              Back to Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
