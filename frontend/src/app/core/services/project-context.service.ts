import { Injectable, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProjectService } from './project.service';
import { ProjectChatContext } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectContextService {
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);

  readonly currentContext = signal<ProjectChatContext | undefined>(undefined);
  readonly currentSlug = signal<string | null>(null);

  constructor() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(event => {
      this.resolveRouteContext(event.urlAfterRedirects || event.url);
    });
  }

  private resolveRouteContext(url: string) {
    const projectMatch = url.match(/\/projects\/([a-zA-Z0-9_-]+)/);
    if (projectMatch && projectMatch[1]) {
      const slug = projectMatch[1];
      this.currentSlug.set(slug);
      this.projectService.getProjectBySlug(slug).subscribe(project => {
        if (project) {
          this.currentContext.set({
            slug: project.slug,
            title: project.title,
            shortDescription: project.shortDescription,
            longDescription: project.longDescription,
            techStack: project.techStack,
            highlights: project.highlights,
            challenges: project.challenges,
            decisions: project.decisions
          });
        } else {
          this.currentContext.set(undefined);
        }
      });
    } else {
      this.currentSlug.set(null);
      this.currentContext.set(undefined);
    }
  }
}
