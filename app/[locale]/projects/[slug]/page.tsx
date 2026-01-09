import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getProjects, getProjectBySlug } from '@/lib/content';
import { locales } from '@/i18n/config';
import Container from '@/components/Container';
import MdxContent from '@/components/MdxContent';
import { Link as LinkIcon, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const projects = getProjects(locale);
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'website',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(project.title)}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [`/api/og?title=${encodeURIComponent(project.title)}`],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  return (
    <Container>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-in space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {project.title}
          </h1>
          <p className="text-lg text-secondary">{project.description}</p>

          {/* Links */}
          {(project.demoURL || project.repoURL) && (
            <div className="flex flex-wrap gap-3">
              {project.demoURL && (
                <a
                  href={project.demoURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
                >
                  <ExternalLink className="h-4 w-4" />
                  {locale === 'en' ? 'Live Demo' : 'Demo ao Vivo'}
                </a>
              )}
              {project.repoURL && (
                <a
                  href={project.repoURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-tertiary"
                >
                  <LinkIcon className="h-4 w-4" />
                  {locale === 'en' ? 'Source Code' : 'Código Fonte'}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <article className="prose prose-neutral dark:prose-invert animate-in prose-headings:font-semibold prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-primary prose-code:text-accent">
          <MdxContent code={project.body.code} />
        </article>
      </div>
    </Container>
  );
}
