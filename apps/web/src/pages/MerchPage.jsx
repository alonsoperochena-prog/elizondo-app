import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import MerchProductDetail from '@/components/MerchProductDetail.jsx';

const merchProducts = [
  {
    id: 'termo-Elizondo',
    name: 'Termo Elizondo',
    price: '350.00',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
    options: ['Rojo', 'Azul', 'Negro', 'Blanco']
  },
  {
    id: 'camisa-Elizondo',
    name: 'Camisa Clásica',
    price: '280.00',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'gorra-Elizondo',
    name: 'Gorra Vintage',
    price: '220.00',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b',
    options: ['One size', 'Ajustable']
  }
];

const MerchPage = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Helmet>
        <title>Merch - Cafetería</title>
      </Helmet>
      
      <div className="min-h-screen bg-background pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <Button
              variant="ghost"
              onClick={() => navigate('/otros-productos')}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground">Merch Oficial</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {merchProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
              >
                <div className="h-64 bg-secondary overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold font-serif mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-6">${product.price}</p>
                  <Button 
                    onClick={() => setSelectedProduct(product)}
                    className="mt-auto w-full rounded-xl"
                  >
                    Ver Producto
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <MerchProductDetail 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
    </>
  );
};

export default MerchPage;