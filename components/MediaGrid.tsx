"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MediaCard } from "./MediaCard";
import type { MediaItem } from "@/lib/mediaData";

const PAGE_SIZE = 6;

export default function MediaGrid({ items }: { items: MediaItem[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const gridRef = useRef<HTMLDivElement>(null);
  const prevVisible = useRef(PAGE_SIZE);
  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;

  // Cards get [data-reveal] (opacity: 0 by default) and are only animated to
  // visible by the page's one-time scroll-reveal scan in <Animations>, which
  // never sees cards added later by "Load More" — leaving them permanently
  // invisible. Animate newly-added cards in here instead.
  useEffect(() => {
    if (visible <= prevVisible.current || !gridRef.current) {
      prevVisible.current = visible;
      return;
    }
    const newCards = Array.from(
      gridRef.current.querySelectorAll<HTMLElement>("[data-reveal]")
    ).slice(prevVisible.current);
    prevVisible.current = visible;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(newCards, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      newCards,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 1.15, ease: "power3.out", stagger: 0.08 }
    );
  }, [visible]);

  return (
    <>
      <div className="blog-grid" ref={gridRef}>
        {shown.map((item, i) => (
          <MediaCard item={item} index={i % PAGE_SIZE} key={item.slug} />
        ))}
      </div>
      {hasMore && (
        <div className="articles-load-more">
          <button type="button" className="btn btn-secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load More
          </button>
        </div>
      )}
    </>
  );
}
