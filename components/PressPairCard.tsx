import Link from "next/link";
import { IconArrow } from "./Icons";
import MastheadPanel, { toneFor } from "./press/MastheadPanel";
import { hasTeluguScript } from "@/lib/richText";
import { pressHeadline, resolveOutlet } from "@/lib/pressOutlets";
import type { MediaItem } from "@/lib/mediaData";

export default function PressPairCard({ item, index = 0 }: { item: MediaItem; index?: number }) {
  const outlet = resolveOutlet(item);
  const { headline, usedExcerpt } = pressHeadline(item, outlet);
  const titleLang = hasTeluguScript(headline) ? "te" : undefined;

  return (
    <article className="pair-card" data-reveal data-delay={`${index * 0.1}`}>
      <Link href={`/media/${item.slug}`} className="card-media pair-media" aria-label={`Read the ${outlet.name} coverage`}>
        <MastheadPanel outlet={outlet} date={item.publishedDate} tone={toneFor(index + 1)} />
      </Link>
      <div className="pair-body">
        <div className="meta">
          <span>{outlet.name}</span>
        </div>
        <h3 className={`pair-title ${usedExcerpt ? "pair-title--summary" : ""}`} lang={titleLang}>
          <Link href={`/media/${item.slug}`}>{headline}</Link>
        </h3>
        {!usedExcerpt && (
          <div
            className="pair-excerpt"
            lang={titleLang}
            dangerouslySetInnerHTML={{ __html: item.excerpt }}
          />
        )}
        <Link href={`/media/${item.slug}`} className="btn-text pair-link">
          Read More
          <IconArrow size={13} className="btn-arrow" />
        </Link>
      </div>
    </article>
  );
}
