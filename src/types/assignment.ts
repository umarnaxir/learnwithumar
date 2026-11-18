import { TrackId } from './curriculum';

export interface Assignment {
  id: string;
  trackId: TrackId;
  moduleId?: string;
  title: string;
  type: 'Project' | 'Assignment' | 'Audit' | 'Capstone';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  description: string;
  learningObjectives: string[];
  requirements: string[];
  submissionInstructions: string[];
  evaluationCriteria: {
    criterion: string;
    weight: string;
  }[];
  starterCodeUrl?: string;
  templateDownloadName?: string;
  deadline?: string;
  defaultStatus?: 'Not Started' | 'In Progress' | 'Submitted' | 'Reviewed';
}
