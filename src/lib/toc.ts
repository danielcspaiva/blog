export type TocHeading = {
  depth: number;
  slug: string;
  text: string;
};

export type TocItem = TocHeading & {
  subheadings: TocItem[];
};

export function buildToc(headings: TocHeading[]): TocItem[] {
  const toc: TocItem[] = [];
  const parentHeadings = new Map<number, TocItem>();

  for (const rawHeading of headings) {
    const heading: TocItem = {
      ...rawHeading,
      subheadings: [],
    };

    parentHeadings.set(heading.depth, heading);

    if (heading.depth === 2) {
      toc.push(heading);
      continue;
    }

    const parentHeading = parentHeadings.get(heading.depth - 1);

    if (parentHeading) {
      parentHeading.subheadings.push(heading);
      continue;
    }

    toc.push(heading);
  }

  return toc;
}
