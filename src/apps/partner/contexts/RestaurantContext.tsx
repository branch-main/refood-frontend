import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { restaurantService } from "@/shared/services";
import { Restaurant } from "@/shared/types";

interface RestaurantContextType {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  selectedRestaurantId: number | null;
  setSelectedRestaurantId: (id: number | null) => void;
  isLoading: boolean;
}

const RestaurantContext = createContext<RestaurantContextType | null>(null);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(() => {
    const saved = localStorage.getItem("partner_selected_restaurant");
    return saved ? parseInt(saved, 10) : null;
  });

  const { data: restaurants = [], isLoading } = useQuery({
    queryKey: ["my-restaurants"],
    queryFn: () => restaurantService.getMyRestaurants(),
  });

  // Auto-select first restaurant if none selected
  useEffect(() => {
    if (restaurants.length > 0 && !selectedRestaurantId) {
      setSelectedRestaurantId(restaurants[0].id);
    }
  }, [restaurants, selectedRestaurantId]);

  // Persist selection
  useEffect(() => {
    if (selectedRestaurantId) {
      localStorage.setItem("partner_selected_restaurant", selectedRestaurantId.toString());
    }
  }, [selectedRestaurantId]);

  const selectedRestaurant = restaurants.find((r) => r.id === selectedRestaurantId) || null;

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        selectedRestaurant,
        selectedRestaurantId,
        setSelectedRestaurantId,
        isLoading,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurantContext must be used within RestaurantProvider");
  }
  return context;
};
