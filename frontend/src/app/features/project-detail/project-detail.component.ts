import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';
import { LightboxComponent } from '../../shared/lightbox/lightbox.component';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LightboxComponent],
  template: `
    @if (project(); as p) {
      <main class="min-h-screen pt-12 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Back Navigation -->
        <nav class="mb-8" aria-label="Breadcrumb">
          <a
            routerLink="/"
            class="inline-flex items-center gap-2 text-sm font-mono text-surface-400 hover:text-brand-400 transition-colors focus:outline-none focus:underline"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            &larr; Back to KNT Case Studies
          </a>
        </nav>

        <!-- Header -->
        <header class="border-b border-surface-800 pb-8">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-900 border border-surface-800 text-xs font-mono text-brand-400 mb-3">
                <span>KNT Deliverable &bull; Case Study</span>
              </div>
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {{ p.title }}
              </h1>
              <p class="mt-2 text-lg text-surface-400 max-w-3xl leading-relaxed">
                {{ p.shortDescription }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-3 shrink-0">
              @if (p.demoUrl) {
                <a
                  [href]="p.demoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition-colors shadow-lg shadow-brand-500/10 focus:ring-2 focus:ring-brand-500"
                >
                  <span>Live System Demo</span>
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              } @else if (p.repoUrl && p.repoIsPublic) {
                <a
                  [href]="p.repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-900 hover:bg-surface-800 text-white border border-surface-700 font-medium text-sm transition-colors focus:ring-2 focus:ring-brand-500"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span>Verified Repository</span>
                </a>
              } @else {
                <span class="inline-flex items-center px-4 py-2 rounded-lg bg-surface-900 border border-surface-800 text-xs font-mono text-surface-500">
                  Enterprise Client Project
                </span>
              }
            </div>
          </div>

          <!-- Tech Stack Badges -->
          <div class="mt-6 flex flex-wrap gap-2">
            @for (tech of p.techStack; track tech) {
              <span class="px-3 py-1 rounded-md text-xs font-mono font-medium bg-surface-900 text-surface-200 border border-surface-800">
                {{ tech }}
              </span>
            }
          </div>
        </header>

        <!-- Image Gallery / Architecture Diagram -->
        <section class="mt-10" aria-label="Architecture diagram showcase">
          <div class="relative group cursor-pointer overflow-hidden rounded-xl border border-surface-800 bg-surface-950 aspect-video" (click)="openLightbox(0)">
            <img
              [src]="p.images[0] || '/images/placeholder.svg'"
              [alt]="p.title + ' architecture diagram'"
              class="w-full h-full object-contain p-4 group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-surface-950/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span class="px-4 py-2 rounded-lg bg-surface-900/90 text-sm font-mono text-white border border-surface-700 flex items-center gap-2 shadow-xl">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                Expand Diagram View
              </span>
            </div>
          </div>
        </section>

        <!-- Deep Dive Specifications -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <!-- Main Content (2 cols) -->
          <div class="md:col-span-2 space-y-10">
            <!-- Full Description -->
            <section>
              <h2 class="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-brand-400"></span>
                Architecture &amp; System Overview
              </h2>
              <p class="text-surface-300 leading-relaxed whitespace-pre-line text-base">
                {{ p.longDescription }}
              </p>
            </section>

            <!-- Highlights -->
            @if (p.highlights && p.highlights.length > 0) {
              <section class="p-6 rounded-xl bg-surface-900/50 border border-surface-800">
                <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Architectural &amp; Implementation Highlights
                </h2>
                <ul class="space-y-2.5">
                  @for (item of p.highlights; track item) {
                    <li class="flex items-start gap-3 text-sm text-surface-300">
                      <span class="text-brand-400 font-mono text-sm leading-none mt-1">&rarr;</span>
                      <span>{{ item }}</span>
                    </li>
                  }
                </ul>
              </section>
            }

            <!-- Challenges & Solutions -->
            @if (p.challenges && p.challenges.length > 0) {
              <section class="p-6 rounded-xl bg-surface-900/50 border border-surface-800">
                <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Engineering &amp; Scaling Challenges Resolved
                </h2>
                <ul class="space-y-2.5">
                  @for (challenge of p.challenges; track challenge) {
                    <li class="flex items-start gap-3 text-sm text-surface-300">
                      <span class="text-amber-400 font-mono text-sm leading-none mt-1">&bull;</span>
                      <span>{{ challenge }}</span>
                    </li>
                  }
                </ul>
              </section>
            }
          </div>

          <!-- Sidebar (1 col) -->
          <div class="space-y-8">
            <!-- Architectural Decisions -->
            @if (p.decisions && p.decisions.length > 0) {
              <section class="p-6 rounded-xl bg-surface-900 border border-surface-800">
                <h3 class="text-sm font-mono uppercase tracking-wider text-surface-400 font-semibold mb-4">
                  Key Architectural Decisions
                </h3>
                <ul class="space-y-3">
                  @for (decision of p.decisions; track decision) {
                    <li class="text-xs text-surface-300 border-l-2 border-brand-500 pl-3 leading-relaxed">
                      {{ decision }}
                    </li>
                  }
                </ul>
              </section>
            }

            <!-- AI Assistant Context Tip -->
            <div class="p-5 rounded-xl bg-brand-950/30 border border-brand-800/40">
              <div class="flex items-center gap-2 text-brand-400 text-xs font-mono font-semibold">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                KNT AI Advisory Scoped
              </div>
              <p class="mt-2 text-xs text-surface-300 leading-relaxed">
                The KNT Technical AI Assistant is active and scoped to <strong>{{ p.title }}</strong>. Ask questions regarding its system design, high-availability architecture, and engineering trade-offs.
              </p>
            </div>
          </div>
        </div>

        <!-- Lightbox -->
        <app-lightbox
          [images]="p.images"
          [currentIndex]="lightboxIndex()"
          [isOpen]="lightboxOpen()"
          [altText]="p.title"
          (close)="lightboxOpen.set(false)"
          (indexChange)="lightboxIndex.set($event)"
        />
      </main>
    } @else {
      <!-- Project Not Found / Loading State -->
      <main class="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 class="text-3xl font-bold text-white mb-2">Case Study Not Found</h1>
        <p class="text-surface-400 font-mono text-sm max-w-md mb-6">
          The requested deliverable slug could not be located in the KNT solutions catalog.
        </p>
        <a
          routerLink="/"
          class="px-5 py-2.5 rounded-lg bg-surface-900 border border-surface-700 text-sm font-mono text-brand-400 hover:text-white transition-colors"
        >
          &larr; Return to KNT Solutions Catalog
        </a>
      </main>
    }
  `
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

  readonly lightboxOpen = signal<boolean>(false);
  readonly lightboxIndex = signal<number>(0);

  readonly project = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug') || '';
        return this.projectService.getProjectBySlug(slug);
      })
    )
  );

  openLightbox(index: number) {
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
  }
}
