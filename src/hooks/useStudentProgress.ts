'use client';

import { useState, useEffect } from 'react';
import { StudentProfile } from '@/types/student';

const STORAGE_KEY = 'learnwithumar_student_progress_v1';

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Alex Morgan',
  role: 'Engineering & Marketing Intern',
  avatarUrl: '/avatars/student.png',
  enrolledTracks: ['full-stack', 'digital-marketing'],
  streakDays: 7,
  hoursSpent: 42,
  completedLessons: [
    'what-is-web-dev',
    'how-internet-works',
    'client-server-architecture',
    'intro-to-html',
    'what-is-digital-marketing',
    'traditional-vs-digital',
    'how-search-engines-work',
  ],
  bookmarkedLessons: [
    'client-server-architecture',
    'crawling-indexing-ranking',
    'react-components',
    'server-components',
  ],
  assignmentStatuses: {
    'fs-proj-1': 'In Progress',
    'dm-asgn-1': 'In Progress',
  },
  lessonNotes: {
    'client-server-architecture': 'Crucial: Never trust client-side validation alone. Always validate payloads on the server to prevent malicious bypasses.',
    'crawling-indexing-ranking': 'Remember: robots.txt Disallow blocks crawling, not indexing! To prevent indexing, must use <meta name="robots" content="noindex">.',
  },
  lastVisitedLesson: {
    trackId: 'full-stack',
    moduleId: 'intro-web-dev',
    lessonId: 'client-server-architecture',
    title: 'Client and Server Architecture',
    timestamp: Date.now(),
  },
};

export function useStudentProgress() {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        queueMicrotask(() => {
          setProfile((prev) => ({ ...prev, ...parsed }));
          setIsLoaded(true);
        });
        return;
      }
    } catch (e) {
      console.warn('Could not read student profile from localStorage:', e);
    }
    queueMicrotask(() => {
      setIsLoaded(true);
    });
  }, []);

  const saveProfile = (updated: StudentProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save student profile to localStorage:', e);
    }
  };

  const toggleLessonCompleted = (lessonId: string) => {
    const isCompleted = profile.completedLessons.includes(lessonId);
    const updated = {
      ...profile,
      completedLessons: isCompleted
        ? profile.completedLessons.filter((id) => id !== lessonId)
        : [...profile.completedLessons, lessonId],
    };
    saveProfile(updated);
  };

  const toggleLessonBookmarked = (lessonId: string) => {
    const isBookmarked = profile.bookmarkedLessons.includes(lessonId);
    const updated = {
      ...profile,
      bookmarkedLessons: isBookmarked
        ? profile.bookmarkedLessons.filter((id) => id !== lessonId)
        : [...profile.bookmarkedLessons, lessonId],
    };
    saveProfile(updated);
  };

  const saveLessonNote = (lessonId: string, note: string) => {
    const updated = {
      ...profile,
      lessonNotes: {
        ...profile.lessonNotes,
        [lessonId]: note,
      },
    };
    saveProfile(updated);
  };

  const recordVisit = (trackId: string, moduleId: string, lessonId: string, title: string) => {
    const updated = {
      ...profile,
      lastVisitedLesson: {
        trackId,
        moduleId,
        lessonId,
        title,
        timestamp: Date.now(),
      },
    };
    saveProfile(updated);
  };

  const updateAssignmentStatus = (
    assignmentId: string,
    status: 'Not Started' | 'In Progress' | 'Submitted' | 'Reviewed'
  ) => {
    const updated = {
      ...profile,
      assignmentStatuses: {
        ...profile.assignmentStatuses,
        [assignmentId]: status,
      },
    };
    saveProfile(updated);
  };

  return {
    profile,
    isLoaded,
    toggleLessonCompleted,
    toggleLessonBookmarked,
    saveLessonNote,
    recordVisit,
    updateAssignmentStatus,
  };
}
