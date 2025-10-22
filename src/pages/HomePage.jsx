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
            Reduce Food Waste,<br />Save Money
          </h1>
          <p className="hero-subtitle">
            Discover surplus food from local restaurants at discounted prices.
            Help reduce waste while enjoying great meals.
          </p>
          <div className="hero-buttons">
            <Button size="large" onClick={() => navigate('/listings')}>
              Browse Food
            </Button>
            <Button size="large" variant="outline" onClick={() => navigate('/restaurants')}>
              View Restaurants
            </Button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-emoji">🍕🥗🍔🍜</div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Browse</h3>
              <p>Discover surplus food from restaurants near you at discounted prices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Order</h3>
              <p>Reserve your meals and pay securely through our platform</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Pickup</h3>
              <p>Collect your order at the scheduled time from the restaurant</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">♻️</div>
              <h3>Save</h3>
              <p>Save money while helping reduce food waste and protect the environment</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">50%</div>
              <div className="stat-label">Average Savings</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Meals Saved</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500kg</div>
              <div className="stat-label">Food Waste Prevented</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Partner Restaurants</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-text">
            Join thousands of people fighting food waste and saving money
          </p>
          <Button size="large" onClick={() => navigate('/register')}>
            Sign Up Now
          </Button>
        </div>
      </section>
    </div>
  );
};
