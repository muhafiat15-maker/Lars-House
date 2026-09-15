import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ cartCount }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -60% 0px' });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [isHome]);

  const getLinkClass = (sectionId) => {
    const isActive = activeSection === sectionId;
    return `relative group transition-colors ${isActive ? 'text-lars-gold' : 'hover:text-lars-gold'}`;
  };

  const getIndicatorClass = (sectionId) => {
    const isActive = activeSection === sectionId;
    return `absolute -bottom-1 left-0 h-0.5 bg-lars-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`;
  };

  const navBgClass = isHome 
    ? (isScrolled ? 'bg-lars-navy/95 backdrop-blur-md py-4 shadow-lg border-b border-white/5' : 'bg-transparent py-6')
    : 'bg-lars-navy py-4 shadow-lg';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-wider text-white">
          Lars<span className="text-lars-gold">.</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 font-medium text-white/90">
          <a href={isHome ? "#home" : "/"} className={getLinkClass('home')}>
            Beranda
            <span className={getIndicatorClass('home')}></span>
          </a>
          {isHome && (
            <>
              <a href="#products" className={getLinkClass('products')}>
                Produk
                <span className={getIndicatorClass('products')}></span>
              </a>
              <a href="#about" className={getLinkClass('about')}>
                Tentang Kami
                <span className={getIndicatorClass('about')}></span>
              </a>

            </>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/checkout" className="relative group flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors">
            <ShoppingBag className="transition-colors text-white group-hover:text-lars-gold" size={20} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-lars-gold text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-lars-navy border-t border-white/10 shadow-xl flex flex-col overflow-hidden"
          >
            <div className="py-4 px-6 flex flex-col space-y-4 text-white">
              <a href={isHome ? "#home" : "/"} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium ${activeSection === 'home' ? 'text-lars-gold' : 'hover:text-lars-gold'}`}>Beranda</a>
              {isHome && (
                <>
                  <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium ${activeSection === 'products' ? 'text-lars-gold' : 'hover:text-lars-gold'}`}>Produk</a>
                  <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium ${activeSection === 'about' ? 'text-lars-gold' : 'hover:text-lars-gold'}`}>Tentang Kami</a>

                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
