import { Restaurant } from "@/entities";
import { FiStar } from "react-icons/fi";

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  userInitials: string;
}

// Mock data - replace with actual API call
const mockReviews: Review[] = [
  {
    id: 1,
    userName: "María González",
    rating: 5,
    comment:
      "¡Excelente comida! Todo llegó caliente y bien empacado. Definitivamente volveré a pedir.",
    date: "2024-11-15",
    userInitials: "MG",
  },
  {
    id: 2,
    userName: "Carlos Pérez",
    rating: 4,
    comment:
      "Muy buena calidad, aunque el tiempo de entrega fue un poco más largo de lo esperado.",
    date: "2024-11-14",
    userInitials: "CP",
  },
  {
    id: 3,
    userName: "Ana Rodríguez",
    rating: 5,
    comment:
      "Las porciones son generosas y el sabor es increíble. Lo recomiendo 100%.",
    date: "2024-11-13",
    userInitials: "AR",
  },
  {
    id: 4,
    userName: "José López",
    rating: 4,
    comment:
      "Buena experiencia en general. La atención al cliente fue excelente.",
    date: "2024-11-12",
    userInitials: "JL",
  },
];

const getRelativeDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
  return `Hace ${Math.floor(diffDays / 30)} meses`;
};

export const RestaurantReviews = ({
  restaurant,
}: {
  restaurant: Restaurant;
}) => {
  return (
    <div className="bg-white shadow-xs rounded-xl p-8 h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Reseñas recientes
      </h2>

      <div className="flex flex-col gap-4">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-bold text-sm">
                  {review.userInitials}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-800 text-sm">
                    {review.userName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {getRelativeDate(review.date)}
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
        Ver todas las reseñas ({restaurant.stats.totalReviews})
      </button>
    </div>
  );
};
