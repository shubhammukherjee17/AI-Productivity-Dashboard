/* eslint-disable react-hooks/purity */
'use client';

import React, { useState } from 'react';
import { CheckCircle2, Plus, Trash2, Flame, Search } from 'lucide-react';
import { Habit } from '@/app/types';
import { generateId } from '@/app/utils/helpers';

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: generateId(),
      name: 'Morning Meditation',
      description: '10 minutes of mindfulness',
      frequency: 'daily',
      category: 'mindfulness',
      streak: 15,
      lastCompleted: new Date(Date.now() - 2 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      completions: [],
    },
    {
      id: generateId(),
      name: 'Read 30 minutes',
      description: 'Reading or learning',
      frequency: 'daily',
      category: 'learning',
      streak: 8,
      lastCompleted: new Date(Date.now() - 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      completions: [],
    },
    {
      id: generateId(),
      name: 'Gym Session',
      description: '45 minutes workout',
      frequency: 'daily',
      category: 'fitness',
      streak: 5,
      lastCompleted: undefined,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      completions: [],
    },
  ]);

  const [newHabit, setNewHabit] = useState('');

  const completeHabit = (id: string) => {
    setHabits(
      habits.map((h) =>
        h.id === id
          ? {
            ...h,
            streak: h.streak + 1,
            lastCompleted: new Date(),
            completions: [...h.completions, new Date()],
          }
          : h
      )
    );
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      const habit: Habit = {
        id: generateId(),
        name: newHabit,
        description: '',
        frequency: 'daily',
        category: 'other',
        streak: 0,
        createdAt: new Date(),
        completions: [],
      };
      setHabits([...habits, habit]);
      setNewHabit('');
    }
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 20) return 'text-red-400';
    if (streak >= 10) return 'text-orange-400';
    if (streak >= 5) return 'text-yellow-400';
    return 'text-slate-400';
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      health: '🏥',
      learning: '📚',
      fitness: '💪',
      mindfulness: '🧘',
      other: '⭐',
    };
    return emojis[category] || '⭐';
  };

  return (
    <div className="space-y-6">
      {/* Add Habit Input */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addHabit()}
            placeholder="Search or add new habit..."
            className="w-full bg-[#1e293b] border-none rounded-full py-3 pl-12 pr-12 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
          <button
            onClick={addHabit}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-purple-900/20 border border-purple-800 rounded-xl p-6 space-y-3">
        <p className="text-sm text-purple-200">
          🤖 <span className="font-medium">AI Suggestion:</span> Your meditation streak is impressive! Consider adding &quot;Evening Gratitude&quot; to balance your routine.
        </p>
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map((habit) => (
          <div key={habit.id} className="card-md group space-y-4 bg-gray-900/50 border-gray-800">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getCategoryEmoji(habit.category)}</span>
                  <h3 className="font-semibold text-white">{habit.name}</h3>
                </div>
                <p className="text-xs text-gray-400">{habit.description}</p>
              </div>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-900/40 rounded"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center justify-between px-3 py-2.5 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2">
                <Flame className={`w-5 h-5 ${getStreakColor(habit.streak)}`} />
                <div>
                  <p className={`text-lg font-bold ${getStreakColor(habit.streak)}`}>
                    {habit.streak}
                  </p>
                  <p className="text-xs text-gray-400">day streak</p>
                </div>
              </div>
              {habit.lastCompleted && (
                <p className="text-xs text-gray-400">
                  Last: Today
                </p>
              )}
            </div>

            {/* Complete Button */}
            <button
              onClick={() => completeHabit(habit.id)}
              className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${habit.lastCompleted
                ? 'bg-emerald-900/40 text-emerald-400 hover:bg-emerald-800'
                : 'btn btn-primary'
                }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {habit.lastCompleted ? 'Completed Today' : 'Complete Today'}
            </button>
          </div>
        ))}
      </div>

      {/* Weekly Overview */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Weekly Overview</h3>
        <div className="space-y-3">
          {habits.map((habit) => (
            <div key={habit.id} className="space-y-2">
              <p className="text-sm font-medium text-gray-300">{habit.name}</p>
              <div className="flex gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-8 rounded ${i === 6
                      ? 'bg-emerald-500'
                      : i > 4
                        ? 'bg-gray-700'
                        : 'bg-gray-800'
                      }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
