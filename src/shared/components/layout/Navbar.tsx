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
      
      // If we're in a restaurant page, search within the menu
      if (currentRestaurant && restaurantContext) {
        restaurantContext.setMenuSearchQuery(searchValue.trim());
        setSearchValue("");
      } else {
        // Otherwise, search restaurants globally
        navigate(`/restaurants?search=${encodeURIComponent(searchValue.trim())}`);
        setSearchValue("");
      }
    }
  };

  // Clear menu search when search value is empty
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    if (currentRestaurant && restaurantContext && value === "") {
      restaurantContext.setMenuSearchQuery("");
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
            {/* Restaurant Logo - Only shown when in restaurant page */}
            {currentRestaurant && (
              <div className="flex-shrink-0">
                {currentRestaurant.logo ? (
                  <img 
                    src={currentRestaurant.logo} 
                    alt={currentRestaurant.name}
                    className="w-6 h-6 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-red-600">
                      {currentRestaurant.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            )}
            <input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full h-10 text-sm focus:outline-none caret-red-500 bg-transparent"
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
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden animate-[fadeIn_0.15s_ease-out]">
                      {/* User Info Header */}
                      <div className="px-4 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                            {getUserInitials()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {getUserDisplayName()}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Navigation Links */}
                      <nav className="p-2">
                        {user?.role === "restaurant_owner" && (
                          <Link
                            to="/partner"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors no-underline rounded-xl"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                              </svg>
                            </div>
                            <div>
                              <span className="font-medium">Panel de Socio</span>
                              <p className="text-xs text-gray-400">Gestiona tus restaurantes</p>
                            </div>
                          </Link>
                        )}
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors no-underline rounded-xl"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-blue-500"
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
                          </div>
                          <div>
                            <span className="font-medium">Mi Perfil</span>
                            <p className="text-xs text-gray-400">Cuenta y preferencias</p>
                          </div>
                        </Link>
                        <Link
                          to="/profile/orders"
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors no-underline rounded-xl"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                              />
                            </svg>
                          </div>
                          <div>
                            <span className="font-medium">Mis Pedidos</span>
                            <p className="text-xs text-gray-400">Historial y seguimiento</p>
                          </div>
                        </Link>
                        <Link
                          to="/profile/favorites"
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors no-underline rounded-xl"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-pink-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            <span className="font-medium">Favoritos</span>
                            <p className="text-xs text-gray-400">Restaurantes guardados</p>
                          </div>
                        </Link>
                      </nav>

                      {/* Logout Section */}
                      <div className="p-2 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-0 bg-transparent cursor-pointer text-left rounded-xl"
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-red-500"
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
                          </div>
                          <span className="font-medium">Cerrar Sesión</span>
                        </button>
                      </div>
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
                  {/* Restaurant Logo - Only shown when in restaurant page */}
                  {currentRestaurant && (
                    <div className="flex-shrink-0">
                      {currentRestaurant.logo ? (
                        <img 
                          src={currentRestaurant.logo} 
                          alt={currentRestaurant.name}
                          className="w-6 h-6 rounded-full object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-red-600">
                            {currentRestaurant.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <input
                    type="search"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
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
                  {/* Mobile User Section */}
                  <div className="border-t border-gray-100 pt-4 mt-2">
                    {/* User Profile Link */}
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors no-underline rounded-xl mx-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        {getUserInitials()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {getUserDisplayName()}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-3 gap-2 px-4 mt-3">
                      <Link
                        to="/profile/orders"
                        className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors no-underline group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-700 group-hover:text-red-600">Pedidos</span>
                      </Link>
                      <Link
                        to="/profile/favorites"
                        className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors no-underline group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow">
                          <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-700 group-hover:text-red-600">Favoritos</span>
                      </Link>
                      {user?.role === "restaurant_owner" ? (
                        <Link
                          to="/partner"
                          className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors no-underline group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <span className="text-xs font-medium text-gray-700 group-hover:text-red-600">Mi Negocio</span>
                        </Link>
                      ) : (
                        <Link
                          to="/help"
                          className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors no-underline group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow">
                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-xs font-medium text-gray-700 group-hover:text-red-600">Ayuda</span>
                        </Link>
                      )}
                    </div>

                    {/* Logout Button */}
                    <div className="px-4 mt-4">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors border-0 cursor-pointer rounded-xl"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Cerrar Sesión
                      </button>
                    </div>
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
