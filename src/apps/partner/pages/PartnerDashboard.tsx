import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/shared/services";
import { Order } from "@/shared/types";
import {
  DashboardCard,
  StatIndicator,
  WeeklyEarningsChart,
  RecentReviews,
} from "../features/dashboard/components";
import { OrderTable, OrderDetailModal } from "../features/orders/components";
import { formatPrice } from "@/shared/utils";
import { useRestaurantContext } from "../contexts/RestaurantContext";
import { motion } from "framer-motion";

// Skeleton components
const SkeletonPulse = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const StatCardSkeleton = () => (
  <div className="bg-white rounded-2xl p-5 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]">
    <SkeletonPulse className="h-4 w-24 mb-3" />
    <SkeletonPulse className="h-8 w-32 mb-2" />
    <SkeletonPulse className="h-4 w-20" />
  </div>
);

const TableSkeleton = () => (
  <div className="space-y-3">
    <div className="flex gap-4 pb-3 border-b border-gray-100">
      <SkeletonPulse className="h-4 w-24" />
      <SkeletonPulse className="h-4 w-32" />
      <SkeletonPulse className="h-4 w-20" />
      <SkeletonPulse className="h-4 w-16" />
      <SkeletonPulse className="h-4 w-20" />
    </div>
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex gap-4 py-2">
        <SkeletonPulse className="h-4 w-24" />
        <SkeletonPulse className="h-4 w-32" />
        <SkeletonPulse className="h-4 w-20" />
        <SkeletonPulse className="h-4 w-16" />
        <SkeletonPulse className="h-6 w-20 rounded-full" />
      </div>
    ))}
  </div>
);

const ChartSkeleton = () => (
  <div className="flex items-end justify-between h-40 gap-2 pt-4">
    {[40, 65, 45, 80, 55, 70, 50].map((height, i) => (
      <SkeletonPulse key={i} className="flex-1 rounded-t" style={{ height: `${height}%` }} />
    ))}
  </div>
);

const ReviewsSkeleton = () => (
  <div className="flex gap-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex-1 p-4 border border-gray-100 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <SkeletonPulse className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <SkeletonPulse className="h-4 w-24 mb-1" />
            <SkeletonPulse className="h-3 w-16" />
          </div>
        </div>
        <SkeletonPulse className="h-4 w-full mb-2" />
        <SkeletonPulse className="h-4 w-3/4" />
      </div>
    ))}
  </div>
);

const DashboardSkeleton = () => (
  <>
    <SkeletonPulse className="h-8 w-32 mb-7" />
    <div className="grid grid-cols-3 gap-4">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
      
      <div className="col-span-2 h-full bg-white rounded-2xl p-5 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] flex flex-col">
        <SkeletonPulse className="h-5 w-36 mb-4" />
        <div className="flex-1">
          <TableSkeleton />
        </div>
      </div>
      
      <div className="h-full bg-white rounded-2xl p-5 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] flex flex-col">
        <SkeletonPulse className="h-5 w-36 mb-4" />
        <div className="flex-1">
          <ChartSkeleton />
        </div>
      </div>
      
      <div className="col-span-3 bg-white rounded-2xl p-5 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]">
        <SkeletonPulse className="h-5 w-40 mb-4" />
        <ReviewsSkeleton />
      </div>
    </div>
  </>
);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const PartnerDashboard = () => {
  const { restaurants, isLoading: restaurantsLoading } = useRestaurantContext();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const restaurantIds = restaurants.map((r) => r.id);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats", restaurantIds],
    queryFn: () => orderService.getDashboardStats(restaurantIds),
    enabled: restaurantIds.length > 0,
  });

  const isLoading = restaurantsLoading || statsLoading;

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!stats) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-64 text-gray-500"
      >
        <p>No hay datos disponibles.</p>
        <p className="text-sm mt-1">Crea un restaurante para comenzar.</p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-gray-800 mb-7"
      >
        Dashboard
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <StatIndicator
            title="Ganancias del día"
            current={stats.todayEarnings}
            previous={stats.yesterdayEarnings}
            formatter={formatPrice}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatIndicator
            title="Pedidos del día"
            current={stats.todayOrders}
            previous={stats.yesterdayOrders}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatIndicator
            title="Productos del día"
            current={stats.todayItems}
            previous={stats.yesterdayItems}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-2 h-full">
          <DashboardCard title="Pedidos recientes">
            {stats.recentOrders.length > 0 ? (
              <OrderTable orders={stats.recentOrders} onOrderClick={handleOrderClick} />
            ) : (
              <p className="text-gray-500 text-center py-8">No hay pedidos recientes</p>
            )}
          </DashboardCard>
        </motion.div>

        <motion.div variants={itemVariants} className="h-full">
          <DashboardCard title="Ganancias semanales">
            <WeeklyEarningsChart data={stats.weeklyEarnings} />
          </DashboardCard>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-3">
          <DashboardCard title="Opiniones recientes">
            <RecentReviews />
          </DashboardCard>
        </motion.div>
      </motion.div>

      {/* Order Detail Modal (read-only from dashboard) */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        readOnly
      />
    </>
  );
};
