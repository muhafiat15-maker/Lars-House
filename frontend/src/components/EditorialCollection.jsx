import React from "react";

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
            <div className={`w-full md:w-1/2 flex justify-center ${idx % 2 !== 0 ? 'md:order-2' : ''}`}>
              <div className="relative w-[80%] max-w-[500px] overflow-hidden transition-transform duration-700 ease-out group-hover:scale-105">
                <div className="absolute inset-0 bg-[var(--brand-green)] opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-full blur-3xl"></div>
                <img src={product.image} alt={product.name} className="w-full h-auto drop-shadow-2xl relative z-10" />
              </div>
            </div>
            
            <div className={`w-full md:w-1/2 flex flex-col ${idx % 2 !== 0 ? 'md:items-end md:text-right' : 'md:items-start text-left'}`}>
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
