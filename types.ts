
export enum StrategySection {
  SITEMAP = 'SITEMAP',
  WIREFRAME = 'WIREFRAME',
  COPYWRITING = 'COPYWRITING',
  VISUALS = 'VISUALS',
  ROADMAP = 'ROADMAP',
  ANALYTICS = 'ANALYTICS'
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

export interface User {
  email: string;
  name: string;
}

export interface TutorialStep {
  targetId: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}
