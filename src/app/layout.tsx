import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/styles/registry';

export const metadata: Metadata = {
  title: 'Learn with Umar — Technical Education & Documentation Platform',
  description:
    'Master Full Stack Web Development and Digital Marketing through structured documentation, hands-on projects, real-world examples, and industry-oriented training.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,600,500,400&display=swap"
        />
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
