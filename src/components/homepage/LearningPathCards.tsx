'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Box, Flex, Container, Text, Button, Badge } from '@/components/ui/primitives';
import {
  Code2,
  TrendingUp,
  ArrowRight,
  Layers,
  Clock,
} from 'lucide-react';

const SectionWrapper = styled.section`
  padding: 48px 0;
  background-color: #ffffff;
`;

const SectionHeader = styled(Box)`
  text-align: center;
  max-width: 580px;
  margin: 0 auto 36px;
`;

const PathsGrid = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  gap: 16px;
  padding-bottom: 16px;
  margin-left: -16px;
  margin-right: -16px;
  padding-left: 16px;
  padding-right: 16px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
    overflow-x: visible;
  }

  @media (min-width: 860px) {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
`;

const PathCard = styled.div`
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  flex: 0 0 86%;
  min-width: 270px;
  max-width: 360px;
  scroll-snap-align: start;

  @media (min-width: 768px) {
    flex: initial;
    min-width: 0;
    max-width: none;
    padding: 24px 22px;
  }

  &:hover {
    border-color: #000000;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  }
`;

const MobileScrollHint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 11px;
  color: #888888;
  margin-bottom: 12px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const SkillBadge = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 500;
  color: #333333;
  background-color: #f5f5f5;
  border: 1px solid #eaeaea;
  padding: 2.5px 7px;
  border-radius: 4px;
`;

export function LearningPathCards() {
  const fullStackSkills = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Databases',
    'APIs',
    'Deployment',
  ];

  const digitalMarketingSkills = [
    'SEO',
    'Social Media Marketing',
    'Content Marketing',
    'Google Ads',
    'Meta Ads',
    'Lead Generation',
    'Analytics',
    'Conversion Optimization',
  ];

  return (
    <SectionWrapper id="learning-paths">
      <Container>
        <SectionHeader>
          <Badge variant="dark" mb="10px">
            Core Curriculum
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
            Two Professional Disciplines. Zero Fluff.
          </h2>
          <Text fontSize="13.5px" color="#555555" lineHeight="relaxed">
            Engineered from ground up for interns, career changers, and students.
            Select your professional domain and follow an end-to-end,
            documentation-backed mastery track.
          </Text>
        </SectionHeader>

        <MobileScrollHint>
          <span>Swipe to explore tracks →</span>
        </MobileScrollHint>

        <PathsGrid>
          {/* TRACK 1: Full Stack Web Development */}
          <PathCard>
            <Flex alignItems="center" justifyContent="space-between" mb="16px">
              <Box
                p="9px"
                bg="#000000"
                color="#FFFFFF"
                borderRadius="8px"
                display="inline-flex"
              >
                <Code2 size={18} />
              </Box>
              <Badge variant="neutral">Track 01 • 7 Levels</Badge>
            </Flex>

            <h3
              style={{
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              Full Stack Web Development
            </h3>

            <Text fontSize="13px" color="#555555" lineHeight="relaxed" mb="18px">
              From internet fundamentals, semantic HTML5, and CSS3 layouts, to
              asynchronous JavaScript, React 19, TypeScript, Next.js App Router,
              Node.js, PostgreSQL relational databases, and Docker DevOps.
            </Text>

            <Flex alignItems="center" gap="14px" mb="18px" flexWrap="wrap">
              <Flex alignItems="center" gap="5px" fontSize="12px" color="#444444">
                <Layers size={13} color="#888888" />
                <span>20 Modules • 200+ Topics</span>
              </Flex>
              <Flex alignItems="center" gap="5px" fontSize="12px" color="#444444">
                <Clock size={13} color="#888888" />
                <span>6 Months Immersive</span>
              </Flex>
            </Flex>

            <Box mb="20px">
              <Text
                fontSize="11px"
                fontWeight="700"
                color="#888888"
                textTransform="uppercase"
                letterSpacing="0.05em"
                mb="8px"
              >
                Mastery Technologies:
              </Text>
              <Flex gap="5px" flexWrap="wrap">
                {fullStackSkills.map((skill) => (
                  <SkillBadge key={skill}>{skill}</SkillBadge>
                ))}
              </Flex>
            </Box>

            <Box mt="auto">
              <Button
                as={Link}
                href="/full-stack"
                variant="primary"
                fullWidth
                size="sm"
              >
                <span>Explore Full Stack Track</span>
                <ArrowRight size={13} />
              </Button>
            </Box>
          </PathCard>

          {/* TRACK 2: Digital Marketing */}
          <PathCard>
            <Flex alignItems="center" justifyContent="space-between" mb="16px">
              <Box
                p="9px"
                bg="#000000"
                color="#FFFFFF"
                borderRadius="8px"
                display="inline-flex"
              >
                <TrendingUp size={18} />
              </Box>
              <Badge variant="neutral">Track 02 • 8 Levels</Badge>
            </Flex>

            <h3
              style={{
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              Digital Marketing Mastery
            </h3>

            <Text fontSize="13px" color="#555555" lineHeight="relaxed" mb="18px">
              Master sustainable organic discovery with technical SEO, multi-platform
              social algorithms, short-form viral video, high-ROI Google & Meta paid
              ads, lead funnels, GA4 attribution, and marketing agency operations.
            </Text>

            <Flex alignItems="center" gap="14px" mb="18px" flexWrap="wrap">
              <Flex alignItems="center" gap="5px" fontSize="12px" color="#444444">
                <Layers size={13} color="#888888" />
                <span>20 Modules • 180+ Topics</span>
              </Flex>
              <Flex alignItems="center" gap="5px" fontSize="12px" color="#444444">
                <Clock size={13} color="#888888" />
                <span>5 Months Immersive</span>
              </Flex>
            </Flex>

            <Box mb="20px">
              <Text
                fontSize="11px"
                fontWeight="700"
                color="#888888"
                textTransform="uppercase"
                letterSpacing="0.05em"
                mb="8px"
              >
                Core Channels & Competencies:
              </Text>
              <Flex gap="5px" flexWrap="wrap">
                {digitalMarketingSkills.map((skill) => (
                  <SkillBadge key={skill}>{skill}</SkillBadge>
                ))}
              </Flex>
            </Box>

            <Box mt="auto">
              <Button
                as={Link}
                href="/digital-marketing"
                variant="primary"
                fullWidth
                size="sm"
              >
                <span>Explore Marketing Track</span>
                <ArrowRight size={13} />
              </Button>
            </Box>
          </PathCard>
        </PathsGrid>
      </Container>
    </SectionWrapper>
  );
}
