'use client';

import { useState, useEffect } from 'react';

interface Heading {
  depth: number;
  slug: string;
  text: string;
  subheadings?: Heading[];
}

function buildToc(headings: Heading[]): Heading[] {
  const toc: Heading[] = [];
  const parentHeadings = new Map<number, Heading>();

  headings?.forEach((h) => {
    const heading: Heading = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);

    if (heading.depth === 2) {
      toc.push(heading);
    } else {
      const parent = parentHeadings.get(heading.depth - 1);
      if (parent) {
        if (!parent.subheadings) {
          parent.subheadings = [];
        }
        parent.subheadings.push(heading);
      } else {
        toc.push(heading);
      }
    }
  });

  return toc;
}

function TableOfContentsHeading({ heading }: { heading: Heading }) {
  return (
    <li>
      <a
        href={`#${heading.slug}`}
        className="block px-3 py-1 text-sm underline transition-colors duration-300 ease-in-out hover:bg-black/5 dark:hover:bg-white/5"
      >
        {heading.text}
      </a>
      {heading.subheadings && heading.subheadings.length > 0 && (
        <ul className="ml-4 list-disc">
          {heading.subheadings.map((subheading) => (
            <TableOfContentsHeading key={subheading.slug} heading={subheading} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function TableOfContents() {
  const [isOpen, setIsOpen] = useState(true);
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    // Read headings from the DOM after the article renders
    const article = document.querySelector('article');
    if (!article) return;

    const headingElements = article.querySelectorAll('h2, h3, h4');
    const extractedHeadings: Heading[] = [];

    headingElements.forEach((el) => {
      const depth = parseInt(el.tagName[1]);
      const slug = el.id;
      const text = el.textContent?.replace(/^#\s*/, '') || '';

      if (slug && text) {
        extractedHeadings.push({ depth, slug, text });
      }
    });

    setHeadings(extractedHeadings);
  }, []);

  const toc = buildToc(headings);

  if (toc.length === 0) return null;

  return (
    <details
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
      className="group mb-12 rounded-lg border border-black/15 dark:border-white/20"
    >
      <summary className="cursor-pointer rounded-t-lg px-3 py-1.5 font-medium transition-colors group-open:bg-black/5 hover:bg-black/5 dark:group-open:bg-white/5 hover:dark:bg-white/5">
        Table of Contents
      </summary>
      <nav>
        <ul className="list-disc py-3 pl-6">
          {toc.map((heading) => (
            <TableOfContentsHeading key={heading.slug} heading={heading} />
          ))}
        </ul>
      </nav>
    </details>
  );
}
