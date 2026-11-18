import type { Metadata } from 'next';
import { ProjectsClientView } from './ProjectsClientView';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';

export const metadata: Metadata = {
  title: 'Practical Industry Projects (24 Real-World Deliverables)',
  description:
    'Explore 24 production-level deliverables spanning full stack software architecture and performance marketing campaigns, complete with rubrics and mentor evaluation checklists.',
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
  openGraph: {
    title: 'Practical Industry Projects | Learn with Umar',
    description:
      '24 production-level deliverables spanning full stack web engineering and digital marketing campaigns.',
    url: `${baseUrl}/projects`,
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Practical Projects — Learn with Umar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Practical Industry Projects | Learn with Umar',
    description:
      '24 production-level deliverables spanning software architecture and growth marketing.',
    images: ['/twitter-image'],
  },
};

export default function ProjectsPage() {
  return <ProjectsClientView />;
}
