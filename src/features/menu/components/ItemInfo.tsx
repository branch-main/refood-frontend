import { formatPrice } from "@/shared/utils";
import { FiDollarSign, FiPackage, FiClock, FiTag } from "react-icons/fi";

interface ItemInfoProps {
  price: number;
  quantity: number;
  preparationTime: number;
  categoryName: string;
}

export const ItemInfo = ({
  price,
  quantity,
  preparationTime,
  categoryName,
}: ItemInfoProps) => {
  return (
    <div className="bg-neutral-50 rounded-lg p-5">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FiDollarSign className="text-base" />
            <span>Precio</span>
          </div>
          <div className="text-2xl font-bold text-[#B21F1F]">
            {formatPrice(price)}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FiPackage className="text-base" />
            <span>Disponibles</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{quantity}</div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FiClock className="text-base" />
            <span>Tiempo de preparación</span>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {preparationTime} min
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FiTag className="text-base" />
            <span>Categoría</span>
          </div>
          <div
            className="text-lg font-semibold text-gray-900 truncate"
            title={categoryName}
          >
            {categoryName}
          </div>
        </div>
      </div>
    </div>
  );
};
