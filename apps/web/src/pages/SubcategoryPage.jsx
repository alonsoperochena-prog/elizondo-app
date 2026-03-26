import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { getCategories } from '@/data/menuData.js';

const SubcategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const decodedCategory = decodeURIComponent(categoryId);
  
  const categories = useMemo(() => getCategories(), []);
  const categoryData = categories.find(c => c.name === decodedCategory);
  const subcategories = categoryData ? categoryData.subcategories : [];

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Categoría no encontrada.</p>
        <Button onClick={() => navigate('/menu/categories')} className="ml-4">Volver</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{decodedCategory} - Menú</title>
      </Helmet>
      
      <div className="min-h-screen bg-background pt-24 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/menu/categories')}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver a Categorías
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>
              {decodedCategory}
            </h1>
            <p className="text-lg text-muted-foreground">
              Elige una subcategoría para ver los productos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {subcategories.map((sub, idx) => (
              <motion.div
                key={sub}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => navigate(`/menu/products/${encodeURIComponent(sub)}?category=${encodeURIComponent(decodedCategory)}`)}
                className="bg-card border border-border p-8 rounded-3xl cursor-pointer hover:border-primary hover:shadow-xl transition-all group flex items-center justify-between"
              >
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors font-serif">{sub}</h3>
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                </div>
              </motion.div>
            ))}
            {subcategories.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No hay subcategorías disponibles.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubcategoryPage;