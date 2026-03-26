import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const calculateDynamicNutrition = (baseNutrition, customPercentages) => {
  if (!baseNutrition) return { carbs: 0, protein: 0, fat: 0, calories: 0, fiber: 0, sodium: 0 };
  if (!customPercentages || customPercentages.length === 0) return baseNutrition;

  const totalCurrentPercentage = customPercentages.reduce((sum, c) => sum + c.currentPercentage, 0);
  const totalDefaultPercentage = customPercentages.reduce((sum, c) => sum + c.defaultPercentage, 0);
  
  const scaleFactor = totalDefaultPercentage > 0 ? (totalCurrentPercentage / totalDefaultPercentage) : 1;
  
  return {
    carbs: Math.round(baseNutrition.carbs * scaleFactor),
    protein: Math.round(baseNutrition.protein * scaleFactor),
    fat: Math.round(baseNutrition.fat * scaleFactor),
    calories: Math.round(baseNutrition.calories * scaleFactor),
    fiber: Math.round(baseNutrition.fiber * scaleFactor),
    sodium: Math.round(baseNutrition.sodium * scaleFactor),
  };
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cafeteria_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cafeteria_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, customPercentages = null, isPersonalized = false) => {
    setCartItems(prev => {
      // If it's not personalized, we use the default components but mark it as not personalized
      const componentsToSave = customPercentages || product.nutritionalComponents;
      
      const existingItemIndex = prev.findIndex(item => 
        item.id === product.id && 
        JSON.stringify(item.customPercentages) === JSON.stringify(componentsToSave) &&
        item.isPersonalized === isPersonalized
      );

      if (existingItemIndex >= 0) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }

      return [...prev, { 
        ...product, 
        cartItemId: `${product.id}-${Date.now()}`,
        quantity: 1, 
        customPercentages: componentsToSave,
        isPersonalized
      }];
    });
    toast.success(`${product.name} agregado a la orden`);
  };

  const updateCartItemCustomization = (cartItemId, newCustomPercentages) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        return { ...item, customPercentages: newCustomPercentages, isPersonalized: true };
      }
      return item;
    }));
    toast.success('Personalización actualizada');
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => {
    return total + (parseFloat(item.price) * item.quantity);
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateCartItemCustomization,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};