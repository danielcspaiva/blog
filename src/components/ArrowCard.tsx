import type { ReactNode } from "react";

import { AppLink } from "@/components/AppLink";
import type { SiteEntry } from "@/lib/content-source";
import type { Locale } from "@/lib/i18n";

type Props = {
  entry: Pick<SiteEntry, "collection" | "description" | "slug" | "title">;
  locale: Locale;
};

function getHref(entry: Pick<SiteEntry, "collection" | "slug">) {
  return entry.collection === "blog" ? `/blog/${entry.slug}` : `/projects/${entry.slug}`;
}

export function ArrowCard({ entry, locale }: Props) {
  return (
    <AppLink
      className="not-prose group relative flex flex-nowrap rounded-lg border border-black/15 px-4 py-3 pr-10 no-underline transition-colors duration-300 ease-in-out hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white"
      href={getHref(entry)}
      locale={locale}
      underline={false}
    >
      <div className="flex flex-1 flex-col truncate">
        <div className="font-semibold">{entry.title}</div>
        <div className="text-sm">{entry.description}</div>
      </div>
      <ArrowIcon />
    </AppLink>
  );
}

function ArrowIcon(): ReactNode {
  return (
    <svg
      className="absolute top-1/2 right-2 size-5 -translate-y-1/2 fill-none stroke-current stroke-2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        className="translate-x-3 scale-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-x-100 group-focus-visible:translate-x-0 group-focus-visible:scale-x-100"
        x1="5"
        x2="19"
        y1="12"
        y2="12"
      ></line>
      <polyline
        className="-translate-x-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-focus-visible:translate-x-0"
        points="12 5 19 12 12 19"
      ></polyline>
    </svg>
  );
}
