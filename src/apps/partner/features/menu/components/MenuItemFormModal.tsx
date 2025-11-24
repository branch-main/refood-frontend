import { useState, useEffect } from "react";
import { Modal, Button, Input } from "@/shared/components/ui";
import { MenuItem } from "@/shared/types";
import { FiUpload } from "react-icons/fi";

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
    price: 0,
    discountedPrice: undefined as number | undefined,
    isAvailable: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (menuItem) {
      setFormData({
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        discountedPrice: menuItem.discountPrice || undefined,
        isAvailable: menuItem.isAvailable,
      });
      setImagePreview(menuItem.image);
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        discountedPrice: undefined,
        isAvailable: true,
      });
      setImagePreview(null);
    }
    setImageFile(null);
  }, [menuItem, isOpen]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      restaurantId,
      image: imageFile || undefined,
    });
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
            ? 0
            : parseFloat(value)
          : type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} animation="scale">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {menuItem ? "Editar Producto" : "Agregar Producto"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen del Producto
            </label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                />
              )}
              <label
                htmlFor="image-upload"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <FiUpload className="w-4 h-4" />
                <span className="text-sm">
                  {imagePreview ? "Cambiar Imagen" : "Subir Imagen"}
                </span>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Producto *
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Pizza Margherita"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe el producto..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Price & Discounted Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio (S/) *
              </label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio con Descuento (S/)
              </label>
              <Input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice || ""}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isAvailable"
              id="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label
              htmlFor="isAvailable"
              className="text-sm font-medium text-gray-700"
            >
              Disponible para pedidos
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              fullWidth
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading
                ? "Guardando..."
                : menuItem
                  ? "Actualizar"
                  : "Agregar Producto"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
