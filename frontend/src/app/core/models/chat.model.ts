export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

export interface ProjectChatContext {
  slug: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  techStack: string[];
  highlights?: string[];
  challenges?: string[];
  decisions?: string[];
}

export interface ChatRequest {
  message: string;
  projectContext?: ProjectChatContext;
  conversationHistory?: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
  provider: string;
  model: string;
}

export type ChatStatus = 'idle' | 'loading' | 'success' | 'error';
