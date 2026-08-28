import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Animations from "@/components/Animations";
import { FeaturedMediaCard } from "@/components/MediaCard";
import MediaGrid from "@/components/MediaGrid";
import { listPublishedMedia } from "@/lib/mediaStore";

// Media items are admin-editable in MongoDB — always read fresh, never
// statically prerender this page.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Media · Amaya Senior Living by Vera Vita",
  description:
    "In-depth reading on independent senior living, healthcare, residences and community life at Amaya, Medchal, Hyderabad.",
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Media · Amaya Senior Living",
    description:
      "In-depth reading on independent senior living, healthcare, residences and community life at Amaya, Medchal, Hyderabad.",
    type: "website",
    url: "/media",
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
    title: "Media · Amaya Senior Living",
    description:
      "In-depth reading on independent senior living, healthcare, residences and community life at Amaya, Medchal, Hyderabad.",
    images: ["/og-images/OG_Tag.png"],
  },
};

export default async function MediaPage() {
  const items = await listPublishedMedia();
  const [featured, ...rest] = items;

  return (
    <>
      <Nav />
      <main>
        <section className="legal-hero">
          <div className="container">
            <span className="eyebrow" data-reveal>
              Insights
            </span>
            <h1 className="legal-hero-title" data-reveal-line>
              <span className="line-mask">
                <span className="line-inner">Media</span>
              </span>
            </h1>
            <p className="legal-hero-sub" data-reveal data-delay="0.15">
              In-depth reading on independent living, healthcare, residences and community life at
              Amaya.
            </p>
          </div>
        </section>

        <section className="legal-page blog-page">
          <div className="container">
            {featured ? (
              <>
                <FeaturedMediaCard item={featured} />
                {rest.length > 0 && <MediaGrid items={rest} />}
              </>
            ) : (
              <p className="gallery-empty">More stories are coming soon.</p>
            )}
          </div>
        </section>
        <Footer />
      </main>
      <Animations />
    </>
  );
}
