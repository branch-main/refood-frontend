import { useState, useEffect, useCallback } from 'react';
import { listingService, categoryService } from '../services';
import { useGeolocation } from '../hooks';
import { ListingCard } from '../components/listings/ListingCard';
import { Loading, Input } from '../components/common';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { formatPrice } from '../utils';

export const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [featuredListings, setFeaturedListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    listing_type: '',
  });

  const { location } = useGeolocation();

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data.results || data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchFeaturedListings = async () => {
    try {
      const data = await listingService.getListings({ status: 'available' });
      const allListings = data.results || data;
      const featured = allListings
        .filter(listing => listing.original_price > listing.discounted_price)
        .sort((a, b) => {
          const discountA = ((a.original_price - a.discounted_price) / a.original_price) * 100;
          const discountB = ((b.original_price - b.discounted_price) / b.original_price) * 100;
          return discountB - discountA;
        })
        .slice(0, 5);
      setFeaturedListings(featured);
    } catch (error) {
      console.error('Failed to fetch featured listings:', error);
    }
  };

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      const params = { ...filters };
      
      if (location) {
        params.lat = location.lat;
        params.lng = location.lng;
        params.radius = 10;
      }

      const data = await listingService.getListings(params);
      setListings(data.results || data);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, [filters, location]);

  useEffect(() => {
    fetchCategories();
    fetchFeaturedListings();
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Auto-advance carousel
  useEffect(() => {
    if (featuredListings.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredListings.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredListings.length]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredListings.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredListings.length) % featuredListings.length);
  };

  const getPlaceholderImage = (title) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&size=800&background=B21F1F&color=ffffff&bold=true`;
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Carousel */}
        {featuredListings.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <FiStar className="text-[#B21F1F] text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Ofertas Destacadas</h2>
            </div>
            
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg">
              {/* Carousel Content */}
              <div className="relative h-[400px] md:h-[450px]">
                {featuredListings.map((listing, index) => {
                  const discount = Math.round(((listing.original_price - listing.discounted_price) / listing.original_price) * 100);
                  
                  return (
                    <div
                      key={listing.id}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ pointerEvents: index === currentSlide ? 'auto' : 'none' }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center">
                        {/* Image Side */}
                        <div className="relative h-64 md:h-full min-h-0">
                          <img
                            src={listing.image || getPlaceholderImage(listing.title)}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = getPlaceholderImage(listing.title);
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
                          {discount > 0 && (
                            <div className="absolute top-4 right-4 bg-[#B21F1F] text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                              -{discount}%
                            </div>
                          )}
                        </div>

                        {/* Content Side */}
                        <div className="flex flex-col justify-center items-start p-6 md:p-8 gap-3 h-full min-h-0">
                          <div className="bg-red-100 text-[#B21F1F] px-3 py-1 rounded-full text-xs font-bold uppercase">
                            Oferta Especial
                          </div>
                          
                          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                            {listing.title}
                          </h3>
                          
                          {listing.restaurant_info && (
                            <p className="text-[#B21F1F] font-semibold text-base">
                              {listing.restaurant_info.business_name}
                            </p>
                          )}
                          
                          <p className="text-gray-600 line-clamp-2 text-sm">
                            {listing.description}
                          </p>
                          
                          <div className="flex items-end gap-4">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Precio Original</div>
                              <div className="text-lg text-gray-400 line-through">
                                {formatPrice(listing.original_price)}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Ahora Solo</div>
                              <div className="text-3xl font-bold text-[#B21F1F]">
                                {formatPrice(listing.discounted_price)}
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => window.location.href = `/listings/${listing.id}`}
                            className="bg-gradient-to-r from-[#B21F1F] to-[#8B1616] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-sm mt-2"
                          >
                            Ver Oferta
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Arrows */}
              {featuredListings.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                  >
                    <FiChevronLeft className="text-2xl text-gray-800" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                  >
                    <FiChevronRight className="text-2xl text-gray-800" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {featuredListings.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {featuredListings.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide
                          ? 'bg-white w-8'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Explorar Alimentos Disponibles</h1>
          <p className="text-gray-600">Descubre excelente comida a precios con descuento cerca de ti</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 mb-8">
          <Input
            type="text"
            name="search"
            placeholder="Buscar alimentos..."
            value={filters.search}
            onChange={handleFilterChange}
          />

          <select
            name="category"
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer focus:outline-none focus:border-[#B21F1F]"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">Todas las Categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            name="listing_type"
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer focus:outline-none focus:border-[#B21F1F]"
            value={filters.listing_type}
            onChange={handleFilterChange}
          >
            <option value="">Todos los Tipos</option>
            <option value="sale">En Venta</option>
            <option value="donation">Donación</option>
          </select>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.length === 0 ? (
              <div className="col-span-full text-center py-16 px-8 text-gray-500">
                <p>No se encontraron alimentos. Intenta ajustar tus filtros.</p>
              </div>
            ) : (
              listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
