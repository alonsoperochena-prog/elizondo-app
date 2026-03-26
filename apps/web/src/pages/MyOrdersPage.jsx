import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import pocketbaseClient from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/context/AuthContext.jsx';
import { toast } from 'sonner';

const statusLabels = {
  pending: 'Pendiente',
  paid: 'Pagada',
  preparing: 'Preparando',
  ready: 'Lista',
  completed: 'Completada',
  cancelled: 'Cancelada',
};

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      try {
        setIsLoading(true);

        const records = await pocketbaseClient.collection('orders').getFullList({
          sort: '-created',
          filter: `user = "${currentUser.id}"`,
        });

        setOrders(records);
      } catch (error) {
        console.error('ORDERS ERROR:', error);
        toast.error('No se pudieron cargar tus órdenes.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <>
      <Helmet>
        <title>Mis órdenes - Elizondo</title>
      </Helmet>

      <div className="min-h-screen bg-background pt-24 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al inicio
            </Button>

            <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground">
              Mis órdenes
            </h1>
          </div>

          {isLoading ? (
            <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
              <p className="text-muted-foreground">Cargando órdenes...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-card rounded-3xl p-10 border border-border shadow-sm text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold font-serif mb-2">Todavía no tienes órdenes</h2>
              <p className="text-muted-foreground mb-6">
                Cuando hagas tu primera compra, aparecerá aquí.
              </p>
              <Button onClick={() => navigate('/menu/categories')}>
                Ir al menú
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div
                  key={order.id}
                  className="bg-card rounded-3xl p-6 border border-border shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Orden</p>
                      <p className="font-semibold text-foreground">#{order.id.slice(0, 8)}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Estado</p>
                      <p className="font-semibold text-primary">
                        {statusLabels[order.status] || order.status}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-semibold text-foreground">
                        {order.orderType === 'pickup' ? 'Pickup' : order.orderType}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-bold text-foreground">${Number(order.total).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-3">Productos</p>

                    <div className="space-y-2">
                      {Array.isArray(order.items) &&
                        order.items.map(item => (
                          <div
                            key={item.cartItemId || `${item.productId}-${item.name}`}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-foreground">
                              {item.quantity}x {item.name}
                            </span>
                            <span className="font-medium text-foreground">
                              ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mt-4">
                    <p className="text-xs text-muted-foreground">
                      Creada: {new Date(order.created).toLocaleString('es-MX')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;