'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Box, Flex, Container, Text, Card, Button, Badge } from '@/components/ui/primitives';
import { ALL_ASSIGNMENTS } from '@/data/assignments/assignments-data';
import { useStudentProgress } from '@/hooks/useStudentProgress';
import {
  Clock,
  Send,
} from 'lucide-react';

const PageHeader = styled.section`
  padding: 44px 0 32px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
`;

const FilterStrip = styled(Flex)`
  gap: 6px;
  overflow-x: auto;
  padding: 12px 0 14px;
  margin: 24px 0 28px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterBtn = styled.button<{ $isActive: boolean }>`
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

const AssignmentDetailCard = styled(Card)`
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: 640px) {
    padding: 20px;
  }
`;

const ProjectCardTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 6px;
  letter-spacing: -0.015em;
`;

const StatusSelector = styled.select`
  padding: 4px 10px;
  font-size: 11.5px;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`;

const ObjectivesBox = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  margin-bottom: 18px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const RubricBadge = styled(Box)`
  padding: 6px 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.text};
`;

export function ProjectsClientView() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'full-stack' | 'digital-marketing'>('all');
  const { profile, updateAssignmentStatus } = useStudentProgress();

  const filtered =
    activeFilter === 'all'
      ? ALL_ASSIGNMENTS
      : ALL_ASSIGNMENTS.filter((a) => a.trackId === activeFilter);

  const getStatus = (id: string, defaultStatus?: string) => {
    return profile.assignmentStatuses[id] || defaultStatus || 'Not Started';
  };

  return (
    <>
      <Navbar />
      <main>
        <PageHeader>
          <Container>
            <Box maxWidth="640px" mx="auto">
              <Badge variant="dark" mb="10px">
                Practical Deliverables
              </Badge>
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  letterSpacing: '-0.025em',
                  marginBottom: '8px',
                }}
              >
                Projects & Industry Assignments
              </h1>
              <Text fontSize="13.5px" color="textSecondary" lineHeight="relaxed">
                24 production-grade projects and marketing audits. Build your proof
                of work with defined objectives, rigorous specifications, and
                professional evaluation rubrics.
              </Text>
            </Box>
          </Container>
        </PageHeader>

        <Container style={{ paddingBottom: '72px' }}>
          {/* Filters */}
          <FilterStrip>
            <FilterBtn
              $isActive={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            >
              All 24 Deliverables
            </FilterBtn>
            <FilterBtn
              $isActive={activeFilter === 'full-stack'}
              onClick={() => setActiveFilter('full-stack')}
            >
              Full Stack Development (12 Projects)
            </FilterBtn>
            <FilterBtn
              $isActive={activeFilter === 'digital-marketing'}
              onClick={() => setActiveFilter('digital-marketing')}
            >
              Digital Marketing (12 Audits & Plans)
            </FilterBtn>
          </FilterStrip>

          {/* List of Projects */}
          <Box width="100%">
            {filtered.map((item, idx) => {
              const currentStatus = getStatus(item.id, item.defaultStatus);
              const isFullStack = item.trackId === 'full-stack';

              return (
                <AssignmentDetailCard key={item.id}>
                  {/* Card Header */}
                  <Flex
                    alignItems={['flex-start', 'flex-start', 'center']}
                    justifyContent="space-between"
                    flexDirection={['column', 'column', 'row']}
                    gap="10px"
                    mb="14px"
                  >
                    <Flex alignItems="center" gap="8px" flexWrap="wrap">
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          backgroundColor: isFullStack ? '#000000' : '#444444',
                          color: '#FFFFFF',
                          padding: '2.5px 7px',
                          borderRadius: '4px',
                        }}
                      >
                        {isFullStack ? 'FS' : 'DM'} #{idx + 1}
                      </span>
                      <Badge variant="neutral">{item.type}</Badge>
                      <Badge variant="dark">{item.difficulty}</Badge>
                    </Flex>

                    <Flex alignItems="center" justifyContent={['space-between', 'space-between', 'flex-end']} width={['100%', '100%', 'auto']} gap="10px">
                      <Flex alignItems="center" gap="4px" fontSize="11.5px" color="textMuted">
                        <Clock size={13} />
                        <span>~{item.estimatedHours} Hours</span>
                      </Flex>

                      {/* Interactive Status Changer */}
                      <Flex alignItems="center" gap="6px">
                        <span style={{ fontSize: '11px', opacity: 0.7 }}>Status:</span>
                        <StatusSelector
                          value={currentStatus}
                          onChange={(e) =>
                            updateAssignmentStatus(
                              item.id,
                              e.target.value as 'Not Started' | 'In Progress' | 'Submitted' | 'Reviewed'
                            )
                          }
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Submitted">Submitted</option>
                          <option value="Reviewed">Reviewed</option>
                        </StatusSelector>
                      </Flex>
                    </Flex>
                  </Flex>

                  <ProjectCardTitle>
                    {item.title}
                  </ProjectCardTitle>

                  <Text fontSize="12.5px" color="textSecondary" lineHeight="relaxed" mb="18px">
                    {item.description}
                  </Text>

                  {/* Grid for Objectives & Requirements */}
                  <ObjectivesBox>
                    {/* Objectives */}
                    <Box>
                      <Text
                        fontSize="10.5px"
                        fontWeight="700"
                        color="textMuted"
                        textTransform="uppercase"
                        letterSpacing="0.06em"
                        mb="8px"
                      >
                        Learning Objectives
                      </Text>
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '5px',
                        }}
                      >
                        {item.learningObjectives.map((obj, i) => (
                          <li key={i} style={{ fontSize: '12px', color: 'inherit', opacity: 0.85 }}>
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </Box>

                    {/* Requirements */}
                    <Box>
                      <Text
                        fontSize="10.5px"
                        fontWeight="700"
                        color="textMuted"
                        textTransform="uppercase"
                        letterSpacing="0.06em"
                        mb="8px"
                      >
                        Technical Requirements
                      </Text>
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '5px',
                        }}
                      >
                        {item.requirements.map((req, i) => (
                          <li key={i} style={{ fontSize: '12px', color: 'inherit', opacity: 0.85 }}>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </ObjectivesBox>

                  {/* Rubric Breakdown */}
                  <Box mb="16px">
                    <Text
                      fontSize="10.5px"
                      fontWeight="700"
                      color="textMuted"
                      textTransform="uppercase"
                      letterSpacing="0.06em"
                      mb="6px"
                    >
                      Evaluation Criteria Rubric
                    </Text>
                    <Flex gap="8px" flexWrap="wrap">
                      {item.evaluationCriteria.map((crit, i) => (
                        <RubricBadge key={i}>
                          <span style={{ fontWeight: 600, color: 'inherit' }}>
                            {crit.criterion}:
                          </span>{' '}
                          <span style={{ color: 'inherit', fontWeight: 700 }}>
                            {crit.weight}
                          </span>
                        </RubricBadge>
                      ))}
                    </Flex>
                  </Box>

                  {/* Submission Instructions */}
                  <Box pt="12px" borderTop="1px solid" borderColor="border">
                    <Flex
                      alignItems={['flex-start', 'flex-start', 'center']}
                      justifyContent="space-between"
                      flexDirection={['column', 'column', 'row']}
                      gap="12px"
                    >
                      <Box>
                        <Text fontSize="11px" fontWeight="700" color="textMuted">
                          Submission Instructions:
                        </Text>
                        <Text fontSize="12px" color="textSecondary" mt="2px">
                          {item.submissionInstructions.join(' • ')}
                        </Text>
                      </Box>

                      <Button
                        size="sm"
                        variant={currentStatus === 'Submitted' ? 'secondary' : 'primary'}
                        width={['100%', '100%', 'auto']}
                        onClick={() =>
                          updateAssignmentStatus(
                            item.id,
                            currentStatus === 'Submitted' ? 'In Progress' : 'Submitted'
                          )
                        }
                      >
                        <Send size={12} />
                        <span>
                          {currentStatus === 'Submitted'
                            ? 'Mark as Working'
                            : 'Submit for Review'}
                        </span>
                      </Button>
                    </Flex>
                  </Box>
                </AssignmentDetailCard>
              );
            })}
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
}
