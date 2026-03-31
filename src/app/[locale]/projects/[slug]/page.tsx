import { notFound } from "next/navigation";

import { BackToPrevious } from "@/components/BackToPrevious";
import { Container } from "@/components/Container";
import { FormattedDate } from "@/components/FormattedDate";
import { TableOfContents } from "@/components/TableOfContents";
import { AppLink } from "@/components/AppLink";
import { getProjectEntry, getProjectStaticParams } from "@/lib/content-source";
import { isLocale } from "@/lib/i18n";
import { createMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const project = getProjectEntry(slug, locale);

  if (!project) {
    return {};
  }

  return createMetadata({
    description: project.description,
    image: `/open-graph/project/${locale}/${slug}`,
    locale,
    pathname: `/${locale}/projects/${slug}`,
    title: project.title,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const project = getProjectEntry(slug, locale);

  if (!project) {
    notFound();
  }

  const Content = project.mdxContent;
  const labels = {
    en: "Back to projects",
    "pt-br": "Voltar para projetos",
  } as const;

  return (
    <Container>
      <div className="animate">
        <BackToPrevious href="/projects" locale={locale}>
          {labels[locale]}
        </BackToPrevious>
      </div>
      <div className="animate my-10 space-y-1">
        <div className="flex items-center gap-1.5">
          <div className="font-base text-sm">
            <FormattedDate date={project.date} locale={locale} />
          </div>
          &bull;
          <div className="font-base text-sm">{project.readingTime}</div>
        </div>
        <h1 className="text-3xl font-semibold text-black dark:text-white">{project.title}</h1>
        {project.demoURL || project.repoURL ? (
          <nav className="flex gap-1">
            {project.demoURL ? (
              <AppLink external href={project.demoURL}>
                demo
              </AppLink>
            ) : null}
            {project.demoURL && project.repoURL ? <span>/</span> : null}
            {project.repoURL ? (
              <AppLink external href={project.repoURL}>
                repo
              </AppLink>
            ) : null}
          </nav>
        ) : null}
      </div>
      {project.headings.length > 0 ? <TableOfContents headings={project.headings} /> : null}
      <article className="animate">
        <Content />
      </article>
    </Container>
  );
}
