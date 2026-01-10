import { withContentlayer } from 'next-contentlayer2';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog/the-task-solving-equation',
        destination: '/blog/ai-success-equation',
        permanent: true,
      },
      {
        source: '/en/blog/the-task-solving-equation',
        destination: '/en/blog/ai-success-equation',
        permanent: true,
      },
      {
        source: '/pt-br/blog/the-task-solving-equation',
        destination: '/pt-br/blog/ai-success-equation',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(withContentlayer(nextConfig));
