'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProdlyDashboard from './components/ProdlyDashboard';
import TaskManager from './components/TaskManager';
import FocusMode from './components/FocusMode';
import HabitTracker from './components/HabitTracker';
import CalendarIntegration from './components/CalendarIntegration';
import DailyPlanner from './components/DailyPlanner';
import AIChatAssistant from './components/AIChatAssistant';
import DashboardAnalytics from './components/DashboardAnalytics';
import Settings from './components/Settings';
import { Search, Bell, Menu } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === 'settings') {
      setShowSettings(true);
    } else {
      setActiveTab(tab);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ProdlyDashboard />;
      case 'schedule':
        return <DailyPlanner />;
      case 'projects':
        return <TaskManager />;
      case 'focus':
        return <FocusMode />;
      case 'calendar':
        return <CalendarIntegration />;
      case 'bills':
        return <HabitTracker />;
      case 'messages':
        return <AIChatAssistant geminiApiKey={geminiApiKey} />;
      case 'reports':
        return <DashboardAnalytics />;
      default:
        return <ProdlyDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCollapseChange={setSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col bg-black transition-all duration-200 min-w-0 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
          }`}
      >
        {/* Top Header with Search and Notifications */}
        <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-30 w-full">
          <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-3 md:py-4 gap-2 md:gap-4">
            {/* Left Section: Mobile Menu & Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Logo on the left - hidden on mobile to save space */}
              <div className="hidden lg:block text-xl font-bold text-white whitespace-nowrap flex-shrink-0">
                ✨ FocusPanel
              </div>
            </div>

            {/* Search Bar in Center */}
            <div className="flex-1 max-w-md mx-2 md:mx-4 lg:mx-8">
              <div className="relative">
                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search here"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-full py-2 pl-10 md:pl-12 pr-3 md:pr-4 text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-700"
                />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 md:p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Bell className="w-4 h-4 md:w-5 md:h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs md:text-sm hover:opacity-90 transition-opacity flex-shrink-0"
              >
                S
              </button>
            </div>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-4 top-16 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 z-50">
                <h3 className="text-sm font-semibold text-white mb-3">Notifications</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <p className="text-xs text-white">🎯 You completed 5 tasks today!</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <p className="text-xs text-white">⏰ Team meeting in 30 minutes</p>
                    <p className="text-xs text-gray-400 mt-1">Just now</p>
                  </div>
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <p className="text-xs text-white">🔥 15-day meditation streak!</p>
                    <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8 bg-black w-full">
          {renderContent()}
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
          isDark={isDarkTheme}
          onThemeChange={setIsDarkTheme}
          geminiApiKey={geminiApiKey}
          onApiKeyChange={setGeminiApiKey}
        />
      )}
    </div>
  );
}
