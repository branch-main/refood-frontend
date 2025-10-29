import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listingService } from '../services';
import { Card, Button, Loading } from '../components/common';
import { formatPrice, formatDateTime } from '../utils';

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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 mt-6">
          <div className="relative">
            {listing.image ? (
              <img src={listing.image} alt={listing.title} className="w-full h-[500px] lg:h-[500px] md:h-[400px] sm:h-[300px] object-cover rounded-2xl shadow-md" />
            ) : (
              <div className="w-full h-[500px] lg:h-[500px] md:h-[400px] sm:h-[300px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                <span className="text-8xl opacity-30">🍽️</span>
              </div>
            )}

            {discount > 0 && (
              <div className="absolute top-4 right-4 bg-[#B21F1F] text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide shadow-[0_4px_12px_rgba(178,31,31,0.3)]">{discount}% DESCUENTO</div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div>
                <h1 className="text-4xl lg:text-4xl md:text-3xl sm:text-2xl font-extrabold text-gray-900 mb-2 leading-tight">{listing.title}</h1>
                {listing.restaurant_info && (
                  <button 
                    className="bg-transparent border-none text-[#B21F1F] text-lg cursor-pointer p-0 text-left transition-opacity hover:opacity-70 hover:underline"
                    onClick={() => navigate(`/restaurants/${listing.restaurant_info.id}`)}
                  >
                    🏪 {listing.restaurant_info.business_name}
                  </button>
                )}
              </div>

              <div className="flex items-center">
                <span className={`px-4 py-2 rounded-lg font-semibold text-sm uppercase tracking-wide ${listing.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {listing.status === 'available' ? 'Disponible' : 'Agotado'}
                </span>
              </div>
            </div>

            <div className="text-lg leading-relaxed text-gray-600">
              <p>{listing.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <div className="flex flex-col gap-2 p-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Precio Original</span>
                  <span className="text-2xl font-bold text-gray-400 line-through">{formatPrice(listing.original_price)}</span>
                </div>
              </Card>

              <Card>
                <div className="flex flex-col gap-2 p-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Precio Con Descuento</span>
                  <span className="text-2xl font-bold text-[#B21F1F]">{formatPrice(listing.discounted_price)}</span>
                </div>
              </Card>

              <Card>
                <div className="flex flex-col gap-2 p-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Disponibles</span>
                  <span className="text-2xl font-bold text-gray-900">{listing.available_quantity}</span>
                </div>
              </Card>

              <Card>
                <div className="flex flex-col gap-2 p-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Tipo</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {listing.listing_type === 'sale' ? 'Venta' : 'Donación'}
                  </span>
                </div>
              </Card>
            </div>

            {listing.allergens && listing.allergens.length > 0 && (
              <Card>
                <div className="p-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Alérgenos</h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.allergens.map((allergen, idx) => (
                      <span key={idx} className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-semibold capitalize">{allergen}</span>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            <Card>
              <div className="p-2">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📅 Disponibilidad</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Desde:</span>
                    <strong>{formatDateTime(listing.available_from)}</strong>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Hasta:</span>
                    <strong>{formatDateTime(listing.available_until)}</strong>
                  </div>
                </div>
              </div>
            </Card>

            {listing.pickup_instructions && (
              <Card>
                <div className="p-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📍 Instrucciones de Recogida</h3>
                  <p>{listing.pickup_instructions}</p>
                </div>
              </Card>
            )}

            {listing.status === 'available' && listing.available_quantity > 0 && (
              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200">
                <div className="p-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Realizar Pedido</h3>
                  <div className="flex items-center justify-between mb-4">
                    <label className="font-semibold text-gray-900">Cantidad:</label>
                    <div className="flex items-center gap-4 bg-white px-2 py-2 rounded-lg shadow-sm">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-10 h-10 border-none bg-[#B21F1F] text-white rounded-md text-xl cursor-pointer transition-all font-bold hover:bg-[#8B1616] hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="text-xl font-bold text-gray-900 min-w-8 text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(Math.min(listing.available_quantity, quantity + 1))}
                        disabled={quantity >= listing.available_quantity}
                        className="w-10 h-10 border-none bg-[#B21F1F] text-white rounded-md text-xl cursor-pointer transition-all font-bold hover:bg-[#8B1616] hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white rounded-lg mb-4">
                    <span className="text-lg text-gray-500">Total:</span>
                    <strong className="text-3xl text-[#B21F1F] font-extrabold">{formatPrice(listing.discounted_price * quantity)}</strong>
                  </div>

                  <Button onClick={handleOrder} fullWidth>
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
