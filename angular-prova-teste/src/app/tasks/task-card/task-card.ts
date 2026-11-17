import { Component, input, output } from '@angular/core';
import { Task, TASK_PRIORITY, TASK_STATUS } from '../task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  readonly task = input.required<Task>();
  readonly selected = input(false);
  readonly select = output<Task>();

  protected readonly taskStatus = TASK_STATUS;
  protected readonly taskPriority = TASK_PRIORITY;
}
