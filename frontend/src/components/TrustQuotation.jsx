import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const TrustQuotation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section className="min-h-[70vh] w-full flex items-center justify-center bg-[#f5f4ef] text-[#0f1012] px-10 py-32">
      <div ref={containerRef} className="max-w-5xl mx-auto text-center">
        <blockquote className="text-4xl md:text-[5vw] font-bold leading-tight tracking-tighter italic mb-12">
          "A small local product<br/>that deserves a bigger stage."
        </blockquote>
        <div className="flex flex-col items-center">
          <div className="w-16 h-[2px] bg-[#0f1012] mb-6"></div>
          <p className="text-xl font-bold uppercase tracking-widest">Local Artisan Guide</p>
          <p className="text-sm opacity-60 mt-2">Makassar, Indonesia</p>
        </div>
      </div>
    </section>
  );
};

export default TrustQuotation;
