import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "@/shared/components/ui";
import { FiArrowLeft } from "react-icons/fi";
import { ItemHeader, ItemInfo, OrderSection } from "@/features/menu/components";
import { useMenuItem } from "@/features/menu/hooks";
import { getFallbackImage } from "@/shared/utils";

export const MenuItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data: menuItem } = useMenuItem(Number(id));

  const handleOrder = (quantity: number) => {
    console.log("Ordering:", quantity, "of item:", menuItem?.id);
  };

  if (isLoading) return <Loading fullScreen />;

  if (!menuItem) {
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
          <img
            src={getFallbackImage(menuItem.name, menuItem.image)}
            alt={menuItem.name}
            className="w-full h-80 object-cover rounded-2xl shadow-md"
          />

          <div className="space-y-6">
            <ItemHeader
              name={menuItem.name}
              restaurantName={"NOMBRE RESTAURANTE"}
              restaurantId={999}
            />

            {menuItem.description && (
              <div className="prose prose-sm max-w-none">
                <p className="text-base text-gray-600 leading-relaxed">
                  {menuItem.description}
                </p>
              </div>
            )}

            <ItemInfo
              price={menuItem.price}
              quantity={999}
              preparationTime={999}
              categoryName={"NOMBRE CATEGORÍA"}
            />

            <OrderSection item={menuItem} onOrder={handleOrder} />
          </div>
        </div>
      </div>
    </div>
  );
};
