import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const FinalScene = () => {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    
    const onMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const onMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    };

    btn.addEventListener("mousemove", onMouseMove);
    btn.addEventListener("mouseleave", onMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", onMouseMove);
      btn.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section className="min-h-screen w-full bg-[var(--bg-dark)] text-white flex flex-col justify-between pt-32 pb-10 px-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-6xl md:text-[8vw] font-bold leading-none tracking-tighter mb-16">
          READY<br/>TO<br/>TASTE IT?
        </h2>
        
        <button ref={btnRef} className="group relative bg-[#f5f4ef] text-[#0f1012] font-bold px-12 py-6 rounded-full text-xl uppercase tracking-widest overflow-hidden">
          <span className="relative z-10 flex items-center gap-4">
            Order via WhatsApp
            <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between opacity-50 text-sm tracking-widest uppercase mt-20">
        <p>2026 LARS HOUSE</p>
        <h1 className="text-2xl font-bold my-4 md:my-0 tracking-[0.3em]">LARS HOUSE</h1>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Shopee</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </section>
  );
};

export default FinalScene;
