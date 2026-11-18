'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Box, Flex, Container, Text, Card, Button, Badge } from '@/components/ui/primitives';
import { FULL_STACK_LEVELS, FULL_STACK_MODULES } from '@/data/curriculum/full-stack-curriculum';
import { DIGITAL_MARKETING_LEVELS, DIGITAL_MARKETING_MODULES } from '@/data/curriculum/digital-marketing-curriculum';
import { Code2, TrendingUp, ArrowRight } from 'lucide-react';

const HeaderBanner = styled.section`
  padding: 44px 0 32px;
  background-color: #fafafa;
  border-bottom: 1px solid #eaeaea;
  text-align: center;
`;

const TracksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  margin: 40px 0;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default function LearningPathsPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeaderBanner>
          <Container>
            <Box maxWidth="640px" mx="auto">
              <Badge variant="dark" mb="10px">
                Platform Curricula
              </Badge>
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  color: '#000000',
                  marginBottom: '10px',
                }}
              >
                Comprehensive Learning Paths
              </h1>
              <Text fontSize="13.5px" color="#555555" lineHeight="relaxed">
                Structured, documentation-driven mastery tracks designed to train
                interns and students into industry-ready software engineers and
                growth strategists.
              </Text>
            </Box>
          </Container>
        </HeaderBanner>

        <Container>
          <TracksGrid>
            {/* FULL STACK TRACK SUMMARY */}
            <Card p="24px" bg="#FFFFFF" border="1px solid #000000" borderRadius="12px">
              <Flex alignItems="center" justifyContent="space-between" mb="16px">
                <Box p="10px" bg="#000000" color="#FFFFFF" borderRadius="8px">
                  <Code2 size={20} />
                </Box>
                <Badge variant="dark">Track 01 • 7 Levels</Badge>
              </Flex>

              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#000000',
                  marginBottom: '8px',
                }}
              >
                Full Stack Web Development
              </h2>
              <Text fontSize="13px" color="#555555" lineHeight="relaxed" mb="20px">
                Master the full spectrum of modern web architecture from raw HTTP
                packets and CSS layouts to React 19, TypeScript, Next.js App Router,
                Node.js microservices, PostgreSQL relational modeling, and Docker.
              </Text>

              <Box mb="22px">
                <Text
                  fontSize="11px"
                  fontWeight="700"
                  color="#888888"
                  textTransform="uppercase"
                  letterSpacing="0.06em"
                  mb="10px"
                >
                  Curriculum Levels (20 Modules):
                </Text>
                <Box display="flex" flexDirection="column" gap="6px">
                  {FULL_STACK_LEVELS.map((lvl) => (
                    <Flex
                      key={lvl.id}
                      alignItems="center"
                      justifyContent="space-between"
                      p="8px 12px"
                      bg="#F8F8F8"
                      borderRadius="6px"
                    >
                      <Flex alignItems="center" gap="8px">
                        <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#888888' }}>
                          L{lvl.levelNumber}
                        </span>
                        <Text fontSize="12px" fontWeight="600" color="#111111">
                          {lvl.title}
                        </Text>
                      </Flex>
                      <span style={{ fontSize: '11px', color: '#666666' }}>
                        {FULL_STACK_MODULES.filter((m) => m.levelId === lvl.id).length} Modules
                      </span>
                    </Flex>
                  ))}
                </Box>
              </Box>

              <Button
                as={Link}
                href="/full-stack"
                variant="primary"
                fullWidth
                size="md"
              >
                <span>Enter Full Stack Track</span>
                <ArrowRight size={14} />
              </Button>
            </Card>

            {/* DIGITAL MARKETING TRACK SUMMARY */}
            <Card p="24px" bg="#FFFFFF" border="1px solid #000000" borderRadius="12px">
              <Flex alignItems="center" justifyContent="space-between" mb="16px">
                <Box p="10px" bg="#000000" color="#FFFFFF" borderRadius="8px">
                  <TrendingUp size={20} />
                </Box>
                <Badge variant="dark">Track 02 • 8 Levels</Badge>
              </Flex>

              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#000000',
                  marginBottom: '8px',
                }}
              >
                Digital Marketing Mastery
              </h2>
              <Text fontSize="13px" color="#555555" lineHeight="relaxed" mb="20px">
                Engineered for growth marketing professionals: comprehensive
                coverage of technical SEO, Google Search & Shopping Ads, Meta Ads
                Manager, high-converting lead funnels, GA4 analytics attribution,
                and agency operations.
              </Text>

              <Box mb="22px">
                <Text
                  fontSize="11px"
                  fontWeight="700"
                  color="#888888"
                  textTransform="uppercase"
                  letterSpacing="0.06em"
                  mb="10px"
                >
                  Curriculum Levels (20 Modules):
                </Text>
                <Box display="flex" flexDirection="column" gap="6px">
                  {DIGITAL_MARKETING_LEVELS.map((lvl) => (
                    <Flex
                      key={lvl.id}
                      alignItems="center"
                      justifyContent="space-between"
                      p="8px 12px"
                      bg="#F8F8F8"
                      borderRadius="6px"
                    >
                      <Flex alignItems="center" gap="8px">
                        <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#888888' }}>
                          L{lvl.levelNumber}
                        </span>
                        <Text fontSize="12px" fontWeight="600" color="#111111">
                          {lvl.title}
                        </Text>
                      </Flex>
                      <span style={{ fontSize: '11px', color: '#666666' }}>
                        {DIGITAL_MARKETING_MODULES.filter((m) => m.levelId === lvl.id).length} Modules
                      </span>
                    </Flex>
                  ))}
                </Box>
              </Box>

              <Button
                as={Link}
                href="/digital-marketing"
                variant="primary"
                fullWidth
                size="md"
              >
                <span>Enter Marketing Track</span>
                <ArrowRight size={14} />
              </Button>
            </Card>
          </TracksGrid>
        </Container>
      </main>
      <Footer />
    </>
  );
}
