"use client";

import { IconArrow } from "./Icons";
import { GOOGLE_MAPS_HREF } from "@/lib/chatbotKnowledge";
import { trackCta } from "@/lib/analytics";
import { useBookVisit } from "./BookVisitContext";

const WHATSAPP_HREF = "https://wa.me/919553395533";

/**
 * A quiet next step placed inside a section, at the moment the visitor has
 * just been convinced of something (the location, an answer they needed),
 * rather than only at the very bottom of the page.
 */
export default function SectionCtas({
  location,
  secondary,
}: {
  location: string;
  secondary: "directions" | "whatsapp";
}) {
  const { open } = useBookVisit();
  return (
    <div className="section-ctas" data-reveal>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          trackCta(location, "book_visit");
          open();
        }}
      >
        Book a Visit
        <IconArrow size={14} className="btn-arrow" />
      </button>
      {secondary === "directions" ? (
        <a
          className="btn-text"
          href={GOOGLE_MAPS_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCta(location, "directions")}
        >
          Get directions
          <IconArrow size={13} className="btn-arrow" />
        </a>
      ) : (
        <a
          className="btn-text"
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCta(location, "whatsapp")}
        >
          Ask an advisor on WhatsApp
          <IconArrow size={13} className="btn-arrow" />
        </a>
      )}
    </div>
  );
}
