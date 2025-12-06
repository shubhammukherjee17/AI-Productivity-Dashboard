/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';

type TimerMode = 'work' | 'break';

const FocusMode: React.FC = () => {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Switch between work and break
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(5 * 60); // 5 minute break
        setSessionsCompleted(sessionsCompleted + 1);
      } else {
        setMode('work');
        setTimeLeft(25 * 60); // 25 minute work
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, sessionsCompleted]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const progress = ((mode === 'work' ? 25 * 60 : 5 * 60) - timeLeft) / ((mode === 'work' ? 25 * 60 : 5 * 60));

  return (
    <div className="space-y-8">
      {/* Timer Circle */}
      <div className="flex justify-center">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="#334155" strokeWidth="2" />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={mode === 'work' ? '#3b82f6' : '#10b981'}
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>

          {/* Timer Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-2">
            <div className={`text-6xl font-bold ${mode === 'work' ? 'text-blue-600' : 'text-emerald-600'}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-muted uppercase tracking-wider">
              {mode === 'work' ? '🎯 Focus Time' : '☕ Break Time'}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="btn btn-primary p-4 rounded-full"
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button onClick={resetTimer} className="btn btn-ghost p-4 rounded-full">
          <RotateCcw className="w-6 h-6" />
        </button>
        <button
          onClick={() => {
            setMode(mode === 'work' ? 'break' : 'work');
            setTimeLeft(mode === 'work' ? 5 * 60 : 25 * 60);
            setIsRunning(false);
          }}
          className="btn btn-ghost p-4 rounded-full"
        >
          <Coffee className="w-6 h-6" />
        </button>
      </div>

      {/* Stats */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Today&apos;s Sessions</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-900/20 p-4 rounded-lg text-center border border-blue-800">
            <p className="text-3xl font-bold text-blue-400">{sessionsCompleted}</p>
            <p className="text-sm text-gray-400">Completed</p>
          </div>
          <div className="bg-amber-900/20 p-4 rounded-lg text-center border border-amber-800">
            <p className="text-3xl font-bold text-amber-400">
              {sessionsCompleted * 25}
            </p>
            <p className="text-sm text-gray-400">Minutes Focused</p>
          </div>
        </div>
      </div>

      {/* AI Tips */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">💡 Focus Tips</h3>
        <div className="space-y-3">
          <p className="text-sm text-gray-300">
            ✨ You tend to be most focused between 10am-12pm. Schedule important tasks then.
          </p>
          <p className="text-sm text-gray-300">
            🎯 Your average focus session is 4 pomodoros. Take a longer break after that.
          </p>
          <p className="text-sm text-gray-300">
            🌙 Remember to take 5-minute breaks between sessions for best productivity!
          </p>
        </div>
      </div>

      {/* Quick Start Tasks */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Suggested Focus Tasks</h3>
        <div className="space-y-2">
          {[
            'Design dashboard UI - 480 min',
            'Write documentation - 120 min',
            'Code review - 60 min',
          ].map((task, idx) => (
            <button
              key={idx}
              className="w-full text-left card-sm hover:border-blue-700 hover:bg-blue-900/20 flex items-center justify-between"
            >
              <span className="text-sm text-gray-200">{task}</span>
              <Play className="w-4 h-4 text-blue-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FocusMode;
