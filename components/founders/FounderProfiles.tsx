import { ASSETS } from "@/lib/assets";
import FounderPortrait from "./FounderPortrait";

const FOUNDERS = [
  {
    name: "Tanay Saboo",
    desktopSrc: ASSETS.founderTanayDesktop,
    mobileSrc: ASSETS.founderTanayMobile,
    role: "The Founders · Capital & Strategy",
    quote: "The greatest investments compound over decades, not quarters.",
    bio: "Tanay is a Chartered Accountant with a top-tier qualifying record, and holds an MBA from London Business School. His career spans institutional finance and entrepreneurship — from audit and public markets to private equity and mobility — building a long-term view on capital allocation along the way. To Vera Vita he brings the discipline of patient capital: rigour, governance, and a deep interest in healthcare and longevity.",
    experience:
      "Saboo Group, Chief Growth Officer & Director · Family Office Fund · Mobility Impact Partners, New York · Stratford House, London · Purnartha · Ernst & Young",
    education: "MBA, London Business School · Chartered Accountancy, ICAI · B.Com, HR College",
    brings: ["Investment discipline", "Capital allocation", "Growth strategy", "Governance", "Healthcare & longevity"],
  },
  {
    name: "Dhruv Badruka",
    desktopSrc: ASSETS.founderDhruvDesktop,
    mobileSrc: ASSETS.founderDhruvMobile,
    role: "The Founders · Development & Execution",
    quote: "Quality isn't a checkpoint — it's built into the process, from structure to spirit.",
    bio: "Dhruv pairs an MBA from London Business School with a foundation in technology and engineering. At the Northstar Group he led business development: structuring land transactions and joint ventures, and overseeing 250 acres under development and 150,000 sq ft under construction. He also created an investor-exit platform that delivered returns of up to 25 percent CAGR. To Vera Vita he brings that same discipline — the craft of building well, and of building communities that last.",
    experience:
      "Northstar Group, Director, Business Development · Badruka College of Information Technology - Member of the Board · Reserch Enginner - Hewlett Packard",
    education: "MBA, London Business School · Owner Management Program, SP Jain · B.Tech (IT), VIT",
    brings: ["Development", "Execution", "Deal structuring", "Institution building", "Community building"],
  },
  {
    name: "Arudradev Rao",
    desktopSrc: ASSETS.founderArudradevDesktop,
    mobileSrc: ASSETS.founderArudradevMobile,
    role: "The Founders · Brand & Experience",
    quote: "Every business is a people business, eventually.",
    bio: "Arudra is a Wholetime Director at Orient BlackSwan, with a decade in education and publishing across the subcontinent. He rose from Management Trainee to Director. He founded his first company, RNC Polymers, straight out of college and made a successful exit. He brings a people-first sensibility, centred on learning, empathy, culture and long-term relationships, with a strength in building strategic partnerships that create lasting value on all sides.",
    experience:
      "Vera Vita, Founder · Orient BlackSwan, Wholetime Director · RNC Polymers, Managing Partner",
    education: "PGP (MFAB), Indian School of Business · Owner Manager Programme, SPJIMR · FLAME University",
    brings: ["Brand", "Experience", "Community", "Education", "Hospitality"],
  },
];

export default function FounderProfiles() {
  return (
    <section className="section fd-profiles">
      <div className="container">
        {FOUNDERS.map((f, i) => (
          <article
            className={`fd-profile ${i % 2 === 1 ? "fd-profile--reverse" : ""}`}
            key={f.name}
          >
            <div className="fd-profile-media frame" data-reveal-scale>
              <FounderPortrait
                name={f.name}
                src={f.desktopSrc}
                mobileSrc={f.mobileSrc}
              />
            </div>

            <div className="fd-profile-content">
              <span className="fd-profile-role" data-reveal>
                {f.role}
              </span>
              <h3 className="fd-profile-name" data-reveal data-delay="0.05">
                {f.name}
              </h3>
              <p className="fd-profile-quote" data-reveal data-delay="0.1">
                &ldquo;{f.quote}&rdquo;
              </p>
              <p className="fd-profile-bio" data-reveal data-delay="0.15">
                {f.bio}
              </p>

              <div className="fd-profile-meta" data-reveal data-delay="0.2">
                <div className="fd-profile-meta-block">
                  <span>Experience</span>
                  <p>{f.experience}</p>
                </div>
                <div className="fd-profile-meta-block">
                  <span>Education</span>
                  <p>{f.education}</p>
                </div>
              </div>

              <div className="fd-profile-chips" data-reveal data-delay="0.25">
                {f.brings.map((tag) => (
                  <span className="fd-profile-chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
