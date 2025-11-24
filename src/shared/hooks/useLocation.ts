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
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('locationChanged', { detail: location }));
  }, [location]);

  // Listen for location changes from other components
  useEffect(() => {
    const handleLocationChange = (event: Event) => {
      const customEvent = event as CustomEvent<UserAddress | null>;
      setLocation(customEvent.detail);
    };

    window.addEventListener('locationChanged', handleLocationChange);
    return () => window.removeEventListener('locationChanged', handleLocationChange);
  }, []);

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

  const updateLocation = (newLocation: UserAddress | null) => {
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
