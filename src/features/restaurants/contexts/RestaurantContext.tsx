import { createContext, useContext, useState, ReactNode } from "react";
import { Restaurant } from "@/shared/types";

interface RestaurantContextType {
  currentRestaurant: Restaurant | null;
  setCurrentRestaurant: (restaurant: Restaurant | null) => void;
  menuSearchQuery: string;
  setMenuSearchQuery: (query: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(
  undefined,
);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(
    null,
  );
  const [menuSearchQuery, setMenuSearchQuery] = useState("");

  return (
    <RestaurantContext.Provider
      value={{ currentRestaurant, setCurrentRestaurant, menuSearchQuery, setMenuSearchQuery }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  return context;
};
