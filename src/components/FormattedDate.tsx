export function FormattedDate({ date, locale }: { date: Date; locale: string }) {
  return (
    <time dateTime={date.toISOString()}>
      {date.toLocaleDateString(locale === "pt-br" ? "pt-BR" : "en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}
    </time>
  );
}
