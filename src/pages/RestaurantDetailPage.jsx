import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restaurantService, listingService } from '../services';
import { Card, Button, Loading } from '../components/common';
import { ListingCard } from '../components/listings/ListingCard';
import { formatRating } from '../utils';

export const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchRestaurant();
    fetchListings();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      setLoading(true);
      const data = await restaurantService.getRestaurant(id);
      setRestaurant(data);
    } catch (error) {
      console.error('Failed to fetch restaurant:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchListings = async () => {
    try {
      const data = await listingService.getListings({ restaurant: id });
      setListings(data.results || data);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };

  const handleToggleFavorite = async () => {
    // TODO: Implement favorite toggle
    setIsFavorite(!isFavorite);
  };

  if (loading) return <Loading fullScreen />;
  if (!restaurant) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p>Restaurante no encontrado</p></div>;

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="bg-gradient-to-br from-[#B21F1F] to-[#8B1616] text-white py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            className="bg-white/20 border border-white/30 text-white text-base cursor-pointer px-6 py-3 rounded-lg mb-8 inline-flex items-center gap-2 transition-all font-semibold hover:bg-white/30 hover:-translate-x-1" 
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>

          <div className="flex justify-between items-start gap-8 flex-col lg:flex-row">
            <div className="flex gap-8 flex-1 flex-col md:flex-row">
              {restaurant.logo && (
                <img 
                  src={restaurant.logo} 
                  alt={restaurant.business_name} 
                  className="w-[150px] h-[150px] rounded-2xl object-cover bg-white p-2 shadow-[0_8px_16px_rgba(0,0,0,0.2)]" 
                />
              )}
              
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  <h1 className="text-5xl font-extrabold m-0 leading-tight md:text-4xl sm:text-3xl">{restaurant.business_name}</h1>
                  {restaurant.is_premium && (
                    <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold border border-white/30">⭐ Premium</span>
                  )}
                </div>

                <p className="text-xl leading-relaxed mb-6 opacity-95 sm:text-base">{restaurant.description}</p>

                <div className="flex flex-col gap-4">
                  {restaurant.rating && (
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold">⭐ {formatRating(restaurant.rating)}</span>
                      <span className="text-lg opacity-90">({restaurant.total_ratings} reseñas)</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-2 text-base opacity-95">
                    <span>📍 {restaurant.address}</span>
                    <span>📞 {restaurant.phone}</span>
                    <span>✉️ {restaurant.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button onClick={handleToggleFavorite} variant="secondary">
                {isFavorite ? '❤️ Guardado' : '🤍 Guardar'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {restaurant.opening_hours && (
          <Card className="mb-8 bg-white p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">🕒 Horario de Apertura</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              {Object.entries(restaurant.opening_hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-l-4 border-[#B21F1F]">
                  <span className="font-semibold text-gray-700 capitalize">{getDayName(day)}</span>
                  <span className="text-gray-600 font-medium">{hours}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="mt-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Alimentos Disponibles</h2>
          
          {listings.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Este restaurante no tiene alimentos disponibles en este momento.</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:grid-cols-1">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getDayName = (day) => {
  const days = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };
  return days[day] || day;
};
