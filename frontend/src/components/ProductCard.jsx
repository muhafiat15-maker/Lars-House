import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { useRef } from 'react';
import { useWishlist } from '../hooks/useWishlist';

export default function ProductCard({ product, onAddToCart }) {
  const ref = useRef(null);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative z-10 border border-gray-100"
      >
        <div className="relative aspect-square overflow-hidden bg-lars-sand" style={{ transform: "translateZ(30px)" }}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-white hover:scale-110 transition-all text-red-500"
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <div className="absolute inset-0 bg-lars-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
            <button 
              onClick={() => onAddToCart(product)}
              className="bg-white text-lars-navy px-8 py-3.5 rounded-full font-semibold tracking-wide flex items-center space-x-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out hover:bg-lars-gold hover:text-white shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
            >
              <ShoppingCart size={18} />
              <span className="text-sm uppercase">Beli Sekarang</span>
            </button>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow bg-white" style={{ transform: "translateZ(20px)" }}>
          <div className="text-xs font-bold text-lars-gold tracking-widest uppercase mb-2">{product.category}</div>
          <h3 className="text-xl font-serif font-semibold text-lars-navy mb-2 leading-snug group-hover:text-lars-gold transition-colors">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 font-light leading-relaxed">{product.description}</p>
          <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xl font-medium text-lars-navy">Rp {product.price.toLocaleString('id-ID')}</span>
            {product.weight && <span className="text-sm font-medium text-lars-teal">{product.weight}</span>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
