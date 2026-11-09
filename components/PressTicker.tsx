import PressMark from "./press/PressMark";
import { TICKER_OUTLETS } from "@/lib/pressOutlets";

/**
 * "As seen in" band directly under the hero: the five most reputed outlets
 * that have covered Amaya, drifting slowly right-to-left.
 *
 * Pure CSS motion (no JS): the list is rendered four times and the track
 * moves by exactly half its length, so the loop is seamless at any width.
 * Hover or keyboard focus pauses it; with reduced motion it becomes a
 * static, centred row.
 */
export default function PressTicker({ variant = "home" }: { variant?: "home" | "media" }) {
  const sets = [0, 1, 2, 3];

  return (
    <section className={`press-ticker press-ticker--${variant}`} aria-label="As seen in">
      <div className="press-ticker-inner">
        <div className="press-ticker-head">
          <span className="press-ticker-label">As seen in</span>
          {variant === "home" && (
            // A plain link (full page load) rather than client-side routing,
            // so it always lands at the top of /media.
            <a href="/media" className="press-ticker-link">
              Read the coverage
            </a>
          )}
        </div>

        <div className="press-ticker-viewport">
          <ul className="press-ticker-track">
            {sets.map((s) =>
              TICKER_OUTLETS.map((o) => (
                <li
                  className={`press-ticker-item press-ticker-item--${o.mark}`}
                  key={`${s}-${o.id}`}
                  aria-hidden={s > 0 ? true : undefined}
                >
                  <PressMark outlet={o} decorative={s > 0} />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
