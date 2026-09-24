import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CinematicIntro = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const nameRef = useRef(null);
  const productRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    tl.to(containerRef.current, { backgroundColor: "var(--brand-green)", duration: 0.5 })
      .to(logoRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(logoRef.current, { opacity: 0, y: -20, duration: 0.5 }, "+=0.5")
      .to(nameRef.current, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" })
      .to(nameRef.current, { opacity: 0, scale: 1.1, duration: 0.5 }, "+=0.5")
      .to(productRef.current, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" })
      .to(containerRef.current, { opacity: 0, duration: 1, ease: "power2.inOut" }, "+=0.2");

  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f1012] pointer-events-none" style={{ backgroundColor: "#0f1012" }}>
      <div ref={logoRef} className="absolute opacity-0 translate-y-10 text-white text-2xl font-bold tracking-[0.2em]">
        LARS
      </div>
      <div ref={nameRef} className="absolute opacity-0 scale-95 text-white huge-text">
        HOUSE
      </div>
      <div ref={productRef} className="absolute opacity-0 scale-90 w-[300px] md:w-[500px]">
        <img src="/assets/KERUPUK RUMPUT LAUT.png" alt="Product" className="w-full h-auto object-contain drop-shadow-2xl" />
      </div>
    </div>
  );
};

export default CinematicIntro;
