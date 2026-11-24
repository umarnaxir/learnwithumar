'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Box, Flex, Container, Text, Card, Button, Badge } from '@/components/ui/primitives';
import { FULL_STACK_MODULES } from '@/data/curriculum/full-stack-curriculum';
import { ArrowRight } from 'lucide-react';

const ModuleHeader = styled.section`
  padding: 40px 0 28px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const LessonNumberCircle = styled.span`
  font-size: 11px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
`;

export function FullStackModuleOverviewClientView({ moduleId }: { moduleId: string }) {
  const mod = FULL_STACK_MODULES.find((m) => m.id === moduleId);

  if (!mod) {
    return (
      <>
        <Navbar />
        <Container style={{ padding: '60px 20px', textAlign: 'center' }}>
          <Text fontSize="20px" fontWeight="700" mb="10px">
            Module Not Found
          </Text>
          <Button as={Link} href="/full-stack" variant="primary">
            Back to Full Stack Track
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
                <Link href="/full-stack" style={{ fontSize: '12px', color: 'inherit', opacity: 0.7 }}>
                  Full Stack Track
                </Link>
                <span style={{ fontSize: '11px', opacity: 0.5 }}>/</span>
                <span style={{ fontSize: '12px', color: 'inherit', fontWeight: 600 }}>
                  Module {mod.moduleNumber}
                </span>
              </Flex>

              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  color: 'inherit',
                  marginBottom: '8px',
                }}
              >
                {mod.title}
              </h1>

              <Text fontSize="13.5px" color="textSecondary" lineHeight="relaxed" mb="18px">
                {mod.description}
              </Text>

              <Flex alignItems="center" gap="12px" mb="22px" flexWrap="wrap">
                <Badge variant="dark">Duration: {mod.duration}</Badge>
                <Badge variant="neutral">{mod.topics.length} Documented Lessons</Badge>
              </Flex>

              {firstTopic && (
                <Button
                  as={Link}
                  href={`/full-stack/${mod.id}/${firstTopic.id}`}
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
            color="textMuted"
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
                href={`/full-stack/${mod.id}/${topic.id}`}
                p="14px 18px"
                bg="cardBg"
                border="1px solid"
                borderColor="border"
                borderRadius="8px"
                interactive
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <Flex
                  alignItems={['flex-start', 'flex-start', 'center']}
                  justifyContent="space-between"
                  flexDirection={['column', 'column', 'row']}
                  gap="10px"
                >
                  <Flex alignItems="flex-start" gap="10px" style={{ minWidth: 0, flex: 1 }}>
                    <LessonNumberCircle>
                      {idx + 1}
                    </LessonNumberCircle>
                    <Box style={{ minWidth: 0 }}>
                      <Text fontSize="13.5px" fontWeight="600" color="text" mb="2px" style={{ wordBreak: 'break-word' }}>
                        {topic.title}
                      </Text>
                      <Text fontSize="12px" color="textSecondary" style={{ wordBreak: 'break-word' }}>
                        {topic.summary}
                      </Text>
                    </Box>
                  </Flex>

                  <Flex alignItems="center" justifyContent="space-between" width={['100%', '100%', 'auto']} gap="12px" pt={['8px', '8px', 0]}>
                    <span style={{ fontSize: '11.5px', color: 'inherit', opacity: 0.7, whiteSpace: 'nowrap' }}>
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
