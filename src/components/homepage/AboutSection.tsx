'use client';

import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Container, Text, Card, Badge } from '@/components/ui/primitives';
import { Check } from 'lucide-react';

const AboutWrapper = styled.section`
  padding: 48px 0;
  background-color: #fbfbfc;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 36px;

  @media (min-width: 960px) {
    grid-template-columns: 1.1fr 1fr;
    align-items: center;
  }
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
          {/* Left Column: Story & Vision */}
          <Box>
            <Badge variant="dark" mb="10px">
              About The Platform
            </Badge>
            <h2
              style={{
                fontSize: '23px',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                color: '#000000',
                marginBottom: '12px',
                lineHeight: 1.25,
              }}
            >
              Built to Bridge The Void Between Academia and Industry Reality.
            </h2>
            <Text fontSize="13.5px" color="#555555" lineHeight="relaxed" mb="12px">
              <strong>Learn with Umar</strong> was conceived as a rigorous,
              practical training ground for students and interns. Traditional
              education often teaches theoretical concepts disconnected from the
              actual workflows of engineering teams and digital marketing
              agencies.
            </Text>
            <Text fontSize="13px" color="#555555" lineHeight="relaxed" mb="20px">
              Our documentation-first philosophy teaches you how to think like a
              senior engineer and digital growth strategist: breaking complex
              problems down into first principles, understanding the runtime and
              algorithmic mechanics, and delivering production-ready value from
              day one.
            </Text>

            <Flex gap="12px" flexWrap="wrap">
              <Box p="10px 14px" bg="#FFFFFF" border="1px solid #EAEAEA" borderRadius="6px">
                <Text fontSize="17px" fontWeight="800" color="#000000">
                  40
                </Text>
                <Text fontSize="11px" color="#666666">
                  Complete Modules
                </Text>
              </Box>
              <Box p="10px 14px" bg="#FFFFFF" border="1px solid #EAEAEA" borderRadius="6px">
                <Text fontSize="17px" fontWeight="800" color="#000000">
                  24
                </Text>
                <Text fontSize="11px" color="#666666">
                  Portfolio Projects
                </Text>
              </Box>
              <Box p="10px 14px" bg="#FFFFFF" border="1px solid #EAEAEA" borderRadius="6px">
                <Text fontSize="17px" fontWeight="800" color="#000000">
                  Zero
                </Text>
                <Text fontSize="11px" color="#666666">
                  Unexplained Magic
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Right Column: Key Commitments */}
          <Box display="flex" flexDirection="column" gap="12px">
            {pillars.map((item, idx) => (
              <Card key={idx} p="18px 20px" bg="#FFFFFF" border="1px solid #EAEAEA">
                <Flex alignItems="flex-start" gap="10px">
                  <Box
                    p="6px"
                    bg="#F4F4F5"
                    borderRadius="4px"
                    display="inline-flex"
                    mt="2px"
                  >
                    <Check size={14} color="#000000" />
                  </Box>
                  <Box>
                    <Text fontSize="14px" fontWeight="700" color="#111111" mb="4px">
                      {item.title}
                    </Text>
                    <Text fontSize="12.5px" color="#555555" lineHeight="relaxed">
                      {item.description}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            ))}
          </Box>
        </ContentGrid>
      </Container>
    </AboutWrapper>
  );
}
