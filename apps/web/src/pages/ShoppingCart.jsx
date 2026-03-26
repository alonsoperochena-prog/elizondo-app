import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, calculateDynamicNutrition } from '@/context/CartContext.jsx';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import ProductDetailModal from '@/components/ProductDetailModal.jsx';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [editingItem, setEditingItem] = useState(null);

  const aggregatedNutrition = cartItems.reduce((acc, item) => {
    // Only calculate nutrition for items that have nutritional components
    if (!item.nutritionalComponents) return acc;
    
    const itemNutrition = calculateDynamicNutrition(item.baseNutrition, item.customPercentages);
    return {
      carbs: acc.carbs + (itemNutrition.carbs * item.quantity),
      protein: acc.protein + (itemNutrition.protein * item.quantity),
      fat: acc.fat + (itemNutrition.fat * item.quantity),
      calories: acc.calories + (itemNutrition.calories * item.quantity),
      fiber: acc.fiber + (itemNutrition.fiber * item.quantity),
      sodium: acc.sodium + (itemNutrition.sodium * item.quantity),
    };
  }, { carbs: 0, protein: 0, fat: 0, calories: 0, fiber: 0, sodium: 0 });

  return (
    <>
      <Helmet>
        <title>Tu Canasta - Cafetería</title>
      </Helmet>
      
      <div className="min-h-screen bg-background pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Seguir Comprando
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground">Tu Canasta</h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-card rounded-3xl border border-border shadow-sm">
              <ShoppingBag className="w-20 h-20 text-muted-foreground mb-6 opacity-50" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Tu canasta está vacía</h2>
              <p className="text-muted-foreground mb-8">Parece que aún no has agregado nada a tu orden.</p>
              <Button size="lg" onClick={() => navigate('/menu/categories')} className="rounded-xl bg-primary hover:bg-primary/90">
                Explorar el Menú
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => {
                  const hasNutrition = !!item.nutritionalComponents;
                  const itemNutrition = hasNutrition ? calculateDynamicNutrition(item.baseNutrition, item.customPercentages) : null;
                  
                  return (
                    <motion.div 
                      key={item.cartItemId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col sm:flex-row bg-card rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-full sm:w-48 h-48 bg-secondary flex-shrink-0 relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        {hasNutrition && (
                          <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-primary shadow-sm">
                            {itemNutrition.calories} kcal {item.isPersonalized ? '(Pers.)' : '(Orig.)'}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-foreground font-serif">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <p className="text-xl font-bold text-foreground">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                        </div>

                        {/* Customization Summary for Menu Items */}
                        {hasNutrition && item.customPercentages && (
                          <div className="flex flex-wrap gap-2 mb-4 mt-2">
                            {item.customPercentages.map((comp, idx) => (
                              <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/50 font-medium">
                                {comp.name}: {comp.currentPercentage !== undefined ? comp.currentPercentage : comp.defaultPercentage}%
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                          <div className="flex items-center space-x-3 bg-secondary rounded-xl p-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-lg hover:bg-background"
                              onClick={() => updateQuantity(item.cartItemId, -1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-medium w-6 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-lg hover:bg-background"
                              onClick={() => updateQuantity(item.cartItemId, 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="flex space-x-2">
                            {hasNutrition && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg"
                                onClick={() => setEditingItem(item)}
                              >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Editar
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
                              onClick={() => removeFromCart(item.cartItemId)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Order Summary & Nutrition */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Nutrition Summary (Only if there are items with nutrition) */}
                {aggregatedNutrition.calories > 0 && (
                  <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
                    <h3 className="text-lg font-bold font-serif mb-4 border-b border-border pb-4">Resumen Nutricional Total</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Calorías Totales</span>
                        <span className="font-bold text-primary">{aggregatedNutrition.calories} kcal</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Carbohidratos</span>
                        <span className="font-medium">{aggregatedNutrition.carbs} g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Proteína</span>
                        <span className="font-medium">{aggregatedNutrition.protein} g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Grasa</span>
                        <span className="font-medium">{aggregatedNutrition.fat} g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fibra</span>
                        <span className="font-medium">{aggregatedNutrition.fiber} g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sodio</span>
                        <span className="font-medium">{aggregatedNutrition.sodium} mg</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Checkout Summary */}
                <div className="bg-card rounded-3xl p-6 shadow-xl border border-border">
                  <h3 className="text-lg font-bold font-serif mb-4 border-b border-border pb-4">Resumen de Orden</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Impuestos (16%)</span>
                      <span className="font-medium">${(cartTotal * 0.16).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-4 border-t border-border mt-4">
                      <span>Total</span>
                      <span>${(cartTotal * 1.16).toFixed(2)}</span>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14 rounded-xl font-bold shadow-lg"
                  >
                    Proceder al pago
                  </Button>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>

      {editingItem && (
        <ProductDetailModal 
          isOpen={!!editingItem} 
          onClose={() => setEditingItem(null)} 
          product={editingItem} 
          editCartItemId={editingItem.cartItemId}
        />
      )}
    </>
  );
};

export default ShoppingCart;