import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { createCommonLinks } from "@/lib/linkUtils";
import { isLocale } from "@/lib/i18n";
import { createMetadata, getPageMetadata } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const pageMetadata = getPageMetadata("experience", locale);

  return createMetadata({
    description: pageMetadata.description,
    image: `/open-graph/site/${locale}/experience`,
    locale,
    pathname: `/${locale}/experience`,
    title: pageMetadata.title,
  });
}

export default async function ExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const links = createCommonLinks(locale);
  type Job = {
    company: string;
    companyLink?: string;
    description: string;
    duration: string;
    position: string;
  };

  const content: Record<typeof locale, { description: string; jobs: Job[]; title: string }> = {
    en: {
      description: "My professional journey and experience",
      jobs: [
        {
          company: "Quarto à Vista",
          companyLink: links.qavi(),
          description:
            "Leading the technology team at a vacation rental management company with over 500 units across three Brazilian states. My role is to develop and implement innovative technological solutions to optimize our operations and customer experience.",
          duration: "Jul 2021 - Present",
          position: "CTO",
        },
        {
          company: "TC",
          companyLink: links.tc(),
          description:
            "Started as a Junior Full Stack Developer fixing bugs across React, React Native, and Go services. Promoted to Full Stack Developer, I refactored the chat module and implemented the investment ideas feed. As Tech Lead, I led the Premium user experience team, developing consulting features and report delivery. Finally, as Mobile Lead, I drove initiatives for performance, observability, new features, and business developments like the new checkout.",
          duration: "Jun 2020 - May 2023",
          position: "Developer, Tech Lead and Mobile Lead",
        },
        {
          company: "The Brotherhoodie",
          description:
            "Founded a video production company with my college colleague. Some of my responsibilities included: video production for advertising films, events, and weddings; project management (teams, goals, deadlines, and delivery quality); and video capture, editing, and finalization.",
          duration: "Sep 2015 - Jan 2020",
          position: "Founder",
        },
      ],
      title: "Work experience",
    },
    "pt-br": {
      description: "Minha jornada profissional e experiência",
      jobs: [
        {
          company: "Quarto à Vista",
          companyLink: links.qavi("Quarto à Vista"),
          description:
            "Lidero o time de tecnologia em uma administradora de aluguel por temporada com mais de 500 unidades em três estados brasileiros. Minha função é desenvolver e implementar soluções tecnológicas inovadoras para otimizar nossas operações e a experiência do cliente.",
          duration: "Jul 2021 - Presente",
          position: "CTO",
        },
        {
          company: "TC",
          companyLink: links.tc(),
          description:
            "Iniciei como Desenvolvedor Full Stack Júnior corrigindo bugs em React, React Native e serviços Go. Promovido a Desenvolvedor Full Stack Pleno, refatorei o módulo de chat e implementei o feed de ideias de investimento. Como Tech Lead, liderei a equipe de experiência do usuário Premium, desenvolvendo funcionalidades de consultoria e entrega de relatórios. Por fim, como Mobile Lead, conduzi iniciativas de performance, observabilidade, novas funcionalidades e desenvolvimentos de negócios como o novo checkout.",
          duration: "Jun 2020 - Mai 2023",
          position: "Desenvolvedor, Tech Lead e Mobile Lead",
        },
        {
          company: "The Brotherhoodie",
          description:
            "Produtora de vídeo que fundei com meu colega de faculdade. Algumas de minhas atribuições: produção de vídeo para filmes publicitários, eventos e casamentos; gestão de projetos (equipes, metas, prazos e qualidade de entrega); e captação, edição e finalização de vídeos.",
          duration: "Set 2015 - Jan 2020",
          position: "Fundador",
        },
      ],
      title: "Experiência",
    },
  } as const;

  const pageContent = content[locale];

  return (
    <Container>
      <aside>
        <div className="space-y-8 sm:space-y-16">
          <section>
            <h1 className="font-semibold text-black dark:text-white">{pageContent.title}</h1>

            <section className="animate mt-4 space-y-6">
              <article className="space-y-8 sm:space-y-16">
                {pageContent.jobs.map((job) => (
                  <div className="mt-2 mb-0 py-2" key={`${job.company}-${job.duration}`}>
                    <div className="my-0 flex items-center justify-between py-0">
                      <p className="my-0 text-lg font-medium">
                        {job.companyLink ? (
                          <span dangerouslySetInnerHTML={{ __html: job.companyLink }} />
                        ) : (
                          job.company
                        )}
                      </p>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {job.duration}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{job.position}</p>
                    <p>{job.description}</p>
                  </div>
                ))}
              </article>
            </section>
          </section>
        </div>
      </aside>
    </Container>
  );
}
