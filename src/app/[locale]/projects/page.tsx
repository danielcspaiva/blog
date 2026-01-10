import { setRequestLocale } from 'next-intl/server';
import { getProjects } from '@/lib/content';
import { locales } from '@/i18n/config';
import ArrowCard from '@/components/ArrowCard';
import Container from '@/components/Container';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = getProjects(locale);

  return (
    <Container>
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="animate-in text-3xl font-semibold tracking-tight text-primary">
            {locale === 'en' ? 'Projects' : 'Projetos'}
          </h1>
          <p className="animate-in text-secondary">
            {locale === 'en'
              ? "A collection of projects I've worked on."
              : 'Uma coleção de projetos nos quais trabalhei.'}
          </p>
        </div>

        <div className="animate-in space-y-4">
          {projects.map((project) => (
            <ArrowCard key={project.slug} entry={project} type="projects" />
          ))}
        </div>
      </div>
    </Container>
  );
}
