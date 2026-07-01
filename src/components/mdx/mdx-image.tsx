/* eslint-disable @next/next/no-img-element */

// Body images referenced from markdown (![](../media/x.png)) are copied by Velite
// to /static/<hash>.<ext> and their URLs rewritten. Rendered as a plain <img>
// (dimensions are unknown at compile time); the `.prose` styles center them.
export function MdxImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { alt = "", ...rest } = props;
  return <img alt={alt} loading="lazy" decoding="async" {...rest} />;
}
