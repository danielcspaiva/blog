import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { createCommonLinks } from "@/lib/linkUtils";
import { buildMetadata } from "@/lib/metadata";

type Job = {
  company: string;
  companyLink?: string;
  position: string;
  duration: string;
  description: string;
};

const data = (links: ReturnType<typeof createCommonLinks>) => ({
  en: {
    title: "Work experience",
    description: "My professional journey and experience",
    jobs: [
      {
        company: "Quarto à Vista",
        companyLink: links.qavi(),
        position: "CTO",
        duration: "Jul 2021 - Present",
        description:
          "Leading the technology team at a vacation rental management company with over 500 units across three Brazilian states. My role is to develop and implement innovative technological solutions to optimize our operations and customer experience.",
      },
      {
        company: "TC",
        companyLink: links.tc(),
        position: "Developer, Tech Lead and Mobile Lead",
        duration: "Jun 2020 - May 2023",
        description:
          "Started as a Junior Full Stack Developer fixing bugs across React, React Native, and Go services. Promoted to Full Stack Developer, I refactored the chat module and implemented the investment ideas feed. As Tech Lead, I led the Premium user experience team, developing consulting features and report delivery. Finally, as Mobile Lead, I drove initiatives for performance, observability, new features, and business developments like the new checkout.",
      },
      {
        company: "The Brotherhoodie",
        position: "Founder",
        duration: "Sep 2015 - Jan 2020",
        description:
          "Founded a video production company with my college colleague. Some of my responsibilities included: video production for advertising films, events, and weddings; project management (teams, goals, deadlines, and delivery quality); and video capture, editing, and finalization.",
      },
    ] as Job[],
  },
  "pt-br": {
    title: "Experiência",
    description: "Minha jornada profissional e experiência",
    jobs: [
      {
        company: "Quarto à Vista",
        companyLink: links.qavi("Quarto à Vista"),
        position: "CTO",
        duration: "Jul 2021 - Presente",
        description:
          "Lidero o time de tecnologia em uma administradora de aluguel por temporada com mais de 500 unidades em três estados brasileiros. Minha função é desenvolver e implementar soluções tecnológicas inovadoras para otimizar nossas operações e a experiência do cliente.",
      },
      {
        company: "TC",
        companyLink: links.tc(),
        position: "Desenvolvedor, Tech Lead e Mobile Lead",
        duration: "Jun 2020 - Mai 2023",
        description:
          "Iniciei como Desenvolvedor Full Stack Júnior corrigindo bugs em React, React Native e serviços Go. Promovido a Desenvolvedor Full Stack Pleno, refatorei o módulo de chat e implementei o feed de ideias de investimento. Como Tech Lead, liderei a equipe de experiência do usuário Premium, desenvolvendo funcionalidades de consultoria e entrega de relatórios. Por fim, como Mobile Lead, conduzi iniciativas de performance, observabilidade, novas funcionalidades e desenvolvimentos de negócios como o novo checkout.",
      },
      {
        company: "The Brotherhoodie",
        position: "Fundador",
        duration: "Set 2015 - Jan 2020",
        description:
          "Produtora de vídeo que fundei com meu colega de faculdade. Algumas de minhas atribuições: produção de vídeo para filmes publicitários, eventos e casamentos; gestão de projetos (equipes, metas, prazos e qualidade de entrega); e captação, edição e finalização de vídeos.",
      },
    ] as Job[],
  },
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = data(createCommonLinks(locale))[locale as "en" | "pt-br"];
  return buildMetadata({
    locale,
    title: d.title,
    description: d.description,
    path: "/experience",
  });
}

export default async function Experience({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const links = createCommonLinks(locale);
  const d = data(links)[locale as "en" | "pt-br"] ?? data(links).en;

  return (
    <Container>
      <div className="space-y-12">
        <PageHeader
          eyebrow={`${String(d.jobs.length).padStart(2, "0")} ${locale === "pt-br" ? "posições" : "roles"}`}
          title={d.title}
          description={d.description}
        />
        <ol className="animate">
          {d.jobs.map((job, i) => (
            <li key={job.company}>
              {i > 0 ? (
                <span
                  aria-hidden="true"
                  className="dither-rule text-ink my-10"
                />
              ) : null}
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="font-pixel text-ink text-2xl tracking-tight">
                  {job.companyLink ? (
                    <span
                      dangerouslySetInnerHTML={{ __html: job.companyLink }}
                    />
                  ) : (
                    job.company
                  )}
                </h2>
                <span className="eyebrow text-ink-faint shrink-0 text-[0.7rem]">
                  {job.duration}
                </span>
              </div>
              <p className="mt-2">
                <span className="plate">{job.position}</span>
              </p>
              <article className="mt-4">
                <p>{job.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
}
