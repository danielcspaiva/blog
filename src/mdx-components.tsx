const components = {
  // oxlint-disable-next-line nextjs/no-img-element
  img: ({ alt = "", ...props }) => <img alt={alt} {...props} />,
};

export function useMDXComponents() {
  return components;
}
