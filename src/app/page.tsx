import CtaSection from "@/components/home/CtaSection";
import HeroSection from "@/components/home/HeroSection";
import InfluencerGrid from "@/components/home/InfluencerGrid";
import RecommendedInfluencers from "@/components/home/RecommendedInfluencers";

export default function HomePage() {
  return (
    <main>
      <HeroSection/>
      <RecommendedInfluencers/>
      <CtaSection/>
      <InfluencerGrid/>
    </main>
  );
}
