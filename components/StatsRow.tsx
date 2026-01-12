"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle, Zap, TrendingUp, Activity } from "lucide-react" // Importing icons
import { EnergyLevel } from "@/lib/types"

export function StatsRow() {
    const { tasks, userPreferences, updatePreferences } = useStore()
    
    // Derived Metrics
    // 1. Completed Today (Mocking "Today" check by just counting all completed for now)
    const completedToday = tasks.filter(t => t.status === 'completed').length
    
    // 2. Work Remaining
    const pendingTasks = tasks.filter(t => t.status !== 'completed')
    const totalMinutes = pendingTasks.reduce((acc, t) => acc + t.estimatedEffort, 0)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    
    // 3. Overdue (Mock login based on current time)
    const overdue = pendingTasks.filter(t => t.deadline && new Date(t.deadline) < new Date()).length

    // 4. Energy Level
    const currentHour = new Date().getHours()
    // In a real app we'd likely have a "manual override" in the store, 
    // for now let's assume editing the profile for the current hour.
    const currentEnergy = userPreferences.energyProfile[currentHour] || 'medium'

    const setEnergy = (level: EnergyLevel) => {
        const newProfile = { ...userPreferences.energyProfile, [currentHour]: level }
        updatePreferences({ energyProfile: newProfile })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Completed Tasks */}
            <Card className="rounded-2xl border-purple-100 bg-purple-50/30 dark:bg-purple-900/10 dark:border-purple-800">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg text-purple-600 dark:text-purple-300">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <Badge variant="secondary" className="bg-white/50 dark:bg-black/20">Today</Badge>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{completedToday}</h3>
                        <p className="text-sm text-zinc-500">Tasks completed</p>
                    </div>
                </CardContent>
            </Card>

            {/* Work Remaining */}
            <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                         <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400">
                            <Clock className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{hours}h {minutes}m</h3>
                        <p className="text-sm text-zinc-500">Total work remaining</p>
                    </div>
                </CardContent>
            </Card>

            {/* Overdue */}
            <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                         <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-500">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{overdue}</h3>
                        <p className="text-sm text-zinc-500">Overdue tasks</p>
                    </div>
                </CardContent>
            </Card>

            {/* Current Energy Selector */}
            <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start mb-2">
                         <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-500">
                            <Zap className="w-5 h-5" />
                        </div>
                        <button className="text-zinc-400 hover:text-zinc-600">
                             <TrendingUp className="w-4 h-4" />
                        </button>
                    </div>
                    <div>
                        <p className="text-sm font-medium mb-3">Current Energy</p>
                        <div className="flex flex-wrap gap-2">
                            <button 
                                onClick={() => setEnergy('low')}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${currentEnergy === 'low' ? 'bg-primary text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}
                            >
                                ● Low
                            </button>
                            <button 
                                onClick={() => setEnergy('medium')}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${currentEnergy === 'medium' ? 'bg-amber-500 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}
                            >
                                ● Medium
                            </button>
                            <button 
                                onClick={() => setEnergy('high')}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${currentEnergy === 'high' ? 'bg-green-500 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}
                            >
                                ● High
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
