import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard.jsx';
import ProductDetailModal from '@/components/ProductDetailModal.jsx';
import ProductImageModal from '@/components/ProductImageModal.jsx';
import { Helmet } from 'react-helmet';
import { productsData, getCategories } from '@/data/menuData.js';

const MenuPage = () => {
  const [currentView, setCurrentView] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const categories = useMemo(() => getCategories(), []);

  const handleCategoryClick = (categoryName) => {
    const catData = categories.find(c => c.name === categoryName);
    setSelectedCategory(categoryName);
    
    if (catData && catData.subcategories.length > 0) {
      setCurrentView('subcategories');
    } else {
      setCurrentView('products');
    }
  };

  const handleSubcategoryClick = (subcategoryName) => {
    setSelectedSubcategory(subcategoryName);
    setCurrentView('products');
  };

  const handleBack = () => {
    if (currentView === 'products' && selectedSubcategory) {
      setSelectedSubcategory(null);
      setCurrentView('subcategories');
    } else if (currentView === 'subcategories' || currentView === 'products') {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setCurrentView('categories');
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsImageModalOpen(true);
  };

  const handleViewDetails = (product) => {
    setIsImageModalOpen(false);
    // Small delay to allow image modal to close smoothly before opening detail modal
    setTimeout(() => {
      setIsDetailModalOpen(true);
    }, 300);
  };

  const currentProducts = useMemo(() => {
    if (currentView !== 'products') return [];
    return productsData.filter(p => {
      if (selectedSubcategory) {
        return p.category === selectedCategory && p.subcategory === selectedSubcategory;
      }
      return p.category === selectedCategory;
    });
  }, [currentView, selectedCategory, selectedSubcategory]);

  const currentSubcategories = useMemo(() => {
    if (currentView !== 'subcategories' || !selectedCategory) return [];
    const catData = categories.find(c => c.name === selectedCategory);
    return catData ? catData.subcategories : [];
  }, [currentView, selectedCategory, categories]);

  return (
    <>
      <Helmet>
        <title>Menú Digital - Cafetería</title>
        <meta name="description" content="Explora nuestro menú interactivo con información nutricional detallada." />
      </Helmet>
      
      <div className="min-h-screen bg-background pt-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Navigation */}
          <div className="mb-12">
            {currentView !== 'categories' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6"
              >
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Regresar
                </Button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>
                {currentView === 'categories' ? 'Nuestro Menú' : selectedCategory}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {currentView === 'categories' && "Selecciona una categoría para explorar nuestras opciones."}
                {currentView === 'subcategories' && "Elige una subcategoría."}
                {currentView === 'products' && selectedSubcategory && selectedSubcategory}
              </p>
            </motion.div>
          </div>

          {/* Categories View */}
          {currentView === 'categories' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-[4/5] bg-secondary"
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-destructive/90 via-destructive/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white font-serif">{cat.name}</h3>
                    <p className="text-white/70 text-sm mt-1">Explorar opciones →</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Subcategories View */}
          {currentView === 'subcategories' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {currentSubcategories.map((sub, idx) => (
                <motion.div
                  key={sub}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleSubcategoryClick(sub)}
                  className="bg-card border border-border p-8 rounded-2xl cursor-pointer hover:border-primary hover:shadow-lg transition-all group text-center"
                >
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{sub}</h3>
                </motion.div>
              ))}
            </div>
          )}

          {/* Products View */}
          {currentView === 'products' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onClick={handleProductClick}
                />
              ))}
              {currentProducts.length === 0 && (
                <div className="col-span-full text-center py-20 text-muted-foreground">
                  No hay productos disponibles en esta categoría.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ProductImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onDetails={handleViewDetails}
        product={selectedProduct}
      />

      <ProductDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        product={selectedProduct} 
      />
    </>
  );
};

export default MenuPage;