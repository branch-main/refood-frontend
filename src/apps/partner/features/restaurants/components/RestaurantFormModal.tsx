import { useState, useEffect } from "react";
import { Modal, Button, Input } from "@/shared/components/ui";
import { Restaurant } from "@/shared/types";
import { parseApiErrors, FormErrors } from "@/shared/utils";
import { FaLocationDot } from "react-icons/fa6";
import { FiAlertCircle } from "react-icons/fi";

interface RestaurantFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  restaurant?: Restaurant | null;
  isLoading?: boolean;
}

export const RestaurantFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  restaurant,
  isLoading = false,
}: RestaurantFormModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    minPreparationTime: 15,
    maxPreparationTime: 30,
    address: "",
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
  });
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name,
        description: restaurant.description,
        email: restaurant.email,
        phone: restaurant.phone,
        minPreparationTime: restaurant.minPreparationTime,
        maxPreparationTime: restaurant.maxPreparationTime,
        address: restaurant.address,
        latitude: restaurant.latitude || undefined,
        longitude: restaurant.longitude || undefined,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        email: "",
        phone: "",
        minPreparationTime: 15,
        maxPreparationTime: 30,
        address: "",
        latitude: undefined,
        longitude: undefined,
      });
    }
    setErrors({});
  }, [restaurant, isOpen]);

  const requestBrowserLocation = () => {
    setIsRequestingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();

            const street = data.address?.road || "";
            const city =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              "";
            const state = data.address?.state || "";

            setFormData((prev) => ({
              ...prev,
              address: `${street}, ${city}, ${state}`.replace(/^,\s*|,\s*$/g, ""),
              latitude,
              longitude,
            }));
          } catch (error) {
            console.error("Error reverse geocoding:", error);
            alert(
              "No se pudo obtener la dirección. Por favor, ingrésala manualmente."
            );
          } finally {
            setIsRequestingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "No se pudo acceder a tu ubicación. Por favor, permite el acceso a la ubicación en tu navegador."
          );
          setIsRequestingLocation(false);
        }
      );
    } else {
      alert("Tu navegador no soporta geolocalización");
      setIsRequestingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors(parseApiErrors(error));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "minPreparationTime" || name === "maxPreparationTime"
          ? parseInt(value) || 0
          : value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} animation="scale">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">
            {restaurant ? "Editar Restaurante" : "Crear Restaurante"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            {/* General Error */}
            {(errors.detail || errors.non_field_errors) && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errors.detail || errors.non_field_errors}</span>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Restaurante *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Pizza Palace"
                required
                maxLength={32}
                error={errors.name}
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
                placeholder="Describe tu restaurante..."
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm ${
                  errors.description ? "border-red-300 bg-red-50/50" : "border-gray-300"
                }`}
                rows={2}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@ejemplo.com"
                  required
                  error={errors.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="987654321"
                  required
                  maxLength={9}
                  error={errors.phone}
                />
              </div>
            </div>

            {/* Preparation Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo Mín. (min) *
                </label>
                <Input
                  type="number"
                  name="minPreparationTime"
                  value={formData.minPreparationTime}
                  onChange={handleChange}
                  min={5}
                  max={120}
                  required
                  error={errors.min_preparation_time}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo Máx. (min) *
                </label>
                <Input
                  type="number"
                  name="maxPreparationTime"
                  value={formData.maxPreparationTime}
                  onChange={handleChange}
                  min={5}
                  max={120}
                  required
                  error={errors.max_preparation_time}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección *
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Ingresa la dirección del restaurante"
                    required
                    error={errors.address}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={requestBrowserLocation}
                  disabled={isRequestingLocation}
                  className="flex items-center gap-2 whitespace-nowrap px-3"
                >
                  <FaLocationDot className="text-red-500" />
                  {isRequestingLocation ? "..." : "GPS"}
                </Button>
              </div>
              {formData.latitude && formData.longitude && (
                <p className="text-xs text-gray-500 mt-1">
                  Coordenadas: {Number(formData.latitude).toFixed(6)},{" "}
                  {Number(formData.longitude).toFixed(6)}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 px-6 py-4 border-t border-gray-100 flex-shrink-0">
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
                : restaurant
                  ? "Actualizar"
                  : "Crear Restaurante"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
