import Link from "next/link";
import { IconArrow } from "./Icons";
import type { BlogPost } from "@/lib/blogData";
import { ikTransform, IK_CARD } from "@/lib/imagekitUrl";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <article className="blog-card" data-reveal data-delay={`${index * 0.08}`}>
      <Link href={`/blogs/${post.slug}`} className="blog-card-media" aria-label={post.title}>
        <img src={ikTransform(post.featuredImage, IK_CARD)} alt={post.featuredImageAlt} loading="lazy" />
      </Link>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-card-category">{post.category}</span>
          <span className="blog-card-date">{formatDate(post.publishedDate)}</span>
        </div>
        <h3 className="blog-card-title">
          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
        </h3>
        <div className="blog-card-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        <Link href={`/blogs/${post.slug}`} className="btn-text blog-card-link">
          Read More
          <IconArrow size={14} className="btn-arrow" />
        </Link>
      </div>
    </article>
  );
}

export function FeaturedBlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-featured" data-reveal-fade>
      <Link href={`/blogs/${post.slug}`} className="blog-featured-media" aria-label={post.title}>
        <img src={ikTransform(post.featuredImage, IK_CARD)} alt={post.featuredImageAlt} loading="eager" />
      </Link>
      <div className="blog-featured-body">
        <div className="blog-card-meta">
          <span className="blog-card-category">{post.category}</span>
          <span className="blog-card-date">{formatDate(post.publishedDate)}</span>
        </div>
        <h2 className="blog-featured-title">
          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
        </h2>
        <div className="blog-featured-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        <Link href={`/blogs/${post.slug}`} className="btn btn-primary">
          Read More
          <IconArrow size={16} className="btn-arrow" />
        </Link>
      </div>
    </article>
  );
}

export { formatDate };
