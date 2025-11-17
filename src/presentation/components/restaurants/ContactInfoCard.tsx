import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { Restaurant } from "../../../domain/entities/Restaurant";

interface ContactInfoCardProps {
  restaurant: Restaurant;
}

export const ContactInfoCard = ({ restaurant }: ContactInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
        Contacto
      </h3>
      
      <div className="space-y-3">
        {/* Address */}
        <div className="flex gap-3">
          <div className="flex-shrink-0 pt-0.5">
            <FiMapPin className="text-base text-[#B21F1F]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-600 leading-relaxed break-words">
              {restaurant.address}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-3">
          <div className="flex-shrink-0 pt-0.5">
            <FiPhone className="text-base text-[#B21F1F]" />
          </div>
          <a
            href={`tel:${restaurant.phone}`}
            className="text-xs text-[#B21F1F] hover:text-[#8B1616] transition-colors font-medium break-all"
          >
            {restaurant.phone}
          </a>
        </div>

        {/* Email */}
        <div className="flex gap-3">
          <div className="flex-shrink-0 pt-0.5">
            <FiMail className="text-base text-[#B21F1F]" />
          </div>
          <a
            href={`mailto:${restaurant.email}`}
            className="text-xs text-[#B21F1F] hover:text-[#8B1616] transition-colors font-medium break-all"
          >
            {restaurant.email}
          </a>
        </div>
      </div>
    </div>
  );
};
