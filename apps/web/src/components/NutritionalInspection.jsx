import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NutritionalInspection = ({ product, onBack }) => {
  // Initialize state with default percentages
  const [components, setComponents] = useState([]);

  useEffect(() => {
    if (product?.nutritionalComponents) {
      setComponents(product.nutritionalComponents.map(c => ({
        ...c,
        currentPercentage: c.defaultPercentage
      })));
    }
  }, [product]);

  const handlePercentageChange = (index, newValue) => {
    const val = Math.max(0, Math.min(100, Number(newValue) || 0));
    const newComponents = [...components];
    newComponents[index].currentPercentage = val;
    setComponents(newComponents);
  };

  const adjustPercentage = (index, delta) => {
    const current = components[index].currentPercentage;
    handlePercentageChange(index, current + delta);
  };

  // Calculate dynamic nutrition based on percentage changes
  const totalCurrentPercentage = components.reduce((sum, c) => sum + c.currentPercentage, 0);
  const totalDefaultPercentage = components.reduce((sum, c) => sum + c.defaultPercentage, 0);
  
  const scaleFactor = totalDefaultPercentage > 0 ? (totalCurrentPercentage / totalDefaultPercentage) : 1;
  
  const base = product?.baseNutrition || { carbs: 0, protein: 0, fat: 0, calories: 0, fiber: 0, sodium: 0 };
  
  const dynamicNutrition = {
    carbs: Math.round(base.carbs * scaleFactor),
    protein: Math.round(base.protein * scaleFactor),
    fat: Math.round(base.fat * scaleFactor),
    calories: Math.round(base.calories * scaleFactor),
    fiber: Math.round(base.fiber * scaleFactor),
    sodium: Math.round(base.sodium * scaleFactor),
  };

  if (!product) return null;

  return (
    <div className="flex flex-col h-full w-full bg-background text-foreground p-6 overflow-y-auto">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="hover:bg-secondary hover:text-primary transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al producto
        </Button>
        <h2 className="text-2xl font-serif font-bold ml-auto mr-auto pr-24">Inspección Nutricional</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 flex-1">
        
        {/* Column 1: Silhouette */}
        <div className="flex flex-col items-center justify-center bg-secondary/30 rounded-2xl p-8 border border-border">
          <h3 className="text-lg font-semibold mb-8 text-center">Composición Visual</h3>
          <div className="relative w-48 h-72">
            <div className="absolute inset-0 clip-cup bg-secondary overflow-hidden flex flex-col-reverse shadow-inner border-4 border-border/50">
              {components.map((comp, idx) => {
                const heightPct = totalCurrentPercentage > 0 ? (comp.currentPercentage / totalCurrentPercentage) * 100 : 0;
                return (
                  <motion.div
                    key={idx}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    style={{ backgroundColor: comp.color }}
                    className="w-full flex items-center justify-center overflow-hidden border-t border-black/10"
                  >
                    {heightPct > 10 && (
                      <span className="text-white/90 font-bold text-sm drop-shadow-md mix-blend-difference">
                        {comp.name}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
            <div className="absolute inset-0 clip-cup pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/30" />
          </div>
        </div>

        {/* Column 2: Interactive Controls */}
        <div className="flex flex-col bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold mb-6 border-b border-border pb-4">Ajustar Componentes</h3>
          <div className="space-y-6">
            {components.map((comp, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: comp.color }} />
                  <span className="font-medium">{comp.name}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    onClick={() => adjustPercentage(idx, -1)}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  
                  <div className="relative w-16">
                    <Input
                      type="number"
                      value={comp.currentPercentage}
                      onChange={(e) => handlePercentageChange(idx, e.target.value)}
                      className="h-8 text-center pr-4 font-medium bg-background border-border focus-visible:ring-primary"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">%</span>
                  </div>

                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    onClick={() => adjustPercentage(idx, 1)}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-6">
            <div className="flex justify-between items-center text-sm font-medium text-muted-foreground px-2">
              <span>Total:</span>
              <span className={totalCurrentPercentage !== 100 ? "text-primary font-bold" : ""}>
                {totalCurrentPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Column 3: Tables */}
        <div className="flex flex-col space-y-6">
          {/* Table 1: Nutrition */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold mb-4 border-b border-border pb-4">Valores Nutricionales Totales</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Calorías</span>
                <span className="font-semibold">{dynamicNutrition.calories} kcal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Carbohidratos</span>
                <span className="font-semibold">{dynamicNutrition.carbs} g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Proteína</span>
                <span className="font-semibold">{dynamicNutrition.protein} g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Grasa</span>
                <span className="font-semibold">{dynamicNutrition.fat} g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fibra</span>
                <span className="font-semibold">{dynamicNutrition.fiber} g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sodio</span>
                <span className="font-semibold">{dynamicNutrition.sodium} mg</span>
              </div>
            </div>
          </div>

          {/* Table 2: Ingredients */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border flex-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-border pb-4">Ingredientes</h3>
            <ul className="space-y-2">
              {product.ingredients?.map((ing, idx) => (
                <li key={idx} className="text-sm flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0" />
                  <span className="text-foreground">{ing}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NutritionalInspection;