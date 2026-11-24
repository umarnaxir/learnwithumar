'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Box, Flex, Container, Button } from '@/components/ui/primitives';
import { ArrowRight } from 'lucide-react';

const HeroWrapper = styled.section`
  padding: 56px 0 36px;
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'radial-gradient(circle at 50% 0%, rgba(30, 30, 30, 0.4) 0%, rgba(0, 0, 0, 1) 75%)'
      : 'radial-gradient(circle at 50% 0%, rgba(244, 244, 244, 0.6) 0%, rgba(255, 255, 255, 1) 75%)'};

  @media (min-width: 768px) {
    padding: 72px 0 48px;
  }
`;

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;

  @media (min-width: 400px) {
    font-size: 28px;
    line-height: 1.14;
  }

  @media (min-width: 640px) {
    font-size: 34px;
  }

  @media (min-width: 1024px) {
    font-size: 38px;
  }
`;

const HeroSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  font-weight: 450;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto 24px;

  @media (min-width: 480px) {
    font-size: 13.5px;
  }

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const MetricsStrip = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 12px;

  @media (min-width: 540px) {
    display: flex;
    margin-top: 44px;
    justify-content: center;
    gap: 28px;
    flex-wrap: wrap;
  }

  @media (min-width: 640px) {
    gap: 48px;
  }

  @media (min-width: 1024px) {
    gap: 60px;
  }
`;

const MetricBox = styled(Box)`
  text-align: center;
`;

const MetricValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.numbers};
  font-size: 30px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.04em;
  line-height: 1.05;
  font-feature-settings: 'tnum' on, 'lnum' on;

  @media (min-width: 480px) {
    font-size: 38px;
  }

  @media (min-width: 640px) {
    font-size: 46px;
  }

  @media (min-width: 1024px) {
    font-size: 52px;
  }
`;

const MetricLabel = styled.div`
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 450;
  margin-top: 6px;
  letter-spacing: -0.01em;
`;

export function HeroSection() {
  return (
    <HeroWrapper>
      <Container>
        <Box textAlign="center" maxWidth="720px" mx="auto">
          {/* Title */}
          <HeroTitle>Learn. Build. Grow.</HeroTitle>

          {/* Subtitle */}
          <HeroSubtitle>
            Master the skills that build the digital world. Learn Full Stack
            Development and Digital Marketing through structured lessons,
            practical projects, and industry-focused training.
          </HeroSubtitle>

          {/* CTA Buttons */}
          <Flex
            justifyContent="center"
            alignItems="center"
            gap="10px"
            flexWrap="wrap"
          >
            <Button
              as={Link}
              href="/learning-paths"
              size="md"
              variant="primary"
            >
              <span>Explore Learning Paths</span>
              <ArrowRight size={14} />
            </Button>

            <Button
              as={Link}
              href="/full-stack"
              size="md"
              variant="secondary"
            >
              <span>Start Learning</span>
            </Button>
          </Flex>

          {/* Metric Highlights */}
          <MetricsStrip>
            <MetricBox>
              <MetricValue>40</MetricValue>
              <MetricLabel>Curriculum Modules</MetricLabel>
            </MetricBox>
            <MetricBox>
              <MetricValue>350+</MetricValue>
              <MetricLabel>Documented Topics</MetricLabel>
            </MetricBox>
            <MetricBox>
              <MetricValue>24</MetricValue>
              <MetricLabel>Production Projects</MetricLabel>
            </MetricBox>
            <MetricBox>
              <MetricValue>100%</MetricValue>
              <MetricLabel>Industry Standard</MetricLabel>
            </MetricBox>
          </MetricsStrip>
        </Box>
      </Container>
    </HeroWrapper>
  );
}
