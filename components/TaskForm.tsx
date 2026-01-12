"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EnergyLevel, Category } from "@/lib/types"
import { predictEffort } from "@/lib/optimizer"
import { Calendar, Clock, Tag, Zap, Flag, Link, AlignLeft } from "lucide-react"

export function TaskForm({ onSuccess }: { onSuccess?: () => void }) {
  const { addTask, tasks, goals } = useStore()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [effort, setEffort] = useState(30)
  const [energy, setEnergy] = useState<EnergyLevel>("medium")
  const [category, setCategory] = useState<Category>("work")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [goalId, setGoalId] = useState<string>("")

  const handleCategoryChange = (newCategory: Category) => {
      setCategory(newCategory)
      const predicted = predictEffort(newCategory, tasks)
      setEffort(predicted)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    addTask({
      title,
      description,
      deadline: deadline ? new Date(deadline) : undefined,
      estimatedEffort: effort,
      energyRequirement: energy,
      category,
      priority,
      goalId: goalId || undefined,
      dependencies: []
    })

    setTitle("")
    setDescription("")
    setDeadline("")
    setEffort(30)
    setEnergy("medium")
    setGoalId("")
    if (onSuccess) onSuccess()
  }

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-3xl p-6 md:p-8 shadow-2xl border border-zinc-100 dark:border-zinc-800 max-h-[85vh] overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Create Task</h2>
            <p className="text-zinc-500 text-sm mt-1">What needs to be done?</p>
          </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div className="space-y-3">
            <Label htmlFor="title" className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Task Title</Label>
            <Input 
                id="title" 
                placeholder="e.g. Redesign Landing Page" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-14 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary rounded-2xl text-lg px-5 shadow-sm transition-all placeholder:text-zinc-400"
                autoFocus
            />
        </div>

        {/* Description */}
        <div className="space-y-3">
            <Label htmlFor="description" className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Details</Label>
            <textarea
                id="description"
                placeholder="Add notes, context, or subtasks..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-5 py-4 text-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary resize-none shadow-sm transition-all"
            />
        </div>
        
        {/* Helper Wrapper for Grid Inputs */}
        <div className="space-y-6">
            
            {/* Row 1: Time Constraints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                     <Label htmlFor="deadline" className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">
                        <Calendar className="w-3.5 h-3.5" /> Deadline
                    </Label>
                    <div className="relative group">
                        <Input 
                            id="deadline" 
                            type="datetime-local" 
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 pl-4 py-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                        />
                    </div>
                </div>
                <div className="space-y-3">
                    <Label htmlFor="effort" className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">
                        <Clock className="w-3.5 h-3.5" /> Estimate (min)
                    </Label>
                    <div className="relative">
                        <Input 
                            id="effort" 
                            type="number" 
                            min={5}
                            value={effort}
                            onChange={(e) => setEffort(parseInt(e.target.value))}
                            className="h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 pl-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Row 2: Classification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <Label htmlFor="energy" className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">
                        <Zap className="w-3.5 h-3.5" /> Energy Level
                    </Label>
                    <div className="relative">
                        <select 
                            id="energy" 
                            className="h-12 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 text-sm shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
                            value={energy}
                            onChange={(e) => setEnergy(e.target.value as EnergyLevel)}
                        >
                            <option value="low">Low Energy</option>
                            <option value="medium">Medium Energy</option>
                            <option value="high">High Energy</option>
                        </select>
                        <div className="absolute right-4 top-4 pointer-events-none text-zinc-500">
                            <span className="text-xs">▼</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <Label htmlFor="category" className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">
                        <Tag className="w-3.5 h-3.5" /> Category
                    </Label>
                    <div className="relative">
                        <select 
                            id="category" 
                            className="h-12 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 text-sm shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
                            value={category}
                            onChange={(e) => handleCategoryChange(e.target.value as Category)}
                        >
                            <option value="work">Work</option>
                            <option value="study">Study</option>
                            <option value="personal">Personal</option>
                            <option value="health">Health</option>
                            <option value="deep-work">Deep Work</option>
                            <option value="shallow-work">Shallow Work</option>
                        </select>
                         <div className="absolute right-4 top-4 pointer-events-none text-zinc-500">
                             <span className="text-xs">▼</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Row 3: Context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <Label htmlFor="priority" className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">
                        <Flag className="w-3.5 h-3.5" /> Priority
                    </Label>
                    <div className="relative">
                         <select 
                            id="priority" 
                            className="h-12 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 text-sm shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <div className="absolute right-4 top-4 pointer-events-none text-zinc-500">
                             <span className="text-xs">▼</span>
                        </div>
                    </div>
                </div>

                 <div className="space-y-3">
                    <Label htmlFor="goal" className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">
                        <Link className="w-3.5 h-3.5" /> Link Goal
                    </Label>
                    <div className="relative">
                         <select 
                            id="goal" 
                            className="h-12 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 text-sm shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer text-zinc-700 dark:text-zinc-300"
                            value={goalId}
                            onChange={(e) => setGoalId(e.target.value)}
                        >
                            <option value="">None</option>
                            {goals.map(g => (
                                <option key={g.id} value={g.id}>{g.title}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-4 pointer-events-none text-zinc-500">
                             <span className="text-xs">▼</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="pt-8 flex flex-wrap justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800/50 mt-8">
             <Button type="button" variant="ghost" onClick={onSuccess} className="h-12 px-6 rounded-2xl text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors">
                Cancel
            </Button>
            <Button type="submit" className="h-12 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Create Task
            </Button>
        </div>
    </form>
    </div>
  )
}
