import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth, useLocation } from "@/shared/hooks";
import { useRestaurantContext } from "@/features/restaurants/contexts";
import { useCart } from "@/features/cart/contexts";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { ImSearch } from "react-icons/im";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "../ui";
import { LocationSelector } from "../common";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const restaurantContext = useRestaurantContext();
  const currentRestaurant = restaurantContext?.currentRestaurant || null;
  const { itemCount, setIsOpen: setCartOpen } = useCart();
  const { location, getShortAddress, updateLocation } = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setIsMobileMenuOpen(false);
      navigate(`/restaurants?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
    }
  };

  const searchPlaceholder = currentRestaurant
    ? `Buscar en ${currentRestaurant.name}...`
    : "Buscar restaurantes o productos...";

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.firstName) {
      return user.firstName.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "?";
  };

  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) {
      return user.firstName;
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
    <nav className={`bg-white fixed top-0 left-0 right-0 z-99 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] ${isMobileMenuOpen ? '' : 'border-b border-gray-200'}`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 no-underline transition-all duration-200 hover:scale-105"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img src="/logo.png" alt="ReFood" className="h-10 w-auto" />
            </Link>

            {/* Location Display - Desktop */}
            {user && (
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors group"
              >
                <FaLocationDot className="text-red-500 text-sm" />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-400">Entregar en</span>
                  <span className="text-xs font-semibold text-gray-500 group-hover:text-red-500 transition-colors max-w-[150px] truncate">
                    {location ? getShortAddress() : "Seleccionar ubicación"}
                  </span>
                </div>
              </button>
            )}
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="h-10 hidden md:flex flex-1 max-w-xl items-center rounded-full bg-neutral-50 text-gray-800 px-4 gap-3"
          >
            <input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full h-10 text-sm focus:outline-none caret-red-500"
            />
            <button type="submit">
              <ImSearch
                className={`h-4 w-4 transition-colors ${searchValue.trim() === "" ? "fill-gray-400" : "fill-gray-500"}`}
              />
            </button>
          </form>

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
          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            {/* Cart Button */}
            {!user ? (
              <div className="flex items-center gap-2 ml-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate("/register")}
                >
                  Registrarse
                </Button>
              </div>
            ) : (
              <>
                {/* Profile Dropdown */}
                <div className="relative ml-3" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 px-2 py-2 rounded-lg transition-all hover:bg-red-50"
                  >
                    <div className="w-9 h-9 rounded-full bg-linear-to-br bg-red-100 flex items-center justify-center text-red-500 font-bold text-xs">
                      {getUserInitials()}
                    </div>
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
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-0 bg-transparent cursor-pointer text-left rounded-lg"
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
            )}

            <div className="w-px h-8 bg-gray-200 mx-1"></div>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-lg transition-all hover:bg-red-50 text-gray-600 hover:text-[#B21F1F]"
            >
              <FiShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 bg-white border-t border-gray-200 animate-[fadeIn_0.2s_ease-out]">
          <div className="flex flex-col space-y-2 px-4 sm:px-6 lg:px-8">
              {/* Mobile Location Selector */}
              {user && (
                <button
                  onClick={() => {
                    setIsLocationModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="mx-4 mb-2 flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-colors"
                >
                  <FaLocationDot className="text-red-500 text-lg flex-shrink-0" />
                  <div className="flex flex-col items-start flex-1">
                    <span className="text-xs text-gray-600">Entregar en</span>
                    <span className="text-sm font-semibold text-gray-800 truncate max-w-full">
                      {location ? getShortAddress() : "Seleccionar ubicación"}
                    </span>
                  </div>
                  <span className="text-xs text-red-500 font-medium">
                    Cambiar
                  </span>
                </button>
              )}

              {/* Mobile Search Bar */}
              <form onSubmit={handleSearch} className="px-4 pb-2">
                <div className="flex items-center rounded-xl shadow-sm bg-white text-gray-800 px-4 gap-3">
                  <input
                    type="search"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full h-10 text-sm focus:outline-none caret-red-500"
                  />
                  <button type="submit">
                    <ImSearch
                      className={`h-4 w-4 transition-colors ${searchValue.trim() === "" ? "fill-gray-400" : "fill-gray-500"}`}
                    />
                  </button>
                </div>
              </form>

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
              <Link
                to="/partners"
                className="text-gray-600 no-underline font-medium text-sm px-4 py-3 rounded-lg transition-all hover:text-[#B21F1F] hover:bg-red-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Para Restaurantes
              </Link>

              {user ? (
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
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#B21F1F] to-[#8B1616] flex items-center justify-center text-white font-bold text-sm shadow-md">
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
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      navigate("/register");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Registrarse
                  </Button>
                </div>
              )}
          </div>
        </div>
      )}

      {/* Location Selector Modal */}
      <LocationSelector
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelect={(address) => updateLocation(address)}
        currentAddress={location}
      />
    </nav>
  );
};
