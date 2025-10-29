import { useNavigate } from 'react-router-dom';
import { Card } from '../common';
import { formatPrice, formatDistance, calculateDiscount } from '../../utils';
import { FiMapPin, FiHome } from 'react-icons/fi';

export const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const discount = calculateDiscount(listing.original_price, listing.discounted_price);

  const getPlaceholderImage = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(listing.title)}&size=400&background=B21F1F&color=ffffff&bold=true`;
  };

  return (
    <Card hover onClick={() => navigate(`/listings/${listing.id}`)}>
      <div className="flex flex-col h-full transition-all duration-300 hover:-translate-y-0.5">
        {/* Image - Always show, use placeholder if no image */}
        <div className="relative w-full h-[220px] overflow-hidden rounded-t-xl md:h-[180px]">
          <img 
            src={listing.image || getPlaceholderImage()} 
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src = getPlaceholderImage();
            }}
          />
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-br from-[#B21F1F] to-[#8B1616] text-white px-4 py-2 rounded-full font-bold text-sm shadow-[0_4px_12px_rgba(178,31,31,0.4)] z-[1]">
              {discount}% OFF
            </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col p-5 gap-3">
          <h3 className="text-xl font-bold text-gray-900 m-0 leading-tight overflow-hidden text-ellipsis line-clamp-2 md:text-lg">
            {listing.title}
          </h3>
          
          {listing.restaurant_info && (
            <p className="text-[#B21F1F] text-sm font-semibold m-0 flex items-center gap-2">
              <FiHome className="text-base" /> {listing.restaurant_info.business_name}
            </p>
          )}

          <p className="text-gray-500 text-[0.9375rem] m-0 overflow-hidden text-ellipsis line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200">
            <div className="flex flex-col gap-1">
              <span className="text-gray-400 line-through text-sm">{formatPrice(listing.original_price)}</span>
              <span className="text-[#B21F1F] font-bold text-2xl md:text-xl">{formatPrice(listing.discounted_price)}</span>
            </div>

            {listing.distance && (
              <span className="text-gray-500 text-sm font-medium flex items-center gap-1">
                <FiMapPin className="text-base" /> {formatDistance(listing.distance)}
              </span>
            )}
          </div>

          <div className="flex justify-between items-center gap-3 pt-3">
            <span className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider ${listing.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
              {listing.status === 'available' ? 'Disponible' : 'Agotado'}
            </span>
            <span className="text-gray-500 text-sm font-medium">
              {listing.available_quantity} disponibles
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
