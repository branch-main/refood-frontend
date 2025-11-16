import { OpeningHours } from "../../domain/entities/Restaurant";

export const useIsOpen = (openingHours?: OpeningHours[]): boolean => {
  if (!openingHours || openingHours.length === 0) {
    return false;
  }

  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  const today = openingHours.find((oh) => oh.day === currentDay);
  if (!today) return false;

  const openingTime = today.openingTime.substring(0, 5);
  const closingTime = today.closingTime.substring(0, 5);

  return currentTime >= openingTime && currentTime <= closingTime;
};
