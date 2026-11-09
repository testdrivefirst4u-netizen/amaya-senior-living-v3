"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { IconArrow } from "./Icons";
import { formatDate } from "./BlogCard";
import PressMark from "./press/PressMark";
import { hasTeluguScript, stripHtml } from "@/lib/richText";
import type { MediaItem } from "@/lib/mediaData";
import { groupSyndicated, pressHeadline } from "@/lib/pressOutlets";

const PAGE_SIZE = 6;

/** "Elsewhere in the press": a typographic list. Each row carries the
 * outlet's masthead, and wire stories republished by several outlets on the
 * same day are folded into one row that lists every outlet. */
export default function PressIndex({ items }: { items: MediaItem[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const listRef = useRef<HTMLDivElement>(null);
  const prevVisible = useRef(PAGE_SIZE);
  const groups = groupSyndicated(items);
  const shown = groups.slice(0, visible);
  const hasMore = visible < groups.length;

  // Rows added after the initial scroll-reveal scan never get animated in
  // on their own, so animate newly-shown rows in by hand.
  useEffect(() => {
    if (visible <= prevVisible.current || !listRef.current) {
      prevVisible.current = visible;
      return;
    }
    const newRows = Array.from(
      listRef.current.querySelectorAll<HTMLElement>("[data-reveal]")
    ).slice(prevVisible.current);
    prevVisible.current = visible;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(newRows, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      newRows,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 1.15, ease: "power3.out", stagger: 0.08 }
    );
  }, [visible]);

  if (items.length === 0) return null;

  return (
    <>
      <div className="index-list" ref={listRef}>
        {shown.map((g) => {
          if (g.kind === "syndicated") {
            return (
              <div className="index-row index-row--group" key={g.key} data-reveal>
                <div className="index-inner">
                  <div className="index-source">
                    <span className="index-pub">Syndicated</span>
                    <span className="index-date">
                      <time dateTime={g.date}>{formatDate(g.date)}</time>
                      {" "}&middot; {g.entries.length} outlets
                    </span>
                  </div>
                  <div>
                    <h3 className="index-headline">{g.summary}</h3>
                    <ul className="index-outlets" aria-label="Published by">
                      {g.entries.map(({ item, outlet }) => (
                        <li key={item.slug}>
                          <Link href={`/media/${item.slug}`}>{outlet.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span aria-hidden="true" />
                </div>
              </div>
            );
          }

          const { item, outlet } = g;
          const { headline, usedExcerpt } = pressHeadline(item, outlet);
          const titleLang = hasTeluguScript(headline) ? "te" : undefined;
          return (
            <Link
              key={item.slug}
              className="index-row"
              href={`/media/${item.slug}`}
              data-reveal
            >
              <div className="index-inner">
                <div className="index-source">
                  {outlet.mark ? (
                    <span className={`index-mark index-mark--${outlet.mark}`}>
                      <PressMark outlet={outlet} />
                    </span>
                  ) : (
                    <span className="index-pub" lang={hasTeluguScript(outlet.name) ? "te" : undefined}>
                      {outlet.name}
                    </span>
                  )}
                  <span className="index-date">
                    <time dateTime={item.publishedDate}>{formatDate(item.publishedDate)}</time>
                  </span>
                </div>
                <div>
                  <h3 className={`index-headline ${usedExcerpt ? "index-headline--summary" : ""}`} lang={titleLang}>
                    {headline}
                  </h3>
                  {!usedExcerpt && (
                    <p className="index-excerpt" lang={titleLang}>{stripHtml(item.excerpt)}</p>
                  )}
                </div>
                <IconArrow size={20} className="index-arrow" />
              </div>
            </Link>
          );
        })}
      </div>

      {hasMore && (
        <div className="articles-load-more">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
