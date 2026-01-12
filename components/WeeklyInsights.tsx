"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Target, Calendar, Lightbulb, Briefcase, Home, Dumbbell, BookOpen } from "lucide-react"

export function WeeklyInsights() {
    const { tasks, stats } = useStore()

    // Real Data Derivation
    const completedTasks = tasks.filter(t => t.status === 'completed');
    
    // 1. Calculate Daily Activity (Last 7 days)
    // We want S M T W T F S format relative to current day? Or fixed?
    // Let's do fixed "Last 7 Days" ending today
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(today.getDate() - 6 + i); // 6 days ago to today
        return d;
    });

    const weeklyData = last7Days.map(date => {
        const dayStr = date.toDateString();
        const count = completedTasks.filter(t => 
            t.completedAt && new Date(t.completedAt).toDateString() === dayStr
        ).length;
        return { day: days[date.getDay()], val: count, fullDate: dayStr }; // val is raw count
    });
    
    // Normalize graph (max height 10, so if max count is 5, multiply by 2?)
    const maxCount = Math.max(...weeklyData.map(d => d.val), 1); // Avoid 0 div
    
    // 2. Metrics
    const totalCompleted = stats.tasksThisWeek; 
    
    // Worked Hours (Estimate: Sum of estimatedEffort of completed tasks / 60)
    const workedMinutes = completedTasks.reduce((acc, t) => acc + t.estimatedEffort, 0);
    const workedHours = Math.round(workedMinutes / 60 * 10) / 10; // 1 decimal

    // Accuracy (Mock logic: Did we finish before deadline? For now just 100% placeholder or simple math)
    const accuracy = 92; 

    // 3. Category Breakdown
    const categoryCounts: Record<string, number> = {};
    completedTasks.forEach(t => {
        categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
    });
    
    // Map to display format
    const categoryData = Object.entries(categoryCounts).map(([cat, count]) => {
         let icon = Briefcase;
         let color = 'bg-zinc-500';
         if (cat === 'work') { icon = Briefcase; color = 'bg-primary'; } // Primary Violet
         if (cat === 'personal') { icon = Home; color = 'bg-pink-500'; }
         if (cat === 'learning') { icon = BookOpen; color = 'bg-indigo-500'; }
         if (cat === 'health') { icon = Dumbbell; color = 'bg-teal-500'; }
         
         const pct = Math.round((count / totalCompleted) * 100);
         return { label: cat, icon, color, val: pct, count };
    }).sort((a,b) => b.count - a.count).slice(0, 4); 

    return (
        <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
             <CardHeader className="pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                        <Clock className="w-4 h-4 text-primary" /> 
                    </div>
                    Weekly Insights
                </CardTitle>
                <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-xs font-medium px-3 py-1 rounded-full">
                    Last 7 Days
                </div>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* 3 Top Cards */}
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl flex flex-col items-center text-center">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mb-2" />
                        <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{totalCompleted}</span>
                        <span className="text-xs text-zinc-500">Completed</span>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl flex flex-col items-center text-center">
                        <Clock className="w-5 h-5 text-blue-500 mb-2" />
                        <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{workedHours}h</span>
                        <span className="text-xs text-zinc-500">Worked</span>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl flex flex-col items-center text-center">
                        <Target className="w-5 h-5 text-purple-500 mb-2" />
                        <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{accuracy}%</span>
                        <span className="text-xs text-zinc-500">Accuracy</span>
                    </div>
                </div>

                {/* Daily Activity Chart */}
                <div className="space-y-4">
                    <h4 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Daily Activity</h4>
                    <div className="flex justify-between items-end h-24 px-2">
                        {weeklyData.map((d, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 w-full">
                                <div 
                                    className={`w-2.5 rounded-full transition-all duration-500 ${d.val > 0 ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-800'}`} 
                                    style={{ height: `${(d.val / maxCount) * 100}%`, minHeight: '4px' }}
                                />
                                <span className="text-xs text-zinc-400">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Peak Performance Banner */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Peak Performance</span>
                    </div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">Mon @ 10 PM</span>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-4">
                     <h4 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Category Breakdown</h4>
                     <div className="space-y-3">
                        {categoryData.map((cat, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <cat.icon className="w-4 h-4 text-zinc-400" />
                                <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.val}%` }} />
                                </div>
                                <span className="text-xs font-medium text-zinc-500 w-4 text-right">{cat.count}</span>
                            </div>
                        ))}
                     </div>
                </div>

                {/* Footer comparison */}
                <div className="flex justify-between items-center text-sm pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">vs Last Week</span>
                    <span className="text-red-500 font-medium flex items-center gap-1">↓ 1% tasks</span>
                </div>

                {/* AI Recs */}
                <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500 font-medium text-sm">
                        <Lightbulb className="w-4 h-4" /> AI Recommendations
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Great weekend boundaries! Keep protecting your rest time. Try shifting deep work to Monday mornings when your energy is highest.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
