import { FiClock } from "react-icons/fi";
import { DayOfWeek, OpeningHours } from "../../../domain/entities/Restaurant";

interface OpeningHoursCardProps {
  openingHours: OpeningHours[];
}

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

export const OpeningHoursCard = ({ openingHours }: OpeningHoursCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <FiClock className="text-xl text-[#B21F1F]" />
          Horario de Apertura
        </h2>
        <div className="space-y-2">
          {openingHours.map((hours) => {
            const today = new Date().getDay();
            const isToday = hours.day === today;

            return (
              <div
                key={hours.day}
                className={`flex justify-between items-center py-2.5 px-3 rounded-lg transition-colors ${
                  isToday ? "bg-[#B21F1F] text-white" : "hover:bg-gray-50"
                }`}
              >
                <span
                  className={`font-medium text-base ${isToday ? "text-white" : "text-gray-900"}`}
                >
                  {getDayName(hours.day)}
                </span>
                <span
                  className={`text-base font-medium ${isToday ? "text-white" : "text-gray-600"}`}
                >
                  {hours.openingTime.substring(0, 5)} -{" "}
                  {hours.closingTime.substring(0, 5)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
