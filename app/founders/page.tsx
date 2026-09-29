import type { Metadata } from "next";
import "./founders.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Animations from "@/components/Animations";
import FoundersHero from "@/components/founders/FoundersHero";
import FoundersIntro from "@/components/founders/FoundersIntro";
import FounderProfiles from "@/components/founders/FounderProfiles";
import FoundersSynergy from "@/components/founders/FoundersSynergy";
import FoundersMessage from "@/components/founders/FoundersMessage";
import FoundersInstitutions from "@/components/founders/FoundersInstitutions";
import VisitBand from "@/components/VisitBand";


export const metadata: Metadata = {
  title: "Amaya Senior Living Founders | Vera Vita Living",
  description:
    "Meet the founders behind Amaya Senior Living and learn about the vision and institutions shaping the community.",
  keywords: [
    "Amaya Senior Living founders",
    "Vera Vita founders",
    "Amaya founders",
    "Vera Vita Living",
    "senior living developers Hyderabad",
    "Amaya leadership",
  ],
  alternates: { canonical: "/founders" },
};

export default function FoundersPage() {
  return (
    <>
      <Nav />
      <main>
        <FoundersHero />
        <FoundersIntro />
        <FounderProfiles />
        {/* <FoundersSynergy /> */}
        <FoundersMessage />
        {/* <FoundersInstitutions /> */}
        {/* <FoundersTimeline /> */}
        <VisitBand />
        <Footer />
      </main>
      <Animations />
    </>
  );
}
