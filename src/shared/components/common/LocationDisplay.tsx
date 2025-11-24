import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation } from "@/shared/hooks";
import { LocationSelector } from "./LocationSelector";

interface LocationDisplayProps {
  variant?: "navbar" | "compact";
  className?: string;
}

export const LocationDisplay = ({
  variant = "navbar",
  className = "",
}: LocationDisplayProps) => {
  const { location, getFormattedAddress, updateLocation } = useLocation();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const baseClasses =
    "text-red-500 hover:text-red-600 transition-colors cursor-pointer inline-flex items-center gap-3";
  const variantClasses = {
    navbar: "text-xs font-bold",
    compact: "text-sm font-medium",
  };

  return (
    <>
      <span
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        onClick={() => setIsLocationModalOpen(true)}
      >
        <FaLocationDot className="w-4 h-4" />
        {location ? getFormattedAddress() : "Seleccionar ubicación"}
      </span>

      <LocationSelector
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelect={(address) => updateLocation(address)}
        currentAddress={location}
      />
    </>
  );
};
