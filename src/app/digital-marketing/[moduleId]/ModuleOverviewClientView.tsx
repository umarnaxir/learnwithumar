'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Box, Flex, Container, Text, Card, Button, Badge } from '@/components/ui/primitives';
import { DIGITAL_MARKETING_MODULES } from '@/data/curriculum/digital-marketing-curriculum';
import { ArrowRight } from 'lucide-react';

const ModuleHeader = styled.section`
  padding: 40px 0 28px;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
`;

export function DigitalMarketingModuleOverviewClientView({ moduleId }: { moduleId: string }) {
  const mod = DIGITAL_MARKETING_MODULES.find((m) => m.id === moduleId);

  if (!mod) {
    return (
      <>
        <Navbar />
        <Container style={{ padding: '60px 20px', textAlign: 'center' }}>
          <Text fontSize="20px" fontWeight="700" mb="10px">
            Module Not Found
          </Text>
          <Button as={Link} href="/digital-marketing" variant="primary">
            Back to Digital Marketing Track
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  const firstTopic = mod.topics[0];

  return (
    <>
      <Navbar />
      <main>
        <ModuleHeader>
          <Container>
            <Box maxWidth="680px">
              <Flex alignItems="center" gap="6px" mb="10px">
                <Link href="/digital-marketing" style={{ fontSize: '12px', color: '#666666' }}>
                  Digital Marketing Track
                </Link>
                <span style={{ fontSize: '11px', color: '#999999' }}>/</span>
                <span style={{ fontSize: '12px', color: '#000000', fontWeight: 600 }}>
                  Module {mod.moduleNumber}
                </span>
              </Flex>

              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  letterSpacing: '-0.025em',
                  color: '#000000',
                  marginBottom: '8px',
                }}
              >
                {mod.title}
              </h1>

              <Text fontSize="13.5px" color="#555555" lineHeight="relaxed" mb="18px">
                {mod.description}
              </Text>

              <Flex alignItems="center" gap="12px" mb="22px" flexWrap="wrap">
                <Badge variant="dark">Duration: {mod.duration}</Badge>
                <Badge variant="neutral">{mod.topics.length} Documented Lessons</Badge>
              </Flex>

              {firstTopic && (
                <Button
                  as={Link}
                  href={`/digital-marketing/${mod.id}/${firstTopic.id}`}
                  variant="primary"
                  size="md"
                >
                  <span>Start First Lesson: {firstTopic.title}</span>
                  <ArrowRight size={14} />
                </Button>
              )}
            </Box>
          </Container>
        </ModuleHeader>

        <Container style={{ padding: '36px 20px 64px' }}>
          <Text
            fontSize="11px"
            fontWeight="700"
            color="#888888"
            textTransform="uppercase"
            letterSpacing="0.06em"
            mb="16px"
          >
            Module Syllabus & Topics ({mod.topics.length})
          </Text>

          <Box display="flex" flexDirection="column" gap="10px" width="100%">
            {mod.topics.map((topic, idx) => (
              <Card
                key={topic.id}
                as={Link}
                href={`/digital-marketing/${mod.id}/${topic.id}`}
                p="14px 18px"
                bg="#FFFFFF"
                border="1px solid #EAEAEA"
                borderRadius="8px"
                interactive
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                  gap="10px"
                >
                  <Flex alignItems="center" gap="12px">
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: '#F4F4F5',
                        color: '#555555',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </span>
                    <Box>
                      <Text fontSize="13.5px" fontWeight="600" color="#111111" mb="2px">
                        {topic.title}
                      </Text>
                      <Text fontSize="12px" color="#666666">
                        {topic.summary}
                      </Text>
                    </Box>
                  </Flex>

                  <Flex alignItems="center" gap="12px">
                    <span style={{ fontSize: '11.5px', color: '#888888' }}>
                      {topic.duration}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      style={{ pointerEvents: 'none' }}
                    >
                      <span>Read Documentation</span>
                      <ArrowRight size={12} />
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
}
