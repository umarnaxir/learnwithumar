'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Box, Flex, Text, Button, Badge } from '@/components/ui/primitives';
import { TrackId, LessonContent } from '@/types/curriculum';
import { FULL_STACK_MODULES } from '@/data/curriculum/full-stack-curriculum';
import { DIGITAL_MARKETING_MODULES } from '@/data/curriculum/digital-marketing-curriculum';
import { useStudentProgress } from '@/hooks/useStudentProgress';
import {
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ChevronDown,
  Code2,
  TrendingUp,
  ExternalLink,
  Menu,
  X,
  StickyNote,
} from 'lucide-react';

const LayoutWrapper = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  width: 100%;
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-height: calc(100vh - 64px);

  @media (min-width: 1024px) {
    grid-template-columns: 250px minmax(0, 1fr);
  }

  @media (min-width: 1180px) {
    grid-template-columns: 250px minmax(0, 1fr) 220px;
  }
`;

const LeftSidebar = styled.aside<{ $isOpenOnMobile: boolean }>`
  background-color: #ffffff;
  border-right: 1px solid #eaeaea;
  padding: 16px 12px;
  overflow-y: auto;
  height: calc(100vh - 64px);
  position: sticky;
  top: 64px;

  @media (max-width: 1023px) {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    display: ${({ $isOpenOnMobile }) => ($isOpenOnMobile ? 'block' : 'none')};
  }
`;

const RightSidebar = styled.aside`
  display: none;
  background-color: #ffffff;
  border-left: 1px solid #eaeaea;
  padding: 20px 16px;
  overflow-y: auto;
  height: calc(100vh - 64px);
  position: sticky;
  top: 64px;

  @media (min-width: 1180px) {
    display: block;
  }
`;

const MainContentArea = styled.main`
  padding: 24px 16px 64px;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 768px) {
    padding: 32px 28px 80px;
  }
`;

const TrackSwitcherButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 6px 8px;
  font-size: 11.5px;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '450')};
  border-radius: 5px;
  background-color: ${({ $isActive }) => ($isActive ? '#000000' : '#F4F4F5')};
  color: ${({ $isActive }) => ($isActive ? '#FFFFFF' : '#555555')};
  transition: all 0.15s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? '#222222' : '#EAEAEA')};
    color: ${({ $isActive }) => ($isActive ? '#FFFFFF' : '#000000')};
  }
`;

const ModuleGroup = styled.div`
  margin-bottom: 8px;
`;

const ModuleHeaderBtn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  color: #111111;
  text-align: left;
  transition: background-color 0.15s ease;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const TopicLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 5px 8px 5px 20px;
  border-radius: 5px;
  font-size: 11.5px;
  color: ${({ $isActive }) => ($isActive ? '#000000' : '#666666')};
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  background-color: ${({ $isActive }) => ($isActive ? '#F4F4F5' : 'transparent')};
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #000000;
  }
`;

const TOCItemLink = styled.a`
  display: block;
  font-size: 11.5px;
  color: #666666;
  text-decoration: none;
  padding: 4px 0;
  transition: color 0.15s ease;

  &:hover {
    color: #000000;
  }
`;

const NoteArea = styled.textarea`
  width: 100%;
  height: 90px;
  padding: 8px 10px;
  font-size: 12px;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  background-color: #fafafa;
  color: #000000;
  resize: vertical;
  outline: none;
  margin-top: 6px;

  &:focus {
    border-color: #000000;
    background-color: #ffffff;
  }
`;

interface DocumentationLayoutProps {
  currentTrack: TrackId;
  currentModuleId: string;
  currentTopicId: string;
  lesson: LessonContent;
  children: React.ReactNode;
}

export function DocumentationLayout({
  currentTrack,
  currentModuleId,
  currentTopicId,
  lesson,
  children,
}: DocumentationLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [currentModuleId]: true,
  });

  const {
    profile,
    toggleLessonCompleted,
    toggleLessonBookmarked,
    saveLessonNote,
  } = useStudentProgress();

  const isCompleted = profile.completedLessons.includes(currentTopicId);
  const isBookmarked = profile.bookmarkedLessons.includes(currentTopicId);
  const currentNote = profile.lessonNotes[currentTopicId] || '';
  const [localNote, setLocalNote] = useState(currentNote);

  const modules =
    currentTrack === 'full-stack' ? FULL_STACK_MODULES : DIGITAL_MARKETING_MODULES;

  const currentModule = modules.find((m) => m.id === currentModuleId);
  const currentTopicIndex =
    currentModule?.topics.findIndex((t) => t.id === currentTopicId) ?? -1;

  const prevTopic =
    currentModule && currentTopicIndex > 0
      ? currentModule.topics[currentTopicIndex - 1]
      : null;

  const nextTopic =
    currentModule && currentTopicIndex < currentModule.topics.length - 1
      ? currentModule.topics[currentTopicIndex + 1]
      : null;

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const handleSaveNote = () => {
    saveLessonNote(currentTopicId, localNote);
  };

  return (
    <LayoutWrapper>
      <LayoutGrid>
        {/* Mobile Bar to open Curriculum Drawer */}
        <Box
          display={['block', 'block', 'none']}
          p="10px 14px"
          bg="#F8F8F8"
          borderBottom="1px solid #EAEAEA"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              {mobileNavOpen ? <X size={13} /> : <Menu size={13} />}
              <span>Curriculum Menu</span>
            </Button>
            <Badge variant="dark">
              {currentTrack === 'full-stack' ? 'Full Stack' : 'Digital Marketing'}
            </Badge>
          </Flex>
        </Box>

        {/* LEFT SIDEBAR: Curriculum Browser */}
        <LeftSidebar $isOpenOnMobile={mobileNavOpen}>
          {/* Track Switcher */}
          <Flex gap="4px" mb="14px" bg="#F4F4F5" p="2px" borderRadius="6px">
            <TrackSwitcherButton
              as={Link}
              href="/full-stack"
              $isActive={currentTrack === 'full-stack'}
            >
              <Code2 size={12} />
              <span>Full Stack</span>
            </TrackSwitcherButton>

            <TrackSwitcherButton
              as={Link}
              href="/digital-marketing"
              $isActive={currentTrack === 'digital-marketing'}
            >
              <TrendingUp size={12} />
              <span>Marketing</span>
            </TrackSwitcherButton>
          </Flex>

          <Text
            fontSize="10.5px"
            fontWeight="700"
            color="#888888"
            textTransform="uppercase"
            letterSpacing="0.06em"
            mb="8px"
            px="4px"
          >
            {currentTrack === 'full-stack'
              ? 'Full Stack (20 Modules)'
              : 'Marketing (20 Modules)'}
          </Text>

          {/* Modules Accordion List */}
          <Box>
            {modules.map((mod) => {
              const isExpanded = expandedModules[mod.id] || mod.id === currentModuleId;
              return (
                <ModuleGroup key={mod.id}>
                  <ModuleHeaderBtn onClick={() => toggleModule(mod.id)}>
                    <Flex alignItems="center" gap="6px" style={{ minWidth: 0 }}>
                      <span style={{ fontSize: '10.5px', color: '#888888', fontWeight: 700 }}>
                        M{mod.moduleNumber}
                      </span>
                      <Text fontSize="12px" fontWeight="600" truncate color="#111111">
                        {mod.title}
                      </Text>
                    </Flex>
                    {isExpanded ? (
                      <ChevronDown size={13} color="#888888" />
                    ) : (
                      <ChevronRight size={13} color="#888888" />
                    )}
                  </ModuleHeaderBtn>

                  {isExpanded && (
                    <Box mt="1px">
                      {mod.topics.map((t) => {
                        const isActive =
                          t.id === currentTopicId && mod.id === currentModuleId;
                        const topicCompleted = profile.completedLessons.includes(t.id);
                        return (
                          <TopicLink
                            key={t.id}
                            href={`/${currentTrack}/${mod.id}/${t.id}`}
                            $isActive={isActive}
                            onClick={() => setMobileNavOpen(false)}
                          >
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {t.title}
                            </span>
                            {topicCompleted && (
                              <CheckCircle2 size={11} color="#10B981" style={{ flexShrink: 0 }} />
                            )}
                          </TopicLink>
                        );
                      })}
                    </Box>
                  )}
                </ModuleGroup>
              );
            })}
          </Box>
        </LeftSidebar>

        {/* CENTER: Lesson Content */}
        <MainContentArea>
          {/* Breadcrumb Header */}
          <Flex
            alignItems="center"
            gap="5px"
            fontSize="11.5px"
            color="#666666"
            mb="12px"
            flexWrap="wrap"
          >
            <Link href={`/${currentTrack}`} style={{ color: '#666666' }}>
              {currentTrack === 'full-stack' ? 'Full Stack Track' : 'Digital Marketing'}
            </Link>
            <span>/</span>
            <Link href={`/${currentTrack}/${currentModuleId}`} style={{ color: '#666666' }}>
              {currentModule?.title}
            </Link>
            <span>/</span>
            <span style={{ color: '#000000', fontWeight: 500 }}>{lesson.title}</span>
          </Flex>

          {/* Lesson Title & Quick Actions */}
          <Flex
            alignItems={['flex-start', 'flex-start', 'center']}
            justifyContent="space-between"
            flexDirection={['column', 'column', 'row']}
            gap="12px"
            mb="20px"
            pb="14px"
            borderBottom="1px solid #EAEAEA"
          >
            <Box>
              <h1
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  color: '#000000',
                  marginBottom: '6px',
                }}
              >
                {lesson.title}
              </h1>
              <Flex alignItems="center" gap="8px">
                <Badge variant="neutral">Time: {lesson.duration}</Badge>
                <Badge variant="dark">{lesson.difficulty}</Badge>
              </Flex>
            </Box>

            <Flex alignItems="center" gap="8px">
              {/* Bookmark button */}
              <Button
                size="sm"
                variant={isBookmarked ? 'primary' : 'outline'}
                onClick={() => toggleLessonBookmarked(currentTopicId)}
                title={isBookmarked ? 'Bookmarked' : 'Bookmark lesson'}
              >
                {isBookmarked ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
                <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
              </Button>

              {/* Complete button */}
              <Button
                size="sm"
                variant={isCompleted ? 'secondary' : 'primary'}
                onClick={() => toggleLessonCompleted(currentTopicId)}
              >
                <CheckCircle2 size={13} color={isCompleted ? '#10B981' : '#FFFFFF'} />
                <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
              </Button>
            </Flex>
          </Flex>

          {/* Main Injected Lesson Elements */}
          {children}

          {/* Previous / Next Lesson Navigation Footer */}
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mt="44px"
            pt="20px"
            borderTop="1px solid #EAEAEA"
            flexWrap="wrap"
            gap="12px"
          >
            {prevTopic ? (
              <Button
                as={Link}
                href={`/${currentTrack}/${currentModuleId}/${prevTopic.id}`}
                variant="outline"
                size="sm"
              >
                ← Previous: {prevTopic.title}
              </Button>
            ) : (
              <div />
            )}

            {nextTopic ? (
              <Button
                as={Link}
                href={`/${currentTrack}/${currentModuleId}/${nextTopic.id}`}
                variant="primary"
                size="sm"
              >
                Next: {nextTopic.title} →
              </Button>
            ) : (
              <Button as={Link} href={`/${currentTrack}`} variant="primary" size="sm">
                Track Overview →
              </Button>
            )}
          </Flex>
        </MainContentArea>

        {/* RIGHT SIDEBAR: Table of Contents & Resources */}
        <RightSidebar>
          <Text
            fontSize="10.5px"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.06em"
            color="#888888"
            mb="10px"
          >
            On This Page
          </Text>
          <Box mb="22px">
            <TOCItemLink href="#overview">Overview & Summary</TOCItemLink>
            <TOCItemLink href="#objectives">Learning Objectives</TOCItemLink>
            <TOCItemLink href="#key-concepts">Key Concepts</TOCItemLink>
            <TOCItemLink href="#implementation">
              {currentTrack === 'full-stack' ? 'Code Implementation' : 'Strategy Workflow'}
            </TOCItemLink>
            <TOCItemLink href="#step-by-step">Step-by-Step Guide</TOCItemLink>
            <TOCItemLink href="#real-world">Real-World Application</TOCItemLink>
            <TOCItemLink href="#mistakes-practices">Mistakes & Best Practices</TOCItemLink>
            <TOCItemLink href="#exercises-questions">Exercises & Interview Prep</TOCItemLink>
            <TOCItemLink href="#assignment">Mini Assignment</TOCItemLink>
          </Box>

          {/* Notes Widget */}
          <Box mb="22px">
            <Flex alignItems="center" gap="5px" mb="6px">
              <StickyNote size={13} color="#000000" />
              <Text fontSize="11.5px" fontWeight="700" color="#111111">
                Personal Study Notes
              </Text>
            </Flex>
            <Text fontSize="10.5px" color="#888888">
              Notes auto-save to browser session.
            </Text>
            <NoteArea
              placeholder="Jot down key syntax, interview tips, or reminders for this topic..."
              value={localNote}
              onChange={(e) => setLocalNote(e.target.value)}
              onBlur={handleSaveNote}
            />
            <Button
              size="sm"
              variant="outline"
              onClick={handleSaveNote}
              style={{ width: '100%', marginTop: '5px', fontSize: '10.5px', height: '26px' }}
            >
              Save Note
            </Button>
          </Box>

          {/* Verified Official Resources */}
          <Text
            fontSize="10.5px"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.06em"
            color="#888888"
            mb="10px"
          >
            Verified Documentation
          </Text>
          <Box>
            {lesson.officialDocs.map((doc, idx) => (
              <Box key={idx} mb="10px">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 600,
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginBottom: '2px',
                  }}
                >
                  <span>{doc.title}</span>
                  <ExternalLink size={10} color="#888888" />
                </a>
                <Text fontSize="10.5px" color="#666666" lineHeight="normal">
                  {doc.description}
                </Text>
              </Box>
            ))}
          </Box>
        </RightSidebar>
      </LayoutGrid>
    </LayoutWrapper>
  );
}
