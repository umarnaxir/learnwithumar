import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { HeroSection } from '@/components/homepage/HeroSection';
import { LearningPathCards } from '@/components/homepage/LearningPathCards';
import { AboutSection } from '@/components/homepage/AboutSection';
import { WhyLearnWithUs } from '@/components/homepage/WhyLearnWithUs';
import { HowLearningWorks } from '@/components/homepage/HowLearningWorks';
import { ProjectsShowcase } from '@/components/homepage/ProjectsShowcase';
import { FAQSection } from '@/components/homepage/FAQSection';
import { FinalCTA } from '@/components/homepage/FinalCTA';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwithumar.vercel.app';

export const metadata: Metadata = {
  title: 'Learn with Umar — Full Stack Web Development & Digital Marketing Platform',
  description:
    'Master Full Stack Web Development and Digital Marketing through documentation-driven learning, practical code examples, 24 real-world projects, and industry mentorship.',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'Learn with Umar — Technical Education & Training Platform',
    description:
      'Master Full Stack Web Development and Digital Marketing from fundamentals to enterprise architectures.',
    url: baseUrl,
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <LearningPathCards />
        <AboutSection />
        <WhyLearnWithUs />
        <HowLearningWorks />
        <ProjectsShowcase />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
