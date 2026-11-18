import { Link as IntlLink } from "@/i18n/navigation";

export function BackToPrevious({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <IntlLink href={href} className="btn not-prose">
      <span aria-hidden="true">←</span>
      {children}
    </IntlLink>
  );
}
