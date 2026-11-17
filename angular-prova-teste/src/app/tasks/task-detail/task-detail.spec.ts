import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task } from '../task.model';
import { TaskDetail } from './task-detail';

const TASK: Task = {
  id: 1,
  title: 'Develop login screen',
  description: 'Create the system authentication interface.',
  responsible: 'Carlos Henrique',
  status: 'PENDENTE',
  priority: 'ALTA',
};

describe('TaskDetail', () => {
  let fixture: ComponentFixture<TaskDetail>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetail],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    http = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(TaskDetail);
    fixture.componentRef.setInput('task', TASK);
    fixture.detectChanges();
  });

  afterEach(() => http.verify());

  it('should show the task data', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent;

    expect(text).toContain('Develop login screen');
    expect(text).toContain('Carlos Henrique');
  });

  it('should patch the status when another one is selected', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const select = element.querySelector<HTMLSelectElement>('#task-status-select')!;
    expect(select.value).toBe('PENDENTE');

    select.value = 'CONCLUIDA';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const patch = http.expectOne({ method: 'PATCH', url: '/api/tasks/1/status' });
    expect(patch.request.body).toEqual({ status: 'CONCLUIDA' });
    patch.flush({ ...TASK, status: 'CONCLUIDA' });

    await fixture.whenStable();
    http.expectOne('/api/tasks').flush([{ ...TASK, status: 'CONCLUIDA' }]);
    await fixture.whenStable();

    expect(element.querySelector('#task-status-select')).not.toBeNull();
  });
});
