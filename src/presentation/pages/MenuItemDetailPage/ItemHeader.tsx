import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";

interface ItemHeaderProps {
  name: string;
  restaurantName: string;
  restaurantId: number;
}

export const ItemHeader = ({
  name,
  restaurantName,
  restaurantId,
}: ItemHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-2">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
        {name}
      </h1>
      <button
        className="inline-flex items-center gap-1.5 text-[#B21F1F] text-base font-medium hover:text-[#8B1616] transition-colors"
        onClick={() => navigate(`/restaurants/${restaurantId}`)}
      >
        <FiHome className="text-lg" />
        <span className="hover:underline">{restaurantName}</span>
      </button>
    </div>
  );
};
