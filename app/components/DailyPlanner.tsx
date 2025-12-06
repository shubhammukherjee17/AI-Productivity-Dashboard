'use client';

import React, { useState } from 'react';
import { Clock, Zap, Plus, Trash2 } from 'lucide-react';
import { ScheduleBlock } from '@/app/types';
import { generateId, formatTime } from '@/app/utils/helpers';

const DailyPlanner: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleBlock[]>([
    {
      id: generateId(),
      title: 'Morning Meditation',
      startTime: new Date(new Date().setHours(8, 0, 0)),
      endTime: new Date(new Date().setHours(8, 15, 0)),
      type: 'break',
      productivity: 8,
    },
    {
      id: generateId(),
      title: 'Design Dashboard UI',
      startTime: new Date(new Date().setHours(8, 30, 0)),
      endTime: new Date(new Date().setHours(11, 30, 0)),
      type: 'work',
      productivity: 9,
      taskId: 'task-1',
    },
    {
      id: generateId(),
      title: 'Lunch Break',
      startTime: new Date(new Date().setHours(12, 0, 0)),
      endTime: new Date(new Date().setHours(1, 0, 0)),
      type: 'break',
      productivity: 5,
    },
    {
      id: generateId(),
      title: 'Team Meeting',
      startTime: new Date(new Date().setHours(13, 30, 0)),
      endTime: new Date(new Date().setHours(14, 30, 0)),
      type: 'meeting',
      productivity: 6,
    },
  ]);

  const deleteBlock = (id: string) => {
    setSchedule(schedule.filter((b) => b.id !== id));
  };

  const getTypeColor = (type: ScheduleBlock['type']) => {
    const colors: Record<ScheduleBlock['type'], string> = {
      work: 'bg-blue-500/20 border-blue-500/50',
      break: 'bg-emerald-500/20 border-emerald-500/50',
      meeting: 'bg-purple-500/20 border-purple-500/50',
      exercise: 'bg-red-500/20 border-red-500/50',
      other: 'bg-slate-500/20 border-slate-500/50',
    };
    return colors[type];
  };

  const getTypeIcon = (type: ScheduleBlock['type']) => {
    const icons: Record<ScheduleBlock['type'], string> = {
      work: '💼',
      break: '☕',
      meeting: '👥',
      exercise: '💪',
      other: '📌',
    };
    return icons[type];
  };

  const generatePerfectDay = () => {
    // AI-generated optimal schedule
    const newSchedule: ScheduleBlock[] = [
      {
        id: generateId(),
        title: 'Morning Routine & Meditation',
        startTime: new Date(new Date().setHours(7, 0, 0)),
        endTime: new Date(new Date().setHours(8, 0, 0)),
        type: 'break',
        productivity: 9,
      },
      {
        id: generateId(),
        title: 'Deep Work Block (Peak Hours)',
        startTime: new Date(new Date().setHours(8, 0, 0)),
        endTime: new Date(new Date().setHours(11, 0, 0)),
        type: 'work',
        productivity: 10,
      },
      {
        id: generateId(),
        title: 'Break & Exercise',
        startTime: new Date(new Date().setHours(11, 0, 0)),
        endTime: new Date(new Date().setHours(12, 0, 0)),
        type: 'exercise',
        productivity: 8,
      },
      {
        id: generateId(),
        title: 'Lunch',
        startTime: new Date(new Date().setHours(12, 0, 0)),
        endTime: new Date(new Date().setHours(1, 0, 0)),
        type: 'break',
        productivity: 6,
      },
      {
        id: generateId(),
        title: 'Collaborative Work & Meetings',
        startTime: new Date(new Date().setHours(13, 30, 0)),
        endTime: new Date(new Date().setHours(15, 30, 0)),
        type: 'meeting',
        productivity: 7,
      },
      {
        id: generateId(),
        title: 'Light Tasks & Admin',
        startTime: new Date(new Date().setHours(15, 30, 0)),
        endTime: new Date(new Date().setHours(17, 0, 0)),
        type: 'work',
        productivity: 6,
      },
      {
        id: generateId(),
        title: 'Personal Time & Relaxation',
        startTime: new Date(new Date().setHours(17, 0, 0)),
        endTime: new Date(new Date().setHours(19, 0, 0)),
        type: 'break',
        productivity: 7,
      },
    ];
    setSchedule(newSchedule);
  };

  const totalProductivity =
    schedule.reduce((sum, block) => sum + block.productivity, 0) / schedule.length;

  return (
    <div className="space-y-6">
      {/* Header with AI Action */}
      <div className="glass p-6 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">📅 Today&apos;s Schedule</h3>
          <button onClick={generatePerfectDay} className="btn btn-primary">
            <Zap className="w-4 h-4" />
            AI Generate Perfect Day
          </button>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
          <span className="text-sm text-slate-400">Predicted Productivity Score</span>
          <span className="text-2xl font-bold text-blue-400">
            {Math.round(totalProductivity)}/10
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {schedule
          .sort(
            (a, b) =>
              new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
          )
          .map((block, idx) => (
            <div
              key={block.id}
              className={`glass-sm p-4 rounded-lg border-l-4 ${getTypeColor(
                block.type
              )} group`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {getTypeIcon(block.type)}
                    </span>
                    <h4 className="font-semibold text-white">{block.title}</h4>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
                      {block.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    {formatTime(block.startTime)} - {formatTime(block.endTime)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-700/50 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${(block.productivity / 10) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">
                      {block.productivity}/10 productivity
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteBlock(block.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-700/50 rounded"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* AI Suggestions */}
      <div className="glass p-6 rounded-lg space-y-4 bg-purple-900/20 border border-purple-500/20">
        <h3 className="font-semibold text-purple-300">💡 AI Suggestions for Tomorrow</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• You completed 78% of tasks today. Consider adding one more quick win tomorrow.</li>
          <li>• Your focus quality was best from 9-11am. Block your calendar for critical work then.</li>
          <li>• Add a 15-min break after meetings for better energy levels.</li>
          <li>• Try moving exercise to 11am instead of afternoon for better focus post-lunch.</li>
        </ul>
      </div>

      {/* Quick Add Block */}
      <button className="w-full btn btn-secondary flex items-center justify-center gap-2">
        <Plus className="w-5 h-5" />
        Add Time Block
      </button>
    </div>
  );
};

export default DailyPlanner;
