import type { Metadata } from 'next';
import { FULL_STACK_MODULES } from '@/data/curriculum/full-stack-curriculum';
import { FullStackModuleOverviewClientView } from './ModuleOverviewClientView';

type Props = {
  params: Promise<{ moduleId: string }>;
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';

export async function generateStaticParams() {
  return FULL_STACK_MODULES.map((mod) => ({
    moduleId: mod.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleId } = await params;
  const decodedModuleId = decodeURIComponent(moduleId || '');
  const mod = FULL_STACK_MODULES.find((m) => m.id === decodedModuleId);

  if (!mod) {
    return {
      title: 'Module Not Found | Learn with Umar',
    };
  }

  const title = `Module ${mod.moduleNumber}: ${mod.title} — Full Stack Track`;
  const description = mod.description;
  const url = `${baseUrl}/full-stack/${decodedModuleId}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | Learn with Umar`,
      description,
      url,
      type: 'website',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${mod.title} — Learn with Umar`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Learn with Umar`,
      description,
      images: ['/twitter-image'],
    },
  };
}

export default async function FullStackModuleOverviewPage({ params }: Props) {
  const { moduleId } = await params;
  const decodedModuleId = decodeURIComponent(moduleId || '');
  return <FullStackModuleOverviewClientView moduleId={decodedModuleId} />;
}
