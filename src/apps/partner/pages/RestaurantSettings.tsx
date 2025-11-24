import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { restaurantService } from "@/shared/services";
import { Button, Input } from "@/shared/components/ui";
import { RestaurantFormModal } from "../features/restaurants/components/RestaurantFormModal";
import { DayOfWeek } from "@/shared/types";
import { FiEdit2, FiUpload } from "react-icons/fi";

const daysOfWeek = [
  { value: DayOfWeek.MONDAY, label: "Lunes" },
  { value: DayOfWeek.TUESDAY, label: "Martes" },
  { value: DayOfWeek.WEDNESDAY, label: "Miércoles" },
  { value: DayOfWeek.THURSDAY, label: "Jueves" },
  { value: DayOfWeek.FRIDAY, label: "Viernes" },
  { value: DayOfWeek.SATURDAY, label: "Sábado" },
  { value: DayOfWeek.SUNDAY, label: "Domingo" },
];

export const RestaurantSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingDay, setEditingDay] = useState<{
    day: number;
    openingTime: string;
    closingTime: string;
  } | null>(null);

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => restaurantService.getRestaurant(Number(id)),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: ({ restaurantId, data }: { restaurantId: number; data: any }) =>
      restaurantService.updateRestaurant(restaurantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant", id] });
      queryClient.invalidateQueries({ queryKey: ["my-restaurants"] });
    },
  });

  const updateHoursMutation = useMutation({
    mutationFn: ({
      day,
      openingTime,
      closingTime,
    }: {
      day: number;
      openingTime: string;
      closingTime: string;
    }) =>
      restaurantService.updateOpeningHours(
        Number(id),
        day,
        openingTime,
        closingTime
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant", id] });
      setEditingDay(null);
    },
  });

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "banner"
  ) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    await updateMutation.mutateAsync({
      restaurantId: Number(id),
      data: { [type]: file },
    });
  };

  const handleUpdateInfo = async (data: any) => {
    if (!id) return;
    await updateMutation.mutateAsync({ restaurantId: Number(id), data });
    setIsEditFormOpen(false);
  };

  const handleSaveHours = async () => {
    if (!editingDay) return;
    await updateHoursMutation.mutateAsync(editingDay);
  };

  const getOpeningHoursForDay = (day: number) => {
    return restaurant?.openingHours.find((h) => h.day === day);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-4xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.02)]">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="bg-white rounded-4xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.02)]">
        <p className="text-gray-500">Restaurante no encontrado.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <div>
          <h1 className="text-2xl font-medium text-black">
            Configuración del Restaurante
          </h1>
          <p className="text-gray-500 mt-1">{restaurant.name}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/partner/restaurants")}
        >
          Volver
        </Button>
      </div>

      <div className="space-y-6">
        {/* Images Section */}
        <div className="bg-white rounded-4xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.02)]">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Imágenes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo
              </label>
              <div className="relative">
                <img
                  src={
                    restaurant.logo ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(restaurant.name)}&background=B21F1F&color=fff&size=200`
                  }
                  alt="Logo"
                  className="w-full aspect-square object-cover rounded-xl border border-gray-200"
                />
                <label
                  htmlFor="logo-upload"
                  className="absolute bottom-3 right-3 p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <FiUpload className="w-5 h-5 text-gray-700" />
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "logo")}
                    className="hidden"
                    disabled={updateMutation.isPending}
                  />
                </label>
              </div>
            </div>

            {/* Banner */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner
              </label>
              <div className="relative">
                <img
                  src={
                    restaurant.banner ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(restaurant.name)}&background=B21F1F&color=fff&size=400`
                  }
                  alt="Banner"
                  className="w-full aspect-video object-cover rounded-xl border border-gray-200"
                />
                <label
                  htmlFor="banner-upload"
                  className="absolute bottom-3 right-3 p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <FiUpload className="w-5 h-5 text-gray-700" />
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "banner")}
                    className="hidden"
                    disabled={updateMutation.isPending}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Info Section */}
        <div className="bg-white rounded-4xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Información Básica
            </h2>
            <Button
              variant="outline"
              onClick={() => setIsEditFormOpen(true)}
              className="flex items-center gap-2"
            >
              <FiEdit2 className="w-4 h-4" />
              Editar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="text-base font-medium text-gray-900">
                {restaurant.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-base font-medium text-gray-900">
                {restaurant.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="text-base font-medium text-gray-900">
                {restaurant.phone}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tiempo de Preparación</p>
              <p className="text-base font-medium text-gray-900">
                {restaurant.minPreparationTime} - {restaurant.maxPreparationTime}{" "}
                minutos
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Descripción</p>
              <p className="text-base font-medium text-gray-900">
                {restaurant.description || "Sin descripción"}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Dirección</p>
              <p className="text-base font-medium text-gray-900">
                {restaurant.address}
              </p>
            </div>
          </div>
        </div>

        {/* Opening Hours Section */}
        <div className="bg-white rounded-4xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.02)]">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Horario de Atención
          </h2>

          <div className="space-y-3">
            {daysOfWeek.map((day) => {
              const hours = getOpeningHoursForDay(day.value);
              const isEditing = editingDay?.day === day.value;

              return (
                <div
                  key={day.value}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-700 w-28">
                    {day.label}
                  </span>

                  {isEditing ? (
                    <div className="flex items-center gap-3 flex-1">
                      <Input
                        type="time"
                        value={editingDay.openingTime}
                        onChange={(e) =>
                          setEditingDay({
                            ...editingDay,
                            openingTime: e.target.value,
                          })
                        }
                        className="w-32"
                      />
                      <span className="text-gray-500">-</span>
                      <Input
                        type="time"
                        value={editingDay.closingTime}
                        onChange={(e) =>
                          setEditingDay({
                            ...editingDay,
                            closingTime: e.target.value,
                          })
                        }
                        className="w-32"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleSaveHours}
                        disabled={updateHoursMutation.isPending}
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingDay(null)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span className="text-gray-600 flex-1">
                        {hours
                          ? `${hours.openingTime} - ${hours.closingTime}`
                          : "Cerrado"}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setEditingDay({
                            day: day.value,
                            openingTime: hours?.openingTime || "09:00",
                            closingTime: hours?.closingTime || "22:00",
                          })
                        }
                        className="flex items-center gap-2"
                      >
                        <FiEdit2 className="w-4 h-4" />
                        Editar
                      </Button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <RestaurantFormModal
        isOpen={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        onSubmit={handleUpdateInfo}
        restaurant={restaurant}
        isLoading={updateMutation.isPending}
      />
    </>
  );
};
