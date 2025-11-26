import { motion, AnimatePresence } from "framer-motion";
import { FiBell, FiCheck, FiCheckCircle, FiTrash2, FiPackage, FiCreditCard, FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { 
  useNotifications, 
  useMarkNotificationAsRead, 
  useMarkAllNotificationsAsRead,
  useDeleteNotification 
} from "@/shared/hooks/useNotifications";
import { Notification } from "@/shared/services/notificationService";
import { Skeleton } from "@/shared/components/ui";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.2,
    },
  },
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "order_placed":
    case "order_confirmed":
    case "order_preparing":
    case "order_ready":
    case "order_delivering":
    case "order_completed":
      return <FiPackage className="w-5 h-5" />;
    case "order_cancelled":
      return <FiAlertCircle className="w-5 h-5" />;
    case "payment_received":
      return <FiCreditCard className="w-5 h-5" />;
    case "payment_failed":
      return <FiAlertCircle className="w-5 h-5" />;
    default:
      return <FiBell className="w-5 h-5" />;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case "order_placed":
      return "bg-blue-50 text-blue-500";
    case "order_confirmed":
      return "bg-green-50 text-green-500";
    case "order_preparing":
      return "bg-orange-50 text-orange-500";
    case "order_ready":
      return "bg-purple-50 text-purple-500";
    case "order_delivering":
      return "bg-indigo-50 text-indigo-500";
    case "order_completed":
      return "bg-emerald-50 text-emerald-500";
    case "order_cancelled":
      return "bg-red-50 text-red-500";
    case "payment_received":
      return "bg-green-50 text-green-500";
    case "payment_failed":
      return "bg-red-50 text-red-500";
    default:
      return "bg-gray-50 text-gray-500";
  }
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Ahora mismo";
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays < 7) return `Hace ${diffDays}d`;
  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
};

const NotificationItem = ({ 
  notification, 
  onMarkAsRead, 
  onDelete 
}: { 
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  const orderId = notification.data?.order_id;

  return (
    <motion.div
      variants={itemVariants}
      className={`bg-white rounded-xl border p-4 ${
        notification.isRead 
          ? "border-gray-100" 
          : "border-red-100 bg-red-50/30"
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className={`font-medium text-sm ${notification.isRead ? "text-gray-700" : "text-gray-900"}`}>
              {notification.title}
            </h3>
            <p className={`text-sm mt-0.5 ${notification.isRead ? "text-gray-400" : "text-gray-600"}`}>
              {notification.message}
            </p>
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {formatTimeAgo(notification.createdAt)}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          {orderId && (
            <Link
              to={`/profile/orders/${orderId}`}
              className="text-xs text-red-500 hover:text-red-600 font-medium"
            >
              Ver pedido
            </Link>
          )}
          
          {!notification.isRead && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <FiCheck className="w-3 h-3" />
              Marcar como leído
            </button>
          )}
          
          <button
            onClick={() => onDelete(notification.id)}
            className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 ml-auto"
          >
            <FiTrash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const NotificationSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-4">
    <div className="flex gap-4">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <div className="flex-1">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-3 w-full max-w-xs" />
        <div className="flex gap-2 mt-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-3 w-12" />
    </div>
  </div>
);

export const Notifications = () => {
  const { data: notifications, isLoading } = useNotifications();
  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const deleteNotification = useDeleteNotification();

  const unreadCount = notifications?.filter(n => !n.isRead).length ?? 0;

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <NotificationSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="p-4 sm:p-6 lg:p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notificaciones</h1>
          <p className="mt-1 text-sm text-gray-500">
            {unreadCount > 0 
              ? `Tienes ${unreadCount} notificación${unreadCount > 1 ? "es" : ""} sin leer`
              : "Todas las notificaciones están leídas"
            }
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={() => markAllAsRead.mutate()}
            disabled={markAllAsRead.isPending}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors disabled:opacity-50"
          >
            <FiCheckCircle className="w-4 h-4" />
            Marcar todas como leídas
          </button>
        )}
      </motion.div>

      {notifications?.length === 0 ? (
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-8 sm:p-12"
        >
          <div className="text-center max-w-sm mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
              <FiBell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No tienes notificaciones aún
            </h3>
            <p className="text-sm text-gray-500">
              Explora restaurantes y realiza pedidos para recibir notificaciones
              importantes sobre tus actividades.
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          className="space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {notifications?.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={(id) => markAsRead.mutate(id)}
                onDelete={(id) => deleteNotification.mutate(id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};
