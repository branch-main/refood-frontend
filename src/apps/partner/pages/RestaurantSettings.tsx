import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { restaurantService } from "@/shared/services";
import { Button, Input, Modal } from "@/shared/components/ui";
import { RestaurantFormModal } from "../features/restaurants/components/RestaurantFormModal";
import { DayOfWeek } from "@/shared/types";
import {
  FiEdit2,
  FiUpload,
  FiClock,
  FiInfo,
  FiArrowLeft,
} from "react-icons/fi";
import { HiChevronRight } from "react-icons/hi2";
import { motion } from "framer-motion";

// Convert UTC time string (HH:mm) to local time string
const utcToLocal = (utcTime: string): string => {
  const [hours, minutes] = utcTime.split(":").map(Number);
  const now = new Date();
  const utcDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes),
  );
  return utcDate.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

// Convert local time string (HH:mm) to UTC time string
const localToUtc = (localTime: string): string => {
  const [hours, minutes] = localTime.split(":").map(Number);
  const now = new Date();
  const localDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
  );
  const utcHours = localDate.getUTCHours().toString().padStart(2, "0");
  const utcMinutes = localDate.getUTCMinutes().toString().padStart(2, "0");
  return `${utcHours}:${utcMinutes}`;
};

const daysOfWeek = [
  { value: DayOfWeek.MONDAY, label: "Lunes" },
  { value: DayOfWeek.TUESDAY, label: "Martes" },
  { value: DayOfWeek.WEDNESDAY, label: "Miércoles" },
  { value: DayOfWeek.THURSDAY, label: "Jueves" },
  { value: DayOfWeek.FRIDAY, label: "Viernes" },
  { value: DayOfWeek.SATURDAY, label: "Sábado" },
  { value: DayOfWeek.SUNDAY, label: "Domingo" },
];

// Get current day of week (0=Sunday, 1=Monday, ..., 6=Saturday in JS)
// Map to our DayOfWeek enum (0=Monday, ..., 6=Sunday)
const getCurrentDayValue = () => {
  const jsDay = new Date().getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  // Convert to our enum: Mon=0, Tue=1, ..., Sun=6
  return jsDay === 0 ? 6 : jsDay - 1;
};

export const RestaurantSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingDay, setEditingDay] = useState<{
    day: number;
    dayLabel: string;
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
        localToUtc(openingTime),
        localToUtc(closingTime),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant", id] });
      setEditingDay(null);
    },
  });

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "banner",
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] text-center">
        <p className="text-gray-500">Restaurante no encontrado.</p>
      </div>
    );
  }

  return (
    <>
      {/* Header with breadcrumb */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/partner/restaurants")}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
          <span className="text-2xl leading-none text-gray-500">
            {restaurant.name}
          </span>
          <HiChevronRight className="w-5 h-5 text-gray-400" />
          <h1 className="text-2xl leading-none font-bold text-gray-800">
            Configuración
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images */}
        <div className="lg:col-span-1">
          {/* Combined Images Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl overflow-hidden shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]"
          >
            {/* Banner with Logo overlay */}
            <div className="relative">
              {/* Banner */}
              <div className="relative group">
                <img
                  src={
                    restaurant.banner
                      ? `${restaurant.banner}?t=${Date.now()}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(restaurant.name)}&background=B21F1F&color=fff&size=400`
                  }
                  alt="Banner"
                  className="w-full aspect-[16/9] object-cover"
                />
                <label
                  htmlFor="banner-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <div className="flex flex-col items-center text-white">
                    <FiUpload className="w-6 h-6 mb-1" />
                    <span className="text-sm font-medium">Cambiar banner</span>
                  </div>
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

              {/* Logo - positioned at bottom center, overlapping banner */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <div className="relative group">
                  <img
                    src={
                      restaurant.logo
                        ? `${restaurant.logo}?t=${Date.now()}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(restaurant.name)}&background=B21F1F&color=fff&size=200`
                    }
                    alt="Logo"
                    className="w-20 h-20 object-cover rounded-full border-2 border-gray-200 shadow-lg"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
                  >
                    <FiUpload className="w-5 h-5 text-white" />
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
            </div>

            {/* Labels below */}
            <div className="pt-14 pb-5 px-6">
              <div className="flex justify-center gap-8 text-center">
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Logo
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Cuadrado, 200x200px
                  </p>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Banner
                  </p>
                  <p className="text-sm text-gray-600 mt-1">16:9, 1200x675px</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Info & Hours */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FiInfo className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Información Básica
                </h2>
              </div>
              <button
                onClick={() => setIsEditFormOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <FiEdit2 className="w-4 h-4" />
                Editar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Nombre
                </p>
                <p className="text-base text-gray-900">{restaurant.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </p>
                <p className="text-base text-gray-900">{restaurant.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Teléfono
                </p>
                <p className="text-base text-gray-900">{restaurant.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tiempo de Preparación
                </p>
                <p className="text-base text-gray-900">
                  {restaurant.minPreparationTime} -{" "}
                  {restaurant.maxPreparationTime} min
                </p>
              </div>
              <div className="md:col-span-2 space-y-1">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Descripción
                </p>
                <p className="text-base text-gray-900">
                  {restaurant.description || "Sin descripción"}
                </p>
              </div>
              <div className="md:col-span-2 space-y-1">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Dirección
                </p>
                <p className="text-base text-gray-900">{restaurant.address}</p>
              </div>
            </div>
          </motion.div>

          {/* Opening Hours Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]"
          >
            <div className="flex items-center gap-2 mb-6">
              <FiClock className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                Horario de Atención
              </h2>
            </div>

            <div className="space-y-2">
              {daysOfWeek.map((day) => {
                const hours = getOpeningHoursForDay(day.value);
                const isOpen = !!hours;
                const isToday = day.value === getCurrentDayValue();

                return (
                  <div
                    key={day.value}
                    onClick={() =>
                      setEditingDay({
                        day: day.value,
                        dayLabel: day.label,
                        openingTime: hours
                          ? utcToLocal(hours.openingTime)
                          : "09:00",
                        closingTime: hours
                          ? utcToLocal(hours.closingTime)
                          : "22:00",
                      })
                    }
                    className={`flex items-center p-4 rounded-xl transition-all cursor-pointer ${
                      isToday
                        ? "bg-red-50 border border-red-200 hover:bg-red-100"
                        : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                    }`}
                  >
                    <div className="w-32">
                      <span
                        className={`font-medium ${isToday ? "text-red-700" : "text-gray-700"}`}
                      >
                        {day.label}
                      </span>
                    </div>

                    <div className="flex-1 ml-4">
                      {hours ? (
                        <span className="text-gray-700 font-medium">
                          {utcToLocal(hours.openingTime)} —{" "}
                          {utcToLocal(hours.closingTime)}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Cerrado</span>
                      )}
                    </div>
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-white rounded-lg transition-colors">
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Opening Hours Edit Modal */}
      <Modal
        isOpen={!!editingDay}
        onClose={() => setEditingDay(null)}
        animation="scale"
      >
        <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
          {/* Modal Header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-xl">
                <FiClock className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Editar Horario
                </h3>
                <p className="text-sm text-gray-500">{editingDay?.dayLabel}</p>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora de Apertura
                </label>
                <input
                  type="time"
                  value={editingDay?.openingTime || "09:00"}
                  onChange={(e) =>
                    setEditingDay((prev) =>
                      prev ? { ...prev, openingTime: e.target.value } : null,
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora de Cierre
                </label>
                <input
                  type="time"
                  value={editingDay?.closingTime || "22:00"}
                  onChange={(e) =>
                    setEditingDay((prev) =>
                      prev ? { ...prev, closingTime: e.target.value } : null,
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 text-center">
                El restaurante estará abierto de{" "}
                <span className="font-semibold text-gray-900">
                  {editingDay?.openingTime}
                </span>{" "}
                a{" "}
                <span className="font-semibold text-gray-900">
                  {editingDay?.closingTime}
                </span>
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
            <button
              onClick={() => setEditingDay(null)}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveHours}
              disabled={updateHoursMutation.isPending}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {updateHoursMutation.isPending ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </Modal>

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
