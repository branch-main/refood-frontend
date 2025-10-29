import { useNavigate } from 'react-router-dom';
import { Card } from '../common';
import { formatPrice, formatDistance, calculateDiscount } from '../../utils';
import { FiMapPin, FiHome, FiTag, FiClock } from 'react-icons/fi';

export const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const discount = calculateDiscount(listing.original_price, listing.discounted_price);

  const getPlaceholderImage = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(listing.title)}&size=400&background=B21F1F&color=ffffff&bold=true`;
  };

  return (
    <Card hover onClick={() => navigate(`/listings/${listing.id}`)} className="overflow-hidden">
      <div className="flex flex-col h-full transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <img 
            src={listing.image || getPlaceholderImage()} 
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={(e) => {
              e.target.src = getPlaceholderImage();
            }}
          />
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-[#B21F1F] text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-lg backdrop-blur-sm">
              -{discount}%
            </div>
          )}
          {/* Status Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
            listing.status === 'available' 
              ? 'bg-green-500/90 text-white' 
              : 'bg-gray-500/90 text-white'
          }`}>
            {listing.status === 'available' ? 'Disponible' : 'Agotado'}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col p-4 gap-3">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 m-0 leading-tight line-clamp-2 hover:text-[#B21F1F] transition-colors">
            {listing.title}
          </h3>
          
          {/* Restaurant Info */}
          {listing.restaurant_info && (
            <div className="flex items-center gap-1.5 text-gray-600 text-sm">
              <FiHome className="text-[#B21F1F] flex-shrink-0" />
              <span className="truncate">{listing.restaurant_info.business_name}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-500 text-sm m-0 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          {/* Price Section */}
          <div className="flex items-end justify-between mt-auto pt-3 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-gray-400 line-through text-xs">{formatPrice(listing.original_price)}</span>
              <span className="text-[#B21F1F] font-bold text-2xl">{formatPrice(listing.discounted_price)}</span>
            </div>

            {/* Meta Info */}
            <div className="flex flex-col items-end gap-1 text-xs text-gray-500">
              {listing.distance && (
                <div className="flex items-center gap-1">
                  <FiMapPin className="text-xs" />
                  <span>{formatDistance(listing.distance)}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <FiTag className="text-xs" />
                <span>{listing.available_quantity} unidades</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
