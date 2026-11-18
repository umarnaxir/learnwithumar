'use client';

import React, { useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { DocumentationLayout } from '@/components/documentation/DocumentationLayout';
import { LessonContentRenderer } from '@/components/documentation/LessonContentRenderer';
import { getLessonContent } from '@/data/curriculum/lessons/detailed-lessons';
import { useStudentProgress } from '@/hooks/useStudentProgress';

export function DigitalMarketingTopicDocClientView({
  moduleId,
  topicId,
}: {
  moduleId: string;
  topicId: string;
}) {
  const lesson = getLessonContent('digital-marketing', moduleId, topicId);
  const { recordVisit } = useStudentProgress();

  useEffect(() => {
    if (lesson && moduleId && topicId) {
      recordVisit('digital-marketing', moduleId, topicId, lesson.title);
    }
  }, [lesson, moduleId, topicId, recordVisit]);

  return (
    <>
      <Navbar />
      <DocumentationLayout
        currentTrack="digital-marketing"
        currentModuleId={moduleId}
        currentTopicId={topicId}
        lesson={lesson}
      >
        <LessonContentRenderer lesson={lesson} />
      </DocumentationLayout>
      <Footer />
    </>
  );
}
