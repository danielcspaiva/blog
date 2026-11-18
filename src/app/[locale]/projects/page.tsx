import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { ArrowCard } from "@/components/ArrowCard";
import { PageHeader } from "@/components/PageHeader";
import { PROJECTS, getLocalizedMetadata } from "@/consts";
import { getProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { formatStamp } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = getLocalizedMetadata(PROJECTS, locale as keyof typeof PROJECTS);
  return buildMetadata({
    locale,
    title: m.TITLE,
    description: m.DESCRIPTION,
    path: "/projects",
  });
}

export default async function ProjectsIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const m = getLocalizedMetadata(PROJECTS, locale as keyof typeof PROJECTS);
  const projects = getProjects(locale);

  return (
    <Container>
      <div className="space-y-12">
        <PageHeader
          eyebrow={`${String(projects.length).padStart(2, "0")} ${locale === "pt-br" ? "projetos" : "projects"}`}
          title={m.TITLE}
          description={m.DESCRIPTION}
        />
        <ul className="animate not-prose flex flex-col gap-5">
          {projects.map((project) => (
            <li key={project.slug}>
              <ArrowCard
                href={`/projects/${project.slug}`}
                title={project.title}
                description={project.description}
                meta={formatStamp(project.date)}
              />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
