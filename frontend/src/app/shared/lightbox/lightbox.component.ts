import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-opacity animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery lightbox"
        (click)="onBackdropClick($event)"
      >
        <!-- Close Button -->
        <button
          type="button"
          (click)="close.emit()"
          class="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-surface-900/80 text-surface-200 hover:text-white hover:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
          aria-label="Close lightbox"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Previous Button -->
        @if (images.length > 1) {
          <button
            type="button"
            (click)="prevImage($event)"
            class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-surface-900/80 text-surface-200 hover:text-white hover:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            aria-label="Previous image"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        }

        <!-- Active Image -->
        <div class="max-w-5xl max-h-[85vh] flex flex-col items-center">
          <img
            [src]="images[currentIndex]"
            [alt]="altText + ' image ' + (currentIndex + 1)"
            class="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-surface-800"
          />
          @if (images.length > 1) {
            <p class="mt-3 text-sm font-mono text-surface-400">
              {{ currentIndex + 1 }} of {{ images.length }}
            </p>
          }
        </div>

        <!-- Next Button -->
        @if (images.length > 1) {
          <button
            type="button"
            (click)="nextImage($event)"
            class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-surface-900/80 text-surface-200 hover:text-white hover:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            aria-label="Next image"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        }
      </div>
    }
  `
})
export class LightboxComponent {
  @Input() images: string[] = [];
  @Input() currentIndex: number = 0;
  @Input() isOpen: boolean = false;
  @Input() altText: string = 'Project visual';

  @Output() close = new EventEmitter<void>();
  @Output() indexChange = new EventEmitter<number>();

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isOpen) return;

    if (event.key === 'Escape') {
      this.close.emit();
    } else if (event.key === 'ArrowLeft') {
      this.prevImage();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    }
  }

  prevImage(event?: MouseEvent) {
    if (event) event.stopPropagation();
    const newIdx = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.indexChange.emit(newIdx);
  }

  nextImage(event?: MouseEvent) {
    if (event) event.stopPropagation();
    const newIdx = (this.currentIndex + 1) % this.images.length;
    this.indexChange.emit(newIdx);
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }
}
