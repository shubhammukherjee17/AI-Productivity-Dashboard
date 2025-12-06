import { create } from 'zustand';
import {
  Task,
  Habit,
  ScheduleBlock,
  Goal,
  FocusSession,
  CalendarEvent,
  DailyAnalytics,
  ChatMessage,
  UserPreferences,
} from '@/app/types';

interface AppStore {
  // Tasks
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasks: (status?: Task['status']) => Task[];

  // Habits
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  updateHabit: (id: string, habit: Partial<Habit>) => void;
  completeHabit: (id: string) => void;
  deleteHabit: (id: string) => void;

  // Schedule
  scheduleBlocks: ScheduleBlock[];
  addScheduleBlock: (block: ScheduleBlock) => void;
  updateScheduleBlock: (id: string, block: Partial<ScheduleBlock>) => void;
  deleteScheduleBlock: (id: string) => void;

  // Goals
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;

  // Focus sessions
  focusSessions: FocusSession[];
  startFocusSession: (session: FocusSession) => void;
  endFocusSession: (id: string) => void;

  // Analytics
  analytics: DailyAnalytics[];
  addAnalytics: (data: DailyAnalytics) => void;

  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;

  // Preferences
  preferences: UserPreferences;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  // Integrations / Trackers
  integrations: {
    googleCalendar?: boolean;
    figma?: boolean;
    framer?: boolean;
    connected: string[];
  };
  connectIntegration: (name: string) => void;
  disconnectIntegration: (name: string) => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'dark',
  language: 'en',
  timezone: 'UTC',
  workingHoursStart: 9,
  workingHoursEnd: 18,
  pomodoroDuration: 25,
  breakDuration: 5,
  notificationsEnabled: true,
};

export const useAppStore = create<AppStore>((set, get) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...task } : t)),
    })),
  deleteTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
  getTasks: (status) =>
    get().tasks.filter((t) => !status || t.status === status),

  habits: [],
  addHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
  updateHabit: (id, habit) =>
    set((state) => ({
      habits: state.habits.map((h) => (h.id === id ? { ...h, ...habit } : h)),
    })),
  completeHabit: (id) =>
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === id
          ? {
              ...h,
              streak: h.streak + 1,
              lastCompleted: new Date(),
              completions: [...h.completions, new Date()],
            }
          : h
      ),
    })),
  deleteHabit: (id) =>
    set((state) => ({ habits: state.habits.filter((h) => h.id !== id) })),

  scheduleBlocks: [],
  addScheduleBlock: (block) =>
    set((state) => ({
      scheduleBlocks: [...state.scheduleBlocks, block],
    })),
  updateScheduleBlock: (id, block) =>
    set((state) => ({
      scheduleBlocks: state.scheduleBlocks.map((b) =>
        b.id === id ? { ...b, ...block } : b
      ),
    })),
  deleteScheduleBlock: (id) =>
    set((state) => ({
      scheduleBlocks: state.scheduleBlocks.filter((b) => b.id !== id),
    })),

  goals: [],
  addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
  updateGoal: (id, goal) =>
    set((state) => ({
      goals: state.goals.map((g) => (g.id === id ? { ...g, ...goal } : g)),
    })),
  deleteGoal: (id) =>
    set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),

  focusSessions: [],
  startFocusSession: (session) =>
    set((state) => ({ focusSessions: [...state.focusSessions, session] })),
  endFocusSession: (id) =>
    set((state) => ({
      focusSessions: state.focusSessions.map((s) =>
        s.id === id ? { ...s, completed: true, endTime: new Date() } : s
      ),
    })),

  analytics: [],
  addAnalytics: (data) =>
    set((state) => ({ analytics: [...state.analytics, data] })),

  chatMessages: [],
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),

  preferences: defaultPreferences,
  updatePreferences: (prefs) =>
    set((state) => ({ preferences: { ...state.preferences, ...prefs } })),
  // Integrations
  integrations: {
    googleCalendar: false,
    figma: false,
    framer: false,
    connected: [],
  },
  connectIntegration: (name: string) =>
    set((state) => {
      const already = state.integrations.connected.includes(name);
      if (already) return { integrations: { ...state.integrations } };
      return {
        integrations: {
          ...state.integrations,
          [name === 'google-calendar' ? 'googleCalendar' : name]: true,
          connected: [...state.integrations.connected, name],
        },
      };
    }),
  disconnectIntegration: (name: string) =>
    set((state) => ({
      integrations: {
        ...state.integrations,
        [name === 'google-calendar' ? 'googleCalendar' : name]: false,
        connected: state.integrations.connected.filter((c) => c !== name),
      },
    })),
}));
