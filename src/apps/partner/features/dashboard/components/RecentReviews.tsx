import { getRelativeTime } from "@/shared/utils";
import { FiStar } from "react-icons/fi";
import { MdStorefront } from "react-icons/md";
import { Link } from "react-router-dom";

interface Review {
  id: number;
  userName: string;
  userInitials: string;
  rating: number;
  comment: string;
  restaurantName: string;
  date: string;
}

// TODO: use real data
const RECENT_USER_REVIEWS: Review[] = [
  {
    id: 1,
    userName: "María González",
    userInitials: "MG",
    rating: 5,
    comment: "¡Excelente comida! Todo llegó caliente y bien empacado.",
    restaurantName: "Pizza Palace",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    userName: "Carlos Pérez",
    userInitials: "CP",
    rating: 4,
    comment:
      "Muy buena calidad, aunque el tiempo de entrega fue un poco largo.",
    restaurantName: "Burger House",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];

export const RecentReviews = () => {
  if (RECENT_USER_REVIEWS.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
          <MdStorefront className="text-3xl text-gray-400" />
        </div>
        <p className="text-gray-600 font-medium">Sin reseñas aún</p>
        <p className="text-gray-400 text-sm mt-1">Aquí aparecerán pronto</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {RECENT_USER_REVIEWS.map((review) => (
        <div
          key={review.id}
          className="transition-all duration-200 bg-gray-50 rounded-2xl p-4 hover:bg-red-50"
        >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xs">
          {review.userInitials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-gray-800 text-sm truncate">
              {review.userName}
            </span>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {getRelativeTime(review.date)}
            </span>
          </div>

          <div className="flex items-center gap-1 my-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar
                key={i}
                className={`w-3 h-3 ${
                  i < review.rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-400"
                }`}
              />
            ))}
          </div>

          <Link
            to={`/restaurants/${review.id}`}
            className="text-xs font-medium text-red-600 truncate"
          >
            en {review.restaurantName}
          </Link>
        </div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 pl-13">
        {review.comment}
      </p>
    </div>
  ))}
    </div>
  );
};
