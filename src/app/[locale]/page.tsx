import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { Link } from "@/components/Link";
import { ArrowCard } from "@/components/ArrowCard";
import {
  SITE,
  HOME,
  SOCIALS,
  CAL_BOOKING,
  getLocalizedMetadata,
} from "@/consts";
import { getPosts, getProjects } from "@/lib/content";
import { createCommonLinks } from "@/lib/linkUtils";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = getLocalizedMetadata(HOME, locale as keyof typeof HOME);
  return buildMetadata({
    locale,
    title: m.TITLE,
    description: m.DESCRIPTION,
    path: "/",
  });
}

const copy = (links: ReturnType<typeof createCommonLinks>) => ({
  en: {
    description: `I work as CTO at ${links.qavi()}, managing vacation rentals across Brazil. Previously at ${links.tc()}, I worked as a Developer, Mobile Lead and Tech Lead. ${links.experience("Learn more about my experience")}.`,
    education: `My background is in Civil Engineering from ${links.ufrn()} (with an exchange at ${links.uiuc()}). I then transitioned to software development via ${links.ironhack()}'s bootcamp.`,
    personalNote:
      "I'm passionate about startups and entrepreneurship. Love building with TypeScript, React, React Native, and Next.js.",
    latestPosts: "Latest posts",
    seeAllPosts: "See all posts",
    letsConnect: "Let's Connect",
    contactInfo:
      "Feel free to reach out if you want to chat about tech, share ideas, or just say hello.",
    scheduleMeeting: "Schedule a Meeting",
    recentProjects: "Recent Projects",
    seeAllProjects: "See all projects",
  },
  "pt-br": {
    description: `Sou CTO na ${links.qavi("Quarto à Vista")}, onde estamos reinventando o turismo através do ecossistema de aluguel por temporada no Brasil. Anteriormente na ${links.tc()}, trabalhei como Desenvolvedor, Tech Lead e Mobile Lead. ${links.experience("Saiba mais sobre minha experiência")}.`,
    education: `Minha formação é em Engenharia Civil pela ${links.ufrn()} (com intercâmbio na ${links.uiuc()}). Depois, transitei para o desenvolvimento de software pelo bootcamp da ${links.ironhack()}.`,
    personalNote:
      "Sou interessado por startups e empreendedorismo. Entusiasta do ecossistema TypeScript, costumo construir com React, React Native e Next.js.",
    latestPosts: "Últimos posts",
    seeAllPosts: "Ver todos os posts",
    letsConnect: "Vamos nos conectar",
    contactInfo:
      "Sinta-se à vontade para entrar em contato se quiser conversar sobre tecnologia, compartilhar ideias ou apenas dizer olá.",
    scheduleMeeting: "Agendar uma Reunião",
    recentProjects: "Projetos Recentes",
    seeAllProjects: "Ver todos os projetos",
  },
});

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getPosts(locale).slice(0, SITE.NUM_POSTS_ON_HOMEPAGE);
  const projects = getProjects(locale).slice(0, SITE.NUM_PROJECTS_ON_HOMEPAGE);
  const links = createCommonLinks(locale);
  const c = copy(links)[locale as "en" | "pt-br"] ?? copy(links).en;

  return (
    <Container>
      <aside>
        <div className="animate flex flex-col items-center text-center">
          <figure className="flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/me-dither-light.png"
              alt="Daniel Paiva, dithered portrait"
              width={460}
              height={460}
              className="block size-44 sm:size-48 dark:hidden"
              style={{ imageRendering: "pixelated" }}
              loading="eager"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/me-dither-dark.png"
              alt="Daniel Paiva, dithered portrait"
              width={460}
              height={460}
              className="hidden size-44 sm:size-48 dark:block"
              style={{ imageRendering: "pixelated" }}
              loading="eager"
            />
          </figure>
          <h1 className="wordmark mt-3 whitespace-nowrap text-[clamp(1.75rem,8.5vw,2.5rem)] leading-[0.95] tracking-tight text-ink-950 sm:text-6xl md:text-7xl dark:text-ink-50">
            DANIEL PAIVA
          </h1>
          <p className="eyebrow mt-4 text-xs text-ink-600 dark:text-ink-300">
            CTO&nbsp;·&nbsp;Builder&nbsp;·&nbsp;Writer
          </p>
        </div>

        <div className="space-y-8 sm:space-y-16">
          <section>
            <article className="space-y-4">
              <span className="animate">
                <p dangerouslySetInnerHTML={{ __html: c.description }} />
              </span>
              <span className="animate">
                <p dangerouslySetInnerHTML={{ __html: c.education }} />
                <p>{c.personalNote}</p>
              </span>
            </article>
          </section>

          <section className="animate space-y-5">
            <div className="hr-eink flex items-baseline justify-between gap-y-2 border-t pt-4">
              <h2 className="eyebrow text-xs text-ink-700 dark:text-ink-200">
                {c.latestPosts}
              </h2>
              <span className="eyebrow text-[0.7rem] text-ink-500 dark:text-ink-400">
                <Link href="/blog">{c.seeAllPosts} →</Link>
              </span>
            </div>
            <ul className="not-prose flex flex-col gap-4">
              {posts.map((post) => (
                <li key={post.slug}>
                  <ArrowCard
                    href={`/blog/${post.slug}`}
                    title={post.title}
                    description={post.description}
                  />
                </li>
              ))}
            </ul>
          </section>

          <section className="animate space-y-5">
            <div className="hr-eink flex items-baseline justify-between gap-y-2 border-t pt-4">
              <h2 className="eyebrow text-xs text-ink-700 dark:text-ink-200">
                {c.recentProjects}
              </h2>
              <span className="eyebrow text-[0.7rem] text-ink-500 dark:text-ink-400">
                <Link href="/projects">{c.seeAllProjects} →</Link>
              </span>
            </div>
            <ul className="not-prose flex flex-col gap-4">
              {projects.map((project) => (
                <li key={project.slug}>
                  <ArrowCard
                    href={`/projects/${project.slug}`}
                    title={project.title}
                    description={project.description}
                  />
                </li>
              ))}
            </ul>
          </section>

          <section className="animate space-y-4">
            <div className="hr-eink border-t pt-4">
              <h2 className="eyebrow text-xs text-ink-700 dark:text-ink-200">
                {c.letsConnect}
              </h2>
            </div>
            <article>
              <p>{c.contactInfo}</p>
            </article>
            <div className="flex flex-col gap-4">
              <ul className="not-prose flex flex-wrap gap-2">
                <li className="flex gap-x-2 text-nowrap">
                  <button
                    type="button"
                    data-cal-link={`${CAL_BOOKING.USERNAME}/${CAL_BOOKING.MEETING_SLUG}`}
                    data-cal-config='{"theme":"auto"}'
                    className="inline-block cursor-pointer text-current underline decoration-black/30 underline-offset-[3px] transition-colors duration-300 ease-in-out hover:text-black hover:decoration-black/50 focus-visible:text-black focus-visible:decoration-black/50 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white/50 dark:focus-visible:text-white dark:focus-visible:decoration-white/50"
                  >
                    {c.scheduleMeeting}
                  </button>
                </li>
                {SOCIALS.map((social) => (
                  <li key={social.NAME} className="flex gap-x-2 text-nowrap">
                    {"/"}
                    <Link
                      href={social.HREF}
                      external
                      aria-label={`${SITE.TITLE} ${locale === "en" ? "on" : "no"} ${social.NAME}`}
                    >
                      {social.NAME}
                    </Link>
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
