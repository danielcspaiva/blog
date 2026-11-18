"use client";

import { Container } from "@/components/Container";
import { SectionHead } from "@/components/SectionHead";

const content = {
  en: {
    title: "Subscribe to my newsletter",
    description:
      "Get notified when I publish new articles. No spam, unsubscribe anytime.",
    placeholder: "Enter your email",
    buttonText: "Subscribe",
  },
  "pt-br": {
    title: "Inscreva-se na minha newsletter",
    description:
      "Seja notificado quando eu publicar novos artigos. Sem spam, cancele a inscrição a qualquer momento.",
    placeholder: "Digite seu email",
    buttonText: "Inscrever-se",
  },
} as const;

export function Newsletter({ locale = "en" }: { locale?: string }) {
  const pageContent = content[locale as keyof typeof content] ?? content.en;

  return (
    <Container>
      <aside className="animate space-y-6">
        <SectionHead title={pageContent.title} />
        <p className="text-ink-muted text-pretty">{pageContent.description}</p>
        <form
          className="flex flex-col gap-4 sm:flex-row sm:gap-3"
          action="https://buttondown.com/api/emails/embed-subscribe/danielcspaiva"
          method="post"
          target="popupwindow"
          onSubmit={() =>
            window.open("https://buttondown.com/danielcspaiva", "popupwindow")
          }
        >
          <label htmlFor="bd-email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="bd-email"
            placeholder={pageContent.placeholder}
            required
            className="border-ink bg-paper-2 text-ink placeholder:text-ink-faint focus:bg-paper focus:outline-ink min-w-0 flex-1 rounded-none border px-3.5 py-2 font-mono text-sm focus:outline-2 focus:outline-offset-2"
          />
          <button type="submit" className="btn btn-solid mr-[3px] sm:mr-0">
            {pageContent.buttonText}
          </button>
        </form>
      </aside>
    </Container>
  );
}
