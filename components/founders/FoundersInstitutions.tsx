type Stat = { value: string; label: string };
type SubEntity = { name: string; tag: string; description: string };

type Institution = {
  name: string;
  eyebrow: string;
  tagline: string;
  description?: string;
  stats?: Stat[];
  subEntities?: SubEntity[];
  coreValues: string[];
  inherits: string;
};

const INSTITUTIONS: Institution[] = [
  {
    name: "Saboo Group",
    eyebrow: "A Legacy of Enterprise",
    tagline: "A diversified Hyderabad group, built over decades on trust and operational excellence.",
    description:
      "Saboo Group is a Hyderabad-based group of companies spanning real estate, hospitality, finance and investments, and automobile. Over decades it has developed more than 200,000 sq ft of commercial real estate and built one of the city’s leading automobile dealership networks, alongside hospitality ventures and a value-driven investment practice. It is a business built patiently, on relationships and disciplined growth.",
    stats: [
      { value: "200,000+ sq ft", label: "Commercial Developed · Real Estate" },
      { value: "Guest Experience", label: "Hospitality" },
      { value: "Value Investing & PE", label: "Finance & Investments" },
      { value: "15,000+ sold", label: "150,000+ Serviced Annually · Automobile" },
    ],
    coreValues: ["Trust", "Integrity", "Long-Term Thinking", "Relationships", "Operational Excellence"],
    inherits: "From this legacy, Vera Vita inherits governance, entrepreneurship and long-term stewardship.",
  },
  {
    name: "The Badruka Family & Northstar Group",
    eyebrow: "Building & Educating Hyderabad",
    tagline: "One of Hyderabad’s long-established families, across education, real estate and the arts.",
    subEntities: [
      {
        name: "Badruka Educational Society",
        tag: "Education · The Arts · Since 1950",
        description:
          "Founded in 1950, the Society educates 4,000+ students with 100+ faculty across 17+ courses in commerce, arts and IT, alongside a Management School and a School of Music & Dance. Its flagship Business School opened in 2024. Kalpataru, founded in 2001 and affiliated with Trinity College London, keeps classical music and dance alive.",
      },
      {
        name: "Northstar Group",
        tag: "Real Estate · Development · Management",
        description:
          "Northstar develops and manages residential, commercial and infrastructure projects across Hyderabad. The group holds real estate of approximately ₹140 Cr, manages more than half of the properties it builds, and has around one lakh sq ft under management.",
      },
    ],
    coreValues: ["Relationships as Bedrock", "Nation Building", "Entrepreneurial Spirit", "Community"],
    inherits: "From this family, Vera Vita inherits the belief that relationships, not transactions, are the bedrock.",
  },
  {
    name: "Orient BlackSwan, since 1895",
    eyebrow: "A Century of Learning",
    tagline: "One of India’s most respected educational publishers.",
    description:
      "Orient BlackSwan serves 14,000+ schools across CBSE, ICSE and State Boards. A legacy that began in 1895 now combines in-house editorial expertise, seven offices and six warehouses, a nationwide distribution network and more than 1,000 teacher workshops a year, increasingly extended through digital and AI-enabled learning platforms.",
    stats: [
      { value: "1895", label: "Established" },
      { value: "Top 3", label: "School Publisher in India" },
      { value: "14,000+", label: "Schools Served" },
      { value: "4,000+", label: "Schools Active Each Year" },
      { value: "6M+", label: "Students Each Year" },
      { value: "1,500+", label: "Distributors Nationwide" },
    ],
    coreValues: ["Quality", "Trust", "Academic Rigour", "Educational Impact"],
    inherits: "Its emphasis on quality, trust and academic rigour reflects the values that shape Vera Vita.",
  },
];

export default function FoundersInstitutions() {
  return (
    <section className="section fd-institutions">
      <div className="container">
        <div className="fd-institutions-head">
          <span className="eyebrow" data-reveal>
            Institutions
          </span>
          <h2 className="h2" data-reveal-line>
            <span className="line-mask">
              <span className="line-inner">The Institutions</span>
            </span>
            <span className="line-mask">
              <span className="line-inner">That Shaped Us</span>
            </span>
          </h2>
          <p className="lead" data-reveal data-delay="0.1">
            A legacy of enterprise, education, culture and long-term
            thinking.
          </p>
        </div>

        <div className="fd-institution-list">
          {INSTITUTIONS.map((inst, i) => (
            <article
              className="fd-institution-card"
              key={inst.name}
              data-reveal
              data-delay={`${i * 0.1}`}
            >
              <div className="fd-institution-head">
                <div>
                  <h3 className="fd-institution-name">{inst.name}</h3>
                  <p className="fd-institution-tagline">{inst.tagline}</p>
                </div>
                <span className="fd-institution-meta">{inst.eyebrow}</span>
              </div>

              {inst.description && (
                <p className="fd-institution-desc">{inst.description}</p>
              )}

              {inst.stats && inst.stats.length > 0 && (
                <div className="fd-institution-stats">
                  {inst.stats.map((s) => (
                    <div key={s.label}>
                      <span className="fd-institution-stat-value">{s.value}</span>
                      <span className="fd-institution-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {inst.subEntities && (
                <div className="fd-institution-subentities">
                  {inst.subEntities.map((sub) => (
                    <div className="fd-institution-subentity" key={sub.name}>
                      <span className="fd-institution-subentity-name">{sub.name}</span>
                      <span className="fd-institution-subentity-tag">{sub.tag}</span>
                      <p className="fd-institution-subentity-desc">{sub.description}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="fd-institution-footer">
                <div className="fd-institution-values">
                  <span className="fd-institution-values-label">Core Values</span>
                  <div className="fd-institution-focus">
                    {inst.coreValues.map((v) => (
                      <span key={v}>{v}</span>
                    ))}
                  </div>
                </div>
                <p className="fd-institution-inherits">{inst.inherits}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
