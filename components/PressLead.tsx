import Link from "next/link";
import { IconArrow } from "./Icons";
import MastheadPanel from "./press/MastheadPanel";
import { hasTeluguScript } from "@/lib/richText";
import { pressHeadline, resolveOutlet } from "@/lib/pressOutlets";
import type { MediaItem } from "@/lib/mediaData";

/** The /media lead story: the publication's masthead set large on navy,
 * with the coverage summarised beside it. When the admin title is just the
 * outlet's name, the summary becomes the headline (see pressHeadline). */
export default function PressLead({ item }: { item: MediaItem }) {
  const outlet = resolveOutlet(item);
  const { headline, usedExcerpt } = pressHeadline(item, outlet);
  const titleLang = hasTeluguScript(headline) ? "te" : undefined;

  return (
    <article className="lead-story">
      <Link
        href={`/media/${item.slug}`}
        className="card-media lead-media"
        aria-label={`Read the ${outlet.name} coverage`}
        data-reveal-scale
      >
        <MastheadPanel outlet={outlet} date={item.publishedDate} tone="navy" kicker="Featured in" />
      </Link>
      <div data-reveal data-delay="0.1">
        <div className="meta">
          <span>Featured</span>
          <span className="meta-dot" />
          <span style={{ letterSpacing: ".06em" }}>{outlet.name}</span>
        </div>
        <h2 className={`lead-title ${usedExcerpt ? "lead-title--summary" : ""}`} lang={titleLang}>
          <Link href={`/media/${item.slug}`}>{headline}</Link>
        </h2>
        {!usedExcerpt && (
          <div
            className="lead-excerpt"
            lang={titleLang}
            dangerouslySetInnerHTML={{ __html: item.excerpt }}
          />
        )}
        <div className="lead-cta">
          <Link href={`/media/${item.slug}`} className="btn btn-primary">
            Read the coverage
            <IconArrow size={14} className="btn-arrow" />
          </Link>
        </div>
      </div>
    </article>
  );
}
