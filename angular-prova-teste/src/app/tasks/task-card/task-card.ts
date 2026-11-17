import { Component, input, output } from '@angular/core';
import { Task, TASK_PRIORITY, TASK_STATUS } from '../task.model';
import { TASK_DELETE_AVAILABLE, TASK_EDIT_AVAILABLE } from '../tasks.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  readonly task = input.required<Task>();
  readonly selected = input(false);
  readonly select = output<Task>();
  readonly edit = output<Task>();
  readonly remove = output<Task>();

  protected readonly taskStatus = TASK_STATUS;
  protected readonly taskPriority = TASK_PRIORITY;

  /** Edit/delete stay disabled until the Java API exposes PUT/DELETE. */
  protected readonly editAvailable = TASK_EDIT_AVAILABLE;
  protected readonly deleteAvailable = TASK_DELETE_AVAILABLE;
}
