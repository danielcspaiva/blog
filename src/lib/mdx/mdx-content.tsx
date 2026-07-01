import * as runtime from "react/jsx-runtime";
import type { ComponentType } from "react";
import { mdxComponents } from "./mdx-components";

// Velite compiles MDX to a function-body string (no runtime MDX parse).
function getMDXComponent(code: string): ComponentType<{
  components?: Record<string, ComponentType<any>>;
}> {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function MDXContent({
  code,
  components,
}: {
  code: string;
  components?: Record<string, ComponentType<any>>;
}) {
  const Component = getMDXComponent(code);
  return <Component components={{ ...mdxComponents, ...components }} />;
}
