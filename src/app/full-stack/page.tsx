'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Box, Flex, Container, Text, Card, Button, Badge } from '@/components/ui/primitives';
import { FULL_STACK_LEVELS, FULL_STACK_MODULES } from '@/data/curriculum/full-stack-curriculum';
import { useStudentProgress } from '@/hooks/useStudentProgress';
import {
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

const HubHeader = styled.section`
  padding: 40px 0 28px;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
`;

const FilterTabs = styled(Flex)`
  gap: 6px;
  overflow-x: auto;
  padding: 12px 0;
  margin-bottom: 24px;
  border-bottom: 1px solid #eaeaea;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterTabBtn = styled.button<{ $isActive: boolean }>`
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '450')};
  background-color: ${({ $isActive }) => ($isActive ? '#000000' : '#F4F4F5')};
  color: ${({ $isActive }) => ($isActive ? '#FFFFFF' : '#555555')};
  white-space: nowrap;
  transition: all 0.15s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? '#222222' : '#EAEAEA')};
    color: ${({ $isActive }) => ($isActive ? '#FFFFFF' : '#000000')};
  }
`;

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  margin-bottom: 64px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function FullStackHubPage() {
  const [selectedLevelId, setSelectedLevelId] = useState<string>('all');
  const { profile } = useStudentProgress();

  const filteredModules =
    selectedLevelId === 'all'
      ? FULL_STACK_MODULES
      : FULL_STACK_MODULES.filter((m) => m.levelId === selectedLevelId);

  // Total topics
  const totalTopics = FULL_STACK_MODULES.reduce((acc, m) => acc + m.topics.length, 0);
  const completedCount = profile.completedLessons.length;
  const progressPct = Math.min(100, Math.round((completedCount / totalTopics) * 100));

  return (
    <>
      <Navbar />
      <main>
        <HubHeader>
          <Container>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap="20px"
            >
              <Box maxWidth="640px">
                <Flex alignItems="center" gap="8px" mb="8px">
                  <Badge variant="dark">Track 01</Badge>
                  <span style={{ fontSize: '11.5px', color: '#666666' }}>
                    7 Levels • 20 Modules • 200+ Lessons
                  </span>
                </Flex>
                <h1
                  style={{
                    fontSize: '24px',
                    fontWeight: 800,
                    letterSpacing: '-0.025em',
                    color: '#000000',
                    marginBottom: '8px',
                  }}
                >
                  Full Stack Web Development
                </h1>
                <Text fontSize="13.5px" color="#555555" lineHeight="relaxed">
                  Start from absolute fundamentals and progress to senior-level
                  engineering: web protocols, modern CSS3 layout engines, React 19,
                  TypeScript type safety, Next.js App Router, Node.js, and PostgreSQL.
                </Text>
              </Box>

              {/* Progress Card */}
              <Card
                p="16px 20px"
                bg="#FAF9F6"
                border="1px solid #EAEAEA"
                borderRadius="10px"
                style={{ minWidth: '240px' }}
              >
                <Text fontSize="11px" fontWeight="700" color="#888888" textTransform="uppercase" mb="4px">
                  Your Track Progress
                </Text>
                <Flex alignItems="baseline" gap="8px" mb="6px">
                  <Text fontSize="22px" fontWeight="800" color="#000000">
                    {progressPct}%
                  </Text>
                  <Text fontSize="11.5px" color="#666666">
                    {completedCount} lessons completed
                  </Text>
                </Flex>
                <div
                  style={{
                    height: '5px',
                    backgroundColor: '#EAEAEA',
                    borderRadius: '999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${progressPct}%`,
                      backgroundColor: '#000000',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </Card>
            </Flex>
          </Container>
        </HubHeader>

        <Container>
          {/* Level Filter Tabs */}
          <FilterTabs>
            <FilterTabBtn
              $isActive={selectedLevelId === 'all'}
              onClick={() => setSelectedLevelId('all')}
            >
              All 20 Modules
            </FilterTabBtn>
            {FULL_STACK_LEVELS.map((lvl) => (
              <FilterTabBtn
                key={lvl.id}
                $isActive={selectedLevelId === lvl.id}
                onClick={() => setSelectedLevelId(lvl.id)}
              >
                L{lvl.levelNumber}: {lvl.title}
              </FilterTabBtn>
            ))}
          </FilterTabs>

          {/* Modules Grid */}
          <ModulesGrid>
            {filteredModules.map((mod) => {
              const firstTopic = mod.topics[0];
              return (
                <Card
                  key={mod.id}
                  p="20px"
                  bg="#FFFFFF"
                  border="1px solid #EAEAEA"
                  borderRadius="10px"
                  display="flex"
                  flexDirection="column"
                  interactive
                >
                  <Flex alignItems="center" justifyContent="space-between" mb="12px">
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        backgroundColor: '#000000',
                        color: '#FFFFFF',
                        padding: '2.5px 7px',
                        borderRadius: '4px',
                      }}
                    >
                      Module {mod.moduleNumber}
                    </span>
                    <Badge variant="neutral">{mod.duration}</Badge>
                  </Flex>

                  <h3
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      letterSpacing: '-0.015em',
                      color: '#000000',
                      marginBottom: '6px',
                    }}
                  >
                    {mod.title}
                  </h3>

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
                    {mod.description}
                  </Text>

                  {/* Topic Checklist Preview */}
                  <Box mb="16px">
                    <Text
                      fontSize="10.5px"
                      fontWeight="700"
                      color="#888888"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                      mb="6px"
                    >
                      Included Lessons ({mod.topics.length}):
                    </Text>
                    <Box display="flex" flexDirection="column" gap="4px">
                      {mod.topics.slice(0, 3).map((t) => (
                        <Flex
                          key={t.id}
                          alignItems="center"
                          gap="6px"
                          fontSize="11.5px"
                          color="#444444"
                        >
                          <ChevronRight size={12} color="#888888" />
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {t.title}
                          </span>
                        </Flex>
                      ))}
                      {mod.topics.length > 3 && (
                        <Text fontSize="11.5px" color="#888888" mt="2px">
                          + {mod.topics.length - 3} more topics in this module
                        </Text>
                      )}
                    </Box>
                  </Box>

                  <Box mt="auto" pt="16px" borderTop="1px solid #F0F0F0">
                    <Button
                      as={Link}
                      href={`/full-stack/${mod.id}/${firstTopic?.id || ''}`}
                      variant="primary"
                      fullWidth
                      size="sm"
                    >
                      <span>Start Module Documentation</span>
                      <ArrowRight size={14} />
                    </Button>
                  </Box>
                </Card>
              );
            })}
          </ModulesGrid>
        </Container>
      </main>
      <Footer />
    </>
  );
}
