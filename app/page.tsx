import AboutSection from "@/components/AboutSection";
import Hero from "@/components/HeroSection";
import ParadoxiaSection from "@/components/ParadoxiaSection";
import TeaserSection from "@/components/TeaserSection";
import UniComponent from "@/components/UniComponent";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <Hero />
      <AboutSection />
      <UniComponent />
      <ParadoxiaSection />
      <TeaserSection />
    </div>
  );
};

export default Home;
