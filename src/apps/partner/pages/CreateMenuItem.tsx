import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@/shared/components/ui";
import { Textarea } from "@/shared/components/ui/Textarea";
import {
  IoArrowBack,
  IoImageOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { MdRestaurantMenu, MdAttachMoney } from "react-icons/md";

interface MenuItemForm {
  name: string;
  description: string;
  price: string;
  image: string;
  isAvailable: boolean;
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  image?: string;
}

export const CreateMenuItem = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MenuItemForm>({
    name: "",
    description: "",
    price: "",
    image: "",
    isAvailable: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    } else if (formData.description.length < 10) {
      newErrors.description =
        "La descripción debe tener al menos 10 caracteres";
    }

    if (!formData.price) {
      newErrors.price = "El precio es requerido";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "El precio debe ser un número mayor a 0";
    }

    if (formData.image && !isValidUrl(formData.image)) {
      newErrors.image = "Ingresa una URL válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, image: url });
    if (url && isValidUrl(url)) {
      setImagePreview(url);
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement API call to create menu item
      // await menuService.createMenuItem({
      //   name: formData.name,
      //   description: formData.description,
      //   price: Number(formData.price),
      //   image: formData.image || null,
      //   isAvailable: formData.isAvailable,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate back to menu page
      navigate("/partner/menu");
    } catch (error) {
      console.error("Error creating menu item:", error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/partner/menu");
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 group"
        >
          <IoArrowBack className="text-xl group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver al Menú</span>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Crear Nuevo Producto
          </h1>
          <p className="text-gray-500 mt-1">
            Agrega un nuevo producto a tu menú
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 px-8 py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                Información del Producto
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Completa los detalles de tu producto
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Product Name */}
              <div>
                <Input
                  label="Nombre del Producto"
                  placeholder="Ej: Pizza Margarita Grande"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  error={errors.name}
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  Usa un nombre descriptivo y atractivo para tu producto
                </p>
              </div>

              {/* Description */}
              <div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-[0.9375rem] font-semibold text-gray-700 tracking-wide">
                    Descripción del Producto
                  </label>
                  <Textarea
                    placeholder="Describe los ingredientes, sabores especiales o características que hacen único a tu producto..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    maxCharacters={500}
                    required
                  />
                  {errors.description && (
                    <span className="text-red-600 text-sm mt-1 font-medium">
                      {errors.description}
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="relative">
                  <Input
                    label="Precio"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    error={errors.price}
                    required
                  />
                  <MdAttachMoney className="absolute right-4 top-[3.15rem] text-gray-400 text-xl pointer-events-none" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Precio en tu moneda local
                </p>
              </div>

              {/* Image URL */}
              <div>
                <div className="relative">
                  <Input
                    label="URL de Imagen del Producto"
                    type="url"
                    placeholder="https://ejemplo.com/imagen-producto.jpg"
                    value={formData.image}
                    onChange={handleImageUrlChange}
                    error={errors.image}
                  />
                  <IoImageOutline className="absolute right-4 top-[3.15rem] text-gray-400 text-xl pointer-events-none" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Opcional: Agrega una imagen para que tu producto sea más
                  atractivo
                </p>
              </div>

              {/* Availability Toggle */}
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="isAvailable"
                    checked={formData.isAvailable}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isAvailable: e.target.checked,
                      })
                    }
                    className="w-6 h-6 mt-1 cursor-pointer accent-red-500 rounded"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="isAvailable"
                      className="text-base font-semibold text-gray-900 cursor-pointer flex items-center gap-2"
                    >
                      Producto Disponible para Venta
                      {formData.isAvailable && (
                        <IoCheckmarkCircle className="text-green-500 text-xl" />
                      )}
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Los clientes podrán ver y ordenar este producto
                      inmediatamente
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? "Creando..." : "Crear Producto"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  fullWidth
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden sticky top-6">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
              <h3 className="text-lg font-bold text-white">Vista Previa</h3>
              <p className="text-gray-300 text-sm mt-1">
                Así verán tu producto
              </p>
            </div>

            <div className="p-6">
              {/* Product Card Preview */}
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                {/* Image Preview */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={() => setImagePreview("")}
                    />
                  ) : (
                    <div className="text-center">
                      <IoImageOutline className="text-6xl text-gray-400 mx-auto" />
                      <p className="text-gray-500 text-sm mt-2">Sin imagen</p>
                    </div>
                  )}
                  {!formData.isAvailable && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                        NO DISPONIBLE
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Preview */}
                <div className="p-4">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h4 className="font-bold text-gray-900 text-lg line-clamp-2">
                      {formData.name || "Nombre del producto"}
                    </h4>
                    {formData.price && (
                      <span className="text-red-600 font-bold text-xl whitespace-nowrap">
                        ${formData.price}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {formData.description ||
                      "La descripción de tu producto aparecerá aquí..."}
                  </p>
                  {formData.isAvailable && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <span className="inline-flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                        <IoCheckmarkCircle className="text-lg" />
                        Disponible ahora
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Card */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 text-sm mb-2">
                  💡 Consejos
                </h4>
                <ul className="text-xs text-blue-800 space-y-1.5">
                  <li>• Usa imágenes de alta calidad</li>
                  <li>• Describe ingredientes únicos</li>
                  <li>• Revisa el precio antes de publicar</li>
                  <li>• Mantén descripciones claras</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
