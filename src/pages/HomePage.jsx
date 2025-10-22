import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common';
import './HomePage.css';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Reduce el Desperdicio de Alimentos,<br />Ahorra Dinero
          </h1>
          <p className="hero-subtitle">
            Descubre alimentos excedentes de restaurantes locales a precios con descuento.
            Ayuda a reducir el desperdicio mientras disfrutas de excelentes comidas.
          </p>
          <div className="hero-buttons">
            <Button size="large" onClick={() => navigate('/listings')}>
              Explorar Alimentos
            </Button>
            <Button size="large" variant="outline" onClick={() => navigate('/restaurants')}>
              Ver Restaurantes
            </Button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-emoji">🍕🥗🍔🍜</div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Cómo Funciona</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Explorar</h3>
              <p>Descubre alimentos excedentes de restaurantes cerca de ti a precios con descuento</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Ordenar</h3>
              <p>Reserva tus comidas y paga de forma segura a través de nuestra plataforma</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Recoger</h3>
              <p>Recoge tu pedido en el horario programado del restaurante</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">♻️</div>
              <h3>Ahorrar</h3>
              <p>Ahorra dinero mientras ayudas a reducir el desperdicio de alimentos y proteger el medio ambiente</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">50%</div>
              <div className="stat-label">Ahorro Promedio</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Comidas Salvadas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500kg</div>
              <div className="stat-label">Desperdicio Prevenido</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Restaurantes Asociados</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2 className="cta-title">¿Listo para Comenzar?</h2>
          <p className="cta-text">
            Únete a miles de personas combatiendo el desperdicio de alimentos y ahorrando dinero
          </p>
          <Button size="large" onClick={() => navigate('/register')}>
            Regístrate Ahora
          </Button>
        </div>
      </section>
    </div>
  );
};
