'use client';

import { useSyncExternalStore } from 'react';
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
    timestamp: 0,
  },
};

interface StudentProgressState {
  profile: StudentProfile;
  isLoaded: boolean;
}

interface StudentProgressStore {
  getSnapshot: () => StudentProgressState;
  subscribe: (listener: () => void) => () => void;
  toggleLessonCompleted: (lessonId: string) => void;
  toggleLessonBookmarked: (lessonId: string) => void;
  saveLessonNote: (lessonId: string, note: string) => void;
  recordVisit: (trackId: string, moduleId: string, lessonId: string, title: string) => void;
  updateAssignmentStatus: (
    assignmentId: string,
    status: 'Not Started' | 'In Progress' | 'Submitted' | 'Reviewed'
  ) => void;
}

const SERVER_STATE: StudentProgressState = {
  profile: DEFAULT_PROFILE,
  isLoaded: false,
};

function createStudentProgressStore(): StudentProgressStore {
  const listeners = new Set<() => void>();
  let state: StudentProgressState = SERVER_STATE;
  let hydrated = false;

  const emit = () => {
    listeners.forEach((listener) => listener());
  };

  const persist = (profile: StudentProfile) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.warn('Could not save student profile to localStorage:', error);
    }
  };

  const hydrate = () => {
    if (hydrated || typeof window === 'undefined') return;
    hydrated = true;

    let profile = DEFAULT_PROFILE;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<StudentProfile>;
        profile = { ...DEFAULT_PROFILE, ...parsed };
      }
    } catch (error) {
      console.warn('Could not read student profile from localStorage:', error);
    }

    state = { profile, isLoaded: true };
  };

  const updateProfile = (updater: (previous: StudentProfile) => StudentProfile) => {
    hydrate();

    const nextProfile = updater(state.profile);
    if (nextProfile === state.profile) return;

    state = { profile: nextProfile, isLoaded: true };
    persist(nextProfile);
    emit();
  };

  return {
    getSnapshot: () => state,
    subscribe: (listener) => {
      hydrate();
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    toggleLessonCompleted: (lessonId) => {
      updateProfile((previous) => {
        const isCompleted = previous.completedLessons.includes(lessonId);
        return {
          ...previous,
          completedLessons: isCompleted
            ? previous.completedLessons.filter((id) => id !== lessonId)
            : [...previous.completedLessons, lessonId],
        };
      });
    },
    toggleLessonBookmarked: (lessonId) => {
      updateProfile((previous) => {
        const isBookmarked = previous.bookmarkedLessons.includes(lessonId);
        return {
          ...previous,
          bookmarkedLessons: isBookmarked
            ? previous.bookmarkedLessons.filter((id) => id !== lessonId)
            : [...previous.bookmarkedLessons, lessonId],
        };
      });
    },
    saveLessonNote: (lessonId, note) => {
      updateProfile((previous) => {
        if ((previous.lessonNotes[lessonId] || '') === note) return previous;

        return {
          ...previous,
          lessonNotes: {
            ...previous.lessonNotes,
            [lessonId]: note,
          },
        };
      });
    },
    recordVisit: (trackId, moduleId, lessonId, title) => {
      updateProfile((previous) => {
        const lastVisit = previous.lastVisitedLesson;
        if (
          lastVisit &&
          lastVisit.trackId === trackId &&
          lastVisit.moduleId === moduleId &&
          lastVisit.lessonId === lessonId &&
          lastVisit.title === title
        ) {
          return previous;
        }

        return {
          ...previous,
          lastVisitedLesson: {
            trackId,
            moduleId,
            lessonId,
            title,
            timestamp: Date.now(),
          },
        };
      });
    },
    updateAssignmentStatus: (assignmentId, status) => {
      updateProfile((previous) => {
        if (previous.assignmentStatuses[assignmentId] === status) return previous;

        return {
          ...previous,
          assignmentStatuses: {
            ...previous.assignmentStatuses,
            [assignmentId]: status,
          },
        };
      });
    },
  };
}

const store = createStudentProgressStore();

export function useStudentProgress() {
  const { profile, isLoaded } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => SERVER_STATE
  );

  return {
    profile,
    isLoaded,
    toggleLessonCompleted: store.toggleLessonCompleted,
    toggleLessonBookmarked: store.toggleLessonBookmarked,
    saveLessonNote: store.saveLessonNote,
    recordVisit: store.recordVisit,
    updateAssignmentStatus: store.updateAssignmentStatus,
  };
}
