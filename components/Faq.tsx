"use client";

import { useState } from "react";
import { IconPlus } from "./Icons";

const FAQS = [
  {
    q: "Is Amaya a care home or assisted living?",
    a: "Neither. Amaya is an independent senior-living community where you live in a home of your own, with healthcare and everyday support available when needed and never imposed.",
  },
  {
    q: "What healthcare support is available?",
    a: "A resident doctor, round-the-clock nursing, physiotherapy and emergency-response support keep care close at hand. Specialist consultations, pharmacy access and hospital coordination are also planned.",
  },
  {
    q: "What does a typical day at Amaya look like?",
    a: "There is no fixed timetable. Residents may choose from wellness, recreation, dining and social activities, or simply enjoy the privacy of home.",
  },
  {
    q: "What residence sizes are available?",
    a: "Amaya offers five layouts, from a 1,015.72 sq. ft. 1 BHK to a 2,455.89 sq. ft. 3.5 BHK. Each is planned around light, privacy and easy movement.",
  },
  {
    q: "Can family visit or stay?",
    a: "Yes. Guest suites, hospitality services and shared spaces make it easy to welcome family and spend meaningful time together.",
  },
  {
    q: "What services are available?",
    a: "Amaya brings together hospitality, healthcare, dining, housekeeping, security, concierge and lifestyle services. Certain personalised services may be chargeable.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section faq" id="faq">
      <div className="container">
        <div className="faq-grid">
          <div className="faq-head">
            <span className="eyebrow" data-reveal>
              07 &middot; Questions
            </span>
            <h2 className="h2" data-reveal-line>
              <span className="line-mask">
                <span className="line-inner">Everything you may</span>
              </span>
              <span className="line-mask">
                <span className="line-inner">
                  <em>want to know.</em>
                </span>
              </span>
            </h2>
            <p className="lead" data-reveal data-delay="0.15">
              Everything families most want to know, answered plainly. For
              anything else, our advisors are a call away.
            </p>
          </div>

          <div className="faq-list" data-reveal data-delay="0.15">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={f.q}>
                  <button
                    className="faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq-toggle">
                      <IconPlus size={18} />
                    </span>
                  </button>
                  <div className="faq-a" aria-hidden={!isOpen}>
                    <p>{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
