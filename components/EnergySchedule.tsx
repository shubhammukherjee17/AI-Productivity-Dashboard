"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Coffee, Sun, Moon } from "lucide-react"

export function EnergySchedule() {
    const { userPreferences } = useStore()
    
    // Config for the display range (8:00 to 18:00 as per screenshot)
    const displayHours = Array.from({ length: 11 }, (_, i) => i + 8)

    const getIcon = (hour: number) => {
        if (hour < 10) return <Coffee className="w-4 h-4 text-zinc-400" />
        if (hour < 14) return <Sun className="w-4 h-4 text-zinc-400" />
        return <Moon className="w-4 h-4 text-zinc-400" />
    }

    const getEnergyConfig = (level: string) => {
        switch(level) {
            case 'high': return { 
                bar: 'bg-green-200 dark:bg-green-900/40', 
                dot: 'bg-green-500', 
                width: 'w-full' 
            }
            case 'medium': return { 
                bar: 'bg-yellow-100 dark:bg-yellow-900/40', 
                dot: 'bg-yellow-500', 
                width: 'w-[85%]' 
            }
            case 'low': return { 
                bar: 'bg-zinc-200 dark:bg-zinc-800', 
                dot: 'bg-zinc-400', 
                width: 'w-[60%]' 
            }
            default: return { 
                bar: 'bg-zinc-100', 
                dot: 'bg-zinc-300', 
                width: 'w-[50%]' 
            }
        }
    }

    return (
        <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm">
             <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                    <Zap className="w-5 h-5 text-green-500" /> Energy-Aware Schedule
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {displayHours.map(hour => {
                        const level = userPreferences.energyProfile[hour] || 'low'
                        const config = getEnergyConfig(level)
                        
                        return (
                            <div key={hour} className="flex items-center gap-3 group">
                                {/* Time & Icon */}
                                <div className="flex items-center gap-2 w-14 shrink-0">
                                    {/* Icon removed for space on tiny screens, or kept small */}
                                    <span className="text-xs text-zinc-500 font-mono">{hour}:00</span>
                                </div>
                                
                                {/* Bar */}
                                <div className="flex-1">
                                    <div className={`h-8 rounded-lg ${config.bar} ${config.width} transition-all duration-500 relative overflow-hidden group-hover:opacity-90`} />
                                </div>

                                {/* Status Dot */}
                                <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
