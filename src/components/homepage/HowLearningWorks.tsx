'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from '@/components/ui/primitives';
import { BookOpen, ShieldCheck, Rocket } from 'lucide-react';

const SectionWrapper = styled.section`
  padding: 64px 0;
  background-color: #ffffff;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;

  @media (min-width: 768px) {
    padding: 80px 0;
  }
`;

/* ================= CENTERED HEADER ================= */

const HeaderWrapper = styled.div`
  text-align: center;
  max-width: 640px;
  margin: 0 auto 40px;

  @media (min-width: 1024px) {
    margin-bottom: 48px;
  }
`;

const SectionBadge = styled.div`
  display: inline-block;
  background-color: #000000;
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 5px 16px;
  border-radius: 9999px;
  margin-bottom: 18px;
`;

const MainHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: #000000;
  margin: 0 0 14px;

  @media (min-width: 640px) {
    font-size: 32px;
  }
`;

const UnderlineWrapper = styled.span`
  display: inline-block;
  position: relative;
`;

const UnderlineSvg = styled.svg`
  display: block;
  width: 110%;
  margin-left: -5%;
  height: 8px;
  margin-top: 3px;
  overflow: visible;
`;

const SubtitleText = styled.p`
  font-size: 13.5px;
  color: #555555;
  line-height: 1.6;
  margin: 0;
  max-width: 540px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 640px) {
    font-size: 14px;
  }
`;

/* ================= DESKTOP HORIZONTAL TIMELINE ================= */

const DesktopTimelineContainer = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const HorizontalLineTrack = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 24px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 12.5%;
    right: 12.5%;
    height: 1px;
    background-color: #000000;
    z-index: 1;
    transform: translateY(-50%);
  }
`;

const MarkerWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

const CircularMarker = styled.button<{ $isHighlighted?: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.numbers};
  font-size: 12px;
  font-weight: 700;
  background-color: ${({ $isHighlighted }) =>
    $isHighlighted ? '#000000' : '#ffffff'};
  color: ${({ $isHighlighted }) => ($isHighlighted ? '#ffffff' : '#000000')};
  border: 1.5px solid #000000;
  box-shadow: 0 0 0 6px #ffffff;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0;

  &:hover {
    transform: scale(1.08);
  }
`;

const DesktopCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  align-items: stretch;
`;

/* ================= PANEL CARDS ================= */

const PhasePanel = styled.div<{ $isHighlighted?: boolean }>`
  background-color: ${({ $isHighlighted }) =>
    $isHighlighted ? '#000000' : '#ffffff'};
  color: ${({ $isHighlighted }) => ($isHighlighted ? '#ffffff' : '#000000')};
  border: 1px solid
    ${({ $isHighlighted }) => ($isHighlighted ? '#000000' : '#e5e7eb')};
  border-radius: 12px;
  padding: 24px 22px;
  display: flex;
  flex-direction: column;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  height: 100%;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: #000000;
    transform: translateY(-2px);
    box-shadow: ${({ $isHighlighted }) =>
      $isHighlighted
        ? '0 12px 28px rgba(0, 0, 0, 0.15)'
        : '0 8px 20px rgba(0, 0, 0, 0.05)'};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px #000000;
  }
`;

const IconHolder = styled.div<{ $isHighlighted?: boolean }>`
  color: ${({ $isHighlighted }) => ($isHighlighted ? '#ffffff' : '#000000')};
  margin-bottom: 20px;
  display: inline-flex;
  transition: color 0.25s ease, transform 0.25s ease;
`;

const PhaseTitle = styled.h3<{ $isHighlighted?: boolean }>`
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: ${({ $isHighlighted }) => ($isHighlighted ? '#ffffff' : '#000000')};
  margin: 0 0 10px;
  line-height: 1.3;
  transition: color 0.25s ease;
`;

const PhaseDescription = styled.p<{ $isHighlighted?: boolean }>`
  font-size: 12.5px;
  line-height: 1.6;
  color: ${({ $isHighlighted }) => ($isHighlighted ? '#d4d4d8' : '#555555')};
  margin: 0;
  transition: color 0.25s ease;
`;

/* ================= MOBILE & TABLET VERTICAL TIMELINE ================= */

const MobileTimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  padding-left: 44px;

  @media (min-width: 1024px) {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 16px;
    bottom: 24px;
    width: 1px;
    background-color: #000000;
  }
`;

const MobileStepItem = styled.div`
  position: relative;
`;

const MobileMarker = styled.button<{ $isHighlighted?: boolean }>`
  position: absolute;
  left: -44px;
  top: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.numbers};
  font-size: 12px;
  font-weight: 700;
  background-color: ${({ $isHighlighted }) =>
    $isHighlighted ? '#000000' : '#ffffff'};
  color: ${({ $isHighlighted }) => ($isHighlighted ? '#ffffff' : '#000000')};
  border: 1.5px solid #000000;
  box-shadow: 0 0 0 4px #ffffff;
  z-index: 2;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0;
`;

/* Custom Code Snippet Icon matching </> in the design */
function CodeSnippetIcon({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function HowLearningWorks() {
  const [activeStep, setActiveStep] = useState<string>('01');

  const steps = [
    {
      num: '01',
      icon: BookOpen,
      customIcon: false,
      title: 'Documentation Study',
      description:
        'Read the comprehensive technical document covering core principles, architecture diagrams, and syntax contracts.',
    },
    {
      num: '02',
      icon: null,
      customIcon: true,
      title: 'Practical Implementation',
      description:
        'Step through real code repositories or live campaign setups workflows. Test edge cases and observe expected runtime outputs.',
    },
    {
      num: '03',
      icon: ShieldCheck,
      customIcon: false,
      title: 'Verification & Quizzes',
      description:
        'Validate your comprehension with interactive knowledge checks, technical interview-style questions, and self-assessments.',
    },
    {
      num: '04',
      icon: Rocket,
      customIcon: false,
      title: 'Deliverable Project',
      description:
        'Build and submit the structured module project or audit report following the rubric, receiving thorough review feedback.',
    },
  ];

  return (
    <SectionWrapper id="how-learning-works">
      <Container>
        {/* Centered Header */}
        <HeaderWrapper>
          <SectionBadge>PEDAGOGICAL LIFECYCLE</SectionBadge>

          <MainHeading>
            How Learning Works: The{' '}
            <UnderlineWrapper>
              4-Step Cycle
              <UnderlineSvg viewBox="0 0 160 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 6C45 9 115 9 158 4"
                  stroke="#000000"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                />
              </UnderlineSvg>
            </UnderlineWrapper>
          </MainHeading>

          <SubtitleText>
            A repeatable, structured methodology designed to transform novices into self-directed,
            confident professionals.
          </SubtitleText>
        </HeaderWrapper>

        {/* Desktop Horizontal Journey (>= 1024px) */}
        <DesktopTimelineContainer>
          {/* Continuous Connected Horizontal Track */}
          <HorizontalLineTrack>
            {steps.map((st) => {
              const isActive = activeStep === st.num;
              return (
                <MarkerWrapper key={st.num}>
                  <CircularMarker
                    $isHighlighted={isActive}
                    onMouseEnter={() => setActiveStep(st.num)}
                    onClick={() => setActiveStep(st.num)}
                    aria-label={`Select phase ${st.num}: ${st.title}`}
                  >
                    {st.num}
                  </CircularMarker>
                </MarkerWrapper>
              );
            })}
          </HorizontalLineTrack>

          {/* 4 Content Panels (Active Panel is Black with White Content) */}
          <DesktopCardsGrid>
            {steps.map((st) => {
              const IconComponent = st.icon;
              const isActive = activeStep === st.num;
              return (
                <PhasePanel
                  key={st.num}
                  $isHighlighted={isActive}
                  onMouseEnter={() => setActiveStep(st.num)}
                  onClick={() => setActiveStep(st.num)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveStep(st.num);
                    }
                  }}
                >
                  <IconHolder $isHighlighted={isActive}>
                    {st.customIcon ? (
                      <CodeSnippetIcon size={24} color={isActive ? '#FFFFFF' : '#000000'} />
                    ) : IconComponent ? (
                      <IconComponent size={24} />
                    ) : null}
                  </IconHolder>
                  <PhaseTitle $isHighlighted={isActive}>{st.title}</PhaseTitle>
                  <PhaseDescription $isHighlighted={isActive}>
                    {st.description}
                  </PhaseDescription>
                </PhasePanel>
              );
            })}
          </DesktopCardsGrid>
        </DesktopTimelineContainer>

        {/* Mobile & Tablet Vertical Timeline (< 1024px) */}
        <MobileTimelineContainer>
          {steps.map((st) => {
            const IconComponent = st.icon;
            const isActive = activeStep === st.num;
            return (
              <MobileStepItem key={st.num}>
                <MobileMarker
                  $isHighlighted={isActive}
                  onClick={() => setActiveStep(st.num)}
                  aria-label={`Select phase ${st.num}: ${st.title}`}
                >
                  {st.num}
                </MobileMarker>
                <PhasePanel
                  $isHighlighted={isActive}
                  onClick={() => setActiveStep(st.num)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveStep(st.num);
                    }
                  }}
                >
                  <IconHolder $isHighlighted={isActive}>
                    {st.customIcon ? (
                      <CodeSnippetIcon size={22} color={isActive ? '#FFFFFF' : '#000000'} />
                    ) : IconComponent ? (
                      <IconComponent size={22} />
                    ) : null}
                  </IconHolder>
                  <PhaseTitle $isHighlighted={isActive}>{st.title}</PhaseTitle>
                  <PhaseDescription $isHighlighted={isActive}>
                    {st.description}
                  </PhaseDescription>
                </PhasePanel>
              </MobileStepItem>
            );
          })}
        </MobileTimelineContainer>
      </Container>
    </SectionWrapper>
  );
}
