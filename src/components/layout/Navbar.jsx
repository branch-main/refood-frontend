import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-[1000] border-b border-black/5 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-10 py-4 flex justify-between items-center min-h-[70px] lg:px-6 md:px-4 md:min-h-[60px] md:py-3">
        <Link 
          to="/" 
          className="text-3xl font-bold text-[#B21F1F] no-underline transition-all duration-200 tracking-tight hover:scale-105 hover:text-[#8B1616] md:text-2xl"
        >
          🍽️ ReeFood
        </Link>

        <div className="flex items-center gap-10 lg:gap-4 md:gap-4 md:text-sm">
          <Link 
            to="/" 
            className="relative text-gray-600 no-underline font-medium text-[0.95rem] py-2 transition-all duration-300 hover:text-[#B21F1F] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B21F1F] after:transition-all after:duration-300 hover:after:w-full md:text-sm md:py-1.5"
          >
            Inicio
          </Link>
          <Link 
            to="/listings" 
            className="relative text-gray-600 no-underline font-medium text-[0.95rem] py-2 transition-all duration-300 hover:text-[#B21F1F] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B21F1F] after:transition-all after:duration-300 hover:after:w-full md:text-sm md:py-1.5"
          >
            Explorar Alimentos
          </Link>
          <Link 
            to="/restaurants" 
            className="relative text-gray-600 no-underline font-medium text-[0.95rem] py-2 transition-all duration-300 hover:text-[#B21F1F] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B21F1F] after:transition-all after:duration-300 hover:after:w-full md:text-sm md:py-1.5"
          >
            Restaurantes
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/orders" 
                className="relative text-gray-600 no-underline font-medium text-[0.95rem] py-2 transition-all duration-300 hover:text-[#B21F1F] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B21F1F] after:transition-all after:duration-300 hover:after:w-full md:text-sm md:py-1.5"
              >
                Mis Pedidos
              </Link>
              <Link 
                to="/favorites" 
                className="relative text-gray-600 no-underline font-medium text-[0.95rem] py-2 transition-all duration-300 hover:text-[#B21F1F] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B21F1F] after:transition-all after:duration-300 hover:after:w-full md:text-sm md:py-1.5"
              >
                Favoritos
              </Link>
              <div className="flex items-center gap-5 pl-6 border-l border-gray-200 lg:gap-3 lg:pl-4 md:gap-3 md:pl-4">
                <Link 
                  to="/profile" 
                  className="relative text-gray-600 no-underline font-medium text-[0.95rem] py-2 transition-all duration-300 hover:text-[#B21F1F] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B21F1F] after:transition-all after:duration-300 hover:after:w-full md:text-sm md:py-1.5"
                >
                  👤 {user?.username}
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-transparent border-[1.5px] border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg cursor-pointer font-medium text-[0.95rem] transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 hover:-translate-y-0.5 hover:shadow-md md:px-4 md:py-2 md:text-sm"
                >
                  Cerrar Sesión
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="relative text-gray-600 no-underline font-medium text-[0.95rem] py-2 transition-all duration-300 hover:text-[#B21F1F] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B21F1F] after:transition-all after:duration-300 hover:after:w-full md:text-sm md:py-1.5"
              >
                Iniciar Sesión
              </Link>
              <Link 
                to="/register" 
                className="bg-gradient-to-br from-[#B21F1F] to-[#8B1616] text-white px-6 py-2.5 rounded-lg shadow-[0_4px_12px_rgba(178,31,31,0.25)] font-medium text-[0.95rem] transition-all duration-300 hover:bg-gradient-to-br hover:from-[#8B1616] hover:to-[#6B1111] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(178,31,31,0.35)] md:px-4 md:py-2 md:text-sm"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
