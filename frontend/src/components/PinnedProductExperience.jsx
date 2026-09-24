import React, { useEffect, useRef } from "react";
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
        start: () => `top+=${i * 100}% top`,
        end: () => `top+=${(i + 1) * 100}% top`,
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
