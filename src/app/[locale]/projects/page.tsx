import { notFound } from "next/navigation";

import { ArrowCard } from "@/components/ArrowCard";
import { Container } from "@/components/Container";
import { getProjectEntriesByLocale } from "@/lib/content-source";
import { isLocale } from "@/lib/i18n";
import { createMetadata, getPageMetadata } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const pageMetadata = getPageMetadata("projects", locale);

  return createMetadata({
    description: pageMetadata.description,
    image: `/open-graph/site/${locale}/projects`,
    locale,
    pathname: `/${locale}/projects`,
    title: pageMetadata.title,
  });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const projects = getProjectEntriesByLocale(locale);
  const pageMetadata = getPageMetadata("projects", locale);

  return (
    <Container>
      <aside>
        <div className="space-y-10">
          <div className="animate font-semibold text-black dark:text-white">
            {pageMetadata.title}
          </div>
          <ul className="animate not-prose flex flex-col gap-4">
            {projects.map((project) => (
              <li key={project.id}>
                <ArrowCard entry={project} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </Container>
  );
}
