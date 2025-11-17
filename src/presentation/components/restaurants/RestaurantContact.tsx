import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { Restaurant } from "../../../domain/entities/Restaurant";

export const RestaurantConcat = ({
  restaurant,
}: {
  restaurant: Restaurant;
}) => {
  return (
    <div className="bg-white p-4">
      <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
        Contacto
      </h3>

      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="shrink-0 pt-0.5">
            <FiMapPin className="text-base text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <a
              href={`https://www.google.com/maps?q=${encodeURIComponent(
                restaurant.address,
              )}`}
              className="text-xs text-gray-800 hover:text-red-500 transition-colors leading-relaxed wrap-break-word"
            >
              {restaurant.address}
            </a>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="shrink-0 pt-0.5">
            <FiPhone className="text-base text-red-500" />
          </div>
          <a
            href={`tel:${restaurant.phone}`}
            className="text-xs text-gray-800 hover:text-red-500 transition-colors font-medium break-all"
          >
            {restaurant.phone}
          </a>
        </div>

        <div className="flex gap-3">
          <div className="shrink-0 pt-0.5">
            <FiMail className="text-base text-red-500" />
          </div>
          <a
            href={`mailto:${restaurant.email}`}
            className="text-xs text-gray-800 hover:text-red-500 transition-colors font-medium break-all"
          >
            {restaurant.email}
          </a>
        </div>
      </div>
    </div>
  );
};
