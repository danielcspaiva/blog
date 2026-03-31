import Image from "next/image";
import { notFound } from "next/navigation";

import { ArrowCard } from "@/components/ArrowCard";
import { AppLink } from "@/components/AppLink";
import { Container } from "@/components/Container";
import { getBlogEntriesByLocale, getProjectEntriesByLocale } from "@/lib/content-source";
import { isLocale, type Locale } from "@/lib/i18n";
import { createCommonLinks } from "@/lib/linkUtils";
import { createMetadata, getPageMetadata, CAL_BOOKING, SITE, SOCIALS } from "@/lib/site";

const content = {
  en: {
    contactInfo:
      "Feel free to reach out if you want to chat about tech, share ideas, or just say hello.",
    description:
      "I work as CTO at {{qavi}}, managing vacation rentals across Brazil. Previously at {{tc}}, I worked as a Developer, Mobile Lead and Tech Lead. {{experience}}.",
    education:
      "My background is in Civil Engineering from {{ufrn}} (with an exchange at {{uiuc}}). I then transitioned to software development via {{ironhack}}'s bootcamp.",
    latestPosts: "Latest posts",
    letsConnect: "Let's Connect",
    personalNote:
      "I'm passionate about startups and entrepreneurship. Love building with TypeScript, React, React Native, and Next.js.",
    recentProjects: "Recent Projects",
    scheduleMeeting: "Schedule a Meeting",
    seeAllPosts: "See all posts",
    seeAllProjects: "See all projects",
    title: "Hi, I'm Daniel 👋",
  },
  "pt-br": {
    contactInfo:
      "Sinta-se à vontade para entrar em contato se quiser conversar sobre tecnologia, compartilhar ideias ou apenas dizer olá.",
    description:
      "Sou CTO na {{qavi}}, onde estamos reinventando o turismo através do ecossistema de aluguel por temporada no Brasil. Anteriormente na {{tc}}, trabalhei como Desenvolvedor, Tech Lead e Mobile Lead. {{experience}}.",
    education:
      "Minha formação é em Engenharia Civil pela {{ufrn}} (com intercâmbio na {{uiuc}}). Depois, transitei para o desenvolvimento de software pelo bootcamp da {{ironhack}}.",
    latestPosts: "Últimos posts",
    letsConnect: "Vamos nos conectar",
    personalNote:
      "Sou interessado por startups e empreendedorismo. Entusiasta do ecossistema TypeScript, costumo construir com React, React Native e Next.js.",
    recentProjects: "Projetos Recentes",
    scheduleMeeting: "Agendar uma Reunião",
    seeAllPosts: "Ver todos os posts",
    seeAllProjects: "Ver todos os projetos",
    title: "Olá, sou Daniel 👋",
  },
} as const;

function injectLinks(template: string, locale: Locale) {
  const links = createCommonLinks(locale);

  return template
    .replace("{{qavi}}", links.qavi(locale === "pt-br" ? "Quarto à Vista" : "Qavi"))
    .replace("{{tc}}", links.tc())
    .replace(
      "{{experience}}",
      links.experience(
        locale === "pt-br"
          ? "Saiba mais sobre minha experiência"
          : "Learn more about my experience",
      ),
    )
    .replace("{{ufrn}}", links.ufrn())
    .replace("{{uiuc}}", links.uiuc())
    .replace("{{ironhack}}", links.ironhack());
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const pageMetadata = getPageMetadata("home", locale);

  return createMetadata({
    description: pageMetadata.description,
    image: `/open-graph/site/${locale}/home`,
    locale,
    pathname: `/${locale}`,
    title: pageMetadata.title,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const pageContent = content[locale];
  const blog = getBlogEntriesByLocale(locale).slice(0, SITE.numPostsOnHomepage);
  const projects = getProjectEntriesByLocale(locale).slice(0, SITE.numProjectsOnHomepage);

  return (
    <Container>
      <aside>
        <div className="space-y-8 sm:space-y-16">
          <section>
            <article className="space-y-4">
              <div className="animate space-y-6 text-center">
                <Image
                  alt="Daniel Paiva profile picture"
                  className="mx-auto h-25 w-25 rounded-full object-cover"
                  height={100}
                  loading="eager"
                  priority
                  src="/me.jpg"
                  width={100}
                />
                <div className="group relative mb-8 overflow-x-auto">
                  <pre className="xs:text-[7px] md:text-xxs min-w-fit font-mono text-[6px] leading-tight whitespace-pre select-all sm:text-[8px]">
                    {`██████╗  █████╗ ███╗   ██╗██╗███████╗██╗         ██████╗  █████╗ ██╗██╗   ██╗ █████╗ 
██╔══██╗██╔══██╗████╗  ██║██║██╔════╝██║         ██╔══██╗██╔══██╗██║██║   ██║██╔══██╗
██║  ██║███████║██╔██╗ ██║██║█████╗  ██║         ██████╔╝███████║██║██║   ██║███████║
██║  ██║██╔══██║██║╚██╗██║██║██╔══╝  ██║         ██╔═══╝ ██╔══██║██║╚██╗ ██╔╝██╔══██║
██████╔╝██║  ██║██║ ╚████║██║███████╗███████╗    ██║     ██║  ██║██║ ╚████╔╝ ██║  ██║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚══════╝╚══════╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝`}
                  </pre>
                </div>
              </div>
              <span className="animate">
                <p
                  dangerouslySetInnerHTML={{ __html: injectLinks(pageContent.description, locale) }}
                />
              </span>
              <span className="animate">
                <p
                  dangerouslySetInnerHTML={{ __html: injectLinks(pageContent.education, locale) }}
                />
                <p>{pageContent.personalNote}</p>
              </span>
            </article>
          </section>

          <section className="animate space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-y-2">
              <h2 className="font-semibold text-black dark:text-white">
                {pageContent.latestPosts}
              </h2>
              <AppLink href="/blog" locale={locale}>
                {pageContent.seeAllPosts}
              </AppLink>
            </div>
            <ul className="not-prose flex flex-col gap-4">
              {blog.map((post) => (
                <li key={post.id}>
                  <ArrowCard entry={post} locale={locale} />
                </li>
              ))}
            </ul>
          </section>

          <section className="animate space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-y-2">
              <h2 className="font-semibold text-black dark:text-white">
                {pageContent.recentProjects}
              </h2>
              <AppLink href="/projects" locale={locale}>
                {pageContent.seeAllProjects}
              </AppLink>
            </div>
            <ul className="not-prose flex flex-col gap-4">
              {projects.map((project) => (
                <li key={project.id}>
                  <ArrowCard entry={project} locale={locale} />
                </li>
              ))}
            </ul>
          </section>

          <section className="animate space-y-4">
            <h2 className="font-semibold text-black dark:text-white">{pageContent.letsConnect}</h2>
            <article>
              <p>{pageContent.contactInfo}</p>
            </article>
            <div className="flex flex-col gap-4">
              <ul className="not-prose flex flex-wrap gap-2">
                <li className="flex gap-x-2 text-nowrap">
                  <a
                    className="inline-block cursor-pointer text-current underline decoration-black/30 underline-offset-[3px] transition-colors duration-300 ease-in-out hover:text-black hover:decoration-black/50 focus-visible:text-black focus-visible:decoration-black/50 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white/50 dark:focus-visible:text-white dark:focus-visible:decoration-white/50"
                    data-cal-config='{"theme":"auto"}'
                    data-cal-link={`${CAL_BOOKING.username}/${CAL_BOOKING.meetingSlug}`}
                    href={`https://cal.com/${CAL_BOOKING.username}/${CAL_BOOKING.meetingSlug}`}
                  >
                    {pageContent.scheduleMeeting}
                  </a>
                </li>
                {SOCIALS.map((social) => (
                  <li className="flex gap-x-2 text-nowrap" key={social.name}>
                    /
                    <AppLink external href={social.href}>
                      {social.name}
                    </AppLink>
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
