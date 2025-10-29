import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { Card, Input, Button } from '../components/common';

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
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8 px-8">
      <div className="w-full max-w-lg">
        <Card>
          <div className="p-4">
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">Bienvenido de Nuevo</h1>
            <p className="text-center text-gray-500 mb-8">Inicia sesión para continuar ahorrando alimentos y dinero</p>

            {error && <div className="bg-red-100 text-red-800 px-3 py-3 rounded-lg mb-6 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <Input
                label="Usuario"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <Input
                label="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Button type="submit" fullWidth loading={loading}>
                Iniciar Sesión
              </Button>
            </form>

            <p className="text-center mt-6 text-gray-500">
              ¿No tienes una cuenta? <Link to="/register" className="text-[#B21F1F] font-semibold no-underline hover:underline">Regístrate</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
