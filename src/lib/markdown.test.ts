import { describe, expect, it } from "vitest";

import { getReadingTimeMinutes, getTocHeadingsFromMarkdown } from "@/lib/markdown";

describe("getTocHeadingsFromMarkdown", () => {
  it("extracts heading text, depth, and stable slugs from markdown and mdx", () => {
    const markdown = `
# Title

## Intro

### Deeper Detail

## <span>Wrapped Heading</span>
`;

    expect(getTocHeadingsFromMarkdown(markdown)).toEqual([
      { depth: 2, slug: "intro", text: "Intro" },
      { depth: 3, slug: "deeper-detail", text: "Deeper Detail" },
      { depth: 2, slug: "wrapped-heading", text: "Wrapped Heading" },
    ]);
  });
});

describe("getReadingTimeMinutes", () => {
  it("rounds up markdown reading time to whole minutes", () => {
    const markdown = "word ".repeat(400);

    expect(getReadingTimeMinutes(markdown)).toBe("2");
  });
});
