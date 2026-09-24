import os

base_dir = r'C:\Users\HP SPECTRE\Documents\Lars House\frontend\src'

files = {
    'pages/Home.jsx': '''import React, { useState } from "react";
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
''',

    'App.jsx': '''import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import './index.css';

function App() {
  return (
    <Router>
      <SmoothScroll>
        <CustomCursor />
        <div className="min-h-screen bg-[var(--bg-dark)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
'''
}

for filename, content in files.items():
    with open(os.path.join(base_dir, filename), 'w', encoding='utf-8') as f:
        f.write(content)

print("Home and App created.")
