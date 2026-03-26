import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Coffee } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithOAuth, requestOTP, verifyOTP } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      toast.error('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    loginWithOAuth(provider)
      .then(() => navigate('/'))
      .catch(err => toast.error(`Error con ${provider}: ${err.message}`));
  };

  const handleRequestOTP = async () => {
    if (!email) {
      toast.error('Ingresa tu email primero');
      return;
    }
    setLoading(true);
    try {
      await requestOTP(email);
      setOtpStep(true);
      toast.success('Código enviado a tu email');
    } catch (error) {
      toast.error('Error al solicitar código');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyOTP(otpCode);
      navigate('/');
    } catch (error) {
      toast.error('Código inválido');
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
        <h1 className="text-3xl font-serif font-bold text-center mb-8">Bienvenido</h1>

        {!otpStep ? (
          <>
            <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
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
                  placeholder="Contraseña" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="h-12 rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl text-lg" disabled={loading}>
                {loading ? 'Iniciando...' : 'Iniciar Sesión'}
              </Button>
            </form>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">O continúa con</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="outline" onClick={handleRequestOTP} className="w-full h-12 rounded-xl" disabled={loading}>
                Enviar código mágico (OTP)
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => handleOAuth('google')} className="h-12 rounded-xl">
                  Google
                </Button>
                <Button variant="outline" onClick={() => handleOAuth('apple')} className="h-12 rounded-xl">
                  Apple
                </Button>
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <p className="text-center text-muted-foreground mb-4">Ingresa el código de 8 dígitos enviado a {email}</p>
            <Input 
              type="text" 
              maxLength={8}
              placeholder="00000000" 
              value={otpCode} 
              onChange={e => setOtpCode(e.target.value)} 
              required 
              className="h-14 text-center text-2xl tracking-widest rounded-xl"
            />
            <Button type="submit" className="w-full h-12 rounded-xl text-lg" disabled={loading}>
              {loading ? 'Verificando...' : 'Verificar Código'}
            </Button>
            <Button variant="ghost" onClick={() => setOtpStep(false)} className="w-full">
              Volver
            </Button>
          </form>
        )}

        <p className="text-center mt-8 text-muted-foreground">
          ¿No tienes cuenta? <Link to="/signup" className="text-primary font-medium hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;