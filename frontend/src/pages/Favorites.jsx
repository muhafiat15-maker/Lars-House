import { useWishlist } from '../hooks/useWishlist';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';

export default function Favorites({ addToCart }) {
  const { wishlist } = useWishlist();
  
  const favoriteProducts = products.filter(product => wishlist.includes(product.id));

  return (
    <div className="min-h-screen bg-lars-sand bg-pattern-waves pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link to="/" className="text-lars-teal hover:text-lars-gold flex items-center space-x-2 mb-8 inline-flex bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <ArrowLeft size={16} />
          <span className="font-medium text-sm">Kembali Belanja</span>
        </Link>
        
        <div className="flex items-center space-x-3 mb-10">
          <Heart className="text-red-500" size={32} fill="currentColor" />
          <h2 className="text-4xl font-serif text-lars-navy">Produk Favorit</h2>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-center max-w-xl mx-auto">
            <Heart size={64} className="text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-serif text-lars-navy mb-4">Belum ada produk favorit</h3>
            <p className="text-gray-500 mb-8 text-lg">Anda belum menambahkan produk ke daftar favorit Anda. Silakan jelajahi koleksi kami dan tambahkan produk kesukaan Anda.</p>
            <Link to="/" className="bg-lars-navy text-white px-8 py-4 rounded-full hover:bg-lars-gold transition-colors inline-block font-medium">
              Jelajahi Produk
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
