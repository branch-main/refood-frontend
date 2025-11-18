import { Restaurant } from "@/entities";

export const RestaurantMap = ({ restaurant }: { restaurant: Restaurant }) => {
  const mapUrl =
    restaurant.latitude && restaurant.longitude
      ? `https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&output=embed`
      : `https://www.google.com/maps?q=${encodeURIComponent(restaurant.address)}&output=embed`;

  return (
    <div className="bg-white shadow-xs rounded-xl p-8 h-full flex flex-col">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        ¿Dónde comprar en {restaurant.name}?
      </h2>
      <p className="text-gray-600 text-sm mb-4">{restaurant.address}</p>
      <div className="flex-1 rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa de ${restaurant.name}`}
        />
      </div>
    </div>
  );
};
