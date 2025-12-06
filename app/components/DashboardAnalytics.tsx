'use client';

import React, { useState } from 'react';
import Integrations from './Integrations';
import { useAppStore } from '@/app/store';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DashboardData {
  weeklyData: { day: string; tasks: number; completed: number }[];
  productivityTrend: { day: string; score: number }[];
  categoryBreakdown: { name: string; value: number; color: string }[];
  stats: {
    tasksCompleted: number;
    focusHours: number;
    habitStreak: number;
    productivityScore: number;
  };
}

const DashboardAnalytics: React.FC = () => {
  const [showIntegrations, setShowIntegrations] = useState(false);

  // Mock data
  const dashboardData: DashboardData = {
    weeklyData: [
      { day: 'Mon', tasks: 8, completed: 6 },
      { day: 'Tue', tasks: 10, completed: 8 },
      { day: 'Wed', tasks: 9, completed: 7 },
      { day: 'Thu', tasks: 12, completed: 10 },
      { day: 'Fri', tasks: 7, completed: 7 },
      { day: 'Sat', tasks: 5, completed: 5 },
      { day: 'Sun', tasks: 4, completed: 3 },
    ],
    productivityTrend: [
      { day: 'Mon', score: 72 },
      { day: 'Tue', score: 78 },
      { day: 'Wed', score: 75 },
      { day: 'Thu', score: 85 },
      { day: 'Fri', score: 80 },
      { day: 'Sat', score: 65 },
      { day: 'Sun', score: 70 },
    ],
    categoryBreakdown: [
      { name: 'Work', value: 40, color: '#3b82f6' },
      { name: 'Learning', value: 30, color: '#10b981' },
      { name: 'Health', value: 20, color: '#ef4444' },
      { name: 'Personal', value: 10, color: '#8b5cf6' },
    ],
    stats: {
      tasksCompleted: 43,
      focusHours: 24,
      habitStreak: 12,
      productivityScore: 78,
    },
  };

  return (
    <div className="space-y-6">
      {/* Top header layout: profile | stats cards & connectors | meetings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Profile card (left) */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 animate-slideIn">
          <h4 className="text-lg font-medium mb-4 text-white">Profile</h4>
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full p-2 bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center border-4 border-yellow-400 flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-blue-300" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Shubham Mukherjee</div>
              <div className="text-xs text-gray-400">Your personal dashboard</div>
              <div className="flex gap-2 mt-4 text-xs flex-wrap">
                <span className="px-2 py-1 rounded-full bg-red-900/30 text-red-300 border border-red-800">👥 11</span>
                <span className="px-2 py-1 rounded-full bg-orange-900/30 text-orange-300 border border-orange-800">✅ 56</span>
                <span className="px-2 py-1 rounded-full bg-amber-900/30 text-amber-300 border border-amber-800">🏆 12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: two gradient stat cards + connectors */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl p-6 animate-slideIn shadow-lg" style={{ background: 'linear-gradient(135deg, #4c0519 0%, #831843 100%)' }}>
              <div className="flex items-start justify-between mb-12">
                <div className="text-sm text-pink-100 font-medium">Prioritized Tasks</div>
                <div className="text-lg">⏱️</div>
              </div>
              <div className="text-5xl font-bold text-white">83%</div>
              <div className="text-xs text-pink-200 mt-2">Avg. Completed</div>
            </div>
            <div className="rounded-3xl p-6 animate-slideIn shadow-lg" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)' }}>
              <div className="flex items-start justify-between mb-12">
                <div className="text-sm text-blue-100 font-medium">Additional Tasks</div>
                <div className="text-lg">✔️</div>
              </div>
              <div className="text-5xl font-bold text-white">56%</div>
              <div className="text-xs text-blue-200 mt-2">Avg. Completed</div>
            </div>
          </div>

          <div className="card p-3 flex items-center justify-between gap-4 animate-fadeIn bg-gray-900 border-gray-800">
            <div>
              <div className="text-sm font-medium text-white">Trackers Connected</div>
              <div className="text-xs text-gray-400">3 Active Connections</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold border-2 border-gray-900">G</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold border-2 border-gray-900">F</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-xs font-bold border-2 border-gray-900">R</div>
              </div>
              <button className="btn btn-primary text-xs" onClick={() => setShowIntegrations(true)}>Manage</button>
            </div>
          </div>
        </div>

        {/* Right: meetings + developed areas */}
        <div className="space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-semibold text-white">My meetings</h5>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">📅</div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { date: 'Tue, 11 Jul', time: '08:15 am', title: 'Quick Daily Meeting' },
                { date: 'Tue, 11 Jul', time: '09:30 pm', title: 'John Onboarding' },
                { date: 'Tue, 11 Jul', time: '02:30 pm', title: 'Call With a New Team' },
              ].map((m, idx) => (
                <div key={idx} className="pb-3 border-b border-gray-800 last:border-b-0">
                  <div className="text-xs text-gray-500">{m.date} • {m.time}</div>
                  <div className="font-medium text-gray-200">{m.title}</div>
                </div>
              ))}
              <div className="text-center text-xs text-blue-400 mt-3 cursor-pointer hover:text-blue-300 font-medium">See all meetings ›</div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <h5 className="font-semibold text-white mb-4">Developed areas</h5>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Sport Skills', pct: 71, color: '#f59e0b' },
                { label: 'Blogging', pct: 92, color: '#3b82f6' },
                { label: 'Leadership', pct: 33, color: '#ef4444' },
                { label: 'Meditation', pct: 56, color: '#10b981' },
                { label: 'Philosophy', pct: 79, color: '#8b5cf6' },
              ].map((d) => (
                <div key={d.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300">{d.label}</span>
                    <span className="text-xs text-gray-500">{d.pct}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div style={{ width: `${d.pct}%`, background: d.color, height: '100%', borderRadius: '9999px' }} className="transition-all duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Completion Chart */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4 animate-fadeIn">
          <h3 className="text-lg font-semibold text-white">Weekly Tasks</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f3f4f6'
                }}
              />
              <Legend />
              <Bar dataKey="completed" stackId="a" fill="#10b981" />
              <Bar dataKey="tasks" stackId="a" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Productivity Trend */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4 animate-fadeIn">
          <h3 className="text-lg font-semibold text-white">Productivity Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.productivityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f3f4f6'
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4 animate-fadeIn">
          <h3 className="text-lg font-semibold text-white">Time by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.categoryBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dashboardData.categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f3f4f6'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights */}
        <div className="card-lg space-y-4 animate-fadeIn" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' }}>
          <h3 className="text-lg font-semibold text-white">🤖 AI Insights</h3>
          <div className="space-y-3 text-sm">
            <p className="text-gray-300">
              ✨ <span className="font-medium text-white">You were most productive Thursday</span> between 10am-1pm. Consider scheduling important tasks then.
            </p>
            <p className="text-gray-300">
              📈 <span className="font-medium text-white">Your focus time improved by 23%</span> this week. Keep up the momentum with your morning routine!
            </p>
            <p className="text-gray-300">
              💡 <span className="font-medium text-white">Suggestion:</span> You tend to slack on Sundays. Try scheduling one small task to maintain consistency.
            </p>
            <button className="btn btn-primary w-full">
              Get Personalized Recommendations
            </button>
          </div>
        </div>
      </div>

      {showIntegrations && <Integrations onClose={() => setShowIntegrations(false)} />}
    </div>
  );
};

export default DashboardAnalytics;
