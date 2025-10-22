import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { Card, Input, Button } from '../components/common';
import { USER_TYPES } from '../utils';
import './AuthPages.css';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
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
    setLoading(true);

    try {
      await register(formData);
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
    <div className="auth-page">
      <div className="auth-container">
        <Card>
          <div className="auth-card">
            <h1 className="auth-title">Crear Cuenta</h1>
            <p className="auth-subtitle">Únete a nosotros en la lucha contra el desperdicio de alimentos</p>

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
                label="Correo Electrónico"
                type="email"
                name="email"
                value={formData.email}
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

              <div className="input-group">
                <label className="input-label">Tipo de Cuenta</label>
                <select 
                  name="user_type"
                  className="input"
                  value={formData.user_type}
                  onChange={handleChange}
                  required
                >
                  <option value={USER_TYPES.CONSUMER}>Consumidor</option>
                  <option value={USER_TYPES.RESTAURANT}>Restaurante</option>
                  <option value={USER_TYPES.NGO}>ONG/Banco de Alimentos</option>
                </select>
              </div>

              <div className="form-row">
                <Input
                  label="Nombre"
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  fullWidth={false}
                />

                <Input
                  label="Apellido"
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  fullWidth={false}
                />
              </div>

              <Input
                label="Número de Teléfono"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <Button type="submit" fullWidth loading={loading}>
                Crear Cuenta
              </Button>
            </form>

            <p className="auth-footer">
              ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
