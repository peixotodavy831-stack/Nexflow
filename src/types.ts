export type MascotMood = 'calm' | 'focused' | 'deep_flow' | 'celebrating' | 'resting';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
  levelTitle: string;
  totalStudyMinutes: number;
  averageFlowScore: number;
  streakDays: number;
  weeklyGoalHours: number;
  currentWeeklyMinutes: number;
  soundEnabled: boolean;
  ambientSound: 'none' | 'ocean' | 'rain' | 'binaural' | 'lofi_synth';
}

export interface Subject {
  id: string;
  name: string;
  color: string; // e.g. '#6F7CFF', '#A78BFA', '#FF8EAB', '#8ED8FF', '#9DE0C0', '#FFC978'
  category: string;
  progress: number; // 0 to 100
  totalTimeMinutes: number;
  goalsCount: number;
  activeGoal?: string;
  topics: string[];
}

export interface StudyGoal {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  title: string;
  progress: number; // 0 to 100
  completed: boolean;
  estimatedMinutes: number;
  studiedMinutes: number;
  lastStudied?: string;
  notes?: string;
}

export interface FlowSession {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  topic: string;
  goalTitle: string;
  startTime: string;
  endTime?: string;
  durationSeconds: number;
  pausesCount: number;
  interruptionsCount: number;
  focusScore: number; // 0 to 100%
  flowScore: number; // 0 to 100
  state: 'stable' | 'deep' | 'ascending' | 'finished';
  notes?: string;
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'flow' | 'constancy' | 'mastery' | 'milestone';
  badgeColor: string;
}

export interface NexChatMessage {
  id: string;
  sender: 'user' | 'nex';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'start_flow' | 'create_goal' | 'review_topic';
    subjectName: string;
    goalTitle: string;
    suggestedDurationMin: number;
  };
  breakdownTasks?: string[];
}

export interface WeeklyFlowStat {
  day: string; // "Seg", "Ter", "Qua", etc.
  minutes: number;
  flowScore: number;
}
