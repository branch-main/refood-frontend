import { MenuItem } from "@/features/menu/components";
import { Skeleton } from "@/shared/components/ui";
import { useMenuByRestaurant } from "@/shared/hooks";

export const RestaurantMenu = ({
  restaurantId,
  category,
}: {
  restaurantId: number;
  category: string;
}) => {
  const { isLoading, data: menu } = useMenuByRestaurant(restaurantId);

  if (isLoading) {
    return <RestaurantMenu.Skeleton />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">{category}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
        {menu?.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
        {menu?.map((item) => (
          <MenuItem key={item.id * 10} item={item} />
        ))}
        {menu?.map((item) => (
          <MenuItem key={item.id * 100} item={item} />
        ))}
      </div>
    </div>
  );
};

RestaurantMenu.Skeleton = () => (
  <div>
    <Skeleton className="w-48 h-8 mb-4 rounded-md" />
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <MenuItem.Skeleton key={i} />
      ))}
    </div>
  </div>
);
