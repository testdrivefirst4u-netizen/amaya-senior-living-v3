import Link from "next/link";
import { IconArrow } from "./Icons";
import type { MediaItem } from "@/lib/mediaData";
import { formatDate } from "./BlogCard";
import { ikTransform, IK_CARD } from "@/lib/imagekitUrl";

export function MediaCard({ item, index = 0 }: { item: MediaItem; index?: number }) {
  return (
    <article className="blog-card" data-reveal data-delay={`${index * 0.08}`}>
      <Link href={`/media/${item.slug}`} className="blog-card-media" aria-label={item.title}>
        <img src={ikTransform(item.featuredImage, IK_CARD)} alt={item.featuredImageAlt} loading="lazy" />
        {item.featured && <span className="blog-card-featured-badge">Featured</span>}
      </Link>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-card-category">{item.category}</span>
          <span className="blog-card-date">{formatDate(item.publishedDate)}</span>
        </div>
        <h3 className="blog-card-title">
          <Link href={`/media/${item.slug}`}>{item.title}</Link>
        </h3>
        <div className="blog-card-excerpt" dangerouslySetInnerHTML={{ __html: item.excerpt }} />
        {item.author && <span className="blog-card-author">By {item.author}</span>}
        <Link href={`/media/${item.slug}`} className="btn-text blog-card-link">
          Read More
          <IconArrow size={14} className="btn-arrow" />
        </Link>
      </div>
    </article>
  );
}

export function FeaturedMediaCard({ item }: { item: MediaItem }) {
  return (
    <article className="blog-featured" data-reveal-fade>
      <Link href={`/media/${item.slug}`} className="blog-featured-media" aria-label={item.title}>
        <img src={ikTransform(item.featuredImage, IK_CARD)} alt={item.featuredImageAlt} loading="eager" />
        {item.featured && <span className="blog-card-featured-badge">Featured</span>}
      </Link>
      <div className="blog-featured-body">
        <div className="blog-card-meta">
          <span className="blog-card-category">{item.category}</span>
          <span className="blog-card-date">{formatDate(item.publishedDate)}</span>
        </div>
        <h2 className="blog-featured-title">
          <Link href={`/media/${item.slug}`}>{item.title}</Link>
        </h2>
        <div className="blog-featured-excerpt" dangerouslySetInnerHTML={{ __html: item.excerpt }} />
        {item.author && <span className="blog-card-author">By {item.author}</span>}
        <Link href={`/media/${item.slug}`} className="btn btn-primary">
          Read More
          <IconArrow size={16} className="btn-arrow" />
        </Link>
      </div>
    </article>
  );
}
