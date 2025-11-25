import { OrderStatus } from "@/shared/types";
import { FiClock, FiCheck, FiTruck, FiPackage, FiX } from "react-icons/fi";
import { GiCookingPot } from "react-icons/gi";
import { MdOutlineDoneAll } from "react-icons/md";

export const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return <FiClock className="w-4 h-4" />;
    case OrderStatus.CONFIRMED:
      return <FiCheck className="w-4 h-4" />;
    case OrderStatus.PREPARING:
      return <GiCookingPot className="w-4 h-4" />;
    case OrderStatus.READY:
      return <MdOutlineDoneAll className="w-4 h-4" />;
    case OrderStatus.DELIVERING:
      return <FiTruck className="w-4 h-4" />;
    case OrderStatus.COMPLETED:
      return <FiPackage className="w-4 h-4" />;
    case OrderStatus.CANCELLED:
      return <FiX className="w-4 h-4" />;
    default:
      return null;
  }
};

export const getStatusText = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return "Pago Pendiente";
    case OrderStatus.CONFIRMED:
      return "Confirmado";
    case OrderStatus.PREPARING:
      return "Preparando";
    case OrderStatus.READY:
      return "Listo";
    case OrderStatus.DELIVERING:
      return "En camino";
    case OrderStatus.COMPLETED:
      return "Completado";
    case OrderStatus.CANCELLED:
      return "Cancelado";
    default:
      return status;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case OrderStatus.PENDING:
      return "bg-yellow-50 text-yellow-600";
    case OrderStatus.CONFIRMED:
      return "bg-blue-50 text-blue-600";
    case OrderStatus.PREPARING:
      return "bg-purple-50 text-purple-600";
    case OrderStatus.READY:
      return "bg-emerald-50 text-emerald-600";
    case OrderStatus.DELIVERING:
      return "bg-orange-50 text-orange-600";
    case OrderStatus.COMPLETED:
      return "bg-green-50 text-green-600";
    case OrderStatus.CANCELLED:
      return "bg-red-50 text-red-600";
    default:
      return "bg-gray-50 text-gray-600";
  }
};
