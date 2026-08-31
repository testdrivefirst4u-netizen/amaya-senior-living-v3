import FounderPortrait from "./FounderPortrait";

export default function FoundersIntro() {
  return (
    <section className="section fd-intro">
      <div className="container">
        <div className="fd-intro-grid">
          <h2 className="fd-intro-heading" data-reveal-line>
            <span className="line-mask">
              <span className="line-inner">Three friends.</span>
            </span>
            <span className="line-mask">
              <span className="line-inner">
                <em>One shared purpose.</em>
              </span>
            </span>
          </h2>

          <div className="fd-intro-copy" data-reveal data-delay="0.1">
            <p>
              Vera Vita was not created around an opportunity. It was created
              around a conviction: that India&rsquo;s next generation of
              senior living deserves the same long-term thinking that builds
              enduring institutions.
            </p>
            <p>
              Three respected Hyderabad families bring together different
              histories, complementary disciplines and shared values. Their
              industries differ. Their values do not.
            </p>
          </div>
        </div>

        <div className="fd-intro-photo frame" data-reveal-scale>
          <FounderPortrait
            name="Tanay Saboo, Dhruv Badruka & Arudradev Rao"
            src="/founders/founders-Desktop-1760-1173px.webp"
            mobileSrc="/founders/founders-Mobile-780-520px.webp"
            alt="Tanay Saboo, Dhruv Badruka and Arudradev Rao, the founders of Vera Vita"
          />
        </div>
      </div>
    </section>
  );
}
