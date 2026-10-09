import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectContextService } from './project-context.service';
import { ChatMessage, ChatRequest, ChatResponse, ChatStatus } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {
  private readonly http = inject(HttpClient);
  readonly contextService = inject(ProjectContextService);

  private readonly API_URL = 'http://127.0.0.1:8000/api/chat';

  readonly isOpen = signal<boolean>(false);
  readonly status = signal<ChatStatus>('idle');
  readonly errorMessage = signal<string | null>(null);
  readonly lastFailedMessage = signal<string | null>(null);

  readonly messages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Welcome to KNT Software Solutions. I am your technical advisory assistant. Ask me anything about our enterprise backend architectures, distributed systems, reactive web engineering, native iOS platforms, or our founding partners (Karabo Khunou and leadership team).",
      timestamp: Date.now()
    }
  ]);

  private previousSlug: string | null = null;

  constructor() {
    // Monitor context changes to inform visitor when browsing different projects
    effect(() => {
      const current = this.contextService.currentContext();
      const slug = current?.slug || null;

      if (slug !== this.previousSlug) {
        if (slug && current) {
          this.messages.update(msgs => [
            ...msgs,
            {
              role: 'system',
              content: `Switched context to KNT Case Study: ${current.title}. Ask questions specific to our architectural decisions, tech stack, or engineering challenges on this deliverable.`,
              timestamp: Date.now()
            }
          ]);
        } else if (this.previousSlug && !slug) {
          this.messages.update(msgs => [
            ...msgs,
            {
              role: 'system',
              content: 'Returned to KNT Corporate Overview (Global Context).',
              timestamp: Date.now()
            }
          ]);
        }
        this.previousSlug = slug;
      }
    });
  }

  toggleOpen() {
    this.isOpen.update(v => !v);
  }

  sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || this.status() === 'loading') return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: trimmed,
      timestamp: Date.now()
    };

    this.messages.update(msgs => [...msgs, userMessage]);
    this.status.set('loading');
    this.errorMessage.set(null);
    this.lastFailedMessage.set(null);

    const payload: ChatRequest = {
      message: trimmed,
      projectContext: this.contextService.currentContext(),
      conversationHistory: this.messages().filter(m => m.role !== 'system')
    };

    this.http.post<ChatResponse>(this.API_URL, payload).subscribe({
      next: res => {
        this.messages.update(msgs => [
          ...msgs,
          {
            role: 'assistant',
            content: res.reply,
            timestamp: Date.now()
          }
        ]);
        this.status.set('idle');
      },
      error: err => {
        console.error('Chat API request error:', err);
        this.status.set('error');
        this.lastFailedMessage.set(trimmed);
        
        let errorText = 'Unable to reach the KNT technical advisory service. Please check your connection or verify the Python server is running.';
        if (err.status === 504 || err.name === 'TimeoutError') {
          errorText = 'The AI advisory model timed out. The local model may be compiling or generating a large response.';
        } else if (err.error?.detail) {
          errorText = err.error.detail;
        }

        this.errorMessage.set(errorText);
      }
    });
  }

  retryLast() {
    const failedMsg = this.lastFailedMessage();
    if (failedMsg) {
      // Remove the last user message to avoid duplication before retrying
      this.messages.update(msgs => msgs.slice(0, -1));
      this.sendMessage(failedMsg);
    }
  }

  clearHistory() {
    this.messages.set([
      {
        role: 'assistant',
        content: "Conversation history cleared. How can I assist you with KNT Software Solutions' engineering practices, case studies, or leadership?",
        timestamp: Date.now()
      }
    ]);
    this.errorMessage.set(null);
    this.status.set('idle');
  }
}
