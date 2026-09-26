import { useState, useEffect } from 'react';

export function useWishlist() {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('lars_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lars_wishlist', JSON.stringify(wishlist));
    // Dispatch a custom event so other components can sync
    window.dispatchEvent(new Event('wishlist-updated'));
  }, [wishlist]);

  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem('lars_wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    };
    window.addEventListener('wishlist-updated', handleSync);
    return () => window.removeEventListener('wishlist-updated', handleSync);
  }, []);

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  return { wishlist, toggleWishlist, isInWishlist };
}
