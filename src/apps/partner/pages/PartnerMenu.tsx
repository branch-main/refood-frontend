import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui";
import { menuService, restaurantService } from "@/shared/services";
import { MenuItem } from "@/shared/types";
import { MenuItemFormModal } from "../features/menu/components/MenuItemFormModal";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { formatPrice } from "@/shared/utils";

export const PartnerMenu = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(
    null
  );
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">(
    "all"
  );

  // Get owner's restaurants
  const { data: restaurants } = useQuery({
    queryKey: ["my-restaurants"],
    queryFn: () => restaurantService.getMyRestaurants(),
  });

  // Get menu items for selected restaurant
  const { data: menuItems, isLoading } = useQuery({
    queryKey: ["menu-items", selectedRestaurant],
    queryFn: () =>
      selectedRestaurant
        ? menuService.getMenuByRestaurant(selectedRestaurant)
        : Promise.resolve([]),
    enabled: !!selectedRestaurant,
  });

  const createMutation = useMutation({
    mutationFn: menuService.createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      setIsFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      menuService.updateMenuItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      setIsFormOpen(false);
      setEditingItem(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: menuService.deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });

  const handleCreate = () => {
    if (!selectedRestaurant) {
      alert("Por favor, selecciona un restaurante primero");
      return;
    }
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = async (item: MenuItem) => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar "${item.name}"? Esta acción no se puede deshacer.`
      )
    ) {
      await deleteMutation.mutateAsync(item.id);
    }
  };

  const handleSubmit = async (data: any) => {
    if (editingItem) {
      await updateMutation.mutateAsync({ id: editingItem.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  // Filter menu items
  const filteredItems =
    menuItems?.filter((item) => {
      if (filterStatus === "active") return item.isAvailable;
      if (filterStatus === "inactive") return !item.isAvailable;
      return true;
    }) || [];

  // Auto-select first restaurant if available
  useEffect(() => {
    if (restaurants && restaurants.length > 0 && !selectedRestaurant) {
      setSelectedRestaurant(restaurants[0].id);
    }
  }, [restaurants, selectedRestaurant]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-black">Mi Menú</h1>
        <Button
          variant="primary"
          onClick={handleCreate}
          className="flex items-center gap-2"
          disabled={!selectedRestaurant}
        >
          <FiPlus className="w-5 h-5" />
          Agregar Producto
        </Button>
      </div>

      {/* Restaurant Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar Restaurante
        </label>
        <select
          value={selectedRestaurant || ""}
          onChange={(e) => setSelectedRestaurant(Number(e.target.value))}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          {restaurants && restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))
          ) : (
            <option value="">Sin restaurantes</option>
          )}
        </select>
      </div>

      {/* Menu Items List */}
      <div className="bg-white rounded-4xl shadow-[0_0_20px_rgba(0,0,0,0.02)] card">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Productos</h2>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as "all" | "active" | "inactive")
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">Todos</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <p className="text-gray-500 text-center py-8">Cargando...</p>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={
                        item.image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=B21F1F&color=fff&size=400`
                      }
                      alt={item.name}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                        title="Editar"
                      >
                        <FiEdit2 className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 bg-white rounded-lg shadow-md hover:bg-red-50 transition-colors"
                        title="Eliminar"
                        disabled={deleteMutation.isPending}
                      >
                        <FiTrash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                    {item.discountPrice && (
                      <div className="absolute bottom-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {Math.round(
                          ((item.price - item.discountPrice) / item.price) * 100
                        )}
                        % OFF
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        {item.discountPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-red-600">
                              {formatPrice(item.discountPrice)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-gray-800">
                            {formatPrice(item.price)}
                          </span>
                        )}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.isAvailable
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.isAvailable ? "Disponible" : "No disponible"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                {selectedRestaurant
                  ? "No tienes productos en este restaurante."
                  : "Selecciona un restaurante para ver su menú."}
              </p>
              {selectedRestaurant && (
                <Button variant="primary" onClick={handleCreate}>
                  Agregar tu primer producto
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <MenuItemFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        menuItem={editingItem}
        restaurantId={selectedRestaurant || 0}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};
