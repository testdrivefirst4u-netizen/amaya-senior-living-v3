import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Animations from "@/components/Animations";
import FaqsAccordion from "@/components/FaqsAccordion";

export const metadata: Metadata = {
  title: "Amaya Senior Living FAQs | Hyderabad",
  description:
    "Find answers about Amaya Senior Living residences, pricing, healthcare, amenities, location and community life in Hyderabad.",
  keywords: [
    "Amaya Senior Living FAQs",
    "Amaya senior living price",
    "Amaya Hyderabad price",
    "Amaya senior living facilities",
    "senior living Hyderabad FAQs",
    "Amaya residences",
    "Amaya location",
  ],
  alternates: { canonical: "/faqs" },
  openGraph: {
    title: "Frequently Asked Questions · Amaya Senior Living",
    description:
      "Answers to common questions about Amaya's independent senior-living residences, healthcare, pricing, visiting and location in Medchal, Hyderabad.",
    type: "website",
    url: "/faqs",
    images: [
      {
        url: "/og-images/OG_Tag.png",
        width: 1200,
        height: 628,
        alt: "Amaya by Vera Vita | Active Senior Living in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions · Amaya Senior Living",
    description:
      "Answers to common questions about Amaya's independent senior-living residences, healthcare, pricing, visiting and location in Medchal, Hyderabad.",
    images: ["/og-images/OG_Tag.png"],
  },
};

export default function FaqsPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="legal-hero">
          <div className="container">
            <span className="eyebrow" data-reveal>
              Support
            </span>
            <h1 className="legal-hero-title" data-reveal-line>
              <span className="line-mask">
                <span className="line-inner">Frequently Asked Questions</span>
              </span>
            </h1>
            <p className="legal-hero-sub" data-reveal data-delay="0.15">
              Answers to what families most want to know about Amaya. For
              anything else, our advisors are a call or WhatsApp away.
            </p>
          </div>
        </section>

        <section className="legal-page faqs-page">
          <div className="container">
            <div className="faqs-content">
              <FaqsAccordion />
            </div>
          </div>
        </section>
        <Footer />
      </main>
      <Animations />
    </>
  );
}
