import { MenuItem } from "@/features/menu/components";
import { useRestaurantMenu } from "@/features/menu/hooks";
import { Skeleton } from "@/shared/components/ui";

export const RestaurantMenu = ({
  restaurantId,
  category,
}: {
  restaurantId: number;
  category: string;
}) => {
  const { isLoading, data: menu } = useRestaurantMenu(restaurantId);

  if (isLoading) {
    return <RestaurantMenu.Skeleton />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{category}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {menu?.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

RestaurantMenu.Skeleton = () => (
  <div>
    <Skeleton className="w-48 h-8 mb-4 rounded-md" />
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      <Skeleton count={4} className="w-full h-32 rounded-md" />
    </div>
  </div>
);
