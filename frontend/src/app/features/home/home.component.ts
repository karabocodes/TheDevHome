import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project.service';
import { CompanyService } from '../../core/services/company.service';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectCardComponent],
  template: `
    <main class="min-h-screen pb-24 overflow-x-hidden">
      <!-- HERO SECTION -->
      <section class="relative pt-24 pb-20 border-b border-surface-800/80 overflow-hidden">
        <!-- Ambient Glowing Gradients -->
        <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-brand-500/10 via-emerald-600/5 to-transparent blur-[140px] pointer-events-none -z-10"></div>
        <div class="absolute top-1/3 -right-48 w-96 h-96 bg-brand-400/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Status Pill -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-900/90 border border-brand-500/30 text-xs font-mono text-surface-200 mb-8 shadow-sm">
            <span class="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse"></span>
            <span class="text-brand-300 font-semibold tracking-wide">KNT SOFTWARE CONSULTANCY</span>
            <span class="text-surface-500">&bull;</span>
            <span class="text-surface-400">Accepting Enterprise Engagements</span>
          </div>

          <!-- Hero Headline -->
          <div class="max-w-4xl">
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
              Engineering Mission-Critical
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-emerald-300 to-teal-200">
                Software Systems
              </span>
              &amp; Digital Platforms
            </h1>

            <p class="mt-6 text-lg sm:text-xl text-surface-300 leading-relaxed max-w-3xl font-normal">
              <strong>KNT</strong> is an elite software engineering partnership. Founded by senior architects Karabo Khunou and specialized domain partners, we engineer high-concurrency enterprise backends, reactive web systems, interactive 3D computing, and native mobile banking platforms designed for institutional scale.
            </p>
          </div>

          <!-- Action Buttons & Badges -->
          <div class="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#consultation"
              class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-xl shadow-brand-500/20 transition-all hover:scale-[1.02] focus:ring-2 focus:ring-brand-500"
            >
              <span>Schedule Technical Consultation</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <a
              href="#projects"
              class="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-surface-900 hover:bg-surface-800 text-surface-200 hover:text-white font-medium text-sm border border-surface-700/80 transition-colors focus:ring-2 focus:ring-brand-500"
            >
              <span>Explore Case Studies</span>
              <svg class="w-4 h-4 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <a
              href="https://github.com/karabocodes"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-surface-950 hover:bg-surface-900 text-surface-400 hover:text-white font-mono text-xs border border-surface-800 transition-colors"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>33+ Verified Repositories</span>
            </a>
          </div>

          <!-- Proof & Trust Metrics Bar -->
          <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-surface-800/80">
            <div class="p-4 rounded-xl bg-surface-900/40 border border-surface-800/80">
              <div class="text-3xl font-extrabold text-white font-mono tracking-tight text-brand-400">
                3
              </div>
              <div class="text-sm font-semibold text-white mt-1">Founding Partners</div>
              <div class="text-xs text-surface-400 mt-0.5">Specialized domain leads (K &bull; N &bull; T)</div>
            </div>

            <div class="p-4 rounded-xl bg-surface-900/40 border border-surface-800/80">
              <div class="text-3xl font-extrabold text-white font-mono tracking-tight text-emerald-400">
                99.99%
              </div>
              <div class="text-sm font-semibold text-white mt-1">Architecture Reliability</div>
              <div class="text-xs text-surface-400 mt-0.5">Enterprise uptime benchmark</div>
            </div>

            <div class="p-4 rounded-xl bg-surface-900/40 border border-surface-800/80">
              <div class="text-3xl font-extrabold text-white font-mono tracking-tight text-teal-400">
                4
              </div>
              <div class="text-sm font-semibold text-white mt-1">Core Tech Disciplines</div>
              <div class="text-xs text-surface-400 mt-0.5">Backend, Web, 3D, and iOS</div>
            </div>

            <div class="p-4 rounded-xl bg-surface-900/40 border border-surface-800/80">
              <div class="text-3xl font-extrabold text-white font-mono tracking-tight text-cyan-400">
                100%
              </div>
              <div class="text-sm font-semibold text-white mt-1">Delivery Standard</div>
              <div class="text-xs text-surface-400 mt-0.5">Zero-compromise engineering</div>
            </div>
          </div>
        </div>
      </section>

      <!-- SERVICES & PRACTICE AREAS SECTION -->
      <section id="services" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-500/10 border border-brand-500/20 text-xs font-mono text-brand-400 mb-3">
            PRACTICE AREAS &amp; CAPABILITIES
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Enterprise Engineering Without Compromise
          </h2>
          <p class="mt-3 text-base sm:text-lg text-surface-400 leading-relaxed">
            From low-latency transactional microservices to spatial 3D WebGL and secure native iOS interfaces, KNT delivers full-spectrum technical execution.
          </p>
        </div>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Service 1: Enterprise Backend -->
          <div class="group p-8 rounded-2xl bg-surface-900/60 border border-surface-800 hover:border-brand-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5 flex flex-col">
            <div class="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-6 group-hover:scale-105 transition-transform">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white group-hover:text-brand-300 transition-colors">
              Enterprise Backend &amp; Microservices
            </h3>
            <p class="mt-3 text-sm text-surface-400 leading-relaxed">
              High-throughput APIs, microservice ecosystems, and domain-driven persistence models engineered with Java 17 and Spring Boot 3.4.
            </p>
            <ul class="mt-6 space-y-2 text-xs font-mono text-surface-300 border-t border-surface-800/80 pt-6">
              <li class="flex items-center gap-2">
                <span class="text-brand-400">&bull;</span> Java 17 &bull; Spring Boot 3.4.2
              </li>
              <li class="flex items-center gap-2">
                <span class="text-brand-400">&bull;</span> Relational JPA &bull; MySQL &bull; PostgreSQL
              </li>
              <li class="flex items-center gap-2">
                <span class="text-brand-400">&bull;</span> Spring Security &bull; Token Protection
              </li>
              <li class="flex items-center gap-2">
                <span class="text-brand-400">&bull;</span> Logical Domain Architecture Models
              </li>
            </ul>
          </div>

          <!-- Service 2: Modern Web Engineering -->
          <div class="group p-8 rounded-2xl bg-surface-900/60 border border-surface-800 hover:border-brand-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5 flex flex-col">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-105 transition-transform">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
              Reactive Web Platforms &amp; Design Systems
            </h3>
            <p class="mt-3 text-sm text-surface-400 leading-relaxed">
              Modular single-page applications built using Angular standalone architecture, TypeScript, and fine-grained reactive signals.
            </p>
            <ul class="mt-6 space-y-2 text-xs font-mono text-surface-300 border-t border-surface-800/80 pt-6">
              <li class="flex items-center gap-2">
                <span class="text-emerald-400">&bull;</span> Angular 20 Standalone Architecture
              </li>
              <li class="flex items-center gap-2">
                <span class="text-emerald-400">&bull;</span> Signal-driven Reactive State
              </li>
              <li class="flex items-center gap-2">
                <span class="text-emerald-400">&bull;</span> High-contrast Enterprise UI Tokens
              </li>
              <li class="flex items-center gap-2">
                <span class="text-emerald-400">&bull;</span> Core Web Vitals Optimization
              </li>
            </ul>
          </div>

          <!-- Service 3: Interactive 3D WebGL -->
          <div class="group p-8 rounded-2xl bg-surface-900/60 border border-surface-800 hover:border-brand-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5 flex flex-col">
            <div class="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-105 transition-transform">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
              Interactive 3D WebGL &amp; Spatial Graphics
            </h3>
            <p class="mt-3 text-sm text-surface-400 leading-relaxed">
              Real-time browser 3D graphics, model animation pipelines, and audio-synchronized avatar experiences powered by Three.js and WebGL.
            </p>
            <ul class="mt-6 space-y-2 text-xs font-mono text-surface-300 border-t border-surface-800/80 pt-6">
              <li class="flex items-center gap-2">
                <span class="text-teal-400">&bull;</span> Three.js &bull; React Three Fiber (R3F)
              </li>
              <li class="flex items-center gap-2">
                <span class="text-teal-400">&bull;</span> Audio-to-Viseme Lip Synchronization
              </li>
              <li class="flex items-center gap-2">
                <span class="text-teal-400">&bull;</span> GLTF/GLB Asset Optimization
              </li>
              <li class="flex items-center gap-2">
                <span class="text-teal-400">&bull;</span> Real-Time Browser Shaders
              </li>
            </ul>
          </div>

          <!-- Service 4: Native iOS & Mobile -->
          <div class="group p-8 rounded-2xl bg-surface-900/60 border border-surface-800 hover:border-brand-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5 flex flex-col">
            <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              Native Mobile &amp; Digital Banking
            </h3>
            <p class="mt-3 text-sm text-surface-400 leading-relaxed">
              Institutional-grade iOS mobile applications developed in Swift with strict adherence to Apple HIG, financial data security, and Auto Layout.
            </p>
            <ul class="mt-6 space-y-2 text-xs font-mono text-surface-300 border-t border-surface-800/80 pt-6">
              <li class="flex items-center gap-2">
                <span class="text-cyan-400">&bull;</span> Native Swift &bull; Xcode Architecture
              </li>
              <li class="flex items-center gap-2">
                <span class="text-cyan-400">&bull;</span> Banking Account &amp; Transaction UI
              </li>
              <li class="flex items-center gap-2">
                <span class="text-cyan-400">&bull;</span> Apple Human Interface Guidelines
              </li>
              <li class="flex items-center gap-2">
                <span class="text-cyan-400">&bull;</span> Offline Resilience &bull; Data Security
              </li>
            </ul>
          </div>

          <!-- Service 5: Architecture Audits -->
          <div class="group p-8 rounded-2xl bg-surface-900/60 border border-surface-800 hover:border-brand-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5 flex flex-col">
            <div class="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-105 transition-transform">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              Architecture Audits &amp; Codebase Triage
            </h3>
            <p class="mt-3 text-sm text-surface-400 leading-relaxed">
              Deep evaluations for CTOs and founders: identify performance bottlenecks, eliminate technical debt, and establish scalable blueprints.
            </p>
            <ul class="mt-6 space-y-2 text-xs font-mono text-surface-300 border-t border-surface-800/80 pt-6">
              <li class="flex items-center gap-2">
                <span class="text-purple-400">&bull;</span> Codebase &amp; Security Audits
              </li>
              <li class="flex items-center gap-2">
                <span class="text-purple-400">&bull;</span> Concurrency &amp; Query Tuning
              </li>
              <li class="flex items-center gap-2">
                <span class="text-purple-400">&bull;</span> Architectural Decision Records (ADRs)
              </li>
              <li class="flex items-center gap-2">
                <span class="text-purple-400">&bull;</span> Zero-Downtime Migration Plans
              </li>
            </ul>
          </div>

          <!-- Service 6: AI Integration & Backend Proxies -->
          <div class="group p-8 rounded-2xl bg-surface-900/60 border border-surface-800 hover:border-brand-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5 flex flex-col">
            <div class="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-6 group-hover:scale-105 transition-transform">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white group-hover:text-brand-300 transition-colors">
              Secure AI Proxies &amp; Agent Systems
            </h3>
            <p class="mt-3 text-sm text-surface-400 leading-relaxed">
              Production-hardened LLM backend proxies, grounded contextual assistants, and safe integration of agentic workflows with Python FastAPI.
            </p>
            <ul class="mt-6 space-y-2 text-xs font-mono text-surface-300 border-t border-surface-800/80 pt-6">
              <li class="flex items-center gap-2">
                <span class="text-brand-400">&bull;</span> FastAPI LLM Gateway Proxies
              </li>
              <li class="flex items-center gap-2">
                <span class="text-brand-400">&bull;</span> Grounded Prompt Engineering
              </li>
              <li class="flex items-center gap-2">
                <span class="text-brand-400">&bull;</span> Rate Limiting &amp; Credential Shielding
              </li>
              <li class="flex items-center gap-2">
                <span class="text-brand-400">&bull;</span> Local (Ollama) &amp; Cloud LLM Adapters
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- CASE STUDIES / PROJECTS SECTION -->
      <section id="projects" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-surface-800">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-500/10 border border-brand-500/20 text-xs font-mono text-brand-400 mb-2">
              KNT DELIVERABLES &bull; REFERENCE ARCHITECTURES
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Case Studies
            </h2>
            <p class="mt-1 text-sm sm:text-base text-surface-400">
              Verified system designs, domain architectures, and production implementations.
            </p>
          </div>

          <!-- Stack Filter Bar -->
          <div class="flex flex-wrap gap-2" role="toolbar" aria-label="Filter case studies by technology">
            @for (filter of availableFilters; track filter) {
              <button
                type="button"
                (click)="selectedFilter.set(filter)"
                [class.bg-brand-500]="selectedFilter() === filter"
                [class.text-white]="selectedFilter() === filter"
                [class.bg-surface-900]="selectedFilter() !== filter"
                [class.text-surface-300]="selectedFilter() !== filter"
                class="px-3.5 py-1.5 rounded-lg text-xs font-mono border border-surface-800 hover:border-surface-700 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {{ filter }}
              </button>
            }
          </div>
        </div>

        <!-- Project Grid -->
        <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          @for (project of filteredProjects(); track project.slug) {
            <app-project-card [project]="project" />
          } @empty {
            <div class="col-span-full py-16 text-center text-surface-400 font-mono">
              No case studies found for the selected filter.
            </div>
          }
        </div>
      </section>

      <!-- LEADERSHIP & FOUNDING PARTNERS (THE KNT TEAM) -->
      <section id="leadership" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-500/10 border border-brand-500/20 text-xs font-mono text-brand-400 mb-3">
            EXECUTIVE LEADERSHIP
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The KNT Partners
          </h2>
          <p class="mt-3 text-base sm:text-lg text-surface-400 leading-relaxed">
            Hands-on technical leadership. Every KNT project is directly architected and overseen by our founding partners.
          </p>
        </div>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (partner of partners(); track partner.id) {
            <div class="relative p-8 rounded-2xl bg-surface-900/70 border border-surface-800 hover:border-brand-500/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-brand-500/5">
              <div>
                <!-- Monogram Avatar Badge -->
                <div class="flex items-center justify-between mb-6">
                  <div class="w-14 h-14 rounded-2xl bg-surface-950 border border-brand-500/30 flex items-center justify-center font-mono font-extrabold text-xl text-brand-400 group-hover:scale-105 group-hover:border-brand-400 transition-all shadow-inner">
                    {{ partner.initial }}
                  </div>
                  <span class="text-xs font-mono text-brand-400 px-2.5 py-1 rounded bg-brand-500/10 border border-brand-500/20">
                    Founding Partner
                  </span>
                </div>

                <h3 class="text-2xl font-bold text-white tracking-tight group-hover:text-brand-300 transition-colors">
                  {{ partner.name }}
                </h3>
                <div class="text-sm font-medium text-brand-400 mt-1">
                  {{ partner.role }}
                </div>

                <p class="mt-4 text-sm text-surface-300 leading-relaxed">
                  {{ partner.bio }}
                </p>

                <!-- Core Competencies -->
                <div class="mt-6 pt-6 border-t border-surface-800/80">
                  <div class="text-xs font-mono uppercase tracking-wider text-surface-400 mb-3">
                    Domain Specialties
                  </div>
                  <div class="flex flex-wrap gap-1.5">
                    @for (spec of partner.specialties; track spec) {
                      <span class="px-2.5 py-1 rounded text-xs font-mono bg-surface-950 text-surface-200 border border-surface-800">
                        {{ spec }}
                      </span>
                    }
                  </div>
                </div>
              </div>

              <!-- Footer Contact Link -->
              <div class="mt-8 pt-4 border-t border-surface-800/60 flex items-center justify-between text-xs font-mono">
                @if (partner.github) {
                  <a
                    [href]="partner.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-surface-400 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    <span>GitHub Profile</span>
                  </a>
                }
                @if (partner.email) {
                  <a
                    [href]="'mailto:' + partner.email"
                    class="text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    Direct Contact &rarr;
                  </a>
                }
              </div>
            </div>
          }
        </div>
      </section>

      <!-- ENGAGEMENT MODELS SECTION -->
      <section id="engagement" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-500/10 border border-brand-500/20 text-xs font-mono text-brand-400 mb-3">
            COLLABORATION FRAMEWORK
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Enterprises Engage KNT
          </h2>
          <p class="mt-3 text-base sm:text-lg text-surface-400 leading-relaxed">
            Transparent, milestone-governed partnership structures designed to align with corporate roadmaps.
          </p>
        </div>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 rounded-2xl bg-surface-900/50 border border-surface-800 flex flex-col justify-between">
            <div>
              <div class="text-xs font-mono text-brand-400 uppercase tracking-wider mb-2">Model 01</div>
              <h3 class="text-xl font-bold text-white">Dedicated Technical Pod</h3>
              <p class="mt-3 text-sm text-surface-400 leading-relaxed">
                Our partners and senior engineers embed directly within your organization, driving end-to-end architecture and rapid implementation sprints.
              </p>
            </div>
            <div class="mt-8 pt-4 border-t border-surface-800 text-xs font-mono text-surface-300">
              <strong class="text-white block font-sans text-xs mb-1">Ideal For:</strong>
              Core product builds, distributed system scaling, and replatforming.
            </div>
          </div>

          <div class="p-8 rounded-2xl bg-surface-900/50 border border-surface-800 flex flex-col justify-between">
            <div>
              <div class="text-xs font-mono text-brand-400 uppercase tracking-wider mb-2">Model 02</div>
              <h3 class="text-xl font-bold text-white">Architecture Advisory Sprint</h3>
              <p class="mt-3 text-sm text-surface-400 leading-relaxed">
                Focused high-impact advisory engagement to audit codebases, design data models, review security, or solve critical performance bottlenecks.
              </p>
            </div>
            <div class="mt-8 pt-4 border-t border-surface-800 text-xs font-mono text-surface-300">
              <strong class="text-white block font-sans text-xs mb-1">Ideal For:</strong>
              CTOs preparing for audits, scaling milestones, or venture due diligence.
            </div>
          </div>

          <div class="p-8 rounded-2xl bg-surface-900/50 border border-surface-800 flex flex-col justify-between">
            <div>
              <div class="text-xs font-mono text-brand-400 uppercase tracking-wider mb-2">Model 03</div>
              <h3 class="text-xl font-bold text-white">Turnkey Solution Delivery</h3>
              <p class="mt-3 text-sm text-surface-400 leading-relaxed">
                From initial requirements gathering to production release, KNT delivers complete, tested, and documented software systems ready for operational handoff.
              </p>
            </div>
            <div class="mt-8 pt-4 border-t border-surface-800 text-xs font-mono text-surface-300">
              <strong class="text-white block font-sans text-xs mb-1">Ideal For:</strong>
              High-priority enterprise software deliverables requiring guaranteed quality.
            </div>
          </div>
        </div>
      </section>

      <!-- INTERACTIVE CONSULTATION INTAKE SECTION -->
      <section id="consultation" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div class="rounded-3xl bg-gradient-to-br from-surface-900 via-surface-900 to-surface-950 border border-surface-800 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <!-- Background Ambient Glow -->
          <div class="absolute -top-32 -right-32 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
            <!-- Left Info Column -->
            <div class="lg:col-span-5 space-y-6">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-500/10 border border-brand-500/20 text-xs font-mono text-brand-400">
                INITIATE ENGAGEMENT
              </div>
              <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Schedule a Technical Consultation
              </h2>
              <p class="text-surface-300 text-sm sm:text-base leading-relaxed">
                Discuss your system requirements directly with KNT's partners. We evaluate your architectural goals, timeline, and deliverables within 24 business hours.
              </p>

              <div class="space-y-4 pt-4 text-sm font-mono text-surface-300 border-t border-surface-800/80">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-surface-950 border border-surface-800 flex items-center justify-center text-brand-400">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href="mailto:consult@knt-solutions.com" class="hover:text-brand-400 transition-colors">
                    consult&#64;knt-solutions.com
                  </a>
                </div>

                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-surface-950 border border-surface-800 flex items-center justify-center text-brand-400">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span>Gauteng, South Africa &bull; Global Remote Delivery</span>
                </div>

                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-surface-950 border border-surface-800 flex items-center justify-center text-brand-400">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>SLA: 24 Business Hours Response</span>
                </div>
              </div>
            </div>

            <!-- Right Interactive Form Column -->
            <div class="lg:col-span-7 bg-surface-950/80 border border-surface-800 p-6 sm:p-8 rounded-2xl shadow-xl">
              @if (formSubmitted()) {
                <div class="p-8 text-center space-y-4">
                  <div class="w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 mx-auto">
                    <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-bold text-white">Consultation Request Received</h3>
                  <p class="text-surface-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{{ inquiryName }}</strong>. A KNT founding partner will review your system scope and respond within 24 business hours.
                  </p>
                  <button
                    type="button"
                    (click)="formSubmitted.set(false)"
                    class="mt-4 px-5 py-2 rounded-lg bg-surface-900 border border-surface-700 text-xs font-mono text-brand-400 hover:text-white transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              } @else {
                <form (ngSubmit)="handleInquirySubmit()" class="space-y-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-mono text-surface-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="inquiryName"
                        name="inquiryName"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        class="w-full bg-surface-900 border border-surface-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label class="block text-xs font-mono text-surface-400 mb-1.5">
                        Corporate / Work Email *
                      </label>
                      <input
                        type="email"
                        [(ngModel)]="inquiryEmail"
                        name="inquiryEmail"
                        required
                        placeholder="s.jenkins@company.com"
                        class="w-full bg-surface-900 border border-surface-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-mono text-surface-400 mb-1.5">
                        Organization / Company
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="inquiryCompany"
                        name="inquiryCompany"
                        placeholder="e.g. Enterprise Systems Ltd"
                        class="w-full bg-surface-900 border border-surface-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label class="block text-xs font-mono text-surface-400 mb-1.5">
                        Primary Practice Domain *
                      </label>
                      <select
                        [(ngModel)]="inquiryDomain"
                        name="inquiryDomain"
                        class="w-full bg-surface-900 border border-surface-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="Enterprise Backend & Microservices">Enterprise Backend &amp; Microservices</option>
                        <option value="Modern Web Platform (Angular)">Modern Web Platform (Angular)</option>
                        <option value="Interactive 3D WebGL (Three.js)">Interactive 3D WebGL (Three.js)</option>
                        <option value="Native iOS / Mobile Solution">Native iOS / Mobile Solution</option>
                        <option value="Architecture Audit & Advisory">Architecture Audit &amp; Advisory</option>
                        <option value="Full-Stack Enterprise Solution">Full-Stack Enterprise Solution</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-mono text-surface-400 mb-1.5">
                      Project Scope &amp; Technical Objectives *
                    </label>
                    <textarea
                      [(ngModel)]="inquiryDetails"
                      name="inquiryDetails"
                      required
                      rows="4"
                      placeholder="Outline your engineering scope, performance requirements, current stack, or upcoming delivery deadlines..."
                      class="w-full bg-surface-900 border border-surface-700/80 rounded-xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    [disabled]="!inquiryName || !inquiryEmail || !inquiryDetails"
                    class="w-full py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:hover:bg-brand-600 text-white font-semibold text-sm transition-all shadow-lg shadow-brand-500/20 focus:ring-2 focus:ring-brand-500 cursor-pointer"
                  >
                    Transmit Technical Inquiry &rarr;
                  </button>
                </form>
              }
            </div>
          </div>
        </div>
      </section>
    </main>
  `
})
export class HomeComponent {
  private readonly projectService = inject(ProjectService);
  private readonly companyService = inject(CompanyService);

  readonly company = toSignal(this.companyService.getCompanyInfo(), { initialValue: null });
  readonly projects = toSignal(this.projectService.getProjects(), { initialValue: [] });
  readonly selectedFilter = signal<string>('All');

  readonly formSubmitted = signal<boolean>(false);
  inquiryName: string = '';
  inquiryEmail: string = '';
  inquiryCompany: string = '';
  inquiryDomain: string = 'Enterprise Backend & Microservices';
  inquiryDetails: string = '';

  readonly availableFilters = [
    'All',
    'Java 17',
    'Spring Boot 3.4.2',
    'Angular 20',
    'Three.js',
    'Swift'
  ];

  readonly partners = computed(() => {
    const comp = this.company();
    if (comp && comp.partners) {
      return comp.partners;
    }
    // Fallback partner representation if metadata is pending
    return [
      {
        id: 'karabo-khunou',
        initial: 'K',
        name: 'Karabo Khunou',
        role: 'Partner & Principal Systems Architect',
        bio: 'Spearheads enterprise backend architectures, high-concurrency microservices, and relational domain modeling in Java 17 and Spring Boot 3.4.',
        specialties: ['Enterprise Backend', 'Spring Boot 3.4.2', 'Java 17', 'Relational Data Modeling', 'Microservices'],
        github: 'https://github.com/karabocodes',
        email: 'karabo@knt-solutions.com'
      },
      {
        id: 'nqobile-buthelezi',
        initial: 'N',
        name: 'Nqobile Buthelezi',
        role: 'Partner & Head of Cloud Strategy & Infrastructure',
        bio: 'Directs cloud infrastructure, system reliability, CI/CD automation pipelines, enterprise security compliance, and product transformation.',
        specialties: ['Cloud Infrastructure', 'DevOps & CI/CD', 'System Reliability', 'Security & Governance'],
        github: 'https://github.com/karabocodes',
        email: 'nqobile@knt-solutions.com'
      },
      {
        id: 'tebogo-mkhize',
        initial: 'T',
        name: 'Tebogo Mkhize',
        role: 'Partner & Director of Mobile & Digital Platforms',
        bio: 'Leads native iOS mobile systems adhering to Apple HIG, enterprise design systems, interactive 3D WebGL graphics, and client integrations.',
        specialties: ['Native iOS & Swift', 'UI/UX Design Systems', 'Interactive 3D WebGL', 'Client Platforms'],
        github: 'https://github.com/karabocodes',
        email: 'tebogo@knt-solutions.com'
      }
    ];
  });

  readonly filteredProjects = computed(() => {
    const list = this.projects();
    const filter = this.selectedFilter();
    if (filter === 'All') return list;
    return list.filter(p => p.techStack.includes(filter));
  });

  handleInquirySubmit() {
    if (!this.inquiryName || !this.inquiryEmail || !this.inquiryDetails) return;
    this.formSubmitted.set(true);
  }
}
