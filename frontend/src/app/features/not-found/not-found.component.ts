import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main class="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div class="inline-flex items-center px-3 py-1 rounded-full bg-surface-900 border border-surface-800 text-xs font-mono text-brand-400 mb-6">
        HTTP 404 &bull; Page Not Found
      </div>
      <h1 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
        Lost in the Architecture?
      </h1>
      <p class="mt-4 max-w-md text-surface-400 text-base leading-relaxed">
        The route you are trying to access does not exist on the KNT Software Solutions portal.
      </p>
      <div class="mt-8">
        <a
          routerLink="/"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition-colors shadow-lg shadow-brand-500/10 focus:ring-2 focus:ring-brand-500"
        >
          &larr; Return to KNT Home
        </a>
      </div>
    </main>
  `
})
export class NotFoundComponent {}
