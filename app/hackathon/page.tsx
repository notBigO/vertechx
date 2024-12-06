import Faq from "@/components/hackathon/FAQ";
import Hero from "@/components/hackathon/Hero";
import Structure from "@/components/hackathon/Structure";
import Timeline from "@/components/hackathon/Timeline";
import React from "react";

const HackathonPage = () => {
  return (
    <div>
      <Hero />
      <Structure />
      <Timeline />
      <Faq />
    </div>
  );
};

export default HackathonPage;
