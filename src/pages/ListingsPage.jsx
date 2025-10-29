import { useState, useEffect } from 'react';
import { listingService, categoryService } from '../services';
import { useGeolocation } from '../hooks';
import { ListingCard } from '../components/listings/ListingCard';
import { Loading, Input } from '../components/common';

export const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    listing_type: '',
  });

  const { location } = useGeolocation();

  useEffect(() => {
    fetchCategories();
    // Fetch listings immediately on mount, then again when filters change
    fetchListings();
  }, []);

  useEffect(() => {
    // Fetch when filters change
    fetchListings();
  }, [filters]);

  useEffect(() => {
    // Refetch when location becomes available
    if (location) {
      fetchListings();
    }
  }, [location]);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data.results || data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = { ...filters };
      
      // Add location params if available
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
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
