const SUMMARY = [
  { name: "Tanay Saboo", role: "Capital & Strategy" },
  { name: "Dhruv Badruka", role: "Development & Execution" },
  { name: "Arudradev Rao", role: "Brand & Experience" },
];

export default function FoundersIntro() {
  return (
    <section className="section fd-intro">
      <div className="container">
        <div className="fd-intro-grid">
          <h2 className="fd-intro-heading" data-reveal-line>
            <span className="line-mask">
              <span className="line-inner">Three families.</span>
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

        <div className="fd-intro-rows" data-reveal data-delay="0.15">
          {SUMMARY.map((f) => (
            <div className="fd-intro-row" key={f.name}>
              <span className="fd-intro-row-name">{f.name}</span>
              <span className="fd-intro-row-role">{f.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
