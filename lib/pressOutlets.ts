import type { MarkId } from "./pressMarks";
import { mediaSource, type MediaItem } from "./mediaData";
import { stripHtml } from "./richText";

/**
 * Who published a media item, resolved from the item itself rather than from
 * the admin's free-text `author` field (which often holds a journalist's name,
 * "Team Amaya" or a founder's name instead of the publication).
 *
 * `rank` orders outlets by national reputation: lower is more reputed. The
 * five with a vector `mark` are the ones shown in the homepage "As seen in"
 * ticker and as full mastheads on /media.
 */
export type Outlet = {
  id: string;
  name: string;
  rank: number;
  mark?: MarkId;
  /** Tested against the slug first, then the title, author and category. */
  match: RegExp;
  /** Script for typeset (non-mark) mastheads, e.g. Telugu or Hindi editions. */
  lang?: string;
};

export const OUTLETS: Outlet[] = [
  { id: "toi", name: "The Times of India", rank: 1, mark: "toi", match: /times[- ]of[- ]india|\btoi\b/i },
  { id: "et", name: "The Economic Times", rank: 2, mark: "et", match: /economic[- ]times/i },
  { id: "bs", name: "Business Standard", rank: 3, mark: "bs", match: /business[- ]standard/i },
  { id: "cnbc", name: "CNBC-TV18", rank: 4, mark: "cnbc", match: /cnbc/i },
  { id: "bt", name: "Business Today", rank: 5, mark: "bt", match: /business[- ]today/i },
  { id: "news18-telugu", name: "News18 Telugu", rank: 7, match: /news18[- ]telugu/i },
  { id: "news18", name: "News18", rank: 6, match: /news18/i },
  { id: "theprint", name: "ThePrint", rank: 8, match: /theprint|the print/i },
  { id: "tribune", name: "The Tribune", rank: 9, match: /the[- ]tribune(?![- ]times)/i },
  { id: "businessworld", name: "BusinessWorld", rank: 10, match: /businessworld/i },
  { id: "express-healthcare", name: "Express Healthcare", rank: 11, match: /express[- ]healthcare/i },
  { id: "ani", name: "ANI News", rank: 12, match: /\bani[- ]news\b/i },
  { id: "uni", name: "United News of India", rank: 13, match: /united news of india|\buni\b|rs-600-cr$/i },
  { id: "telangana-today", name: "Telangana Today", rank: 14, match: /telangana[- ]today|enters-indias-premium-senior-living-sector/i },
  { id: "andhra-jyothy", name: "Andhra Jyothy", rank: 15, match: /andhra[- ]jyothy/i },
  { id: "v6", name: "V6 Velugu", rank: 16, match: /v6[- ]velugu/i },
  { id: "latestly", name: "LatestLY", rank: 17, match: /latestly/i },
  { id: "bif", name: "BIF Today", rank: 18, match: /bif[- ]today/i },
  { id: "v3", name: "V3 News", rank: 19, match: /v3[- ]news/i },
  { id: "hybiztv", name: "HYBIZTV", rank: 20, match: /hybiz/i },
  { id: "proppuls", name: "Property Pulse", rank: 21, match: /proppul|property pulse/i },
  { id: "abn", name: "ABN Fashion & Lifestyle", rank: 22, match: /abn[- ]fashion/i },
  { id: "iet", name: "Indian Economic Observer", rank: 23, match: /indian[- ]economic[- ]observer/i },
  { id: "ito", name: "India Times Online", rank: 24, match: /india[- ]times[- ]online/i },
  { id: "knn", name: "Karnataka News Network", rank: 25, match: /karnataka[- ]news/i },
  { id: "and", name: "Andhra News Digest", rank: 26, match: /andhra[- ]news[- ]digest/i },
  { id: "itt", name: "India Tribune Times", rank: 27, match: /india[- ]tribune[- ]times/i },
  { id: "ibl", name: "India Bulletin Live", rank: 28, match: /india[- ]bulletin/i },
];

/** The five outlets shown in the homepage ticker, most reputed first. */
export const TICKER_OUTLETS = OUTLETS.filter((o) => o.mark).sort((a, b) => a.rank - b.rank);

const BY_ID = new Map(OUTLETS.map((o) => [o.id, o]));
export const outletById = (id: string) => BY_ID.get(id);

type ItemLike = Pick<MediaItem, "slug" | "title" | "author" | "category">;

/** Bylines that are people or Amaya itself, never a publication. */
const NOT_AN_OUTLET = /^(team amaya|amaya senior living|arudradev rao|dhruv badruka|tanay saboo)$/i;

export function resolveOutlet(item: ItemLike): Outlet {
  const fields = [item.slug, item.title, item.author, item.category];
  for (const field of fields) {
    if (!field) continue;
    const hit = OUTLETS.find((o) => o.match.test(field));
    if (hit) return hit;
  }
  // Unknown outlet: fall back to the admin's source field, and if that is a
  // person or Amaya itself, to the title.
  const source = mediaSource(item);
  const name = source && !NOT_AN_OUTLET.test(source.trim()) ? source : item.title;
  return { id: `x-${item.slug}`, name, rank: 99, match: /$^/ };
}

const squash = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");

/**
 * Most items use the outlet's name as their title, which repeats the
 * masthead right above it. When that happens, use the summary instead so the
 * reader learns what the coverage was actually about.
 */
export function pressHeadline(item: Pick<MediaItem, "title" | "excerpt">, outlet: Outlet): {
  headline: string;
  usedExcerpt: boolean;
} {
  const title = item.title?.trim() ?? "";
  const titleIsOutlet = !title || squash(title) === squash(outlet.name) || squash(outlet.name).includes(squash(title));
  if (!titleIsOutlet) return { headline: title, usedExcerpt: false };
  return { headline: stripHtml(item.excerpt || "").trim() || outlet.name, usedExcerpt: true };
}

export type PressGroup =
  | { kind: "single"; item: MediaItem; outlet: Outlet }
  | { kind: "syndicated"; key: string; date: string; summary: string; entries: { item: MediaItem; outlet: Outlet }[] };

/**
 * One wire story (e.g. an ANI release) is often republished by many outlets
 * on the same day, and listing each copy reads as padding. Items published on
 * the same date whose summaries match once the outlet's own name is removed
 * are folded into a single "syndicated" row (when there are three or more).
 */
export function groupSyndicated(items: MediaItem[]): PressGroup[] {
  // Summaries follow "<Outlet> (<wire>) covers|features …"; everything from
  // the verb on is the story itself, whichever outlet carried it.
  const story = (raw: string) => {
    const m = raw.match(/\b(covers|features|reports on)\b\s*(.*)$/i);
    return m ? m[2] : raw;
  };
  const keyed = items.map((item) => {
    const outlet = resolveOutlet(item);
    const text = story(stripHtml(item.excerpt || ""));
    return { item, outlet, key: `${item.publishedDate}|${squash(text).slice(0, 90)}` };
  });

  const counts = new Map<string, number>();
  keyed.forEach((k) => counts.set(k.key, (counts.get(k.key) ?? 0) + 1));

  const out: PressGroup[] = [];
  const seen = new Map<string, Extract<PressGroup, { kind: "syndicated" }>>();
  for (const k of keyed) {
    if ((counts.get(k.key) ?? 0) < 3) {
      out.push({ kind: "single", item: k.item, outlet: k.outlet });
      continue;
    }
    let group = seen.get(k.key);
    if (!group) {
      const summary = story(stripHtml(k.item.excerpt || "")).replace(/^./, (c) => c.toUpperCase());
      group = { kind: "syndicated", key: k.key, date: k.item.publishedDate, summary, entries: [] };
      seen.set(k.key, group);
      out.push(group);
    }
    group.entries.push({ item: k.item, outlet: k.outlet });
  }
  for (const g of seen.values()) g.entries.sort((a, b) => a.outlet.rank - b.outlet.rank);
  return out;
}
