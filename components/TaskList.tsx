"use client"

import { useStore } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Trash2, Clock, Zap, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ExplainabilityModal } from "@/components/ExplainabilityModal"

export function TaskList() {
  const { tasks, toggleTaskStatus, deleteTask } = useStore()

  const sortedTasks = [...tasks].sort((a, b) => {
      if (a.status === b.status) {
          return b.priorityScore - a.priorityScore;
      }
      return a.status === 'completed' ? 1 : -1;
  })

  if (tasks.length === 0) {
      return (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-16 text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50"
          >
              <p>No tasks yet. Start by capturing what's on your mind.</p>
          </motion.div>
      )
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
      {sortedTasks.map((task, index) => (
        <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            layout
        >
            <Card className="p-4 flex items-center justify-between group hover:shadow-lg transition-all duration-300 border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => toggleTaskStatus(task.id)} 
                        className="text-zinc-300 hover:text-green-500 transition-colors focus:outline-none"
                    >
                        {task.status === 'completed' ? 
                            <CheckCircle2 className="w-6 h-6 text-green-500" /> : 
                            <Circle className="w-6 h-6" />
                        }
                    </button>
                    
                    <div className={task.status === 'completed' ? "opacity-40" : ""}>
                        {/* Priority Badge */}
                        <div className={cn(
                            "px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1 w-fit mb-1",
                            task.priorityScore > 70 ? "bg-red-50 text-red-700 border-red-100 dark:bg-red-950 dark:text-red-300 dark:border-red-900" :
                            task.priorityScore > 40 ? "bg-yellow-50 text-yellow-700 border-yellow-100 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-900" :
                            "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900"
                        )}>
                            {Math.round(task.priorityScore)}
                            {/* AI Explainer */}
                            <ExplainabilityModal task={task} />
                        </div>
                        <p className={`font-medium text-[15px] break-words pr-2 ${task.status === 'completed' ? 'line-through decoration-zinc-400' : ''}`}>
                            {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-zinc-500">
                             <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 border-0">
                                {task.category}
                            </Badge>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {task.estimatedEffort}m
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <Badge variant={task.energyRequirement} className="text-[10px] h-5 px-1.5">
                        {task.energyRequirement}
                    </Badge>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteTask(task.id)} 
                        className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </Card>
        </motion.div>
      ))}
      </AnimatePresence>
    </div>
  )
}
