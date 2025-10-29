import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listingService } from '../services';
import { Card, Button, Loading } from '../components/common';
import { formatPrice, formatDateTime } from '../utils';
import { FiHome, FiMapPin, FiCalendar, FiAlertTriangle } from 'react-icons/fi';

export const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const data = await listingService.getListing(id);
      setListing(data);
    } catch (error) {
      console.error('Failed to fetch listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = () => {
    // Navigate to order page with listing info
    navigate('/orders/new', { state: { listing, quantity } });
  };

  const getPlaceholderImage = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(listing?.title || 'Food')}&size=800&background=B21F1F&color=ffffff&bold=true`;
  };

  if (loading) return <Loading fullScreen />;
  if (!listing) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p>Listado no encontrado</p></div>;

  const discount = listing.original_price > 0 
    ? Math.round(((listing.original_price - listing.discounted_price) / listing.original_price) * 100)
    : 0;

  return (
    <div className="py-8 min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button className="bg-transparent border-none text-[#B21F1F] cursor-pointer py-2 mb-6 flex items-center gap-2 transition-opacity hover:opacity-70" onClick={() => navigate(-1)}>
          ← Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 mt-6">
          <div className="relative lg:sticky lg:top-20 lg:self-start">
            <img 
              src={listing.image || getPlaceholderImage()} 
              alt={listing.title} 
              className="w-full h-[500px] lg:h-[600px] md:h-[400px] sm:h-[300px] object-cover rounded-2xl shadow-md" 
              onError={(e) => {
                e.target.src = getPlaceholderImage();
              }}
            />

            {discount > 0 && (
              <div className="absolute top-4 right-4 bg-[#B21F1F] text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide shadow-[0_4px_12px_rgba(178,31,31,0.3)]">{discount}% DESCUENTO</div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div>
                <h1 className="text-3xl lg:text-3xl md:text-2xl sm:text-xl font-extrabold text-gray-900 mb-2 leading-tight">{listing.title}</h1>
                {listing.restaurant_info && (
                  <button 
                    className="bg-transparent border-none text-[#B21F1F] text-base cursor-pointer p-0 text-left transition-opacity hover:opacity-70 hover:underline flex items-center gap-2"
                    onClick={() => navigate(`/restaurants/${listing.restaurant_info.id}`)}
                  >
                    <FiHome className="text-lg" /> {listing.restaurant_info.business_name}
                  </button>
                )}
              </div>

              <div className="flex items-center">
                <span className={`px-3 py-1.5 rounded-lg font-semibold text-xs uppercase tracking-wide ${listing.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {listing.status === 'available' ? 'Disponible' : 'Agotado'}
                </span>
              </div>
            </div>

            <div className="text-base leading-relaxed text-gray-600">
              <p>{listing.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <div className="flex flex-col gap-2 p-4">
                  <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Precio Original</span>
                  <span className="text-xl font-bold text-gray-400 line-through">{formatPrice(listing.original_price)}</span>
                </div>
              </Card>

              <Card>
                <div className="flex flex-col gap-2 p-4">
                  <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Precio Con Descuento</span>
                  <span className="text-xl font-bold text-[#B21F1F]">{formatPrice(listing.discounted_price)}</span>
                </div>
              </Card>

              <Card>
                <div className="flex flex-col gap-2 p-4">
                  <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Disponibles</span>
                  <span className="text-xl font-bold text-gray-900">{listing.available_quantity}</span>
                </div>
              </Card>

              <Card>
                <div className="flex flex-col gap-2 p-4">
                  <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Tipo</span>
                  <span className="text-xl font-bold text-gray-900">
                    {listing.listing_type === 'sale' ? 'Venta' : 'Donación'}
                  </span>
                </div>
              </Card>
            </div>

            {listing.allergens && listing.allergens.length > 0 && (
              <Card>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FiAlertTriangle className="text-yellow-600" /> Alérgenos
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.allergens.map((allergen, idx) => (
                      <span key={idx} className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-lg text-xs font-semibold capitalize">{allergen}</span>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            <Card>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FiCalendar className="text-[#B21F1F]" /> Disponibilidad
                </h3>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
                    <span>Desde:</span>
                    <strong>{formatDateTime(listing.available_from)}</strong>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
                    <span>Hasta:</span>
                    <strong>{formatDateTime(listing.available_until)}</strong>
                  </div>
                </div>
              </div>
            </Card>

            {listing.pickup_instructions && (
              <Card>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FiMapPin className="text-[#B21F1F]" /> Instrucciones de Recogida
                  </h3>
                  <p className="text-sm text-gray-600">{listing.pickup_instructions}</p>
                </div>
              </Card>
            )}

            {listing.status === 'available' && listing.available_quantity > 0 && (
              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200">
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-5">Realizar Pedido</h3>
                  <div className="flex items-center justify-between mb-5">
                    <label className="font-semibold text-gray-900 text-base">Cantidad:</label>
                    <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-lg shadow-sm">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-9 h-9 border-none bg-[#B21F1F] text-white rounded-md text-lg cursor-pointer transition-all font-bold hover:bg-[#8B1616] hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="text-lg font-bold text-gray-900 min-w-8 text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(Math.min(listing.available_quantity, quantity + 1))}
                        disabled={quantity >= listing.available_quantity}
                        className="w-9 h-9 border-none bg-[#B21F1F] text-white rounded-md text-lg cursor-pointer transition-all font-bold hover:bg-[#8B1616] hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white rounded-lg mb-5 shadow-sm">
                    <span className="text-base text-gray-600 font-semibold">Total:</span>
                    <strong className="text-2xl text-[#B21F1F] font-extrabold">{formatPrice(listing.discounted_price * quantity)}</strong>
                  </div>

                  <Button onClick={handleOrder} fullWidth className="!py-3.5 !px-8 !text-base !font-bold !shadow-lg hover:!shadow-xl !bg-gradient-to-r !from-[#B21F1F] !to-[#8B1616] !text-white !rounded-xl">
                    Ordenar Ahora
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
