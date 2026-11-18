export interface StudentProfile {
  name: string;
  role: string;
  avatarUrl: string;
  enrolledTracks: ('full-stack' | 'digital-marketing')[];
  streakDays: number;
  hoursSpent: number;
  completedLessons: string[];
  bookmarkedLessons: string[];
  assignmentStatuses: Record<string, 'Not Started' | 'In Progress' | 'Submitted' | 'Reviewed'>;
  lessonNotes: Record<string, string>;
  lastVisitedLesson?: {
    trackId: string;
    moduleId: string;
    lessonId: string;
    title: string;
    timestamp: number;
  };
}
