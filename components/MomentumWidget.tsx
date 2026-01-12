"use client"

import { useStore } from "@/lib/store"
import { Flame, TrendingUp, AlertTriangle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function MomentumWidget() {
    const { stats } = useStore()

    // Mock AI Analysis Logic
    const currentHour = new Date().getHours();
    let riskLevel = "Low";
    let riskMessage = "You're on fire! Consistency is high.";
    let riskColor = "text-green-500";

    if (currentHour > 20) {
        riskLevel = "High";
        riskMessage = "Risk of breaking streak! Complete a task soon.";
        riskColor = "text-red-500";
    } else if (currentHour > 14) {
        riskLevel = "Medium";
        riskMessage = "Afternoon slump detected? Keep the momentum.";
        riskColor = "text-yellow-500";
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 cursor-help transition-all hover:bg-zinc-50 hover:border-zinc-300">
                        <div className="relative">
                            <Flame className={`w-5 h-5 ${riskLevel === 'High' ? 'text-zinc-400' : 'text-orange-500 animate-pulse'}`} />
                            {riskLevel === 'High' && (
                                <AlertTriangle className="w-3 h-3 text-red-500 absolute -top-1 -right-1" />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Streak</span>
                            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                                {stats.dailyStreak} Days
                            </span>
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs p-4 bg-zinc-900 text-zinc-50 border-zinc-800">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 font-semibold text-sm">
                            <TrendingUp className="w-4 h-4 text-purple-400" />
                            AI Momentum Analysis
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                            {riskMessage}
                        </p>
                        <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-700">
                            <span>Break Risk:</span>
                            <span className={`font-bold ${riskColor}`}>{riskLevel}</span>
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
