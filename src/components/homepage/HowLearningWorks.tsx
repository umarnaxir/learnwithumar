'use client';

import React from 'react';
import styled from 'styled-components';
import { Box, Container, Text, Card, Badge } from '@/components/ui/primitives';
import { BookOpen, Code2, CheckCircle2, Rocket } from 'lucide-react';

const SectionWrapper = styled.section`
  padding: 48px 0;
  background-color: #fafafa;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
`;

const StepsTimeline = styled.div`
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
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StepCard = styled(Card)`
  flex: 0 0 84%;
  min-width: 250px;
  max-width: 300px;
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
  color: #888888;
  margin-top: 14px;

  @media (min-width: 640px) {
    display: none;
  }
`;

const StepNum = styled.div`
  font-family: ${({ theme }) => theme.fonts.numbers};
  font-size: 11px;
  font-weight: 700;
  color: #888888;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 10px;
  font-feature-settings: 'tnum' on, 'lnum' on;
`;

export function HowLearningWorks() {
  const steps = [
    {
      num: 'Phase 01',
      icon: BookOpen,
      title: 'Documentation Study',
      description:
        'Read the comprehensive technical document covering core principles, architecture diagrams, and syntax contracts.',
    },
    {
      num: 'Phase 02',
      icon: Code2,
      title: 'Practical Implementation',
      description:
        'Step through real code repositories or live campaign setup workflows. Test edge cases and observe expected runtime outputs.',
    },
    {
      num: 'Phase 03',
      icon: CheckCircle2,
      title: 'Verification & Quizzes',
      description:
        'Validate your comprehension with interactive knowledge checks, technical interview defense questions, and self-assessments.',
    },
    {
      num: 'Phase 04',
      icon: Rocket,
      title: 'Deliverable Project',
      description:
        'Build and submit the structured module project or audit report following the rubric, receiving thorough review feedback.',
    },
  ];

  return (
    <SectionWrapper>
      <Container>
        <Box textAlign="center" maxWidth="560px" mx="auto">
          <Badge variant="neutral" mb="8px">
            Pedagogical Lifecycle
          </Badge>
          <h2
            style={{
              fontSize: '23px',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: '#000000',
              marginBottom: '8px',
            }}
          >
            How Learning Works: The 4-Step Cycle
          </h2>
          <Text fontSize="13.5px" color="#555555" lineHeight="relaxed">
            A repeatable, structured methodology designed to transform novices
            into self-directed, confident professionals.
          </Text>
        </Box>

        <MobileScrollHint>
          <span>Swipe to explore steps →</span>
        </MobileScrollHint>

        <StepsTimeline>
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <StepCard key={idx} p="20px 18px" bg="#FFFFFF" border="1px solid #EAEAEA">
                <StepNum>{st.num}</StepNum>
                <Box
                  p="8px"
                  bg="#F4F4F5"
                  borderRadius="6px"
                  display="inline-flex"
                  mb="12px"
                >
                  <Icon size={16} color="#000000" />
                </Box>
                <Text fontSize="14.5px" fontWeight="600" color="#111111" mb="6px">
                  {st.title}
                </Text>
                <Text fontSize="12.5px" color="#555555" lineHeight="relaxed">
                  {st.description}
                </Text>
              </StepCard>
            );
          })}
        </StepsTimeline>
      </Container>
    </SectionWrapper>
  );
}
