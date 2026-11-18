'use client';

import React, { useState, useEffect } from 'react';
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
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;

  @media (min-width: 768px) {
    padding: 0 20px;
  }

  @media (min-width: 1280px) {
    padding: 0 28px;
  }
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-height: calc(100vh - 64px);

  @media (min-width: 1024px) {
    grid-template-columns: 280px minmax(0, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: 290px minmax(0, 1fr) 250px;
  }
`;

const LeftSidebar = styled.aside<{ $isOpenOnMobile: boolean }>`
  background-color: #ffffff;
  border-right: 1px solid #eaeaea;
  padding: 16px 14px;
  overflow-y: auto;
  height: calc(100vh - 64px);
  position: sticky;
  top: 64px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #eaeaea;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #cccccc;
  }

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

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #eaeaea;
    border-radius: 4px;
  }

  @media (min-width: 1280px) {
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

  @media (min-width: 1280px) {
    padding: 36px 36px 96px;
  }
`;

const TrackHeaderBox = styled.div`
  padding: 10px 12px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 14px;
  border: 1px solid #eaeaea;
  transition: all 0.15s ease;

  &:hover {
    background-color: #f2f2f2;
    border-color: #000000;
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
  gap: 8px;
  padding: 6px 10px 6px 18px;
  border-radius: 6px;
  font-size: 11.5px;
  color: ${({ $isActive }) => ($isActive ? '#000000' : '#555555')};
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  background-color: ${({ $isActive }) => ($isActive ? '#F4F4F5' : 'transparent')};
  text-decoration: none;
  transition: all 0.15s ease;
  border-left: 2px solid ${({ $isActive }) => ($isActive ? '#000000' : 'transparent')};

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

  // Normalize slug helper for robust matching
  const normalize = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  const isTopicActive = (modId: string, tId: string) => {
    if (modId !== currentModuleId) return false;
    return tId === currentTopicId || normalize(tId) === normalize(currentTopicId);
  };

  // Flatten all lessons across all modules for seamless continuous sequential next/prev navigation
  const allTrackLessons = modules.flatMap((m) =>
    m.topics.map((t) => ({
      moduleId: m.id,
      moduleTitle: m.title,
      topicId: t.id,
      topicTitle: t.title,
    }))
  );

  const currentGlobalIndex = allTrackLessons.findIndex(
    (item) =>
      item.moduleId === currentModuleId &&
      (item.topicId === currentTopicId || normalize(item.topicId) === normalize(currentTopicId))
  );

  const prevLesson = currentGlobalIndex > 0 ? allTrackLessons[currentGlobalIndex - 1] : null;
  const nextLesson =
    currentGlobalIndex >= 0 && currentGlobalIndex < allTrackLessons.length - 1
      ? allTrackLessons[currentGlobalIndex + 1]
      : null;

  // Auto-scroll active item into view inside the left sidebar on initial load or route transition
  useEffect(() => {
    const activeEl = document.querySelector('[data-active-topic="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [currentTopicId, currentModuleId]);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => {
      const isCurrentlyOpen = prev[modId] !== undefined ? prev[modId] : modId === currentModuleId;
      return {
        ...prev,
        [modId]: !isCurrentlyOpen,
      };
    });
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
          {/* Active Learning Path Context Header (Context-Aware, No Track Switcher) */}
          <TrackHeaderBox>
            <Link
              href={`/${currentTrack}`}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              title={`View ${currentTrack === 'full-stack' ? 'Full Stack' : 'Digital Marketing'} Curriculum Hub`}
            >
              <Box p="6px" bg="#000000" color="#FFFFFF" borderRadius="6px" display="inline-flex">
                {currentTrack === 'full-stack' ? <Code2 size={13} /> : <TrendingUp size={13} />}
              </Box>
              <Box>
                <Text fontSize="12px" fontWeight="700" color="#000000">
                  {currentTrack === 'full-stack' ? 'Full Stack Development' : 'Digital Marketing'}
                </Text>
                <Text fontSize="10.5px" color="#666666">
                  {currentTrack === 'full-stack' ? '20 Modules • 200+ Topics' : '20 Modules • 180+ Topics'}
                </Text>
              </Box>
            </Link>
          </TrackHeaderBox>

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
              ? 'Full Stack Curriculum'
              : 'Digital Marketing Curriculum'}
          </Text>

          {/* Modules Accordion List */}
          <Box>
            {modules.map((mod) => {
              const isExpanded =
                expandedModules[mod.id] !== undefined
                  ? expandedModules[mod.id]
                  : mod.id === currentModuleId;
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
                        const isActive = isTopicActive(mod.id, t.id);
                        const topicCompleted = profile.completedLessons.includes(t.id);
                        return (
                          <TopicLink
                            key={t.id}
                            href={`/${currentTrack}/${mod.id}/${t.id}`}
                            $isActive={isActive}
                            data-active-topic={isActive ? 'true' : undefined}
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
            gap="6px"
            fontSize="11.5px"
            color="#666666"
            mb="14px"
            flexWrap="wrap"
          >
            <Link href="/" style={{ color: '#666666', textDecoration: 'none' }}>
              Home
            </Link>
            <span>/</span>
            <Link href={`/${currentTrack}`} style={{ color: '#666666', textDecoration: 'none' }}>
              {currentTrack === 'full-stack' ? 'Full Stack Track' : 'Digital Marketing'}
            </Link>
            <span>/</span>
            <Link href={`/${currentTrack}/${currentModuleId}`} style={{ color: '#666666', textDecoration: 'none' }}>
              {currentModule?.title || 'Module'}
            </Link>
            <span>/</span>
            <span style={{ color: '#000000', fontWeight: 600 }}>{lesson.title}</span>
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
            {prevLesson ? (
              <Button
                as={Link}
                href={`/${currentTrack}/${prevLesson.moduleId}/${prevLesson.topicId}`}
                variant="outline"
                size="sm"
                title={`Previous Lesson: ${prevLesson.topicTitle}`}
              >
                ← Previous: {prevLesson.topicTitle}
              </Button>
            ) : (
              <Button
                as={Link}
                href={`/${currentTrack}`}
                variant="outline"
                size="sm"
              >
                ← Back to Track Overview
              </Button>
            )}

            {nextLesson ? (
              <Button
                as={Link}
                href={`/${currentTrack}/${nextLesson.moduleId}/${nextLesson.topicId}`}
                variant="primary"
                size="sm"
                title={`Next Lesson: ${nextLesson.topicTitle}`}
              >
                Next: {nextLesson.topicTitle} →
              </Button>
            ) : (
              <Button as={Link} href={`/${currentTrack}`} variant="primary" size="sm">
                Track Completed! Overview →
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
            <TOCItemLink href="#introduction">1. Introduction</TOCItemLink>
            <TOCItemLink href="#definition">2. Definition</TOCItemLink>
            <TOCItemLink href="#explanation">3. Explanation</TOCItemLink>
            <TOCItemLink href="#why-used">4. Why It Is Used</TOCItemLink>
            <TOCItemLink href="#use-cases">5. Real-World Use Cases</TOCItemLink>
            {lesson.keyConcepts && lesson.keyConcepts.length > 0 && (
              <TOCItemLink href="#key-concepts">6. Key Concepts</TOCItemLink>
            )}
            {lesson.syntaxDefinition && (
              <TOCItemLink href="#syntax">7. Syntax Pattern</TOCItemLink>
            )}
            <TOCItemLink href="#code-examples">8. Code & Expected Output</TOCItemLink>
            <TOCItemLink href="#step-by-step">9. Step-by-Step Guide</TOCItemLink>
            <TOCItemLink href="#best-practices-mistakes">10. Best Practices</TOCItemLink>
            <TOCItemLink href="#exercises">11. Practical Exercises</TOCItemLink>
            <TOCItemLink href="#interview-questions">12. Interview Questions</TOCItemLink>
            {lesson.relatedTopics && lesson.relatedTopics.length > 0 && (
              <TOCItemLink href="#related-topics">13. Related Topics</TOCItemLink>
            )}
            <TOCItemLink href="#official-docs">14. Official Docs</TOCItemLink>
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
                    color: '#111111',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '6px',
                    marginBottom: '3px',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                    {doc.title}
                  </span>
                  <ExternalLink size={11} color="#666666" style={{ flexShrink: 0 }} />
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
