import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-lars-navy pointer-events-none">
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/assets/kelp_bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-lars-navy/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-fluid-h1 font-serif font-bold text-white mb-6 leading-[1.1]"
        >
          Tingkatkan Selera Anda <br/> dengan <span className="text-lars-gold italic font-normal">Kesempurnaan Laut</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-fluid-p text-white/80 mb-10 font-light max-w-2xl mx-auto tracking-wide leading-relaxed"
        >
          Sayuran laut organik premium, dipanen secara berkelanjutan dan diolah dengan hati-hati menjadi camilan lezat dan bahan masakan terbaik.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <a 
            href="#products"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-lars-gold px-10 py-4 font-medium text-lars-navy transition-all hover:bg-white shadow-xl hover:shadow-lars-gold/20"
          >
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
            <span className="relative flex items-center space-x-2">
              <span className="tracking-widest uppercase text-sm font-bold">Jelajahi Koleksi</span>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 pointer-events-none"
      >
        <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-lars-gold rounded-full"
          />
        </div>
      </motion.div>

      {/* Floating Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-20 md:bottom-24 right-4 md:right-10 z-20 bg-white/95 backdrop-blur-sm px-5 py-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] flex items-center space-x-4 border border-white/40"
      >
        <div className="bg-lars-gold/10 p-2.5 rounded-full text-lars-gold">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div>
          <div className="font-bold text-lars-navy text-xl leading-none mb-1">500+</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Pelanggan Puas</div>
        </div>
      </motion.div>

      {/* Organic Wave Transition to next section (White) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 text-white z-10 -mb-[1px]">
        <svg className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-current"></path>
        </svg>
      </div>
    </section>
  );
}
