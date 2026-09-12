import { MapPin, Phone, Mail, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-8 relative overflow-hidden border-t border-white/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-topography opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section - Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Description */}
          <div className="lg:col-span-5 lg:pr-12">
            <Link to="/" className="text-4xl font-serif font-bold text-white tracking-wider block mb-6">
              Lars<span className="text-lars-gold">.</span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-8 font-light text-sm">
              Sayuran laut premium yang diolah untuk gaya hidup modern dan sehat. Bersumber secara berkelanjutan langsung dari perairan pesisir Makassar yang asri.
            </p>
            <div className="flex flex-wrap gap-6 items-start">
              <div className="flex space-x-4">
                <a href="https://instagram.com/lars_seavegetables" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-lars-gold hover:text-white hover:border-lars-gold transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <Link to="/checkout" className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-lars-gold hover:text-white hover:border-lars-gold transition-all duration-300">
                  <ShoppingBag size={18} />
                </Link>
              </div>

              {/* WhatsApp QR Code */}
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl inline-block hover:border-lars-gold/50 transition-colors">
                <p className="text-[10px] text-gray-400 mb-2 font-medium text-center uppercase tracking-wider">Chat WA</p>
                <div className="bg-white p-1.5 rounded-xl">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/6281344824482" 
                    alt="WhatsApp QR Code" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-medium tracking-widest text-xs uppercase mb-8 opacity-60">Tautan Cepat</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-lars-gold transition-colors text-sm inline-flex items-center group"><span className="w-4 h-[1px] bg-lars-gold mr-3 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span> Beranda</Link></li>
              <li><a href="#products" className="text-gray-400 hover:text-lars-gold transition-colors text-sm inline-flex items-center group"><span className="w-4 h-[1px] bg-lars-gold mr-3 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span> Produk</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-lars-gold transition-colors text-sm inline-flex items-center group"><span className="w-4 h-[1px] bg-lars-gold mr-3 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span> Tentang Kami</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-lars-gold transition-colors text-sm inline-flex items-center group"><span className="w-4 h-[1px] bg-lars-gold mr-3 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span> Ulasan</a></li>
            </ul>
          </div>


          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-medium tracking-widest text-xs uppercase mb-8 opacity-60">Hubungi Kami</h3>
            <ul className="space-y-5">
              <li className="flex items-start space-x-4 group">
                <MapPin size={18} className="text-gray-500 group-hover:text-lars-gold transition-colors shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm font-light leading-relaxed">Jl. Baso Daeng Ngewa Bontoa, Barombong Tamalate. Makassar</span>
              </li>
              <li className="flex items-center space-x-4 group">
                <Phone size={18} className="text-gray-500 group-hover:text-lars-gold transition-colors shrink-0" />
                <span className="text-gray-400 text-sm font-light">081344824482</span>
              </li>
              <li className="flex items-center space-x-4 group">
                <Mail size={18} className="text-gray-500 group-hover:text-lars-gold transition-colors shrink-0" />
                <span className="text-gray-400 text-sm font-light">larshouse3@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0 tracking-wide">
            &copy; {new Date().getFullYear()} Lars House. Hak cipta dilindungi.
          </p>
          <div className="flex space-x-6 text-xs text-gray-500 tracking-wider uppercase font-medium">
            <span>Dibuat dengan presisi untuk Keanggunan Pesisir</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
