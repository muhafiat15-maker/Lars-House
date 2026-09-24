import React, { useRef, useEffect } from "react";
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
        end: () => `+=${scrollWidth}`,
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
