import { Task, TaskStatus } from './types';
import { differenceInDays } from 'date-fns';

export interface CognitiveMetrics {
    loadLevel: 'Underloaded' | 'Optimal' | 'High' | 'Overload';
    activeTaskCount: number;
    avgSessionMinutes: number; // Placeholder for now, or derived
}

export interface BurnoutMetrics {
    riskLevel: 'Low' | 'Medium' | 'High';
    riskScore: number; // 0-100
    delayRate: number; // Percentage
    completionRate: number; // Percentage
}

/**
 * Calculates Cognitive Load based on:
 * 1. Number of valid "In Progress" tasks (Multitasking penalty)
 * 2. Complexity of those tasks (High effort = higher load)
 */
export function calculateCognitiveLoad(tasks: Task[]): CognitiveMetrics {
    const activeTasks = tasks.filter(t => t.status === 'in-progress');
    const activeCount = activeTasks.length;

    // Weight tasks by effort
    // Low(30m) = 1 unit, High(120m) = 3 units
    let weightedLoad = 0;
    activeTasks.forEach(t => {
        if (t.estimatedEffort <= 30) weightedLoad += 1;
        else if (t.estimatedEffort <= 60) weightedLoad += 2;
        else weightedLoad += 4; // Long tasks take more RAM
    });

    let level: CognitiveMetrics['loadLevel'] = 'Optimal';
    
    if (activeCount === 0) level = 'Underloaded';
    else if (weightedLoad > 10 || activeCount > 5) level = 'Overload'; // e.g. 5 medium tasks or 3 hard ones
    else if (weightedLoad > 6 || activeCount > 3) level = 'High';

    return {
        loadLevel: level,
        activeTaskCount: activeCount,
        avgSessionMinutes: 45 // Hardcoded for V1, would need a session timer to be real
    };
}

/**
 * Calculates Burnout Risk based on:
 * 1. Accumulation of Overdue tasks (Stress)
 * 2. Ratio of Created vs Completed (Backlog growth)
 * 3. Recent completion velocity (Stalling)
 */
export function calculateBurnoutRisk(tasks: Task[]): BurnoutMetrics {
    if (tasks.length === 0) return { riskLevel: 'Low', riskScore: 0, delayRate: 0, completionRate: 0 };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed');
    const overdueTasks = tasks.filter(t => t.status !== 'completed' && t.deadline && new Date(t.deadline) < new Date());

    // 1. Completion Rate
    const completionRate = Math.round((completedTasks.length / totalTasks) * 100);

    // 2. Delay Rate
    // (Tasks that were overdue or completed AFTER deadline)
    // For V1, just using current overdue count ratio
    const delayRate = Math.round((overdueTasks.length / (totalTasks - completedTasks.length || 1)) * 100);

    // 3. Risk Calculation
    let score = 0;
    
    // Penalty for low completion rate (feeling stuck)
    if (completionRate < 30) score += 30;
    else if (completionRate < 50) score += 15;

    // Penalty for high active backlog
    if (overdueTasks.length > 5) score += 40;
    else if (overdueTasks.length > 2) score += 20;

    // Penalty for high volume of "High Energy" tasks pending
    const highEnergyPending = tasks.filter(t => t.status !== 'completed' && t.energyRequirement === 'high').length;
    if (highEnergyPending > 3) score += 20;

    let level: BurnoutMetrics['riskLevel'] = 'Low';
    if (score > 70) level = 'High';
    else if (score > 40) level = 'Medium';

    return {
        riskLevel: level,
        riskScore: Math.min(100, score),
        delayRate,
        completionRate
    };
}
