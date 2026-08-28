"use client";

import { useState } from "react";
import { IconPlus } from "./Icons";
import { FAQS, CHATBOT_ONLY_FAQS, FAQ_CATEGORY_ORDER, type FaqEntry } from "@/lib/faqData";

const ALL_FAQS: FaqEntry[] = [...FAQS, ...CHATBOT_ONLY_FAQS];

function groupByCategory(items: FaqEntry[]) {
  const groups = new Map<string, FaqEntry[]>();
  for (const item of items) {
    const category = item.category ?? "Other";
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category)!.push(item);
  }
  return FAQ_CATEGORY_ORDER.filter((c) => groups.has(c)).map((c) => ({
    category: c,
    items: groups.get(c)!,
  }));
}

export default function FaqsAccordion() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const categories = groupByCategory(ALL_FAQS);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="faqs-categories">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {categories.map(({ category, items }, ci) => (
        <section
          className="faqs-category"
          key={category}
          aria-labelledby={`faq-cat-${ci}`}
          data-reveal-fade
        >
          <h2 className="faqs-category-title" id={`faq-cat-${ci}`}>
            {category}
          </h2>
          <div className="faq-list">
            {items.map((f, i) => {
              const key = `${category}-${i}`;
              const isOpen = openKey === key;
              return (
                <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={f.q}>
                  <h3>
                    <button
                      className="faq-q"
                      aria-expanded={isOpen}
                      onClick={() => setOpenKey(isOpen ? null : key)}
                    >
                      <span>{f.q}</span>
                      <span className="faq-toggle">
                        <IconPlus size={18} />
                      </span>
                    </button>
                  </h3>
                  <div className="faq-a" aria-hidden={!isOpen}>
                    <p>{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
