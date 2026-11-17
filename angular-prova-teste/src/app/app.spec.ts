import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { Task } from './tasks/task.model';

const TASKS: Task[] = [
  {
    id: 1,
    title: 'Develop login screen',
    description: 'Create the system authentication interface.',
    responsible: 'Carlos Henrique',
    status: 'EM ANDAMENTO',
    priority: 'ALTA',
  },
  {
    id: 2,
    title: 'Create project documentation',
    description: 'Document the installation and execution.',
    responsible: 'Pedro Santos',
    status: 'CONCLUIDA',
    priority: 'MEDIA',
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

    element.querySelectorAll<HTMLButtonElement>('app-task-card .card-body')[1].click();
    fixture.detectChanges();

    expect(element.querySelector('app-task-detail')?.textContent).toContain(
      'Create project documentation',
    );
  });

  it('should open the add task modal from the header button', async () => {
    const fixture = await render();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('[role="dialog"]')).toBeNull();

    element.querySelector<HTMLButtonElement>('.app-header .btn-primary')!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(element.querySelector('[role="dialog"]')?.textContent).toContain('Add task');
    expect(element.querySelector<HTMLButtonElement>('button[type="submit"]')?.disabled).toBe(true);
  });

  it('should delete the task after confirming', async () => {
    const fixture = await render();
    const element = fixture.nativeElement as HTMLElement;

    element.querySelector<HTMLButtonElement>('app-task-card .icon-btn.delete')!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const dialog = element.querySelector('[role="alertdialog"]');
    expect(dialog).not.toBeNull();

    element.querySelector<HTMLButtonElement>('[role="alertdialog"] .btn-danger')!.click();
    fixture.detectChanges();

    http
      .expectOne({ method: 'DELETE', url: '/api/tasks/1' })
      .flush(null, { status: 204, statusText: 'No Content' });

    await fixture.whenStable();
    http.expectOne('/api/tasks').flush(TASKS.slice(1));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(element.querySelector('[role="alertdialog"]')).toBeNull();
    expect(element.querySelectorAll('app-task-card').length).toBe(TASKS.length - 1);
  });
});
