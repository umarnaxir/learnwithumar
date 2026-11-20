import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { FULL_STACK_MODULES } from '@/data/curriculum/full-stack-curriculum';
import {
  getLessonContent,
  resolveCurriculumTopic,
} from '@/data/curriculum/lessons/detailed-lessons';
import { FullStackTopicDocClientView } from './TopicDocClientView';

type Props = {
  params: Promise<{ moduleId: string; topicId: string }>;
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';

export async function generateStaticParams() {
  const params: { moduleId: string; topicId: string }[] = [];
  for (const mod of FULL_STACK_MODULES) {
    for (const topic of mod.topics) {
      params.push({
        moduleId: mod.id,
        topicId: topic.id,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleId, topicId } = await params;
  const decodedModuleId = decodeURIComponent(moduleId || '');
  const decodedTopicId = decodeURIComponent(topicId || '');
  const resolved = resolveCurriculumTopic('full-stack', decodedModuleId, decodedTopicId);

  if (!resolved) {
    return { title: 'Lesson Not Found | Learn with Umar' };
  }

  const lesson = getLessonContent(
    'full-stack',
    resolved.module.id,
    resolved.canonicalTopicId
  );

  const title = `${lesson.title} — Full Stack Web Development`;
  const description =
    lesson.summary ||
    `Master ${lesson.title} with structured explanations, verified code examples, best practices, exercises, and interview questions on Learn with Umar.`;
  const url = `${baseUrl}/full-stack/${resolved.module.id}/${resolved.canonicalTopicId}`;

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

export default async function FullStackTopicDocPage({ params }: Props) {
  const { moduleId, topicId } = await params;
  const decodedModuleId = decodeURIComponent(moduleId || '');
  const decodedTopicId = decodeURIComponent(topicId || '');
  const resolved = resolveCurriculumTopic('full-stack', decodedModuleId, decodedTopicId);

  if (!resolved) notFound();

  if (
    resolved.module.id !== decodedModuleId ||
    resolved.canonicalTopicId !== decodedTopicId
  ) {
    redirect(`/full-stack/${resolved.module.id}/${resolved.canonicalTopicId}`);
  }

  const lesson = getLessonContent(
    'full-stack',
    resolved.module.id,
    resolved.canonicalTopicId
  );
  const url = `${baseUrl}/full-stack/${resolved.module.id}/${resolved.canonicalTopicId}`;

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
      <FullStackTopicDocClientView
        key={`${resolved.module.id}___${resolved.canonicalTopicId}`}
        moduleId={resolved.module.id}
        topicId={resolved.canonicalTopicId}
      />
    </>
  );
}
