import { Link as IntlLink } from "@/i18n/navigation";

export function ArrowCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <IntlLink
      href={href}
      className="eink-card not-prose group flex flex-nowrap px-4 py-3 pr-10"
    >
      <div className="flex flex-1 flex-col truncate">
        <div className="font-pixel font-medium tracking-tight text-ink-950 dark:text-ink-50">
          {title}
        </div>
        <div className="mt-0.5 text-sm text-ink-600 dark:text-ink-300">
          {description}
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="absolute right-2 top-1/2 size-5 -translate-y-1/2 fill-none stroke-current stroke-2"
      >
        <line
          x1="5"
          y1="12"
          x2="19"
          y2="12"
          className="translate-x-3 scale-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-x-100 group-focus-visible:translate-x-0 group-focus-visible:scale-x-100"
        />
        <polyline
          points="12 5 19 12 12 19"
          className="-translate-x-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-focus-visible:translate-x-0"
        />
      </svg>
    </IntlLink>
  );
}
