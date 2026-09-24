import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, ShieldCheck, CreditCard, Lock, ShoppingBag, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Checkout({ cart, removeFromCart, updateQuantity }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setGoogleUser(decoded);
      setFormData(prev => ({
        ...prev,
        name: prev.name || decoded.name,
        email: prev.email || decoded.email
      }));
    } catch (error) {
      console.error("Error decoding Google JWT", error);
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order data
      const orderData = {
        order_id: `LARS-${Date.now()}`,
        gross_amount: total,
        customer_details: {
          first_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          shipping_address: { address: formData.address }
        },
        item_details: cart.map(item => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          name: item.name
        }))
      };

      // Call our backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (data.snapToken) {
        // Trigger Midtrans popup
        window.snap.pay(data.snapToken, {
          onSuccess: function (result) {
            alert("Payment Success! We will contact you via WhatsApp.");
            navigate('/cek-pesanan?order_id=' + orderData.order_id);
            // Clear cart logic here (would pass clearCart from App.jsx)
          },
          onPending: function (result) {
            alert("Waiting for your payment!");
            navigate('/cek-pesanan?order_id=' + orderData.order_id);
          },
          onError: function (result) {
            alert("Payment failed!");
          },
          onClose: function () {
            alert("You closed the popup without finishing the payment.");
          }
        });
      } else {
        alert("Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Error processing checkout. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-4 flex flex-col items-center bg-lars-sand bg-pattern-topography">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-center max-w-md w-full mt-12"
        >
          <div className="w-24 h-24 bg-lars-sand rounded-full flex items-center justify-center mx-auto mb-6 text-lars-gold">
            <ShoppingBag size={48} />
          </div>
          <h2 className="text-3xl font-serif text-lars-navy mb-4">Keranjang Kosong</h2>
          <p className="text-gray-500 mb-8">Anda belum menambahkan produk apapun ke keranjang belanja Anda.</p>
          <Link to="/" className="bg-lars-navy text-white px-8 py-4 rounded-full hover:bg-lars-gold transition-colors inline-flex items-center space-x-2 font-medium">
            <ArrowLeft size={20} />
            <span>Kembali Belanja</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lars-sand bg-pattern-waves pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10">

        {/* Cart Items */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
          <Link to="/" className="text-lars-teal hover:text-lars-gold flex items-center space-x-2 mb-8 inline-flex bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <ArrowLeft size={16} />
            <span className="font-medium text-sm">Kembali Belanja</span>
          </Link>

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif text-lars-navy">Ringkasan Pesanan</h2>
            <span className="bg-lars-gold/20 text-lars-navy px-3 py-1 rounded-full text-sm font-semibold border border-lars-gold/30">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
            </span>
          </div>

          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-shadow group">
                <div className="relative overflow-hidden rounded-xl bg-gray-50">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-grow py-2">
                  <div className="text-xs font-bold text-lars-gold tracking-wider uppercase mb-1">{item.category}</div>
                  <h4 className="font-semibold text-lars-navy text-lg">{item.name}</h4>
                  <div className="text-lars-teal font-bold mt-1">Rp {item.price.toLocaleString('id-ID')}</div>
                </div>
                <div className="flex items-center space-x-4 bg-gray-50 rounded-full p-1 border border-gray-200">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:text-lars-gold hover:scale-105 transition-transform">-</button>
                  <span className="w-4 text-center font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:text-lars-gold hover:scale-105 transition-transform">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-3 hover:bg-red-50 rounded-full transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Checkout Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-fit sticky top-32">

            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
              <h2 className="text-2xl font-serif text-lars-navy flex items-center gap-2">
                <ShieldCheck className="text-lars-gold" size={24} />
                Detail Pengiriman
              </h2>
            </div>

            <div className="bg-lars-sand/50 rounded-2xl p-6 mb-8 border border-lars-gold/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-lars-navy">Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <span className="text-gray-600">Pengiriman</span>
                <span className="font-medium text-lars-teal">Dihitung nanti</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-lars-navy">
                <span>Total Tagihan</span>
                <span className="text-lars-gold">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="space-y-5">
              
              {/* Google Login Section */}
              <div className="mb-2">
                {!googleUser ? (
                  <div className="bg-lars-sand/30 p-5 rounded-xl border border-lars-gold/20 flex flex-col items-center">
                    <p className="text-sm text-lars-navy mb-4 font-medium">Isi form lebih cepat dengan akun Google Anda</p>
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                      useOneTap
                    />
                  </div>
                ) : (
                  <div className="bg-lars-teal/10 p-4 rounded-xl border border-lars-teal/30 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      {googleUser.picture && (
                        <img src={googleUser.picture} alt="Profile" className="w-8 h-8 rounded-full shadow-sm" />
                      )}
                      <span className="text-lars-navy text-sm font-medium">
                        Masuk sebagai: {googleUser.name} <span className="text-lars-teal font-bold">✓</span>
                      </span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => {
                        setGoogleUser(null);
                        setFormData(prev => ({...prev, name: '', email: ''}));
                      }} 
                      className="text-xs text-lars-teal hover:text-lars-navy flex items-center gap-1 font-medium bg-white px-2 py-1 rounded shadow-sm border border-lars-teal/20 transition-colors"
                    >
                      <LogOut size={12} /> Ganti akun
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-lars-gold/50 focus:border-lars-gold outline-none transition-all shadow-sm" placeholder="Contoh: Budi Santoso" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-lars-gold/50 focus:border-lars-gold outline-none transition-all shadow-sm" placeholder="contoh@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nomor WhatsApp</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-lars-gold/50 focus:border-lars-gold outline-none transition-all shadow-sm" placeholder="0812..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
                <textarea name="address" required value={formData.address} onChange={handleChange} rows="3" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-lars-gold/50 focus:border-lars-gold outline-none transition-all shadow-sm resize-none" placeholder="Jalan, RT/RW, Kecamatan, Kota..."></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-lars-navy text-white py-4 rounded-xl font-medium tracking-wide hover:bg-lars-gold transition-all duration-300 disabled:opacity-50 mt-6 shadow-lg shadow-lars-navy/20 flex items-center justify-center space-x-2 group"
              >
                {loading ? (
                  <span>Memproses...</span>
                ) : (
                  <>
                    <CreditCard size={20} className="group-hover:scale-110 transition-transform" />
                    <span>Bayar dengan Midtrans</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-gray-400 mt-4 text-sm">
                <Lock size={14} />
                <span>Pembayaran aman & terenkripsi</span>
              </div>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
