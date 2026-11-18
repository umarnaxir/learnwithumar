'use client';

import React from 'react';
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
