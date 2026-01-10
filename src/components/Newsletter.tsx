'use client';

import { useLocale } from 'next-intl';
import Container from './Container';

const content = {
  en: {
    title: 'Subscribe to my newsletter',
    description:
      'Get notified when I publish new articles. No spam, unsubscribe anytime.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
  },
  'pt-br': {
    title: 'Inscreva-se na minha newsletter',
    description:
      'Seja notificado quando eu publicar novos artigos. Sem spam, cancele a inscrição a qualquer momento.',
    placeholder: 'Digite seu email',
    buttonText: 'Inscrever-se',
  },
};

export default function Newsletter() {
  const locale = useLocale() as keyof typeof content;
  const pageContent = content[locale] || content.en;

  return (
    <Container>
      <aside className="mt-4">
        <h2 className="animate font-semibold text-black dark:text-white">
          {pageContent.title}
        </h2>
        <div className="space-y-8">
          <article className="space-y-4">
            <p className="animate">{pageContent.description}</p>
          </article>
          <form
            className="animate flex flex-col gap-4 sm:flex-row"
            action="https://buttondown.com/api/emails/embed-subscribe/danielcspaiva"
            method="post"
            target="popupwindow"
            onSubmit={() =>
              window.open(
                'https://buttondown.com/danielcspaiva',
                'popupwindow'
              )
            }
          >
            <input
              type="email"
              name="email"
              id="bd-email"
              placeholder={pageContent.placeholder}
              required
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-gray-400"
            />
            <button
              type="submit"
              className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors duration-300 ease-in-out hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-gray-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white"
            >
              {pageContent.buttonText}
            </button>
          </form>
        </div>
      </aside>
    </Container>
  );
}
