import { FiClock } from "react-icons/fi";
import { DayOfWeek, OpeningHours } from "../../../domain/entities/Restaurant";

interface OpeningHoursCardProps {
  openingHours: OpeningHours[];
}

const getDayName = (day: DayOfWeek) => {
  const days = {
    0: "Lun",
    1: "Mar",
    2: "Mié",
    3: "Jue",
    4: "Vie",
    5: "Sáb",
    6: "Dom",
  };
  return days[day];
};

export const OpeningHoursCard = ({ openingHours }: OpeningHoursCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <FiClock className="text-base text-[#B21F1F]" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          Horario
        </h3>
      </div>

      <div className="space-y-2">
        {openingHours.map((hours) => {
          const today = new Date().getDay();
          const isToday = hours.day === today;

          return (
            <div
              key={hours.day}
              className={`flex justify-between items-center px-2.5 py-2 rounded-md text-xs transition-colors ${
                isToday
                  ? "bg-red-50 border border-red-200"
                  : "hover:bg-gray-50"
              }`}
            >
              <span
                className={`font-medium ${
                  isToday ? "text-[#B21F1F]" : "text-gray-700"
                }`}
              >
                {getDayName(hours.day)}
              </span>
              <span
                className={`font-medium ${
                  isToday ? "text-[#B21F1F]" : "text-gray-600"
                }`}
              >
                {hours.openingTime.substring(0, 5)} - {hours.closingTime.substring(0, 5)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
