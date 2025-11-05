import { Card } from "../../components/common";
import { FiClock } from "react-icons/fi";

const getDayName = (dayDisplay) => {
  const days = {
    Monday: "Lunes",
    Tuesday: "Martes",
    Wednesday: "Miércoles",
    Thursday: "Jueves",
    Friday: "Viernes",
    Saturday: "Sábado",
    Sunday: "Domingo",
  };
  return days[dayDisplay] || dayDisplay;
};

export const OpeningHoursCard = ({ openingHours }) => {
  if (!openingHours || openingHours.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8 shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FiClock className="text-2xl text-[#B21F1F]" /> Horario de Apertura
        </h2>
        <div className="space-y-2">
          {openingHours.map((hours) => {
            const today = new Date().getDay();
            const isToday = hours.day === today;

            return (
              <div
                key={hours.id}
                className={`flex justify-between items-center p-4 rounded-lg transition-all ${
                  isToday
                    ? "bg-[#B21F1F] text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-semibold ${isToday ? "text-white" : "text-gray-900"}`}
                  >
                    {getDayName(hours.day_display)}
                  </span>
                </div>
                <span
                  className={`font-medium ${isToday ? "text-white" : "text-gray-600"}`}
                >
                  {hours.open_time.substring(0, 5)} -{" "}
                  {hours.close_time.substring(0, 5)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
