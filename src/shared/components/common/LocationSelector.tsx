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
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);
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
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            
            setNewAddress({
              street: data.address?.road || "",
              city: data.address?.city || data.address?.town || data.address?.village || "",
              state: data.address?.state || "",
              zipCode: data.address?.postcode || "",
            });
            setIsCreating(true);
          } catch (error) {
            console.error("Error reverse geocoding:", error);
            alert("No se pudo obtener la dirección. Por favor, ingrésala manualmente.");
            setIsCreating(true);
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

  const handleCreateAddress = async () => {
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
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
    if (!editingAddress || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
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
      setAddresses(addresses.map(addr => addr.id === updated.id ? updated : addr));
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
      const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
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
      <div className="w-full max-w-2xl max-h-[85vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white">
          <h2 className="text-xl font-bold text-gray-800">Seleccionar ubicación</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoClose size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          <div className="p-6">
          {isCreating || editingAddress ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingAddress ? "Editar dirección" : "Nueva dirección"}
              </h3>
              
              <Input
                label="Calle y número"
                value={newAddress.street}
                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                placeholder="Ej: Av. Larco 123"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Ciudad"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  placeholder="Trujillo"
                />
                
                <Input
                  label="Departamento"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  placeholder="La Libertad"
                />
              </div>
              
              <Input
                label="Código Postal"
                value={newAddress.zipCode}
                onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                placeholder="13001"
              />

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingAddress(null);
                    setNewAddress({ street: "", city: "", state: "", zipCode: "" });
                  }}
                  fullWidth
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={editingAddress ? handleUpdateAddress : handleCreateAddress}
                  fullWidth
                >
                  {editingAddress ? "Actualizar dirección" : "Guardar dirección"}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4">
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
              </div>

              <div className="mb-4">
                <Button
                  variant="primary"
                  onClick={() => setIsCreating(true)}
                  fullWidth
                >
                  Agregar nueva dirección
                </Button>
              </div>

              {isLoading ? (
                <div className="text-center py-8 text-gray-500">Cargando direcciones...</div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No tienes direcciones guardadas
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">Direcciones guardadas</h3>
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`p-4 border rounded-lg transition ${
                        address.isDefault
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-red-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => handleSelectAddress(address)}
                        >
                          <div className="flex items-center gap-2">
                            <FaLocationDot className="text-red-500" />
                            <span className="font-medium text-gray-800">{address.street}</span>
                            {address.isDefault && (
                              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                                Principal
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {address.city}, {address.state} - {address.zipCode}
                          </p>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAddress(address);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar dirección"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAddress(address.id);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
