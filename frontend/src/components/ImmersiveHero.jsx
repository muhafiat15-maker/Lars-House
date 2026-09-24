import React, { useRef, useEffect } from "react";
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
