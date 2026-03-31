import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Container({ children }: Props) {
  return <div className="mx-auto max-w-(--breakpoint-sm) px-3">{children}</div>;
}
