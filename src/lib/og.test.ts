import { describe, expect, it } from "vitest";

import type { Locale } from "@/lib/i18n";
import { getEntryOpenGraphData, getSiteOpenGraphData } from "@/lib/og";

describe("getSiteOpenGraphData", () => {
  it("returns localized metadata for top-level site pages", () => {
    expect(getSiteOpenGraphData("blog", "pt-br")).toEqual({
      description: "Uma coleção de artigos sobre tópicos que me interessam.",
      title: "Blog | Daniel Paiva",
    });
  });
});

describe("getEntryOpenGraphData", () => {
  it("builds localized detail routes and collection labels", () => {
    expect(
      getEntryOpenGraphData({
        collection: "projects",
        description: "A project write-up",
        locale: "en" satisfies Locale,
        slug: "hacker-reader",
        title: "Hacker Reader",
      }),
    ).toEqual({
      description: "A project write-up",
      routeLabel: "Project",
      title: "Hacker Reader",
    });
  });
});
