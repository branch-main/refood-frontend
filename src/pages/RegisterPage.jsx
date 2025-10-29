import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { Card, Button } from '../components/common';
import { USER_TYPES } from '../utils';
import { FiUser, FiMail, FiLock, FiPhone, FiEdit3, FiCheck } from 'react-icons/fi';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_type: USER_TYPES.CONSUMER,
    first_name: '',
    last_name: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuthContext();
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
      navigate('/');
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData) {
        const errorMessages = Object.values(errorData).flat().join(' ');
        setError(errorMessages || 'Registration failed. Please try again.');
      } else {
        setError('Registration failed. Please try again.');
      }
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
            <p className="text-2xl font-semibold mb-6">Únete a la Comunidad</p>
            <p className="text-lg opacity-90 leading-relaxed">
              Regístrate gratis y comienza a ahorrar dinero mientras ayudas al medio ambiente combatiendo el desperdicio de alimentos.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <FiCheck className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">100% Gratis</h3>
                <p className="text-sm opacity-90">Sin tarifas ocultas ni suscripciones</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <FiCheck className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Acceso Instantáneo</h3>
                <p className="text-sm opacity-90">Empieza a reservar comidas inmediatamente</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <FiCheck className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Seguro y Confiable</h3>
                <p className="text-sm opacity-90">Tus datos están protegidos</p>
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
              
              <h1 className="text-3xl font-bold mb-2 text-gray-900">Crear Cuenta</h1>
              <p className="text-gray-600 mb-8">Completa el formulario para registrarte</p>

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
                      placeholder="Elige tu nombre de usuario"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FiMail className="text-xl" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B21F1F] focus:border-transparent transition-all"
                      placeholder="tu@email.com"
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
                      placeholder="Crea una contraseña segura"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FiLock className="text-xl" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B21F1F] focus:border-transparent transition-all"
                      placeholder="Confirma tu contraseña"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Cuenta
                  </label>
                  <select 
                    name="user_type"
                    value={formData.user_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B21F1F] focus:border-transparent transition-all"
                  >
                    <option value={USER_TYPES.CONSUMER}>Consumidor</option>
                    <option value={USER_TYPES.RESTAURANT}>Restaurante</option>
                    <option value={USER_TYPES.NGO}>ONG/Banco de Alimentos</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <FiEdit3 className="text-lg" />
                      </div>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B21F1F] focus:border-transparent transition-all"
                        placeholder="Tu nombre"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B21F1F] focus:border-transparent transition-all"
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Teléfono (Opcional)
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FiPhone className="text-xl" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B21F1F] focus:border-transparent transition-all"
                      placeholder="+34 123 456 789"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  fullWidth 
                  loading={loading}
                  className="bg-gradient-to-r from-[#B21F1F] to-[#8B1616] !text-white hover:shadow-xl transition-all !py-3.5 !px-8 !rounded-xl !text-base font-semibold !w-full"
                >
                  Crear Cuenta Gratis
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  ¿Ya tienes una cuenta?{' '}
                  <Link 
                    to="/login" 
                    className="text-[#B21F1F] font-bold no-underline hover:underline"
                  >
                    Iniciar sesión
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
