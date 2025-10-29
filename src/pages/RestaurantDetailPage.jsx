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

  const getPlaceholderImage = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(restaurant?.business_name || 'Restaurant')}&size=800&background=B21F1F&color=ffffff&bold=true`;
  };

  const isOpenNow = () => {
    if (!restaurant?.opening_hours) return null;
    
    const now = new Date();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    
    const todayHours = restaurant.opening_hours[dayName];
    if (!todayHours || todayHours.toLowerCase() === 'cerrado' || todayHours.toLowerCase() === 'closed') {
      return false;
    }
    
    // Parse hours like "09:00 - 22:00"
    const timeMatch = todayHours.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
    if (!timeMatch) return null;
    
    const [_, openHour, openMin, closeHour, closeMin] = timeMatch;
    const openTime = `${openHour.padStart(2, '0')}:${openMin}`;
    const closeTime = `${closeHour.padStart(2, '0')}:${closeMin}`;
    
    return currentTime >= openTime && currentTime <= closeTime;
  };

  if (loading) return <Loading fullScreen />;
  if (!restaurant) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p>Restaurante no encontrado</p></div>;

  const openStatus = isOpenNow();

  return (
    <div className="min-h-[calc(100vh-200px)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button 
          className="bg-white border border-gray-300 text-gray-700 text-base cursor-pointer px-6 py-3 rounded-lg mb-6 inline-flex items-center gap-2 transition-all font-semibold hover:bg-gray-50 hover:-translate-x-1 shadow-sm" 
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>

        {/* Header Section with Image */}
        <Card className="mb-8 overflow-hidden shadow-lg">
          <div className="flex gap-8 p-6 md:flex-col">
            {/* Restaurant Image */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 rounded-xl overflow-hidden bg-gray-100 md:w-full md:h-72">
                <img
                  src={restaurant.logo || getPlaceholderImage()}
                  alt={restaurant.business_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = getPlaceholderImage();
                  }}
                />
                {restaurant.is_premium && (
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                    ⭐ Premium
                  </div>
                )}
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start gap-4 mb-4 md:flex-col">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h1 className="text-4xl font-extrabold text-gray-900 m-0 leading-tight md:text-3xl">
                      {restaurant.business_name}
                    </h1>
                    {openStatus !== null && (
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1.5 ${
                        openStatus 
                          ? 'bg-green-100 text-green-700 border border-green-300' 
                          : 'bg-red-100 text-red-700 border border-red-300'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${openStatus ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {openStatus ? 'Abierto ahora' : 'Cerrado'}
                      </span>
                    )}
                  </div>
                  {restaurant.rating && (
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl font-bold text-[#B21F1F]">⭐ {formatRating(restaurant.rating)}</span>
                      <span className="text-base text-gray-600">({restaurant.total_ratings} reseñas)</span>
                    </div>
                  )}
                </div>
                <Button onClick={handleToggleFavorite} variant="secondary">
                  {isFavorite ? '❤️ Guardado' : '🤍 Guardar'}
                </Button>
              </div>

              <p className="text-gray-700 text-base leading-relaxed mb-6">
                {restaurant.description}
              </p>

              {/* Quick Contact Info */}
              <div className="grid grid-cols-1 gap-3 mt-auto">
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-xl">📍</span>
                  <span className="text-sm">{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-xl">📞</span>
                  <a href={`tel:${restaurant.phone}`} className="text-sm text-[#B21F1F] hover:underline">{restaurant.phone}</a>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-xl">✉️</span>
                  <a href={`mailto:${restaurant.email}`} className="text-sm text-[#B21F1F] hover:underline break-all">{restaurant.email}</a>
                </div>
              </div>
            </div>
          </div>
        </Card>
        {/* Opening Hours */}
        {restaurant.opening_hours && (
          <Card className="mb-8 shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">🕒</span> Horario de Apertura
              </h2>
              <div className="space-y-2">
                {Object.entries(restaurant.opening_hours).map(([day, hours]) => {
                  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                  const isToday = day === today;
                  
                  return (
                    <div 
                      key={day} 
                      className={`flex justify-between items-center p-4 rounded-lg transition-all ${
                        isToday 
                          ? 'bg-[#B21F1F] text-white shadow-md' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isToday && <span className="text-lg">•</span>}
                        <span className={`font-semibold capitalize ${isToday ? 'text-white' : 'text-gray-900'}`}>
                          {getDayName(day)}
                          {isToday && <span className="ml-2 text-xs font-normal opacity-90">(Hoy)</span>}
                        </span>
                      </div>
                      <span className={`font-medium ${isToday ? 'text-white' : 'text-gray-600'}`}>
                        {hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {/* Available Listings */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">🍽️</span> Alimentos Disponibles
          </h2>
          
          {listings.length === 0 ? (
            <Card className="shadow-lg">
              <div className="text-center py-12 px-8">
                <span className="text-5xl mb-4 block">🍴</span>
                <p className="text-gray-500 text-base">Este restaurante no tiene alimentos disponibles en este momento.</p>
                <p className="text-gray-400 text-sm mt-2">Vuelve pronto para ver nuevas ofertas</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
