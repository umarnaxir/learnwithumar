export type TrackId = 'full-stack' | 'digital-marketing';

export interface CurriculumLevel {
  id: string;
  trackId: TrackId;
  order: number;
  levelNumber: number;
  title: string;
  description: string;
}

export interface CurriculumModule {
  id: string;
  trackId: TrackId;
  levelId: string;
  order: number;
  moduleNumber: number;
  title: string;
  description: string;
  duration: string;
  prerequisites: string[];
  topicsCount: number;
  badge?: string;
}

export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  explanation: string;
  output?: string;
}

export interface StrategyWorkflow {
  title: string;
  scenario: string;
  strategy: string;
  expectedOutcome: string;
}

export interface LessonContent {
  id: string;
  moduleId: string;
  trackId: TrackId;
  title: string;
  slug: string;
  order: number;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  objectives: string[];
  keyConcepts: {
    title: string;
    explanation: string;
  }[];
  syntaxDefinition?: string;
  codeExamples?: CodeSnippet[];
  strategyExamples?: StrategyWorkflow[];
  stepByStepGuide: {
    step: number;
    title: string;
    details: string;
  }[];
  realWorldApplication: string;
  commonMistakes: {
    mistake: string;
    solution: string;
  }[];
  bestPractices: string[];
  exercises: {
    title: string;
    task: string;
    hints?: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  miniAssignment: {
    title: string;
    prompt: string;
    deliverables: string[];
  };
  officialDocs: {
    title: string;
    url: string;
    description: string;
  }[];
  furtherReading?: {
    title: string;
    url: string;
  }[];
}
