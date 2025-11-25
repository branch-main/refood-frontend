import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Modal, Select } from "@/shared/components/ui";
import { MenuItem } from "@/shared/types";
import { menuService } from "@/shared/services";
import { parseApiErrors, FormErrors } from "@/shared/utils";
import { FiUpload, FiTrash2, FiAlertCircle } from "react-icons/fi";

interface MenuItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  menuItem?: MenuItem | null;
  restaurantId: number;
  isLoading?: boolean;
}

export const MenuItemFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  menuItem,
  restaurantId,
  isLoading = false,
}: MenuItemFormModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: null as number | null,
    price: 0,
    discountedPrice: undefined as number | undefined,
    isAvailable: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  // Fetch categories for the restaurant
  const { data: categories = [] } = useQuery({
    queryKey: ["categories", restaurantId],
    queryFn: () => menuService.getCategories(restaurantId),
    enabled: !!restaurantId && isOpen,
  });

  useEffect(() => {
    if (menuItem) {
      setFormData({
        name: menuItem.name,
        description: menuItem.description,
        categoryId: menuItem.categoryId,
        price: menuItem.price,
        discountedPrice: menuItem.discountPrice || undefined,
        isAvailable: menuItem.isAvailable,
      });
      setImagePreview(menuItem.image);
    } else {
      setFormData({
        name: "",
        description: "",
        categoryId: categories.length > 0 ? categories[0].id : null,
        price: 0,
        discountedPrice: undefined,
        isAvailable: true,
      });
      setImagePreview(null);
    }
    setImageFile(null);
    setErrors({});
  }, [menuItem, isOpen]);

  // Update default category when categories load
  useEffect(() => {
    if (!menuItem && categories.length > 0 && !formData.categoryId) {
      setFormData(prev => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, menuItem]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      await onSubmit({
        ...formData,
        restaurantId,
        image: imageFile || undefined,
      });
    } catch (error) {
      setErrors(parseApiErrors(error));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? value === ""
            ? name === "discountedPrice"
              ? undefined
              : 0
            : parseFloat(value)
          : type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} animation="scale">
      <div className="w-[420px] max-w-[90vw] max-h-[85vh] flex flex-col">
        <div className="px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">
            {menuItem ? "Editar Producto" : "Nuevo Producto"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* General Error */}
          {(errors.detail || errors.non_field_errors) && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errors.detail || errors.non_field_errors}</span>
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen
            </label>
            {imagePreview ? (
              <div className="relative w-32 h-32">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-xl border border-gray-200"
                />
                <div className="absolute top-1.5 right-1.5 flex gap-1">
                  <label
                    htmlFor="image-upload"
                    className="p-1.5 bg-white rounded-lg shadow hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <FiUpload className="w-3.5 h-3.5 text-gray-700" />
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-1.5 bg-white rounded-lg shadow hover:bg-red-50 transition-colors"
                  >
                    <FiTrash2 className="w-3.5 h-3.5 text-red-600" />
                  </button>
                </div>
              </div>
            ) : (
              <label
                htmlFor="image-upload-empty"
                className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50/30 cursor-pointer transition-all"
              >
                <FiUpload className="w-6 h-6 text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">Subir imagen</span>
                <input
                  id="image-upload-empty"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
            {errors.image && (
              <p className="mt-1 text-xs text-red-500">{errors.image}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Pizza Margherita"
              className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm ${
                errors.name ? "border-red-300 bg-red-50/50" : "border-gray-200"
              }`}
              required
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe el producto..."
              className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm ${
                errors.description ? "border-red-300 bg-red-50/50" : "border-gray-200"
              }`}
              rows={2}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Category */}
          {categories.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Categoría
              </label>
              <Select
                options={categories.map((c) => ({ value: c.id, label: c.name }))}
                value={formData.categoryId}
                onChange={(value) => setFormData(prev => ({ ...prev, categoryId: value as number }))}
                placeholder="Selecciona una categoría"
              />
              {errors.category_id && (
                <p className="mt-1 text-xs text-red-500">{errors.category_id}</p>
              )}
            </div>
          )}

          {/* Price & Discounted Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Precio (S/)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm ${
                  errors.price ? "border-red-300 bg-red-50/50" : "border-gray-200"
                }`}
                required
              />
              {errors.price && (
                <p className="mt-1 text-xs text-red-500">{errors.price}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Precio descuento
              </label>
              <input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice || ""}
                onChange={handleChange}
                placeholder="Opcional"
                step="0.01"
                min="0"
                className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm ${
                  errors.discounted_price ? "border-red-300 bg-red-50/50" : "border-gray-200"
                }`}
              />
              {errors.discounted_price && (
                <p className="mt-1 text-xs text-red-500">{errors.discounted_price}</p>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              name="isAvailable"
              id="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="isAvailable" className="text-sm text-gray-700">
              Disponible para pedidos
            </label>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex gap-3 px-5 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="menu-item-form"
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl font-medium text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Guardando..." : menuItem ? "Guardar" : "Crear"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
