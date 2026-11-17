import { Component, computed, inject, signal } from '@angular/core';
import { TaskCard } from './tasks/task-card/task-card';
import { TaskCreateModal } from './tasks/task-create-modal/task-create-modal';
import { TaskDetail } from './tasks/task-detail/task-detail';
import { Task } from './tasks/task.model';
import { TasksService } from './tasks/tasks.service';

@Component({
  imports: [TaskCard, TaskDetail, TaskCreateModal],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly tasksService = inject(TasksService);

  protected readonly tasks = this.tasksService.tasks;
  private readonly selectedTaskId = signal<string | null>(null);
  protected readonly createModalOpen = signal(false);

  /** The clicked task, or the first task when nothing has been clicked yet. */
  protected readonly selectedTask = computed<Task | null>(() => {
    const tasks = this.tasks.value();
    return tasks.find((task) => task.id === this.selectedTaskId()) ?? tasks[0] ?? null;
  });

  /** Suggestions for the assignee field, derived from the tasks already loaded. */
  protected readonly assignees = computed(() => [
    ...new Set(this.tasks.value().map((task) => task.assignee)),
  ]);

  protected selectTask(task: Task): void {
    this.selectedTaskId.set(task.id);
  }

  protected openCreateModal(): void {
    this.createModalOpen.set(true);
  }

  protected closeCreateModal(): void {
    this.createModalOpen.set(false);
  }

  protected onTaskCreated(task: Task): void {
    this.createModalOpen.set(false);
    this.selectedTaskId.set(task.id);
  }

  protected reload(): void {
    this.tasks.reload();
  }
}
