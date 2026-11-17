import { Component, input } from '@angular/core';
import { Task, TASK_PRIORITY, TASK_STATUS } from '../task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail {
  readonly task = input<Task | null>(null);

  protected readonly taskStatus = TASK_STATUS;
  protected readonly taskPriority = TASK_PRIORITY;
}
