import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { User, LogOut, Coffee } from 'lucide-react';
import { Helmet } from 'react-helmet';
import ProfileModal from '@/components/ProfileModal.jsx';
import { useAuth } from '@/context/AuthContext.jsx';

const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Cafetería Horizonte - Inicio</title>
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col relative">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-40 px-6 py-6 flex justify-between items-center">
          {/* Empty div to balance the flex layout since CartButton is fixed top-left */}
          <div className="w-24"></div> 
          
          <div className="text-3xl font-serif font-bold text-white drop-shadow-lg flex items-center">
            <Coffee className="w-8 h-8 mr-3" />
            Horizonte
          </div>
          
          <div className="flex items-center space-x-2 w-24 justify-end">
            <Button variant="ghost" size="icon" onClick={() => setIsProfileOpen(true)} className="text-white hover:bg-white/20 rounded-full backdrop-blur-sm bg-black/10">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={logout} className="text-white hover:bg-white/20 rounded-full backdrop-blur-sm bg-black/10" title="Cerrar Sesión">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative flex-1 flex items-center justify-center overflow-hidden min-h-screen">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1692074082465-cbfb9819c3e5" 
              alt="Cafetería Interior" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-16"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white font-serif mb-6 leading-tight drop-shadow-xl" style={{ letterSpacing: '-0.02em' }}>
                El arte del buen café
              </h1>
              <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                Ingredientes seleccionados, preparaciones únicas y un ambiente diseñado para tu disfrute diario.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
            >
              <Button 
                onClick={() => navigate('/menu/categories')}
                className="h-24 text-2xl font-serif rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Explorar menú
              </Button>
              <Button 
                onClick={() => navigate('/otros-productos')}
                className="h-24 text-2xl font-serif rounded-2xl bg-white text-foreground hover:bg-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Otros productos
              </Button>
            </motion.div>
          </div>
        </section>
      </div>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};

export default HomePage;