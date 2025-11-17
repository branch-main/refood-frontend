import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "../components/common";
import { FiArrowLeft } from "react-icons/fi";
import { useAsync } from "../hooks";
import { ItemImage } from "../components/menu/ItemImage";
import { ItemHeader } from "../components/menu/ItemHeader";
import { ItemInfo } from "../components/menu/ItemInfo";
import { OrderSection } from "../components/menu/OrderSection";
import { GetMenuItemUseCase } from "../../application/menu/getMenuItem";
import { container } from "../../container";

const getMenuItem = new GetMenuItemUseCase(
  container.resolve("MenuItemRepository"),
);

export const MenuItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, value: item } = useAsync(
    () => getMenuItem.execute(id),
    [id],
  );

  const handleOrder = (quantity: number) => {
    console.log("Ordering:", quantity, "of item:", item?.id);
  };

  const getPlaceholderImage = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(item?.name || "Food")}&size=800&background=B21F1F&color=ffffff&bold=true`;
  };

  if (loading) return <Loading fullScreen />;

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="text-4xl mb-3">🍽️</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Artículo no encontrado
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          El artículo que buscas no existe o ha sido eliminado
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-[#B21F1F] text-sm font-medium hover:underline"
        >
          ← Volver atrás
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm font-medium mb-6 transition-colors"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="text-base" />
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-8">
          <ItemImage
            image={item.image}
            name={item.name}
            getPlaceholderImage={getPlaceholderImage}
          />

          <div className="space-y-6">
            <ItemHeader
              name={item.name}
              restaurantName={item.restaurant_name}
              restaurantId={item.restaurant}
            />

            {item.description && (
              <div className="prose prose-sm max-w-none">
                <p className="text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}

            <ItemInfo
              price={item.price}
              quantity={item.quantity}
              preparationTime={item.preparation_time}
              categoryName={item.category_name}
            />

            <OrderSection item={item} onOrder={handleOrder} />
          </div>
        </div>
      </div>
    </div>
  );
};
