import Link from "next/link";
import { IconArrow } from "./Icons";
import { formatDate } from "./BlogCard";
import MastheadPanel, { toneFor } from "./press/MastheadPanel";
import { ikTransform, IK_CARD } from "@/lib/imagekitUrl";
import { hasTeluguScript } from "@/lib/richText";
import { pressHeadline, resolveOutlet } from "@/lib/pressOutlets";
import type { MediaItem } from "@/lib/mediaData";

export function MediaCard({ item, index = 0 }: { item: MediaItem; index?: number }) {
  const outlet = resolveOutlet(item);
  const { headline, usedExcerpt } = pressHeadline(item, outlet);
  const titleLang = hasTeluguScript(headline) ? "te" : undefined;

  return (
    <article className="blog-card" data-reveal data-delay={`${index * 0.08}`}>
      <Link href={`/media/${item.slug}`} className="blog-card-media" aria-label={`Read the ${outlet.name} coverage`}>
        {item.featuredImage ? (
          <img src={ikTransform(item.featuredImage, IK_CARD)} alt={item.featuredImageAlt} loading="lazy" />
        ) : (
          <MastheadPanel outlet={outlet} tone={toneFor(index)} />
        )}
        {item.featured && <span className="blog-card-featured-badge">Featured</span>}
      </Link>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-card-category">{outlet.name}</span>
          <span className="blog-card-date">{formatDate(item.publishedDate)}</span>
        </div>
        <h3 className={`blog-card-title ${usedExcerpt ? "blog-card-title--summary" : ""}`} lang={titleLang}>
          <Link href={`/media/${item.slug}`}>{headline}</Link>
        </h3>
        {!usedExcerpt && (
          <div
            className="blog-card-excerpt"
            lang={titleLang}
            dangerouslySetInnerHTML={{ __html: item.excerpt }}
          />
        )}
        <Link href={`/media/${item.slug}`} className="btn-text blog-card-link">
          Read More
          <IconArrow size={14} className="btn-arrow" />
        </Link>
      </div>
    </article>
  );
}
