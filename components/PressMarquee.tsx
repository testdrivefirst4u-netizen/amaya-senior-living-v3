import Image from "next/image";
import Link from "next/link";

type Outlet = {
  name: string;
  /** Slug of this outlet's /media post. */
  slug: string;
  /** Logo in /public/press-logos, with its intrinsic size. Omit to show the name as text. */
  logo?: { src: string; w: number; h: number };
  /** Rendered logo height in px — thin wordmarks sit lower than boxed marks. */
  height?: number;
  /** Logo is white-on-transparent and needs darkening to show on a light background. */
  light?: boolean;
};

const OUTLETS: Outlet[] = [
  { name: "CNBC-TV18", slug: "cnbc-tv18-amaya-senior-living-retirement-planning", logo: { src: "cnbc-tv18.png", w: 500, h: 300 }, height: 44 },
  { name: "The Economic Times", slug: "economic-times-amaya-senior-living-specialized-asset-class", logo: { src: "economic-times-white.png", w: 510, h: 56 }, height: 24, light: true },
  { name: "Business Today", slug: "business-today-amaya-senior-living-real-estate-bet", logo: { src: "business-today.png", w: 527, h: 59 }, height: 24 },
  { name: "The Times of India", slug: "times-of-india-amaya-senior-living-hyderabad", logo: { src: "times-of-india.png", w: 1200, h: 630 }, height: 40 },
  { name: "News18", slug: "news18-amaya-senior-living-rs-250-crore-hyderabad", logo: { src: "news18.svg", w: 152, h: 56 }, height: 34 },
  { name: "BusinessWorld", slug: "businessworld-amaya-senior-living-lifestyle-led-communities", logo: { src: "businessworld.png", w: 500, h: 63 }, height: 22 },
  { name: "The Tribune", slug: "the-tribune-amaya-senior-living-gurugram-luxury-market", logo: { src: "the-tribune.png", w: 562, h: 90 }, height: 26 },
  { name: "Business Standard", slug: "business-standard-hindi-amaya-senior-living-luxury-market", logo: { src: "business-standard.png", w: 600, h: 60 }, height: 26 },
  { name: "ThePrint", slug: "theprint-amaya-senior-living-launch-600-crore", logo: { src: "theprint.png", w: 800, h: 149 }, height: 26 },
  { name: "ANI", slug: "ani-news-amaya-senior-living-launch-600-crore", logo: { src: "ani.png", w: 307, h: 86 }, height: 34 },
  { name: "Express Healthcare", slug: "express-healthcare-amaya-senior-living-longevity-economy", logo: { src: "express-healthcare.webp", w: 188, h: 75 }, height: 36 },
  { name: "United News of India", slug: "vera-vita-amaya-premium-senior-living-sector-rs-600-cr", logo: { src: "uni-india.svg", w: 110, h: 50 }, height: 36 },
  { name: "Telangana Today", slug: "telangana-today-amaya-hyderabad-project", logo: { src: "telangana-today.webp", w: 646, h: 91 }, height: 26 },
  { name: "LatestLY", slug: "latestly-amaya-senior-living-launch-600-crore", logo: { src: "latestly.png", w: 1090, h: 251 }, height: 24 },
  { name: "News18 Telugu", slug: "news18-telugu-senior-living-lifestyle-india-60-plus-population", logo: { src: "news18-telugu.svg", w: 63, h: 44 }, height: 38 },
  { name: "ABN Andhra Jyothy", slug: "andhra-jyothy-amaya-senior-living-kandlakoya-hyderabad", logo: { src: "abn-andhra-jyothy.png", w: 82, h: 51 }, height: 38 },
  { name: "V6 Velugu", slug: "v6-velugu-amaya-senior-living-hyderabad", logo: { src: "v6-velugu.png", w: 327, h: 103 }, height: 36 },
  { name: "V3 News", slug: "v3-news-amaya-senior-living-hyderabad", logo: { src: "v3-news.jpg", w: 800, h: 800 }, height: 46 },
  { name: "HYBIZTV", slug: "hybiztv-news-chennel", logo: { src: "hybiztv.webp", w: 300, h: 116 }, height: 36 },
  { name: "ABN Fashion & Lifestyle", slug: "abn-fashion-lifestyle-amaya", logo: { src: "abn-fashion-lifestyle.jpg", w: 800, h: 800 }, height: 46 },
  { name: "Property Pulse", slug: "proppuls-amaya-senior-living-community-kandlakoya-hyderabad", logo: { src: "property-pulse.png", w: 250, h: 79 }, height: 36 },
  { name: "Indian Economic Observer", slug: "indian-economic-observer-amaya-senior-living-reimagines-luxury-retirement", logo: { src: "indian-economic-observer.png", w: 540, h: 63 }, height: 22 },
  { name: "World News Network", slug: "world-news-network-amaya-senior-living-reimagines-luxury-retirement", logo: { src: "world-news-network.jpg", w: 655, h: 70 }, height: 22 },
  // No usable logo yet — shown as text until one is added to /public/press-logos.
  { name: "BIF Today", slug: "bif-today-vera-vita-living-amaya-hyderabad" },
  { name: "India Times Online", slug: "india-times-online-amaya-senior-living-reimagines-luxury-retirement" },
  { name: "India Global Live", slug: "india-global-live-amaya-senior-living-reimagines-luxury-retirement" },
  { name: "Karnataka News Network", slug: "karnataka-news-network-amaya-senior-living-launch-600-crore" },
  { name: "India Tribune Times", slug: "india-tribune-times-amaya-senior-living-launch-600-crore" },
  { name: "India Bulletin Live", slug: "india-bulletin-live-amaya-senior-living-launch-600-crore" },
  { name: "Andhra News Digest", slug: "andhra-news-digest-amaya-senior-living-launch-600-crore" },
];

function OutletItem({ outlet, hidden }: { outlet: Outlet; hidden?: boolean }) {
  const { name, slug, logo, height = 28, light } = outlet;
  return (
    <li className="press-marquee-item">
      <Link
        href={`/media/${slug}`}
        className="press-marquee-link"
        aria-label={`${name} coverage of Amaya`}
        tabIndex={hidden ? -1 : undefined}
      >
        {logo ? (
          <Image
            src={`/press-logos/${logo.src}`}
            alt={name}
            width={logo.w}
            height={logo.h}
            sizes="220px"
            className={`press-marquee-logo${light ? " is-light" : ""}`}
            style={{ height, width: "auto" }}
            unoptimized={logo.src.endsWith(".svg")}
          />
        ) : (
          <span className="press-marquee-name">{name}</span>
        )}
      </Link>
    </li>
  );
}

/** "As featured in" strip: outlet logos auto-scrolling in a seamless loop, each linking to its /media post. */
export default function PressMarquee() {
  return (
    <div className="press-marquee" aria-label="As featured in">
      <div className="container">
        <span className="press-strip-label">As featured in</span>
      </div>
      <div className="press-marquee-viewport">
        <div className="press-marquee-track">
          <ul className="press-marquee-list">
            {OUTLETS.map((o) => (
              <OutletItem outlet={o} key={o.slug} />
            ))}
          </ul>
          {/* Second copy makes the loop seamless; hidden from screen readers and tab order. */}
          <ul className="press-marquee-list" aria-hidden="true">
            {OUTLETS.map((o) => (
              <OutletItem outlet={o} key={o.slug} hidden />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
