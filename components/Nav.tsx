"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHONE, PHONE_HREF } from "@/lib/assets";
import { FiPhone } from "react-icons/fi";
import { IconChevronDown } from "./Icons";
import { useBookVisit } from "./BookVisitContext";

const GALLERY_MENU = [

  { href: "/gallery", label: "Gallery" },
  { href: "/faqs", label: "FAQs" },
  { href: "/blogs", label: "Blogs" },
  { href: "/media", label: "Media" },
];

const LINKS = [
  { href: "#why", label: "Why Amaya" },
  { href: "#project", label: "The Project" },
  { href: "#life", label: "Life at Amaya" },
  { href: "#residences", label: "Residences" },
  { href: "#location", label: "Location" },
  // { href: "#faq", label: "Questions" },
];

const WHATSAPP_HREF = "https://wa.me/919553395533";

export default function Nav() {
  const { open: openBookVisit } = useBookVisit();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isGallery = pathname === "/gallery";
  const isFaqs = pathname === "/faqs";
  const isBlogs = pathname?.startsWith("/blogs") ?? false;
  const isMedia = pathname?.startsWith("/media") ?? false;
  const isFounders = pathname === "/founders";
  const sectionHref = (href: string) => (isHome ? href : `/${href}`);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [galleryMenuOpen, setGalleryMenuOpen] = useState(false);
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const solid = scrolled || open || !isHome;

  useEffect(() => {
    if (!galleryMenuOpen) return;
    const onDocPointer = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setGalleryMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGalleryMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [galleryMenuOpen]);

  useEffect(() => {
    if (!open) setMobileGalleryOpen(false);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const goTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    if (!isHome) {
      // Not on the homepage: let the browser navigate to `/${href}` normally.
      return;
    }
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.4 });
    } else {
      (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
  }, [isHome]);

  return (
    <>
      <header className={`nav ${solid ? "nav--solid" : ""}`}>
        <div className="nav-inner">
          <a
            href={sectionHref("#top")}
            className="nav-logo"
            onClick={(e) => goTo(e, "#top")}
            aria-label="Amaya, back to top"
          >
            <Image
              src="/Amaya_black_Logo.webp"
              alt="Amaya"
              width={1080}
              height={543}
              priority
              className={`nav-logo-img ${solid ? "" : "is-inverted"}`}
            />
          </a>

          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((l) => (
              <a key={l.href} href={sectionHref(l.href)} onClick={(e) => goTo(e, l.href)}>
                {l.label}
              </a>
            ))}
            <Link href="/founders" onClick={() => setOpen(false)}>
              Founders
            </Link>
            <div
              className={`nav-dropdown ${galleryMenuOpen ? "is-open" : ""}`}
              ref={dropdownRef}
              onMouseEnter={() => setGalleryMenuOpen(true)}
              onMouseLeave={() => setGalleryMenuOpen(false)}
            >
              <button
                type="button"
                className="nav-dropdown-trigger"
                aria-haspopup="true"
                aria-expanded={galleryMenuOpen}
                aria-controls="nav-gallery-menu"
                onClick={() => setGalleryMenuOpen((v) => !v)}
              >
                More
                <IconChevronDown size={12} className="nav-dropdown-caret" />
              </button>
              <div className="nav-dropdown-menu" id="nav-gallery-menu" role="menu">
                {GALLERY_MENU.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => {
                      setGalleryMenuOpen(false);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="nav-actions">

            <button
              className="btn btn-primary nav-cta"
              type="button"
              onClick={() => {
                setOpen(false);
                openBookVisit();
              }}
            >
              Book a Visit
            </button>   <a className="nav-phone" href={PHONE_HREF}>
              {PHONE}
            </a>
            <a className="nav-phone-icon" href={PHONE_HREF} aria-label={`Call ${PHONE}`}>
              <FiPhone size={20} />
            </a>
            <button
              className={`nav-burger ${open ? "is-open" : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`nav-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={sectionHref(l.href)}
              style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : "0s" }}
              onClick={(e) => goTo(e, l.href)}
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/founders"
            className={isFounders ? "overlay-active" : ""}
            style={{ transitionDelay: open ? `${0.08 + LINKS.length * 0.05}s` : "0s" }}
            onClick={() => setOpen(false)}
          >
            Founders
          </Link>
          <div className="overlay-dropdown">
            <button
              type="button"
              className={`overlay-dropdown-trigger ${mobileGalleryOpen ? "is-open" : ""} ${isGallery || isFaqs || isBlogs || isMedia ? "overlay-active" : ""
                }`}
              aria-expanded={mobileGalleryOpen}
              aria-controls="mobile-gallery-menu"
              style={{ transitionDelay: open ? `${0.08 + (LINKS.length + 1) * 0.05}s` : "0s" }}
              onClick={() => setMobileGalleryOpen((v) => !v)}
            >
              More
              <IconChevronDown size={16} className="overlay-dropdown-caret" />
            </button>
            <div
              className={`overlay-dropdown-menu ${mobileGalleryOpen ? "is-open" : ""}`}
              id="mobile-gallery-menu"
            >
              <div className="overlay-dropdown-menu-inner">
                {GALLERY_MENU.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={pathname === item.href ? "overlay-active" : ""}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            style={{ transitionDelay: open ? `${0.08 + (LINKS.length + 1) * 0.05}s` : "0s" }}
            onClick={() => setOpen(false)}
          >
            Contact Us
          </a> */}
          <a
            href={WHATSAPP_HREF}
            className="overlay-cta"
            style={{ transitionDelay: open ? `${0.08 + (LINKS.length + 2) * 0.05}s` : "0s" }}
            onClick={() => setOpen(false)}
          >
            Contact Us
          </a>
        </nav>
        <div className="nav-overlay-foot">
          <a href={PHONE_HREF}>{PHONE}</a>
          <span>RERA No: P02200011109</span>
        </div>
      </div>
    </>
  );
}
