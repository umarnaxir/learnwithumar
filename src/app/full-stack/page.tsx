import type { Metadata } from 'next';
import { FullStackHubClientView } from './FullStackHubClientView';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';

export const metadata: Metadata = {
  title: 'Full Stack Web Development Curriculum (20 Modules, 200+ Topics)',
  description:
    'Master professional software engineering from core web foundations and HTML5 to React 19, TypeScript, Next.js App Router, Node.js, and PostgreSQL across 20 structured modules.',
  alternates: {
    canonical: `${baseUrl}/full-stack`,
  },
  openGraph: {
    title: 'Full Stack Web Development Curriculum | Learn with Umar',
    description:
      'Structured 20-module full stack engineering curriculum with documentation, code examples, drills, and enterprise capstone architecture.',
    url: `${baseUrl}/full-stack`,
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Full Stack Curriculum — Learn with Umar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full Stack Web Development Curriculum | Learn with Umar',
    description:
      'Master Web Foundations, React 19, Next.js, Node.js, and PostgreSQL with documentation-driven training.',
    images: ['/twitter-image'],
  },
};

export default function FullStackHubPage() {
  return <FullStackHubClientView />;
}
