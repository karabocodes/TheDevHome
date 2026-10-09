import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectCardComponent } from './project-card.component';
import { Project } from '../../core/models/project.model';

describe('ProjectCardComponent - Button Logic Specification', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  const baseProject: Project = {
    slug: 'test-project',
    title: 'Test Project',
    shortDescription: 'Short desc',
    longDescription: 'Long desc',
    techStack: ['Angular', 'TypeScript'],
    images: ['/images/test.svg']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
  });

  it('Scenario 1: demoUrl AND public repoUrl -> shows "Live Demo"', () => {
    component.project = {
      ...baseProject,
      demoUrl: 'https://demo.example.com',
      repoUrl: 'https://github.com/example/repo',
      repoIsPublic: true
    };
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Live Demo');
    expect(element.textContent).not.toContain('Codebase');
    expect(element.textContent).not.toContain('Enterprise Client System');
  });

  it('Scenario 2: demoUrl ONLY -> shows "Live Demo"', () => {
    component.project = {
      ...baseProject,
      demoUrl: 'https://demo.example.com',
      repoUrl: undefined,
      repoIsPublic: false
    };
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Live Demo');
    expect(element.textContent).not.toContain('Codebase');
  });

  it('Scenario 3: public repoUrl ONLY -> shows "Codebase"', () => {
    component.project = {
      ...baseProject,
      demoUrl: undefined,
      repoUrl: 'https://github.com/example/repo',
      repoIsPublic: true
    };
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Codebase');
    expect(element.textContent).not.toContain('Live Demo');
    expect(element.textContent).not.toContain('Enterprise Client System');
  });

  it('Scenario 4: Neither demoUrl nor public repoUrl -> displays "Enterprise Client System"', () => {
    component.project = {
      ...baseProject,
      demoUrl: undefined,
      repoUrl: undefined,
      repoIsPublic: false
    };
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Enterprise Client System');
    expect(element.textContent).not.toContain('Live Demo');
    expect(element.textContent).not.toContain('Codebase');
  });
});
