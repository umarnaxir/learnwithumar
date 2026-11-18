'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Box, Flex, Container, Button, Badge } from '@/components/ui/primitives';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroWrapper = styled.section`
  padding: 56px 0 36px;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(244, 244, 244, 0.6) 0%,
    rgba(255, 255, 255, 1) 75%
  );

  @media (min-width: 768px) {
    padding: 72px 0 48px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 28px;
  font-weight: 850;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: #000000;
  margin-bottom: 12px;

  @media (min-width: 640px) {
    font-size: 34px;
  }

  @media (min-width: 1024px) {
    font-size: 38px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 13.5px;
  line-height: 1.6;
  color: #555555;
  max-width: 600px;
  margin: 0 auto 24px;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const MetricsStrip = styled(Flex)`
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    gap: 40px;
  }
`;

const MetricBox = styled(Box)`
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #000000;
  letter-spacing: -0.02em;
`;

const MetricLabel = styled.div`
  font-size: 10.5px;
  color: #666666;
  font-weight: 500;
  margin-top: 2px;
`;

export function HeroSection() {
  return (
    <HeroWrapper>
      <Container>
        <Box textAlign="center" maxWidth="720px" mx="auto">
          {/* Top Pill */}
          <Flex justifyContent="center" mb="16px">
            <Badge
              variant="neutral"
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              }}
            >
              <Sparkles size={12} color="#000000" />
              <span>Structured Technical & Marketing Education</span>
            </Badge>
          </Flex>

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
