import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  template: `
    <main class="min-h-screen pb-24">
      <!-- Hero Section -->
      <section class="relative pt-20 pb-16 border-b border-surface-800/80 overflow-hidden">
        <!-- Subtle background glow -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-brand-500/5 blur-[120px] pointer-events-none -z-10"></div>

        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Terminal Status Pill -->
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-900 border border-surface-800 text-xs font-mono text-surface-300 mb-6">
            <span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
            <span>karabocodes &bull; Available for Engineering Roles</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Karabo R Khunou
          </h1>

          <p class="mt-4 text-xl sm:text-2xl text-brand-400 font-medium">
            Software Engineer &bull; Architecture, Systems &amp; Modern Web
          </p>

          <p class="mt-4 max-w-3xl text-base sm:text-lg text-surface-400 leading-relaxed">
            Building reliable software across the stack — from enterprise Spring Boot backends and relational database architectures, to high-performance Angular standalone interfaces, 3D WebGL scenes, and native iOS engineering.
          </p>

          <!-- Core Competencies Tags -->
          <div class="mt-8 flex flex-wrap gap-2 text-xs font-mono">
            <span class="px-3 py-1.5 rounded-lg bg-surface-900 border border-surface-800 text-surface-200">
              Java 17 &bull; Spring Boot 3.4
            </span>
            <span class="px-3 py-1.5 rounded-lg bg-surface-900 border border-surface-800 text-surface-200">
              Angular 20 &bull; Standalone
            </span>
            <span class="px-3 py-1.5 rounded-lg bg-surface-900 border border-surface-800 text-surface-200">
              Three.js &bull; WebGL
            </span>
            <span class="px-3 py-1.5 rounded-lg bg-surface-900 border border-surface-800 text-surface-200">
              Swift &bull; Native iOS
            </span>
            <span class="px-3 py-1.5 rounded-lg bg-surface-900 border border-surface-800 text-surface-200">
              MySQL &bull; JPA
            </span>
          </div>

          <!-- Quick Action Bar -->
          <div class="mt-8 flex items-center gap-4">
            <a
              href="https://github.com/karabocodes"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-900 hover:bg-surface-800 text-white font-medium text-sm border border-surface-700 transition-colors focus:ring-2 focus:ring-brand-500"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              github.com/karabocodes
            </a>
            <span class="text-xs text-surface-500 font-mono">
              33 Public Repositories
            </span>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-surface-800">
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Engineering Projects
            </h2>
            <p class="mt-1 text-sm text-surface-400">
              Verified architectures, codebase structures, and implementations.
            </p>
          </div>

          <!-- Stack Filters -->
          <div class="flex flex-wrap gap-1.5" role="toolbar" aria-label="Filter projects by technology">
            @for (filter of availableFilters; track filter) {
              <button
                type="button"
                (click)="selectedFilter.set(filter)"
                [class.bg-brand-500]="selectedFilter() === filter"
                [class.text-white]="selectedFilter() === filter"
                [class.bg-surface-900]="selectedFilter() !== filter"
                [class.text-surface-300]="selectedFilter() !== filter"
                class="px-3 py-1.5 rounded-md text-xs font-mono border border-surface-800 hover:border-surface-700 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {{ filter }}
              </button>
            }
          </div>
        </div>

        <!-- Project Grid -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          @for (project of filteredProjects(); track project.slug) {
            <app-project-card [project]="project" />
          } @empty {
            <div class="col-span-full py-16 text-center text-surface-400 font-mono">
              No projects found for the selected filter.
            </div>
          }
        </div>
      </section>
    </main>
  `
})
export class HomeComponent {
  private readonly projectService = inject(ProjectService);
  
  readonly projects = toSignal(this.projectService.getProjects(), { initialValue: [] });
  readonly selectedFilter = signal<string>('All');

  readonly availableFilters = [
    'All',
    'Java 17',
    'Spring Boot 3.4.2',
    'Angular 20',
    'Three.js',
    'Swift'
  ];

  readonly filteredProjects = computed(() => {
    const list = this.projects();
    const filter = this.selectedFilter();
    if (filter === 'All') return list;
    return list.filter(p => p.techStack.includes(filter));
  });
}
