import { Card } from "../../components/common";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export const ContactInfoCard = ({ restaurant }) => {
  return (
    <Card className="mb-8 shadow-lg">
      <div className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FiPhone className="text-xl md:text-2xl text-[#B21F1F]" />
          Información de Contacto
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 text-gray-700 p-3 bg-gray-50 rounded-lg">
            <FiMapPin className="text-xl md:text-2xl text-[#B21F1F] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 font-medium mb-1">
                Dirección
              </div>
              <span className="text-sm font-medium break-words">
                {restaurant.address}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-700 p-3 bg-gray-50 rounded-lg">
            <FiPhone className="text-xl md:text-2xl text-[#B21F1F] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 font-medium mb-1">
                Teléfono
              </div>
              <a
                href={`tel:${restaurant.phone}`}
                className="text-sm font-medium text-[#B21F1F] hover:underline break-all"
              >
                {restaurant.phone}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-700 p-3 bg-gray-50 rounded-lg">
            <FiMail className="text-xl md:text-2xl text-[#B21F1F] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 font-medium mb-1">
                Email
              </div>
              <a
                href={`mailto:${restaurant.email}`}
                className="text-sm font-medium text-[#B21F1F] hover:underline break-all"
              >
                {restaurant.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
