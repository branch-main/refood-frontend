import { useParams } from "react-router-dom";
import { useAsync } from "../hooks";
import { PageSkeleton } from "../components/common/PageSkeleton";
import { RestaurantDetail } from "../components/restaurants/RestaurantDetail";
import { ContactInfoCard } from "../components/restaurants/ContactInfoCard";
import { OpeningHoursCard } from "../components/restaurants/OpeningHoursCard";
import { MenuItemsSection } from "../components/restaurants/MenuItemsSection";
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

  const { loading, value: restaurant } = useAsync(async () => {
    return getRestaurant.execute(Number(id));
  }, [id]);

  const { value: menuItems } = useAsync(async () => {
    return getRestaurantMenu.execute(Number(id));
  }, [id]);

  if (loading) return <PageSkeleton />;

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
      <div className="hidden lg:flex lg:flex-col lg:w-72 bg-white border-r border-gray-200 gap-6 overflow-y-auto">
        <RestaurantDetail restaurant={restaurant} />
        <ContactInfoCard restaurant={restaurant} />
        <OpeningHoursCard openingHours={restaurant.openingHours} />
      </div>

      <div className="flex-1">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <MenuItemsSection menuItems={menuItems} />
        </div>
      </div>
    </div>
  );
};
