import React, { useState, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { productsData } from '@/data/menuData.js';
import { useCart } from '@/context/CartContext.jsx';
import ProductDetailModal from '@/components/ProductDetailModal.jsx';

const ProductListPage = () => {
  const navigate = useNavigate();
  const { subcategoryId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const decodedSubcategory = decodeURIComponent(subcategoryId);
  
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = useMemo(() => {
    return productsData.filter(p => 
      p.subcategory === decodedSubcategory && 
      (!category || p.category === category)
    );
  }, [decodedSubcategory, category]);

  const handleAddDirectly = (e, product) => {
    e.stopPropagation();
    // Add with original percentages, isPersonalized = false
    addToCart(product, null, false);
  };

  const handleInspect = (e, product) => {
    e.stopPropagation();
    setSelectedProduct(product);
  };

  return (
    <>
      <Helmet>
        <title>{decodedSubcategory} - Menú</title>
      </Helmet>
      
      <div className="min-h-screen bg-background pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <Button
              variant="ghost"
              onClick={() => navigate(`/menu/subcategories/${encodeURIComponent(category || '')}`)}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver a {category || 'Subcategorías'}
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
              {decodedSubcategory}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-64 w-full overflow-hidden bg-secondary">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex-1 mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2 font-serif leading-tight">
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
                    <div className="flex space-x-3">
                      <Button 
                        onClick={(e) => handleAddDirectly(e, product)}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-12 text-base shadow-md"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Agregar al carrito
                      </Button>
                      {product.nutritionalComponents && (
                        <Button 
                          variant="outline"
                          onClick={(e) => handleInspect(e, product)}
                          className="flex-none rounded-xl border-border hover:bg-secondary h-12 w-12 p-0"
                          title="Inspeccionar y personalizar"
                        >
                          <Info className="w-5 h-5 text-muted-foreground" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {products.length === 0 && (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                No hay productos disponibles en esta categoría.
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductDetailModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
    </>
  );
};

export default ProductListPage;