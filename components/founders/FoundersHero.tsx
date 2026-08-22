import { ASSETS } from "@/lib/assets";

export default function FoundersHero() {
  return (
    <section className="fd-hero">
      {/* <div className="fd-hero-media" data-reveal-scale>
        <picture>
          <source
            media="(max-width: 820px)"
            srcSet={ASSETS.foundersMobile}
          />
          <img
            src={ASSETS.foundersDesktop}
            alt="Tanay Saboo, Dhruv Badruka and Arudradev Rao, the founders of Vera Vita"
            data-parallax
            loading="eager"
          />
        </picture>
        <div className="fd-hero-scrim" />
      </div> */}

      <div className="fd-hero-inner container">
        <span className="fd-hero-eyebrow" data-reveal>
          The People Behind Vera Vita
        </span>
        <h1 className="fd-hero-title" data-reveal-line>
          <span className="line-mask">
            <span className="line-inner">The People Behind</span>
          </span>
          <span className="line-mask">
            <span className="line-inner">Vera Vita</span>
          </span>
        </h1>
        <p className="fd-hero-sub" data-reveal data-delay="0.15">
          Three families. Three complementary strengths. One shared vision.
        </p>
      </div>
    </section>
  );
}
