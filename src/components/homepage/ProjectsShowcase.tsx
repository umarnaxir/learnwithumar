'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Box, Flex, Container, Text, Card, Button, Badge } from '@/components/ui/primitives';
import { ALL_ASSIGNMENTS } from '@/data/assignments/assignments-data';
import { ArrowRight, Clock } from 'lucide-react';

const SectionWrapper = styled.section`
  padding: 48px 0;
  background-color: #ffffff;
`;

const ProjectsGrid = styled.div`
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
    gap: 18px;
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

const ProjectCard = styled(Card)`
  flex: 0 0 84%;
  min-width: 260px;
  max-width: 330px;
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

export function ProjectsShowcase() {
  const featured = ALL_ASSIGNMENTS.slice(0, 6);

  return (
    <SectionWrapper id="projects">
      <Container>
        <Flex
          alignItems="flex-end"
          justifyContent="space-between"
          flexWrap="wrap"
          gap="16px"
        >
          <Box maxWidth="560px">
            <Badge variant="dark" mb="8px">
              Hands-On Projects
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
              Practical Projects, Not Superficial Tutorials.
            </h2>
            <Text fontSize="13.5px" color="#555555" lineHeight="relaxed">
              Every concept is tested through comprehensive assignments evaluated
              against strict professional criteria.
            </Text>
          </Box>

          <Button as={Link} href="/projects" variant="outline" size="sm">
            <span>View All 24 Projects</span>
            <ArrowRight size={13} />
          </Button>
        </Flex>

        <MobileScrollHint>
          <span>Swipe to explore projects →</span>
        </MobileScrollHint>

        <ProjectsGrid>
          {featured.map((proj) => {
            const isFullStack = proj.trackId === 'full-stack';
            return (
              <ProjectCard
                key={proj.id}
                p="18px 20px"
                bg="#FFFFFF"
                border="1px solid #EAEAEA"
                display="flex"
                flexDirection="column"
                interactive
              >
                <Flex alignItems="center" justifyContent="space-between" mb="12px">
                  <Badge variant={isFullStack ? 'dark' : 'neutral'}>
                    {isFullStack ? 'Full Stack' : 'Digital Marketing'}
                  </Badge>
                  <Flex alignItems="center" gap="4px" fontSize="11px" color="#888888">
                    <Clock size={12} />
                    <span style={{ fontFamily: "'Cabinet Grotesk', 'Space Grotesk', sans-serif", fontWeight: 600 }}>
                      {proj.estimatedHours}h
                    </span>
                  </Flex>
                </Flex>

                <Text fontSize="15px" fontWeight="600" color="#111111" mb="6px">
                  {proj.title}
                </Text>

                <Text
                  fontSize="12.5px"
                  color="#555555"
                  lineHeight="relaxed"
                  mb="16px"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {proj.description}
                </Text>

                <Box mt="auto" pt="12px" borderTop="1px solid #F0F0F0">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Badge variant="neutral">{proj.difficulty}</Badge>
                    <Link
                      href="/projects"
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 600,
                        color: '#000000',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>Rubric & Brief</span>
                      <ArrowRight size={12} />
                    </Link>
                  </Flex>
                </Box>
              </ProjectCard>
            );
          })}
        </ProjectsGrid>
      </Container>
    </SectionWrapper>
  );
}
