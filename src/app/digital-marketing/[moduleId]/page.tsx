import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DIGITAL_MARKETING_MODULES } from '@/data/curriculum/digital-marketing-curriculum';
import { DigitalMarketingModuleOverviewClientView } from './ModuleOverviewClientView';

type Props = {
  params: Promise<{ moduleId: string }>;
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';

export async function generateStaticParams() {
  return DIGITAL_MARKETING_MODULES.map((mod) => ({
    moduleId: mod.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleId } = await params;
  const decodedModuleId = decodeURIComponent(moduleId || '');
  const mod = DIGITAL_MARKETING_MODULES.find((m) => m.id === decodedModuleId);

  if (!mod) {
    return {
      title: 'Module Not Found | Learn with Umar',
    };
  }

  const title = `Module ${mod.moduleNumber}: ${mod.title} — Digital Marketing Track`;
  const description = mod.description;
  const url = `${baseUrl}/digital-marketing/${decodedModuleId}`;

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

export default async function DigitalMarketingModuleOverviewPage({ params }: Props) {
  const { moduleId } = await params;
  const decodedModuleId = decodeURIComponent(moduleId || '');
  const moduleExists = DIGITAL_MARKETING_MODULES.some((mod) => mod.id === decodedModuleId);

  if (!moduleExists) notFound();

  return <DigitalMarketingModuleOverviewClientView moduleId={decodedModuleId} />;
}
