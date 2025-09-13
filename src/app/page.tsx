import ClientLogos from "@/components/home/ClientLogos";
import CtaSection from "@/components/home/CtaSection";
import HeroSection from "@/components/home/HeroSection";
import InfluencerGrid from "@/components/home/InfluencerGrid";
import PackageSection from "@/components/home/PackageSection";
import RecommendedInfluencers from "@/components/home/RecommendedInfluencers";
import TestimonialSection from "@/components/home/TestimonialSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection/>
      <RecommendedInfluencers/>
      <CtaSection/>
      <InfluencerGrid/>
      <PackageSection/>
      <ClientLogos/>
      <TestimonialSection/>
    </main>
  );
}
