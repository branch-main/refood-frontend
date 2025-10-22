import { useState, useEffect } from 'react';
import { listingService, categoryService } from '../services';
import { useGeolocation } from '../hooks';
import { ListingCard } from '../components/listings/ListingCard';
import { Loading, Input } from '../components/common';
import './ListingsPage.css';

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
    <div className="listings-page">
      <div className="container">
        <div className="page-header">
          <h1>Explorar Alimentos Disponibles</h1>
          <p>Descubre excelente comida a precios con descuento cerca de ti</p>
        </div>

        <div className="filters-section">
          <Input
            type="text"
            name="search"
            placeholder="Buscar alimentos..."
            value={filters.search}
            onChange={handleFilterChange}
          />

          <select
            name="category"
            className="filter-select"
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
            className="filter-select"
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
          <div className="listings-grid">
            {listings.length === 0 ? (
              <div className="empty-state">
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
