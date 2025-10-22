import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listingService } from '../services';
import { Card, Button, Loading } from '../components/common';
import { formatPrice, formatDateTime } from '../utils';
import './ListingDetailPage.css';

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
  if (!listing) return <div className="container"><p>Listado no encontrado</p></div>;

  const discount = listing.original_price > 0 
    ? Math.round(((listing.original_price - listing.discounted_price) / listing.original_price) * 100)
    : 0;

  return (
    <div className="listing-detail-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Volver
        </button>

        <div className="listing-detail-container">
          <div className="listing-detail-image-section">
            {listing.image ? (
              <img src={listing.image} alt={listing.title} className="listing-detail-image" />
            ) : (
              <div className="listing-detail-image-placeholder">
                <span className="placeholder-icon">🍽️</span>
              </div>
            )}

            {discount > 0 && (
              <div className="listing-detail-badge">{discount}% DESCUENTO</div>
            )}
          </div>

          <div className="listing-detail-content">
            <div className="listing-detail-header">
              <div>
                <h1 className="listing-detail-title">{listing.title}</h1>
                {listing.restaurant_info && (
                  <button 
                    className="listing-detail-restaurant"
                    onClick={() => navigate(`/restaurants/${listing.restaurant_info.id}`)}
                  >
                    🏪 {listing.restaurant_info.business_name}
                  </button>
                )}
              </div>

              <div className="listing-detail-status">
                <span className={`status-badge status-${listing.status}`}>
                  {listing.status === 'available' ? 'Disponible' : 'Agotado'}
                </span>
              </div>
            </div>

            <div className="listing-detail-description">
              <p>{listing.description}</p>
            </div>

            <div className="listing-detail-info-grid">
              <Card>
                <div className="info-item">
                  <span className="info-label">Precio Original</span>
                  <span className="info-value original-price">{formatPrice(listing.original_price)}</span>
                </div>
              </Card>

              <Card>
                <div className="info-item">
                  <span className="info-label">Precio Con Descuento</span>
                  <span className="info-value discounted-price">{formatPrice(listing.discounted_price)}</span>
                </div>
              </Card>

              <Card>
                <div className="info-item">
                  <span className="info-label">Disponibles</span>
                  <span className="info-value">{listing.available_quantity}</span>
                </div>
              </Card>

              <Card>
                <div className="info-item">
                  <span className="info-label">Tipo</span>
                  <span className="info-value">
                    {listing.listing_type === 'sale' ? 'Venta' : 'Donación'}
                  </span>
                </div>
              </Card>
            </div>

            {listing.allergens && listing.allergens.length > 0 && (
              <Card>
                <div className="listing-detail-section">
                  <h3>⚠️ Alérgenos</h3>
                  <div className="allergens-list">
                    {listing.allergens.map((allergen, idx) => (
                      <span key={idx} className="allergen-badge">{allergen}</span>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            <Card>
              <div className="listing-detail-section">
                <h3>📅 Disponibilidad</h3>
                <div className="availability-info">
                  <div className="availability-row">
                    <span>Desde:</span>
                    <strong>{formatDateTime(listing.available_from)}</strong>
                  </div>
                  <div className="availability-row">
                    <span>Hasta:</span>
                    <strong>{formatDateTime(listing.available_until)}</strong>
                  </div>
                </div>
              </div>
            </Card>

            {listing.pickup_instructions && (
              <Card>
                <div className="listing-detail-section">
                  <h3>📍 Instrucciones de Recogida</h3>
                  <p>{listing.pickup_instructions}</p>
                </div>
              </Card>
            )}

            {listing.status === 'available' && listing.available_quantity > 0 && (
              <Card className="order-section">
                <div className="listing-detail-section">
                  <h3>Realizar Pedido</h3>
                  <div className="quantity-selector">
                    <label>Cantidad:</label>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-value">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(Math.min(listing.available_quantity, quantity + 1))}
                        disabled={quantity >= listing.available_quantity}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="order-total">
                    <span>Total:</span>
                    <strong>{formatPrice(listing.discounted_price * quantity)}</strong>
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
