import { useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, Reorder, useDragControls, AnimatePresence } from "framer-motion";
import { menuService } from "@/shared/services";
import { Category } from "@/shared/types";
import { parseApiErrors, FormErrors } from "@/shared/utils";
import { ConfirmModal } from "../components/ConfirmModal";
import { FiEdit2, FiTrash2, FiPlus, FiCheck, FiX, FiAlertCircle } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import { HiChevronRight } from "react-icons/hi2";
import { useRestaurantContext } from "../contexts";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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
};

// Skeleton components
const SkeletonPulse = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const CategorySkeleton = () => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
    <SkeletonPulse className="w-6 h-6 rounded" />
    <div className="flex-1">
      <SkeletonPulse className="h-5 w-32 mb-1.5" />
      <SkeletonPulse className="h-4 w-20" />
    </div>
    <SkeletonPulse className="h-6 w-16 rounded-full" />
  </div>
);

const PageSkeleton = () => (
  <>
    <div className="flex justify-between items-center mb-7">
      <div className="flex items-center gap-2">
        <SkeletonPulse className="h-7 w-36" />
        <SkeletonPulse className="h-5 w-5" />
        <SkeletonPulse className="h-7 w-28" />
      </div>
      <SkeletonPulse className="h-10 w-44 rounded-xl" />
    </div>
    <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]">
      <div className="px-6 py-4 border-b border-gray-100">
        <SkeletonPulse className="h-5 w-40 mb-1" />
        <SkeletonPulse className="h-4 w-64" />
      </div>
      <div className="p-6 space-y-3">
        {[...Array(5)].map((_, i) => (
          <CategorySkeleton key={i} />
        ))}
      </div>
    </div>
  </>
);

interface CategoryItemProps {
  category: Category;
  itemCount: number;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryItem = ({ category, itemCount, onEdit, onDelete }: CategoryItemProps) => {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={category}
      id={category.id.toString()}
      dragListener={false}
      dragControls={dragControls}
      className="select-none"
    >
      <motion.div
        layout="position"
        transition={{ layout: { duration: 0.2 } }}
        className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
      >
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600 transition-colors touch-none"
        >
          <MdDragIndicator className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-800 truncate">{category.name}</h3>
          <p className="text-sm text-gray-500">{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</p>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(category)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
            title="Editar"
          >
            <FiEdit2 className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(category)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
            title="Eliminar"
          >
            <FiTrash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </motion.div>
    </Reorder.Item>
  );
};

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (name: string) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const CategoryForm = ({ category, onSubmit, onCancel, isLoading }: CategoryFormProps) => {
  const [name, setName] = useState(category?.name || "");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setError(null);
      try {
        await onSubmit(name.trim());
      } catch (err) {
        const errors = parseApiErrors(err);
        setError(errors.name || errors.detail || errors.non_field_errors || "Error al guardar");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <div className="flex flex-col gap-2 p-4 bg-red-50 rounded-xl border-2 border-red-200">
        <div className="flex items-center gap-4">
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Nombre de la categoría"
            className={`flex-1 px-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm ${
              error ? "border-red-300" : "border-gray-200"
            }`}
            autoFocus
            disabled={isLoading}
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={!name.trim() || isLoading}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiCheck className="w-4 h-4" />
              {category ? "Guardar" : "Crear"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-gray-600 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <FiX className="w-4 h-4" />
              Cancelar
            </button>
          </div>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </form>
  );
};

export const PartnerCategories = () => {
  const queryClient = useQueryClient();
  const { selectedRestaurant, selectedRestaurantId } = useRestaurantContext();
  const [isCreating, setIsCreating] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);

  // Get categories for selected restaurant
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories", selectedRestaurantId],
    queryFn: () =>
      selectedRestaurantId
        ? menuService.getCategories(selectedRestaurantId)
        : Promise.resolve([]),
    enabled: !!selectedRestaurantId,
  });

  // Get menu items to count per category
  const { data: menuItems = [] } = useQuery({
    queryKey: ["menu-items", selectedRestaurantId],
    queryFn: () =>
      selectedRestaurantId
        ? menuService.getMenuByRestaurant(selectedRestaurantId)
        : Promise.resolve([]),
    enabled: !!selectedRestaurantId,
  });

  const getCategoryItemCount = (categoryId: number) => {
    return menuItems.filter((item) => item.categoryId === categoryId).length;
  };

  const createMutation = useMutation({
    mutationFn: (name: string) =>
      menuService.createCategory({
        restaurantId: selectedRestaurantId!,
        name,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setIsCreating(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      menuService.updateCategory(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setEditingCategory(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: menuService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: menuService.reorderCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleReorder = (newOrder: Category[]) => {
    queryClient.setQueryData(
      ["categories", selectedRestaurantId],
      newOrder
    );
  };

  const handleReorderEnd = () => {
    const categoryIds = categories.map((c) => c.id);
    reorderMutation.mutate(categoryIds);
  };

  const handleCreate = async (name: string) => {
    await createMutation.mutateAsync(name);
  };

  const handleUpdate = async (name: string) => {
    if (editingCategory) {
      await updateMutation.mutateAsync({ id: editingCategory.id, name });
    }
  };

  const confirmDelete = async () => {
    if (deleteCategory) {
      await deleteMutation.mutateAsync(deleteCategory.id);
      setDeleteCategory(null);
    }
  };

  if (categoriesLoading) {
    return <PageSkeleton />;
  }

  if (!selectedRestaurant) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] text-center"
      >
        <p className="text-gray-500">
          Selecciona un restaurante en el menú lateral para gestionar las categorías.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-7"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-lg sm:text-2xl leading-none text-gray-500 truncate">
            {selectedRestaurant.name}
          </span>
          <HiChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <h1 className="text-lg sm:text-2xl leading-none font-bold text-gray-800">
            Categorías
          </h1>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          disabled={isCreating}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium text-sm shadow-sm shadow-red-500/25 hover:bg-red-600 hover:shadow-md hover:shadow-red-500/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPlus className="w-4 h-4" />
          Agregar Categoría
        </button>
      </motion.div>

      {/* Categories List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]"
      >
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-lg font-medium text-gray-800">Lista de Categorías</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Arrastra para reordenar las categorías del menú
              </p>
            </div>
            <AnimatePresence>
              {reorderMutation.isPending && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-gray-500 flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Guardando orden...
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {/* Create Form */}
            <AnimatePresence>
              {isCreating && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CategoryForm
                    onSubmit={handleCreate}
                    onCancel={() => setIsCreating(false)}
                    isLoading={createMutation.isPending}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Categories List with Reorder */}
            {categories.length > 0 ? (
              <Reorder.Group
                axis="y"
                values={categories}
                onReorder={handleReorder}
                className="space-y-3"
                onMouseUp={handleReorderEnd}
                onTouchEnd={handleReorderEnd}
              >
                <AnimatePresence mode="popLayout">
                  {categories.map((category) =>
                    editingCategory?.id === category.id ? (
                      <motion.div
                        key={`edit-${category.id}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CategoryForm
                          category={category}
                          onSubmit={handleUpdate}
                          onCancel={() => setEditingCategory(null)}
                          isLoading={updateMutation.isPending}
                        />
                      </motion.div>
                    ) : (
                      <CategoryItem
                        key={category.id}
                        category={category}
                        itemCount={getCategoryItemCount(category.id)}
                        onEdit={setEditingCategory}
                        onDelete={setDeleteCategory}
                      />
                    )
                  )}
                </AnimatePresence>
              </Reorder.Group>
            ) : !isCreating ? (
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
                  Sin categorías
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  Organiza tu menú creando categorías como "Entradas", "Platos Principales", etc.
                </p>
                <button
                  onClick={() => setIsCreating(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium text-sm shadow-sm shadow-red-500/25 hover:bg-red-600 hover:shadow-md hover:shadow-red-500/30 active:scale-[0.98] transition-all"
                >
                  <FiPlus className="w-4 h-4" />
                  Crear primera categoría
                </button>
              </motion.div>
            ) : null}
          </div>
        </div>
      </motion.div>

      <ConfirmModal
        isOpen={!!deleteCategory}
        onClose={() => setDeleteCategory(null)}
        onConfirm={confirmDelete}
        title="Eliminar Categoría"
        message={`¿Estás seguro de que deseas eliminar "${deleteCategory?.name}"? Los productos de esta categoría quedarán sin categoría asignada.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};
