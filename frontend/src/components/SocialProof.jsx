import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { products } from '../data/products';

const DUMMY_NAMES = [
  'Budi dari Jakarta',
  'Siti dari Surabaya',
  'Andi dari Makassar',
  'Rina dari Bandung',
  'Dewi dari Bali',
  'Agus dari Medan',
  'Nina dari Yogyakarta'
];

export default function SocialProof() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const showNotification = () => {
      const randomName = DUMMY_NAMES[Math.floor(Math.random() * DUMMY_NAMES.length)];
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      
      setNotification({
        id: Date.now(),
        name: randomName,
        productName: randomProduct.name,
        image: randomProduct.image
      });

      // Hide after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    };

    // Initial delay before first notification
    const initialTimer = setTimeout(() => {
      showNotification();
      
      // Then repeat every 15-20 seconds
      const intervalTimer = setInterval(() => {
        showNotification();
      }, Math.floor(Math.random() * 5000) + 15000); // 15s to 20s

      return () => clearInterval(intervalTimer);
    }, 5000); // First notification after 5 seconds

    return () => clearTimeout(initialTimer);
  }, []);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, x: -50, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          className="fixed bottom-8 left-4 z-50 bg-white rounded-xl shadow-xl border border-gray-100 p-4 w-72 flex items-start gap-3"
        >
          <div className="shrink-0 relative">
            <img 
              src={notification.image} 
              alt={notification.productName} 
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full">
              <CheckCircle2 size={20} className="text-green-500" fill="currentColor" stroke="white" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 mb-1">{notification.name} baru saja membeli</p>
            <p className="text-sm font-semibold text-lars-navy truncate">{notification.productName}</p>
            <p className="text-xs text-lars-teal mt-1">Beberapa saat yang lalu</p>
          </div>

          <button 
            onClick={() => setNotification(null)}
            className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
