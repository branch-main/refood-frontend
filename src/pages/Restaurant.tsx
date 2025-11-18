import { useParams } from "react-router-dom";
import {
  RestaurantDetail,
  RestaurantContact,
  RestaurantSchedule,
  RestaurantMenu,
  RestaurantMap,
  RestaurantReviews,
} from "@/features/restaurants/components";
import { useRestaurant, useRestaurantMenu } from "@/features/restaurants/hooks";

export const Restaurant = () => {
  const { id } = useParams();

  const { data: restaurant } = useRestaurant(Number(id));
  const { data: menu } = useRestaurantMenu(Number(id));

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="text-5xl mb-3">🍽️</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Restaurante no encontrado
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          El restaurante que buscas no existe o ha sido eliminado
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex-col">
      <div className="flex mb-8">
        <div className="bg-white hidden md:block shadow-xs rounded-br-xl overflow-clip w-72 sticky top-14 h-fit">
          <RestaurantDetail restaurant={restaurant} />
          <RestaurantContact restaurant={restaurant} />
          <RestaurantSchedule restaurant={restaurant} />
        </div>
        <div className="flex flex-col flex-1 gap-4 mx-8 mt-4">
          <RestaurantMenu
            menu={(menu && [...menu, ...menu, ...menu, ...menu]) || []}
            category="Comida criolla"
          />
          <RestaurantMenu
            menu={(menu && [...menu, ...menu, ...menu, ...menu]) || []}
            category="Ceviche"
          />
          <RestaurantMenu
            menu={(menu && [...menu, ...menu, ...menu, ...menu]) || []}
            category="Bebidas"
          />
          <RestaurantMenu
            menu={(menu && [...menu, ...menu, ...menu, ...menu]) || []}
            category="Hamburguesas"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row gap-8 mx-8 mb-8">
        <div className="flex-1">
          <RestaurantReviews restaurant={restaurant} />
        </div>
        <div className="w-full md:w-4/7">
          <RestaurantMap restaurant={restaurant} />
        </div>
      </div>
    </div>
  );
};
