import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

@Component({
  selector: 'app-task-confirm-modal',
  templateUrl: './task-confirm-modal.html',
  styleUrl: './task-confirm-modal.css',
  host: {
    '(document:keydown.escape)': 'close()',
  },
})
export class TaskConfirmModal implements OnDestroy {
  private readonly tasksService = inject(TasksService);

  readonly task = input.required<Task>();
  readonly deleted = output<void>();
  readonly closed = output<void>();

  private readonly dialog = viewChild<ElementRef<HTMLElement>>('dialog');
  private readonly cancelButton = viewChild<ElementRef<HTMLButtonElement>>('cancelButton');
  private readonly previouslyFocused = document.activeElement as HTMLElement | null;

  protected readonly deleting = signal(false);
  protected readonly error = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      document.body.classList.add('modal-open');
      this.cancelButton()?.nativeElement.focus();
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('modal-open');
    this.previouslyFocused?.focus();
  }

  protected close(): void {
    if (this.deleting()) {
      return;
    }
    this.closed.emit();
  }

  protected async confirm(): Promise<void> {
    if (this.deleting()) {
      return;
    }

    this.deleting.set(true);
    this.error.set(null);

    try {
      await this.tasksService.deleteTask(this.task().id);
      this.deleted.emit();
    } catch {
      this.error.set('Could not delete the task. Check the API and try again.');
    } finally {
      this.deleting.set(false);
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
