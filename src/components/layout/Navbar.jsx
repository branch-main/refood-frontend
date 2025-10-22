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
          <Link to="/" className="navbar-link">Inicio</Link>
          <Link to="/listings" className="navbar-link">Explorar Alimentos</Link>
          <Link to="/restaurants" className="navbar-link">Restaurantes</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/orders" className="navbar-link">Mis Pedidos</Link>
              <Link to="/favorites" className="navbar-link">Favoritos</Link>
              <div className="navbar-user">
                <Link to="/profile" className="navbar-link">
                  👤 {user?.username}
                </Link>
                <button onClick={handleLogout} className="navbar-logout">
                  Cerrar Sesión
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Iniciar Sesión</Link>
              <Link to="/register" className="navbar-link navbar-link-primary">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
