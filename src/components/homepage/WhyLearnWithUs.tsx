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
  background-color: #ffffff;
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 36px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
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
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#000000',
              marginBottom: '8px',
            }}
          >
            The Engineering Mindset Applied to Modern Education.
          </h2>
          <Text fontSize="13.5px" color="#555555" lineHeight="relaxed">
            We discarded generic slideshows and hand-waving explanations. Here is
            how we train interns to become high-performing professionals.
          </Text>
        </Box>

        <PillarsGrid>
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <Card key={idx} p="20px 18px" bg="#FFFFFF" border="1px solid #EAEAEA" interactive>
                <Box
                  p="8px"
                  bg="#F4F4F5"
                  borderRadius="6px"
                  display="inline-flex"
                  mb="12px"
                >
                  <Icon size={16} color="#000000" />
                </Box>
                <Text fontSize="14.5px" fontWeight="700" color="#111111" mb="6px">
                  {r.title}
                </Text>
                <Text fontSize="12.5px" color="#555555" lineHeight="relaxed">
                  {r.description}
                </Text>
              </Card>
            );
          })}
        </PillarsGrid>
      </Container>
    </SectionWrapper>
  );
}
