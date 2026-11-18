export type TocEntry = { title: string; url: string; items: TocEntry[] };

function TocItems({ items, nested }: { items: TocEntry[]; nested?: boolean }) {
  return (
    <ol
      className={
        nested ? "mt-1.5 space-y-1.5 pl-5" : "toc space-y-1.5 px-4 py-4"
      }
    >
      {items.map((item) => (
        <li key={item.url} className="text-sm">
          <a href={item.url} className="link w-fit">
            {item.title}
          </a>
          {item.items?.length ? <TocItems items={item.items} nested /> : null}
        </li>
      ))}
    </ol>
  );
}

const labels = {
  en: "Contents",
  "pt-br": "Conteúdo",
} as const;

export function TableOfContents({
  toc,
  locale = "en",
}: {
  toc: TocEntry[];
  locale?: string;
}) {
  if (!toc?.length) return null;
  return (
    <details open className="animate group border-ink mb-12 border">
      <summary className="text-ink hover:bg-ink hover:text-paper group-open:border-ink flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-2 font-mono text-xs tracking-[0.16em] uppercase group-open:border-b [&::-webkit-details-marker]:hidden">
        {labels[locale as keyof typeof labels] ?? labels.en}
        <span aria-hidden="true" className="group-open:hidden">
          +
        </span>
        <span aria-hidden="true" className="hidden group-open:inline">
          −
        </span>
      </summary>
      <nav>
        <TocItems items={toc} />
      </nav>
    </details>
  );
}
