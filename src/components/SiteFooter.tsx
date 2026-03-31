import { BackToTopButton } from "@/components/BackToTopButton";
import { Container } from "@/components/Container";
import { ThemeControls } from "@/components/ThemeControls";
import type { Locale } from "@/lib/i18n";
import { useTranslations } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = useTranslations(locale);

  return (
    <footer className="animate">
      <Container>
        <div className="relative">
          <div className="absolute -top-12 right-0">
            <BackToTopButton />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            &copy; {new Date().getFullYear()} • {SITE.title} • {t("footer.rights")}
          </div>
          <ThemeControls />
        </div>
      </Container>
    </footer>
  );
}
