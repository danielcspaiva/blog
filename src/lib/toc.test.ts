import { describe, expect, it } from "vitest";

import { buildToc } from "@/lib/toc";

describe("buildToc", () => {
  it("nests headings beneath the previous depth-2 heading", () => {
    expect(
      buildToc([
        { depth: 2, slug: "intro", text: "Intro" },
        { depth: 3, slug: "detail", text: "Detail" },
        { depth: 2, slug: "next", text: "Next" },
      ]),
    ).toEqual([
      {
        depth: 2,
        slug: "intro",
        subheadings: [
          {
            depth: 3,
            slug: "detail",
            subheadings: [],
            text: "Detail",
          },
        ],
        text: "Intro",
      },
      {
        depth: 2,
        slug: "next",
        subheadings: [],
        text: "Next",
      },
    ]);
  });

  it("treats orphaned deeper headings as top-level items", () => {
    expect(buildToc([{ depth: 3, slug: "orphan", text: "Orphan" }])).toEqual([
      {
        depth: 3,
        slug: "orphan",
        subheadings: [],
        text: "Orphan",
      },
    ]);
  });
});
