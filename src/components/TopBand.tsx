"use client";

import { usePathname } from "@/i18n/navigation";
import { DitherField } from "@/components/DitherField";

/**
 * The strip of living dither that hangs below the header on every inner page.
 * The home page draws its own, taller field behind the hero instead.
 */
export function TopBand() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-16 h-12 overflow-hidden sm:h-20"
    >
      <DitherField falloff={1.6} />
    </div>
  );
}
