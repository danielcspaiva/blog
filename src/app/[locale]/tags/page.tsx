import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Link as IntlLink } from "@/i18n/navigation";
import { getTags } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

const strings = {
  en: { title: "Tags", description: "List of tags used.", allTags: "All Tags" },
  "pt-br": {
    title: "Tags",
    description: "Lista de tags utilizadas.",
    allTags: "Todas as Tags",
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
    path: "/tags",
  });
}

export default async function TagsIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const s = strings[locale as "en" | "pt-br"] ?? strings.en;
  const tags = getTags(locale).sort((a, b) => a.tag.localeCompare(b.tag));

  return (
    <Container>
      <div className="space-y-12">
        <PageHeader
          eyebrow={`${String(tags.length).padStart(2, "0")} tags`}
          title={s.allTags}
          description={s.description}
        />
        <div className="animate flex flex-wrap gap-2.5">
          {tags.map(({ tag, count }) => (
            <IntlLink key={tag} href={`/tags/${tag}`} className="chip">
              {tag}
              <span className="opacity-60">[{count}]</span>
            </IntlLink>
          ))}
        </div>
      </div>
    </Container>
  );
}
