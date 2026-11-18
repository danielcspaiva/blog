"use client";

import { Link, usePathname } from "@/i18n/navigation";

/** Header nav item: mono label that inverts on hover and when current. */
export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const current = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className="text-ink-soft hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper aria-[current=page]:bg-ink aria-[current=page]:text-paper px-1.5 py-1"
    >
      {children}
    </Link>
  );
}
