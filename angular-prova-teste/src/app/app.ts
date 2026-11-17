import { Component, computed, inject, signal } from '@angular/core';
import { TaskCard } from './tasks/task-card/task-card';
import { TaskDetail } from './tasks/task-detail/task-detail';
import { Task } from './tasks/task.model';
import { TasksService } from './tasks/tasks.service';

@Component({
  imports: [TaskCard, TaskDetail],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly tasksService = inject(TasksService);

  protected readonly tasks = this.tasksService.tasks;
  private readonly selectedTaskId = signal<string | null>(null);

  /** The clicked task, or the first task when nothing has been clicked yet. */
  protected readonly selectedTask = computed<Task | null>(() => {
    const tasks = this.tasks.value();
    return tasks.find((task) => task.id === this.selectedTaskId()) ?? tasks[0] ?? null;
  });

  protected selectTask(task: Task): void {
    this.selectedTaskId.set(task.id);
  }

  protected reload(): void {
    this.tasks.reload();
  }
}
