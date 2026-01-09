import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/ThemeProvider';
import PostHog from '@/components/PostHog';
import CalEmbed from '@/components/CalEmbed';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Daniel Paiva',
    template: '%s | Daniel Paiva',
  },
  description: 'CTO at Quarto à Vista | Full Stack Developer',
  metadataBase: new URL('https://dcsp.dev'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <PostHog />
        <CalEmbed />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
