import type { ContentCollection } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getPageMetadata, SITE } from "@/lib/site";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export const SITE_OG_PAGES = [
  "home",
  "blog",
  "projects",
  "experience",
  "tags",
  "subscribe",
] as const;

export type SiteOpenGraphPage = (typeof SITE_OG_PAGES)[number];

const ENTRY_LABELS: Record<ContentCollection, string> = {
  blog: "Blog Post",
  projects: "Project",
};

function getBrandTitle(title: string) {
  return `${title} | ${SITE.title}`;
}

export function getSiteOpenGraphData(page: SiteOpenGraphPage, locale: Locale) {
  const metadata = getPageMetadata(page, locale);

  return {
    description: metadata.description,
    title: getBrandTitle(metadata.title),
  };
}

export function getEntryOpenGraphData({
  collection,
  description,
  title,
}: {
  collection: ContentCollection;
  description: string;
  locale: Locale;
  slug: string;
  title: string;
}) {
  return {
    description,
    routeLabel: ENTRY_LABELS[collection],
    title,
  };
}

export function OpenGraphCard({
  description,
  eyebrow,
  title,
}: {
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle at top left, rgba(34, 211, 238, 0.18), transparent 34%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        color: "#020617",
        display: "flex",
        fontFamily: "Geist",
        height: "100%",
        padding: "54px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "2px solid rgba(15, 23, 42, 0.12)",
          borderRadius: "32px",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "48px",
          position: "relative",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(8, 145, 178, 0.18), rgba(14, 116, 144, 0.08))",
            borderRadius: "999px",
            color: "#0f172a",
            display: "flex",
            fontSize: "24px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            padding: "12px 20px",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: "20px",
            justifyContent: "center",
            marginTop: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "70px",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "#334155",
              display: "flex",
              fontSize: "30px",
              lineHeight: 1.35,
              maxWidth: "900px",
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            color: "#0f172a",
            display: "flex",
            fontSize: "28px",
            justifyContent: "space-between",
            marginTop: "24px",
          }}
        >
          <div style={{ display: "flex", fontWeight: 700 }}>Daniel Paiva</div>
          <div style={{ display: "flex" }}>{SITE.url.replace("https://", "")}</div>
        </div>
      </div>
    </div>
  );
}

export const OPEN_GRAPH_IMAGE_SIZE = {
  height: OG_HEIGHT,
  width: OG_WIDTH,
};
