# -*- coding: utf-8 -*-
import os

base_dir = r'C:\Users\HP SPECTRE\Documents\Lars House\frontend\src\components'

files = {
    'EditorialCollection.jsx': '''import React from "react";

const products = [
  { name: "SARGASSUM COOKIES", image: "/assets/SARGASSUM COOKIES.png", price: "Rp 35.000" },
  { name: "ULVA COOKIES", image: "/assets/ULVA COOKIES.png", price: "Rp 35.000" },
  { name: "SEA ELIXIR", image: "/assets/SARABBA RUMPUT LAUT SEA ELIXIR (REMPAH RUMPUT LAUT).png", price: "Rp 45.000" },
  { name: "MINUMAN RUMPUT LAUT", image: "/assets/MINUMAN RUMPUT LAUT.png", price: "Rp 25.000" },
];

const EditorialCollection = () => {
  return (
    <section className="min-h-screen w-full bg-[var(--bg-dark)] text-[#f5f4ef] py-32 px-5 md:px-20">
      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-20 text-center">THE COLLECTION.</h2>
      
      <div className="flex flex-col gap-32">
        {products.map((product, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-center justify-between gap-10 group" data-cursor="EXPLORE">
            <div className={w-full md:w-1/2 flex justify-center \}>
              <div className="relative w-[80%] max-w-[500px] overflow-hidden transition-transform duration-700 ease-out group-hover:scale-105">
                <div className="absolute inset-0 bg-[var(--brand-green)] opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-full blur-3xl"></div>
                <img src={product.image} alt={product.name} className="w-full h-auto drop-shadow-2xl relative z-10" />
              </div>
            </div>
            
            <div className={w-full md:w-1/2 flex flex-col \}>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 group-hover:text-[var(--brand-green)] transition-colors duration-500">{product.name}</h3>
              <p className="text-xl opacity-70 mb-8 uppercase tracking-widest">{product.price}</p>
              <button className="border border-[#f5f4ef] text-[#f5f4ef] px-8 py-3 rounded-full uppercase tracking-wider text-sm hover:bg-[#f5f4ef] hover:text-[var(--bg-dark)] transition-colors duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EditorialCollection;
''',

    'TrustQuotation.jsx': '''import React, { useEffect, useRef } from "react";
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
''',

    'FinalScene.jsx': '''import React, { useRef, useEffect } from "react";
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
'''
}

for filename, content in files.items():
    with open(os.path.join(base_dir, filename), 'w', encoding='utf-8') as f:
        f.write(content)

print("Batch 3 created.")
