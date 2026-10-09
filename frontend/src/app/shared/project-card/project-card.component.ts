import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article
      class="group flex flex-col bg-surface-900 border border-surface-800 rounded-xl overflow-hidden hover:border-brand-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/5"
    >
      <!-- Image Container -->
      <a
        [routerLink]="['/projects', project.slug]"
        class="relative block aspect-video overflow-hidden bg-surface-950 border-b border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        [attr.aria-label]="'View architecture case study for ' + project.title"
      >
        <img
          [src]="project.images[0] || '/images/placeholder.svg'"
          [alt]="project.title + ' preview'"
          loading="lazy"
          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
        <div class="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-surface-950/80 backdrop-blur-sm border border-surface-700/60 text-[11px] font-mono text-brand-300">
          KNT Deliverable
        </div>
      </a>

      <!-- Card Body -->
      <div class="flex flex-col flex-1 p-6">
        <!-- Title & Link -->
        <h3 class="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">
          <a [routerLink]="['/projects', project.slug]" class="focus:outline-none focus:underline">
            {{ project.title }}
          </a>
        </h3>

        <!-- Short Description -->
        <p class="mt-2 text-sm text-surface-400 leading-relaxed line-clamp-3">
          {{ project.shortDescription }}
        </p>

        <!-- Tech Stack Tags -->
        <div class="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
          @for (tech of project.techStack.slice(0, 4); track tech) {
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-surface-800 text-surface-300 border border-surface-700/50">
              {{ tech }}
            </span>
          }
          @if (project.techStack.length > 4) {
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono text-surface-400">
              +{{ project.techStack.length - 4 }}
            </span>
          }
        </div>

        <!-- Footer / Action Area -->
        <div class="mt-auto pt-6 flex items-center justify-between border-t border-surface-800/80">
          <a
            [routerLink]="['/projects', project.slug]"
            class="text-xs font-medium text-brand-400 hover:text-brand-300 flex items-center gap-1 focus:outline-none focus:underline"
          >
            Architecture Deep Dive
            <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <!-- Action Buttons -->
          <div>
            @if (project.demoUrl) {
              <a
                [href]="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-md transition-colors focus:ring-2 focus:ring-brand-500"
              >
                Live Demo
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            } @else if (project.repoUrl && project.repoIsPublic) {
              <a
                [href]="project.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-surface-300 bg-surface-800 hover:bg-surface-700 hover:text-white rounded-md transition-colors focus:ring-2 focus:ring-surface-500"
              >
                Codebase
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            } @else {
              <span class="text-xs font-mono text-surface-500">
                Enterprise Client System
              </span>
            }
          </div>
        </div>
      </div>
    </article>
  `
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}
