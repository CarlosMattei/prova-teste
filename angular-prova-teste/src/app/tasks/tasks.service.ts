import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CreateTaskInput, Task } from './task.model';

/**
 * The Spring Boot API currently exposes only:
 *   GET  /tasks       (list)
 *   GET  /tasks/{id}  (by id)
 *   POST /tasks       (create)
 *
 * `updateTask` and `deleteTask` are already implemented against the REST contract
 * (`PUT /tasks/{id}` and `DELETE /tasks/{id}`) so they start working as soon as the
 * backend adds those routes — just flip these flags to `true`.
 */
export const TASK_EDIT_AVAILABLE = false;
export const TASK_DELETE_AVAILABLE = false;

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly http = inject(HttpClient);

  /** Tasks served by the Java API through the dev proxy at `/api` (rewritten to `/tasks`). */
  readonly tasks = httpResource<Task[]>(() => '/api/tasks', {
    defaultValue: [],
  });

  /** Creates a task and refreshes the list so it shows up without a manual reload. */
  async createTask(input: CreateTaskInput): Promise<Task> {
    const created = await firstValueFrom(this.http.post<Task>('/api/tasks', input));
    this.tasks.reload();
    return created;
  }

  /** Replaces a task in place and refreshes the list. Ready for `PUT /tasks/{id}`. */
  async updateTask(task: Task): Promise<Task> {
    const updated = await firstValueFrom(this.http.put<Task>(`/api/tasks/${task.id}`, task));
    this.tasks.reload();
    return updated;
  }

  /** Deletes a task and refreshes the list. Ready for `DELETE /tasks/{id}`. */
  async deleteTask(id: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`/api/tasks/${id}`));
    this.tasks.reload();
  }
}
