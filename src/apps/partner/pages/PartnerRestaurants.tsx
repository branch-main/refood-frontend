import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { RestaurantFormModal } from "../features/restaurants/components/RestaurantFormModal";
import { Button } from "@/shared/components/ui";
import { restaurantService } from "@/shared/services";
import { Restaurant } from "@/shared/types";
import { FiEdit2, FiTrash2, FiPlus, FiSettings } from "react-icons/fi";
import { formatPrice, formatRating } from "@/shared/utils";
import { BsFillStarFill } from "react-icons/bs";

export const PartnerRestaurants = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(
    null
  );

  const { data: restaurants, isLoading } = useQuery({
    queryKey: ["my-restaurants"],
    queryFn: () => restaurantService.getMyRestaurants(),
  });

  const createMutation = useMutation({
    mutationFn: restaurantService.createRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-restaurants"] });
      setIsFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      restaurantService.updateRestaurant(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-restaurants"] });
      setIsFormOpen(false);
      setEditingRestaurant(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: restaurantService.deleteRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-restaurants"] });
    },
  });

  const handleCreate = () => {
    setEditingRestaurant(null);
    setIsFormOpen(true);
  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setIsFormOpen(true);
  };

  const handleDelete = async (restaurant: Restaurant) => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar "${restaurant.name}"? Esta acción no se puede deshacer.`
      )
    ) {
      await deleteMutation.mutateAsync(restaurant.id);
    }
  };

  const handleSubmit = async (data: any) => {
    if (editingRestaurant) {
      await updateMutation.mutateAsync({ id: editingRestaurant.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingRestaurant(null);
  };

  if (isLoading) {
    return (
      <>
        <h1 className="text-2xl font-medium text-black mb-7">
          Mis Restaurantes
        </h1>
        <div className="bg-white rounded-4xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.02)] card">
          <p className="text-gray-500">Cargando...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-2xl font-medium text-black">Mis Restaurantes</h1>
        <Button
          variant="primary"
          onClick={handleCreate}
          className="flex items-center gap-2"
        >
          <FiPlus className="w-5 h-5" />
          Crear Restaurante
        </Button>
      </div>

      <div className="bg-white rounded-4xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.02)] card">
        {restaurants && restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    alt={restaurant.name}
                    src={
                      restaurant.banner ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(restaurant.name)}&background=B21F1F&color=fff&size=400`
                    }
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/partner/restaurants/${restaurant.id}/settings`)
                      }
                      className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                      title="Configuración"
                    >
                      <FiSettings className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleEdit(restaurant)}
                      className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                      title="Editar"
                    >
                      <FiEdit2 className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleDelete(restaurant)}
                      className="p-2 bg-white rounded-lg shadow-md hover:bg-red-50 transition-colors"
                      title="Eliminar"
                      disabled={deleteMutation.isPending}
                    >
                      <FiTrash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 line-clamp-1">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center rounded-lg gap-1 px-2 py-1 bg-amber-100">
                        <BsFillStarFill className="fill-amber-500 w-3 h-3" />
                        <span className="text-xs text-gray-800">
                          {formatRating(restaurant.stats.rating)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {restaurant.description}
                    </p>
                  </div>

                  <div className="h-px w-full bg-gray-200" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Ventas</span>
                      <span className="font-medium text-gray-800">
                        {formatPrice(restaurant.stats.totalSales)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pedidos</span>
                      <span className="font-medium text-gray-800">
                        {restaurant.stats.totalOrders}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Estado</span>
                      <span
                        className={`font-medium ${restaurant.isActive ? "text-green-600" : "text-red-600"}`}
                      >
                        {restaurant.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No tienes restaurantes registrados.
            </p>
            <Button variant="primary" onClick={handleCreate}>
              Crear tu primer restaurante
            </Button>
          </div>
        )}
      </div>

      <RestaurantFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        restaurant={editingRestaurant}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </>
  );
};

