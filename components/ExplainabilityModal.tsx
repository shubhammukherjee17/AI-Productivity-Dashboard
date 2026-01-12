"use client"

import { Task, UserPreferences } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, Clock, Calendar, Zap, AlertCircle } from "lucide-react"
import { differenceInHours } from "date-fns"

// Simplified priority logic for display explanation
// In a real app, this would be shared code with optimizer.ts
function analyzePriority(task: Task) {
    const factors = []
    let score = 50;

    // 1. Deadline
    if (task.deadline) {
        const hoursLeft = differenceInHours(new Date(task.deadline), new Date());
        if (hoursLeft < 24) {
             factors.push({ name: "Urgency", impact: "High", score: "+30", icon: AlertCircle, desc: "Due in less than 24h" })
             score += 30;
        } else if (hoursLeft < 72) {
             factors.push({ name: "Urgency", impact: "Medium", score: "+15", icon: Clock, desc: "Due in 3 days" })
             score += 15;
        }
    }

    // 2. Effort vs Energy Match (Mock logic for explanation)
    // Assuming current user energy is available or generic
    if (task.energyRequirement === 'high') {
         factors.push({ name: "Energy Load", impact: "High", score: "-10", icon: Zap, desc: "Requires High Energy" })
         score -= 10;
    } else {
        factors.push({ name: "Quick Win", impact: "Positive", score: "+10", icon: Zap, desc: "Low Energy Requirement" })
        score += 10;
    }

    // 3. User Priority
    if (task.priority === 'high') {
        factors.push({ name: "User Override", impact: "Critical", score: "+40", icon: Flag, desc: "Marked as High Priority manually" })
        score += 40;
    }

    return { totalScore: Math.min(100, Math.max(0, score)), factors }
}

import { Flag } from "lucide-react"

export function ExplainabilityModal({ task }: { task: Task }) {
    const { totalScore, factors } = analyzePriority(task);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full hover:bg-blue-100 text-blue-500">
                    <AlertCircle className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5 text-purple-500" />
                        AI Insight
                    </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                    {/* Score Header */}
                    <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl">
                        <div>
                            <p className="text-sm text-zinc-500">Priority Score</p>
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{totalScore}/100</h3>
                        </div>
                        <div className="text-right">
                             <Badge variant={totalScore > 70 ? "destructive" : "secondary"}>
                                {totalScore > 70 ? "Must Do" : "Recommended"}
                            </Badge>
                        </div>
                    </div>

                    {/* Factor Breakdown */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Scoring Factors</h4>
                        {factors.map((factor, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-colors">
                                <div className="p-2 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-full shadow-sm">
                                    <factor.icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{factor.name}</p>
                                    <p className="text-xs text-zinc-500">{factor.desc}</p>
                                </div>
                                <span className={`text-sm font-bold ${factor.score.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                    {factor.score}
                                </span>
                            </div>
                        ))}
                        
                        {factors.length === 0 && (
                            <p className="text-sm text-zinc-500 italic">No specific factors influencing this task score significantly.</p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
