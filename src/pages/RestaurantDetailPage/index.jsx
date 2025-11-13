import { useState } from "react";
import { useParams } from "react-router-dom";
import { menuService, restaurantService } from "../../services";
import { Loading } from "../../components/common";
import { useAsync } from "../../hooks";
import { RestaurantHeroBanner } from "./RestaurantHeroBanner";
import { ContactInfoCard } from "./ContactInfoCard";
import { OpeningHoursCard } from "./OpeningHoursCard";
import { MenuItemsSection } from "./MenuItemsSection";

export const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const { loading, value: restaurant } = useAsync(async () => {
    return restaurantService.getRestaurant(id);
  }, [id]);

  const { value: menuItems } = useAsync(async () => {
    return menuService.getRestaurantMenu(id);
  }, [id]);

  const handleToggleFavorite = async () => {
    setIsFavorite((prev) => !prev);
  };

  const getPlaceholderImage = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(restaurant?.name || "Restaurant")}&size=800&background=B21F1F&color=ffffff&bold=true`;
  };

  const isOpenNow = () => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    const todayHours = restaurant.opening_hours.find(
      (h) => h.day === currentDay,
    );
    if (!todayHours) return false;

    const openTime = todayHours.opening_time.substring(0, 5);
    const closeTime = todayHours.closing_time.substring(0, 5);

    return currentTime >= openTime && currentTime <= closeTime;
  };

  if (loading) return <Loading fullScreen />;

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

  const openStatus = isOpenNow();

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantHeroBanner
        restaurant={restaurant}
        openStatus={openStatus}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        getPlaceholderImage={getPlaceholderImage}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ContactInfoCard restaurant={restaurant} />
          <OpeningHoursCard openingHours={restaurant.opening_hours} />
        </div>
        <MenuItemsSection menuItems={menuItems} />
      </div>
    </div>
  );
};
