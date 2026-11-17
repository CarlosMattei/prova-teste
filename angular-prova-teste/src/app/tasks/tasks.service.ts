import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  /** Tasks served by json-server through the dev proxy at `/api`. */
  readonly tasks = httpResource<Task[]>(() => '/api/tasks', {
    defaultValue: [],
  });
}
