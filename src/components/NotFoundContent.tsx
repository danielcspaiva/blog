import { Container } from "@/components/Container";
import { AppLink } from "@/components/AppLink";
import type { Locale } from "@/lib/i18n";

const content = {
  en: {
    backHome: "Back to Home",
    message: "The page you were looking for doesn't exist.",
    title: "404: Not Found",
  },
  "pt-br": {
    backHome: "Voltar para o Início",
    message: "A página que você estava procurando não existe.",
    title: "404: Não Encontrado",
  },
} as const;

export function NotFoundContent({ locale }: { locale: Locale }) {
  const pageContent = content[locale];

  return (
    <Container>
      <div className="space-y-6">
        <h1 className="font-semibold text-black dark:text-white">{pageContent.title}</h1>
        <p>{pageContent.message}</p>
        <AppLink href="/" locale={locale}>
          {pageContent.backHome}
        </AppLink>
      </div>
    </Container>
  );
}
