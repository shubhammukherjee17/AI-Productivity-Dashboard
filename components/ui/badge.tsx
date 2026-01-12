import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline" | "low" | "medium" | "high" 
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "border-transparent bg-zinc-900 text-zinc-50 hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/80",
        secondary: "border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        destructive: "border-transparent bg-red-500 text-zinc-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/80",
        outline: "text-foreground",
        low: "border-transparent bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/25",
        medium: "border-transparent bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/25",
        high: "border-transparent bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-500/25",
    }
    
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:focus:ring-zinc-300",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
