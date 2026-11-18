import type { Metadata } from 'next';
import { DocsClientView } from './DocsClientView';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';

export const metadata: Metadata = {
  title: 'Documentation Hub — Technical Specifications & Learning Guides',
  description:
    'Comprehensive documentation directory spanning 40 modules and 380+ lessons across Full Stack Web Development and Digital Marketing, with code examples, syntax patterns, and official references.',
  alternates: {
    canonical: `${baseUrl}/docs`,
  },
  openGraph: {
    title: 'Documentation Hub | Learn with Umar',
    description:
      'Search and browse technical specifications, code examples, drills, and official standard references.',
    url: `${baseUrl}/docs`,
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Documentation Hub — Learn with Umar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentation Hub | Learn with Umar',
    description:
      'Browse technical specifications, lessons, drills, and standard documentation across 40 modules.',
    images: ['/twitter-image'],
  },
};

export default function DocsPage() {
  return <DocsClientView />;
}
