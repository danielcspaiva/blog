import { Link as IntlLink } from "@/i18n/navigation";

type Adjacent = { title: string; href: string } | undefined;

export function PostNavigation({
  prev,
  next,
}: {
  prev?: Adjacent;
  next?: Adjacent;
}) {
  return (
    <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
      {prev ? (
        <IntlLink
          href={prev.href}
          className="eink-card group flex flex-nowrap px-4 py-3 pl-10 no-underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="absolute left-2 top-1/2 size-5 -translate-y-1/2 fill-none stroke-current stroke-2"
          >
            <line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
              className="translate-x-3 scale-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-x-100 group-focus-visible:translate-x-0 group-focus-visible:scale-x-100"
            />
            <polyline
              points="12 5 5 12 12 19"
              className="translate-x-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-focus-visible:translate-x-0"
            />
          </svg>
          <div className="flex items-center text-sm">{prev.title}</div>
        </IntlLink>
      ) : (
        <div className="invisible" />
      )}

      {next ? (
        <IntlLink
          href={next.href}
          className="eink-card group flex grow flex-row-reverse flex-nowrap px-4 py-4 pr-10 no-underline"
        >
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
          <div className="flex items-center text-sm">{next.title}</div>
        </IntlLink>
      ) : (
        <div className="invisible" />
      )}
    </div>
  );
}
