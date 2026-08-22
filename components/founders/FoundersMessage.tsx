

const FOUNDERS = ["Dhruv Badruka", "J. Arudradev Rao", "Tanay Saboo"];

export default function FoundersMessage() {
  return (
    <section className="section founders" id="founders">
      <div className="container">
        <div className="founders-head">
          <span className="eyebrow" data-reveal> A Note from the Founders
          </span>
          <h2 className="h2 founders-title" data-reveal-line>
            <span className="line-mask">
              <span className="line-inner">
                Built for the people <em>we love.</em>
              </span>
            </span>
          </h2>
          <p className="founders-intro" data-reveal data-delay="0.15">
            Thank you for taking the time to learn about Amaya.
          </p>
        </div>

        <div className="founders-note" data-reveal data-delay="0.2">
          <p>
            We began with a simple question: what should life feel like when there is finally time to live more fully? From seniors, families and experts, we heard the same answer: independent, connected and supported; never managed.
          </p>
          <p>
            That belief shapes every part of Amaya, from the homes and healthcare to dining and daily life. We are building a lasting community we would be proud to have our own families call home.
            <em> <br />We look forward to welcoming you.</em>
          </p>
        </div>

        <div className="founders-signs" data-reveal data-delay="0.3">
          {FOUNDERS.map((name) => (
            <div className="founders-sign" key={name}>
              <span className="founders-sign-name">{name}</span>
              <span className="founders-sign-title">
                Founder &middot; Vera Vita
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
