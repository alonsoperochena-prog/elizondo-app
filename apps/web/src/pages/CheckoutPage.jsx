import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, calculateDynamicNutrition } from '@/context/CartContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Clock, CalendarDays, CreditCard } from 'lucide-react';
import { Helmet } from 'react-helmet';
import DeliveryOptionCard from '@/components/DeliveryOptionCard.jsx';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState('virtual');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [fullName, setFullName] = useState('');

  React.useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/menu');
    }
  }, [cartItems, navigate]);

  const totalKcal = cartItems.reduce((acc, item) => {
    const itemNutrition = calculateDynamicNutrition(item.baseNutrition, item.customPercentages);
    return acc + (itemNutrition.calories * item.quantity);
  }, 0);

  const handlePayment = () => {
    if (!fullName.trim()) {
      toast.error('Por favor ingresa tu nombre completo.');
      return;
    }
    if (deliveryMethod === 'schedule' && (!date || !time)) {
      toast.error('Por favor selecciona fecha y hora para tu pedido.');
      return;
    }
    
    toast.success('¡Pago procesado con éxito! Preparando tu orden.');
    clearCart();
    setTimeout(() => navigate('/'), 2000);
  };

  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  };

  const getTimes = () => {
    const times = [];
    for (let h = 8; h <= 20; h++) {
      times.push(`${h.toString().padStart(2, '0')}:00`);
      times.push(`${h.toString().padStart(2, '0')}:30`);
    }
    return times;
  };

  if (cartItems.length === 0) return null;

  return (
    <>
      <Helmet>
        <title>Checkout - Cafetería</title>
      </Helmet>
      
      <div className="min-h-screen bg-background pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/cart')}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver a la canasta
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground">Finalizar Orden</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-bold font-serif mb-6">Opciones de Entrega</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DeliveryOptionCard
                    id="virtual"
                    title="Fila Virtual"
                    description="Lo antes posible"
                    icon={Clock}
                    selected={deliveryMethod === 'virtual'}
                    onClick={setDeliveryMethod}
                  >
                    <div className="bg-secondary/50 rounded-xl p-4 mt-2 border border-border">
                      <p className="text-sm text-muted-foreground mb-2">Tiempo estimado de espera:</p>
                      <p className="text-2xl font-bold text-foreground">~15 minutos</p>
                      <p className="text-sm text-primary font-medium mt-2">Posición en fila: 3</p>
                    </div>
                  </DeliveryOptionCard>

                  <DeliveryOptionCard
                    id="schedule"
                    title="Agendar tu café"
                    description="Elige fecha y hora"
                    icon={CalendarDays}
                    selected={deliveryMethod === 'schedule'}
                    onClick={setDeliveryMethod}
                  >
                    <div className="space-y-4 mt-2">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Fecha</label>
                        <select 
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        >
                          <option value="">Seleccionar fecha</option>
                          {getNext7Days().map(d => (
                            <option key={d} value={d}>{new Date(d).toLocaleDateString('es-MX', { weekday: 'long', month: 'short', day: 'numeric' })}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Hora</label>
                        <select 
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        >
                          <option value="">Seleccionar hora</option>
                          {getTimes().map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </DeliveryOptionCard>
                </div>
              </div>

              <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-bold font-serif mb-6">Información de Contacto</h2>
                <div className="space-y-2 max-w-md">
                  <label className="text-sm font-medium">Nombre completo</label>
                  <Input 
                    placeholder="Ej. Maya Chen" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-background text-foreground h-12 rounded-xl" 
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card rounded-3xl p-6 border border-border shadow-sm sticky top-24">
                <h3 className="text-xl font-bold font-serif mb-6 border-b border-border pb-4">Resumen de Orden</h3>
                
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                  {cartItems.map(item => (
                    <div key={item.cartItemId} className="flex justify-between text-sm">
                      <div className="flex-1 pr-4">
                        <span className="font-medium">{item.quantity}x {item.name}</span>
                        {item.customPercentages && (
                          <p className="text-xs text-muted-foreground mt-0.5">Personalizado</p>
                        )}
                      </div>
                      <span className="font-medium">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-secondary/50 rounded-xl p-4 mb-6 flex justify-between items-center border border-border">
                  <span className="text-sm font-medium text-muted-foreground">Total Kilocalorías</span>
                  <span className="font-bold text-primary">{totalKcal} kcal</span>
                </div>

                <div className="space-y-3 mb-8 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Impuestos (16%)</span>
                    <span className="font-medium">${(cartTotal * 0.16).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold pt-4 border-t border-border mt-4">
                    <span>Total</span>
                    <span>${(cartTotal * 1.16).toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  onClick={handlePayment}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14 rounded-xl font-bold shadow-lg"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pagar ${(cartTotal * 1.16).toFixed(2)}
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;