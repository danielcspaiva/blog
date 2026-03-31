import { cn } from "@/lib/utils";

type CalloutType = "default" | "error" | "info" | "success" | "warning";

const typeClasses: Record<CalloutType, string> = {
  default:
    "border-cyan-800 bg-navy-100 text-navy-950 dark:border-cyan-200/20 dark:bg-cyan-950/20 dark:text-cyan-200",
  error:
    "border-red-800 bg-red-100 text-red-950 dark:border-red-200/20 dark:bg-red-950/20 dark:text-red-200",
  info: "border-blue-800 bg-blue-100 text-blue-950 dark:border-blue-200/20 dark:bg-blue-950/20 dark:text-blue-200",
  success:
    "border-green-800 bg-green-100 text-green-950 dark:border-green-200/20 dark:bg-green-950/20 dark:text-green-200",
  warning:
    "border-yellow-800 bg-yellow-100 text-yellow-950 dark:border-yellow-200/20 dark:bg-yellow-950/20 dark:text-yellow-200",
};

export default function Callout({
  children,
  type = "default",
}: {
  children: React.ReactNode;
  type?: CalloutType;
}) {
  return (
    <div className={cn("not-prose relative my-4 flex rounded border p-3", typeClasses[type])}>
      {children}
    </div>
  );
}
