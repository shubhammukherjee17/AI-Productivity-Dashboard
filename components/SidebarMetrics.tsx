"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, Timer, AlertTriangle, TrendingDown } from "lucide-react"
import { calculateCognitiveLoad, calculateBurnoutRisk } from "@/lib/analysis"

export function SidebarMetrics() {
    const { tasks } = useStore()
    
    const cognitive = calculateCognitiveLoad(tasks);
    const burnout = calculateBurnoutRisk(tasks);
    
    const getLoadColor = (level: string) => {
        switch(level) {
            case 'Optimal': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Underloaded': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'High': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Overload': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-zinc-100 text-zinc-700';
        }
    }

    const getRiskColor = (level: string) => {
        switch(level) {
            case 'Low': return 'text-green-500';
            case 'Medium': return 'text-yellow-500';
            case 'High': return 'text-red-500';
            default: return 'text-zinc-500';
        }
    }

    return (
        <div className="space-y-6">
            {/* Cognitive Load */}
            <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
                        <BrainCircuit className="w-5 h-5 text-blue-500" /> Cognitive Load
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                         <Badge className={`${getLoadColor(cognitive.loadLevel)} border-none px-3 py-1 rounded-full hover:bg-opacity-80`}>
                            {cognitive.loadLevel} Load
                        </Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex flex-col">
                            <span className="text-zinc-500 text-xs mb-1">Active Tasks</span>
                            <span className="font-bold text-lg flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                                <ActivityIcon /> {cognitive.activeTaskCount}
                            </span>
                        </div>
                         <div className="flex flex-col">
                            <span className="text-zinc-500 text-xs mb-1">Avg Session</span>
                            <span className="font-bold text-lg flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                                <Timer className="w-4 h-4 text-zinc-400" /> {cognitive.avgSessionMinutes}m
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Burnout Risk */}
             <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
                        <AlertTriangle className={`w-5 h-5 ${getRiskColor(burnout.riskLevel)}`} /> Burnout Risk
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-2">
                         <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full mr-4 overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                    burnout.riskLevel === 'High' ? 'bg-red-500' : 
                                    burnout.riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-blue-600'
                                }`} 
                                style={{ width: `${Math.max(5, burnout.riskScore)}%` }} 
                            />
                         </div>
                         <span className={`font-bold ${getRiskColor(burnout.riskLevel)}`}>{burnout.riskLevel}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                             <span className="text-zinc-500 text-xs flex items-center gap-1 mb-1">
                                <TrendingDown className="w-3 h-3" /> Delays
                             </span>
                             <span className="font-bold text-zinc-900 dark:text-zinc-50">{burnout.delayRate}%</span>
                        </div>
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                             <span className="text-zinc-500 text-xs flex items-center gap-1 mb-1">
                                <TrendingUpIcon /> Completion
                             </span>
                             <span className="font-bold text-zinc-900 dark:text-zinc-50">{burnout.completionRate}%</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function ActivityIcon() {
    return (
        <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}

function TrendingUpIcon() {
     return (
        <svg className="w-3 h-3 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
        </svg>
    )
}
