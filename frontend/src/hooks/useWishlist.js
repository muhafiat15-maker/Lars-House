import { useState, useEffect } from 'react';

export function useWishlist() {
  const [wishlist, setWishlistState] = useState(() => {
    const saved = localStorage.getItem('lars_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem('lars_wishlist');
      if (saved) {
        setWishlistState(prev => {
          if (JSON.stringify(prev) !== saved) {
            return JSON.parse(saved);
          }
          return prev;
        });
      }
    };
    window.addEventListener('wishlist-updated', handleSync);
    return () => window.removeEventListener('wishlist-updated', handleSync);
  }, []);

  const toggleWishlist = (productId) => {
    setWishlistState(prev => {
      const next = prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      
      localStorage.setItem('lars_wishlist', JSON.stringify(next));
      window.dispatchEvent(new Event('wishlist-updated'));
      return next;
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  return { wishlist, toggleWishlist, isInWishlist };
}
