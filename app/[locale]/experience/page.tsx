import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/config';
import Container from '@/components/Container';
import { createCommonLinks } from '@/lib/linkUtils';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Job = {
  company: string;
  companyLink?: string;
  position: string;
  duration: string;
  description: string;
};

type PageContent = {
  title: string;
  description: string;
  jobs: Job[];
};

const getContent = (locale: string): PageContent => {
  const links = createCommonLinks(locale);

  if (locale === 'pt-br') {
    return {
      title: 'Experiência',
      description: 'Minha jornada profissional e experiência',
      jobs: [
        {
          company: 'Quarto à Vista',
          companyLink: links.qavi('Quarto à Vista'),
          position: 'CTO',
          duration: 'Jul 2021 - Presente',
          description:
            'Lidero o time de tecnologia em uma administradora de aluguel por temporada com mais de 500 unidades em três estados brasileiros. Minha função é desenvolver e implementar soluções tecnológicas inovadoras para otimizar nossas operações e a experiência do cliente.',
        },
        {
          company: 'TC',
          companyLink: links.tc(),
          position: 'Desenvolvedor, Tech Lead e Mobile Lead',
          duration: 'Jun 2020 - Mai 2023',
          description:
            'Iniciei como Desenvolvedor Full Stack Júnior corrigindo bugs em React, React Native e serviços Go. Promovido a Desenvolvedor Full Stack Pleno, refatorei o módulo de chat e implementei o feed de ideias de investimento. Como Tech Lead, liderei a equipe de experiência do usuário Premium, desenvolvendo funcionalidades de consultoria e entrega de relatórios. Por fim, como Mobile Lead, conduzi iniciativas de performance, observabilidade, novas funcionalidades e desenvolvimentos de negócios como o novo checkout.',
        },
        {
          company: 'The Brotherhoodie',
          position: 'Fundador',
          duration: 'Set 2015 - Jan 2020',
          description:
            'Produtora de vídeo que fundei com meu colega de faculdade. Algumas de minhas atribuições: produção de vídeo para filmes publicitários, eventos e casamentos; gestão de projetos (equipes, metas, prazos e qualidade de entrega); e captação, edição e finalização de vídeos.',
        },
      ],
    };
  }

  return {
    title: 'Work experience',
    description: 'My professional journey and experience',
    jobs: [
      {
        company: 'Quarto à Vista',
        companyLink: links.qavi(),
        position: 'CTO',
        duration: 'Jul 2021 - Present',
        description:
          'Leading the technology team at a vacation rental management company with over 500 units across three Brazilian states. My role is to develop and implement innovative technological solutions to optimize our operations and customer experience.',
      },
      {
        company: 'TC',
        companyLink: links.tc(),
        position: 'Developer, Tech Lead and Mobile Lead',
        duration: 'Jun 2020 - May 2023',
        description:
          'Started as a Junior Full Stack Developer fixing bugs across React, React Native, and Go services. Promoted to Full Stack Developer, I refactored the chat module and implemented the investment ideas feed. As Tech Lead, I led the Premium user experience team, developing consulting features and report delivery. Finally, as Mobile Lead, I drove initiatives for performance, observability, new features, and business developments like the new checkout.',
      },
      {
        company: 'The Brotherhoodie',
        position: 'Founder',
        duration: 'Sep 2015 - Jan 2020',
        description:
          'Founded a video production company with my college colleague. Some of my responsibilities included: video production for advertising films, events, and weddings; project management (teams, goals, deadlines, and delivery quality); and video capture, editing, and finalization.',
      },
    ],
  };
};

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getContent(locale);

  return (
    <Container>
      <div className="space-y-8 sm:space-y-16">
        <section>
          <h1 className="animate-in font-semibold text-primary">
            {content.title}
          </h1>

          <section className="animate mt-4 space-y-6">
            <article className="space-y-8 sm:space-y-16">
              {content.jobs.map((job, index) => (
                <div key={index} className="mb-0 mt-2 py-2">
                  <div className="my-0 flex items-center justify-between py-0">
                    <p className="my-0 text-lg font-medium">
                      {job.companyLink ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: job.companyLink }}
                        />
                      ) : (
                        job.company
                      )}
                    </p>
                    <span className="text-sm text-secondary">
                      {job.duration}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{job.position}</p>
                  <p className="text-secondary">{job.description}</p>
                </div>
              ))}
            </article>
          </section>
        </section>
      </div>
    </Container>
  );
}
