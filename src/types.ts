export type VideoCategory =
  | 'all'
  | 'short-form'
  | 'long-form'
  | 'gaming'
  | 'football'
  | 'ecommerce'
  | 'documentary'
  | 'color-grading'
  | 'anime'
  | 'ads';

export interface CategoryInfo {
  id: VideoCategory;
  name: string;
  description: string;
  iconName: string;
  count: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: VideoCategory;
  categoryLabel: string;
  client: string;
  clientAvatar?: string;
  thumbnailUrl: string;
  videoUrl: string; // MP4 or webm video stream
  youtubeId?: string; // Optional YouTube ID fallback/embed
  duration: string;
  aspectRatio: '9:16' | '16:9' | '1:1';
  metrics: {
    views: string;
    retention: string;
    conversion?: string;
    likes?: string;
  };
  tools: string[];
  description: string;
  keyFeatures: string[];
  soundDesignHighlights: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  featured?: boolean;
}

export interface ColorGradingPreset {
  id: string;
  name: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  lutUsed: string;
  cameraFormat: string;
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  channelType: string;
  subscribersOrReach: string;
  avatar: string;
  comment: string;
  rating: number;
  featuredVideoTitle: string;
  metricAchieved: string;
}

export interface ProjectQuoteState {
  videoType: VideoCategory;
  quantity: number;
  turnaround: 'standard' | 'express' | 'rush';
  addOns: string[];
  customNote: string;
}
