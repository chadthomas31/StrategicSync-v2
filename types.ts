
export enum StrategySection {
  SITEMAP = 'SITEMAP',
  WIREFRAME = 'WIREFRAME',
  COPYWRITING = 'COPYWRITING',
  VISUALS = 'VISUALS',
  ROADMAP = 'ROADMAP',
  ANALYTICS = 'ANALYTICS',
  MARKET = 'MARKET',
  ADVISOR = 'ADVISOR',
  VAULT = 'VAULT'
}

export interface VaultEntry {
  id: string;
  user_id?: string;
  timestamp: number;
  category: string;
  title: string;
  content: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  companyName?: string;
  industry?: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface SitemapNode {
  title: string;
  purpose: string;
  isCTA?: boolean;
}

export interface WireframeSection {
  name: string;
  intent: string;
  content: string[];
}

export interface HeadlineOption {
  type: string;
  h1: string;
  h2: string;
}

export interface TutorialStep {
  targetId: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}
