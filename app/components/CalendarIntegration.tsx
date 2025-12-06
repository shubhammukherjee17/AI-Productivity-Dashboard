'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { CalendarEvent } from '@/app/types';
import { generateId, formatDate } from '@/app/utils/helpers';

const CalendarIntegration: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: generateId(),
      title: 'Team Standup',
      description: 'Daily sync with team',
      startTime: new Date(new Date().setHours(10, 0, 0)),
      endTime: new Date(new Date().setHours(10, 30, 0)),
      source: 'local',
      reminders: [10, 5],
    },
    {
      id: generateId(),
      title: 'Project Review',
      description: 'Quarterly review meeting',
      startTime: new Date(new Date().setHours(14, 0, 0)),
      endTime: new Date(new Date().setHours(15, 0, 0)),
      source: 'google',
      reminders: [30],
    },
  ]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth });

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const monthName = currentDate.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Calendar Grid */}
      <div className="glass p-6 rounded-lg space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">{monthName}</h3>
          <div className="flex gap-2">
            <button onClick={previousMonth} className="p-2 hover:bg-white/20 rounded">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextMonth} className="p-2 hover:bg-white/20 rounded">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-slate-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {emptyDays.map((_, idx) => (
            <div key={`empty-${idx}`} className="aspect-square" />
          ))}
          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            const isToday =
              day === new Date().getDate() &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear();

            return (
              <div
                key={day}
                className={`aspect-square p-2 rounded-lg border ${
                  isToday
                    ? 'bg-blue-600/30 border-blue-500/50'
                    : 'bg-white/5 border-white/10'
                } hover:bg-white/15 cursor-pointer transition-colors`}
              >
                <p className={`text-xs font-semibold mb-1 ${isToday ? 'text-blue-300' : ''}`}>
                  {day}
                </p>
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="text-xs bg-blue-500/30 px-1 py-0.5 rounded truncate"
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <p className="text-xs text-slate-400">
                      +{dayEvents.length - 2} more
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold">Upcoming Events</h3>
        <div className="space-y-3">
          {events
            .sort(
              (a, b) =>
                new Date(a.startTime).getTime() -
                new Date(b.startTime).getTime()
            )
            .slice(0, 5)
            .map((event) => (
              <div
                key={event.id}
                className="glass-sm p-3 rounded-lg flex items-start gap-3"
              >
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs text-slate-400">{event.description}</p>
                  <div className="flex gap-2 text-xs text-slate-400">
                    <span>{formatDate(event.startTime)}</span>
                    <span>
                      {new Date(event.startTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      -{' '}
                      {new Date(event.endTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    event.source === 'google'
                      ? 'bg-red-500/20 text-red-300'
                      : event.source === 'outlook'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-slate-500/20 text-slate-300'
                  }`}
                >
                  {event.source}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="glass p-6 rounded-lg space-y-4 bg-emerald-500/10 border border-emerald-500/20">
        <h3 className="text-emerald-300 font-semibold">✨ AI Free Time Analysis</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li>• You have 8 hours of free time tomorrow. Block 3 hours for deep work 10am-1pm.</li>
          <li>• Meeting-heavy day on Friday. Move non-urgent tasks to Thursday or Monday.</li>
          <li>• You&apos;re back-to-back Tuesday-Wednesday. Schedule breaks between meetings.</li>
        </ul>
      </div>
    </div>
  );
};

export default CalendarIntegration;
