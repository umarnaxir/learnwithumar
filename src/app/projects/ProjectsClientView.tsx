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
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
  text-align: center;
`;

const FilterStrip = styled(Flex)`
  gap: 6px;
  overflow-x: auto;
  padding: 12px 0 14px;
  margin: 24px 0 28px;
  border-bottom: 1px solid #eaeaea;
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

const AssignmentDetailCard = styled(Card)`
  margin-bottom: 20px;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 16px;
  background: #ffffff;

  @media (min-width: 640px) {
    padding: 20px;
  }
`;

const StatusSelector = styled.select`
  padding: 4px 10px;
  font-size: 11.5px;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  color: #000000;
  outline: none;
  cursor: pointer;

  &:hover {
    border-color: #000000;
  }
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
                  color: '#000000',
                  marginBottom: '8px',
                }}
              >
                Projects & Industry Assignments
              </h1>
              <Text fontSize="13.5px" color="#555555" lineHeight="relaxed">
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
                      <Flex alignItems="center" gap="4px" fontSize="11.5px" color="#666666">
                        <Clock size={13} />
                        <span>~{item.estimatedHours} Hours</span>
                      </Flex>

                      {/* Interactive Status Changer */}
                      <Flex alignItems="center" gap="6px">
                        <span style={{ fontSize: '11px', color: '#888888' }}>Status:</span>
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

                  <h2
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#000000',
                      marginBottom: '6px',
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {item.title}
                  </h2>

                  <Text fontSize="12.5px" color="#444444" lineHeight="relaxed" mb="18px">
                    {item.description}
                  </Text>

                  {/* Grid for Objectives & Requirements */}
                  <Box
                    display="grid"
                    gridTemplateColumns={['1fr', '1fr', '1fr 1fr']}
                    gap="16px"
                    p="14px"
                    bg="#FAF9F6"
                    borderRadius="8px"
                    mb="18px"
                  >
                    {/* Objectives */}
                    <Box>
                      <Text
                        fontSize="10.5px"
                        fontWeight="700"
                        color="#888888"
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
                          <li key={i} style={{ fontSize: '12px', color: '#333333' }}>
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
                        color="#888888"
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
                          <li key={i} style={{ fontSize: '12px', color: '#333333' }}>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </Box>

                  {/* Rubric Breakdown */}
                  <Box mb="16px">
                    <Text
                      fontSize="10.5px"
                      fontWeight="700"
                      color="#888888"
                      textTransform="uppercase"
                      letterSpacing="0.06em"
                      mb="6px"
                    >
                      Evaluation Criteria Rubric
                    </Text>
                    <Flex gap="8px" flexWrap="wrap">
                      {item.evaluationCriteria.map((crit, i) => (
                        <Box
                          key={i}
                          p="6px 10px"
                          bg="#F4F4F5"
                          borderRadius="5px"
                          fontSize="11.5px"
                        >
                          <span style={{ fontWeight: 600, color: '#111111' }}>
                            {crit.criterion}:
                          </span>{' '}
                          <span style={{ color: '#000000', fontWeight: 700 }}>
                            {crit.weight}
                          </span>
                        </Box>
                      ))}
                    </Flex>
                  </Box>

                  {/* Submission Instructions */}
                  <Box pt="12px" borderTop="1px solid #EAEAEA">
                    <Flex
                      alignItems={['flex-start', 'flex-start', 'center']}
                      justifyContent="space-between"
                      flexDirection={['column', 'column', 'row']}
                      gap="12px"
                    >
                      <Box>
                        <Text fontSize="11px" fontWeight="700" color="#888888">
                          Submission Instructions:
                        </Text>
                        <Text fontSize="12px" color="#555555" mt="2px">
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
