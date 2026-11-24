'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Box, Flex, Container, Text, Card, Button, Badge } from '@/components/ui/primitives';
import { DIGITAL_MARKETING_LEVELS, DIGITAL_MARKETING_MODULES } from '@/data/curriculum/digital-marketing-curriculum';
import {
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

const HubHeader = styled.section`
  padding: 40px 0 28px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const FilterTabs = styled(Flex)`
  gap: 6px;
  overflow-x: auto;
  padding: 12px 0 14px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.surface};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.textInverse : theme.colors.textSecondary};
  border: 1px solid
    ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.border};
  white-space: nowrap;
  transition: all 0.15s ease;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ $isActive, theme }) =>
      $isActive
        ? (theme.mode === 'dark' ? '#000000' : '#FFFFFF')
        : theme.colors.surfaceHover};
    color: ${({ $isActive, theme }) =>
      $isActive
        ? (theme.mode === 'dark' ? '#FFFFFF' : '#000000')
        : theme.colors.text};
    border-color: ${({ $isActive, theme }) =>
      $isActive
        ? (theme.mode === 'dark' ? '#FFFFFF' : '#000000')
        : theme.colors.borderHover};
  }
`;

const OverviewCard = styled(Card)`
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
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

const SyllabusItemLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 4px 6px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 11.5px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`;

export function DigitalMarketingHubClientView() {
  const [selectedLevelId, setSelectedLevelId] = useState<string>('all');
  const [expandedSyllabus, setExpandedSyllabus] = useState<Record<string, boolean>>({});

  const toggleSyllabus = (modId: string) => {
    setExpandedSyllabus((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const filteredModules =
    selectedLevelId === 'all'
      ? DIGITAL_MARKETING_MODULES
      : DIGITAL_MARKETING_MODULES.filter((m) => m.levelId === selectedLevelId);

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
                  <Badge variant="dark">Track 02</Badge>
                  <span style={{ fontSize: '11.5px', color: '#666666' }}>
                    8 Levels • 20 Modules • 180+ Lessons
                  </span>
                </Flex>
                <h1
                  style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    letterSpacing: '-0.025em',
                    marginBottom: '8px',
                  }}
                >
                  Digital Marketing Mastery
                </h1>
                <Text fontSize="13.5px" color="textSecondary" lineHeight="relaxed">
                  Data-driven performance marketing: technical SEO, search engine algorithms,
                  viral short-form content, Google Search & Shopping Ads, Meta Ads Manager,
                  lead gen funnels, and agency operations.
                </Text>
              </Box>

              {/* Curriculum Overview Card */}
              <OverviewCard>
                <Text fontSize="11px" fontWeight="600" color="textMuted" textTransform="uppercase" mb="4px">
                  Curriculum Overview
                </Text>
                <Flex alignItems="baseline" gap="8px" mb="4px">
                  <Text
                    fontSize="22px"
                    fontWeight="700"
                    color="text"
                    style={{ fontFamily: "'Cabinet Grotesk', 'Space Grotesk', sans-serif" }}
                  >
                    20 Modules
                  </Text>
                </Flex>
                <Text fontSize="11.5px" color="textSecondary">
                  180+ Documented Lessons • 8 Levels
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
            {DIGITAL_MARKETING_LEVELS.map((lvl) => (
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
                  bg="cardBg"
                  border="1px solid"
                  borderColor="border"
                  borderRadius="10px"
                  display="flex"
                  flexDirection="column"
                  interactive
                >
                  <Flex alignItems="center" justifyContent="space-between" mb="12px">
                    <Badge variant="dark">
                      Module {mod.moduleNumber}
                    </Badge>
                    <Badge variant="neutral">{mod.duration}</Badge>
                  </Flex>

                  <Link
                    href={`/digital-marketing/${mod.id}/${firstTopic?.id || ''}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
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
                    color="textSecondary"
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
                            color: 'inherit',
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
                        <SyllabusItemLink
                          key={t.id}
                          href={`/digital-marketing/${mod.id}/${t.id}`}
                        >
                          <Flex alignItems="center" gap="6px" style={{ minWidth: 0, flex: 1 }}>
                            <ChevronRight size={12} color="currentColor" style={{ opacity: 0.6, flexShrink: 0 }} />
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {t.title}
                            </span>
                          </Flex>
                          <span style={{ fontSize: '10.5px', color: 'inherit', opacity: 0.7, flexShrink: 0 }}>
                            {t.duration}
                          </span>
                        </SyllabusItemLink>
                      ))}
                    </Box>
                  </Box>

                  <Box mt="auto" pt="16px" borderTop="1px solid" borderColor="border" display="flex" flexDirection="column" gap="8px">
                    <Button
                      as={Link}
                      href={`/digital-marketing/${mod.id}/${firstTopic?.id || ''}`}
                      variant="primary"
                      fullWidth
                      size="sm"
                    >
                      <span>Start Module Documentation</span>
                      <ArrowRight size={14} />
                    </Button>
                    <Button
                      as={Link}
                      href={`/digital-marketing/${mod.id}`}
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
