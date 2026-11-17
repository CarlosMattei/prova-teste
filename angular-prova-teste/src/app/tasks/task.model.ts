export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export const TASK_STATUS: Record<TaskStatus, { label: string; badge: string }> = {
  PENDING: { label: 'Pending', badge: 'secondary' },
  IN_PROGRESS: { label: 'In progress', badge: 'primary' },
  COMPLETED: { label: 'Completed', badge: 'success' },
};

export const TASK_PRIORITY: Record<TaskPriority, { label: string; badge: string }> = {
  HIGH: { label: 'High', badge: 'danger' },
  MEDIUM: { label: 'Medium', badge: 'warning' },
  LOW: { label: 'Low', badge: 'info' },
};
