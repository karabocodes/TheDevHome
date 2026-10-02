import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay, of, catchError } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly http = inject(HttpClient);
  private projects$!: Observable<Project[]>;

  constructor() {
    this.projects$ = this.http.get<Project[]>('/data/projects.json').pipe(
      shareReplay(1),
      catchError(err => {
        console.error('Failed to load project metadata:', err);
        return of([]);
      })
    );
  }

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  getProjectBySlug(slug: string): Observable<Project | undefined> {
    return this.projects$.pipe(
      map(projects => projects.find(p => p.slug.toLowerCase() === slug.toLowerCase()))
    );
  }

  getAllTags(): Observable<string[]> {
    return this.projects$.pipe(
      map(projects => {
        const tagSet = new Set<string>();
        projects.forEach(p => p.techStack.forEach(t => tagSet.add(t)));
        return Array.from(tagSet).sort();
      })
    );
  }
}
