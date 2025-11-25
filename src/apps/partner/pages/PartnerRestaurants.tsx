import { useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { RestaurantFormModal } from "../features/restaurants/components/RestaurantFormModal";
import { ConfirmModal } from "../components/ConfirmModal";
import { restaurantService, orderService } from "@/shared/services";
import { Restaurant } from "@/shared/types";
import { FiEdit2, FiTrash2, FiPlus, FiSettings } from "react-icons/fi";
import { formatPrice, formatRating } from "@/shared/utils";
import { BsFillStarFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: { opacity: 0, y: -20 },
};

const RestaurantCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm animate-pulse">
    <div className="relative">
      <div className="w-full aspect-[16/9] bg-gray-200" />
      <div className="absolute top-3 left-3 w-14 h-6 bg-gray-300 rounded-full" />
      <div className="absolute bottom-3 left-3 w-12 h-12 bg-gray-300 rounded-full" />
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-32 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-48" />
        </div>
        <div className="w-14 h-7 bg-gray-200 rounded-lg" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-2.5 bg-gray-50 rounded-xl col-span-2">
          <div className="h-5 bg-gray-200 rounded w-20 mx-auto mb-1" />
          <div className="h-3 bg-gray-200 rounded w-10 mx-auto" />
        </div>
        <div className="text-center p-2.5 bg-gray-50 rounded-xl">
          <div className="h-5 bg-gray-200 rounded w-8 mx-auto mb-1" />
          <div className="h-3 bg-gray-200 rounded w-12 mx-auto" />
        </div>
      </div>
    </div>
  </div>
);

export const PartnerRestaurants = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(
    null
  );
  const [deleteRestaurant, setDeleteRestaurant] = useState<Restaurant | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { data: restaurants, isLoading } = useQuery({
    queryKey: ["my-restaurants"],
    queryFn: () => restaurantService.getMyRestaurants(),
  });

  // Fetch restaurant stats from orders API
  const restaurantIds = useMemo(() => restaurants?.map(r => r.id) || [], [restaurants]);
  
  const { data: restaurantStats } = useQuery({
    queryKey: ["restaurant-stats", restaurantIds],
    queryFn: () => orderService.getRestaurantStats(restaurantIds),
    enabled: restaurantIds.length > 0,
  });

  // Create a map for easy lookup
  const statsMap = useMemo(() => {
    if (!restaurantStats) return new Map<number, { totalSales: number; totalOrders: number }>();
    return new Map(restaurantStats.map(s => [s.restaurantId, { totalSales: s.totalSales, totalOrders: s.totalOrders }]));
  }, [restaurantStats]);

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
    setDeleteRestaurant(restaurant);
  };

  const confirmDelete = async () => {
    if (deleteRestaurant) {
      await deleteMutation.mutateAsync(deleteRestaurant.id);
      setDeleteRestaurant(null);
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
        <div className="flex justify-between items-center mb-7">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-xl w-44 animate-pulse" />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <RestaurantCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <motion.div 
        className="flex justify-between items-center mb-7"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl leading-none font-bold text-gray-800">Mis Restaurantes</h1>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium text-sm shadow-sm shadow-red-500/25 hover:bg-red-600 hover:shadow-md hover:shadow-red-500/30 active:scale-[0.98] transition-all"
        >
          <FiPlus className="w-4 h-4" />
          Nuevo Restaurante
        </button>
      </motion.div>

      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {restaurants && restaurants.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
          <AnimatePresence mode="popLayout">
            {[...restaurants].sort((a, b) => a.name.localeCompare(b.name)).map((restaurant) => {
              const stats = statsMap.get(restaurant.id);
              const rating = restaurant.stats?.rating ?? 0;
              const totalSales = stats?.totalSales ?? 0;
              const totalOrders = stats?.totalOrders ?? 0;
              
              return (
                <motion.div
                  key={restaurant.id}
                  className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-shadow duration-300 group"
                  onMouseEnter={() => setHoveredId(restaurant.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <div className="relative">
                    <img
                      alt={restaurant.name}
                      src={
                        restaurant.banner
                          ? `${restaurant.banner}?t=${restaurant.updatedAt ? new Date(restaurant.updatedAt).getTime() : Date.now()}`
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(restaurant.name)}&background=B21F1F&color=fff&size=400`
                      }
                      className="w-full aspect-[16/9] object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    {/* Hover overlay */}
                    <div 
                      className={`absolute inset-0 bg-black/25 transition-opacity duration-200 ${
                        hoveredId === restaurant.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    {/* Logo */}
                    {restaurant.logo && (
                      <div className="absolute bottom-3 left-3">
                        <img
                          src={`${restaurant.logo}?t=${restaurant.updatedAt ? new Date(restaurant.updatedAt).getTime() : Date.now()}`}
                          alt={`${restaurant.name} logo`}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 shadow-lg bg-white"
                        />
                      </div>
                    )}
                    {/* Status badge */}
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${
                      restaurant.isActive 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {restaurant.isActive ? 'Activo' : 'Inactivo'}
                    </div>
                    {/* Action buttons */}
                    <motion.div 
                      className="absolute top-3 right-3 flex gap-1.5"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ 
                        opacity: hoveredId === restaurant.id ? 1 : 0,
                        y: hoveredId === restaurant.id ? 0 : -10
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() =>
                          navigate(`/partner/restaurants/${restaurant.id}/settings`)
                        }
                        className="p-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
                        title="Configuración"
                      >
                        <FiSettings className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleEdit(restaurant)}
                        className="p-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
                        title="Editar"
                      >
                        <FiEdit2 className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleDelete(restaurant)}
                        className="p-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg hover:bg-red-50 transition-colors"
                        title="Eliminar"
                        disabled={deleteMutation.isPending}
                      >
                        <FiTrash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </motion.div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-800 truncate text-lg">
                          {restaurant.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">
                          {restaurant.description || 'Sin descripción'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg shrink-0">
                        <BsFillStarFill className="fill-amber-500 w-3.5 h-3.5" />
                        <span className="text-sm font-medium text-amber-700">
                          {formatRating(rating)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2.5 bg-gray-50 rounded-xl col-span-2">
                        <div className="text-lg font-bold text-gray-800">
                          {formatPrice(totalSales)}
                        </div>
                        <div className="text-xs text-gray-500">Ventas</div>
                      </div>
                      <div className="text-center p-2.5 bg-gray-50 rounded-xl">
                        <div className="text-lg font-bold text-gray-800">
                          {totalOrders}
                        </div>
                        <div className="text-xs text-gray-500">Pedidos</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-2xl flex items-center justify-center">
              <FiPlus className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Sin restaurantes</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Comienza creando tu primer restaurante para empezar a vender.
            </p>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium text-sm shadow-sm shadow-red-500/25 hover:bg-red-600 hover:shadow-md hover:shadow-red-500/30 active:scale-[0.98] transition-all"
            >
              <FiPlus className="w-4 h-4" />
              Crear primer restaurante
            </button>
          </motion.div>
        )}
      </motion.div>

      <RestaurantFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        restaurant={editingRestaurant}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmModal
        isOpen={!!deleteRestaurant}
        onClose={() => setDeleteRestaurant(null)}
        onConfirm={confirmDelete}
        title="Eliminar Restaurante"
        message={`¿Estás seguro de que deseas eliminar "${deleteRestaurant?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};

