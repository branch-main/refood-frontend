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
    <div className="min-h-[calc(100vh-200px)]">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-[#B21F1F] to-[#8B1616] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button 
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-base cursor-pointer px-5 py-2.5 rounded-lg mb-6 inline-flex items-center gap-2 transition-all font-semibold hover:bg-white/20 hover:-translate-x-1" 
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>

          {/* Hero Content */}
          <div className="flex gap-8 items-start flex-col md:flex-row">
            {/* Restaurant Image */}
            <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border-4 border-white/20 shadow-2xl">
                <img
                  src={restaurant.logo || getPlaceholderImage()}
                  alt={restaurant.business_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = getPlaceholderImage();
                  }}
                />
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="flex-1 pt-2 text-center md:text-left">
              <div className="flex items-start gap-3 mb-3 flex-wrap justify-center md:justify-start">
                {restaurant.is_premium && (
                  <span className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Premium
                  </span>
                )}
                {openStatus !== null && (
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 backdrop-blur-sm border shadow-lg ${
                    openStatus 
                      ? 'bg-green-500/90 text-white border-green-400' 
                      : 'bg-red-500/90 text-white border-red-400'
                  }`}>
                    <span className={`w-2 h-2 rounded-full animate-pulse ${openStatus ? 'bg-white' : 'bg-white'}`}></span>
                    {openStatus ? 'Abierto ahora' : 'Cerrado'}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold m-0 leading-tight mb-4 drop-shadow-lg">
                {restaurant.business_name}
              </h1>

              {restaurant.rating && (
                <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                  <span className="text-xl md:text-2xl font-bold drop-shadow-md">⭐ {formatRating(restaurant.rating)}</span>
                  <span className="text-base md:text-lg opacity-90 drop-shadow-md">({restaurant.total_ratings} reseñas)</span>
                </div>
              )}

              <p className="text-base md:text-lg leading-relaxed mb-6 opacity-95 max-w-3xl">
                {restaurant.description}
              </p>

              {/* Quick Actions */}
              <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                <Button 
                  onClick={handleToggleFavorite} 
                  variant="secondary"
                  className="bg-white text-[#B21F1F] hover:bg-gray-100 shadow-lg"
                >
                  {isFavorite ? '❤️ Guardado' : '🤍 Guardar Restaurante'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contact Info Card */}
        <Card className="mb-8 shadow-lg">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-xl md:text-2xl">📞</span> Información de Contacto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 text-gray-700 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl md:text-2xl">📍</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 font-medium mb-1">Dirección</div>
                  <span className="text-sm font-medium break-words">{restaurant.address}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl md:text-2xl">📞</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 font-medium mb-1">Teléfono</div>
                  <a href={`tel:${restaurant.phone}`} className="text-sm font-medium text-[#B21F1F] hover:underline break-all">{restaurant.phone}</a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl md:text-2xl">✉️</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 font-medium mb-1">Email</div>
                  <a href={`mailto:${restaurant.email}`} className="text-sm font-medium text-[#B21F1F] hover:underline break-all">{restaurant.email}</a>
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
