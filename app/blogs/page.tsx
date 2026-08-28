import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Animations from "@/components/Animations";
import { BlogCard, FeaturedBlogCard } from "@/components/BlogCard";
import { listBlogPosts } from "@/lib/blogStore";

// Blog posts are admin-editable in MongoDB — always read fresh, never
// statically prerender this page.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blogs · Amaya Senior Living by Vera Vita",
  description:
    "Stories and guides on independent senior living, healthcare, residences, community and life at Amaya, Medchal, Hyderabad.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Blogs · Amaya Senior Living",
    description:
      "Stories and guides on independent senior living, healthcare, residences, community and life at Amaya, Medchal, Hyderabad.",
    type: "website",
    url: "/blogs",
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
    title: "Blogs · Amaya Senior Living",
    description:
      "Stories and guides on independent senior living, healthcare, residences, community and life at Amaya, Medchal, Hyderabad.",
    images: ["/og-images/OG_Tag.png"],
  },
};

export default async function BlogsPage() {
  const posts = await listBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Nav />
      <main>
        <section className="legal-hero">
          <div className="container">
            <span className="eyebrow" data-reveal>
              Journal
            </span>
            <h1 className="legal-hero-title" data-reveal-line>
              <span className="line-mask">
                <span className="line-inner">Blogs</span>
              </span>
            </h1>
            <p className="legal-hero-sub" data-reveal data-delay="0.15">
              Stories and guides on independent living, healthcare, residences
              and community life at Amaya.
            </p>
          </div>
        </section>

        <section className="legal-page blog-page">
          <div className="container">
            {featured ? (
              <>
                <FeaturedBlogCard post={featured} />
                {rest.length > 0 && (
                  <div className="blog-grid">
                    {rest.map((post, i) => (
                      <BlogCard post={post} index={i} key={post.slug} />
                    ))}
                  </div>
                )}
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
