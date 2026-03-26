import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Coffee } from 'lucide-react';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    setLoading(true);
    try {
      await signup(email, password, name);
      navigate('/');
    } catch (error) {
      toast.error('Error al crear la cuenta. El email podría estar en uso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-3xl shadow-xl border border-border">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Coffee className="w-6 h-6" />
          </div>
        </div>
        <h1 className="text-3xl font-serif font-bold text-center mb-8">Crear Cuenta</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <Input 
              type="text" 
              placeholder="Nombre Completo" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              className="h-12 rounded-xl"
            />
          </div>
          <div>
            <Input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              className="h-12 rounded-xl"
            />
          </div>
          <div>
            <Input 
              type="password" 
              placeholder="Contraseña (mín. 8 caracteres)" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              className="h-12 rounded-xl"
            />
          </div>
          <Button type="submit" className="w-full h-12 rounded-xl text-lg mt-4" disabled={loading}>
            {loading ? 'Creando...' : 'Registrarse'}
          </Button>
        </form>

        <p className="text-center mt-8 text-muted-foreground">
          ¿Ya tienes cuenta? <Link to="/login" className="text-primary font-medium hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;