import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import FaqSection from '../components/FaqSection';
import { products } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Quote, ShieldCheck, Leaf, HeartPulse, Users, ChevronDown, Sparkles } from 'lucide-react';

const FloatingElement = ({ delay, duration, yOffset, className, children }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [0, yOffset, 0] }}
    transition={{ duration: duration, repeat: Infinity, ease: "easeInOut", delay: delay }}
    className={`absolute pointer-events-none ${className}`}
  >
    {children}
  </motion.div>
);

const WaveBottom = ({ colorClass }) => (
  <div className={`absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 ${colorClass}`}>
    <svg className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-current"></path>
    </svg>
  </div>
);

const WaveTop = ({ colorClass }) => (
  <div className={`absolute top-0 left-0 w-full overflow-hidden leading-none ${colorClass}`}>
    <svg className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-current"></path>
    </svg>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
      >
        <span className="font-medium text-lars-navy text-lg">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="text-lars-gold" size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-5 text-gray-600">
              <div className="border-t border-gray-100 pt-4 mt-1">
                <p className="leading-relaxed">{answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home({ addToCart }) {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* About Section */}
      <section id="about" className="pt-20 pb-32 bg-white relative overflow-hidden">
        <FloatingElement delay={0} duration={6} yOffset={-30} className="top-20 left-10 text-lars-gold opacity-10">
          <Leaf size={120} />
        </FloatingElement>
        <FloatingElement delay={2} duration={8} yOffset={40} className="bottom-20 right-10 text-lars-teal opacity-10">
          <Sparkles size={80} />
        </FloatingElement>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Imagery / Editorial Side */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                <img src="/assets/premium_seaweed.jpg" alt="Seaweed harvest" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-lars-navy/10 mix-blend-multiply"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-lars-sand rounded-full flex items-center justify-center p-8 shadow-xl hidden md:flex border border-white">
                <p className="text-lars-navy font-serif italic text-center leading-snug">"Langsung dari kedalaman lautan ke meja Anda."</p>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <h3 className="text-lars-gold font-bold tracking-widest uppercase text-sm mb-3">Tentang Kami</h3>
                <h2 className="text-fluid-h2 font-serif text-lars-navy mb-4 leading-tight">Berdiri di Makassar, Menginspirasi Dunia</h2>
                <div className="w-16 h-1 bg-lars-gold mb-6"></div>
                <p className="text-gray-600 leading-relaxed text-lg font-light">
                  Didirikan pada tahun 2015 di Makassar, Sulawesi Selatan, Lars House bermula dari visi untuk mengangkat potensi lokal. Kami berfokus pada pengolahan <span className="font-medium text-lars-teal">rumput laut tropis</span> menjadi produk makanan sehat yang dapat diterima dan dipasarkan secara global.
                </p>
              </div>

              <div>
                <h3 className="text-lars-gold font-bold tracking-widest uppercase text-sm mb-3">Misi Kami</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Menghadirkan makanan sehat berbahan dasar rumput laut Indonesia ke seluruh dunia, sekaligus mendorong pola konsumsi yang berkelanjutan bagi kesehatan manusia dan bumi.
                </p>
              </div>

              <div>
                <h3 className="text-lars-gold font-bold tracking-widest uppercase text-sm mb-3">Visi Keberlanjutan</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Lebih dari sekadar memproduksi pangan sehat, visi kami adalah <span className="font-medium text-lars-teal">memberdayakan perempuan pesisir</span>, mendorong nutrisi rendah karbon, dan membangun masa depan pangan yang berkelanjutan.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <WaveBottom colorClass="text-lars-navy" />
      </section>

      {/* Why Choose Us Section */}
      <section className="pt-20 pb-32 bg-lars-navy text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Mengapa Memilih Kami?</h2>
            <div className="w-16 h-1 bg-lars-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: '100% Alami', desc: 'Tanpa bahan pengawet dan perasa buatan, murni dari alam.' },
              { icon: ShieldCheck, title: 'Kualitas Premium', desc: 'Dipanen dan diproses dengan standar mutu yang ketat.' },
              { icon: HeartPulse, title: 'Kaya Nutrisi', desc: 'Tinggi serat, vitamin, dan mineral untuk kesehatan Anda.' },
              { icon: Users, title: 'Petani Lokal', desc: 'Memberdayakan petani pesisir lokal untuk kesejahteraan bersama.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gray-800/50 border border-gray-700 p-8 rounded-2xl text-center backdrop-blur-sm hover:bg-gray-800 transition-colors"
              >
                <div className="inline-block p-4 bg-lars-gold/10 rounded-full text-lars-gold mb-6">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <WaveBottom colorClass="text-lars-sand" />
      </section>

      {/* Products Section */}
      <section id="products" className="pt-20 pb-32 bg-lars-sand relative">
        <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-fluid-h2 font-serif text-lars-navy mb-4">Koleksi Eksklusif</h2>
            <div className="w-16 h-1 bg-lars-gold mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">Pilihan sayuran laut premium kami yang diolah dengan standar keunggulan untuk memenuhi selera kuliner Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
        <WaveBottom colorClass="text-white" />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="pt-20 pb-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-fluid-h2 font-serif text-lars-navy mb-4">Pengalaman Premium</h2>
            <div className="w-16 h-1 bg-lars-gold mx-auto"></div>
          </div>
          <div className="overflow-hidden relative -mx-4 px-4 py-4">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none hidden md:block"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none hidden md:block"></div>
            <div className="animate-marquee gap-8">
              {[...Array(2)].map((_, arrayIdx) => (
                [
                  {
                    name: "Diana Puspita",
                    product: "Rumput Laut Panggang Pedas",
                    review: "Kualitasnya jauh di atas rata-rata snack rumput laut yang ada di pasaran. Rasa pedasnya pas dan teksturnya sangat renyah. Sangat direkomendasikan!"
                  },
                  {
                    name: "Budi Santoso",
                    product: "Rumput Laut Kering Alami",
                    review: "Sangat segar saat direbus kembali. Saya menggunakannya untuk sup dan tumisan. Rasanya murni laut, tidak amis sama sekali. Kualitas ekspor."
                  },
                  {
                    name: "Sarah Wijaya",
                    product: "Rumput Laut Panggang Garam Laut Asli",
                    review: "Snack favorit anak-anak! Sehat dan kemasannya premium. Sangat terlihat kalau proses pembuatannya dijaga dengan standar tinggi."
                  }
                ].map((item, idx) => (
                  <div key={`${arrayIdx}-${idx}`} className="w-[350px] shrink-0">
                    <div className="bg-lars-sand/30 p-8 rounded-3xl relative border border-gray-100 hover:shadow-xl transition-shadow group flex flex-col h-full">
                      <Quote className="text-lars-gold/10 absolute top-8 right-8 w-16 h-16 group-hover:scale-110 transition-transform" />
                      <div className="flex text-lars-gold mb-6">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                      </div>
                      <p className="text-gray-600 mb-8 leading-relaxed font-light relative z-10 italic">"{item.review}"</p>
                      <div className="border-t border-gray-200 pt-4 mt-auto">
                        <div className="font-semibold text-lars-navy">{item.name}</div>
                        <div className="text-xs text-lars-teal mt-1 font-medium">Pembeli: {item.product}</div>
                      </div>
                    </div>
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>
        <WaveBottom colorClass="text-lars-sand" />
      </section>

      {/* FAQ Section */}
      <FaqSection />

      {/* Location Section */}
      <section id="contact" className="pt-20 pb-32 bg-lars-navy text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-10"
          >
            <div>
              <h3 className="text-lars-gold font-bold tracking-widest uppercase text-sm mb-3">Temukan Kami</h3>
              <h2 className="text-fluid-h2 font-serif mb-6 leading-tight">Sumber Kesegaran Laut</h2>
              <div className="w-16 h-1 bg-lars-gold mb-8"></div>
              <p className="text-gray-300 leading-relaxed font-light">
                Pusat pengolahan dan toko eksklusif kami berlokasi tepat di pesisir Makassar, 
                memastikan setiap sayuran laut diproses di puncak kesegarannya sesaat setelah dipanen.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/5 border border-white/10 p-3 rounded-full text-lars-gold mt-1 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2 tracking-wide uppercase text-sm">Alamat Lokasi</h4>
                  <p className="text-gray-400 leading-relaxed font-light">
                    Jl. Baso Daeng Ngewa Bontoa,<br />
                    Barombong Tamalate.<br />
                    Makassar
                  </p>
                </div>
              </div>
              
              <a 
                href="https://maps.app.goo.gl/Dpn6v4ymTLEzwkAaA" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center space-x-2 text-lars-gold hover:text-white transition-colors font-medium text-sm tracking-wide uppercase mt-4"
              >
                <span>Dapatkan Arah Navigasi</span>
                <span className="text-lg">→</span>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="h-[450px] rounded-3xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-lars-gold/20 p-2 bg-white/5 backdrop-blur-sm">
               <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15893.921601054714!2d119.38782299999999!3d-5.2014165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee2e825000001%3A0x8bb8c9fb6bf9c1cf!2sBarombong%2C%20Kec.%20Tamalate%2C%20Kota%20Makassar%2C%20Sulawesi%20Selatan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
                  width="100%" 
                  height="100%" 
                  className="rounded-2xl"
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>
          </motion.div>
        </div>
        <WaveBottom colorClass="text-slate-900" />
      </section>
    </div>
  );
}
