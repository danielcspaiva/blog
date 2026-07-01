import { getTranslations } from "next-intl/server";
import { Container } from "@/components/Container";
import { Link } from "@/components/Link";
import { LanguageSwitcher } from "@/components/language-switcher";

export async function Header() {
  const t = await getTranslations("nav");
  return (
    <header>
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          <div>
            <Link href="/" underline={false}>
              <span className="select-none font-pixel text-lg tracking-wide text-ink-950 sm:text-xl dark:text-ink-50">
                DCSP
              </span>
            </Link>
          </div>
          <nav className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em]">
            <LanguageSwitcher />
            <span className="text-ink-400 dark:text-ink-500">/</span>
            <Link href="/blog">{t("blog")}</Link>
            <span className="text-ink-400 dark:text-ink-500">/</span>
            <Link href="/experience">{t("experience")}</Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
