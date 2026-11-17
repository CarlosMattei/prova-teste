import { Component, computed, inject, signal } from '@angular/core';
import { TaskCard } from './tasks/task-card/task-card';
import { TaskConfirmModal } from './tasks/task-confirm-modal/task-confirm-modal';
import { TaskCreateModal } from './tasks/task-create-modal/task-create-modal';
import { TaskDetail } from './tasks/task-detail/task-detail';
import { Task, TaskStatus } from './tasks/task.model';
import { TasksService } from './tasks/tasks.service';

type TaskFilter = 'ALL' | TaskStatus;

@Component({
  imports: [TaskCard, TaskDetail, TaskCreateModal, TaskConfirmModal],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  host: { '(document:click)': 'filterOpen.set(false)' },
})
export class App {
  private readonly tasksService = inject(TasksService);

  protected readonly tasks = this.tasksService.tasks;
  private readonly selectedTaskId = signal<number | null>(null);
  protected readonly createModalOpen = signal(false);
  protected readonly editingTask = signal<Task | null>(null);
  protected readonly deletingTask = signal<Task | null>(null);

  protected readonly filterOpen = signal(false);
  protected readonly filter = signal<TaskFilter>('ALL');
  protected readonly filterOptions: { value: TaskFilter; label: string }[] = [
    { value: 'ALL', label: 'Todos' },
    { value: 'PENDENTE', label: 'Pendentes' },
    { value: 'EM ANDAMENTO', label: 'Em Andamento' },
    { value: 'CONCLUIDA', label: 'Concluído' },
  ];
  protected readonly filterLabel = computed(
    () => this.filterOptions.find((option) => option.value === this.filter())!.label,
  );

  /** Tasks matching the selected status filter. */
  protected readonly visibleTasks = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks.value();
    return filter === 'ALL' ? tasks : tasks.filter((task) => task.status === filter);
  });

  /** The clicked task, or the first task when nothing has been clicked yet. */
  protected readonly selectedTask = computed<Task | null>(() => {
    const tasks = this.tasks.value();
    return tasks.find((task) => task.id === this.selectedTaskId()) ?? tasks[0] ?? null;
  });

  /** Suggestions for the responsible field, derived from the tasks already loaded. */
  protected readonly responsibles = computed(() => [
    ...new Set(this.tasks.value().map((task) => task.responsible)),
  ]);

  protected selectTask(task: Task): void {
    this.selectedTaskId.set(task.id);
  }

  protected setFilter(filter: TaskFilter): void {
    this.filter.set(filter);
  }

  protected openCreateModal(): void {
    this.createModalOpen.set(true);
  }

  protected openEditModal(task: Task): void {
    this.editingTask.set(task);
  }

  protected closeModal(): void {
    this.createModalOpen.set(false);
    this.editingTask.set(null);
  }

  protected onTaskSaved(task: Task): void {
    this.closeModal();
    this.selectedTaskId.set(task.id);
  }

  protected onTaskDeleted(): void {
    this.deletingTask.set(null);
  }

  protected reload(): void {
    this.tasks.reload();
  }
}
