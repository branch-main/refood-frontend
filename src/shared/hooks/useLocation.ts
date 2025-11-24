import { useState, useEffect } from "react";
import { UserAddress } from "../types";
import { addressService } from "../services";

const LOCATION_STORAGE_KEY = "user_location";

export const useLocation = () => {
  const [location, setLocation] = useState<UserAddress | null>(() => {
    const saved = localStorage.getItem(LOCATION_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!location) {
      loadDefaultAddress();
    }
  }, []);

  useEffect(() => {
    if (location) {
      localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
    } else {
      localStorage.removeItem(LOCATION_STORAGE_KEY);
    }
  }, [location]);

  const loadDefaultAddress = async () => {
    setIsLoading(true);
    try {
      const addresses = await addressService.getAddresses();
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setLocation(defaultAddress);
      }
    } catch (error) {
      console.error("Error loading default address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLocation = (newLocation: UserAddress) => {
    setLocation(newLocation);
  };

  const clearLocation = () => {
    setLocation(null);
  };

  const getFormattedAddress = () => {
    if (!location) return "Seleccionar ubicación";
    return `${location.street}, ${location.city}`;
  };

  const getShortAddress = () => {
    if (!location) return "Seleccionar ubicación";
    return location.street;
  };

  return {
    location,
    isLoading,
    updateLocation,
    clearLocation,
    getFormattedAddress,
    getShortAddress,
  };
};
