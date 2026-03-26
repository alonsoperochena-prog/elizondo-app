import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { getCategories } from '@/data/menuData.js';

const CategoryPage = () => {
  const navigate = useNavigate();
  const categories = useMemo(() => getCategories(), []);

  return (
    <>
      <Helmet>
        <title>Categorías - Menú</title>
      </Helmet>
      
      <div className="min-h-screen bg-background pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al Inicio
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>
              Nuestro Menú
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Selecciona una categoría para explorar nuestras opciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => navigate(`/menu/subcategories/${encodeURIComponent(cat.name)}`)}
                className="group cursor-pointer relative overflow-hidden rounded-3xl aspect-[4/5] bg-secondary shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-bold text-white font-serif mb-2">{cat.name}</h3>
                  <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Explorar opciones →</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;