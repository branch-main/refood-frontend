import { DayOfWeek, Restaurant } from "@/entities";
import { formatTime24 } from "@/shared/utils";
import { Skeleton } from "@/shared/components/ui";

const getDayName = (day: DayOfWeek) => {
  const days = {
    0: "Lunes",
    1: "Martes",
    2: "Miércoles",
    3: "Jueves",
    4: "Viernes",
    5: "Sábado",
    6: "Domingo",
  };
  return days[day];
};

export const RestaurantSchedule = ({
  restaurant,
}: {
  restaurant: Restaurant;
}) => {
  return (
    <div className="bg-white p-4">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
          Horario de apertura
        </h3>
      </div>

      <div className="space-y-2">
        {restaurant.openingHours.map((hours) => {
          const today = new Date().getDay();
          const isToday = hours.day === today;

          return (
            <div
              key={hours.day}
              className={`flex justify-between items-center px-2.5 py-2 rounded-md text-xs transition-colors ${
                isToday ? "bg-red-50" : ""
              }`}
            >
              <span
                className={`font-medium ${
                  isToday ? "text-red-500" : "text-gray-500"
                }`}
              >
                {getDayName(hours.day)}
              </span>
              <span
                className={`font-medium ${
                  isToday ? "text-red-500" : "text-gray-800"
                }`}
              >
                {formatTime24(hours.openingTime)} -{" "}
                {formatTime24(hours.closingTime)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

RestaurantSchedule.Skeleton = () => {
  return (
    <div className="bg-white p-4">
      <Skeleton className="h-4 w-40 mb-3" />

      <div className="space-y-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center px-2.5 py-2"
          >
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
};
