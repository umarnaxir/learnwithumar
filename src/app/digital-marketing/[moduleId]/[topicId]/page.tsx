'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { DocumentationLayout } from '@/components/documentation/DocumentationLayout';
import { LessonContentRenderer } from '@/components/documentation/LessonContentRenderer';
import { getLessonContent } from '@/data/curriculum/lessons/detailed-lessons';
import { useStudentProgress } from '@/hooks/useStudentProgress';

export default function DigitalMarketingTopicDocPage() {
  const params = useParams();
  const moduleId = params?.moduleId as string;
  const topicId = params?.topicId as string;

  const lesson = getLessonContent('digital-marketing', moduleId, topicId);
  const { recordVisit } = useStudentProgress();

  useEffect(() => {
    if (lesson) {
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
