"use client";

import { Container } from "@/components/Container";

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
      <aside className="mt-4 space-y-5">
        <div className="hr-eink animate border-t pt-4">
          <h2 className="eyebrow text-xs text-ink-700 dark:text-ink-200">
            {pageContent.title}
          </h2>
        </div>
        <div className="space-y-6">
          <article className="space-y-4">
            <p className="animate text-ink-600 dark:text-ink-300">
              {pageContent.description}
            </p>
          </article>
          <form
            className="animate flex flex-col gap-3 sm:flex-row"
            action="https://buttondown.com/api/emails/embed-subscribe/danielcspaiva"
            method="post"
            target="popupwindow"
            onSubmit={() =>
              window.open("https://buttondown.com/danielcspaiva", "popupwindow")
            }
          >
            <input
              type="email"
              name="email"
              id="bd-email"
              placeholder={pageContent.placeholder}
              required
              className="flex-1 rounded-[2px] border border-ink-950/25 bg-transparent px-4 py-2 font-mono text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-ink-950 focus:outline-none dark:border-ink-50/25 dark:text-ink-50 dark:placeholder:text-ink-500 dark:focus:border-ink-50"
            />
            <button
              type="submit"
              className="eyebrow rounded-[2px] border border-ink-950 bg-ink-950 px-6 py-2 text-xs text-ink-50 transition-colors duration-200 ease-out hover:bg-transparent hover:text-ink-950 focus-visible:bg-transparent focus-visible:text-ink-950 dark:border-ink-50 dark:bg-ink-50 dark:text-ink-950 dark:hover:bg-transparent dark:hover:text-ink-50 dark:focus-visible:bg-transparent dark:focus-visible:text-ink-50"
            >
              {pageContent.buttonText}
            </button>
          </form>
        </div>
      </aside>
    </Container>
  );
}
