import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import Callout from './Callout';
import HumanVsAIRadarChart from './HumanVsAIRadarChart';
import TaskEquationVisualizer from './TaskEquationVisualizer';

const mdxComponents = {
  // Override default elements
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: ({
    src,
    alt,
  }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null;
    return (
      <Image
        src={src}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg"
      />
    );
  },
  // Custom components
  Callout,
  HumanVsAIRadarChart,
  TaskEquationVisualizer,
};

export default mdxComponents;
