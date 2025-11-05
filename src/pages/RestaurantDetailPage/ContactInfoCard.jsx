import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export const ContactInfoCard = ({ restaurant }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-5">
          Información de Contacto
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-gray-100 p-2.5 rounded-lg">
              <FiMapPin className="text-lg text-[#B21F1F]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 font-medium mb-1">
                Dirección
              </div>
              <span className="text-base text-gray-900 font-medium break-words">
                {restaurant.address}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-gray-100 p-2.5 rounded-lg">
              <FiPhone className="text-lg text-[#B21F1F]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 font-medium mb-1">
                Teléfono
              </div>
              <a
                href={`tel:${restaurant.phone}`}
                className="text-base font-medium text-[#B21F1F] hover:underline break-all"
              >
                {restaurant.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-gray-100 p-2.5 rounded-lg">
              <FiMail className="text-lg text-[#B21F1F]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 font-medium mb-1">
                Email
              </div>
              <a
                href={`mailto:${restaurant.email}`}
                className="text-base font-medium text-[#B21F1F] hover:underline break-all"
              >
                {restaurant.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
