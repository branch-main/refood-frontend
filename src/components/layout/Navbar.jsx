import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import './Navbar.css';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🍽️ ReeFood
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/listings" className="navbar-link">Browse Food</Link>
          <Link to="/restaurants" className="navbar-link">Restaurants</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/orders" className="navbar-link">My Orders</Link>
              <Link to="/favorites" className="navbar-link">Favorites</Link>
              <div className="navbar-user">
                <Link to="/profile" className="navbar-link">
                  👤 {user?.username}
                </Link>
                <button onClick={handleLogout} className="navbar-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link navbar-link-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
