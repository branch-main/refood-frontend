import { useParams } from "react-router-dom";
import { useAsync } from "../hooks";
import { RestaurantDetail } from "../components/restaurants/RestaurantDetail";
import { RestaurantConcat } from "../components/restaurants/RestaurantContact";
import { RestaurantSchedule } from "../components/restaurants/RestaurantSchedule";
import { RestaurantMenu } from "../components/restaurants/RestaurantMenu";
import { GetRestaurantUseCase } from "../../application/restaurants/getRestaurant";
import { GetRestaurantMenuUseCase } from "../../application/menu/getRestaurantMenu";
import { container } from "../../container";
import { RestaurantRepository } from "../../domain/repositories/RestaurantRepository";
import { MenuItemRepository } from "../../domain/repositories/MenuItemRepository";

const getRestaurant = new GetRestaurantUseCase(
  container.resolve<RestaurantRepository>("RestaurantRepository"),
);
const getRestaurantMenu = new GetRestaurantMenuUseCase(
  container.resolve<MenuItemRepository>("MenuItemRepository"),
);

export const Restaurant = () => {
  const { id } = useParams();

  const { value: restaurant } = useAsync(async () => {
    return getRestaurant.execute(Number(id));
  }, [id]);

  const { value: menu } = useAsync(async () => {
    return getRestaurantMenu.execute(Number(id));
  }, [id]);

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
    <div className="min-h-screen bg-neutral-50 flex">
      <div className="hidden md:block w-72 bg-white border-r border-gray-200 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto z-10">
        <RestaurantDetail restaurant={restaurant} />
        <RestaurantConcat restaurant={restaurant} />
        <RestaurantSchedule restaurant={restaurant} />
      </div>
      <div className="flex flex-col flex-1 gap-4 mx-8 my-4">
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
  );
};
