import { cn } from "@/lib/utils";
import { Link as IntlLink } from "@/i18n/navigation";

type Props = {
  href: string;
  external?: boolean;
  underline?: boolean;
  group?: boolean;
  localize?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function Link({
  href,
  external,
  underline = true,
  group = false,
  localize = true,
  className,
  children,
  ...rest
}: Props) {
  const classes = cn(
    "inline-block text-current decoration-black/30 transition-colors duration-300 ease-in-out hover:text-black hover:decoration-black/50 focus-visible:text-black focus-visible:decoration-black/50 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white/50 dark:focus-visible:text-white dark:focus-visible:decoration-white/50",
    underline && "underline underline-offset-[3px]",
    group && "group",
    className,
  );

  const isSpecial =
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("sms:") ||
    href.startsWith("#");

  if (localize && !external && !isSpecial && href.startsWith("/")) {
    return (
      <IntlLink href={href} className={classes} {...rest}>
        {children}
      </IntlLink>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={classes}
      {...rest}
    >
      {children}
    </a>
  );
}
