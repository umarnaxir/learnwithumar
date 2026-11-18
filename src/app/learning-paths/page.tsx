import type { Metadata } from 'next';
import { LearningPathsClientView } from './LearningPathsClientView';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';

export const metadata: Metadata = {
  title: 'Learning Paths — Full Stack Web Development & Digital Marketing',
  description:
    'Choose your specialization: Full Stack Web Development (7 Levels, 20 Modules) or Digital Marketing (8 Levels, 20 Modules). Guided, documentation-first professional curricula.',
  alternates: {
    canonical: `${baseUrl}/learning-paths`,
  },
  openGraph: {
    title: 'Learning Paths & Engineering Roadmaps | Learn with Umar',
    description:
      'Choose your specialization: Full Stack Web Development or Digital Marketing. Structured from foundational principles to advanced enterprise execution.',
    url: `${baseUrl}/learning-paths`,
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Learning Paths — Learn with Umar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learning Paths & Engineering Roadmaps | Learn with Umar',
    description:
      'Choose your specialization: Full Stack Web Development or Digital Marketing.',
    images: ['/twitter-image'],
  },
};

export default function LearningPathsPage() {
  return <LearningPathsClientView />;
}
