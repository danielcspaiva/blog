import { AppLink } from "@/components/AppLink";
import { buildToc, type TocItem, type TocHeading } from "@/lib/toc";

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const toc = buildToc(headings);

  return (
    <details
      className="animate group mb-12 rounded-lg border border-black/15 dark:border-white/20"
      open
    >
      <summary className="cursor-pointer rounded-t-lg px-3 py-1.5 font-medium transition-colors group-open:bg-black/5 hover:bg-black/5 dark:group-open:bg-white/5 hover:dark:bg-white/5">
        Table of Contents
      </summary>
      <nav>
        <ul className="py-3">
          {toc.map((heading) => (
            <TableOfContentsHeading heading={heading} key={`${heading.slug}-${heading.depth}`} />
          ))}
        </ul>
      </nav>
    </details>
  );
}

function TableOfContentsHeading({ heading }: { heading: TocItem }) {
  return (
    <li className="list-inside list-disc px-6 py-1.5 text-sm">
      <AppLink href={`#${heading.slug}`} localize={false}>
        {heading.text}
      </AppLink>
      {heading.subheadings.length > 0 ? (
        <ul className="translate-x-3">
          {heading.subheadings.map((subheading) => (
            <TableOfContentsHeading
              heading={subheading}
              key={`${subheading.slug}-${subheading.depth}`}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
