import PressMark from "./PressMark";
import { formatDate } from "../BlogCard";
import type { Outlet } from "@/lib/pressOutlets";

export type PanelTone = "navy" | "limestone" | "mist";

/**
 * Replaces the low-resolution article screenshots on /media with a calm,
 * typographic plate: the publication's masthead set large on an Amaya
 * colour field, framed by a fine brass hairline.
 */
export default function MastheadPanel({
  outlet,
  date,
  tone = "navy",
  kicker = "As featured in",
  className = "",
}: {
  outlet: Outlet;
  date?: string;
  tone?: PanelTone;
  kicker?: string;
  className?: string;
}) {
  const shape = outlet.mark ? `masthead-panel--${outlet.mark}` : "masthead-panel--type";
  return (
    <div className={`masthead-panel masthead-panel--${tone} ${shape} ${className}`}>
      <span className="mp-frame" aria-hidden="true" />
      <span className="mp-kicker">{kicker}</span>
      <span className="mp-mark">
        <PressMark outlet={outlet} />
      </span>
      {date && (
        <span className="mp-foot">
          <time dateTime={date}>{formatDate(date)}</time>
        </span>
      )}
    </div>
  );
}

/** Secondary plates share one warm limestone field so they read as a set;
 * only the lead story sits on navy. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const toneFor = (_i: number): PanelTone => "limestone";
