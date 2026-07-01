export type TocEntry = { title: string; url: string; items: TocEntry[] };

function TocItems({ items, nested }: { items: TocEntry[]; nested?: boolean }) {
  return (
    <ul className={nested ? "translate-x-3" : "py-3"}>
      {items.map((item) => (
        <li key={item.url} className="list-inside list-disc px-6 py-1.5 text-sm">
          <a
            href={item.url}
            className="underline decoration-black/30 underline-offset-[3px] transition-colors duration-300 ease-in-out hover:text-black hover:decoration-black/50 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white/50"
          >
            {item.title}
          </a>
          {item.items?.length ? <TocItems items={item.items} nested /> : null}
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  if (!toc?.length) return null;
  return (
    <details
      open
      className="animate group mb-12 rounded-[2px] border border-ink-950/22 dark:border-ink-50/18"
    >
      <summary className="cursor-pointer rounded-t-lg px-3 py-1.5 font-medium transition-colors group-open:bg-black/5 hover:bg-black/5 dark:group-open:bg-white/5 hover:dark:bg-white/5">
        Table of Contents
      </summary>
      <nav>
        <TocItems items={toc} />
      </nav>
    </details>
  );
}
