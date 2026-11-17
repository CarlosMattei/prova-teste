import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { Task } from './tasks/task.model';

const TASKS: Task[] = [
  {
    id: '1',
    title: 'Develop login screen',
    description: 'Create the system authentication interface.',
    assignee: 'Carlos Henrique',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
  },
  {
    id: '2',
    title: 'Create project documentation',
    description: 'Document the installation and execution.',
    assignee: 'Pedro Santos',
    status: 'COMPLETED',
    priority: 'MEDIUM',
  },
];

describe('App', () => {
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  async function render(): Promise<ComponentFixture<App>> {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    http.expectOne('/api/tasks').flush(TASKS);
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  it('should render one card per task', async () => {
    const fixture = await render();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('app-task-card').length).toBe(TASKS.length);
  });

  it('should show the first task details by default', async () => {
    const fixture = await render();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('app-task-detail')?.textContent).toContain('Develop login screen');
    expect(element.querySelector('app-task-detail')?.textContent).toContain('Carlos Henrique');
  });

  it('should show the clicked task details', async () => {
    const fixture = await render();
    const element = fixture.nativeElement as HTMLElement;

    element.querySelectorAll<HTMLButtonElement>('app-task-card button')[1].click();
    fixture.detectChanges();

    expect(element.querySelector('app-task-detail')?.textContent).toContain(
      'Create project documentation',
    );
  });
});
