import os

base_dir = r'C:\Users\HP SPECTRE\Documents\Lars House\frontend\src\components'

files = {
    'PinnedProductExperience.jsx': '''import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const PinnedProductExperience = () => {
  const containerRef = useRef(null);
  const productRef = useRef(null);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const panels = gsap.utils.toArray(".text-panel");

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      animation: gsap.timeline()
        .to(productRef.current, { rotation: 15, scale: 1.05, duration: 1 })
        .to(productRef.current, { rotation: -5, scale: 1.1, duration: 1 })
        .to(productRef.current, { rotation: 0, scale: 1, duration: 1 })
    });

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: () => 	op+=% top,
        end: () => 	op+=% top,
        scrub: 1,
        animation: gsap.timeline()
          .fromTo(panel, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 })
          .to(panel, { opacity: 0, y: -50, duration: 0.5 }, "+=0.5")
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full flex items-center justify-between px-10 md:px-24 bg-[#1a1a1a] text-[#f5f4ef] overflow-hidden">
      <div className="w-1/2 h-full flex items-center justify-center">
        <div ref={productRef} className="w-[80%] max-w-[600px]" data-cursor="EXPLORE">
          <img src="/assets/SARABBA RUMPUT LAUT SEA ELIXIR (REMPAH RUMPUT LAUT).png" alt="Sea Elixir" className="w-full h-auto drop-shadow-2xl" />
        </div>
      </div>
      <div ref={textContainerRef} className="w-1/2 h-full relative">
        <div className="text-panel absolute inset-0 flex flex-col justify-center opacity-0">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">01. THE INGREDIENT</h2>
          <p className="text-xl md:text-2xl font-light opacity-80 max-w-md">Harvested from the pure coastlines of Sulawesi. Real seaweed, naturally dried.</p>
        </div>
        <div className="text-panel absolute inset-0 flex flex-col justify-center opacity-0">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">02. THE PROCESS</h2>
          <p className="text-xl md:text-2xl font-light opacity-80 max-w-md">Crafted slowly. No artificial preservatives. Respecting the traditional methods.</p>
        </div>
        <div className="text-panel absolute inset-0 flex flex-col justify-center opacity-0">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">03. THE TASTE</h2>
          <p className="text-xl md:text-2xl font-light opacity-80 max-w-md">A perfect balance of umami and natural sea salt. A texture that melts in your mouth.</p>
        </div>
      </div>
    </section>
  );
};

export default PinnedProductExperience;
''',

    'HorizontalStory.jsx': '''import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const HorizontalStory = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollWidth = scrollRef.current.scrollWidth;
    const windowWidth = window.innerWidth;

    gsap.to(scrollRef.current, {
      x: -(scrollWidth - windowWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => +=,
        pin: true,
        scrub: 1,
      }
    });
  }, []);

  const panels = [
    { title: "ORIGIN", subtitle: "Makassar, South Sulawesi" },
    { title: "INGREDIENT", subtitle: "Premium Seaweed" },
    { title: "PROCESS", subtitle: "Handcrafted Care" },
    { title: "PRODUCT", subtitle: "A Local Masterpiece" },
  ];

  return (
    <section ref={containerRef} className="h-screen w-full bg-[#f5f4ef] text-[#0f1012] overflow-hidden flex items-center">
      <div ref={scrollRef} className="flex h-[80vh] px-[10vw]" data-cursor="DRAG">
        {panels.map((panel, idx) => (
          <div key={idx} className="w-[80vw] h-full flex flex-col justify-center shrink-0 pr-20">
            <h1 className="text-[12vw] font-bold leading-none tracking-tighter opacity-10">{String(idx + 1).padStart(2, '0')}</h1>
            <h2 className="text-[8vw] font-bold leading-[0.9] tracking-tighter">{panel.title}</h2>
            <p className="text-2xl mt-8 font-medium">{panel.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalStory;
''',

    'BrandStory.jsx': '''import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const BrandStory = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const chars = textRef.current.querySelectorAll(".char");
    gsap.fromTo(chars, 
      { opacity: 0.1 }, 
      { 
        opacity: 1, 
        stagger: 0.1, 
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true
        }
      }
    );
  }, []);

  const text = "BORN FROM THE LAND.";

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[var(--brand-green)] text-[#f5f4ef] px-10 py-32">
      <div className="max-w-6xl mx-auto text-center">
        <h2 ref={textRef} className="text-6xl md:text-[8vw] font-bold leading-none tracking-tighter flex flex-wrap justify-center">
          {text.split("").map((char, i) => (
            <span key={i} className="char">{char === " " ? "\\u00A0" : char}</span>
          ))}
        </h2>
        <div className="mt-20 max-w-2xl mx-auto text-xl md:text-2xl font-light opacity-80 leading-relaxed text-left">
          Lars House is more than just an UMKM. We are the bridge between local coastal communities and the modern palate. Our mission is to elevate Indonesian seaweed into a globally appreciated delicacy.
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
'''
}

for filename, content in files.items():
    with open(os.path.join(base_dir, filename), 'w', encoding='utf-8') as f:
        f.write(content)

print("Batch 2 created.")
