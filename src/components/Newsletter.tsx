import { Container } from "@/components/Container";
import type { Locale } from "@/lib/i18n";

const content = {
  en: {
    buttonText: "Subscribe",
    description: "Get notified when I publish new articles. No spam, unsubscribe anytime.",
    placeholder: "Enter your email",
    title: "Subscribe to my newsletter",
  },
  "pt-br": {
    buttonText: "Inscrever-se",
    description:
      "Seja notificado quando eu publicar novos artigos. Sem spam, cancele a inscrição a qualquer momento.",
    placeholder: "Digite seu email",
    title: "Inscreva-se na minha newsletter",
  },
} as const;

export function Newsletter({ locale }: { locale: Locale }) {
  const pageContent = content[locale];

  return (
    <Container>
      <aside className="mt-4">
        <h2 className="animate font-semibold text-black dark:text-white">{pageContent.title}</h2>
        <div className="space-y-8">
          <article className="space-y-4">
            <p className="animate">{pageContent.description}</p>
          </article>
          <form
            action="https://buttondown.com/api/emails/embed-subscribe/danielcspaiva"
            className="animate flex flex-col gap-4 sm:flex-row"
            method="post"
            target="popupwindow"
          >
            <input
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-gray-400"
              id="bd-email"
              name="email"
              placeholder={pageContent.placeholder}
              required
              type="email"
            />
            <button
              className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors duration-300 ease-in-out hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-gray-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white"
              type="submit"
            >
              {pageContent.buttonText}
            </button>
          </form>
        </div>
      </aside>
    </Container>
  );
}
