import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Coffee, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext.jsx';

const GranosProductDetail = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
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
            className="bg-card w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-secondary">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
              <Button 
                variant="secondary" 
                size="icon" 
                onClick={onClose}
                className="absolute top-4 left-4 rounded-full bg-background/80 backdrop-blur-md md:hidden"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
              <div className="flex justify-between items-start mb-6 hidden md:flex">
                <div>
                  <h2 className="text-3xl font-serif font-bold">{product.name}</h2>
                  <p className="text-2xl font-bold text-primary mt-2">${product.price}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="md:hidden mb-6">
                <h2 className="text-3xl font-serif font-bold">{product.name}</h2>
                <p className="text-2xl font-bold text-primary mt-2">${product.price}</p>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-lg font-bold flex items-center mb-2">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Historia del Producto
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{product.history}</p>
                </div>

                <div className="bg-secondary/50 p-4 rounded-xl border border-border">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1 text-muted-foreground">Tipo de Tueste</h3>
                  <p className="text-lg font-medium">{product.roast}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold flex items-center mb-2">
                    <Coffee className="w-5 h-5 mr-2 text-primary" />
                    Recomendado para
                  </h3>
                  <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                    {product.recommendations?.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
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

export default GranosProductDetail;