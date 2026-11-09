import { PRESS_MARKS } from "@/lib/pressMarks";
import { hasTeluguScript } from "@/lib/richText";
import type { Outlet } from "@/lib/pressOutlets";

/**
 * An outlet's masthead in a single colour (currentColor).
 * Outlets with a traced vector mark render it; everyone else gets a typeset
 * masthead in Cormorant small caps so the whole set stays homogeneous.
 */
export default function PressMark({
  outlet,
  className = "",
  decorative = false,
}: {
  outlet: Outlet;
  className?: string;
  /** Hide from assistive tech when the outlet name is already in nearby text. */
  decorative?: boolean;
}) {
  const a11y = decorative ? { "aria-hidden": true as const } : { role: "img", "aria-label": outlet.name };

  if (outlet.mark) {
    const m = PRESS_MARKS[outlet.mark];
    return (
      <svg
        className={`press-mark press-mark--${outlet.mark} ${className}`}
        viewBox={m.viewBox}
        fill="currentColor"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        {...a11y}
        dangerouslySetInnerHTML={{ __html: m.body }}
      />
    );
  }

  return (
    <span
      className={`press-mark press-mark--type ${className}`}
      lang={hasTeluguScript(outlet.name) ? "te" : undefined}
      {...a11y}
    >
      {outlet.name}
    </span>
  );
}
