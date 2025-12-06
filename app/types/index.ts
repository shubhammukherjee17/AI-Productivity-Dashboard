// Task types
export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'work' | 'personal' | 'health' | 'learning' | 'other';
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'doing' | 'done';
  tags: string[];
  dueDate: Date;
  estimatedDuration: number; // in minutes
  createdAt: Date;
  completedAt?: Date;
  aiSuggestion?: string;
}

// Habit types
export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  category: 'health' | 'learning' | 'fitness' | 'mindfulness' | 'other';
  streak: number;
  lastCompleted?: Date;
  createdAt: Date;
  completions: Date[];
}

// Schedule types
export interface ScheduleBlock {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  taskId?: string;
  type: 'work' | 'break' | 'meeting' | 'exercise' | 'other';
  productivity: number; // 1-10
}

// Goal types
export interface Goal {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  subTasks: Task[];
  progress: number; // 0-100
  aiBreakdown?: string;
  createdAt: Date;
}

// Focus session types
export interface FocusSession {
  id: string;
  taskId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  breaks: number;
  focusScore: number; // 1-10
  completed: boolean;
}

// Calendar Event types
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  source: 'google' | 'outlook' | 'local';
  reminders: number[]; // minutes before
}

// Analytics types
export interface DailyAnalytics {
  date: Date;
  tasksCompleted: number;
  tasksTotal: number;
  timeSpent: Record<string, number>; // category -> minutes
  productivityScore: number; // 0-100
  focusScore: number; // 0-100
  habitCompletion: number; // 0-100
}

// Chat message types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// User preferences
export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  timezone: string;
  workingHoursStart: number; // 0-23
  workingHoursEnd: number; // 0-23
  pomodoroDuration: number; // minutes
  breakDuration: number; // minutes
  notificationsEnabled: boolean;
}
