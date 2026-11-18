import type { Metadata } from 'next';
import { DigitalMarketingHubClientView } from './DigitalMarketingHubClientView';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';

export const metadata: Metadata = {
  title: 'Digital Marketing Mastery Curriculum (20 Modules, 180+ Topics)',
  description:
    'Comprehensive digital marketing training covering Technical SEO, Content Strategy, Google Ads PPC, Meta Ads, Google Analytics 4 Attribution, and Conversion Rate Optimization across 20 modules.',
  alternates: {
    canonical: `${baseUrl}/digital-marketing`,
  },
  openGraph: {
    title: 'Digital Marketing Mastery Curriculum | Learn with Umar',
    description:
      'Master Technical SEO, Performance Marketing, GA4 Attribution, and Growth Engineering with real-world case studies.',
    url: `${baseUrl}/digital-marketing`,
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Digital Marketing Curriculum — Learn with Umar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Mastery Curriculum | Learn with Umar',
    description:
      'Master Technical SEO, Google Ads, Meta Ads, and GA4 Analytics with documentation-driven training.',
    images: ['/twitter-image'],
  },
};

export default function DigitalMarketingHubPage() {
  return <DigitalMarketingHubClientView />;
}
