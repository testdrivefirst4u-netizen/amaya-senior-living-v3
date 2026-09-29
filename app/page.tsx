import type { Metadata } from "next";
import Animations from "@/components/Animations";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhyAmaya from "@/components/WhyAmaya";
import ProjectStats from "@/components/ProjectStats";
import LifeAtAmaya from "@/components/LifeAtAmaya";
import Residences from "@/components/Residences";
import Location from "@/components/Location";
import Founders from "@/components/Founders";
import Faq from "@/components/Faq";
import VisitCta from "@/components/VisitCta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Senior living in Hyderabad | Amaya Senior Living",
  description:
    "Explore premium senior living in Hyderabad with independent living, wellness, healthcare support and thoughtfully designed residences at Amaya.",
  keywords: [
    "senior living in Hyderabad",
    "senior living Hyderabad",
    "luxury senior living Hyderabad",
    "independent senior living Hyderabad",
    "senior citizen homes Hyderabad",
    "retirement homes Hyderabad",
    "senior living community Hyderabad",
    "premium senior living Hyderabad",
  ],
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhyAmaya />
        <ProjectStats />
        <LifeAtAmaya />
        <Residences />
        <Location />
        <Founders />
        <Faq />
        <VisitCta />
        <Footer />
      </main>
      <Animations />
    </>
  );
}
