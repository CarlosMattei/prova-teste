import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { CreateTaskInput, Task } from '../task.model';
import { TasksService } from '../tasks.service';
import { TaskCreateModal } from './task-create-modal';

const CREATED: Task = {
  id: '99',
  title: 'Write integration tests',
  description: 'Cover the create task flow.',
  assignee: 'Ana Souza',
  status: 'PENDING',
  priority: 'HIGH',
};

describe('TaskCreateModal', () => {
  let fixture: ComponentFixture<TaskCreateModal>;
  let createTask: ReturnType<typeof vi.fn<(input: CreateTaskInput) => Promise<Task>>>;

  beforeEach(async () => {
    createTask = vi.fn<(input: CreateTaskInput) => Promise<Task>>().mockResolvedValue(CREATED);

    await TestBed.configureTestingModule({
      imports: [TaskCreateModal],
      providers: [{ provide: TasksService, useValue: { createTask } }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreateModal);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function root(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function submitButton(): HTMLButtonElement {
    return root().querySelector<HTMLButtonElement>('button[type="submit"]')!;
  }

  function fill(selector: string, value: string): void {
    const field = root().querySelector<HTMLInputElement | HTMLSelectElement>(selector)!;
    field.value = value;
    field.dispatchEvent(new Event(field instanceof HTMLSelectElement ? 'change' : 'input'));
    fixture.detectChanges();
  }

  it('should keep Add task disabled until every required field is filled', () => {
    expect(submitButton().disabled).toBe(true);

    fill('#task-title', 'Write integration tests');
    fill('#task-assignee', 'Ana Souza');
    expect(submitButton().disabled).toBe(true);

    fill('#task-status', 'PENDING');
    expect(submitButton().disabled).toBe(true);

    fill('#task-priority', 'HIGH');
    expect(submitButton().disabled).toBe(false);
  });

  it('should post the task and emit it when the form is valid', async () => {
    const created: Task[] = [];
    fixture.componentInstance.created.subscribe((task) => created.push(task));

    fill('#task-title', '  Write integration tests  ');
    fill('#task-assignee', ' Ana Souza ');
    fill('#task-description', 'Cover the create task flow.');
    fill('#task-status', 'PENDING');
    fill('#task-priority', 'HIGH');

    root().querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    expect(createTask).toHaveBeenCalledWith({
      title: 'Write integration tests',
      description: 'Cover the create task flow.',
      assignee: 'Ana Souza',
      status: 'PENDING',
      priority: 'HIGH',
    });
    expect(created).toEqual([CREATED]);
  });

  it('should emit closed on Escape', () => {
    let closed = 0;
    fixture.componentInstance.closed.subscribe(() => closed++);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(closed).toBe(1);
  });
});
