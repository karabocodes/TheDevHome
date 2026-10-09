import { Component, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatStateService } from '../../core/services/chat-state.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Floating Launcher Button -->
    <div class="fixed bottom-6 right-6 z-40">
      @if (!chatService.isOpen()) {
        <button
          type="button"
          (click)="chatService.toggleOpen()"
          class="group flex items-center gap-3 px-4 py-3 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-medium shadow-2xl shadow-brand-500/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-500/30"
          aria-label="Open KNT Technical AI Consultant"
        >
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <span class="text-sm font-semibold tracking-wide">Consult KNT AI</span>
          <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      }
    </div>

    <!-- Chat Modal / Drawer -->
    @if (chatService.isOpen()) {
      <div
        class="fixed bottom-6 right-6 z-50 w-full max-w-[440px] h-[600px] max-h-[90vh] bg-surface-900 border border-surface-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
        role="dialog"
        aria-labelledby="chat-title"
        aria-modal="false"
      >
        <!-- Chat Header -->
        <header class="px-5 py-4 bg-surface-950 border-b border-surface-800 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 font-mono font-bold text-sm">
              KNT
            </div>
            <div>
              <h2 id="chat-title" class="text-sm font-bold text-white leading-tight">
                KNT Solutions Advisory Assistant
              </h2>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                <span class="text-[11px] font-mono text-surface-400">
                  @if (chatService.contextService.currentContext(); as ctx) {
                    Scoped: <strong class="text-brand-300">{{ ctx.title }}</strong>
                  } @else {
                    KNT Enterprise Scope
                  }
                </span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1">
            <button
              type="button"
              (click)="chatService.clearHistory()"
              title="Clear conversation"
              class="p-1.5 rounded-md text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-colors"
              aria-label="Clear conversation history"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button
              type="button"
              (click)="chatService.toggleOpen()"
              class="p-1.5 rounded-md text-surface-400 hover:text-white hover:bg-surface-800 transition-colors"
              aria-label="Close assistant"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <!-- Message Thread -->
        <div #scrollContainer class="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
          @for (msg of chatService.messages(); track $index) {
            @if (msg.role === 'user') {
              <!-- User Message -->
              <div class="flex justify-end">
                <div class="max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-600 px-4 py-2.5 text-white shadow-sm leading-relaxed">
                  {{ msg.content }}
                </div>
              </div>
            } @else if (msg.role === 'assistant') {
              <!-- Assistant Message -->
              <div class="flex justify-start">
                <div class="max-w-[88%] rounded-2xl rounded-tl-sm bg-surface-800/90 border border-surface-700/50 px-4 py-3 text-surface-200 leading-relaxed whitespace-pre-line shadow-sm">
                  {{ msg.content }}
                </div>
              </div>
            } @else if (msg.role === 'system') {
              <!-- Context Switch Notification -->
              <div class="flex justify-center my-2">
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-950/80 border border-brand-500/20 text-[11px] font-mono text-brand-300">
                  <svg class="w-3 h-3 text-brand-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ msg.content }}</span>
                </div>
              </div>
            }
          }

          <!-- Loading Indicator -->
          @if (chatService.status() === 'loading') {
            <div class="flex justify-start">
              <div class="rounded-2xl rounded-tl-sm bg-surface-800 border border-surface-700/50 px-4 py-3 text-surface-400 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-brand-400 animate-bounce"></span>
                <span class="w-2 h-2 rounded-full bg-brand-400 animate-bounce [animation-delay:0.2s]"></span>
                <span class="w-2 h-2 rounded-full bg-brand-400 animate-bounce [animation-delay:0.4s]"></span>
                <span class="ml-2 text-xs font-mono text-surface-400">Consulting KNT architectural knowledge...</span>
              </div>
            </div>
          }

          <!-- Error State -->
          @if (chatService.status() === 'error' && chatService.errorMessage(); as errorMsg) {
            <div class="p-3 rounded-xl bg-red-950/50 border border-red-800/60 text-xs text-red-300 flex items-start justify-between gap-3">
              <div>
                <p class="font-semibold text-red-200">Request Error</p>
                <p class="mt-0.5 text-red-300/90 leading-relaxed">{{ errorMsg }}</p>
              </div>
              <button
                type="button"
                (click)="chatService.retryLast()"
                class="shrink-0 px-2.5 py-1 rounded bg-red-900/80 hover:bg-red-800 text-white font-mono text-xs transition-colors"
              >
                Retry
              </button>
            </div>
          }
        </div>

        <!-- Quick Prompt Chips -->
        <div class="px-4 py-2 bg-surface-950/60 border-t border-surface-800/80 overflow-x-auto flex gap-1.5 no-scrollbar">
          @if (chatService.contextService.currentContext(); as active) {
            <button
              type="button"
              (click)="sendQuickPrompt('What are the key architectural decisions for ' + active.title + '?')"
              class="shrink-0 px-2.5 py-1 rounded-full bg-surface-800 hover:bg-surface-700 text-surface-300 hover:text-white text-[11px] font-mono border border-surface-700/50 transition-colors"
            >
              Architectural decisions?
            </button>
            <button
              type="button"
              (click)="sendQuickPrompt('What engineering challenges were solved in ' + active.title + '?')"
              class="shrink-0 px-2.5 py-1 rounded-full bg-surface-800 hover:bg-surface-700 text-surface-300 hover:text-white text-[11px] font-mono border border-surface-700/50 transition-colors"
            >
              Key challenges?
            </button>
          } @else {
            <button
              type="button"
              (click)="sendQuickPrompt('What core services does KNT offer?')"
              class="shrink-0 px-2.5 py-1 rounded-full bg-surface-800 hover:bg-surface-700 text-surface-300 hover:text-white text-[11px] font-mono border border-surface-700/50 transition-colors"
            >
              KNT Services?
            </button>
            <button
              type="button"
              (click)="sendQuickPrompt('Who are the KNT founding partners?')"
              class="shrink-0 px-2.5 py-1 rounded-full bg-surface-800 hover:bg-surface-700 text-surface-300 hover:text-white text-[11px] font-mono border border-surface-700/50 transition-colors"
            >
              Founding Partners?
            </button>
            <button
              type="button"
              (click)="sendQuickPrompt('How do we engage KNT for an enterprise project?')"
              class="shrink-0 px-2.5 py-1 rounded-full bg-surface-800 hover:bg-surface-700 text-surface-300 hover:text-white text-[11px] font-mono border border-surface-700/50 transition-colors"
            >
              Engagement models?
            </button>
          }
        </div>

        <!-- Input Bar -->
        <form (ngSubmit)="onSubmit()" class="p-3 bg-surface-950 border-t border-surface-800 flex items-center gap-2">
          <input
            type="text"
            [(ngModel)]="inputText"
            name="chatInput"
            placeholder="Ask about KNT services, architecture, or partners..."
            [disabled]="chatService.status() === 'loading'"
            class="flex-1 bg-surface-900 border border-surface-700 text-white placeholder-surface-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50"
            autocomplete="off"
          />
          <button
            type="submit"
            [disabled]="!inputText.trim() || chatService.status() === 'loading'"
            class="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white disabled:opacity-40 disabled:hover:bg-brand-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Send message"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    }
  `
})
export class ChatbotComponent implements AfterViewChecked {
  readonly chatService = inject(ChatStateService);
  inputText: string = '';

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onSubmit() {
    if (!this.inputText.trim()) return;
    const msg = this.inputText;
    this.inputText = '';
    this.chatService.sendMessage(msg);
  }

  sendQuickPrompt(promptText: string) {
    this.chatService.sendMessage(promptText);
  }

  private scrollToBottom() {
    try {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch {}
  }
}
