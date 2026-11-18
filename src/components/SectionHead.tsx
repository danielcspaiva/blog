/**
 * Section heading: an inverse "plate" label whose trailing edge dissolves into
 * a horizontal dither fade, with an optional aside (count, "see all" link).
 */
export function SectionHead({
  title,
  as: Tag = "h2",
  children,
}: {
  title: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "div";
  children?: React.ReactNode;
}) {
  return (
    <div className="section-head">
      <Tag className="plate">{title}</Tag>
      <span className="section-head__fade" aria-hidden="true" />
      {children ? (
        <span className="section-head__aside">{children}</span>
      ) : null}
    </div>
  );
}
