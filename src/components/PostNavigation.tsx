import { AppLink } from "@/components/AppLink";
import type { SiteEntry } from "@/lib/content-source";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  nextPost: SiteEntry | null;
  prevPost: SiteEntry | null;
};

function getHref(entry: SiteEntry) {
  return `/${entry.collection === "blog" ? "blog" : "projects"}/${entry.slug}`;
}

export function PostNavigation({ locale, nextPost, prevPost }: Props) {
  return (
    <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
      {prevPost ? (
        <AppLink
          className="group relative flex flex-nowrap rounded-lg border border-black/15 px-4 py-3 pl-10 no-underline transition-colors duration-300 ease-in-out hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white"
          href={getHref(prevPost)}
          locale={locale}
          underline={false}
        >
          <svg
            className="absolute top-1/2 left-2 size-5 -translate-y-1/2 fill-none stroke-current stroke-2"
            viewBox="0 0 24 24"
          >
            <line
              className="translate-x-3 scale-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-x-100 group-focus-visible:translate-x-0 group-focus-visible:scale-x-100"
              x1="5"
              x2="19"
              y1="12"
              y2="12"
            />
            <polyline
              className="translate-x-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-focus-visible:translate-x-0"
              points="12 5 5 12 12 19"
            />
          </svg>
          <div className="flex items-center text-sm">{prevPost.title}</div>
        </AppLink>
      ) : (
        <div className="invisible" />
      )}

      {nextPost ? (
        <AppLink
          className="group relative flex grow flex-row-reverse flex-nowrap rounded-lg border border-black/15 px-4 py-4 pr-10 no-underline transition-colors duration-300 ease-in-out hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white"
          href={getHref(nextPost)}
          locale={locale}
          underline={false}
        >
          <svg
            className="absolute top-1/2 right-2 size-5 -translate-y-1/2 fill-none stroke-current stroke-2"
            viewBox="0 0 24 24"
          >
            <line
              className="translate-x-3 scale-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-x-100 group-focus-visible:translate-x-0 group-focus-visible:scale-x-100"
              x1="5"
              x2="19"
              y1="12"
              y2="12"
            />
            <polyline
              className="-translate-x-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-focus-visible:translate-x-0"
              points="12 5 19 12 12 19"
            />
          </svg>
          <div className="flex items-center text-sm">{nextPost.title}</div>
        </AppLink>
      ) : (
        <div className="invisible" />
      )}
    </div>
  );
}
