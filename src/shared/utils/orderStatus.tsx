import { OrderStatus } from "@/shared/types";
import { FiClock, FiCheck, FiTruck, FiPackage, FiX } from "react-icons/fi";

export const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return <FiClock className="w-4 h-4" />;
    case OrderStatus.CONFIRMED:
      return <FiCheck className="w-4 h-4" />;
    case OrderStatus.DELIVERYING:
      return <FiTruck className="w-4 h-4" />;
    case OrderStatus.COMPLETED:
      return <FiPackage className="w-4 h-4" />;
    case OrderStatus.CANCELED:
      return <FiX className="w-4 h-4" />;
    default:
      return null;
  }
};

export const getStatusText = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return "Pendiente";
    case OrderStatus.CONFIRMED:
      return "Confirmado";
    case OrderStatus.DELIVERYING:
      return "En camino";
    case OrderStatus.COMPLETED:
      return "Completado";
    case OrderStatus.CANCELED:
      return "Cancelado";
    default:
      return status;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case OrderStatus.PENDING:
      return "bg-yellow-50 text-yellow-400";
    case OrderStatus.CONFIRMED:
      return "bg-blue-50 text-blue-400";
    case OrderStatus.DELIVERYING:
      return "bg-orange-50 text-orange-400";
    case OrderStatus.COMPLETED:
      return "bg-green-50 text-green-400";
    case OrderStatus.CANCELED:
      return "bg-red-50 text-red-400";
  }
};
