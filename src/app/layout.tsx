/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/styles/registry';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Learn with Umar — Technical Education & Training Platform',
    template: '%s | Learn with Umar',
  },
  description:
    'Master Full Stack Web Development and Digital Marketing from fundamentals to enterprise architectures with structured documentation, code examples, hands-on drills, and production projects.',
  keywords: [
    'Full Stack Web Development',
    'Digital Marketing Training',
    'HTML5 Semantic Markup',
    'Modern CSS3 Architecture',
    'React 19 Hooks and Architecture',
    'Next.js App Router',
    'TypeScript Production Engineering',
    'Node.js REST and Microservices',
    'PostgreSQL Database Architecture',
    'Technical SEO and Crawl Budget',
    'Google Analytics 4 Attribution',
    'Performance Marketing Strategy',
    'Internship Mentorship Program',
    'Learn with Umar',
    'Umar Nazir',
  ],
  authors: [{ name: 'Umar Nazir', url: 'https://umarnazir.vercel.app' }],
  creator: 'Umar Nazir',
  publisher: 'Learn with Umar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Learn with Umar',
    title: 'Learn with Umar — Technical Education & Training Platform',
    description:
      'Master Full Stack Web Development and Digital Marketing through production documentation, hands-on projects, and real-world engineering standards.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Learn with Umar — Technical Education Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn with Umar — Technical Education & Training Platform',
    description:
      'Master Full Stack Web Development and Digital Marketing with structured documentation, code examples, and enterprise training.',
    creator: '@umarnazir',
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'Learn with Umar',
      description:
        'Technical Education & Internship Training Platform for Full Stack Web Development and Digital Marketing.',
      publisher: {
        '@id': `${baseUrl}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/docs?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'EducationalOrganization',
      '@id': `${baseUrl}/#organization`,
      name: 'Learn with Umar',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon.svg`,
        width: 512,
        height: 512,
      },
      founder: {
        '@type': 'Person',
        name: 'Umar Nazir',
        url: 'https://umarnazir.vercel.app',
      },
      sameAs: ['https://umarnazir.vercel.app'],
      description:
        'A documentation-driven engineering and digital marketing training platform mentoring interns and students to industry-ready capability.',
    },
    {
      '@type': 'Course',
      '@id': `${baseUrl}/full-stack#course`,
      name: 'Full Stack Web Development Professional Program',
      description:
        'Comprehensive software engineering curriculum covering Web Fundamentals, HTML5, Modern CSS, React 19, TypeScript, Next.js App Router, Node.js, and Database Architecture across 20 modules.',
      provider: {
        '@id': `${baseUrl}/#organization`,
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: 'PT120H',
      },
    },
    {
      '@type': 'Course',
      '@id': `${baseUrl}/digital-marketing#course`,
      name: 'Digital Marketing & Performance Strategy Program',
      description:
        'Industry-grade digital marketing training covering Technical SEO, Content Strategy, Google Ads, Meta Ads, GA4 Analytics, and Marketing Automation across 20 modules.',
      provider: {
        '@id': `${baseUrl}/#organization`,
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: 'PT100H',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,600,550,500,400&f[]=cabinet-grotesk@800,700,600,500&f[]=clash-display@700,600,500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('learnwithumar-theme');
                  var mode = saved === 'dark' ? 'dark' : 'light';
                  document.documentElement.setAttribute('data-theme', mode);
                  document.documentElement.style.colorScheme = mode;
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
