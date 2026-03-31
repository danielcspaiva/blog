import { Container } from "@/components/Container";
import { AppLink } from "@/components/AppLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";
import { useTranslations } from "@/lib/i18n";

const logo = `██████╗  ██████╗███████╗██████╗ 
██╔══██╗██╔════╝██╔════╝██╔══██╗
██║  ██║██║     ███████╗██████╔╝
██║  ██║██║     ╚════██║██╔═══╝ 
██████╔╝╚██████╗███████║██║     
╚═════╝  ╚═════╝╚══════╝╚═╝`;

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = useTranslations(locale);

  return (
    <header>
      <Container>
        <div className="flex flex-wrap justify-between gap-y-2">
          <div className="translate-y-1 overflow-x-auto">
            <AppLink href="/" locale={locale} underline={false}>
              <pre className="font-mono text-[2.5px] leading-tight whitespace-pre text-black select-none sm:text-[3px] md:text-[3.5px] dark:text-white">
                {logo}
              </pre>
            </AppLink>
          </div>
          <nav className="flex items-center gap-1 text-sm">
            <span className="mr-2">
              <LanguageSwitcher locale={locale} />
            </span>
            <AppLink href="/blog" locale={locale}>
              {t("nav.blog")}
            </AppLink>
            <span>/</span>
            <AppLink href="/experience" locale={locale}>
              {t("nav.experience")}
            </AppLink>
          </nav>
        </div>
      </Container>
    </header>
  );
}
