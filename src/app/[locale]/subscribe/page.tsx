import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { buildMetadata } from "@/lib/metadata";

const strings = {
  en: {
    title: "Subscribe to my newsletter",
    description:
      "Get notified when I publish new articles. No spam, unsubscribe anytime.",
  },
  "pt-br": {
    title: "Inscreva-se na minha newsletter",
    description:
      "Seja notificado quando eu publicar novos artigos. Sem spam, cancele a inscrição a qualquer momento.",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const s = strings[locale as "en" | "pt-br"] ?? strings.en;
  return buildMetadata({
    locale,
    title: s.title,
    description: s.description,
    path: "/subscribe",
  });
}

export default async function Subscribe({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  // The newsletter form is rendered by the layout below <main>.
  return <Container>{null}</Container>;
}
