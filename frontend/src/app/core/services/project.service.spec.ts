import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProjectService } from './project.service';
import { Project } from '../models/project.model';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpTesting: HttpTestingController;

  const mockProjects: Project[] = [
    {
      slug: 'zencart',
      title: 'ZenCart',
      shortDescription: 'Spring Boot backend',
      longDescription: 'Detailed architecture',
      techStack: ['Java 17', 'Spring Boot', 'MySQL'],
      images: ['/images/zencart.svg'],
      repoUrl: 'https://github.com/karabocodes/ZenCart',
      repoIsPublic: true
    },
    {
      slug: 'sukuma',
      title: 'sukuma Fleet Services',
      shortDescription: 'Angular 20 app',
      longDescription: 'Fleet logistics',
      techStack: ['Angular 20', 'TypeScript'],
      images: ['/images/sukuma.svg'],
      repoUrl: 'https://github.com/karabocodes/sukuma',
      repoIsPublic: true
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProjectService
      ]
    });
    service = TestBed.inject(ProjectService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should load all projects and ensure every slug is unique', (done) => {
    service.getProjects().subscribe(projects => {
      expect(projects.length).toBe(2);
      const slugs = projects.map(p => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
      done();
    });

    const req = httpTesting.expectOne('/data/projects.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);
  });

  it('should resolve an existing project by slug', (done) => {
    service.getProjectBySlug('zencart').subscribe(project => {
      expect(project).toBeDefined();
      expect(project?.title).toBe('ZenCart');
      done();
    });

    const req = httpTesting.expectOne('/data/projects.json');
    req.flush(mockProjects);
  });

  it('should return undefined when slug does not exist', (done) => {
    service.getProjectBySlug('non-existent-project').subscribe(project => {
      expect(project).toBeUndefined();
      done();
    });

    const req = httpTesting.expectOne('/data/projects.json');
    req.flush(mockProjects);
  });

  it('should extract sorted unique tech stack tags', (done) => {
    service.getAllTags().subscribe(tags => {
      expect(tags).toContain('Java 17');
      expect(tags).toContain('Angular 20');
      expect(tags).toContain('MySQL');
      done();
    });

    const req = httpTesting.expectOne('/data/projects.json');
    req.flush(mockProjects);
  });
});
