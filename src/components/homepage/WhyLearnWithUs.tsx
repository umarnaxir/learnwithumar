'use client';

import React from 'react';
import styled from 'styled-components';
import { Box, Container, Text, Card, Badge } from '@/components/ui/primitives';
import {
  BookMarked,
  Cpu,
  Layers,
  Terminal,
  Zap,
  CheckCircle2,
} from 'lucide-react';

const SectionWrapper = styled.section`
  padding: 48px 0;
  background-color: ${({ theme }) => theme.colors.background};
`;

const PillarsGrid = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  gap: 14px;
  margin-top: 24px;
  padding-bottom: 14px;
  margin-left: -16px;
  margin-right: -16px;
  padding-left: 16px;
  padding-right: 16px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 36px;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
    overflow-x: visible;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PillarCard = styled(Card)`
  flex: 0 0 84%;
  min-width: 260px;
  max-width: 320px;
  scroll-snap-align: start;

  @media (min-width: 640px) {
    flex: initial;
    min-width: 0;
    max-width: none;
  }
`;

const MobileScrollHint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 14px;

  @media (min-width: 640px) {
    display: none;
  }
`;

export function WhyLearnWithUs() {
  const reasons = [
    {
      icon: BookMarked,
      title: 'Documentation-Driven Mastery',
      description:
        'Every lesson is a structured, reference-grade technical document featuring syntax definitions, step-by-step guides, code snippets, and verified official resources.',
    },
    {
      icon: Cpu,
      title: 'First-Principles Understanding',
      description:
        'We unpack the internals: from how browser rendering engines compute layout trees to how Googlebot allocates crawl budget across billions of web pages.',
    },
    {
      icon: Terminal,
      title: 'Production Code & Real Tools',
      description:
        'Build with React 19, Next.js App Router, TypeScript, PostgreSQL, and Prisma. In marketing, master Google Tag Manager, GA4, Meta Ads Manager, and Ahrefs.',
    },
    {
      icon: Layers,
      title: 'End-to-End Structured Levels',
      description:
        'Progress logically through defined levels: from basic web fundamentals to advanced enterprise microservices and agency client acquisition operations.',
    },
    {
      icon: Zap,
      title: 'Active Retention System',
      description:
        'Solidify concepts with interactive knowledge checks, technical interview preparation, common pitfalls checklists, and guided mini-assignments.',
    },
    {
      icon: CheckCircle2,
      title: 'Portfolio-Ready Proof of Work',
      description:
        'Graduate with 24 complete, professionally audited portfolio projects that substantiate your technical and marketing expertise to recruiters and clients.',
    },
  ];

  return (
    <SectionWrapper>
      <Container>
        <Box textAlign="center" maxWidth="560px" mx="auto">
          <Badge variant="dark" mb="8px">
            Why Learn With Us
          </Badge>
          <h2
            style={{
              fontSize: '23px',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              marginBottom: '8px',
            }}
          >
            The Engineering Mindset Applied to Modern Education.
          </h2>
          <Text fontSize="13.5px" color="textSecondary" lineHeight="relaxed">
            We discarded generic slideshows and hand-waving explanations. Here is
            how we train interns to become high-performing professionals.
          </Text>
        </Box>

        <MobileScrollHint>
          <span>Swipe to explore features →</span>
        </MobileScrollHint>

        <PillarsGrid>
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <PillarCard key={idx} p="20px 18px" bg="cardBg" border="1px solid" borderColor="border" interactive>
                <Box
                  p="8px"
                  bg="surface"
                  border="1px solid"
                  borderColor="border"
                  borderRadius="6px"
                  display="inline-flex"
                  color="text"
                  mb="12px"
                >
                  <Icon size={16} color="currentColor" />
                </Box>
                <Text fontSize="14.5px" fontWeight="600" color="text" mb="6px">
                  {r.title}
                </Text>
                <Text fontSize="12.5px" color="textSecondary" lineHeight="relaxed">
                  {r.description}
                </Text>
              </PillarCard>
            );
          })}
        </PillarsGrid>
      </Container>
    </SectionWrapper>
  );
}
