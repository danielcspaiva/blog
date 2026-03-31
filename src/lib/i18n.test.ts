import { describe, expect, it } from "vitest";

import { getLocalizedHref, getRouteWithoutLocale } from "@/lib/i18n";

describe("getRouteWithoutLocale", () => {
  it("removes the locale prefix from localized paths", () => {
    expect(getRouteWithoutLocale("/pt-br/blog/hello-world")).toBe("/blog/hello-world");
  });

  it("preserves the root path", () => {
    expect(getRouteWithoutLocale("/")).toBe("/");
  });
});

describe("getLocalizedHref", () => {
  it("prefixes internal paths with the locale", () => {
    expect(getLocalizedHref("/blog", "pt-br")).toBe("/pt-br/blog");
  });

  it("preserves locale-prefixed paths", () => {
    expect(getLocalizedHref("/en/blog", "pt-br")).toBe("/en/blog");
  });

  it("leaves mailto and hash hrefs untouched", () => {
    expect(getLocalizedHref("mailto:test@example.com", "en")).toBe("mailto:test@example.com");
    expect(getLocalizedHref("#section", "en")).toBe("#section");
  });
});
