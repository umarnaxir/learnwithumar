import type { Metadata } from 'next';
import { AboutClientView } from './AboutClientView';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';

export const metadata: Metadata = {
  title: 'About Learn with Umar — Philosophy & Mentorship by Umar Nazir',
  description:
    'Learn about Umar Nazir and the architectural philosophy behind Learn with Umar: an unapologetically rigorous educational platform engineering interns and students into production-ready professionals.',
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: 'About Learn with Umar — Mentorship & Philosophy',
    description:
      'Engineered to train students and interns in Full Stack Web Development and Digital Marketing through documentation-driven excellence.',
    url: `${baseUrl}/about`,
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'About Learn with Umar — Umar Nazir',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Learn with Umar — Mentorship & Philosophy',
    description:
      'Engineered to train students and interns in Full Stack Web Development and Digital Marketing.',
    images: ['/twitter-image'],
  },
};

export default function AboutPage() {
  return <AboutClientView />;
}
