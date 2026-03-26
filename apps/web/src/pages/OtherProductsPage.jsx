import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const OtherProductsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Otros Productos - Cafetería</title>
      </Helmet>
      
      <div className="min-h-screen bg-background pt-24 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al Inicio
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground">Otros Productos</h1>
            <p className="text-lg text-muted-foreground mt-4">Lleva la experiencia Horizonte a tu casa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => navigate('/merch')}
              className="bg-card border border-border rounded-3xl p-10 cursor-pointer shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">Merch</h2>
              <p className="text-muted-foreground">Ropa y accesorios exclusivos de la marca.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => navigate('/granos')}
              className="bg-card border border-border rounded-3xl p-10 cursor-pointer shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Coffee className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">Granos</h2>
              <p className="text-muted-foreground">Café en grano de especialidad para preparar en casa.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherProductsPage;