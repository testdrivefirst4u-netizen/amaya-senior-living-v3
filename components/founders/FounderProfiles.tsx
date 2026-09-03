import { ASSETS } from "@/lib/assets";
import FounderPortrait from "./FounderPortrait";

const FOUNDERS = [
  {
    name: "Dhruv Badruka",
    desktopSrc: ASSETS.founderDhruvDesktop,
    mobileSrc: ASSETS.founderDhruvMobile,
    role: "01 · Development & Execution",
    quote: "Quality is not a checkpoint. It is built into the process, from structure to spirit.",
    bio: "An MBA from London Business School, built on engineering. At Northstar Group he led development across 250 acres and 150,000 sq ft under construction. He knows what good building takes.",
    experience:
      "Northstar Group, Director of Business Development · Badruka College of Information Technology, Board Member · Hewlett Packard, Research Engineer",
    education: "MBA, London Business School · Owner Management Programme, SP Jain · B.Tech (IT), VIT",
    focus: ["Development", "Execution", "Deal structuring", "Community building"],
  },
  {
    name: "Tanay Saboo",
    desktopSrc: ASSETS.founderTanayDesktop,
    mobileSrc: ASSETS.founderTanayMobile,
    role: "02 · Capital & Strategy",
    quote: "The greatest investments compound over decades, not quarters.",
    bio: "Tanay is a Chartered Accountant and holds an MBA from London Business School. His career spans institutional finance and entrepreneurship — from audit and public markets to private equity and mobility — building a long-term view on capital allocation along the way. To Vera Vita he brings the discipline of patient capital: rigour, governance, and a deep interest in healthcare and longevity.",
    experience:
      "Saboo Group, Chief Growth Officer and Director · Mobility Impact Partners, New York · Stratford House, London · Purnartha · Ernst & Young",
    education: "MBA, London Business School · Chartered Accountancy, ICAI · B.Com, HR College",
    focus: ["Capital allocation", "Governance", "Growth strategy", "Healthcare and longevity"],
  },
  {
    name: "Arudradev Rao",
    desktopSrc: ASSETS.founderArudradevDesktop,
    mobileSrc: ASSETS.founderArudradevMobile,
    role: "03 · Brand & Experience",
    quote: "Every business is a people business, eventually.",
    bio: "A Wholetime Director at Orient BlackSwan, with a decade in education and publishing. He founded RNC Polymers out of college and exited it. He builds around people and long relationships.",
    experience:
      "Vera Vita, Founder · Orient BlackSwan, Wholetime Director · RNC Polymers, Managing Partner",
    education: "PGP (MFAB), Indian School of Business · Owner Manager Programme, SPJIMR · FLAME University",
    focus: ["Brand", "Experience", "Community", "Hospitality"],
  },
];

export default function FounderProfiles() {
  return (
    <section className="section">
      <div className="container">
        {FOUNDERS.map((f) => (
          <article className="fd-profile" key={f.name}>
            <div className="card-media fd-portrait" data-reveal-scale>
              <FounderPortrait
                name={f.name}
                src={f.desktopSrc}
                mobileSrc={f.mobileSrc}
              />
            </div>

            <div data-reveal data-delay="0.1">
              <span className="eyebrow">{f.role}</span>
              <h2 className="fd-name">{f.name}</h2>
              <blockquote className="fd-quote">&ldquo;{f.quote}&rdquo;</blockquote>
              <p className="fd-bio">{f.bio}</p>

              <dl className="fd-facts">
                <div>
                  <dt>Experience</dt>
                  <dd>{f.experience}</dd>
                </div>
                <div>
                  <dt>Education</dt>
                  <dd>{f.education}</dd>
                </div>
              </dl>

              <div className="fd-focus">
                <span className="fd-focus-label">Focus</span>
                <p className="fd-focus-line">
                  {f.focus.map((item, fi) => (
                    <span key={item}>
                      {fi > 0 && <b>&middot;</b>}
                      {item}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
