import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext.jsx';

const MerchProductDetail = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  const [selectedOption, setSelectedOption] = useState('');

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (product.options && product.options.length > 0 && !selectedOption) {
      alert('Por favor selecciona una opción');
      return;
    }
    
    const productToAdd = {
      ...product,
      name: `${product.name} ${selectedOption ? `(${selectedOption})` : ''}`,
      id: `${product.id}-${selectedOption}`
    };
    
    addToCart(productToAdd);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="bg-card w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-secondary">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <Button 
                variant="secondary" 
                size="icon" 
                onClick={onClose}
                className="absolute top-4 left-4 rounded-full bg-background/80 backdrop-blur-md md:hidden"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="w-full md:w-1/2 p-8 flex flex-col">
              <div className="flex justify-between items-start mb-4 hidden md:flex">
                <h2 className="text-3xl font-serif font-bold">{product.name}</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <h2 className="text-3xl font-serif font-bold mb-4 md:hidden">{product.name}</h2>
              <p className="text-2xl font-bold text-primary mb-6">${product.price}</p>
              
              {product.options && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                    Selecciona una opción
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`px-4 py-2 rounded-xl border transition-all ${
                          selectedOption === opt 
                            ? 'border-primary bg-primary text-primary-foreground shadow-md' 
                            : 'border-border bg-background hover:border-primary/50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-6">
                <Button 
                  size="lg" 
                  onClick={handleAddToCart}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 rounded-xl text-lg shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Agregar a Orden
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MerchProductDetail;