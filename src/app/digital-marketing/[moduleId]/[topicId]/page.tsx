import type { Metadata } from 'next';
import { getLessonContent } from '@/data/curriculum/lessons/detailed-lessons';
import { DigitalMarketingTopicDocClientView } from './TopicDocClientView';

type Props = {
  params: Promise<{ moduleId: string; topicId: string }>;
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleId, topicId } = await params;
  const decodedModuleId = decodeURIComponent(moduleId || '');
  const decodedTopicId = decodeURIComponent(topicId || '');
  const lesson = getLessonContent('digital-marketing', decodedModuleId, decodedTopicId);

  const title = `${lesson.title} — Digital Marketing Mastery`;
  const description =
    lesson.summary ||
    `Master ${lesson.title} with structured explanations, industry workflows, practical exercises, and interview strategies on Learn with Umar.`;
  const url = `${baseUrl}/digital-marketing/${decodedModuleId}/${decodedTopicId}`;

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
      type: 'article',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${lesson.title} — Learn with Umar`,
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

export default async function DigitalMarketingTopicDocPage({ params }: Props) {
  const { moduleId, topicId } = await params;
  const decodedModuleId = decodeURIComponent(moduleId || '');
  const decodedTopicId = decodeURIComponent(topicId || '');
  const lesson = getLessonContent('digital-marketing', decodedModuleId, decodedTopicId);
  const url = `${baseUrl}/digital-marketing/${decodedModuleId}/${decodedTopicId}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: lesson.title,
    description: lesson.summary,
    url,
    proficiencyLevel: lesson.difficulty,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: 'Umar Nazir',
      url: 'https://umarnazir.vercel.app',
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Learn with Umar',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon.svg`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <DigitalMarketingTopicDocClientView moduleId={decodedModuleId} topicId={decodedTopicId} />
    </>
  );
}
