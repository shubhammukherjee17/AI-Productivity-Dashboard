"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { TaskList } from "@/components/TaskList"
import { TaskForm } from "@/components/TaskForm"
import { SidebarMetrics } from "@/components/SidebarMetrics"
import { StatsRow } from "@/components/StatsRow"
import { EnergySchedule } from "@/components/EnergySchedule"
import { GoalAlignment } from "@/components/GoalAlignment"
import { MomentumWidget } from "@/components/MomentumWidget"
import { MomentumCard } from "@/components/MomentumCard"
import { FocusModeDialog } from "@/components/FocusModeDialog"
import { WeeklyInsights } from "@/components/WeeklyInsights"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BrainCircuit, CheckCircle, Plus } from "lucide-react"

export function Dashboard() {
  const { tasks } = useStore()
  const [open, setOpen] = useState(false)
  
  const incompleteTasks = tasks.filter(t => t.status !== 'completed')

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-black p-4 md:p-8 font-sans overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">
                            FlowState
                        </h1>
                        <p className="text-muted-foreground">Optimize your workflow</p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                        <MomentumWidget />
                        <FocusModeDialog />
                    </div>
                </div>
            
                {/* Add Task Button */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="rounded-lg px-6 shadow-lg shadow-primary/20">
                            <Plus className="w-5 h-5 mr-2" />
                            New Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-2xl">
                        <DialogHeader className="sr-only">
                            <DialogTitle>Add New Task</DialogTitle>
                        </DialogHeader>
                        <TaskForm onSuccess={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats Row */}
            <StatsRow />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area (2 cols) */}
                <div className="lg:col-span-2">
                    {incompleteTasks.length === 0 && tasks.length > 0 ? (
                        // Empty State (All Caught Up)
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 p-12 flex flex-col items-center justify-center text-center h-[400px]">
                            <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-10 h-10 text-zinc-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">All caught up!</h2>
                            <p className="text-zinc-500 max-w-sm">No pending tasks. Create a new one to get started or take a well-deserved break.</p>
                        </div>
                    ) : (
                         <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800 min-h-[400px]">
                            <TaskList />
                        </div>
                    )}
                </div>

                {/* Sidebar (1 col) */}
                <div className="lg:col-span-1 space-y-8">
                    <EnergySchedule />
                    <MomentumCard />
                    <WeeklyInsights />
                    <GoalAlignment />
                    <SidebarMetrics />
                </div>
            </div>
        </div>
    </div>
  )
}
