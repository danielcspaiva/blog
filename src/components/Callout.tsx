import { cn } from "@/lib/utils";

type CalloutType = "default" | "info" | "warning" | "error" | "success";

// Each type is told apart by a mono glyph and by the tint and density of its
// dithered stripe — colour only ever shows up *through* the dither.
const types: Record<CalloutType, { glyph: string; stripe: string }> = {
  default: { glyph: "→", stripe: "text-ink dither-50" },
  info: { glyph: "i", stripe: "text-blue-900 dark:text-blue-300 dither-75" },
  warning: {
    glyph: "!",
    stripe: "text-yellow-600 dark:text-yellow-300 dither-75",
  },
  error: { glyph: "×", stripe: "text-red-600 dark:text-red-400 dither-75" },
  success: {
    glyph: "✓",
    stripe: "text-green-600 dark:text-green-300 dither-75",
  },
};

export function Callout({
  type = "default",
  children,
}: {
  type?: CalloutType;
  children?: React.ReactNode;
}) {
  const { glyph, stripe } = types[type] ?? types.default;
  return (
    <div className="callout not-prose border-ink bg-paper-2 text-ink-soft relative my-5 flex border">
      <div
        aria-hidden="true"
        className="border-ink relative flex w-9 shrink-0 items-start justify-center border-r pt-3"
      >
        <span className={cn("dither absolute inset-0", stripe)} />
        <span className="bg-ink text-paper relative grid size-5 place-items-center font-mono text-xs leading-none font-bold">
          {glyph}
        </span>
      </div>
      <div className="min-w-0 flex-1 px-4 py-3 text-[0.95em] leading-relaxed [&_a]:underline [&_a]:underline-offset-[3px]">
        {children}
      </div>
    </div>
  );
}
