import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Container from '@/components/Container';
import ArrowCard from '@/components/ArrowCard';
import { Link } from '@/i18n/navigation';
import { getBlogPosts, getProjects } from '@/lib/content';
import { SITE, SOCIALS, CAL_BOOKING, HOME, getLocalizedMetadata } from '@/lib/constants';
import { createCommonLinks } from '@/lib/linkUtils';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localizedHome = getLocalizedMetadata(HOME, locale as Locale);
  return {
    title: localizedHome.TITLE,
    description: localizedHome.DESCRIPTION,
  };
}

const content = {
  en: {
    title: "Hi, I'm Daniel",
    latestPosts: 'Latest posts',
    seeAllPosts: 'See all posts',
    letsConnect: "Let's Connect",
    contactInfo:
      'Feel free to reach out if you want to chat about tech, share ideas, or just say hello.',
    scheduleMeeting: 'Schedule a Meeting',
    recentProjects: 'Recent Projects',
    seeAllProjects: 'See all projects',
  },
  'pt-br': {
    title: 'Olá, sou Daniel',
    latestPosts: 'Últimos posts',
    seeAllPosts: 'Ver todos os posts',
    letsConnect: 'Vamos nos conectar',
    contactInfo:
      'Sinta-se à vontade para entrar em contato se quiser conversar sobre tecnologia, compartilhar ideias ou apenas dizer olá.',
    scheduleMeeting: 'Agendar uma Reunião',
    recentProjects: 'Projetos Recentes',
    seeAllProjects: 'Ver todos os projetos',
  },
};

const descriptions = {
  en: {
    description: (links: ReturnType<typeof createCommonLinks>) =>
      `I work as CTO at ${links.qavi()}, managing vacation rentals across Brazil. Previously at ${links.tc()}, I worked as a Developer, Mobile Lead and Tech Lead. ${links.experience('Learn more about my experience')}.`,
    education: (links: ReturnType<typeof createCommonLinks>) =>
      `My background is in Civil Engineering from ${links.ufrn()} (with an exchange at ${links.uiuc()}). I then transitioned to software development via ${links.ironhack()}'s bootcamp.`,
    personalNote:
      "I'm passionate about startups and entrepreneurship. Love building with TypeScript, React, React Native, and Next.js.",
  },
  'pt-br': {
    description: (links: ReturnType<typeof createCommonLinks>) =>
      `Sou CTO na ${links.qavi('Quarto à Vista')}, onde estamos reinventando o turismo através do ecossistema de aluguel por temporada no Brasil. Anteriormente na ${links.tc()}, trabalhei como Desenvolvedor, Tech Lead e Mobile Lead. ${links.experience('Saiba mais sobre minha experiência')}.`,
    education: (links: ReturnType<typeof createCommonLinks>) =>
      `Minha formação é em Engenharia Civil pela ${links.ufrn()} (com intercâmbio na ${links.uiuc()}). Depois, transitei para o desenvolvimento de software pelo bootcamp da ${links.ironhack()}.`,
    personalNote:
      'Sou interessado por startups e empreendedorismo. Entusiasta do ecossistema TypeScript, costumo construir com React, React Native e Next.js.',
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getBlogPosts(locale).slice(0, SITE.NUM_POSTS_ON_HOMEPAGE);
  const projects = getProjects(locale).slice(0, SITE.NUM_PROJECTS_ON_HOMEPAGE);
  const links = createCommonLinks(locale);

  const pageContent = content[locale as keyof typeof content] || content.en;
  const desc = descriptions[locale as keyof typeof descriptions] || descriptions.en;

  return (
    <Container>
      <aside>
        <div className="animate space-y-6 text-center">
          <Image
            src="/me.jpg"
            alt="Daniel Paiva profile picture"
            width={100}
            height={100}
            className="mx-auto h-25 w-25 rounded-full object-cover"
            priority
          />

          <div className="group relative mb-8 overflow-x-auto">
            <div className="xs:text-[7px] min-w-fit select-all whitespace-pre font-mono text-[6px] leading-tight sm:text-[8px] md:text-xs">
              {`██████╗  █████╗ ███╗   ██╗██╗███████╗██╗         ██████╗  █████╗ ██╗██╗   ██╗ █████╗
██╔══██╗██╔══██╗████╗  ██║██║██╔════╝██║         ██╔══██╗██╔══██╗██║██║   ██║██╔══██╗
██║  ██║███████║██╔██╗ ██║██║█████╗  ██║         ██████╔╝███████║██║██║   ██║███████║
██║  ██║██╔══██║██║╚██╗██║██║██╔══╝  ██║         ██╔═══╝ ██╔══██║██║╚██╗ ██╔╝██╔══██║
██████╔╝██║  ██║██║ ╚████║██║███████╗███████╗    ██║     ██║  ██║██║ ╚████╔╝ ██║  ██║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚══════╝╚══════╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝`}
            </div>
          </div>
        </div>

        <div className="space-y-8 sm:space-y-16">
          <section>
            <article className="space-y-4">
              <span className="animate">
                <p dangerouslySetInnerHTML={{ __html: desc.description(links) }} />
              </span>
              <span className="animate">
                <p dangerouslySetInnerHTML={{ __html: desc.education(links) }} />
                <p>{desc.personalNote}</p>
              </span>
            </article>
          </section>

          <section className="animate space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-y-2">
              <h2 className="font-semibold text-black dark:text-white">
                {pageContent.latestPosts}
              </h2>
              <Link
                href="/blog"
                className="inline-block text-current underline decoration-black/30 underline-offset-[3px] transition-colors duration-300 ease-in-out hover:text-black hover:decoration-black/50 focus-visible:text-black focus-visible:decoration-black/50 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white/50 dark:focus-visible:text-white dark:focus-visible:decoration-white/50"
              >
                {pageContent.seeAllPosts}
              </Link>
            </div>
            <ul className="not-prose flex flex-col gap-4">
              {posts.map((post) => (
                <li key={post.slug}>
                  <ArrowCard entry={post} type="blog" />
                </li>
              ))}
            </ul>
          </section>

          <section className="animate space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-y-2">
              <h2 className="font-semibold text-black dark:text-white">
                {pageContent.recentProjects}
              </h2>
              <Link
                href="/projects"
                className="inline-block text-current underline decoration-black/30 underline-offset-[3px] transition-colors duration-300 ease-in-out hover:text-black hover:decoration-black/50 focus-visible:text-black focus-visible:decoration-black/50 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white/50 dark:focus-visible:text-white dark:focus-visible:decoration-white/50"
              >
                {pageContent.seeAllProjects}
              </Link>
            </div>
            <ul className="not-prose flex flex-col gap-4">
              {projects.map((project) => (
                <li key={project.slug}>
                  <ArrowCard entry={project} type="projects" />
                </li>
              ))}
            </ul>
          </section>

          <section className="animate space-y-4">
            <h2 className="font-semibold text-black dark:text-white">
              {pageContent.letsConnect}
            </h2>
            <article>
              <p>{pageContent.contactInfo}</p>
            </article>
            <div className="flex flex-col gap-4">
              <ul className="not-prose flex flex-wrap gap-2">
                <li className="flex gap-x-2 text-nowrap">
                  <a
                    href="javascript:void(0)"
                    data-cal-link={`${CAL_BOOKING.USERNAME}/${CAL_BOOKING.MEETING_SLUG}`}
                    data-cal-config='{"theme":"auto"}'
                    className="inline-block cursor-pointer text-current underline decoration-black/30 underline-offset-[3px] transition-colors duration-300 ease-in-out hover:text-black hover:decoration-black/50 focus-visible:text-black focus-visible:decoration-black/50 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white/50 dark:focus-visible:text-white dark:focus-visible:decoration-white/50"
                  >
                    {pageContent.scheduleMeeting}
                  </a>
                </li>
                {SOCIALS.map((SOCIAL) => (
                  <li key={SOCIAL.NAME} className="flex gap-x-2 text-nowrap">
                    /
                    <a
                      href={SOCIAL.HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${SITE.TITLE} ${locale === 'en' ? 'on' : 'no'} ${SOCIAL.NAME}`}
                      className="inline-block text-current underline decoration-black/30 underline-offset-[3px] transition-colors duration-300 ease-in-out hover:text-black hover:decoration-black/50 focus-visible:text-black focus-visible:decoration-black/50 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white/50 dark:focus-visible:text-white dark:focus-visible:decoration-white/50"
                    >
                      {SOCIAL.NAME}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </aside>
    </Container>
  );
}
