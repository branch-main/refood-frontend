import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const getUserInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    if (user?.first_name) {
      return user.first_name.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "?";
  };

  const getUserDisplayName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user?.first_name) {
      return user.first_name;
    }
    return user?.email || "Usuario";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-[1000] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold text-[#B21F1F] no-underline transition-all duration-200 hover:scale-105"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="tracking-tight">ReFood</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-[#B21F1F] transition-all"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="text-gray-600 no-underline font-medium text-sm px-3 py-2 rounded-lg transition-all hover:text-[#B21F1F] hover:bg-red-50"
            >
              Inicio
            </Link>
            <Link
              to="/menu"
              className="text-gray-600 no-underline font-medium text-sm px-3 py-2 rounded-lg transition-all hover:text-[#B21F1F] hover:bg-red-50"
            >
              Explorar
            </Link>
            <Link
              to="/restaurants"
              className="text-gray-600 no-underline font-medium text-sm px-3 py-2 rounded-lg transition-all hover:text-[#B21F1F] hover:bg-red-50"
            >
              Restaurantes
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/orders"
                  className="text-gray-600 no-underline font-medium text-sm px-3 py-2 rounded-lg transition-all hover:text-[#B21F1F] hover:bg-red-50"
                >
                  Mis Pedidos
                </Link>
                <Link
                  to="/favorites"
                  className="text-gray-600 no-underline font-medium text-sm px-3 py-2 rounded-lg transition-all hover:text-[#B21F1F] hover:bg-red-50"
                >
                  Favoritos
                </Link>

                {/* Profile Dropdown */}
                <div className="relative ml-3" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 px-2 py-2 rounded-lg transition-all hover:bg-red-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#B21F1F] to-[#8B1616] flex items-center justify-center text-white font-bold text-xs shadow-md">
                      {getUserInitials()}
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-600 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-[fadeIn_0.2s_ease-out]">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">
                          {getUserDisplayName()}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-[#B21F1F] transition-colors no-underline"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="font-medium">Mi Perfil</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-0 bg-transparent cursor-pointer text-left"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span className="font-medium">Cerrar Sesión</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 ml-3">
                <Link
                  to="/login"
                  className="text-gray-600 no-underline font-medium text-sm px-4 py-2 rounded-lg transition-all hover:text-[#B21F1F] hover:bg-red-50"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-[#B21F1F] to-[#8B1616] text-white no-underline text-sm px-5 py-2 rounded-lg shadow-md font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-600 no-underline font-medium text-sm px-4 py-3 rounded-lg transition-all hover:text-[#B21F1F] hover:bg-red-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/menu"
                className="text-gray-600 no-underline font-medium text-sm px-4 py-3 rounded-lg transition-all hover:text-[#B21F1F] hover:bg-red-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explorar
              </Link>
              <Link
                to="/restaurants"
                className="text-gray-600 no-underline font-medium text-sm px-4 py-3 rounded-lg transition-all hover:text-[#B21F1F] hover:bg-red-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Restaurantes
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/orders"
                    className="text-gray-600 no-underline font-medium text-sm px-4 py-3 rounded-lg transition-all hover:text-[#B21F1F] hover:bg-red-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mis Pedidos
                  </Link>
                  <Link
                    to="/favorites"
                    className="text-gray-600 no-underline font-medium text-sm px-4 py-3 rounded-lg transition-all hover:text-[#B21F1F] hover:bg-red-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Favoritos
                  </Link>

                  {/* Mobile User Section */}
                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <div className="px-4 py-2 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B21F1F] to-[#8B1616] flex items-center justify-center text-white font-bold text-sm shadow-md">
                          {getUserInitials()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {getUserDisplayName()}
                          </p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-[#B21F1F] transition-colors no-underline rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="font-medium">Mi Perfil</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-0 bg-transparent cursor-pointer text-left rounded-lg"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="font-medium">Cerrar Sesión</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="text-gray-600 no-underline font-medium text-sm px-4 py-3 rounded-lg transition-all hover:text-[#B21F1F] hover:bg-red-50 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-[#B21F1F] to-[#8B1616] text-white no-underline text-sm px-5 py-3 rounded-lg shadow-md font-semibold transition-all hover:shadow-lg text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
