"use client"

import { useStore } from "@/lib/store"
import { Task } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Briefcase, Heart, GraduationCap, Trophy } from "lucide-react"

export function GoalAlignment() {
    const { goals, tasks } = useStore()

    const getGoalStats = (goalId: string) => {
        const goalTasks = tasks.filter(t => t.goalId === goalId)
        const completed = goalTasks.filter(t => t.status === 'completed').length
        const active = goalTasks.length - completed
        const total = goalTasks.length
        
        // Avoid division by zero
        const progress = total === 0 ? 0 : Math.round((completed / total) * 100)
        
        return { active, completed, progress }
    }

    const getIcon = (iconName?: string) => {
        switch(iconName) {
            case 'briefcase': return <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            case 'heart': return <Heart className="w-4 h-4 text-green-600 dark:text-green-400" />
            case 'graduation': return <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            default: return <Trophy className="w-4 h-4 text-zinc-500" />
        }
    }

    return (
        <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm">
             <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                    <Target className="w-5 h-5 text-blue-600" /> Goal Alignment
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {goals.map(goal => {
                    const stats = getGoalStats(goal.id)
                    return (
                        <div key={goal.id} className="space-y-2">
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 font-medium text-zinc-900 dark:text-zinc-100">
                                    {getIcon(goal.icon)}
                                    <span>{goal.title}</span>
                                </div>
                                <span className="font-bold text-zinc-900 dark:text-zinc-50">{stats.progress}%</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${goal.color.replace('bg-', 'bg-') || 'bg-blue-600'}`} // Keep dynamic color
                                    style={{ width: `${Math.max(5, stats.progress)}%` }} 
                                />
                            </div>

                            {/* Stats Footer */}
                            <div className="flex justify-between text-xs text-zinc-500">
                                <span>{stats.active} active tasks</span>
                                <span>{stats.completed} completed</span>
                            </div>
                        </div>
                    )
                })}

                {goals.length === 0 && (
                     <p className="text-sm text-zinc-500 text-center py-2">No goals set yet.</p>
                )}
            </CardContent>
        </Card>
    )
}
