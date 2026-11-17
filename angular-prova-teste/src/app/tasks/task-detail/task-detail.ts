import { Component, inject, input, signal } from '@angular/core';
import {
  Task,
  TASK_PRIORITY,
  TASK_STATUS,
  TASK_STATUS_OPTIONS,
  TaskStatus,
} from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail {
  private readonly tasksService = inject(TasksService);

  readonly task = input<Task | null>(null);

  protected readonly taskStatus = TASK_STATUS;
  protected readonly taskPriority = TASK_PRIORITY;
  protected readonly statusOptions = TASK_STATUS_OPTIONS;

  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  /** Sends the new status to `PATCH /tasks/{id}/status`; list refresh updates the badges. */
  protected async changeStatus(event: Event): Promise<void> {
    const select = event.target as HTMLSelectElement;
    const task = this.task();
    const status = select.value as TaskStatus;

    if (!task || !status || status === task.status || this.saving()) {
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    try {
      await this.tasksService.updateStatus(task.id, status);
    } catch {
      // Roll the select back so it keeps showing the status the API still has.
      select.value = task.status;
      this.error.set('Não foi possível alterar o status. Verifique a API e tente novamente.');
    } finally {
      this.saving.set(false);
    }
  }
}
