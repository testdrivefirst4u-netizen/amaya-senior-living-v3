import Image from "next/image";
import { PHONE, PHONE_HREF } from "@/lib/assets";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-parent">Vera Vita</span>
            <Image
              src="/Amaya_black_Logo.webp"
              alt="Amaya"
              width={1080}
              height={452}
              className="footer-logo-img"
            />
            <span className="footer-descriptor">
              Independent living, at its most graceful.
            </span>
          </div>

          <div className="footer-col footer-col--visit">
            <h4>Visit</h4>
            <p>
              Amaya Experience Centre
              <br />
              Munirabad, Medchal
              Hyderabad, Telangana
              <br />
              Monday to Saturday :
              10:00 to 18:00
            </p>
            <span className="footer-rera-note">RERA Number: P02200011109</span>
          </div>

          <div className="footer-col footer-col--speak">
            <h4>Speak to us</h4>
            <p>
              <a href={PHONE_HREF} className="footer-phone-link">
                {PHONE}
              </a>
              <span className="footer-mobile-optional">
                <br />
                Senior Living by Vera Vita
                <br />1 to 3.5 BHK residences
              </span>
            </p>
          </div>

          <div className="footer-col footer-col--developer">
            <h4>Developer</h4>
            <p>
              Vera Vita Living LLP
              <br />
              Munirabad, Medchal
              <br />
              Hyderabad, Telangana
              <br />
              RERA No: Coming Soon
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-legal">
            All images, renderings, specifications, amenities, distances,
            travel times and project details shown on this website are
            indicative and for illustrative purposes only. Actual
            development, features, specifications, views and surrounding
            infrastructure may vary.
            <span className="footer-legal-detail">
              {" "}The developer reserves the right to make changes without
              prior notice, subject to applicable approvals. Prospective
              buyers should refer to the final approved plans, agreements and
              project documentation.
            </span>
          </p>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Vera Vita Living LLP
          </p>
        </div>
      </div>
    </footer>
  );
}
