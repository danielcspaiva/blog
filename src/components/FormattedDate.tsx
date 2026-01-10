interface FormattedDateProps {
  date: Date | string;
  locale?: string;
}

export default function FormattedDate({
  date,
  locale = 'en',
}: FormattedDateProps) {
  const d = typeof date === 'string' ? new Date(date) : date;

  return (
    <time dateTime={d.toISOString()}>
      {d.toLocaleDateString(locale === 'pt-br' ? 'pt-BR' : 'en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      })}
    </time>
  );
}
