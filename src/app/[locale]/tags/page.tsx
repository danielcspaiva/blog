import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
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
      <div className="space-y-10">
        <h1 className="animate font-pixel text-3xl tracking-tight text-ink-950 sm:text-4xl dark:text-ink-50">
          {s.allTags}
        </h1>
        <div className="animate flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <IntlLink
              key={tag}
              href={`/tags/${tag}`}
              className="eyebrow rounded-[2px] border border-ink-950/25 px-2.5 py-1 text-[0.7rem] text-ink-600 transition-colors duration-200 ease-out hover:border-ink-950 hover:text-ink-950 focus-visible:border-ink-950 focus-visible:text-ink-950 dark:border-ink-50/25 dark:text-ink-300 dark:hover:border-ink-50 dark:hover:text-white dark:focus-visible:border-ink-50 dark:focus-visible:text-white"
            >
              {tag}{" "}
              <span className="text-ink-400 dark:text-ink-500">[{count}]</span>
            </IntlLink>
          ))}
        </div>
      </div>
    </Container>
  );
}
