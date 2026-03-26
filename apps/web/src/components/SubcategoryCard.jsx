import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SubcategoryCard = ({ subcategory, onClick, index }) => {
  const productCount = subcategory.products?.length || 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card 
        className="cursor-pointer overflow-hidden border-border/50 bg-gradient-to-br from-card to-muted/30 hover:shadow-xl hover:shadow-amber-900/15 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
        onClick={onClick}
      >
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-foreground mb-2" style={{ letterSpacing: '-0.02em' }}>
                {subcategory.name}
              </h3>
              <p className="text-sm text-muted-foreground font-medium">
                {productCount > 0 ? `${productCount} productos` : 'Sin productos'}
              </p>
            </div>
            <ChevronRight className="w-8 h-8 text-accent flex-shrink-0 ml-4" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SubcategoryCard;