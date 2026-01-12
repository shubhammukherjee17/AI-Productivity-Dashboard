import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, Task, UserPreferences, EnergyLevel, Goal, UserStats, TaskStatus } from './types'; // Added UserStats

const DEFAULT_PREFERENCES: UserPreferences = {
  workStartHour: 9,
  workEndHour: 17,
  focusHours: [9, 10, 11, 14, 15],
  energyProfile: {
    // Simple default profile: High energy in morning, slump in afternoon
    8: 'medium', 9: 'high', 10: 'high', 11: 'high',
    12: 'medium', 13: 'medium', 14: 'medium', 
    15: 'medium', 16: 'low', 17: 'low', 18: 'low'
  }
};

const DEFAULT_STATS: UserStats = {
    dailyStreak: 0,
    bestStreak: 0,
    tasksToday: 0,
    tasksThisWeek: 0,
    momentumScore: 0,
    achievements: [],
    weeklyGoalProgress: 0,
    weeklyGoalTarget: 20,
    lastActiveDate: new Date().toISOString()
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      tasks: [],
      goals: [
          { id: '1', title: 'Ship product v2.0', color: 'bg-blue-600', icon: 'briefcase' },
          { id: '2', title: 'Exercise 4x per week', color: 'bg-green-600', icon: 'heart' },
          { id: '3', title: 'Complete ML certification', color: 'bg-purple-600', icon: 'graduation' }
      ], // Default demo goals
      userPreferences: DEFAULT_PREFERENCES,
      stats: DEFAULT_STATS,

      addTask: (taskData) => set((state) => {
        const newTask: Task = {
            ...taskData,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            status: 'todo',
            priorityScore: 50, // Initial score, will be re-calculated
            priority: taskData.priority || 'medium',
            dependencies: taskData.dependencies || []
        };
        return { tasks: [...state.tasks, newTask] };
      }),

      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      })),

      toggleTaskStatus: (id) => set((state) => {
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];
        
        const newTasks = state.tasks.map((t) => {
            if (t.id !== id) return t;
            const newStatus: TaskStatus = t.status === 'completed' ? 'todo' : 'completed';
            return {
                ...t,
                status: newStatus,
                completedAt: newStatus === 'completed' ? now : undefined
            };
        });

        // Recalculate Stats
        const completedToday = newTasks.filter(t => 
            t.status === 'completed' && 
            t.completedAt && 
            t.completedAt.toDateString() === now.toDateString()
        ).length;

         // Simple one-week lookback
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const completedThisWeek = newTasks.filter(t => 
            t.status === 'completed' && 
            t.completedAt && 
            new Date(t.completedAt) > oneWeekAgo
        ).length;

        // Streak Logic
        let newStreak = state.stats.dailyStreak;
        let lastActive = state.stats.lastActiveDate ? new Date(state.stats.lastActiveDate) : new Date(0); // Epoch if null
        const lastActiveStr = lastActive.toISOString().split('T')[0];
        
        // Check if we already kept the streak alive today
        if (todayStr !== lastActiveStr) {
             const yesterday = new Date();
             yesterday.setDate(yesterday.getDate() - 1);
             const yesterdayStr = yesterday.toISOString().split('T')[0];

             if (lastActiveStr === yesterdayStr) {
                 // Continued streak
                 newStreak += 1;
             } else if (new Date(lastActiveStr) < yesterday) {
                 // Broken streak (unless it's the very first task ever)
                 newStreak = 1;
             }
        }
        
        // Achievements Logic
        const newAchievements = [...(state.stats.achievements || [])];
        if (completedToday === 1 && !newAchievements.includes('First Win')) {
            newAchievements.push('First Win');
        }
        if (newStreak >= 3 && !newAchievements.includes('On a Roll')) {
             newAchievements.push('On a Roll');
        }

        // Momentum Score (Simple Alg: Streak * 10 + TasksToday * 5, max 100)
        let newMomentum = Math.min(100, (newStreak * 10) + (completedToday * 5));

        return {
            tasks: newTasks,
            stats: {
                ...state.stats,
                tasksToday: completedToday,
                tasksThisWeek: completedThisWeek,
                dailyStreak: newStreak,
                bestStreak: Math.max(state.stats.bestStreak, newStreak),
                lastActiveDate: todayStr,
                achievements: newAchievements,
                momentumScore: newMomentum,
                weeklyGoalProgress: completedThisWeek // Sync weekly progress
            }
        };
      }),

      updatePreferences: (prefs) => set((state) => ({
        userPreferences: { ...state.userPreferences, ...prefs },
      })),

      addGoal: (goalData) => set((state) => ({
          goals: [...state.goals, { ...goalData, id: crypto.randomUUID() }]
      })),

      deleteGoal: (id) => set((state) => ({
          goals: state.goals.filter(g => g.id !== id)
      })),
    }),
    {
      name: 'flowstate-storage',
      storage: createJSONStorage(() => localStorage), // Explicitly use localStorage
      partialize: (state) => ({ 
          tasks: state.tasks, 
          userPreferences: state.userPreferences, 
          goals: state.goals,
          stats: state.stats 
      }), 
    }
  )
);
