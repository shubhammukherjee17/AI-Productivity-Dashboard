'use client';

import React from 'react';

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  color: 'green' | 'orange' | 'purple';
}

interface MetricCard {
  title: string;
  value: string | number;
  unit?: string;
  icon: string;
  status: string;
  color: string;
}

export default function ProdlyDashboard() {
  // Metric cards data
  const metrics: MetricCard[] = [
    {
      title: 'Focus time',
      value: '17h 30m',
      icon: '⚡',
      status: '58% of 30h goals',
      color: 'from-lime-400 to-lime-500',
    },
    {
      title: 'Meetings',
      value: '5h 15m',
      icon: '📞',
      status: '8 total meetings this week',
      color: 'from-orange-400 to-orange-500',
    },
    {
      title: 'Break time',
      value: '3h 40m',
      icon: '🌳',
      status: 'Breaks make up 18% of total time',
      color: 'from-lime-400 to-lime-500',
    },
    {
      title: 'Distractions',
      value: '628',
      icon: '⚠️',
      status: 'Most common: Phone notification',
      color: 'from-orange-400 to-orange-500',
    },
  ];

  // Timeline events
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      time: '08:00',
      title: 'Focus Work',
      description: 'UI polishing & bug fixes',
      color: 'green',
    },
    {
      id: '2',
      time: '10:30',
      title: 'Team Sync',
      description: 'Weekly goals alignment',
      color: 'orange',
    },
    {
      id: '3',
      time: '12:00',
      title: 'Lunch break',
      description: 'Take a walk & eat healthy',
      color: 'green',
    },
    {
      id: '4',
      time: '01:30',
      title: '1:1 Check-in',
      description: 'Catch up with manager',
      color: 'purple',
    },
    {
      id: '5',
      time: '03:00',
      title: 'Design Review',
      description: 'Review final prototype',
      color: 'purple',
    },
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = String(i).padStart(2, '0');
    return `${hour}:00`;
  });

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="mb-4 md:mb-6 lg:mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 break-words">Welcome back Shubham Mukherjee! 👋</h1>
        <p className="text-gray-400 text-xs md:text-sm">Here&apos;s your productivity summary & AI assistance</p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-black/60 border border-gray-700/50 rounded-xl p-4 md:p-6 hover:border-gray-600 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">{metric.title}</h3>
              <div className="w-6 h-6 rounded flex items-center justify-center text-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>
                {metric.icon}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </div>
            {/* Progress bar - vertical lines style */}
            {(metric.title === 'Focus time' || metric.title === 'Break time') && (
              <div className="flex items-end justify-start gap-0.5 h-6 mb-3">
                {Array.from({ length: 30 }).map((_, i) => {
                  // deterministic pseudo-random height so server and client match
                  const seed = metric.title;
                  const hash = seed.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
                  const heightPercent = ((hash + i * 37) % 60) + 30; // 30% - 89%
                  const bg = i % 2 === 0 ? 'rgb(163, 230, 53)' : 'rgb(132, 204, 22)';
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-sm transition-all"
                      style={{
                        height: `${heightPercent}%`,
                        background: bg,
                        opacity: 0.8,
                      }}
                    />
                  );
                })}
              </div>
            )}
            {/* Distraction avatars */}
            {metric.title === 'Distractions' && (
              <div className="flex gap-1.5 mb-3">
                {['📱', '💬', '🎮', '🎵', '📧', '🔔'].map((icon, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                    style={{
                      background: ['rgb(249, 115, 22)', 'rgb(234, 179, 8)', 'rgb(14, 165, 233)', 'rgb(168, 85, 247)', 'rgb(59, 130, 246)', 'rgb(239, 68, 68)'][i % 6],
                    }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500">{metric.status}</p>
          </div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="bg-black/40 border border-gray-700/50 rounded-xl p-4 md:p-6 mb-6 md:mb-8 overflow-hidden">
        <h2 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
          🔴 Today&apos;s Timeline
        </h2>

        {/* Time slots header - scrollable on mobile */}
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-1 mb-6 pb-2 min-w-max">
            {timeSlots.map((slot) => (
              <div
                key={slot}
                className="flex flex-col items-center flex-shrink-0 w-10 md:w-14 text-center"
              >
                <span className="text-[10px] md:text-xs text-gray-500 font-medium">{slot}</span>
                <div className="w-px h-2 md:h-3 bg-gray-700 mt-1" />
              </div>
            ))}
          </div>

          {/* Timeline events - single horizontal row */}
          <div className="relative h-24 md:h-28 min-w-max">
            {/* All events are absolutely positioned by left% so they appear on one horizontal line */}
            {timelineEvents.map((event) => {
              const hour = parseInt(event.time.split(':')[0], 10);
              const minutes = parseInt(event.time.split(':')[1], 10) || 0;
              const position = ((hour + minutes / 60) / 24) * 100; // percent across the day
              const eventColors: Record<string, string> = {
                green: 'rgb(34, 197, 94)',
                orange: 'rgb(249, 115, 22)',
                purple: 'rgb(168, 85, 247)',
              };

              return (
                <div
                  key={event.id}
                  className="absolute transform -translate-x-1/2"
                  style={{ left: `${position}%`, top: '50%' }}
                >
                  <div
                    className="rounded-lg p-2 md:p-3 shadow-lg hover:shadow-xl transition-all cursor-pointer text-xs max-w-[120px] md:max-w-xs"
                    style={{ background: eventColors[event.color], color: 'white' }}
                  >
                    <p className="font-bold text-[10px] md:text-xs">{event.time}</p>
                    <p className="font-semibold text-[10px] md:text-xs leading-tight">{event.title}</p>
                    <p className="text-[10px] md:text-xs opacity-90 leading-tight hidden md:block">{event.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Weekly Activity & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Weekly Activity Chart */}
        <div className="lg:col-span-2 bg-black/40 border border-gray-700/50 rounded-xl p-4 md:p-6 overflow-hidden">
          <h3 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
            📊 Weekly Activity Overview
          </h3>

          <div className="flex flex-col items-center">
            <div className="text-center mb-6 md:mb-8">
              <p className="text-3xl md:text-4xl font-bold text-white">24.9h</p>
              <p className="text-gray-400 text-xs md:text-sm">Total focus time this week</p>
            </div>

            {/* Bar chart */}
            <div className="flex items-end justify-center gap-1.5 md:gap-2 h-32 md:h-44 w-full px-2 md:px-4">
              {[
                { day: 'Sun', height: '35%', color: 'rgb(163, 230, 53)' },
                { day: 'Mon', height: '55%', color: 'rgb(249, 115, 22)' },
                { day: 'Tue', height: '75%', color: 'rgb(163, 230, 53)' },
                { day: 'Wed', height: '45%', color: 'rgb(249, 115, 22)' },
                { day: 'Thu', height: '85%', color: 'rgb(163, 230, 53)' },
                { day: 'Fri', height: '60%', color: 'rgb(249, 115, 22)' },
                { day: 'Sat', height: '40%', color: 'rgb(163, 230, 53)' },
              ].map((bar) => (
                <div key={bar.day} className="flex flex-col items-center gap-1.5 md:gap-2 flex-1 max-w-[40px] md:max-w-none">
                  <div
                    className="w-full rounded-t transition-all hover:opacity-80"
                    style={{ height: bar.height, background: bar.color }}
                  />
                  <span className="text-[10px] md:text-xs text-gray-400">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-black/40 border border-gray-700/50 rounded-xl p-4 md:p-6 overflow-hidden">
          <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
            🤖 AI Insights
          </h3>

          <div className="space-y-3 md:space-y-4">
            <p className="text-gray-400 text-xs">
              Based on last week, here&apos;s what we suggest:
            </p>

            <div className="space-y-2">
              <div className="bg-lime-500/10 border border-lime-500/30 rounded-lg p-2.5 md:p-3">
                <p className="text-lime-400 text-xs font-semibold mb-1">✅ Best focus window</p>
                <p className="text-gray-300 text-xs leading-snug">
                  You&apos;re most productive before noon. Prioritize deep work.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2.5 md:p-3">
                <p className="text-orange-400 text-xs font-semibold mb-1">⏰ Use 2x Pomodoro before meetings</p>
                <p className="text-gray-300 text-xs leading-snug">
                  Break work into 25-min sprints with 5-min breaks to stay focused
                </p>
              </div>

              <div className="bg-lime-500/10 border border-lime-500/30 rounded-lg p-2.5 md:p-3">
                <p className="text-lime-400 text-xs font-semibold mb-1">🔗 Batch similar tasks in AM</p>
                <p className="text-gray-300 text-xs leading-snug">
                  Group related work into blocks in mornings for better focus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
