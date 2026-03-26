import React from 'react';
import { motion } from 'framer-motion';

const NutrientSilhouette = ({ categoryId, components, productId }) => {
  // Precise, realistic SVG paths
  const getClipPath = () => {
    if (productId === 'cafe-americano' || productId === 'cappuccino') {
      // Coffee Cup with handle
      return "M20,20 L80,20 L75,80 C75,95 25,95 20,80 Z M80,30 C95,30 95,60 78,60 L76,50 C85,50 85,40 79,40 Z";
    }
    if (productId === 'matcha-frio' || productId === 'cold-brew' || categoryId === 'smoothies') {
      // Tall Glass
      return "M30,10 L70,10 L65,90 C65,98 35,98 30,90 Z";
    }
    if (productId === 'croissant') {
      // Croissant shape
      return "M10,60 C10,20 50,10 90,60 C80,80 50,90 10,60 Z";
    }
    if (categoryId === 'pan_dulce') {
      // Concha / Round pastry
      return "M10,60 C10,10 90,10 90,60 C90,75 10,75 10,60 Z";
    }
    if (categoryId === 'sandwiches') {
      // Sandwich triangle
      return "M10,20 L90,20 L90,80 L10,80 Z";
    }
    // Default rounded rect
    return "M10,10 L90,10 Q100,10 100,20 L100,80 Q100,90 90,90 L10,90 Q0,90 0,80 L0,20 Q0,10 10,10 Z";
  };

  const totalPercentage = components.reduce((sum, c) => sum + (c.currentPercentage || c.defaultPercentage), 0);

  return (
    <div className="relative w-48 h-64 mx-auto drop-shadow-2xl">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id={`silhouette-${productId || categoryId}`} clipPathUnits="objectBoundingBox">
            <path d={getClipPath()} transform="scale(0.01, 0.01)" />
          </clipPath>
        </defs>
      </svg>

      {/* flex-col-reverse ensures the first item in the array is rendered at the BOTTOM */}
      <div 
        className="w-full h-full bg-secondary/30 border-2 border-border/50 flex flex-col-reverse overflow-hidden"
        style={{ clipPath: `url(#silhouette-${productId || categoryId})` }}
      >
        {components.map((comp, idx) => {
          const val = comp.currentPercentage !== undefined ? comp.currentPercentage : comp.defaultPercentage;
          const heightPct = totalPercentage > 0 ? (val / totalPercentage) * 100 : 0;
          
          return (
            <motion.div
              key={idx}
              animate={{ height: `${heightPct}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              style={{ backgroundColor: comp.color }}
              className="w-full flex items-center justify-center overflow-hidden border-t border-black/5 relative group"
            >
              {heightPct > 12 && (
                <span className="text-black/80 font-bold text-sm drop-shadow-sm mix-blend-overlay px-2 text-center leading-tight">
                  {comp.name}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Glass reflection overlay for realism */}
      <div 
        className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/30 to-white/50 mix-blend-overlay"
        style={{ clipPath: `url(#silhouette-${productId || categoryId})` }}
      />
    </div>
  );
};

export default NutrientSilhouette;