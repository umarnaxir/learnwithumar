'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Box, Flex, Container, Text, Card, Button, Badge } from '@/components/ui/primitives';
import {
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const AboutHero = styled.section`
  padding: 44px 0 32px;
  background-color: #fafafa;
  border-bottom: 1px solid #eaeaea;
  text-align: center;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin: 40px 0;

  @media (min-width: 960px) {
    grid-template-columns: 1.2fr 1fr;
    align-items: flex-start;
  }
`;

export function AboutClientView() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero>
          <Container>
            <Box maxWidth="640px" mx="auto">
              <Badge variant="dark" mb="10px">
                Philosophy & Mentorship
              </Badge>
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  letterSpacing: '-0.025em',
                  color: '#000000',
                  marginBottom: '8px',
                }}
              >
                About Learn with Umar
              </h1>
              <Text fontSize="13.5px" color="#555555" lineHeight="relaxed">
                An unapologetically rigorous educational platform engineered to train
                students and interns in Full Stack Web Development and Digital Marketing.
              </Text>
            </Box>
          </Container>
        </AboutHero>

        <Container style={{ paddingBottom: '72px' }}>
          <ContentGrid>
            {/* Main Narrative */}
            <Box>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: '#000000',
                  marginBottom: '12px',
                }}
              >
                The Mentorship Vision
              </h2>
              <Text fontSize="13px" color="#444444" lineHeight="relaxed" mb="12px">
                Most educational platforms fail students by reducing software
                engineering to shallow syntax tutorials and digital marketing to
                vanity social media metrics. When graduates enter real agency and
                software development environments, they are stunned by the sheer gap
                in expectations: Git branch management, production Docker builds,
                relational database normal forms, Google algorithm crawl budgets,
                and high-stake ad spend allocations.
              </Text>
              <Text fontSize="13px" color="#444444" lineHeight="relaxed" mb="16px">
                <strong>Learn with Umar</strong> was founded to permanently bridge
                this gap. Inspired by the clarity and precision of world-class
                documentation systems (React, Next.js, MDN Web Docs, and Google
                Search Central), every topic on this platform is structured to build
                deep mental models rather than fleeting rote memorization.
              </Text>

              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  letterSpacing: '-0.015em',
                  color: '#000000',
                  marginTop: '24px',
                  marginBottom: '12px',
                }}
              >
                Our Three Core Pillars
              </h3>

              <Box display="flex" flexDirection="column" gap="10px" mb="24px">
                <Card p="14px" bg="#FFFFFF" border="1px solid #EAEAEA" borderRadius="8px">
                  <Flex alignItems="flex-start" gap="10px">
                    <CheckCircle2 size={16} color="#000000" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <Box>
                      <Text fontSize="13px" fontWeight="700" color="#000000" mb="2px">
                        1. Documentation-First Pedagogy
                      </Text>
                      <Text fontSize="12px" color="#555555" lineHeight="relaxed">
                        Students learn to read, write, and reference technical
                        documentation. We provide comprehensive syntax definitions,
                        concrete code examples, and links to verified official standards.
                      </Text>
                    </Box>
                  </Flex>
                </Card>

                <Card p="14px" bg="#FFFFFF" border="1px solid #EAEAEA" borderRadius="8px">
                  <Flex alignItems="flex-start" gap="10px">
                    <CheckCircle2 size={16} color="#000000" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <Box>
                      <Text fontSize="13px" fontWeight="700" color="#000000" mb="2px">
                        2. Production-Grade Proof of Work
                      </Text>
                      <Text fontSize="12px" color="#555555" lineHeight="relaxed">
                        Rather than building uninspired todo apps, interns engineer
                        relational PostgreSQL SaaS databases, NestJS microservices,
                        and execute comprehensive 360° technical SEO audits with
                        verifiable client deliverables.
                      </Text>
                    </Box>
                  </Flex>
                </Card>

                <Card p="14px" bg="#FFFFFF" border="1px solid #EAEAEA" borderRadius="8px">
                  <Flex alignItems="flex-start" gap="10px">
                    <CheckCircle2 size={16} color="#000000" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <Box>
                      <Text fontSize="13px" fontWeight="700" color="#000000" mb="2px">
                        3. Pure Black & White Minimal Architecture
                      </Text>
                      <Text fontSize="12px" color="#555555" lineHeight="relaxed">
                        Zero visual noise, zero bloated CSS frameworks. Pure Styled
                        Components and Styled System tokens providing a serene,
                        distraction-free study sanctuary.
                      </Text>
                    </Box>
                  </Flex>
                </Card>
              </Box>
            </Box>

            {/* Right Column: Platform Metrics & Callout */}
            <Box>
              <Card p={['16px', '20px']} bg="#FAF9F6" border="1px solid #000000" borderRadius="10px" mb="20px">
                <Badge variant="dark" mb="10px">
                  Curriculum Overview
                </Badge>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#000000', marginBottom: '6px' }}>
                  A Complete Learning Experience
                </h3>
                <Text fontSize="12.5px" color="#555555" lineHeight="relaxed" mb="16px">
                  From zero experience to industry-ready software engineering and growth
                  agency operations.
                </Text>

                <Box display="flex" flexDirection="column" gap="8px" mb="20px">
                  <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="4px" fontSize="11.5px" borderBottom="1px solid #EAEAEA" pb="5px">
                    <span style={{ color: '#666666' }}>Published Modules:</span>
                    <strong style={{ color: '#000000', fontFamily: "'Cabinet Grotesk', 'Space Grotesk', sans-serif" }}>
                      40 Full Modules
                    </strong>
                  </Flex>
                  <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="4px" fontSize="11.5px" borderBottom="1px solid #EAEAEA" pb="5px">
                    <span style={{ color: '#666666' }}>Documented Lessons:</span>
                    <strong style={{ color: '#000000', fontFamily: "'Cabinet Grotesk', 'Space Grotesk', sans-serif" }}>
                      380+ Topics
                    </strong>
                  </Flex>
                  <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="4px" fontSize="11.5px" borderBottom="1px solid #EAEAEA" pb="5px">
                    <span style={{ color: '#666666' }}>Portfolio Projects:</span>
                    <strong style={{ color: '#000000', fontFamily: "'Cabinet Grotesk', 'Space Grotesk', sans-serif" }}>
                      24 Production Projects
                    </strong>
                  </Flex>
                  <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="4px" fontSize="11.5px" borderBottom="1px solid #EAEAEA" pb="5px">
                    <span style={{ color: '#666666' }}>Styling Architecture:</span>
                    <strong style={{ color: '#000000' }}>Styled Components & System</strong>
                  </Flex>
                  <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="4px" fontSize="11.5px">
                    <span style={{ color: '#666666' }}>Framework:</span>
                    <strong style={{ color: '#000000' }}>Next.js App Router & React 19</strong>
                  </Flex>
                </Box>

                <Button as={Link} href="/learning-paths" variant="primary" fullWidth size="md">
                  <span>Explore Learning Paths</span>
                  <ArrowRight size={13} />
                </Button>
              </Card>
            </Box>
          </ContentGrid>
        </Container>
      </main>
      <Footer />
    </>
  );
}
