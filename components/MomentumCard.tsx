"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, TrendingUp, Trophy, Star, Zap } from "lucide-react"

export function MomentumCard() {
    const { stats } = useStore()

    return (
        <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
             <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                    <Flame className="w-5 h-5 text-orange-500" /> Momentum
                </CardTitle>
                <div className="flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    <TrendingUp className="w-3 h-3" /> On Fire!
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* 3 Col Stats */}
                <div className="grid grid-cols-3 gap-2 md:gap-4 text-center divide-x divide-zinc-100 dark:divide-zinc-800">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-orange-500 font-bold text-xl">
                            <Flame className="w-4 h-4 fill-orange-500" /> {stats?.dailyStreak || 0}
                        </div>
                        <span className="text-xs text-zinc-500 mt-1">Day Streak</span>
                    </div>
                     <div className="flex flex-col items-center">
                        <span className="font-bold text-xl text-zinc-900 dark:text-zinc-50">{stats?.tasksToday || 0}</span>
                        <span className="text-xs text-zinc-500 mt-1">Today</span>
                    </div>
                     <div className="flex flex-col items-center">
                        <span className="font-bold text-xl text-zinc-900 dark:text-zinc-50">{stats?.tasksThisWeek || 0}</span>
                        <span className="text-xs text-zinc-500 mt-1">This Week</span>
                    </div>
                </div>

                {/* Momsntum Score */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-zinc-600 dark:text-zinc-400">Momentum Score</span>
                        <span className="text-zinc-900 dark:text-zinc-100">{stats?.momentumScore || 0}/100</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                         <div 
                            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                            style={{ width: `${stats?.momentumScore || 0}%` }} 
                        />
                    </div>
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Recent Achievements</p>
                    <div className="flex flex-wrap gap-2">
                        {stats?.achievements?.map((ach, i) => (
                            <Badge key={i} variant="outline" className="text-green-600 border-green-200 bg-green-50 gap-1 rounded-full px-3">
                                {i === 0 ? <Trophy className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                                {ach}
                            </Badge>
                        ))}
                        {(!stats?.achievements || stats.achievements.length === 0) && (
                            <span className="text-xs text-zinc-400">No achievements yet</span>
                        )}
                    </div>
                </div>

                {/* Weekly Warrior Card */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 flex items-start gap-3">
                    <div className="p-2 bg-white dark:bg-zinc-800 rounded-full shadow-sm border border-zinc-100 dark:border-zinc-700">
                        <Star className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div className="flex-1 space-y-2">
                        <div>
                             <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Weekly Warrior</h4>
                             <p className="text-xs text-zinc-500">Complete {stats?.weeklyGoalTarget || 20} tasks in a week</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ width: `${((stats?.weeklyGoalProgress || 0) / (stats?.weeklyGoalTarget || 1)) * 100}%` }}
                                />
                            </div>
                            <span className="text-xs font-medium text-zinc-500">{stats?.weeklyGoalProgress || 0}/{stats?.weeklyGoalTarget || 20}</span>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-xs text-orange-500/80 font-medium flex items-center justify-center gap-1">
                        <Trophy className="w-3 h-3" /> Best streak: {stats?.bestStreak || 0} days
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
