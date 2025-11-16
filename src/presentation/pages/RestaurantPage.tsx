import { useParams } from "react-router-dom";
import { ApiRestaurantRepository } from "../../infrastructure/repositories/ApiRestaurantRepository";
import { GetRestaurantUseCase } from "../../application/restaurants/getRestaurant";
import { apiClient } from "../../infrastructure/api/axios.config";
import { useAsync } from "../hooks";
import { useIsOpen } from "../hooks/useIsOpen";

const restaurantRepository = new ApiRestaurantRepository(apiClient);
const getRestaurant = new GetRestaurantUseCase(restaurantRepository);

export const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, value: restaurant } = useAsync(
    () => getRestaurant.execute(Number(id)),
    [id],
  );

  const isOpen = useIsOpen(restaurant?.openingHours);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && restaurant && (
        <div>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
          <p>Address: {restaurant.address}</p>
          <p>Status: {isOpen ? "Open" : "Closed"}</p>
        </div>
      )}
      {!loading && !restaurant && <div>Restaurant not found.</div>}
    </div>
  );
};
