'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';
import MdxComponents from './MdxComponents';

export default function MdxContent({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code);
  return <MDXContent components={MdxComponents} />;
}
