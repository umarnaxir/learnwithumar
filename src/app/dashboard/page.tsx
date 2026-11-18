'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Box, Flex, Container, Text, Card, Button, Badge } from '@/components/ui/primitives';
import { FULL_STACK_MODULES } from '@/data/curriculum/full-stack-curriculum';
import { DIGITAL_MARKETING_MODULES } from '@/data/curriculum/digital-marketing-curriculum';
import { ALL_ASSIGNMENTS } from '@/data/assignments/assignments-data';
import { useStudentProgress } from '@/hooks/useStudentProgress';
import {
  User,
  Flame,
  Clock,
  Code2,
  TrendingUp,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  Send,
  Bell,
  StickyNote,
} from 'lucide-react';

const DashHeader = styled.section`
  padding: 36px 0 24px;
  background-color: #fafafa;
  border-bottom: 1px solid #eaeaea;
`;

const StreakBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: #fffbeb;
  border: 1px solid #fde68a;
  color: #b45309;
  padding: 3px 8px;
  border-radius: 9999px;
  font-size: 11.5px;
  font-weight: 700;
`;

const TabStrip = styled(Flex)`
  gap: 4px;
  border-bottom: 1px solid #eaeaea;
  margin: 24px 0 20px;
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 8px 14px;
  font-size: 12.5px;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '450')};
  color: ${({ $isActive }) => ($isActive ? '#000000' : '#666666')};
  border-bottom: 2px solid
    ${({ $isActive }) => ($isActive ? '#000000' : 'transparent')};
  background: none;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: #000000;
  }
`;

const DashGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'completed' | 'bookmarks' | 'notes'>('overview');
  const { profile, toggleLessonCompleted, toggleLessonBookmarked, updateAssignmentStatus } = useStudentProgress();

  const totalFullStackTopics = FULL_STACK_MODULES.reduce((acc, m) => acc + m.topics.length, 0);
  const totalMarketingTopics = DIGITAL_MARKETING_MODULES.reduce((acc, m) => acc + m.topics.length, 0);

  const completedFS = FULL_STACK_MODULES.flatMap((m) => m.topics).filter((t) =>
    profile.completedLessons.includes(t.id)
  ).length;

  const completedDM = DIGITAL_MARKETING_MODULES.flatMap((m) => m.topics).filter((t) =>
    profile.completedLessons.includes(t.id)
  ).length;

  const fsPct = Math.round((completedFS / totalFullStackTopics) * 100);
  const dmPct = Math.round((completedDM / totalMarketingTopics) * 100);

  const announcements = [
    {
      title: 'Next.js App Router Masterclass Live Q&A',
      date: 'This Thursday at 6:00 PM EST',
      details: 'Reviewing Server Components vs Client Component boundary architecture and deep-dive into Server Actions.',
    },
    {
      title: 'Google Ads 2026 Strategy Update',
      date: 'Published Yesterday',
      details: 'New case study added to Module 12 on Performance Max asset group structuring.',
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <DashHeader>
          <Container>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap="16px"
            >
              {/* Profile summary */}
              <Flex alignItems="center" gap="12px">
                <Box
                  p="12px"
                  bg="#000000"
                  color="#FFFFFF"
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{ width: '44px', height: '44px' }}
                >
                  <User size={20} />
                </Box>
                <Box>
                  <Flex alignItems="center" gap="8px">
                    <h1
                      style={{
                        fontSize: '20px',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        color: '#000000',
                      }}
                    >
                      Welcome back, {profile.name}
                    </h1>
                    <Badge variant="dark">Intern</Badge>
                  </Flex>
                  <Text fontSize="12.5px" color="#666666" mt="2px">
                    {profile.role} • Enrolled in Full Stack & Digital Marketing
                  </Text>
                </Box>
              </Flex>

              {/* Learning Streak & Hours */}
              <Flex alignItems="center" gap="12px">
                <StreakBadge>
                  <Flame size={14} />
                  <span>{profile.streakDays} Day Learning Streak</span>
                </StreakBadge>
                <Flex
                  alignItems="center"
                  gap="5px"
                  p="6px 10px"
                  bg="#FFFFFF"
                  border="1px solid #EAEAEA"
                  borderRadius="999px"
                  fontSize="11.5px"
                  color="#333333"
                  fontWeight="600"
                >
                  <Clock size={13} color="#888888" />
                  <span>{profile.hoursSpent}h Logged</span>
                </Flex>
              </Flex>
            </Flex>
          </Container>
        </DashHeader>

        <Container style={{ paddingBottom: '96px' }}>
          {/* Resume Recent Learning Banner */}
          {profile.lastVisitedLesson && (
            <Card
              p="20px 24px"
              bg="#FFFFFF"
              border="1px solid #000000"
              borderRadius="12px"
              my="28px"
              boxShadow="0 4px 16px rgba(0,0,0,0.04)"
            >
              <Flex
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
                gap="14px"
              >
                <Box>
                  <Flex alignItems="center" gap="8px" mb="4px">
                    <Badge variant="neutral">Recently Viewed</Badge>
                    <span style={{ fontSize: '12px', color: '#888888' }}>
                      Ready to continue where you left off?
                    </span>
                  </Flex>
                  <Text fontSize="17px" fontWeight="700" color="#000000">
                    {profile.lastVisitedLesson.title}
                  </Text>
                </Box>

                <Button
                  as={Link}
                  href={`/${profile.lastVisitedLesson.trackId}/${profile.lastVisitedLesson.moduleId}/${profile.lastVisitedLesson.lessonId}`}
                  variant="primary"
                  size="sm"
                >
                  <span>Resume Lesson</span>
                  <ArrowRight size={14} />
                </Button>
              </Flex>
            </Card>
          )}

          {/* Navigation Tabs */}
          <TabStrip>
            <TabButton
              $isActive={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            >
              Overview & Enrolled Paths
            </TabButton>
            <TabButton
              $isActive={activeTab === 'completed'}
              onClick={() => setActiveTab('completed')}
            >
              Completed Lessons ({profile.completedLessons.length})
            </TabButton>
            <TabButton
              $isActive={activeTab === 'bookmarks'}
              onClick={() => setActiveTab('bookmarks')}
            >
              Saved Bookmarks ({profile.bookmarkedLessons.length})
            </TabButton>
            <TabButton
              $isActive={activeTab === 'notes'}
              onClick={() => setActiveTab('notes')}
            >
              Study Notes ({Object.keys(profile.lessonNotes).length})
            </TabButton>
          </TabStrip>

          {activeTab === 'overview' && (
            <DashGrid>
              {/* Left Column: Enrolled Paths & Assignments */}
              <Box>
                <Text
                  fontSize="12px"
                  fontWeight="700"
                  color="#888888"
                  textTransform="uppercase"
                  letterSpacing="0.06em"
                  mb="16px"
                >
                  Active Learning Progress
                </Text>

                {/* Path 1: Full Stack */}
                <Card p="24px" bg="#FFFFFF" border="1px solid #EAEAEA" mb="20px">
                  <Flex alignItems="center" justifyContent="space-between" mb="12px">
                    <Flex alignItems="center" gap="10px">
                      <Box p="8px" bg="#000000" color="#FFFFFF" borderRadius="8px">
                        <Code2 size={20} />
                      </Box>
                      <Box>
                        <Text fontSize="17px" fontWeight="700" color="#000000">
                          Full Stack Web Development
                        </Text>
                        <Text fontSize="12.5px" color="#666666">
                          20 Modules • {completedFS} of {totalFullStackTopics} Lessons Complete
                        </Text>
                      </Box>
                    </Flex>
                    <Text fontSize="20px" fontWeight="800" color="#000000">
                      {fsPct}%
                    </Text>
                  </Flex>

                  <div
                    style={{
                      height: '8px',
                      backgroundColor: '#EAEAEA',
                      borderRadius: '999px',
                      overflow: 'hidden',
                      marginBottom: '16px',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${fsPct}%`,
                        backgroundColor: '#000000',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>

                  <Flex justifyContent="flex-end">
                    <Button as={Link} href="/full-stack" variant="outline" size="sm">
                      <span>Browse Curriculum</span>
                      <ArrowRight size={13} />
                    </Button>
                  </Flex>
                </Card>

                {/* Path 2: Digital Marketing */}
                <Card p="24px" bg="#FFFFFF" border="1px solid #EAEAEA" mb="32px">
                  <Flex alignItems="center" justifyContent="space-between" mb="12px">
                    <Flex alignItems="center" gap="10px">
                      <Box p="8px" bg="#000000" color="#FFFFFF" borderRadius="8px">
                        <TrendingUp size={20} />
                      </Box>
                      <Box>
                        <Text fontSize="17px" fontWeight="700" color="#000000">
                          Digital Marketing Mastery
                        </Text>
                        <Text fontSize="12.5px" color="#666666">
                          20 Modules • {completedDM} of {totalMarketingTopics} Lessons Complete
                        </Text>
                      </Box>
                    </Flex>
                    <Text fontSize="20px" fontWeight="800" color="#000000">
                      {dmPct}%
                    </Text>
                  </Flex>

                  <div
                    style={{
                      height: '8px',
                      backgroundColor: '#EAEAEA',
                      borderRadius: '999px',
                      overflow: 'hidden',
                      marginBottom: '16px',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${dmPct}%`,
                        backgroundColor: '#000000',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>

                  <Flex justifyContent="flex-end">
                    <Button as={Link} href="/digital-marketing" variant="outline" size="sm">
                      <span>Browse Curriculum</span>
                      <ArrowRight size={13} />
                    </Button>
                  </Flex>
                </Card>

                {/* Assignments Section */}
                <Text
                  fontSize="12px"
                  fontWeight="700"
                  color="#888888"
                  textTransform="uppercase"
                  letterSpacing="0.06em"
                  mb="16px"
                >
                  Your Active Assignments
                </Text>

                <Box display="flex" flexDirection="column" gap="12px">
                  {ALL_ASSIGNMENTS.slice(0, 4).map((asgn) => {
                    const status = profile.assignmentStatuses[asgn.id] || asgn.defaultStatus || 'Not Started';
                    return (
                      <Card key={asgn.id} p="18px 20px" bg="#FFFFFF" border="1px solid #EAEAEA">
                        <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap" gap="10px">
                          <Box>
                            <Flex alignItems="center" gap="8px" mb="4px">
                              <Badge variant={asgn.trackId === 'full-stack' ? 'dark' : 'neutral'}>
                                {asgn.trackId === 'full-stack' ? 'Full Stack' : 'Marketing'}
                              </Badge>
                              <Badge variant="neutral">{status}</Badge>
                            </Flex>
                            <Text fontSize="15px" fontWeight="700" color="#000000">
                              {asgn.title}
                            </Text>
                          </Box>

                          <Flex alignItems="center" gap="10px">
                            <Button
                              size="sm"
                              variant={status === 'Submitted' ? 'secondary' : 'primary'}
                              onClick={() =>
                                updateAssignmentStatus(
                                  asgn.id,
                                  status === 'Submitted' ? 'In Progress' : 'Submitted'
                                )
                              }
                            >
                              <Send size={12} />
                              <span>{status === 'Submitted' ? 'Working' : 'Submit'}</span>
                            </Button>
                          </Flex>
                        </Flex>
                      </Card>
                    );
                  })}
                </Box>
              </Box>

              {/* Right Column: Announcements & Recommended Next */}
              <Box>
                {/* Announcements */}
                <Box mb="32px">
                  <Flex alignItems="center" gap="8px" mb="14px">
                    <Bell size={16} color="#000000" />
                    <Text fontSize="13px" fontWeight="700" color="#111111" textTransform="uppercase">
                      Instructor Announcements
                    </Text>
                  </Flex>

                  <Box display="flex" flexDirection="column" gap="12px">
                    {announcements.map((ann, i) => (
                      <Card key={i} p="16px" bg="#FAF9F6" border="1px solid #EAEAEA">
                        <Text fontSize="14px" fontWeight="700" color="#000000" mb="2px">
                          {ann.title}
                        </Text>
                        <Text fontSize="11.5px" color="#888888" mb="6px">
                          {ann.date}
                        </Text>
                        <Text fontSize="13px" color="#555555" lineHeight="normal">
                          {ann.details}
                        </Text>
                      </Card>
                    ))}
                  </Box>
                </Box>

                {/* Recommended Next Lessons */}
                <Box>
                  <Text
                    fontSize="12px"
                    fontWeight="700"
                    color="#888888"
                    textTransform="uppercase"
                    letterSpacing="0.06em"
                    mb="14px"
                  >
                    Recommended Next
                  </Text>

                  <Card p="18px" bg="#FFFFFF" border="1px solid #EAEAEA" mb="12px">
                    <Badge variant="neutral" mb="6px">
                      Full Stack • Level 1
                    </Badge>
                    <Text fontSize="14.5px" fontWeight="700" color="#000000" mb="4px">
                      Semantic HTML & Accessible Landmarks
                    </Text>
                    <Text fontSize="12.5px" color="#555555" mb="12px">
                      Learn how semantic HTML improves SEO ranking and screen reader accessibility.
                    </Text>
                    <Button
                      as={Link}
                      href="/full-stack/html-complete-guide/semantic-html"
                      variant="primary"
                      size="sm"
                      fullWidth
                    >
                      Start Lesson
                    </Button>
                  </Card>

                  <Card p="18px" bg="#FFFFFF" border="1px solid #EAEAEA">
                    <Badge variant="neutral" mb="6px">
                      Digital Marketing • Level 2
                    </Badge>
                    <Text fontSize="14.5px" fontWeight="700" color="#000000" mb="4px">
                      Crawling, Indexing & Ranking
                    </Text>
                    <Text fontSize="12.5px" color="#555555" mb="12px">
                      Understand how search engines discover URLs, parse rendering, and score PageRank.
                    </Text>
                    <Button
                      as={Link}
                      href="/digital-marketing/seo-fundamentals/crawling-indexing-ranking"
                      variant="primary"
                      size="sm"
                      fullWidth
                    >
                      Start Lesson
                    </Button>
                  </Card>
                </Box>
              </Box>
            </DashGrid>
          )}

          {activeTab === 'completed' && (
            <Box maxWidth="760px">
              <Text fontSize="14px" color="#555555" mb="20px">
                You have completed {profile.completedLessons.length} lessons. Click to review or toggle completion status.
              </Text>
              {profile.completedLessons.map((id) => (
                <Card key={id} p="14px 18px" bg="#FFFFFF" border="1px solid #EAEAEA" mb="8px">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center" gap="10px">
                      <CheckCircle2 size={16} color="#10B981" />
                      <Text fontSize="14.5px" fontWeight="600" color="#000000">
                        {id}
                      </Text>
                    </Flex>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleLessonCompleted(id)}
                    >
                      Completed
                    </Button>
                  </Flex>
                </Card>
              ))}
            </Box>
          )}

          {activeTab === 'bookmarks' && (
            <Box maxWidth="760px">
              <Text fontSize="14px" color="#555555" mb="20px">
                Your bookmarked lessons for quick revision:
              </Text>
              {profile.bookmarkedLessons.map((id) => (
                <Card key={id} p="14px 18px" bg="#FFFFFF" border="1px solid #EAEAEA" mb="8px">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center" gap="10px">
                      <Bookmark size={16} color="#000000" />
                      <Text fontSize="14.5px" fontWeight="600" color="#000000">
                        {id}
                      </Text>
                    </Flex>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleLessonBookmarked(id)}
                    >
                      Remove
                    </Button>
                  </Flex>
                </Card>
              ))}
            </Box>
          )}

          {activeTab === 'notes' && (
            <Box maxWidth="760px">
              <Text fontSize="14px" color="#555555" mb="20px">
                Personal study notes saved during your learning sessions:
              </Text>
              {Object.entries(profile.lessonNotes).map(([id, note]) => (
                <Card key={id} p="20px" bg="#FFFFFF" border="1px solid #EAEAEA" mb="12px">
                  <Flex alignItems="center" gap="8px" mb="8px">
                    <StickyNote size={15} color="#000000" />
                    <Text fontSize="14px" fontWeight="700" color="#000000">
                      Topic: {id}
                    </Text>
                  </Flex>
                  <Text fontSize="13.5px" color="#444444" lineHeight="relaxed">
                    {note}
                  </Text>
                </Card>
              ))}
            </Box>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
