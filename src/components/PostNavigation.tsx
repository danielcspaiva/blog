import { Link as IntlLink } from "@/i18n/navigation";

type Adjacent = { title: string; href: string } | undefined;

const labels = {
  en: { prev: "Newer", next: "Older" },
  "pt-br": { prev: "Mais recente", next: "Mais antigo" },
} as const;

function NavCard({
  item,
  label,
  align,
}: {
  item: NonNullable<Adjacent>;
  label: string;
  align: "left" | "right";
}) {
  return (
    <IntlLink
      href={item.href}
      className={`card not-prose flex flex-col gap-1.5 px-4 py-3.5 ${
        align === "right" ? "items-end text-right" : ""
      }`}
    >
      <span className="eyebrow text-ink-faint text-[0.65rem]">
        {align === "left" ? `← ${label}` : `${label} →`}
      </span>
      <span className="font-pixel text-ink leading-snug tracking-tight text-balance">
        {item.title}
      </span>
    </IntlLink>
  );
}

export function PostNavigation({
  prev,
  next,
  locale = "en",
}: {
  prev?: Adjacent;
  next?: Adjacent;
  locale?: string;
}) {
  const l = labels[locale as keyof typeof labels] ?? labels.en;
  return (
    <nav className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {prev ? (
        <NavCard item={prev} label={l.prev} align="left" />
      ) : (
        <div className="hidden sm:block" />
      )}
      {next ? <NavCard item={next} label={l.next} align="right" /> : null}
    </nav>
  );
}
