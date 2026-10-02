import { TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, of } from 'rxjs';
import { ProjectContextService } from './project-context.service';
import { ProjectService } from './project.service';
import { Project } from '../models/project.model';

describe('ProjectContextService', () => {
  let service: ProjectContextService;
  let mockRouter: any;
  let mockProjectService: any;
  let routerEvents$: Subject<any>;

  const mockZenCart: Project = {
    slug: 'zencart',
    title: 'ZenCart',
    shortDescription: 'Spring Boot backend',
    longDescription: 'Full e-commerce spec',
    techStack: ['Java 17', 'Spring Boot 3.4.2'],
    images: ['/images/zencart.svg'],
    repoUrl: 'https://github.com/karabocodes/ZenCart',
    repoIsPublic: true,
    highlights: ['JPA relational model'],
    challenges: ['Entity integrity'],
    decisions: ['Layered architecture']
  };

  beforeEach(() => {
    routerEvents$ = new Subject();
    mockRouter = {
      events: routerEvents$.asObservable()
    };

    mockProjectService = {
      getProjectBySlug: (slug: string) => {
        if (slug === 'zencart') return of(mockZenCart);
        return of(undefined);
      }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ProjectService, useValue: mockProjectService },
        ProjectContextService
      ]
    });

    service = TestBed.inject(ProjectContextService);
  });

  it('should start with no active project context', () => {
    expect(service.currentContext()).toBeUndefined();
    expect(service.currentSlug()).toBeNull();
  });

  it('should resolve and set project context upon navigating to /projects/zencart', () => {
    routerEvents$.next(new NavigationEnd(1, '/projects/zencart', '/projects/zencart'));

    const ctx = service.currentContext();
    expect(ctx).toBeDefined();
    expect(ctx?.slug).toBe('zencart');
    expect(ctx?.title).toBe('ZenCart');
    expect(ctx?.techStack).toContain('Java 17');
    expect(service.currentSlug()).toBe('zencart');
  });

  it('should reset context when navigating back to homepage /', () => {
    // Navigate to project
    routerEvents$.next(new NavigationEnd(1, '/projects/zencart', '/projects/zencart'));
    expect(service.currentContext()).toBeDefined();

    // Navigate to home
    routerEvents$.next(new NavigationEnd(2, '/', '/'));
    expect(service.currentContext()).toBeUndefined();
    expect(service.currentSlug()).toBeNull();
  });
});
