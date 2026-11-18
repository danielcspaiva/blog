import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { BackToPrevious } from "@/components/BackToPrevious";
import { FormattedDate } from "@/components/FormattedDate";
import { TableOfContents } from "@/components/TableOfContents";
import { MDXContent } from "@/lib/mdx/mdx-content";
import { CodeCopyButtons } from "@/components/mdx/code-copy-buttons";
import { getLocalizedProject, allProjectSlugs } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

const strings = {
  en: { backToProjects: "Back to projects", minuteRead: "min read" },
  "pt-br": {
    backToProjects: "Voltar para projetos",
    minuteRead: "min de leitura",
  },
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allProjectSlugs
      .filter((slug) => getLocalizedProject(slug, locale))
      .map((slug) => ({ locale, id: slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const project = getLocalizedProject(id, locale);
  if (!project) return {};
  return buildMetadata({
    locale,
    title: project.title,
    description: project.description,
    path: `/projects/${id}`,
    type: "article",
  });
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const project = getLocalizedProject(id, locale);
  if (!project) notFound();

  const s = strings[locale as "en" | "pt-br"] ?? strings.en;

  return (
    <Container>
      <div className="animate">
        <BackToPrevious href="/projects">{s.backToProjects}</BackToPrevious>
      </div>
      <header className="animate mt-10 mb-10 space-y-5">
        <div className="eyebrow text-ink-faint flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem]">
          <FormattedDate date={project.date} locale={locale} />
          <span aria-hidden="true">·</span>
          <span>
            {project.readingTime} {s.minuteRead}
          </span>
        </div>
        <h1 className="font-pixel text-ink text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl">
          {project.title}
        </h1>
        <p className="text-ink-muted text-lg text-pretty">
          {project.description}
        </p>
        {(project.demoURL || project.repoURL) && (
          <nav className="flex flex-wrap gap-3 pt-1">
            {project.demoURL && (
              <a
                href={project.demoURL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
              >
                Demo <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.repoURL && (
              <a
                href={project.repoURL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Repo <span aria-hidden="true">↗</span>
              </a>
            )}
          </nav>
        )}
      </header>
      <TableOfContents toc={project.toc} locale={locale} />
      <article className="animate prose prose-sm sm:prose-base max-w-none">
        <MDXContent code={project.code} />
      </article>
      <CodeCopyButtons />
    </Container>
  );
}
