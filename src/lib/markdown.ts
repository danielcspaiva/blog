import GithubSlugger from "github-slugger";
import readingTime from "reading-time";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";

import type { TocHeading } from "@/lib/toc";

type MdxNode = {
  children?: MdxNode[];
  type: string;
  value?: string;
};

function getNodeText(node: MdxNode): string {
  if (typeof node.value === "string") {
    return node.value;
  }

  return (node.children ?? []).map((child) => getNodeText(child)).join("");
}

export function getTocHeadingsFromMarkdown(markdown: string): TocHeading[] {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(markdown);
  const slugger = new GithubSlugger();
  const headings: TocHeading[] = [];

  visit(tree, "heading", (node) => {
    if (node.depth < 2) {
      return;
    }

    const text = getNodeText(node as unknown as MdxNode).trim();

    if (!text) {
      return;
    }

    headings.push({
      depth: node.depth,
      slug: slugger.slug(text),
      text,
    });
  });

  return headings;
}

export function getReadingTimeMinutes(markdown: string): string {
  return Math.max(1, Math.ceil(readingTime(markdown).minutes)).toString();
}
