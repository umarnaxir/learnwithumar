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
  const rawModuleId = params?.moduleId;
  const rawTopicId = params?.topicId;
  const moduleId = (Array.isArray(rawModuleId) ? rawModuleId[0] : rawModuleId || '') as string;
  const topicId = (Array.isArray(rawTopicId) ? rawTopicId[0] : rawTopicId || '') as string;

  const decodedModuleId = decodeURIComponent(moduleId);
  const decodedTopicId = decodeURIComponent(topicId);

  const lesson = getLessonContent('digital-marketing', decodedModuleId, decodedTopicId);
  const { recordVisit } = useStudentProgress();

  useEffect(() => {
    if (lesson && decodedModuleId && decodedTopicId) {
      recordVisit('digital-marketing', decodedModuleId, decodedTopicId, lesson.title);
    }
  }, [lesson, decodedModuleId, decodedTopicId, recordVisit]);

  return (
    <>
      <Navbar />
      <DocumentationLayout
        currentTrack="digital-marketing"
        currentModuleId={decodedModuleId}
        currentTopicId={decodedTopicId}
        lesson={lesson}
      >
        <LessonContentRenderer lesson={lesson} />
      </DocumentationLayout>
      <Footer />
    </>
  );
}
