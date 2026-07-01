export function FormattedDate({
  date,
  locale = "en",
}: {
  date: string | Date;
  locale?: string;
}) {
  const d = typeof date === "string" ? new Date(date) : date;
  return (
    <time dateTime={d.toISOString()}>
      {d.toLocaleDateString(locale === "pt-br" ? "pt-BR" : "en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })}
    </time>
  );
}
