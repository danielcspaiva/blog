import { getTranslations } from "next-intl/server";
import { Container } from "@/components/Container";
import { Link as IntlLink } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { NavLink } from "@/components/NavLink";

export async function Header() {
  const t = await getTranslations("nav");
  return (
    <header className="site-header">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <IntlLink
            href="/"
            aria-label="Daniel Paiva — home"
            className="plate font-pixel text-base tracking-wide select-none sm:text-lg"
          >
            DCSP
          </IntlLink>
          <nav className="flex items-center gap-1 font-mono text-xs tracking-[0.12em] uppercase sm:gap-2">
            <LanguageSwitcher />
            <span aria-hidden="true" className="text-ink-faint">
              /
            </span>
            <NavLink href="/blog">{t("blog")}</NavLink>
            <NavLink href="/experience">{t("experience")}</NavLink>
          </nav>
        </div>
      </Container>
    </header>
  );
}
