import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const CartButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  // Hide on auth pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  const isHome = location.pathname === '/';

  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/cart')}
          className={cn(
            "fixed z-50 flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all border border-primary/20",
            isHome ? "top-6 left-6" : "top-6 right-6"
          )}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="font-medium hidden sm:inline">Ver Canasta</span>
          <div className="bg-background text-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ml-1 shadow-sm">
            {cartCount}
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default CartButton;