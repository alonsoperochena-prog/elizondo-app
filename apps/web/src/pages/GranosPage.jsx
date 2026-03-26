import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import GranosProductDetail from '@/components/GranosProductDetail.jsx';

const granosProducts = [
  {
    id: 'grano-chiapas',
    name: 'Origen Chiapas',
    price: '250.00',
    image: 'https://images.unsplash.com/photo-1697216124380-7be45dceaffd',
    history: 'Cultivado en las altas montañas de Chiapas, este café es recolectado a mano por comunidades locales, preservando la tradición y el ecosistema.',
    roast: 'Medio',
    recommendations: ['Prensa Francesa', 'Cafetera de Goteo', 'Cold Brew']
  },
  {
    id: 'grano-veracruz',
    name: 'Origen Veracruz',
    price: '240.00',
    image: 'https://images.unsplash.com/photo-1696686575259-b413296ac67b',
    history: 'Proveniente de Coatepec, Veracruz. Un café con notas a chocolate y nuez, cultivado bajo sombra a 1,200 metros sobre el nivel del mar.',
    roast: 'Oscuro',
    recommendations: ['Espresso', 'Moka Pot', 'Latte']
  },
  {
    id: 'grano-oaxaca',
    name: 'Origen Oaxaca',
    price: '260.00',
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7',
    history: 'De la región Pluma Hidalgo, famoso por su acidez brillante y cuerpo ligero. Un café elegante y complejo.',
    roast: 'Claro',
    recommendations: ['V60', 'Chemex', 'Aeropress']
  }
];

const GranosPage = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Helmet>
        <title>Granos - Cafetería</title>
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
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground">Café en Grano</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {granosProducts.map((product, idx) => (
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

      <GranosProductDetail 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
    </>
  );
};

export default GranosPage;