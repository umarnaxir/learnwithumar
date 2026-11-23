import type { Metadata } from 'next';
import { BacklinksClientView } from './BacklinksClientView';
import { ALL_BACKLINK_SOURCES } from '@/data/backlinks/backlinks-data';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';

export const metadata: Metadata = {
  title: 'Backlink Directory | Learn with Umar',
  description:
    '160+ verified high-authority platforms, directories, and communities to earn genuine editorial backlinks — sorted by Domain Rating.',
  alternates: {
    canonical: `${baseUrl}/backlinks`,
  },
  openGraph: {
    title: 'Backlink Directory | Learn with Umar',
    description:
      '160+ verified high-authority platforms, directories, and communities to earn genuine editorial backlinks — sorted by Domain Rating.',
    url: `${baseUrl}/backlinks`,
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Backlink Directory — Learn with Umar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Backlink Directory | Learn with Umar',
    description:
      '160+ verified high-authority platforms, directories, and communities to earn genuine editorial backlinks.',
    images: ['/twitter-image'],
  },
};

export default function BacklinksPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Backlink Directory — Learn with Umar',
    description:
      '160+ verified high-authority platforms, directories, and communities to earn genuine editorial backlinks.',
    numberOfItems: ALL_BACKLINK_SOURCES.length,
    itemListElement: ALL_BACKLINK_SOURCES.slice(0, 30).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BacklinksClientView />
    </>
  );
}
