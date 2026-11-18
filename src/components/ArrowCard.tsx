import { Link as IntlLink } from "@/i18n/navigation";

export function ArrowCard({
  href,
  title,
  description,
  meta,
}: {
  href: string;
  title: string;
  description: string;
  /** Short mono line above the title (date, reading time…). */
  meta?: React.ReactNode;
}) {
  return (
    <IntlLink
      href={href}
      className="card not-prose group flex items-center gap-4 px-4 py-3.5"
    >
      <div className="min-w-0 flex-1">
        {meta ? (
          <div className="eyebrow text-ink-faint mb-1.5 text-[0.65rem]">
            {meta}
          </div>
        ) : null}
        <div className="font-pixel text-ink text-lg leading-snug tracking-tight">
          {title}
        </div>
        <div className="text-ink-muted mt-1 text-sm text-pretty">
          {description}
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="text-ink size-5 shrink-0 fill-none stroke-current stroke-2 [stroke-linecap:square]"
      >
        <line
          x1="5"
          y1="12"
          x2="19"
          y2="12"
          className="translate-x-3 scale-x-0 transition-transform duration-200 ease-out group-hover:translate-x-0 group-hover:scale-x-100 group-focus-visible:translate-x-0 group-focus-visible:scale-x-100"
        />
        <polyline
          points="12 5 19 12 12 19"
          className="-translate-x-1 transition-transform duration-200 ease-out group-hover:translate-x-0 group-focus-visible:translate-x-0"
        />
      </svg>
    </IntlLink>
  );
}
