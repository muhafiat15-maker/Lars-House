import os

base_dir = r'C:\Users\HP SPECTRE\Documents\Lars House\frontend\src\components'

files = {
    'CinematicIntro.jsx': '''import React, { useEffect, useRef } from "react";
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
''',

    'ImmersiveHero.jsx': '''import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const ImmersiveHero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const productRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // 3D Illusion on Mouse Move
    const onMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      gsap.to(productRef.current, {
        rotationY: x * 15,
        rotationX: -y * 15,
        x: x * 20,
        y: y * 20,
        ease: "power2.out",
        duration: 1
      });

      gsap.to(textRef.current, {
        x: -x * 30,
        y: -y * 30,
        ease: "power2.out",
        duration: 1.5
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Scroll parallax
    gsap.to(productRef.current, {
      yPercent: 30,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(textRef.current, {
      yPercent: -20,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-dark)] perspective-[1000px]">
      <div ref={bgRef} className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--brand-green)_0%,_transparent_70%)]"></div>
      
      <div ref={textRef} className="absolute z-10 flex flex-col items-center justify-center pointer-events-none mix-blend-difference">
        <h1 className="huge-text text-white text-center m-0 p-0">TASTE</h1>
        <h1 className="huge-text text-white text-center m-0 p-0 text-stroke">THE</h1>
        <h1 className="huge-text text-white text-center m-0 p-0">LOCAL.</h1>
      </div>

      <div ref={productRef} className="relative z-20 w-[70vw] max-w-[800px] h-auto pointer-events-none transform-style-3d">
        <img src="/assets/SARGASSUM COOKIES.png" alt="Sargassum Cookies" className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
      </div>
    </section>
  );
};

export default ImmersiveHero;
'''
}

for filename, content in files.items():
    with open(os.path.join(base_dir, filename), 'w', encoding='utf-8') as f:
        f.write(content)

print("Batch 1 created.")
