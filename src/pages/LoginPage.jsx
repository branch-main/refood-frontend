import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { Card, Input, Button } from '../components/common';
import './AuthPages.css';

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
    <div className="auth-page">
      <div className="auth-container">
        <Card>
          <div className="auth-card">
            <h1 className="auth-title">Bienvenido de Nuevo</h1>
            <p className="auth-subtitle">Inicia sesión para continuar ahorrando alimentos y dinero</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
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

            <p className="auth-footer">
              ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
