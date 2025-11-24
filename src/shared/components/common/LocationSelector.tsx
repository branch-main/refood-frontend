import { useState, useEffect } from "react";
import { Modal, Button, Input } from "../ui";
import { addressService } from "@/shared/services";
import { UserAddress } from "@/shared/types";
import { FaLocationDot } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface LocationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (address: UserAddress | null) => void;
  currentAddress?: UserAddress | null;
}

export const LocationSelector = ({
  isOpen,
  onClose,
  onSelect,
  currentAddress,
}: LocationSelectorProps) => {
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(
    null,
  );
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadAddresses();
    }
  }, [isOpen]);

  const loadAddresses = async () => {
    setIsLoading(true);
    try {
      const data = await addressService.getAddresses();
      setAddresses(data);
    } catch (error) {
      console.error("Error loading addresses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestBrowserLocation = () => {
    setIsRequestingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse geocoding using OpenStreetMap Nominatim API
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            );
            const data = await response.json();

            setNewAddress({
              street: data.address?.road || "",
              city:
                data.address?.city ||
                data.address?.town ||
                data.address?.village ||
                "",
              state: data.address?.state || "",
              zipCode: data.address?.postcode || "",
            });
            setIsCreating(true);
          } catch (error) {
            console.error("Error reverse geocoding:", error);
            alert(
              "No se pudo obtener la dirección. Por favor, ingrésala manualmente.",
            );
            setIsCreating(true);
          } finally {
            setIsRequestingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "No se pudo acceder a tu ubicación. Por favor, permite el acceso a la ubicación en tu navegador.",
          );
          setIsRequestingLocation(false);
        },
      );
    } else {
      alert("Tu navegador no soporta geolocalización");
      setIsRequestingLocation(false);
    }
  };

  const handleCreateAddress = async () => {
    if (
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.zipCode
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const created = await addressService.createAddress({
        ...newAddress,
        isDefault: addresses.length === 0, // First address is default
      });
      setAddresses([...addresses, created]);
      setIsCreating(false);
      setNewAddress({ street: "", city: "", state: "", zipCode: "" });
      onSelect(created);
      onClose();
    } catch (error) {
      console.error("Error creating address:", error);
      alert("Error al crear la dirección");
    }
  };

  const handleUpdateAddress = async () => {
    if (
      !editingAddress ||
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.zipCode
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const updated = await addressService.updateAddress(editingAddress.id, {
        street: newAddress.street,
        city: newAddress.city,
        state: newAddress.state,
        zipCode: newAddress.zipCode,
      });
      setAddresses(
        addresses.map((addr) => (addr.id === updated.id ? updated : addr)),
      );
      setEditingAddress(null);
      setNewAddress({ street: "", city: "", state: "", zipCode: "" });
      onSelect(updated);
      onClose();
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Error al actualizar la dirección");
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    if (!confirm("¿Estás seguro de eliminar esta dirección?")) {
      return;
    }

    try {
      await addressService.deleteAddress(addressId);
      const updatedAddresses = addresses.filter(
        (addr) => addr.id !== addressId,
      );
      setAddresses(updatedAddresses);

      // If deleted address was current, clear selection
      if (currentAddress?.id === addressId) {
        if (updatedAddresses.length > 0) {
          // Select first available address
          onSelect(updatedAddresses[0]);
        } else {
          // No addresses left, clear location completely
          onSelect(null);
        }
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Error al eliminar la dirección");
    }
  };

  const handleEditAddress = (address: UserAddress) => {
    setEditingAddress(address);
    setNewAddress({
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    });
  };

  const handleSelectAddress = async (address: UserAddress) => {
    try {
      await addressService.setDefaultAddress(address.id);
      onSelect(address);
      onClose();
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-sm max-h-[85vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white">
          <h2 className="text-xl font-bold text-gray-800">
            Seleccionar ubicación
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          <div className="p-6 space-y-6">
            {isCreating || editingAddress ? (
              <div className="space-y-5">
                <div className="">
                  <h3 className="text-xl font-bold text-gray-800">
                    {editingAddress ? "Editar dirección" : "Nueva dirección"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Completa los datos de tu dirección
                  </p>
                </div>

                <Input
                  label="Calle y número"
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, street: e.target.value })
                  }
                  placeholder="Ej: Av. Larco 123"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Ciudad"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    placeholder="Trujillo"
                  />

                  <Input
                    label="Departamento"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                    placeholder="La Libertad"
                  />
                </div>

                <Input
                  label="Código Postal"
                  value={newAddress.zipCode}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zipCode: e.target.value })
                  }
                  placeholder="13001"
                />

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingAddress(null);
                      setNewAddress({
                        street: "",
                        city: "",
                        state: "",
                        zipCode: "",
                      });
                    }}
                    fullWidth
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={
                      editingAddress ? handleUpdateAddress : handleCreateAddress
                    }
                    fullWidth
                  >
                    {editingAddress ? "Actualizar" : "Guardar"}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={requestBrowserLocation}
                    disabled={isRequestingLocation}
                    fullWidth
                  >
                    {isRequestingLocation ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        Obteniendo ubicación...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <FaLocationDot />
                        Usar mi ubicación actual
                      </span>
                    )}
                  </Button>

                  <Button
                    variant="primary"
                    onClick={() => setIsCreating(true)}
                    fullWidth
                  >
                    + Agregar nueva dirección
                  </Button>
                </div>

                {isLoading ? (
                  <div className="text-center py-12 text-gray-400">
                    <div className="inline-block w-8 h-8 border-3 border-gray-300 border-t-red-500 rounded-full animate-spin mb-2" />
                    <p>Cargando direcciones...</p>
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="text-center py-12">
                    <FaLocationDot className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">
                      No tienes direcciones guardadas
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Agrega tu primera dirección para continuar
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Mis direcciones
                    </h3>
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`p-3.5 border rounded-lg transition ${
                          address.isDefault
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-red-300 hover:bg-gray-50 cursor-pointer"
                        }`}
                        onClick={() => handleSelectAddress(address)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                              <FaLocationDot className="text-red-500 w-4 h-4 flex-shrink-0" />
                              <span className="font-semibold text-gray-800 text-sm">
                                {address.street}
                              </span>
                              {address.isDefault && (
                                <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-medium">
                                  Principal
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 ml-6">
                              {address.city}, {address.state} -{" "}
                              {address.zipCode}
                            </p>
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditAddress(address);
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Editar dirección"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAddress(address.id);
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Eliminar dirección"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
