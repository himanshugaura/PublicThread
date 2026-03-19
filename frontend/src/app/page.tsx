"use client";
import Navbar from "@/components/common/Navbar";
import GrainOverlay from "../components/common/GrainOverlay";
import HeroSection from "@/components/landingPage/HeroSection";
import FeatureCards from "@/components/landingPage/FeaturesSection";
import CTASection from "@/components/landingPage/CTASection";
import Footer from "@/components/landingPage/Footer";
import Divider from "@/components/common/Divider";

export default function App() {
  return (
    <div className="min-h-screen">
      <div className="relative h-screen overflow-hidden">
        <GrainOverlay
          originX={0.85}
          originY={0.1}
          spread={0.7}
          density={0.6}
          alpha={30}
        />
        <GrainOverlay
          originX={0.3}
          originY={0.3}
          spread={0.3}
          density={0.6}
          alpha={30}
        />

        <div className="relative z-10 h-full flex flex-col">
          <Navbar />

          <div className="w-full h-px bg-liner-to-r from-transparent via-[rgba(240,236,228,0.08)] to-transparent" />

          <HeroSection />
        </div>
      </div>

      <Divider />
      <FeatureCards />
      <Divider />
      <CTASection />
      <Divider />
      <Footer />
    </div>
  );
}
