import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, ArrowLeft, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function OrderStatus({ addToCart }) {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('order_id') || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Random related products
  const relatedProducts = useMemo(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, []);

  useEffect(() => {
    if (orderId && searchParams.get('order_id')) {
      checkStatus(orderId);
    }
  }, []);

  const checkStatus = async (idToCheck) => {
    if (!idToCheck) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/order-status/${idToCheck}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkStatus(orderId);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'settlement':
      case 'capture':
        return { text: 'Pembayaran Berhasil', color: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle size={20} /> };
      case 'pending':
        return { text: 'Menunggu Pembayaran', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: <Clock size={20} /> };
      case 'deny':
      case 'expire':
      case 'cancel':
        return { text: 'Pembayaran Gagal / Batal', color: 'bg-red-100 text-red-700 border-red-200', icon: <XCircle size={20} /> };
      default:
        return { text: 'Status Tidak Diketahui', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: <AlertCircle size={20} /> };
    }
  };

  return (
    <div className="min-h-screen bg-lars-sand bg-pattern-topography pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-4">
        
        <Link to="/" className="text-lars-teal hover:text-lars-gold flex items-center space-x-2 mb-8 inline-flex bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <ArrowLeft size={16} />
          <span className="font-medium text-sm">Kembali</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-lars-sand rounded-full flex items-center justify-center mx-auto mb-4 text-lars-gold">
              <Package size={32} />
            </div>
            <h1 className="text-3xl font-serif text-lars-navy mb-2">Cek Status Pesanan</h1>
            <p className="text-gray-500">Masukkan Order ID Anda untuk mengetahui status pembayaran.</p>
          </div>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative">
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Contoh: LARS-1234567890" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-lars-gold/50 focus:border-lars-gold outline-none transition-all shadow-sm text-lg"
                required
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            </div>
            <button 
              type="submit" 
              disabled={loading || !orderId.trim()}
              className="w-full mt-4 bg-lars-navy text-white py-4 rounded-xl font-medium tracking-wide hover:bg-lars-gold transition-all duration-300 disabled:opacity-50 shadow-lg shadow-lars-navy/20"
            >
              {loading ? 'Mengecek...' : 'Cek Status'}
            </button>
          </form>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3">
              <AlertCircle size={20} />
              <span>{error}</span>
            </motion.div>
          )}

          {result && !error && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="border-t border-gray-100 pt-8 mt-4">
                <h3 className="text-sm font-bold text-lars-gold tracking-wider uppercase mb-6 text-center">Hasil Pencarian</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-500">Order ID</span>
                    <span className="font-semibold text-lars-navy">{result.order_id}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-500">Total Pembayaran</span>
                    <span className="font-semibold text-lars-navy">Rp {parseInt(result.gross_amount).toLocaleString('id-ID')}</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-500">Metode Pembayaran</span>
                    <span className="font-semibold text-lars-navy capitalize">{result.payment_type ? result.payment_type.replace('_', ' ') : '-'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-500">Waktu Transaksi</span>
                    <span className="font-semibold text-lars-navy">{new Date(result.transaction_time).toLocaleString('id-ID')}</span>
                  </div>

                  {(() => {
                    const statusConfig = getStatusConfig(result.transaction_status);
                    return (
                      <div className={`mt-6 p-6 rounded-xl border flex flex-col items-center justify-center gap-3 text-center ${statusConfig.color}`}>
                        {statusConfig.icon}
                        <div>
                          <p className="text-sm opacity-80 mb-1">Status Pembayaran</p>
                          <h4 className="text-xl font-bold">{statusConfig.text}</h4>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          )}

        </motion.div>

        {/* Related Products Section */}
        <div className="mt-24 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-lars-navy mb-4">Mungkin Anda Suka</h2>
            <div className="w-16 h-1 bg-lars-gold mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
