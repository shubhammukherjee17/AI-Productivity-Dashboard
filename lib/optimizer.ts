import { Task, UserPreferences, EnergyLevel } from './types';
import { differenceInHours, differenceInMinutes, isBefore, addMinutes } from 'date-fns';

/**
 * Calculates a priority score (0-100) for a task based on:
 * 1. Deadline proximity (Urgency)
 * 2. Importance (Energy/Effort proxy for now)
 * 3. User Energy alignment
 */
export function calculatePriority(task: Task, preferences: UserPreferences): number {
    let score = 50; // Base score

    // 1. Deadline Proximity (Exponential decay as deadline approaches)
    if (task.deadline) {
        const hoursUntilDeadline = differenceInHours(new Date(task.deadline), new Date());
        if (hoursUntilDeadline < 0) {
            score += 40; // Overdue! High priority
        } else if (hoursUntilDeadline < 24) {
            score += 30;
        } else if (hoursUntilDeadline < 72) {
            score += 15;
        }
    }

    // 2. Effort/Energy Weighting
    // Heuristic: High energy tasks are often "important" or "hard", giving them a slight bump
    // providing they aren't de-prioritized by the schedule yet.
    if (task.energyRequirement === 'high') score += 10;
    if (task.completedAt) score = 0;

    // Cap at 100
    return Math.min(100, Math.max(0, score));
}

/**
 * Suggests the best tasks to work on RIGHT NOW based on:
 * 1. Current User Energy (simulated or time-based)
 * 2. Task Priority
 */
export function getRecommendedTasks(tasks: Task[], preferences: UserPreferences): Task[] {
    const currentHour = new Date().getHours();
    const currentEnergy = preferences.energyProfile[currentHour] || 'medium';

    const activeTasks = tasks.filter(t => t.status !== 'completed');

    // Filter tasks that match current energy (or lower)
    // e.g. If High Energy -> Can do High, Medium, Low
    // e.g. If Low Energy -> Can only do Low
    
    // Weighting function
    const weightedTasks = activeTasks.map(task => {
        let matchScore = 0;
        
        // Energy Match Bonus
        if (currentEnergy === 'high') {
            if (task.energyRequirement === 'high') matchScore += 20; // Prime time for hard work
            else matchScore -= 10; // Don't waste high energy on low tasks
        } else if (currentEnergy === 'medium') {
            if (task.energyRequirement === 'medium') matchScore += 15;
            if (task.energyRequirement === 'high') matchScore -= 20; // Avoid burnout
        } else { // Low
            if (task.energyRequirement === 'low') matchScore += 20;
            else matchScore -= 30; // Definitely avoid hard work
        }

        return {
            ...task,
            effectiveScore: task.priorityScore + matchScore
        };
    });

    // Sort by effective score
    return weightedTasks
        .sort((a, b) => b.effectiveScore - a.effectiveScore)
        .slice(0, 3); // Return top 3 recommendations
}

/**
 * Predicts effort for a new task based on category history
 */
export function predictEffort(category: string, tasks: Task[]): number {
    const relevantTasks = tasks.filter(t => t.category === category && t.status === 'completed' && t.completedAt);
    
    if (relevantTasks.length === 0) return 30; // Default fallback

    // Simple average for now (can use Bayesian later)
    const totalEffort = relevantTasks.reduce((acc, t) => acc + t.estimatedEffort, 0);
    return Math.round(totalEffort / relevantTasks.length);
}

/**
 * Updates all tasks priorities in the store
 * (Self-healing mechanism)
 */
export function rebalancePriorities(tasks: Task[], preferences: UserPreferences): Task[] {
    return tasks.map(t => ({
        ...t,
        priorityScore: calculatePriority(t, preferences)
    }));
}
