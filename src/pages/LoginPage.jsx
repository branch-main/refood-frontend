import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { Card, Input, Button } from '../components/common';
import { FiUser, FiLock, FiCheck } from 'react-icons/fi';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.username, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Inicio de sesión fallido. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-[#B21F1F] to-[#8B1616] rounded-3xl text-white shadow-2xl sticky top-20">
          <div className="mb-8">
            <h2 className="text-5xl font-extrabold mb-4">🍽️ ReeFood</h2>
            <p className="text-2xl font-semibold mb-6">Bienvenido de Nuevo</p>
            <p className="text-lg opacity-90 leading-relaxed">
              Continúa tu viaje para combatir el desperdicio de alimentos y descubrir comidas deliciosas a precios increíbles.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <FiCheck className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Ahorra Hasta 50%</h3>
                <p className="text-sm opacity-90">En alimentos de alta calidad cada día</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <FiCheck className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Impacto Ambiental</h3>
                <p className="text-sm opacity-90">Reduce desperdicios y ayuda al planeta</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <FiCheck className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Fácil y Rápido</h3>
                <p className="text-sm opacity-90">Reserva en segundos, recoge cuando quieras</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full">
          <Card className="shadow-xl border-0">
            <div className="p-8 lg:p-12">
              <div className="lg:hidden mb-8 text-center">
                <h2 className="text-4xl font-extrabold text-[#B21F1F] mb-2">🍽️ ReeFood</h2>
              </div>
              
              <h1 className="text-3xl font-bold mb-2 text-gray-900">Iniciar Sesión</h1>
              <p className="text-gray-600 mb-8">Accede a tu cuenta para continuar</p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-start gap-3">
                  <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Usuario
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FiUser className="text-xl" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B21F1F] focus:border-transparent transition-all"
                      placeholder="Ingresa tu usuario"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FiLock className="text-xl" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B21F1F] focus:border-transparent transition-all"
                      placeholder="Ingresa tu contraseña"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  fullWidth 
                  loading={loading}
                  className="bg-gradient-to-r from-[#B21F1F] to-[#8B1616] !text-white hover:shadow-xl transition-all !py-3.5 !px-8 !rounded-xl !text-base font-semibold !w-full"
                >
                  Iniciar Sesión
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  ¿No tienes una cuenta?{' '}
                  <Link 
                    to="/register" 
                    className="text-[#B21F1F] font-bold no-underline hover:underline"
                  >
                    Regístrate gratis
                  </Link>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
