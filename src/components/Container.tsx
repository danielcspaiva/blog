export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-(--breakpoint-sm) px-4">{children}</div>;
}
