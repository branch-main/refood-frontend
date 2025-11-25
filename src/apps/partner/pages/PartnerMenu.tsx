import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Select } from "@/shared/components/ui";
import { menuService } from "@/shared/services";
import { MenuItem, Category } from "@/shared/types";
import { MenuItemFormModal } from "../features/menu/components/MenuItemFormModal";
import { ConfirmModal } from "../components/ConfirmModal";
import { FiEdit2, FiTrash2, FiPlus, FiSettings } from "react-icons/fi";
import { HiChevronRight } from "react-icons/hi2";
import { formatPrice } from "@/shared/utils";
import { useRestaurantContext } from "../contexts";

// Skeleton for menu item cards
const MenuItemSkeleton = () => (
  <div className="rounded-xl overflow-hidden border border-gray-200 bg-white animate-pulse">
    <div className="w-full aspect-square bg-gray-200" />
    <div className="p-3">
      <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
      <div className="h-3 w-full bg-gray-200 rounded mb-2" />
      <div className="flex items-center justify-between mt-2">
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="w-2 h-2 bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
);

export const PartnerMenu = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { selectedRestaurant, selectedRestaurantId } = useRestaurantContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<MenuItem | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [filterCategory, setFilterCategory] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<"name" | "price" | "price-desc">("name");
  const [visibleCount, setVisibleCount] = useState(12);
  const ITEMS_PER_PAGE = 12;

  // Get categories for selected restaurant
  const { data: categories = [] } = useQuery({
    queryKey: ["categories", selectedRestaurantId],
    queryFn: () =>
      selectedRestaurantId
        ? menuService.getCategories(selectedRestaurantId)
        : Promise.resolve([]),
    enabled: !!selectedRestaurantId,
  });

  // Get menu items for selected restaurant
  const { data: menuItems, isLoading } = useQuery({
    queryKey: ["menu-items", selectedRestaurantId],
    queryFn: () =>
      selectedRestaurantId
        ? menuService.getMenuByRestaurant(selectedRestaurantId)
        : Promise.resolve([]),
    enabled: !!selectedRestaurantId,
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
    if (!selectedRestaurantId) {
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
    setDeleteItem(item);
  };

  const confirmDelete = async () => {
    if (deleteItem) {
      await deleteMutation.mutateAsync(deleteItem.id);
      setDeleteItem(null);
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

  // Filter and sort menu items
  const allFilteredItems =
    menuItems
      ?.filter((item) => {
        if (filterStatus === "active" && !item.isAvailable) return false;
        if (filterStatus === "inactive" && item.isAvailable) return false;
        if (filterCategory !== "all" && item.categoryId !== filterCategory) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "price":
            return (a.discountPrice || a.price) - (b.discountPrice || b.price);
          case "price-desc":
            return (b.discountPrice || b.price) - (a.discountPrice || a.price);
          default:
            return 0;
        }
      }) || [];

  // Apply pagination
  const filteredItems = allFilteredItems.slice(0, visibleCount);
  const hasMore = allFilteredItems.length > visibleCount;

  // Reset visible count when filters change
  const handleFilterChange = (type: 'status' | 'category' | 'sort', value: any) => {
    setVisibleCount(ITEMS_PER_PAGE);
    if (type === 'status') setFilterStatus(value);
    if (type === 'category') setFilterCategory(value);
    if (type === 'sort') setSortBy(value);
  };

  // Group items by category for display
  const getCategoryName = (categoryId: number | null) => {
    if (!categoryId) return "Sin categoría";
    const category = categories.find(c => c.id === categoryId);
    return category?.name || "Sin categoría";
  };

  // Get grouped items by category (maintaining category order)
  const groupedItems = categories.reduce((acc, category) => {
    const items = filteredItems.filter(item => item.categoryId === category.id);
    if (items.length > 0) {
      acc.push({ category, items });
    }
    return acc;
  }, [] as { category: Category; items: MenuItem[] }[]);

  // Add items without category
  const uncategorizedItems = filteredItems.filter(item => !item.categoryId);
  if (uncategorizedItems.length > 0) {
    groupedItems.push({ 
      category: { id: 0, restaurantId: selectedRestaurantId || 0, name: "Sin categoría", displayOrder: 999 }, 
      items: uncategorizedItems 
    });
  }

  if (!selectedRestaurant) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] text-center">
        <p className="text-gray-500">
          Selecciona un restaurante en el menú lateral para gestionar el menú.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <div className="flex items-center gap-2">
                    <span className="text-2xl leading-none text-gray-500">
            {selectedRestaurant.name}
          </span>
          <HiChevronRight className="w-5 h-5 text-gray-400" />
          <h1 className="text-2xl leading-none font-bold text-gray-800">
            Menú
          </h1>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium text-sm shadow-sm shadow-red-500/25 hover:bg-red-600 hover:shadow-md hover:shadow-red-500/30 active:scale-[0.98] transition-all"
        >
          <FiPlus className="w-4 h-4" />
          Agregar Producto
        </button>
      </div>

      {/* Menu Items List */}
      <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">Productos</h2>
            <div className="flex items-center gap-3">
              {categories.length > 0 && (
                <Select
                  options={[
                    { value: "all", label: "Todas las categorías" },
                    ...categories.map((c) => ({ value: c.id, label: c.name })),
                  ]}
                  value={filterCategory}
                  onChange={(value) => handleFilterChange('category', value)}
                  className="min-w-[180px]"
                />
              )}
              <Select
                options={[
                  { value: "all", label: "Todos" },
                  { value: "active", label: "Activos" },
                  { value: "inactive", label: "Inactivos" },
                ]}
                value={filterStatus}
                onChange={(value) => handleFilterChange('status', value)}
                className="min-w-[140px]"
              />
              <Select
                options={[
                  { value: "name", label: "Nombre A-Z" },
                  { value: "price", label: "Precio menor" },
                  { value: "price-desc", label: "Precio mayor" },
                ]}
                value={sortBy}
                onChange={(value) => handleFilterChange('sort', value)}
                className="min-w-[140px]"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <MenuItemSkeleton key={i} />
              ))}
            </div>
          ) : groupedItems.length > 0 ? (
            <div className="space-y-8">
              {groupedItems.map(({ category, items: categoryItems }) => (
                <div key={category.id}>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                    {category.name}
                    <span className="ml-2 text-xs font-normal text-gray-400">
                      ({categoryItems.length})
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className="group rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow bg-white"
                      >
                        <div className="relative">
                          <img
                            src={
                              item.image ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=B21F1F&color=fff&size=400`
                            }
                            alt={item.name}
                            className={`w-full aspect-square object-cover ${!item.isAvailable ? "opacity-50" : ""}`}
                          />
                          {/* Dark overlay on hover */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                          <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10">
                            <button
                              onClick={() =>
                                navigate(`/partner/menu/${item.id}/options`)
                              }
                              className="p-1.5 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
                              title="Opciones"
                            >
                              <FiSettings className="w-3.5 h-3.5 text-gray-700" />
                            </button>
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-1.5 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
                              title="Editar"
                            >
                              <FiEdit2 className="w-3.5 h-3.5 text-gray-700" />
                            </button>
                            <button
                              onClick={() => handleDelete(item)}
                              className="p-1.5 bg-white rounded-lg shadow hover:bg-red-50 transition-colors"
                              title="Eliminar"
                              disabled={deleteMutation.isPending}
                            >
                              <FiTrash2 className="w-3.5 h-3.5 text-red-600" />
                            </button>
                          </div>
                          {item.discountPrice && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-md text-xs font-bold shadow z-10">
                              -
                              {Math.round(
                                ((item.price - item.discountPrice) / item.price) *
                                  100,
                              )}
                              %
                            </div>
                          )}
                          {!item.isAvailable && (
                            <div className="absolute bottom-2 left-2 bg-gray-900 text-white px-2 py-1 rounded-md text-xs font-medium z-10">
                              No disponible
                            </div>
                          )}
                        </div>

                        <div className="p-3">
                          <h3 className="font-medium text-gray-800 text-sm line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {item.description || "Sin descripción"}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            {item.discountPrice ? (
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-sm font-bold text-red-600">
                                  {formatPrice(item.discountPrice)}
                                </span>
                                <span className="text-xs text-gray-400 line-through">
                                  {formatPrice(item.price)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm font-bold text-gray-800">
                                {formatPrice(item.price)}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center pt-6">
                  <button
                    onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                    className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    Mostrar más ({allFilteredItems.length - visibleCount} restantes)
                  </button>
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-2xl flex items-center justify-center">
                <FiPlus className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Sin productos
              </h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Comienza agregando productos al menú de tu restaurante.
              </p>
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium text-sm shadow-sm shadow-red-500/25 hover:bg-red-600 hover:shadow-md hover:shadow-red-500/30 active:scale-[0.98] transition-all"
              >
                <FiPlus className="w-4 h-4" />
                Agregar primer producto
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <MenuItemFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        menuItem={editingItem}
        restaurantId={selectedRestaurantId || 0}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={confirmDelete}
        title="Eliminar Producto"
        message={`¿Estás seguro de que deseas eliminar "${deleteItem?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};
