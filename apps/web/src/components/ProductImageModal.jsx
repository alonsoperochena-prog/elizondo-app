import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductImageModal = ({ isOpen, onClose, onDetails, product }) => {
  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md"
        >
          {/* Top Actions */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </Button>
            
            <Button 
              onClick={() => onDetails(product)}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
            >
              <Info className="w-4 h-4 mr-2" />
              Ver detalles
            </Button>
          </div>

          {/* Image Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center p-4"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
            
            {/* Bottom Info Overlay */}
            <div className="absolute bottom-10 left-0 right-0 text-center">
              <h2 className="text-4xl md:text-6xl font-bold font-serif text-white mb-2 drop-shadow-lg">
                {product.name}
              </h2>
              <p className="text-xl text-white/80 font-medium drop-shadow-md">
                ${product.price}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductImageModal;