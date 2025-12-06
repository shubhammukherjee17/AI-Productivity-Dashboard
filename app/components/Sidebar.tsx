"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  BarChart2,
  Layers,
  MessageCircle,
  Target,
  Settings,
  Grid,
  ChevronLeft,
  ChevronRight,
  Clock,
  Zap,
} from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navigation: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <Grid className="w-5 h-5" /> },
  { id: "schedule", label: "Daily Planner", icon: <Clock className="w-5 h-5" /> },
  { id: "projects", label: "Task Manager", icon: <Layers className="w-5 h-5" /> },
  { id: "focus", label: "Focus Mode", icon: <Zap className="w-5 h-5" /> },
  { id: "calendar", label: "Calendar", icon: <Calendar className="w-5 h-5" /> },
  { id: "bills", label: "Habit Tracker", icon: <Target className="w-5 h-5" /> },
  { id: "messages", label: "AI Assistant", icon: <MessageCircle className="w-5 h-5" /> },
  { id: "reports", label: "Analytics", icon: <BarChart2 className="w-5 h-5" /> },
  { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
];

const Sidebar: React.FC<{
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCollapseChange?: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}> = ({ activeTab, onTabChange, onCollapseChange, mobileOpen = false, onMobileClose }) => {
  // Determine pinned/collapsed initial values from localStorage to avoid effect-setState
  const [isPinned, setIsPinned] = useState<boolean>(() => {
    try {
      return localStorage.getItem("sidebarPinned") === "true";
    } catch {
      return false;
    }
  });
  // collapsed = compact icons-only state on desktop; if pinned -> expanded
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem("sidebarPinned", String(isPinned));
    } catch {
      // ignore
    }
  }, [isPinned]);

  // notify parent when collapsed state changes (so layout can adapt)
  useEffect(() => {
    if (typeof onCollapseChange === 'function') {
      try {
        onCollapseChange(isCollapsed);
      } catch {
        // ignore
      }
    }
  }, [isCollapsed, onCollapseChange]);

  const handleMouseEnter = () => {
    if (!isPinned) setIsCollapsed(false);
  };
  const handleMouseLeave = () => {
    if (!isPinned) setIsCollapsed(true);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed left-0 top-0 h-screen p-4 overflow-y-auto transition-all duration-300 z-40 bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } ${isCollapsed ? "w-20" : "w-64"}`}
        style={{ willChange: 'width, transform' }}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-lime-500/20 ${isCollapsed ? "bg-lime-400" : "bg-gradient-to-br from-lime-400 to-lime-500"}`}>
              <span className={`font-bold ${isCollapsed ? "text-black text-sm" : "text-black"}`}>✨</span>
            </div>
            {!isCollapsed && (
              <div className="animate-fadeIn">
                <div className="text-white font-bold text-lg tracking-tight">FocusPanel</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">AI Productivity</div>
              </div>
            )}
          </div>

          {/* collapse/expand button */}
          <button
            onClick={() => {
              setIsCollapsed((s) => !s);
            }}
            title={isCollapsed ? "Expand" : "Collapse"}
            className="hidden md:inline-flex p-1 rounded hover:bg-gray-900"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4 text-gray-300" /> : <ChevronLeft className="w-4 h-4 text-gray-300" />}
          </button>
        </div>

        <nav className="space-y-1.5 flex-1">
          {navigation.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onMobileClose?.();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${isActive
                  ? "bg-white/10 text-white shadow-lg shadow-black/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-lime-400 rounded-r-full shadow-[0_0_10px_rgba(163,230,53,0.5)]" />
                )}
                <div className={`relative z-10 ${isActive ? "text-lime-400" : "text-gray-400 group-hover:text-white"}`}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className={`font-medium text-sm whitespace-nowrap relative z-10 ${isActive ? "text-white" : ""}`}>
                    {item.label}
                  </span>
                )}
                {isCollapsed && isActive && (
                  <div className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-50 shadow-xl border border-gray-800 animate-fadeIn">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-white/5">
          <div className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-white/5 ${isCollapsed ? "justify-center" : "justify-between"}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">S</div>
              {!isCollapsed && (
                <div className="flex-1 text-sm">
                  <div className="text-white font-medium">Shubham</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">Premium</div>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button
                onClick={() => setIsPinned((p) => !p)}
                title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
                className={`p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors ${isPinned ? "text-lime-400" : ""}`}
              >
                {isPinned ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && <div onClick={onMobileClose} className="fixed inset-0 bg-black/50 md:hidden z-30" />}
    </>
  );
};

export default Sidebar;
