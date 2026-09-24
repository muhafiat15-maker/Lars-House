import React, { useState } from "react";
import CinematicIntro from "../components/CinematicIntro";
import ImmersiveHero from "../components/ImmersiveHero";
import PinnedProductExperience from "../components/PinnedProductExperience";
import HorizontalStory from "../components/HorizontalStory";
import BrandStory from "../components/BrandStory";
import EditorialCollection from "../components/EditorialCollection";
import TrustQuotation from "../components/TrustQuotation";
import FinalScene from "../components/FinalScene";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && <CinematicIntro onComplete={() => setIntroComplete(true)} />}
      
      <div style={{ opacity: introComplete ? 1 : 0, transition: "opacity 1s ease-in-out" }}>
        <ImmersiveHero />
        <BrandStory />
        <HorizontalStory />
        <PinnedProductExperience />
        <EditorialCollection />
        <TrustQuotation />
        <FinalScene />
      </div>
    </>
  );
}
