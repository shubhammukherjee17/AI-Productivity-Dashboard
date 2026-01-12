"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Timer, Play, Coffee, MousePointerClick } from "lucide-react"

export function FocusModeDialog() {
    const { tasks } = useStore()
    const [duration, setDuration] = useState(25)
    const [selectedTaskId, setSelectedTaskId] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)

    // Filter for incomplete tasks to link
    const activeTasks = tasks.filter(t => t.status !== 'completed')

    const startSession = () => {
        setIsActive(true)
        // In a real app, this would start a global timer
        // For V1 UI match, we just close modal or show active state
        setTimeout(() => {
            setIsActive(false)
            setIsOpen(false)
        }, 1000)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl">
                    <Timer className="w-4 h-4" /> Focus Mode
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl p-6">
                <DialogHeader className="mb-4">
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
                        <Timer className="w-6 h-6 text-blue-600" /> Focus Mode
                    </DialogTitle>
                    <p className="text-zinc-500 text-sm">
                        Start a focused work session to boost productivity and track your flow state.
                    </p>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Duration Selector */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Session Duration</label>
                        <div className="grid grid-cols-4 gap-3">
                            {[15, 25, 45, 60].map((min) => (
                                <button
                                    key={min}
                                    onClick={() => setDuration(min)}
                                    className={`py-3 rounded-xl text-sm font-bold transition-all ${
                                        duration === min 
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]" 
                                        : "bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-100 dark:border-zinc-700"
                                    }`}
                                >
                                    {min}m
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Task Link (Optional) */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Link to Task (Optional)</label>
                        <div className="relative">
                            <select
                                className="w-full h-11 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                value={selectedTaskId}
                                onChange={(e) => setSelectedTaskId(e.target.value)}
                            >
                                <option value="">Select a task...</option>
                                {activeTasks.map(task => (
                                    <option key={task.id} value={task.id}>{task.title}</option>
                                ))}
                            </select>
                             <div className="absolute right-3 top-3 pointer-events-none text-zinc-400">
                                <MousePointerClick className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Start Action */}
                    <Button 
                        onClick={startSession}
                        className="w-full h-12 text-lg font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                    >
                        {isActive ? "Starting..." : (
                            <>
                                <Play className="w-5 h-5 fill-current" /> Start Focus Session
                            </>
                        )}
                    </Button>

                    {/* Footer Info */}
                    <div className="flex items-center justify-center gap-2 text-zinc-400 text-sm">
                        <Coffee className="w-4 h-4" />
                        <span>5 min break after</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
