import Faq from "@/components/hackathon/FAQ";
import Hero from "@/components/hackathon/Hero";
import Structure from "@/components/hackathon/Structure";
import ThemesComponent from "@/components/hackathon/Themes";
import Timeline from "@/components/hackathon/Timeline";
import React from "react";

const HackathonPage = () => {
  return (
    <div>
      <Hero />
      <Structure />
      <Timeline />
      {/* <ThemesComponent /> */}
      <Faq />
    </div>
  );
};

export default HackathonPage;
