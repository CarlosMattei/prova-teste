import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs';
import {
  CreateTaskInput,
  Task,
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_OPTIONS,
  TaskPriority,
  TaskStatus,
} from '../task.model';
import { TasksService } from '../tasks.service';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

@Component({
  selector: 'app-task-create-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-create-modal.html',
  styleUrl: './task-create-modal.css',
  host: {
    '(document:keydown.escape)': 'close()',
  },
})
export class TaskCreateModal implements OnInit, OnDestroy {
  private readonly tasksService = inject(TasksService);
  private readonly fb = inject(NonNullableFormBuilder);

  /** The task being edited; when omitted the modal creates a new one. */
  readonly task = input<Task | null>(null);

  /** People already responsible for tasks, offered as suggestions while typing. */
  readonly responsibles = input<string[]>([]);

  readonly saved = output<Task>();
  readonly closed = output<void>();

  private readonly dialog = viewChild<ElementRef<HTMLElement>>('dialog');
  private readonly titleInput = viewChild<ElementRef<HTMLInputElement>>('titleInput');
  private readonly previouslyFocused = document.activeElement as HTMLElement | null;

  protected readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(120)]],
    description: ['', Validators.maxLength(500)],
    responsible: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(80)]],
    status: ['' as TaskStatus | '', Validators.required],
    priority: ['' as TaskPriority | '', Validators.required],
  });

  /** Drives the Add task button: disabled until every required field is filled. */
  protected readonly canSubmit = toSignal(
    this.form.statusChanges.pipe(
      startWith(this.form.status),
      map(() => this.form.valid),
    ),
    { initialValue: this.form.valid },
  );

  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly statusOptions = TASK_STATUS_OPTIONS;
  protected readonly priorityOptions = TASK_PRIORITY_OPTIONS;

  constructor() {
    afterNextRender(() => {
      document.body.classList.add('modal-open');
      this.titleInput()?.nativeElement.focus();
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('modal-open');
    this.previouslyFocused?.focus();
  }

  ngOnInit(): void {
    const task = this.task();
    if (task) {
      this.form.setValue({
        title: task.title,
        description: task.description,
        responsible: task.responsible,
        status: task.status,
        priority: task.priority,
      });
    }
  }

  protected close(): void {
    if (this.saving()) {
      return;
    }
    this.closed.emit();
  }

  protected async submit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.saving()) {
      return;
    }

    const value = this.form.getRawValue();
    const input: CreateTaskInput = {
      title: value.title.trim(),
      description: value.description.trim(),
      responsible: value.responsible.trim(),
      status: value.status as TaskStatus,
      priority: value.priority as TaskPriority,
    };

    const task = this.task();
    this.saving.set(true);
    this.error.set(null);

    try {
      this.saved.emit(
        task
          ? await this.tasksService.updateTask({ ...input, id: task.id })
          : await this.tasksService.createTask(input),
      );
    } catch {
      this.error.set(
        task
          ? 'Could not save the task. Check the API and try again.'
          : 'Could not create the task. Check the API and try again.',
      );
    } finally {
      this.saving.set(false);
    }
  }

  /** Keeps Tab and Shift+Tab cycling inside the dialog. */
  protected trapFocus(event: KeyboardEvent): void {
    if (event.key !== 'Tab') {
      return;
    }

    const dialog = this.dialog()?.nativeElement;
    if (!dialog) {
      return;
    }

    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === dialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || active === dialog)) {
      event.preventDefault();
      first.focus();
    }
  }
}
