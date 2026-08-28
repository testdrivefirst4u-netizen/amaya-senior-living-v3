"use client";

import { useState } from "react";
import { MediaCard } from "./MediaCard";
import type { MediaItem } from "@/lib/mediaData";

const PAGE_SIZE = 6;

export default function MediaGrid({ items }: { items: MediaItem[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;

  return (
    <>
      <div className="blog-grid">
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
