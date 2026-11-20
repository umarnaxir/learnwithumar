'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Box, Flex, Text, Button, Badge } from '@/components/ui/primitives';
import { TrackId, LessonContent } from '@/types/curriculum';
import { FULL_STACK_MODULES } from '@/data/curriculum/full-stack-curriculum';
import { DIGITAL_MARKETING_MODULES } from '@/data/curriculum/digital-marketing-curriculum';
import { TOPIC_ALIASES } from '@/data/curriculum/lessons/detailed-lessons';
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

const TOCItemLink = styled.a<{ $isActive: boolean }>`
  display: block;
  font-size: 11.5px;
  color: ${({ $isActive }) => ($isActive ? '#000000' : '#666666')};
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  text-decoration: none;
  padding: 4px 0 4px 8px;
  border-left: 2px solid ${({ $isActive }) => ($isActive ? '#000000' : 'transparent')};
  transition: color 0.15s ease, border-color 0.15s ease;
  line-height: 1.35;

  &:hover {
    color: #000000;
  }
`;

const MobileToc = styled.details`
  display: block;
  margin-bottom: 18px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background-color: #fafafa;
  padding: 10px 12px;

  @media (min-width: 1280px) {
    display: none;
  }

  summary {
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    color: #111111;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  [data-toc-list] {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #eaeaea;
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
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState('introduction');

  const {
    profile,
    toggleLessonCompleted,
    toggleLessonBookmarked,
    saveLessonNote,
  } = useStudentProgress();

  const isCompleted = profile.completedLessons.includes(currentTopicId);
  const isBookmarked = profile.bookmarkedLessons.includes(currentTopicId);
  const currentNote = profile.lessonNotes[currentTopicId] || '';
  const [noteDraft, setNoteDraft] = useState<{ topicId: string; value: string } | null>(null);

  // The draft is scoped to the topic it was typed for. Switching lessons or
  // receiving persisted notes therefore shows the correct note immediately,
  // with no state-syncing effect and no risk of saving a note to the wrong
  // topic during navigation.
  const localNote = noteDraft?.topicId === currentTopicId ? noteDraft.value : currentNote;

  // Scroll to top whenever topic changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentTopicId]);

  // Close the mobile curriculum drawer with Escape.
  useEffect(() => {
    if (!mobileNavOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileNavOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileNavOpen]);

  // Prevent the page behind the mobile curriculum drawer from scrolling.
  useEffect(() => {
    if (!mobileNavOpen || typeof window === 'undefined') return;
    if (!window.matchMedia('(max-width: 1023px)').matches) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileNavOpen]);

  const modules =
    currentTrack === 'full-stack' ? FULL_STACK_MODULES : DIGITAL_MARKETING_MODULES;

  const currentModule = modules.find((m) => m.id === currentModuleId);

  // Normalize slug helper for robust matching
  const normalize = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  const isTopicActive = (modId: string, tId: string) => {
    if (modId !== currentModuleId && normalize(modId) !== normalize(currentModuleId)) return false;
    const canonicalTId = TOPIC_ALIASES[tId] || tId;
    const canonicalCurrent = TOPIC_ALIASES[currentTopicId] || currentTopicId;
    return (
      tId === currentTopicId ||
      normalize(tId) === normalize(currentTopicId) ||
      canonicalTId === canonicalCurrent ||
      normalize(canonicalTId) === normalize(canonicalCurrent)
    );
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

  const isDevelopmentTrack = currentTrack === 'full-stack';
  const rawSections = [
    { id: 'introduction', label: 'Introduction', visible: true },
    { id: 'definition', label: 'Definition', visible: true },
    { id: 'explanation', label: 'Explanation', visible: true },
    { id: 'why-used', label: 'Why It Is Used', visible: true },
    { id: 'use-cases', label: 'Real-World Use Cases', visible: true },
    {
      id: 'key-concepts',
      label: 'Key Concepts',
      visible: Boolean(lesson.keyConcepts?.length),
    },
    {
      id: 'syntax',
      label: 'Syntax Pattern',
      visible: Boolean(lesson.syntaxDefinition),
    },
    {
      id: 'code-examples',
      label: isDevelopmentTrack ? 'Code & Expected Output' : 'Workflow & Expected Outcome',
      visible: Boolean(lesson.codeExamples?.length || lesson.strategyExamples?.length),
    },
    {
      id: 'step-by-step',
      label: isDevelopmentTrack ? 'Step-by-Step Guide' : 'Practical Workflow',
      visible: Boolean(lesson.stepByStepGuide?.length),
    },
    { id: 'best-practices-mistakes', label: 'Best Practices', visible: true },
    { id: 'exercises', label: isDevelopmentTrack ? 'Practical Exercises' : 'Assignments', visible: true },
    { id: 'interview-questions', label: 'Interview Questions', visible: true },
    {
      id: 'related-topics',
      label: 'Related Topics',
      visible: Boolean(lesson.relatedTopics?.length),
    },
    { id: 'official-docs', label: isDevelopmentTrack ? 'Official Docs' : 'Official Resources', visible: true },
  ];
  const tocSections = rawSections
    .filter((section) => section.visible)
    .map((section, index) => ({ ...section, label: `${index + 1}. ${section.label}` }));

  // Track the section currently in view so the table of contents stays honest.
  useEffect(() => {
    const sectionIds = rawSections.filter((section) => section.visible).map((section) => section.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length || typeof window === 'undefined') return;

    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const readingLine = 96;
      let current = elements[0].id;

      for (const element of elements) {
        if (element.getBoundingClientRect().top <= readingLine) {
          current = element.id;
        } else {
          break;
        }
      }

      setActiveSection(current);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
    // The section set only changes when the lesson or its content changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack, currentModuleId, currentTopicId, lesson.id]);

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
                <Text fontSize="12px" fontWeight="600" color="#000000">
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
            fontWeight="600"
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
                  <ModuleHeaderBtn
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={`module-topics-${mod.id}`}
                    onClick={() => toggleModule(mod.id)}
                  >
                    <Flex alignItems="center" gap="6px" style={{ minWidth: 0 }}>
                      <span
                        style={{
                          fontSize: '10.5px',
                          color: '#888888',
                          fontWeight: 700,
                          fontFamily: "'Cabinet Grotesk', 'Space Grotesk', sans-serif",
                          letterSpacing: '0.02em',
                        }}
                      >
                        M{mod.moduleNumber}
                      </span>
                      <Text fontSize="12px" fontWeight="550" truncate color="#111111">
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
                    <Box mt="1px" id={`module-topics-${mod.id}`}>
                      {mod.topics.map((t) => {
                        const isActive = isTopicActive(mod.id, t.id);
                        const topicCompleted = profile.completedLessons.includes(t.id);
                        return (
                          <TopicLink
                            key={t.id}
                            href={`/${currentTrack}/${mod.id}/${t.id}`}
                            $isActive={isActive}
                            data-active-topic={isActive ? 'true' : undefined}
                            scroll={true}
                            prefetch={true}
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
          {/* Mobile/tablet table of contents (the right rail is desktop-only) */}
          <MobileToc>
            <summary>
              <span>On this page</span>
              <ChevronDown size={14} color="#666666" />
            </summary>
            <Box data-toc-list>
              {tocSections.map((section) => (
                <TOCItemLink
                  key={section.id}
                  href={`#${section.id}`}
                  $isActive={activeSection === section.id}
                  aria-current={activeSection === section.id ? 'location' : undefined}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.label}
                </TOCItemLink>
              ))}
            </Box>
          </MobileToc>

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
                  fontWeight: 600,
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
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="0.06em"
            color="#888888"
            mb="10px"
          >
            On This Page
          </Text>
          <Box mb="22px">
            {tocSections.map((section) => (
              <TOCItemLink
                key={section.id}
                href={`#${section.id}`}
                $isActive={activeSection === section.id}
                aria-current={activeSection === section.id ? 'location' : undefined}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </TOCItemLink>
            ))}
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
              Notes save in this browser and survive refreshes.
            </Text>
            <NoteArea
              placeholder="Jot down key syntax, interview tips, or reminders for this topic..."
              value={localNote}
              onChange={(e) =>
                setNoteDraft({ topicId: currentTopicId, value: e.target.value })
              }
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
            Official Documentation
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
