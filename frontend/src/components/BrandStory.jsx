import React, { useEffect, useRef } from "react";
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
            <span key={i} className="char">{char === " " ? "\u00A0" : char}</span>
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
