export type EnergyLevel = "low" | "medium" | "high";
export type Category = "work" | "study" | "personal" | "health" | "other" | "deep-work" | "shallow-work";
export type TaskStatus = "todo" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: Date; // Optional, some tasks might be backlog
  estimatedEffort: number; // in minutes
  energyRequirement: EnergyLevel;
  category: Category;
  priorityScore: number; // 0-100, calculated by AI
  priority: "low" | "medium" | "high"; // Manual user override
  status: TaskStatus;
  createdAt: Date;
  completedAt?: Date;
  dependencies: string[]; // IDs of dependent tasks
  goalId?: string; // Link to a long-term goal
  isAiScheduled?: boolean; // If true, the system decided when to do this
}

export interface Goal {
    id: string;
    title: string;
    description?: string;
    color: string;
    icon?: string;
}

export interface UserPreferences {
  workStartHour: number; // 0-23
  workEndHour: number; // 0-23
  focusHours: number[]; // Array of hours where user is most focused (e.g., [9, 10, 11])
  energyProfile: Record<number, EnergyLevel>; // Hour -> Energy Level mapping
}

export interface UserStats {
    dailyStreak: number;
    bestStreak: number;
    tasksToday: number;
    tasksThisWeek: number;
    momentumScore: number;
    achievements: string[];
    weeklyGoalProgress: number;
    weeklyGoalTarget: number;
    lastActiveDate: string; // ISO String for streak tracking
}

export interface AppState {
  tasks: Task[];
  goals: Goal[];
  userPreferences: UserPreferences;
  stats: UserStats;
  // Actions
  addTask: (task: Omit<Task, "id" | "createdAt" | "priorityScore" | "status">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  
  addGoal: (goal: Omit<Goal, "id">) => void;
  deleteGoal: (id: string) => void;

  updatePreferences: (prefs: Partial<UserPreferences>) => void;
}
