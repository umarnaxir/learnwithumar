'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Box, Flex, Container, Text, Card, Button, Badge } from '@/components/ui/primitives';
import { FULL_STACK_LEVELS, FULL_STACK_MODULES } from '@/data/curriculum/full-stack-curriculum';
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
  padding: 12px 0 14px;
  margin-bottom: 24px;
  border-bottom: 1px solid #eaeaea;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

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
  flex-shrink: 0;

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? '#222222' : '#EAEAEA')};
    color: ${({ $isActive }) => ($isActive ? '#FFFFFF' : '#000000')};
  }
`;

const OverviewCard = styled(Card)`
  padding: 16px 20px;
  background-color: #faf9f6;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  width: 100%;

  @media (min-width: 640px) {
    width: auto;
    min-width: 220px;
  }
`;

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 64px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export function FullStackHubClientView() {
  const [selectedLevelId, setSelectedLevelId] = useState<string>('all');
  const [expandedSyllabus, setExpandedSyllabus] = useState<Record<string, boolean>>({});

  const toggleSyllabus = (modId: string) => {
    setExpandedSyllabus((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const filteredModules =
    selectedLevelId === 'all'
      ? FULL_STACK_MODULES
      : FULL_STACK_MODULES.filter((m) => m.levelId === selectedLevelId);

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
                    fontWeight: 600,
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

              {/* Curriculum Overview Card */}
              <OverviewCard>
                <Text fontSize="11px" fontWeight="600" color="#888888" textTransform="uppercase" mb="4px">
                  Curriculum Overview
                </Text>
                <Flex alignItems="baseline" gap="8px" mb="4px">
                  <Text
                    fontSize="22px"
                    fontWeight="700"
                    color="#000000"
                    style={{ fontFamily: "'Cabinet Grotesk', 'Space Grotesk', sans-serif" }}
                  >
                    20 Modules
                  </Text>
                </Flex>
                <Text fontSize="11.5px" color="#666666">
                  200+ Documented Lessons • 7 Levels
                </Text>
              </OverviewCard>
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

                  <Link
                    href={`/full-stack/${mod.id}/${firstTopic?.id || ''}`}
                    style={{ textDecoration: 'none', color: '#000000' }}
                  >
                    <h3
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        letterSpacing: '-0.015em',
                        marginBottom: '6px',
                        cursor: 'pointer',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                      }}
                    >
                      {mod.title}
                    </h3>
                  </Link>

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
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {mod.description}
                  </Text>

                  {/* Topic Checklist Preview with full interactive links */}
                  <Box mb="16px">
                    <Flex alignItems="center" justifyContent="space-between" mb="8px">
                      <Text
                        fontSize="10.5px"
                        fontWeight="700"
                        color="#888888"
                        textTransform="uppercase"
                        letterSpacing="0.05em"
                      >
                        Module Topics ({mod.topics.length}):
                      </Text>
                      {mod.topics.length > 4 && (
                        <button
                          onClick={() => toggleSyllabus(mod.id)}
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#000000',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            padding: 0,
                          }}
                        >
                          {expandedSyllabus[mod.id] ? 'Show less ↑' : `View all ${mod.topics.length} ↓`}
                        </button>
                      )}
                    </Flex>

                    <Box display="flex" flexDirection="column" gap="4px">
                      {(expandedSyllabus[mod.id] ? mod.topics : mod.topics.slice(0, 4)).map((t) => (
                        <Link
                          key={t.id}
                          href={`/full-stack/${mod.id}/${t.id}`}
                          style={{
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '6px',
                            padding: '4px 6px',
                            borderRadius: '4px',
                            color: '#222222',
                            fontSize: '11.5px',
                            backgroundColor: '#FAFAFA',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#F0F0F0';
                            e.currentTarget.style.color = '#000000';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#FAFAFA';
                            e.currentTarget.style.color = '#222222';
                          }}
                        >
                          <Flex alignItems="center" gap="6px" style={{ minWidth: 0, flex: 1 }}>
                            <ChevronRight size={12} color="#888888" style={{ flexShrink: 0 }} />
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {t.title}
                            </span>
                          </Flex>
                          <span style={{ fontSize: '10.5px', color: '#888888', flexShrink: 0 }}>
                            {t.duration}
                          </span>
                        </Link>
                      ))}
                    </Box>
                  </Box>

                  <Box mt="auto" pt="16px" borderTop="1px solid #F0F0F0" display="flex" flexDirection="column" gap="8px">
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
                    <Button
                      as={Link}
                      href={`/full-stack/${mod.id}`}
                      variant="outline"
                      fullWidth
                      size="sm"
                    >
                      <span>View Full Syllabus ({mod.topics.length} Lessons)</span>
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
