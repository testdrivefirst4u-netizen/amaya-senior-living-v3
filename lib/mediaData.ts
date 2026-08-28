export type MediaStatus = "draft" | "published" | "scheduled";

export type MediaItem = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  /** Rich-text body, as HTML produced by the admin's TipTap editor. */
  content: string;
  featuredImage: string;
  featuredImageAlt: string;
  author: string;
  publishedDate: string; // ISO date, e.g. "2026-07-10"
  tags: string[];
  status: MediaStatus;
  /** Required when status is "scheduled" — ISO datetime it goes live. */
  scheduledDate?: string;
  featured?: boolean;
  seoTitle: string;
  seoDescription: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  socialTitle?: string;
  socialDescription?: string;
};
