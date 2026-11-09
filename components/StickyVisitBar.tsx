"use client";

import { useEffect, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { PHONE_HREF } from "@/lib/assets";
import { trackCta } from "@/lib/analytics";
import { useBookVisit } from "./BookVisitContext";

/**
 * Phones only (≤820px, where the nav hides its Book a Visit button):
 * a slim action bar that slides up once the visitor has scrolled past the
 * hero, so the next step is always one tap away instead of a long scroll
 * to the closing section. It steps aside again when that closing section
 * (#visit) or the footer is on screen, where the same actions already live.
 */
export default function StickyVisitBar() {
  const { open } = useBookVisit();
  const [pastHero, setPastHero] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = [document.querySelector("#visit"), document.querySelector("footer")].filter(
      Boolean
    ) as Element[];
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setNearEnd(visible.size > 0);
      },
      { threshold: 0.15 }
    );
    targets.forEach((t) => io.observe(t));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const shown = pastHero && !nearEnd;

  useEffect(() => {
    document.documentElement.classList.toggle("has-visit-bar", shown);
    return () => document.documentElement.classList.remove("has-visit-bar");
  }, [shown]);

  return (
    <div className={`visit-bar ${shown ? "is-shown" : ""}`} aria-hidden={!shown}>
      <button
        type="button"
        className="btn btn-primary visit-bar-book"
        tabIndex={shown ? 0 : -1}
        onClick={() => {
          trackCta("sticky_bar", "book_visit");
          open();
        }}
      >
        Book a Visit
      </button>
      <a
        className="visit-bar-call"
        href={PHONE_HREF}
        tabIndex={shown ? 0 : -1}
        aria-label="Call Amaya"
        onClick={() => trackCta("sticky_bar", "call")}
      >
        <FiPhone size={18} aria-hidden="true" />
        <span>Call</span>
      </a>
    </div>
  );
}
