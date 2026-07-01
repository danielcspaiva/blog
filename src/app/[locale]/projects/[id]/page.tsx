import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { BackToPrevious } from "@/components/BackToPrevious";
import { FormattedDate } from "@/components/FormattedDate";
import { TableOfContents } from "@/components/TableOfContents";
import { Link } from "@/components/Link";
import { MDXContent } from "@/lib/mdx/mdx-content";
import { CodeCopyButtons } from "@/components/mdx/code-copy-buttons";
import { getLocalizedProject, allProjectSlugs } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

const strings = {
  en: { backToProjects: "Back to projects" },
  "pt-br": { backToProjects: "Voltar para projetos" },
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
      <div className="animate my-10 space-y-1">
        <div className="eyebrow flex items-center gap-2 text-[0.7rem] text-ink-500 dark:text-ink-400">
          <FormattedDate date={project.date} locale={locale} />
          <span className="text-ink-400 dark:text-ink-500">·</span>
          <span>{project.readingTime}</span>
        </div>
        <h1 className="font-pixel text-3xl leading-tight tracking-tight text-ink-950 sm:text-4xl dark:text-ink-50">
          {project.title}
        </h1>
        {(project.demoURL || project.repoURL) && (
          <nav className="flex gap-1">
            {project.demoURL && (
              <Link href={project.demoURL} external>
                demo
              </Link>
            )}
            {project.demoURL && project.repoURL && <span>/</span>}
            {project.repoURL && (
              <Link href={project.repoURL} external>
                repo
              </Link>
            )}
          </nav>
        )}
      </div>
      <TableOfContents toc={project.toc} />
      <article className="animate prose prose-sm max-w-none dark:prose-invert sm:prose-base">
        <MDXContent code={project.code} />
      </article>
      <CodeCopyButtons />
    </Container>
  );
}
