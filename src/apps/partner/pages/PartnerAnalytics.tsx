import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiShoppingBag,
  FiDollarSign,
  FiUsers,
  FiPackage,
} from "react-icons/fi";
import { Select } from "@/shared/components/ui";
import { orderService, Analytics } from "@/shared/services/orderService";
import { restaurantService } from "@/shared/services/restaurantService";
import { useAuth } from "@/shared/hooks/useAuth";

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(value);
};

const formatDateShort = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-PE", { day: "2-digit", month: "short" });
};

const formatDateMonth = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-PE", { month: "short", year: "2-digit" });
};

const formatDateWeek = (dateStr: string) => {
  const date = new Date(dateStr);
  return `Sem ${Math.ceil(date.getDate() / 7)}/${date.toLocaleDateString("es-PE", { month: "short" })}`;
};

// Aggregate data by period
const aggregateData = (
  data: { date: string; value: number }[],
  period: "day" | "week" | "month"
): { date: string; value: number; label: string }[] => {
  if (period === "day") {
    return data.map((d) => ({ ...d, label: formatDateShort(d.date) }));
  }

  const grouped: Record<string, { date: string; value: number }> = {};

  data.forEach((item) => {
    const date = new Date(item.date);
    let key: string;

    if (period === "week") {
      // Group by week
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      key = weekStart.toISOString().split("T")[0];
    } else {
      // Group by month
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;
    }

    if (!grouped[key]) {
      grouped[key] = { date: key, value: 0 };
    }
    grouped[key].value += item.value;
  });

  return Object.values(grouped)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((d) => ({
      ...d,
      label: period === "week" ? formatDateWeek(d.date) : formatDateMonth(d.date),
    }));
};

// Simple bar chart component
const BarChart = ({
  data,
  valueFormatter = (v: number) => v.toString(),
  color = "bg-red-500",
  period = "7d",
}: {
  data: { date: string; value: number }[];
  valueFormatter?: (value: number) => string;
  color?: string;
  period?: string;
}) => {
  // Determine aggregation based on data length and period
  const aggregationPeriod = useMemo(() => {
    if (period === "1y" || data.length > 90) return "month";
    if (period === "3m" || data.length > 31) return "week";
    return "day";
  }, [data.length, period]);

  const aggregatedData = useMemo(
    () => aggregateData(data, aggregationPeriod),
    [data, aggregationPeriod]
  );

  const maxValue = Math.max(...aggregatedData.map((d) => d.value), 1);

  // Calculate max bar height in pixels
  const maxBarHeight = 180;

  return (
    <div className="flex items-end gap-1" style={{ height: `${maxBarHeight + 20}px` }}>
      {aggregatedData.map((item, index) => {
        // Calculate height in pixels proportional to max value
        const barHeight = item.value > 0 ? Math.max((item.value / maxValue) * maxBarHeight, 4) : 0;
        
        return (
          <div key={index} className="flex flex-col items-center flex-1 min-w-[20px] max-w-[60px] group justify-end" style={{ height: `${maxBarHeight + 20}px` }}>
            <div className="relative w-full flex flex-col items-center justify-end" style={{ height: `${maxBarHeight}px` }}>
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                {item.label}: {valueFormatter(item.value)}
              </div>
              {/* Bar */}
              {item.value > 0 ? (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: barHeight }}
                  transition={{ duration: 0.5, delay: index * 0.03 }}
                  className={`w-full ${color} rounded-t-md`}
                />
              ) : (
                <div className="w-full bg-gray-200 rounded-t-md h-1" />
              )}
            </div>
            <span className="text-[9px] text-gray-500 mt-1 truncate w-full text-center">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Status distribution chart
const StatusChart = ({ data }: { data: Record<string, number> }) => {
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  if (total === 0) return <p className="text-gray-400 text-center py-8">Sin datos</p>;

  const statusLabels: Record<string, string> = {
    PENDING: "Pendiente",
    CONFIRMED: "Confirmado",
    PREPARING: "Preparando",
    READY: "Listo",
    DELIVERING: "En camino",
    COMPLETED: "Completado",
    CANCELLED: "Cancelado",
  };

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-500",
    CONFIRMED: "bg-blue-500",
    PREPARING: "bg-orange-500",
    READY: "bg-purple-500",
    DELIVERING: "bg-indigo-500",
    COMPLETED: "bg-green-500",
    CANCELLED: "bg-red-500",
  };

  return (
    <div className="space-y-3">
      {Object.entries(data).map(([status, count]) => {
        const percentage = (count / total) * 100;
        return (
          <div key={status} className="flex items-center gap-3">
            <span className="text-sm text-gray-600 w-24">
              {statusLabels[status] || status}
            </span>
            <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full ${statusColors[status] || "bg-gray-500"}`}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 w-12 text-right">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Stat card component
const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change?: number;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6"
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-red-500" />
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm ${
              change >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {change >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </motion.div>
  );
};

// Skeleton components
const StatCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6">
    <div className="flex items-center justify-between">
      <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse" />
      <div className="w-16 h-5 bg-gray-200 rounded animate-pulse" />
    </div>
    <div className="mt-4 space-y-2">
      <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
    </div>
  </div>
);

const ChartSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6">
    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
    <div className="h-48 flex items-end gap-[2px]">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex-1 flex flex-col items-center min-w-0">
          <div
            className="w-full bg-gray-200 rounded-t-md animate-pulse"
            style={{ height: `${Math.random() * 60 + 20}%` }}
          />
          <div className="w-8 h-3 bg-gray-200 rounded animate-pulse mt-1" />
        </div>
      ))}
    </div>
  </div>
);

export const PartnerAnalytics = () => {
  const { user } = useAuth();
  const [period, setPeriod] = useState("7d");

  // Fetch restaurants
  const { data: restaurants = [] } = useQuery({
    queryKey: ["partner-restaurants", user?.id],
    queryFn: () => restaurantService.getMyRestaurants(),
    enabled: !!user?.id,
  });

  const restaurantIds = useMemo(
    () => restaurants.map((r) => r.id),
    [restaurants]
  );

  // Fetch analytics
  const {
    data: analytics,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["analytics", restaurantIds, period],
    queryFn: () => orderService.getAnalytics(restaurantIds, period),
    enabled: restaurantIds.length > 0,
  });

  const periodLabel = {
    "7d": "últimos 7 días",
    "30d": "últimos 30 días",
    "3m": "últimos 3 meses",
    "1y": "último año",
  }[period];

  // Handle no restaurants case
  if (restaurantIds.length === 0 && restaurants !== undefined) {
    return (
      <>
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-2xl font-bold text-gray-800">Analíticas</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-12 text-center">
          <FiTrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Sin restaurantes</h3>
          <p className="text-gray-500">Agrega un restaurante para ver las analíticas</p>
        </div>
      </>
    );
  }

  if (isLoading || !analytics) {
    return (
      <>
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-2xl font-bold text-gray-800">Analíticas</h1>
          <div className="w-44 h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error al cargar las analíticas</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-2xl font-bold text-gray-800">Analíticas</h1>
        <Select
          options={[
            { value: "7d", label: "Últimos 7 días" },
            { value: "30d", label: "Últimos 30 días" },
            { value: "3m", label: "Últimos 3 meses" },
            { value: "1y", label: "Último año" },
          ]}
          value={period}
          onChange={(value) => setPeriod(value as string)}
          className="min-w-[180px]"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={FiDollarSign}
          label={`Ingresos (${periodLabel})`}
          value={formatPrice(analytics.totalRevenue)}
          change={analytics.revenueChange}
          delay={0}
        />
        <StatCard
          icon={FiShoppingBag}
          label={`Pedidos (${periodLabel})`}
          value={analytics.totalOrders.toString()}
          change={analytics.ordersChange}
          delay={0.1}
        />
        <StatCard
          icon={FiPackage}
          label="Productos vendidos"
          value={analytics.totalItemsSold.toString()}
          delay={0.2}
        />
        <StatCard
          icon={FiUsers}
          label="Clientes únicos"
          value={analytics.uniqueCustomers.toString()}
          delay={0.3}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Ingresos</h3>
          {analytics.dailyRevenue.length > 0 ? (
            <BarChart
              data={analytics.dailyRevenue}
              valueFormatter={formatPrice}
              color="bg-red-500"
              period={period}
            />
          ) : (
            <p className="text-gray-400 text-center py-8">Sin datos</p>
          )}
        </motion.div>

        {/* Orders Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Pedidos</h3>
          {analytics.dailyOrders.length > 0 ? (
            <BarChart
              data={analytics.dailyOrders}
              valueFormatter={(v) => `${v} pedidos`}
              color="bg-blue-500"
              period={period}
            />
          ) : (
            <p className="text-gray-400 text-center py-8">Sin datos</p>
          )}
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Productos Más Vendidos
          </h3>
          {analytics.topProducts.length > 0 ? (
            <div className="space-y-3">
              {analytics.topProducts.slice(0, 5).map((product) => (
                <div
                  key={product.menuItemId}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FiPackage className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    <span className="text-gray-700">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">
                      {product.quantitySold} vendidos
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatPrice(product.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">Sin datos</p>
          )}
        </motion.div>

        {/* Order Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Estado de Pedidos
          </h3>
          <StatusChart data={analytics.ordersByStatus} />
        </motion.div>

        {/* Customer Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Estadísticas de Clientes
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">Clientes Únicos</span>
              <span className="font-medium text-gray-800">
                {analytics.uniqueCustomers}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">Clientes Nuevos</span>
              <span className="font-medium text-green-600">
                {analytics.newCustomers}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">Clientes Recurrentes</span>
              <span className="font-medium text-blue-600">
                {analytics.returningCustomers}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500">Tasa de Retención</span>
              <span className="font-medium text-gray-800">
                {analytics.uniqueCustomers > 0
                  ? (
                      (analytics.returningCustomers / analytics.uniqueCustomers) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </div>
          </div>
        </motion.div>

        {/* Average Order Value */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.9 }}
          className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Valor Promedio por Pedido
          </h3>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-4xl font-bold text-red-500">
              {formatPrice(analytics.averageOrderValue)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Basado en {analytics.totalOrders} pedidos
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};
