import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CreateTaskInput, Task, TaskStatus } from './task.model';

/**
 * Spring Boot API contract (`TaskController`):
 *   GET    /tasks                 list
 *   GET    /tasks/{id}            by id
 *   POST   /tasks                 create        -> 201 + TaskResponse
 *   PUT    /tasks/{id}            update        -> 204 no content
 *   PATCH  /tasks/{id}/status     change status -> 200 + TaskResponse
 *   DELETE /tasks/{id}            delete        -> 204 no content
 *
 * The dev proxy rewrites `/api` to the root, so `/api/tasks` reaches `/tasks`.
 */
@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly http = inject(HttpClient);

  /** Tasks served by the Java API through the dev proxy at `/api`. */
  readonly tasks = httpResource<Task[]>(() => '/api/tasks', {
    defaultValue: [],
  });

  /** Creates a task and refreshes the list so it shows up without a manual reload. */
  async createTask(input: CreateTaskInput): Promise<Task> {
    const created = await firstValueFrom(this.http.post<Task>('/api/tasks', input));
    this.tasks.reload();
    return created;
  }

  /**
   * Replaces a task and refreshes the list.
   * The API answers 204 (no body), so the submitted values are returned to the caller.
   */
  async updateTask(task: Task): Promise<Task> {
    const { id, ...input } = task;
    await firstValueFrom(this.http.put<void>(`/api/tasks/${id}`, input));
    this.tasks.reload();
    return task;
  }

  /** Changes only the status of a task and refreshes the list. */
  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    const updated = await firstValueFrom(
      this.http.patch<Task>(`/api/tasks/${id}/status`, { status }),
    );
    this.tasks.reload();
    return updated;
  }

  /** Deletes a task and refreshes the list. */
  async deleteTask(id: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`/api/tasks/${id}`));
    this.tasks.reload();
  }
}
