import AboutSection from "@/components/About";
import Hero from "@/components/Hero";
import ParadoxiaSection from "@/components/ParadoxiaSection";
import UniComponent from "@/components/UniComponent";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <Hero />
      <AboutSection />
      <UniComponent />
      <ParadoxiaSection />
    </div>
  );
};

export default Home;
