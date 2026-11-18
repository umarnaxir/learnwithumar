import type { MetadataRoute } from 'next';
import { FULL_STACK_MODULES } from '@/data/curriculum/full-stack-curriculum';
import { DIGITAL_MARKETING_MODULES } from '@/data/curriculum/digital-marketing-curriculum';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';
  const currentDate = new Date();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/learning-paths`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/full-stack`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/digital-marketing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/assignments`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Full Stack Modules & Topic Lessons
  const fullStackModuleRoutes: MetadataRoute.Sitemap = FULL_STACK_MODULES.map((mod) => ({
    url: `${baseUrl}/full-stack/${mod.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const fullStackTopicRoutes: MetadataRoute.Sitemap = FULL_STACK_MODULES.flatMap((mod) =>
    mod.topics.map((t) => ({
      url: `${baseUrl}/full-stack/${mod.id}/${t.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  );

  // Digital Marketing Modules & Topic Lessons
  const digitalMarketingModuleRoutes: MetadataRoute.Sitemap = DIGITAL_MARKETING_MODULES.map((mod) => ({
    url: `${baseUrl}/digital-marketing/${mod.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const digitalMarketingTopicRoutes: MetadataRoute.Sitemap = DIGITAL_MARKETING_MODULES.flatMap((mod) =>
    mod.topics.map((t) => ({
      url: `${baseUrl}/digital-marketing/${mod.id}/${t.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  );

  return [
    ...staticRoutes,
    ...fullStackModuleRoutes,
    ...fullStackTopicRoutes,
    ...digitalMarketingModuleRoutes,
    ...digitalMarketingTopicRoutes,
  ];
}
