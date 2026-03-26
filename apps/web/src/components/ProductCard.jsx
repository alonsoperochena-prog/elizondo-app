import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ShoppingCart, Info } from 'lucide-react';
import { useCart } from '@/context/CartContext.jsx';

const ProductCard = ({ product, index, onClick }) => {
  const { addToCart } = useCart();

  const handleAddDirectly = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-full"
    >
      <Card 
        className="h-full overflow-hidden border-border bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-2xl group flex flex-col"
        onClick={() => onClick && onClick(product)}
      >
        <div className="relative h-56 w-full overflow-hidden bg-secondary">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-background/90 backdrop-blur-md text-foreground text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
              {product.category}
            </span>
          </div>
        </div>
        
        <CardContent className="p-6 flex flex-col flex-1">
          <div className="flex-1 mb-4">
            <h3 className="text-xl font-bold text-foreground mb-2 font-serif leading-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>
          
          <div className="mt-auto flex flex-col space-y-4">
            <p className="text-2xl font-bold text-foreground">
              ${product.price}
            </p>
            <div className="flex space-x-2">
              <Button 
                onClick={handleAddDirectly}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Agregar
              </Button>
              {product.nutritionalComponents && (
                <Button 
                  variant="outline"
                  onClick={(e) => { e.stopPropagation(); onClick(product); }}
                  className="flex-none rounded-xl border-border hover:bg-secondary"
                  title="Inspeccionar"
                >
                  <Info className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;