import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { Link } from "@/components/Link";
import { ArrowCard } from "@/components/ArrowCard";
import { SectionHead } from "@/components/SectionHead";
import { DitherField } from "@/components/DitherField";
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
    roles: ["CTO", "Builder", "Writer"],
    portraitAlt: "Daniel Paiva, dithered portrait",
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
    roles: ["CTO", "Builder", "Writer"],
    portraitAlt: "Daniel Paiva, retrato em dithering",
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
    <>
      <section className="relative -mt-28 overflow-hidden sm:-mt-36">
        <DitherField portraitSrc="/images/portrait-tone.jpg" />
        <Container>
          {/* Masthead: name set low on the left, portrait off to the right
              where its dark backdrop runs into the dense end of the field. */}
          <div className="relative flex items-end justify-between pt-20 pb-14 sm:pt-[5.5rem] sm:pb-16">
            <div className="min-w-0 pb-3 sm:pb-6">
              {/* DitherField prints these two lines as dithered letterforms. */}
              <h1 className="text-ink text-[clamp(2.6rem,13vw,5.5rem)] leading-[0.86] font-black tracking-[-0.015em] uppercase">
                <span data-dither-text className="block w-fit">
                  Daniel
                </span>{" "}
                <span data-dither-text className="block w-fit">
                  Paiva
                </span>
              </h1>
              <p className="mt-5 flex flex-wrap gap-1.5">
                {c.roles.map((role) => (
                  <span key={role} className="plate">
                    {role}
                  </span>
                ))}
              </p>
            </div>
            {/* The portrait is not an <img>: DitherField prints the photo's
                tones into this box with the same dots as the field. */}
            <div
              data-dither-portrait
              role="img"
              aria-label={c.portraitAlt}
              className="-mr-6 size-[46vw] max-h-[290px] max-w-[290px] shrink-0 sm:-mr-16"
            >
              <noscript>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/portrait-dither-light.png"
                  alt=""
                  width={340}
                  height={340}
                  className="size-full dark:hidden"
                  style={{ imageRendering: "pixelated" }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/portrait-dither-dark.png"
                  alt=""
                  width={340}
                  height={340}
                  className="hidden size-full dark:block"
                  style={{ imageRendering: "pixelated" }}
                />
              </noscript>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-14 sm:space-y-20">
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

          <section className="animate space-y-6">
            <SectionHead title={c.latestPosts}>
              <Link
                href="/blog"
                underline={false}
                className="hover:bg-ink hover:text-paper"
              >
                {c.seeAllPosts} →
              </Link>
            </SectionHead>
            <ul className="not-prose flex flex-col gap-5">
              {posts.map((post) => (
                <li key={post.slug}>
                  <ArrowCard
                    href={`/blog/${post.slug}`}
                    title={post.title}
                    description={post.description}
                    meta={
                      <>
                        {formatStamp(post.date)}
                        <span className="px-1.5">·</span>
                        {post.readingTime} min
                      </>
                    }
                  />
                </li>
              ))}
            </ul>
          </section>

          <section className="animate space-y-6">
            <SectionHead title={c.recentProjects}>
              <Link
                href="/projects"
                underline={false}
                className="hover:bg-ink hover:text-paper"
              >
                {c.seeAllProjects} →
              </Link>
            </SectionHead>
            <ul className="not-prose flex flex-col gap-5">
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
          </section>

          <section className="animate space-y-6">
            <SectionHead title={c.letsConnect} />
            <p className="text-pretty">{c.contactInfo}</p>
            <ul className="not-prose flex flex-wrap gap-x-3 gap-y-3.5">
              <li>
                <button
                  type="button"
                  data-cal-link={`${CAL_BOOKING.USERNAME}/${CAL_BOOKING.MEETING_SLUG}`}
                  data-cal-config='{"theme":"auto"}'
                  className="btn btn-solid"
                >
                  {c.scheduleMeeting}
                </button>
              </li>
              {SOCIALS.map((social) => (
                <li key={social.NAME}>
                  <a
                    href={social.HREF}
                    target={
                      social.HREF.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel="noopener noreferrer"
                    aria-label={`${SITE.TITLE} ${locale === "en" ? "on" : "no"} ${social.NAME}`}
                    className="btn"
                  >
                    {social.NAME}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </>
  );
}
