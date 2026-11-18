import type { Metadata } from 'next';
import { ProjectsClientView } from '../projects/ProjectsClientView';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';

export const metadata: Metadata = {
  title: 'Assignments & Evaluation Drills',
  description:
    'Hands-on technical assignments, code reviews, and performance marketing deliverables evaluated under industry standards.',
  alternates: {
    canonical: `${baseUrl}/assignments`,
  },
  openGraph: {
    title: 'Assignments & Evaluation Drills | Learn with Umar',
    description:
      'Hands-on technical assignments, code reviews, and performance marketing deliverables evaluated under industry standards.',
    url: `${baseUrl}/assignments`,
    type: 'website',
  },
};

export default function AssignmentsPage() {
  return <ProjectsClientView />;
}
