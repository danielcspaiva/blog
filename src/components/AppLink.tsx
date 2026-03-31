import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { getLocalizedHref, type Locale } from "@/lib/i18n";

type Props = {
  children: ReactNode;
  className?: string;
  external?: boolean;
  group?: boolean;
  href: string;
  locale?: Locale;
  localize?: boolean;
  underline?: boolean;
} & Omit<ComponentProps<"a">, "children" | "href">;

export function AppLink({
  children,
  className,
  external = false,
  group = false,
  href,
  locale,
  localize = true,
  underline = true,
  ...rest
}: Props) {
  const resolvedHref = locale && localize && !external ? getLocalizedHref(href, locale) : href;
  const sharedClassName = cn(
    "inline-block text-current decoration-black/30 transition-colors duration-300 ease-in-out hover:text-black hover:decoration-black/50 focus-visible:text-black focus-visible:decoration-black/50 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white/50 dark:focus-visible:text-white dark:focus-visible:decoration-white/50",
    underline && "underline underline-offset-[3px]",
    group && "group",
    className,
  );

  if (external) {
    return (
      <a className={sharedClassName} href={href} rel="noreferrer" target="_blank" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link className={sharedClassName} href={resolvedHref} {...rest}>
      {children}
    </Link>
  );
}
