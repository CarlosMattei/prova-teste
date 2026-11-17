import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CreateTaskInput, Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly http = inject(HttpClient);

  /** Tasks served by json-server through the dev proxy at `/api`. */
  readonly tasks = httpResource<Task[]>(() => '/api/tasks', {
    defaultValue: [],
  });

  /** Creates a task and refreshes the list so it shows up without a manual reload. */
  async createTask(input: CreateTaskInput): Promise<Task> {
    const created = await firstValueFrom(this.http.post<Task>('/api/tasks', input));
    this.tasks.reload();
    return created;
  }

  /** Replaces a task in place and refreshes the list. */
  async updateTask(task: Task): Promise<Task> {
    const updated = await firstValueFrom(this.http.put<Task>(`/api/tasks/${task.id}`, task));
    this.tasks.reload();
    return updated;
  }

  /** Deletes a task and refreshes the list. */
  async deleteTask(id: string): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`/api/tasks/${id}`));
    this.tasks.reload();
  }
}
