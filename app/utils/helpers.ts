export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTime = (date: Date): string => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (date: Date): string => {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getWeekDates = (): Date[] => {
  const today = new Date();
  const first = today.getDate() - today.getDay();
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today.setDate(first + i));
    dates.push(new Date(date));
  }
  return dates;
};

export const getMonthDates = (): Date[] => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(year, month, i));
  }
  return dates;
};

export const calculateProductivityScore = (
  tasksCompleted: number,
  tasksTotal: number,
  focusScore: number,
  habitCompletion: number
): number => {
  const taskScore = tasksTotal > 0 ? (tasksCompleted / tasksTotal) * 100 : 0;
  return Math.round((taskScore * 0.4 + focusScore * 0.3 + habitCompletion * 0.3) / 1);
};

export const getPriorityColor = (priority: 'high' | 'medium' | 'low'): string => {
  switch (priority) {
    case 'high':
      return '#ef4444';
    case 'medium':
      return '#f97316';
    case 'low':
      return '#3b82f6';
    default:
      return '#6b7280';
  }
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    work: '#3b82f6',
    personal: '#8b5cf6',
    health: '#ef4444',
    learning: '#10b981',
    fitness: '#f59e0b',
    other: '#6b7280',
  };
  return colors[category] || '#6b7280';
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'todo':
      return '#ef4444';
    case 'doing':
      return '#f97316';
    case 'done':
      return '#10b981';
    default:
      return '#6b7280';
  }
};
