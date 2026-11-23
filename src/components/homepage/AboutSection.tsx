'use client';

import React from 'react';
import styled from 'styled-components';
import { Container } from '@/components/ui/primitives';

const AboutWrapper = styled.section`
  padding: 64px 0;
  background-color: #ffffff;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;

  @media (min-width: 768px) {
    padding: 80px 0;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;

  @media (min-width: 960px) {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 64px;
    align-items: start;
  }

  @media (min-width: 1200px) {
    gap: 80px;
  }
`;

/* ================= LEFT COLUMN ================= */

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionBadge = styled.div`
  display: inline-block;
  align-self: flex-start;
  background-color: #000000;
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 9999px;
  margin-bottom: 20px;
`;

const MainHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: #000000;
  margin-bottom: 20px;

  @media (min-width: 640px) {
    font-size: 30px;
  }

  @media (min-width: 1024px) {
    font-size: 34px;
  }
`;

const HighlightWrapper = styled.span`
  display: inline-block;
  position: relative;
`;

const UnderlineSvg = styled.svg`
  display: block;
  width: 106%;
  margin-left: -3%;
  height: 8px;
  margin-top: 3px;
  overflow: visible;
`;

const DescriptionParagraph = styled.p`
  font-size: 13.5px;
  font-weight: 400;
  line-height: 1.65;
  color: #444444;
  margin: 0 0 16px;

  strong {
    color: #000000;
    font-weight: 600;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  padding-top: 6px;

  @media (max-width: 480px) {
    justify-content: space-between;
  }
`;

const StatBlock = styled.div`
  padding-right: 28px;

  @media (max-width: 640px) {
    padding-right: 16px;
  }
`;

const StatDivider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #e5e7eb;
  margin-right: 28px;
  flex-shrink: 0;

  @media (max-width: 640px) {
    margin-right: 16px;
  }
`;

const StatValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.numbers};
  font-size: 28px;
  font-weight: 700;
  color: #000000;
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-feature-settings: 'tnum' on, 'lnum' on;

  @media (min-width: 640px) {
    font-size: 32px;
  }
`;

const StatLabel = styled.div`
  font-size: 11.5px;
  color: #666666;
  font-weight: 450;
  margin-top: 6px;
  letter-spacing: -0.01em;
  white-space: nowrap;
`;

/* ================= RIGHT COLUMN: VERTICAL TIMELINE ================= */

const RightColumn = styled.div`
  position: relative;
  padding-top: 4px;
`;

const TimelineList = styled.div`
  position: relative;
  padding-left: 28px;

  &::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 14px;
    bottom: 24px;
    width: 1px;
    background-color: #e5e7eb;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: 26px;

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 26px;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const TimelineMarker = styled.div`
  position: absolute;
  left: -28px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #000000;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px #ffffff;
  z-index: 2;
`;

const TimelineTitle = styled.h3`
  font-size: 15.5px;
  font-weight: 700;
  color: #000000;
  letter-spacing: -0.02em;
  margin: 0 0 8px;
  line-height: 1.3;

  @media (min-width: 640px) {
    font-size: 16px;
  }
`;

const TimelineDescription = styled.p`
  font-size: 13px;
  color: #555555;
  line-height: 1.6;
  margin: 0;
`;

export function AboutSection() {
  const pillars = [
    {
      title: 'Documentation-Driven Architecture',
      description:
        'Instead of superficial video walkthroughs that quickly become obsolete, students learn to read, write, and dissect technical documentation inspired by React, Next.js, and MDN.',
    },
    {
      title: 'Production-Level Code & Realistic Budgets',
      description:
        'We don’t build toy applications. Interns configure real PostgreSQL schemas, write strict TypeScript contracts, and plan marketing campaigns with actual client ad spends and ROAS calculations.',
    },
    {
      title: 'Strict Quality Standards & Code Reviews',
      description:
        'Every pull request, audit deliverable, and campaign architecture receives rigorous feedback emphasizing clean code, security best practices, and user experience.',
    },
  ];

  return (
    <AboutWrapper id="about">
      <Container>
        <ContentGrid>
          {/* Left Column: Story, Vision & Minimal Horizontal Stats */}
          <LeftColumn>
            <SectionBadge>ABOUT THE PLATFORM</SectionBadge>

            <MainHeading>
              Built to Bridge The Void Between{' '}
              <HighlightWrapper>
                Academia and Industry Reality.
                <UnderlineSvg viewBox="0 0 280 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 6.5C80 2 200 2 278 6"
                    stroke="#000000"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                  />
                </UnderlineSvg>
              </HighlightWrapper>
            </MainHeading>

            <DescriptionParagraph>
              <strong>Learn with Umar</strong> was conceived as a rigorous,
              practical training ground for students and interns. Traditional
              education often teaches theoretical concepts disconnected from the
              actual workflows of engineering teams and digital marketing
              agencies.
            </DescriptionParagraph>

            <DescriptionParagraph>
              Our documentation-first philosophy teaches you how to think like a
              senior engineer and digital growth strategist: breaking complex
              problems down into first principles, understanding the runtime and
              algorithmic mechanics, and delivering production-ready value from
              day one.
            </DescriptionParagraph>

            {/* Minimal Horizontal Stats with Vertical Dividers (No decorative line above) */}
            <StatsContainer>
              <StatBlock>
                <StatValue>40</StatValue>
                <StatLabel>Complete Modules</StatLabel>
              </StatBlock>

              <StatDivider />

              <StatBlock>
                <StatValue>24</StatValue>
                <StatLabel>Portfolio Projects</StatLabel>
              </StatBlock>

              <StatDivider />

              <StatBlock>
                <StatValue>Zero</StatValue>
                <StatLabel>Unexplained Magic</StatLabel>
              </StatBlock>
            </StatsContainer>
          </LeftColumn>

          {/* Right Column: Minimal Vertical Timeline List */}
          <RightColumn>
            <TimelineList>
              {pillars.map((item, idx) => (
                <TimelineItem key={idx}>
                  <TimelineMarker />
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineDescription>{item.description}</TimelineDescription>
                </TimelineItem>
              ))}
            </TimelineList>
          </RightColumn>
        </ContentGrid>
      </Container>
    </AboutWrapper>
  );
}
