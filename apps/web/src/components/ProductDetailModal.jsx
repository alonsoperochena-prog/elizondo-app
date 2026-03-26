import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, RotateCcw, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NutrientSilhouette from './NutrientSilhouette.jsx';
import SmartPercentageController from './SmartPercentageController.jsx';
import { useCart, calculateDynamicNutrition } from '@/context/CartContext.jsx';

const ProductDetailModal = ({ isOpen, onClose, product, editCartItemId = null }) => {
  const [customComponents, setCustomComponents] = useState([]);
  const { addToCart, updateCartItemCustomization, cartItems } = useCart();

  useEffect(() => {
    if (isOpen && product) {
      if (editCartItemId) {
        const itemToEdit = cartItems.find(item => item.cartItemId === editCartItemId);
        if (itemToEdit && itemToEdit.customPercentages) {
          setCustomComponents(JSON.parse(JSON.stringify(itemToEdit.customPercentages)));
        }
      } else if (product.nutritionalComponents) {
        setCustomComponents(product.nutritionalComponents.map(c => ({
          ...c,
          currentPercentage: c.defaultPercentage
        })));
      }
    }
  }, [isOpen, product, editCartItemId, cartItems]);

  const handleReset = () => {
    if (product?.nutritionalComponents) {
      setCustomComponents(product.nutritionalComponents.map(c => ({
        ...c,
        currentPercentage: c.defaultPercentage
      })));
    }
  };

  const handleSave = () => {
    if (editCartItemId) {
      updateCartItemCustomization(editCartItemId, customComponents);
    } else {
      // Pass true for isPersonalized since they inspected and potentially modified it
      addToCart(product, customComponents, true);
    }
    onClose();
  };

  if (!isOpen || !product) return null;

  const dynamicNutrition = calculateDynamicNutrition(product.baseNutrition, customComponents);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl h-[90vh] max-h-[850px] bg-background rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-card">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground leading-tight">
                  {editCartItemId ? 'Editar Personalización' : product.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="rounded-full hover:bg-secondary text-foreground"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Column 1: Visual & Reset */}
                <div className="flex flex-col items-center space-y-6">
                  <div className="w-full bg-secondary/30 rounded-3xl p-8 border border-border flex flex-col items-center justify-center shadow-inner">
                    <h3 className="text-lg font-semibold mb-6 text-center">Composición Visual</h3>
                    {product.nutritionalComponents ? (
                      <NutrientSilhouette 
                        categoryId={product.categoryId} 
                        productId={product.id}
                        components={customComponents} 
                      />
                    ) : (
                      <div className="w-48 h-64 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground text-center p-4">
                        Sin personalización visual
                      </div>
                    )}
                  </div>
                  
                  {product.nutritionalComponents && (
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      className="w-full border-border hover:bg-secondary text-muted-foreground hover:text-foreground rounded-xl h-12"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Regresar a original
                    </Button>
                  )}
                </div>

                {/* Column 2: Smart Controller */}
                <div className="flex flex-col">
                  {product.nutritionalComponents ? (
                    <SmartPercentageController 
                      components={customComponents}
                      onChange={setCustomComponents}
                    />
                  ) : (
                    <div className="bg-card rounded-3xl p-6 border border-border text-center text-muted-foreground h-full flex items-center justify-center shadow-sm">
                      Este producto no permite ajuste de componentes.
                    </div>
                  )}
                </div>

                {/* Column 3: Nutrition & Ingredients */}
                <div className="flex flex-col space-y-6">
                  <div className="bg-card rounded-3xl p-6 shadow-sm border border-border">
                    <h3 className="text-lg font-semibold mb-4 border-b border-border pb-4">Valores Nutricionales</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Calorías</span>
                        <motion.span 
                          key={dynamicNutrition.calories}
                          initial={{ scale: 1.2, color: 'var(--primary)' }}
                          animate={{ scale: 1, color: 'inherit' }}
                          className="font-bold text-primary"
                        >
                          {dynamicNutrition.calories} kcal
                        </motion.span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Carbohidratos</span>
                        <span className="font-medium">{dynamicNutrition.carbs} g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Proteína</span>
                        <span className="font-medium">{dynamicNutrition.protein} g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Grasa</span>
                        <span className="font-medium">{dynamicNutrition.fat} g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fibra</span>
                        <span className="font-medium">{dynamicNutrition.fiber} g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sodio</span>
                        <span className="font-medium">{dynamicNutrition.sodium} mg</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-3xl p-6 shadow-sm border border-border flex-1">
                    <h3 className="text-lg font-semibold mb-4 border-b border-border pb-4">Ingredientes</h3>
                    <ul className="space-y-3">
                      {product.ingredients?.map((ing, idx) => (
                        <li key={idx} className="text-sm flex items-center">
                          <span className="w-2 h-2 rounded-full bg-primary mr-3 flex-shrink-0" />
                          <span className="text-foreground font-medium">{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border bg-card flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-medium uppercase tracking-wider">Total</p>
                <div className="flex items-baseline space-x-4">
                  <p className="text-3xl font-bold text-foreground">${product.price}</p>
                  <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                    {dynamicNutrition.calories} kcal
                  </p>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={handleSave}
                className="rounded-xl px-8 bg-primary text-primary-foreground hover:bg-primary/90 text-base h-14 shadow-lg hover:shadow-xl transition-all"
              >
                {editCartItemId ? (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Guardar Cambios
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Agregar a la orden
                  </>
                )}
              </Button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;