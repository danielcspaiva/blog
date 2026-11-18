/** Title block for index-style pages: mono eyebrow, pixel title, lede. */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="animate space-y-3">
      {eyebrow ? (
        <p className="eyebrow text-ink-faint text-[0.7rem]">{eyebrow}</p>
      ) : null}
      <h1 className="font-pixel text-ink text-4xl leading-[1.05] tracking-tight sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="text-ink-muted text-pretty">{description}</p>
      ) : null}
    </div>
  );
}
